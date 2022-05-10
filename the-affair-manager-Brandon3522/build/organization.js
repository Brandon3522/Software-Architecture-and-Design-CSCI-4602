"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
var Organization = (function () {
    function Organization(orgName) {
        this._orgName = orgName;
        this._affairList = [];
    }
    Object.defineProperty(Organization.prototype, "orgName", {
        get: function () {
            return this._orgName;
        },
        set: function (v) {
            this._orgName = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "affairList", {
        get: function () {
            return this._affairList;
        },
        set: function (v) {
            this._affairList = v;
        },
        enumerable: false,
        configurable: true
    });
    Organization.prototype.getAffairName = function (affairName) {
        var affair = "";
        for (var i = 0; i <= this.affairList.length - 1; i++) {
            if (this.affairList[i].affairName == affairName) {
                affair = this.affairList[i].affairName;
            }
        }
        return affair;
    };
    return Organization;
}());
exports.Organization = Organization;
//# sourceMappingURL=organization.js.map