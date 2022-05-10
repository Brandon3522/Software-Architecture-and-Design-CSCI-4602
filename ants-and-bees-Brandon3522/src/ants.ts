import {AntColony, Place} from './game';

/**
 * Abstract base class for insects
 */
export abstract class Insect {
  readonly name:string;

  constructor(protected armor:number, protected place:Place){}

  getName():string { return this.name; }
  getArmor():number { return this.armor; }
  getPlace() { return this.place; }
  setPlace(place:Place){ this.place = place; }

  /**
   * Reduces the armour of the insect by the amount specified.
   * @param amount number to reduce armour
   * @returns true value if the armour is less than or equal to 0, false otherwise
   */
  reduceArmor(amount:number):boolean {
    this.armor -= amount;
    // If the armour is less than 0, the insect is removed.
    if(this.armor <= 0){
      console.log(this.toString()+' ran out of armor and expired');
      this.place.removeInsect(this);
      return true;
    }
    return false;
  }

  /**
   * Actions to be executed
   * @param colony an ant colony or empty parameter if none given
   */
  abstract act(colony?:AntColony):void;

  toString():string {
    return this.name + '('+(this.place ? this.place.name : '')+')';
  }
}

/**
 * Bee insect, inherits from abstract base class Insect
 */
export class Bee extends Insect {
  readonly name:string = 'Bee';
  private status:string;

  constructor(armor:number, private damage:number, place?:Place){
    super(armor, place);
  }

  /**
   * Stings ant and reduces the armour by the bee's damage.
   * @param ant Type of ant
   * @returns boolean based on amount the ant's armour is reduced
   */
  sting(ant:Ant):boolean{
    console.log(this+ ' stings '+ant+'!');
    return ant.reduceArmor(this.damage);
  }

  isBlocked():boolean {
    return this.place.getAnt() !== undefined;
  }

  setStatus(status:string) { this.status = status; }

  /**
   * Actions for Bee
   */
  act() {
    // Stings the ant if the location is blocked and not labelled cold
    if(this.isBlocked()){
      if(this.status !== 'cold') {
        this.sting(this.place.getAnt());
      }
    }
    // If armour is positive, calls function to move bee, if it's not stuck.
    else if(this.armor > 0) {
      if(this.status !== 'stuck'){
        this.place.exitBee(this);
      }
    }    
    this.status = undefined;
  }
}

/**
 * Ant insect base class, inherits from abstract base class Insect
 */
export abstract class Ant extends Insect {
  protected boost:string;
  constructor(armor:number, private foodCost:number = 0, place?:Place) {
    super(armor, place);
  }

  getFoodCost():number { return this.foodCost; }
  setBoost(boost:string) { 
    this.boost = boost; 
      console.log(this.toString()+' is given a '+boost);
  }
}

/**
 * Grower ant type, inherits from base class Ant
 */
export class GrowerAnt extends Ant {
  readonly name:string = "Grower";
  constructor() {
    super(1,1)
  }
  /**
   * Increases food and/or adds boosts based on the random number.
   * @param colony an ant colony
   */
  act(colony:AntColony) {
    let roll = Math.random();
    if(roll < 0.6){
      colony.increaseFood(1);
    } else if(roll < 0.7) {
      colony.addBoost('FlyingLeaf');
    } else if(roll < 0.8) {
      colony.addBoost('StickyLeaf');
    } else if(roll < 0.9) {
      colony.addBoost('IcyLeaf');
    } else if(roll < 0.95) {
      colony.addBoost('BugSpray');
    }
  }  
}

/**
 * Thrower ant type, imherits from base class Ant
 */
export class ThrowerAnt extends Ant {
  readonly name:string = "Thrower";
  private damage:number = 1;

  constructor() {
    super(1,4);
  }
  /**
   * Actions for thrower ant.
   */
  act() {

    if(this.boost !== 'BugSpray'){
      let target;
      // If flyingLeaf is active, increase attack range
      if(this.boost === 'FlyingLeaf')
        target = this.place.getClosestBee(5);
      else
        target = this.place.getClosestBee(3);
      // Thrower ant throws a leaf at the target bee 
      // If a particular boost is enabled for the ant, the boost is executed
      if(target){
        console.log(this + ' throws a leaf at '+target);
        target.reduceArmor(this.damage);
    
        if(this.boost === 'StickyLeaf'){
          target.setStatus('stuck');
          console.log(target + ' is stuck!');
        }
        if(this.boost === 'IcyLeaf') {
          target.setStatus('cold');
          console.log(target + ' is cold!');
        }
        this.boost = undefined;
      }
    }
    /**
     * If the bug spray boost is enabled, all insects within the tunnel are eliminated.
     */
    else {
      console.log(this + ' sprays bug repellant everywhere!');
      let target = this.place.getClosestBee(0);
      while(target){
        target.reduceArmor(10);
        target = this.place.getClosestBee(0);
      }
      this.reduceArmor(10);
    }
  }
}

/**
 * Eater ant type, imherits from base class Ant
 */
export class EaterAnt extends Ant {
  readonly name:string = "Eater";
  private turnsEating:number = 0;
  private stomach:Place = new Place('stomach');
  constructor() {
    super(2,4)
  }
  /**
   * Checks to see if Eater ant has already eaten a bee.
   * @returns a boolean based on if the eater ant's stomach is full
   */
  isFull():boolean {
    return this.stomach.getBees().length > 0;
  }
  /**
   * Actions for the eater ant.
   */
  act() {
    console.log("eating: "+this.turnsEating);
    // If the turns eating variable is 0 and the bee is within range, the closest bee is eaten.
    if(this.turnsEating == 0){
      console.log("try to eat");
      let target = this.place.getClosestBee(0);
      if(target) {
        console.log(this + ' eats '+target+'!');
        this.place.removeBee(target);
        this.stomach.addBee(target);
        this.turnsEating = 1;
      }
      /**
       * Otherwise, if the turns eating variable is greater than 3, the bee is removed or
       * the turns eating variable is incremented by one.
       */
    } else {
      if(this.turnsEating > 3){
        this.stomach.removeBee(this.stomach.getBees()[0]);
        this.turnsEating = 0;
      } 
      else 
        this.turnsEating++;
    }
  }  

  /**
   * Reduces the armour by the given amount.
   * @param amount amount to reduce armour
   * @returns reduceArmour boolean function or false
   */
  reduceArmor(amount:number):boolean {
    this.armor -= amount;
    console.log('armor reduced to: '+this.armor);
    if(this.armor > 0){
      // If turns eating is 1, cough up the bee and reset to 3
      if(this.turnsEating == 1){
        let eaten = this.stomach.getBees()[0];
        this.stomach.removeBee(eaten);
        this.place.addBee(eaten);
        console.log(this + ' coughs up '+eaten+'!');
        this.turnsEating = 3;
      }
    }
    // If armour is less than 0
    else if(this.armor <= 0){
      // Turns is bewtween 1 and 2, cough up bee
      if(this.turnsEating > 0 && this.turnsEating <= 2){
        let eaten = this.stomach.getBees()[0];
        this.stomach.removeBee(eaten);
        this.place.addBee(eaten);
        console.log(this + ' coughs up '+eaten+'!');
      }
      return super.reduceArmor(amount);
    }
    return false;
  }
}

/**
 * Scuba ant type, imherits from base class Ant
 */
export class ScubaAnt extends Ant {
  readonly name:string = "Scuba";
  private damage:number = 1;

  constructor() {
    super(1,5)
  }
  /**
   * Actions for scuba ant.
   */
  act() {
    if(this.boost !== 'BugSpray'){
      let target;
      // If flyingLeaf is active, increase attack range
      if(this.boost === 'FlyingLeaf')
        target = this.place.getClosestBee(5);
      else
        target = this.place.getClosestBee(3);
      
      /**
       * Scuba ant throws a leaf at the target bee. If a particular boost
       * is enabled for the ant, the boost is executed.
       */
      if(target){
        console.log(this + ' throws a leaf at '+target);
        target.reduceArmor(this.damage);
    
        if(this.boost === 'StickyLeaf'){
          target.setStatus('stuck');
          console.log(target + ' is stuck!');
        }
        if(this.boost === 'IcyLeaf') {
          target.setStatus('cold');
          console.log(target + ' is cold!');
        }
        this.boost = undefined;
      }
    }
    /**
    * If the bug spray boost is enabled, all insects within the tunnel are eliminated.
    */ 
    else {
      console.log(this + ' sprays bug repellant everywhere!');
      let target = this.place.getClosestBee(0);
      while(target){
        target.reduceArmor(10);
        target = this.place.getClosestBee(0);
      }
      this.reduceArmor(10);
    }
  }
}

/**
 * Guard ant type, imherits from base class Ant
 */
export class GuardAnt extends Ant {
  readonly name:string = "Guard";

  constructor() {
    super(2,4)
  }

  getGuarded():Ant {
    return this.place.getGuardedAnt();
  }

  act() {}
}
