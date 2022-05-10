"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var member_1 = require("./member");
var affair_1 = require("./affair");
var organization_1 = require("./organization");
var manager_1 = require("./manager");
var affairManager = new manager_1.AffairManager();
var member = new member_1.Member("bob", "email");
var member0 = new member_1.Member("boby", "email");
var member1 = new member_1.Member("tom", "email");
var affair = new affair_1.Affair("affair", "4521", "Jan 2012");
var org = new organization_1.Organization("org");
affairManager.memberList.push(member);
affairManager.memberList.push(member0);
affairManager.memberList.push(member1);
affairManager.affairList.push(affair);
affairManager.organizationList.push(org);
for (var i = 0; i <= affairManager.memberList.length - 1; i++) {
    console.log(affairManager.memberList[i]);
}
var affairMember = affairManager.addMemberToAffair("bob", "affair");
console.log("\n");
console.log(affairMember);
for (var i = 0; i <= affairManager.affairList.length - 1; i++) {
    console.log(affairManager.affairList[i]);
}
console.log(affairManager.findMemberNames("bob"));
console.log("\n");
var affairOrg = affairManager.addAffairToOrganization("affair", "org");
//# sourceMappingURL=test.js.map