import {Insect, Bee, Ant, GrowerAnt, ThrowerAnt, EaterAnt, ScubaAnt, GuardAnt} from './ants';

/**
 * Keeps track of insect locations, and location types.
 */
class Place {
  protected ant:Ant;
  protected guard:GuardAnt;
  protected bees:Bee[] = [];

  constructor(readonly name:string,
              protected readonly water = false,
              private exit?:Place, 
              private entrance?:Place) {}

  getExit():Place { return this.exit; }

  setEntrance(place:Place){ this.entrance = place; }

  isWater():boolean { return this.water; }

  getAnt():Ant { 
    if(this.guard) 
      return this.guard;
    else 
      return this.ant;
  }

  getGuardedAnt():Ant {
    return this.ant;
  }

  getBees():Bee[] { return this.bees; }

  /**
   * Gets the closest bee based on the paramters given.
   * @param maxDistance max distance for bee location
   * @param minDistance minimum distance for bee location
   * @returns the bee at the location or undefined
   */
  getClosestBee(maxDistance:number, minDistance:number = 0):Bee {
		let p:Place = this;
    // Loop through plce to find closest bee
		for(let dist = 0; p!==undefined && dist <= maxDistance; dist++) {
      // If within range return bee at index 0
			if(dist >= minDistance && p.bees.length > 0) {
				return p.bees[0];
      }
			p = p.entrance;
		}
		return undefined;
  }

  /**
   * Adds an ant to a location.
   * @param ant ant type
   * @returns boolean true if ant is of guard type or ant, false otherwise
   */
  addAnt(ant:Ant):boolean {
    if(ant instanceof GuardAnt) {
      if(this.guard === undefined){
        this.guard = ant;
        this.guard.setPlace(this);
        return true;
      }
    }
    else 
      if(this.ant === undefined) {
        this.ant = ant;
        this.ant.setPlace(this);
        return true;
      }
    return false;
  }

  /**
   * Removes an ant. Determines whether an ant is a guard or not.
   * @returns an ant type or a guard ant
   */
  removeAnt():Ant {
    if(this.guard !== undefined){
      let guard = this.guard;
      this.guard = undefined;
      return guard;
    }
    else {
      let ant = this.ant;
      this.ant = undefined;
      return ant;
    }
  }

  /**
   * Add bee to bee array and set location.
   * @param bee a bee
   */
  addBee(bee:Bee):void {
    this.bees.push(bee);
    bee.setPlace(this);
  }

  /**
   * Removes bee from bee array and current location.
   * @param bee a bee
   */
  removeBee(bee:Bee):void {
    var index = this.bees.indexOf(bee);
    if(index >= 0){
      this.bees.splice(index,1);
      bee.setPlace(undefined);
    }
  }

  /**
   * Removes all bees from bee array and current location.
   */
  removeAllBees():void {
    this.bees.forEach((bee) => bee.setPlace(undefined) );
    this.bees = [];
  }

  /**
   * Exit bee from location.
   * @param bee a bee
   */
  exitBee(bee:Bee):void {
    this.removeBee(bee);
    this.exit.addBee(bee);  
  }

  /**
   * Calls function to remove an ant or a Bee.
   * @param insect a type of insect
   */
  removeInsect(insect:Insect) {
    if(insect instanceof Ant){
      this.removeAnt();
    }
    else if(insect instanceof Bee){
      this.removeBee(insect);
    }
  }

  /**
   * Actions for a location. 
   * Determines if an ant type is able to be located in water.
   */
  act() {
    if(this.water){
      if(this.guard){
        this.removeAnt();
      }
      if(!(this.ant instanceof ScubaAnt)){
        this.removeAnt();
      }
    }
  }
}

/**
 * Keeps track of bees and their attacks on the ant colony.
 */
class Hive extends Place {
  private waves:{[index:number]:Bee[]} = {}

  constructor(private beeArmor:number, private beeDamage:number){
    super('Hive');
  }

  /**
   * Adds a wave of bees to the game
   * @param attackTurn the number of turns the wave consists of
   * @param numBees the number of bees in wave
   * @returns array wave of bees based on attack turn
   */
  addWave(attackTurn:number, numBees:number):Hive {
    let wave:Bee[] = [];
    // Loop through number of bees
    for(let i=0; i<numBees; i++) {
      // Create new bee object and add to wave
      let bee = new Bee(this.beeArmor, this.beeDamage, this);
      this.addBee(bee);
      wave.push(bee);
    }
    this.waves[attackTurn] = wave;
    return this;
  }
  
  /**
   * Sets up the invasion for the bees if the wave array at the
   * current turn is not equal to undefined.
   * @param colony an ant colony object
   * @param currentTurn the current turn in the game
   * @returns array wave of bees based on currnet turn or empty array
   */
  invade(colony:AntColony, currentTurn:number): Bee[]{
    if(this.waves[currentTurn] !== undefined) {
      this.waves[currentTurn].forEach((bee) => {
        this.removeBee(bee);
        let entrances:Place[] = colony.getEntrances();
        let randEntrance:number = Math.floor(Math.random()*entrances.length);
        entrances[randEntrance].addBee(bee);
      });
      return this.waves[currentTurn];
    }
    else{
      return [];
    }    
  }
}

/**
 * Instructions for setting up the ant colony
 */
class AntColony {
  private food:number;
  private places:Place[][] = [];
  private beeEntrances:Place[] = [];
  private queenPlace:Place = new Place('Ant Queen');
  private boosts:{[index:string]:number} = {'FlyingLeaf':1,'StickyLeaf':1,'IcyLeaf':1,'BugSpray':0}

  constructor(startingFood:number, numTunnels:number, tunnelLength:number, moatFrequency=0){
    this.food = startingFood;

    let prev:Place;

    /**
     * Loop through the tunnels
     */
		for(let tunnel=0; tunnel < numTunnels; tunnel++)
		{
			let curr:Place = this.queenPlace;
      this.places[tunnel] = [];

			for(let step=0; step < tunnelLength; step++)
			{
        // Assign type as tunnel or water, dependent on moatFrequency
        let typeName = 'tunnel';
        if(moatFrequency !== 0 && (step+1)%moatFrequency === 0){
          typeName = 'water';
				}
				
				prev = curr;
        let locationId:string = tunnel+','+step;
        curr = new Place(typeName+'['+locationId+']', typeName=='water', prev);
        prev.setEntrance(curr);
				this.places[tunnel][step] = curr;
			}
			this.beeEntrances.push(curr);
		}
  }

  getFood():number { return this.food; }

  increaseFood(amount:number):void { this.food += amount; }

  getPlaces():Place[][] { return this.places; }

  getEntrances():Place[] { return this.beeEntrances; }

  getQueenPlace():Place { return this.queenPlace; }
  // Boolean to determine if the hive is empty
  queenHasBees():boolean { return this.queenPlace.getBees().length > 0; }

  getBoosts():{[index:string]:number} { return this.boosts; }

  /**
   * Adds a boost to the player
   * @param boost a boost of FlyingLeaf, StickyLeaf, IcyLeaf, or BugSpray
   */
  addBoost(boost:string){
    if(this.boosts[boost] === undefined){
      this.boosts[boost] = 0;
    }
    this.boosts[boost] = this.boosts[boost]+1;
    console.log('Found a '+boost+'!');
  }

  /**
   * Deploys an ant of a specific type to the location.
   * @param ant a type of ant
   * @param place the location to deploy
   * @returns undefined, a message indicating the tunnel is occupied, 
   * or a message indicating not enough food
   */
  deployAnt(ant:Ant, place:Place):string {
    if(this.food >= ant.getFoodCost()){
      let success = place.addAnt(ant);
      // Decrement food by ant cost
      if(success){
        this.food -= ant.getFoodCost();
        return undefined;
      }
      return 'tunnel already occupied';
    }
    return 'not enough food';
  }

  /**
   * Remove ant at location.
   * @param place location of ant
   */
  removeAnt(place:Place){
    place.removeAnt();
  }

  /**
   * Applys a boost to the ant at the location.
   * @param boost a type of boost
   * @param place the location
   * @returns undefined if successful, otherwise a message indicating why it failed
   */
  applyBoost(boost:string, place:Place):string {
    if(this.boosts[boost] === undefined || this.boosts[boost] < 1) {
      return 'no such boost';
    }
    let ant:Ant = place.getAnt();
    if(!ant) {
      return 'no Ant at location' 
    }
    ant.setBoost(boost);
    return undefined;
  }

  /**
   * Actions to be executed for all of the ants.
   */
  antsAct() {
    this.getAllAnts().forEach((ant) => {
      if(ant instanceof GuardAnt) {
        let guarded = ant.getGuarded();
        if(guarded)
          guarded.act(this);
      }
      ant.act(this);
    });    
  }

  /**
   * Actions to executed for all of the bees.
   */
  beesAct() {
    this.getAllBees().forEach((bee) => {
      bee.act();
    });
  }
  
  /**
   * Places actions
   */
  placesAct() {
    // Iterate through 2D places array
    for(let i=0; i<this.places.length; i++) {
      for(let j=0; j<this.places[i].length; j++) {
        this.places[i][j].act();
      }
    }    
  }

  /**
   * Gets all of the ants located in the game.
   * @returns an array of ants or an empty array of ants
   */
  getAllAnts():Ant[] {
    let ants = [];
    // Iterate through 2D places array to get all ants
    for(let i=0; i<this.places.length; i++) {
      for(let j=0; j<this.places[i].length; j++) {
        if(this.places[i][j].getAnt() !== undefined) {
          ants.push(this.places[i][j].getAnt());
        }
      }
    }
    return ants;
  }

  /**
   * Gets all of the bees located in the game.
   * @returns an array of bees or an empty array of bees
   */
  getAllBees():Bee[] {
    var bees = [];
    // Iterate through 2D places array to get all bees
    for(var i=0; i<this.places.length; i++){
      for(var j=0; j<this.places[i].length; j++){
        bees = bees.concat(this.places[i][j].getBees());
      }
    }
    return bees;
  }
}

/**
 * Instructions for setting up the game with the ant colony and hive.
 */
class AntGame {
  private turn:number = 0;
  constructor(private colony:AntColony, private hive:Hive){}

  /**
   * Completes all actions associated with one turn.
   */
  takeTurn() {
    console.log('');
    this.colony.antsAct();
    this.colony.beesAct();
    this.colony.placesAct();
    this.hive.invade(this.colony, this.turn);
    this.turn++;
    console.log('');
  }

  getTurn() { return this.turn; }

  /**
   * Determines if the game has been won.
   * @returns boolean value of true if all bees are defeated or
   * false if bees are still in the game
   */
  gameIsWon():boolean|undefined {
    if(this.colony.queenHasBees()){
      return false;
    }
    else if(this.colony.getAllBees().length + this.hive.getBees().length === 0) {
      return true;
    }   
    return undefined;
  }

    /**
     * Places an ant of the given type at the given location.
     * Precondition
     * @param antType a type of ant
     * @param placeCoordinates coordinates within the tunnel
     * @returns ant type or a message indicating why the procedure failed
     */
  deployAnt(antType:string, placeCoordinates:string):string {
    let ant;
    // Determines ant ype
    switch(antType.toLowerCase()) {
      case "grower":
        ant = new GrowerAnt(); break;
      case "thrower":
        ant = new ThrowerAnt(); break;
      case "eater":
        ant = new EaterAnt(); break;
      case "scuba":
        ant = new ScubaAnt(); break;
      case "guard":
        ant = new GuardAnt(); break;
      default:
        return 'unknown ant type';
    }
    // Throw exception if ant is unable to be placed at location
    try {
      let coords = placeCoordinates.split(',');
      let place:Place = this.colony.getPlaces()[coords[0]][coords[1]];
      return this.colony.deployAnt(ant, place);
    } catch(e) {
      return 'illegal location';
    }
  }

  /**
   * Removes an ant at the selected location.
   * @param placeCoordinates coordinates within the tunnel
   * @returns undefined or a message indicating why the operation failed
   */
  removeAnt(placeCoordinates:string):string {
    // Throw exception if an ant doesn't exist at the location
    try {
      let coords = placeCoordinates.split(',');
      let place:Place = this.colony.getPlaces()[coords[0]][coords[1]];
      place.removeAnt();
      return undefined;
    }catch(e){
      return 'illegal location';
    }    
  }

  /**
   * Places a boost on the ant.
   * @param boostType a type of boost
   * @param placeCoordinates coordinates within the tunnel
   * @returns a boost at the given location or a message indicating why the operation failed
   */
  boostAnt(boostType:string, placeCoordinates:string):string {
    // Throw exception if boost is unable to be applied at location
    try {
      let coords = placeCoordinates.split(',');
      let place:Place = this.colony.getPlaces()[coords[0]][coords[1]];
      return this.colony.applyBoost(boostType,place);
    }catch(e){
      return 'illegal location';
    }    
  }

  getPlaces():Place[][] { return this.colony.getPlaces(); }
  getFood():number { return this.colony.getFood(); }
  getHiveBeesCount():number { return this.hive.getBees().length; }
  getBoostNames():string[] { 
    let boosts = this.colony.getBoosts();
    return Object.keys(boosts).filter((boost:string) => {
      return boosts[boost] > 0;
    }); 
  }
}

export { AntGame, Place, Hive, AntColony }