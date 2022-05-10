"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffairManager = void 0;
var member_1 = require("./member");
var affair_1 = require("./affair");
var organization_1 = require("./organization");
var AffairManager = (function () {
    function AffairManager() {
        this._memberList = [];
        this._affairList = [];
        this._organizationList = [];
    }
    Object.defineProperty(AffairManager.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (v) {
            this._name = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AffairManager.prototype, "affairList", {
        get: function () {
            return this._affairList;
        },
        set: function (affairList) {
            this._affairList = affairList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AffairManager.prototype, "organizationList", {
        get: function () {
            return this._organizationList;
        },
        set: function (prgList) {
            this._organizationList = this.organizationList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AffairManager.prototype, "memberList", {
        get: function () {
            return this._memberList;
        },
        set: function (memberList) {
            this._memberList = memberList;
        },
        enumerable: false,
        configurable: true
    });
    AffairManager.prototype.addMember = function (name, email) {
        var member = new member_1.Member(name, email);
        this.memberList.push(member);
    };
    AffairManager.prototype.addAffair = function (affairName, location, time) {
        var affair = new affair_1.Affair(affairName, location, time);
        this.affairList.push(affair);
    };
    AffairManager.prototype.addOrganization = function (orgName) {
        var organization = new organization_1.Organization(orgName);
        this.organizationList.push(organization);
    };
    AffairManager.prototype.searchMethod = function (memberName, affairName, organizationName) {
        if (memberName) {
            var memberList = this.findMemberNames(memberName);
            return memberList;
        }
        else if (affairName) {
            var affairList = this.findAffairNames(affairName);
            return affairList;
        }
        else if (organizationName) {
            var orgList = this.findOrganizationNames(organizationName);
            return orgList;
        }
        return;
    };
    AffairManager.prototype.findMemberNames = function (memberName) {
        var memList = [];
        for (var i = 0; i <= this._memberList.length - 1; i++) {
            if (this._memberList[i].mName == memberName)
                memList.push(this._memberList[i].mName);
        }
        return memList;
    };
    AffairManager.prototype.findAffairNames = function (affairName) {
        var affList = [];
        for (var i = 0; i <= this.affairList.length - 1; i++) {
            if (this.affairList[i].affairName == affairName)
                affList.push(this.affairList[i].affairName);
        }
        return affList;
    };
    AffairManager.prototype.findOrganizationNames = function (organizationName) {
        var orgList = [];
        for (var i = 0; i <= this.organizationList.length - 1; i++) {
            if (this.organizationList[i].orgName == organizationName)
                orgList.push(this.affairList[i].affairName);
        }
        return orgList;
    };
    AffairManager.prototype.addMemberToAffair = function (memberName, affairName) {
        var member = new member_1.Member();
        for (var index = 0; index <= this.affairList.length - 1; index++) {
            if (this.affairList[index].affairName == affairName) {
                if (this.affairList[index].getMemberName(memberName) == memberName) {
                    console.log("Member already exists in the affair");
                    return;
                }
                else
                    for (var i = 0; i <= this._memberList.length - 1; i++) {
                        if (this._memberList[i].mName == memberName)
                            member = this._memberList[i];
                    }
                console.log("Member added.");
                this.affairList[index].affairMemberList.push(member);
            }
        }
    };
    AffairManager.prototype.modifyAffair = function (affairName, newAffairName, time) {
        if (newAffairName) {
            for (var i = 0; i <= this.affairList.length - 1; i++) {
                if (this.affairList[i].affairName == affairName) {
                    this.affairList[i].affairName = newAffairName;
                }
            }
        }
        else if (time) {
            for (var i = 0; i <= this.affairList.length - 1; i++) {
                if (this.affairList[i].affairName == affairName) {
                    this.affairList[i].time = time;
                }
            }
        }
    };
    AffairManager.prototype.addAffairToOrganization = function (affairName, organizationName) {
        var affair = new affair_1.Affair();
        for (var index = 0; index <= this.organizationList.length - 1; index++) {
            if (this.organizationList[index].orgName == organizationName) {
                if (this.organizationList[index].getAffairName(affairName) == affairName) {
                    console.log("Affair already exists in the organization");
                    return;
                }
                else
                    for (var i = 0; i <= this.affairList.length - 1; i++) {
                        if (this.affairList[i].affairName == affairName)
                            affair = this.affairList[i];
                    }
                console.log("Affair added.");
                this.organizationList[index].affairList.push(affair);
            }
        }
    };
    AffairManager.prototype.getMembers = function (affairName) {
        for (var i = 0; i < this.affairList.length; i++) {
            if (this.affairList[i].affairName == affairName) {
                var members = this.affairList[i].affairMemberList;
                return members;
            }
        }
    };
    return AffairManager;
}());
exports.AffairManager = AffairManager;
//# sourceMappingURL=manager.js.map