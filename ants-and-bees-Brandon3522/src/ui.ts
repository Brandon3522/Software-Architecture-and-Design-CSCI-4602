import {AntGame, AntColony, Place, Hive} from './game';
import {Ant, EaterAnt, GuardAnt} from './ants';

import vorpal = require('vorpal');
import chalk = require('chalk');
import _ = require('lodash');

/**
 * The Vorpal library for command-line interaction
 */
const Vorpal = vorpal();

/**
 * Exports the game board.
 * @param game an instance of the ant game
 */
export function showMapOf(game:AntGame){
  console.log(getMap(game));
}

/**
 * Build the board for the game.
 * @param game an instance of the ant game
 * @returns game board interface
 */
function getMap(game:AntGame) {
  let places:Place[][] = game.getPlaces();
  let tunnelLength = places[0].length;
  let beeIcon = chalk.bgYellow.black('B');
   
  let map = '';

  map += chalk.bold('The Colony is under attack!\n');
  map += `Turn: ${game.getTurn()}, Food: ${game.getFood()}, Boosts available: [${game.getBoostNames()}]\n`;
  map += '     '+_.range(0,tunnelLength).join('    ')+'      Hive'+'\n';
   
  /**
   * Loop through the number of places and set up the tunnels on the game board.
   */
  for(let i=0; i<places.length; i++){
    map += '    '+Array(tunnelLength+1).join('=====');
    
    /**
     * On initial pass, retrieve number of bees, set up the bees on the board if the 
     * hive count is greater than 0.
     */
    if(i===0){
      map += '    ';
      let hiveBeeCount = game.getHiveBeesCount();
      if(hiveBeeCount > 0){
        map += beeIcon;
        map += (hiveBeeCount > 1 ? hiveBeeCount : ' ');
      }
    }
    map += '\n';

    map += i+')  ';
    
    /**
     * Iterate through places array.
     */
    for(let j=0; j<places[i].length; j++){ 
      let place:Place = places[i][j];
      /**
       * Place icon for ant on board.
       */
      map += iconFor(place.getAnt());
      map += ' '; 

      /**
       * If bees exist in the game, assign corresponding icons to the board, 
       * otherwise display space.
       */
      if(place.getBees().length > 0){
        map += beeIcon;
        map += (place.getBees().length > 1 ? place.getBees().length : ' ');
      } else {
        map += '  ';
      }
      map += ' '; 
    }
    map += '\n    ';
    for(let j=0; j<places[i].length; j++){
      let place = places[i][j];
      // If block is marked as water, assign appropiate symbol
      if(place.isWater()){
        map += chalk.bgCyan('~~~~')+' ';
        // Otherwise assign default tunnel
      } else {
        map += '==== ';
      }
    }
    map += '\n';
  }
  // Join tunnels together
  map += '     '+_.range(0,tunnelLength).join('    ')+'\n';

  return map;
}

/**
 * Assigns icons for objects within the game
 * @param ant an ant type
 * @returns icon for an object
 */
function iconFor(ant:Ant){
  if(ant === undefined){ return ' ' };
  let icon:string;
  /**
   * Assign icons for the ant type based on the name.
   */
  switch(ant.name){
    case "Grower":
      icon = chalk.green('G'); break;
    case "Thrower":
      icon = chalk.red('T'); break;
    case "Eater":
      if((<EaterAnt>ant).isFull())
        icon = chalk.yellow.bgMagenta('E');
      else
        icon = chalk.magenta('E');
      break;
    case "Scuba":
      icon = chalk.cyan('S'); break;
    case "Guard":
      let guarded:Ant = (<GuardAnt>ant).getGuarded();
      if(guarded){
        icon = chalk.underline(iconFor(guarded)); break;
      } else {
        icon = chalk.underline('x'); break;
      }
    default:
      icon = '?';
  }
  return icon;
}

/**
 * Starts the game for the user to play.
 * @param game an instance of the ant game
 */
export function play(game:AntGame) {
  Vorpal
  /**
   * Set up user prompt in green.
   */
    .delimiter(chalk.green('AvB $'))
    /**
     * Get an instance of the map.
     */
    .log(getMap(game))
    /**
     * Display to user.
     */
    .show();

  Vorpal
  /**
   * Adds a command that will show the current game board to the user.
   */
    .command('show', 'Shows the current game board.')
    .action(function(args, callback){
      Vorpal.log(getMap(game));
      callback();
    });

  Vorpal
  /**
   * Add command that will deploy an ant on a tunnel.
   */
    .command('deploy <antType> <tunnel>', 'Deploys an ant to tunnel (as "row,col" eg. "0,6").')
    /**
     * Alias for deploy.
     */
    .alias('add', 'd')
    /**
     * Auto completion for the alias.
     */
    .autocomplete(['Grower','Thrower','Eater','Scuba','Guard'])
    /**
     * Executes the deploy tunnel command.
     */
    .action(function(args, callback) {
      let error = game.deployAnt(args.antType, args.tunnel)
      /**
       * Throw error message if the command is not a valid depployment.
       */
      if(error){
        Vorpal.log(`Invalid deployment: ${error}.`);
      }
      /**
       * Generate map with new ant deployment displayed.
       */
      else {
        Vorpal.log(getMap(game));
      }
      callback();
    });

  Vorpal
  /**
   * Add command to remove an ant from a tunnel.
   */
    .command('remove <tunnel>', 'Removes the ant from the tunnel (as "row,col" eg. "0,6").')
    /**
     * Alias for remove.
     */
    .alias('rm')
    /**
     * Executes the remove ant command
     */
    .action(function(args, callback){
      let error = game.removeAnt(args.tunnel);
      /**
       * Throw error message if the command is not a valid removal.
       */
      if(error){
        Vorpal.log(`Invalid removal: ${error}.`);
      }
      /**
       * Generate new map with the ant selected removed.
       */
      else {
        Vorpal.log(getMap(game));
      }
      callback();
    });

  Vorpal
  /**
   * Add command to apply boost to specified tunnel.
   */
    .command('boost <boost> <tunnel>', 'Applies a boost to the ant in a tunnel (as "row,col" eg. "0,6")')
    /**
     * Alias for boost.
     */
    .alias('b')
    /**
     * Auto completion for various boost names.
     */
    .autocomplete({data:() => game.getBoostNames()})
    /**
     * Executes the boost command.
     */
    .action(function(args, callback){
      let error = game.boostAnt(args.boost, args.tunnel);
      /**
       * Throw error message if the boost cannot be applied.
       */
      if(error){
        Vorpal.log(`Invalid boost: ${error}`);
      }
      callback();
    })

  Vorpal
  /**
   * Add command to end the user turn.
   */
    .command('turn', 'Ends the current turn. Ants and bees will act.')
    /**
     * Aliases for ending the turn.
     */
    .alias('end turn', 'take turn','t')
    /**
     * Executes the end turn command.
     */
    .action(function(args, callback){
      game.takeTurn();
      /**
       * New instance of game board.
       */
      Vorpal.log(getMap(game));
      let won:boolean = game.gameIsWon();
      /**
       * If the user wins, display win message in green.
       */
      if(won === true){
        Vorpal.log(chalk.green('Yaaaay---\nAll bees are vanquished. You win!\n'));
      }
      /**
       * If the user loses, display losing message in yellow.
       */
      else if(won === false){
        Vorpal.log(chalk.yellow('Bzzzzz---\nThe ant queen has perished! Please try again.\n'));
      }
      else {
        callback();
      }
    });
}
