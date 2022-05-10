import { Member } from "./member"
import { Affair } from "./affair"
import { Organization } from "./organization";
import { AffairManager } from "./manager";

let affairManager = new AffairManager();

let member = new Member("bob", "email");
let member0 = new Member("boby", "email");
let member1 = new Member("tom", "email");

let affair = new Affair("affair", "4521", "Jan 2012");

let org = new Organization("org");

affairManager.memberList.push(member);
affairManager.memberList.push(member0);
affairManager.memberList.push(member1);

affairManager.affairList.push(affair);

affairManager.organizationList.push(org);

for (let i = 0; i <= affairManager.memberList.length - 1; i++) {
    console.log(affairManager.memberList[i]);
    
}

//affair.affairMemberList.push(member);

let affairMember = affairManager.addMemberToAffair("bob", "affair");
console.log("\n")

console.log(affairMember);

for (let i = 0; i <= affairManager.affairList.length - 1; i++) {
    console.log(affairManager.affairList[i]);
    
}

console.log(affairManager.findMemberNames("bob"));
console.log("\n");

let affairOrg = affairManager.addAffairToOrganization("affair", "org");
//console.log(affairOrg.affairName);