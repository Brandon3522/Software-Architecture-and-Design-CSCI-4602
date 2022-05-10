//User Interface for The Affair Manager
//Code adapted from Joel Ross at the University of Wisconsin
//@author James Church

import readlineSync = require('readline-sync'); //for easier repeated prompts
import {AffairManager} from './manager';

/**
 * Function to run the UI
 */
export function start() {
  showMainMenu(new AffairManager());
}

/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(em:AffairManager) {
  while(true){ //run until we exit
    console.log(`Welcome to the Affair Manager! Pick an option:
  1. Register a new member
  2. Register a new affair
  3. Register a new organization
  4. Add a member to an affair
  5. Modify an affair
  6. Add an affair to an organization
  7. List affair members
  8. Exit`);

    let response = readlineSync.question('> ')
    if(response === '8' || response.slice(0,2).toLowerCase() === ':q'){
      break; //stop looping, thus leaving method
    }

    switch(response) { //handle each response
      case '1': showNewMemberMenu(em); break;
      case '2': showNewAffairMenu(em); break;
      case '3': showNewOrganizationMenu(em); break;
      case '4': showAddToAffairMenu(em); break;
      case '5': showModifyAffairMenu(em); break;
      case '6': showAddToOrganizationMenu(em); break;
      case '7': showListAffairMembersMenu(em); break;
      //case 8 handled above
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
  }
}

/**
 * Show menu to add a new member
 */
function showNewMemberMenu(em:AffairManager) {
  console.log('Add a new member.');
  let name:string = readlineSync.question('  Name: ');
  let email:string = readlineSync.question('  Email: ');

  em.addMember(name, email);

  console.log('User added!');
}

/** 
 * Show menu to add a new affair. Will then show menu to add members to the affair
 */
function showNewAffairMenu(em:AffairManager) {
  console.log('Add a new affair.');
  let affairName:string = readlineSync.question('  Title of affair: ');
  let zipcode:string = readlineSync.question('  Location (zip code): ');
  let date:string = readlineSync.question('  Date and time (ex: Jan 21 2017 13:00 PST): ');

  em.addAffair(affairName, zipcode, date);

  showAddToAffairMenu(em, affairName); //add users to new affair
}

/**
 * Show menu to add a new organization. Will then show menu to add affairs to the organization
 */
function showNewOrganizationMenu(em:AffairManager) {
  console.log('Add a new organization.');
  let organizationName:string = readlineSync.question('  Title of organization: ');

  em.addOrganization(organizationName);

  let adding = readlineSync.question('Add affairs to organization? (y/n): ');
  while(adding.toLowerCase().startsWith('y')){ //while adding members    
    showAddToOrganizationMenu(em, organizationName); //add affairs to new organization
    adding = readlineSync.question('Add another affair? (y/n): ');
  }
}

/**
 * Show menu to add a member to an affair. Will repeat to add multiple members. Will show menu to search for an affair if none is provided.
 */
function showAddToAffairMenu(em:AffairManager, affairName?:string) {
  if(!affairName){
    affairName = showSearchAffairsMenu(em);
    if(!affairName){ return }//if didn't select an affair
  }

  let adding = readlineSync.question('Add a member to affair? (y/n): ');
  while(adding.toLowerCase().startsWith('y')){ //while adding members    
    let memberName = showSearchMembersMenu(em); //find a member
    if(memberName){ //if selected someone
      em.addMemberToAffair(memberName, affairName);
    } else {
      console.log('No member selected.')
    }
    adding = readlineSync.question('Add another member? (y/n): ');
  }
}

/**
 * Show menu to look up a member. Will return undefined if no member selected.
 */
function showSearchMembersMenu(em:AffairManager) : string|undefined {
  let query:string = _promptForQuery('member');
  return _searchListMenu('member', em.searchMethod(query));
}

/**
 * Show menu to look up an affair. Will return undefined if no affair selected.
 */
function showSearchAffairsMenu(em:AffairManager) : string|undefined {
  let query:string = _promptForQuery('affair');
  return _searchListMenu('affair', em.searchMethod(undefined, query));
}

/**
 * Show menu to look up a organization. Will return undefined if no organization selected.
 */
function showSearchOrganizationsMenu(em:AffairManager) : string|undefined {
  let query:string = _promptForQuery('organization');
  return _searchListMenu('organization', em.searchMethod(undefined, undefined, query));
}

/**
 * Helper function that prompts the user for a query.
 */
function _promptForQuery(type: string): string {
  console.log(`Searching for a ${type}.`)
  return readlineSync.question('Search query: ');
}

/**
 * Helper function that shows a menu to search a list of items and choose a result.
 * Will return undefiend if no item is selected
 */
function _searchListMenu(type:string, results:string[]) : string|undefined {
  if(results.length > 0) {
    console.log('Results found: ');
    // why is this returning an object????
    let resultsDisplay = '  '+(results.map((item:string, idx:number) => `${idx+1}. ${item}`).join('\n  '));
    console.log(resultsDisplay);
    
    let choiceIdx = parseInt(readlineSync.question(`Choose a ${type} (1-${results.length}): `)); //will covert to number or NaN

    return results[choiceIdx-1]; //will return undefined if invalid index
  } else {
    console.log('No results found.')
    return undefined;
  }
}

/**
 * Show menu to modify affair (title, time, or organization). Will show menu to search for an affair if none is provided.
 */
function showModifyAffairMenu(em:AffairManager, affairName?:string) {
  if(!affairName){
    affairName = showSearchAffairsMenu(em);
    if(!affairName){ return }//if didn't select an affair
  }

  while(true){ //run until we exit
    console.log(`Edit affair '${affairName}'.
  1. Change title
  2. Change time
  3. Add to organization
  4. Return to previous menu`);

    let response:number = parseInt(readlineSync.question('> '));
    if(response == 1){
      let newTitle = readlineSync.question('  New title: ');
      em.modifyAffair(affairName, newTitle);
    }
    else if(response == 2){
      let newTime = readlineSync.question('  New date and time (ex: Jan 21 2017 13:00 PST): ');
      em.modifyAffair(affairName, undefined, newTime); //no name to change
    }
    else if(response == 3){
      showAddToOrganizationMenu(em, undefined, affairName);
    }
    else if(response == 4){ break; //exit from loop to return
    } else {
      console.log('Invalid option!');
    }
  }
}

/**
 * Show menu to add an affair to a organization. Will show menus to search for an affair and a organization if either is not provided.
 */
function showAddToOrganizationMenu(em:AffairManager, organizationName?:string, affairName?:string, ) {
  if(!affairName){ //if affair not yet specified
    affairName = showSearchAffairsMenu(em);
    if(!affairName){ return }//if didn't select an affair
  }

  if(!organizationName){ //if organization not yet specified
    organizationName = showSearchOrganizationsMenu(em);
    if(!organizationName){ return }//if didn't select a organization
  }

  //add the affair to the organization
  em.addAffairToOrganization(affairName, organizationName);
}

/**
 * Show a list of members participating in an affair. Will show menu to search for an affair. Should include outputting member's email addresses.
 */
function showListAffairMembersMenu(em:AffairManager) {
  let affairName = showSearchAffairsMenu(em);

  let members = em.getMembers(affairName);

  console.log('Members participating in this action:')
  console.log('  '+members.join('\n  ')+'\n');

  readlineSync.keyInPause('(Press any letter to continue)', {guide:false}); //so have time to read stuff
}
