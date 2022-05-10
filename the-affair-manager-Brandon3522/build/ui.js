"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var readlineSync = require("readline-sync");
var manager_1 = require("./manager");
function start() {
    showMainMenu(new manager_1.AffairManager());
}
exports.start = start;
function showMainMenu(em) {
    while (true) {
        console.log("Welcome to the Affair Manager! Pick an option:\n  1. Register a new member\n  2. Register a new affair\n  3. Register a new organization\n  4. Add a member to an affair\n  5. Modify an affair\n  6. Add an affair to an organization\n  7. List affair members\n  8. Exit");
        var response = readlineSync.question('> ');
        if (response === '8' || response.slice(0, 2).toLowerCase() === ':q') {
            break;
        }
        switch (response) {
            case '1':
                showNewMemberMenu(em);
                break;
            case '2':
                showNewAffairMenu(em);
                break;
            case '3':
                showNewOrganizationMenu(em);
                break;
            case '4':
                showAddToAffairMenu(em);
                break;
            case '5':
                showModifyAffairMenu(em);
                break;
            case '6':
                showAddToOrganizationMenu(em);
                break;
            case '7':
                showListAffairMembersMenu(em);
                break;
            default: console.log('Invalid option!');
        }
        console.log('');
    }
}
function showNewMemberMenu(em) {
    console.log('Add a new member.');
    var name = readlineSync.question('  Name: ');
    var email = readlineSync.question('  Email: ');
    em.addMember(name, email);
    console.log('User added!');
}
function showNewAffairMenu(em) {
    console.log('Add a new affair.');
    var affairName = readlineSync.question('  Title of affair: ');
    var zipcode = readlineSync.question('  Location (zip code): ');
    var date = readlineSync.question('  Date and time (ex: Jan 21 2017 13:00 PST): ');
    em.addAffair(affairName, zipcode, date);
    showAddToAffairMenu(em, affairName);
}
function showNewOrganizationMenu(em) {
    console.log('Add a new organization.');
    var organizationName = readlineSync.question('  Title of organization: ');
    em.addOrganization(organizationName);
    var adding = readlineSync.question('Add affairs to organization? (y/n): ');
    while (adding.toLowerCase().startsWith('y')) {
        showAddToOrganizationMenu(em, organizationName);
        adding = readlineSync.question('Add another affair? (y/n): ');
    }
}
function showAddToAffairMenu(em, affairName) {
    if (!affairName) {
        affairName = showSearchAffairsMenu(em);
        if (!affairName) {
            return;
        }
    }
    var adding = readlineSync.question('Add a member to affair? (y/n): ');
    while (adding.toLowerCase().startsWith('y')) {
        var memberName = showSearchMembersMenu(em);
        if (memberName) {
            em.addMemberToAffair(memberName, affairName);
        }
        else {
            console.log('No member selected.');
        }
        adding = readlineSync.question('Add another member? (y/n): ');
    }
}
function showSearchMembersMenu(em) {
    var query = _promptForQuery('member');
    return _searchListMenu('member', em.searchMethod(query));
}
function showSearchAffairsMenu(em) {
    var query = _promptForQuery('affair');
    return _searchListMenu('affair', em.searchMethod(undefined, query));
}
function showSearchOrganizationsMenu(em) {
    var query = _promptForQuery('organization');
    return _searchListMenu('organization', em.searchMethod(undefined, undefined, query));
}
function _promptForQuery(type) {
    console.log("Searching for a " + type + ".");
    return readlineSync.question('Search query: ');
}
function _searchListMenu(type, results) {
    if (results.length > 0) {
        console.log('Results found: ');
        var resultsDisplay = '  ' + (results.map(function (item, idx) { return idx + 1 + ". " + item; }).join('\n  '));
        console.log(resultsDisplay);
        var choiceIdx = parseInt(readlineSync.question("Choose a " + type + " (1-" + results.length + "): "));
        return results[choiceIdx - 1];
    }
    else {
        console.log('No results found.');
        return undefined;
    }
}
function showModifyAffairMenu(em, affairName) {
    if (!affairName) {
        affairName = showSearchAffairsMenu(em);
        if (!affairName) {
            return;
        }
    }
    while (true) {
        console.log("Edit affair '" + affairName + "'.\n  1. Change title\n  2. Change time\n  3. Add to organization\n  4. Return to previous menu");
        var response = parseInt(readlineSync.question('> '));
        if (response == 1) {
            var newTitle = readlineSync.question('  New title: ');
            em.modifyAffair(affairName, newTitle);
        }
        else if (response == 2) {
            var newTime = readlineSync.question('  New date and time (ex: Jan 21 2017 13:00 PST): ');
            em.modifyAffair(affairName, undefined, newTime);
        }
        else if (response == 3) {
            showAddToOrganizationMenu(em, undefined, affairName);
        }
        else if (response == 4) {
            break;
        }
        else {
            console.log('Invalid option!');
        }
    }
}
function showAddToOrganizationMenu(em, organizationName, affairName) {
    if (!affairName) {
        affairName = showSearchAffairsMenu(em);
        if (!affairName) {
            return;
        }
    }
    if (!organizationName) {
        organizationName = showSearchOrganizationsMenu(em);
        if (!organizationName) {
            return;
        }
    }
    em.addAffairToOrganization(affairName, organizationName);
}
function showListAffairMembersMenu(em) {
    var affairName = showSearchAffairsMenu(em);
    var members = em.getMembers(affairName);
    console.log('Members participating in this action:');
    console.log('  ' + members.join('\n  ') + '\n');
    readlineSync.keyInPause('(Press any letter to continue)', { guide: false });
}
//# sourceMappingURL=ui.js.map