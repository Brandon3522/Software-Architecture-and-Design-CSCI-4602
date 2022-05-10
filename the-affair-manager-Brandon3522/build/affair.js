"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Affair = void 0;
var Affair = (function () {
    function Affair(affairName, location, time) {
        this._affairName = affairName;
        this.time = time;
        this.location = location;
        this._affairMemberList = [];
    }
    Object.defineProperty(Affair.prototype, "affairMemberList", {
        get: function () {
            return this._affairMemberList;
        },
        set: function (affairMemberList) {
            this._affairMemberList = affairMemberList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Affair.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (v) {
            this._time = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Affair.prototype, "location", {
        get: function () {
            return this._location;
        },
        set: function (v) {
            this._location = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Affair.prototype, "affairName", {
        get: function () {
            return this._affairName;
        },
        set: function (v) {
            this._affairName = v;
        },
        enumerable: false,
        configurable: true
    });
    Affair.prototype.getMemberName = function (memberName) {
        var member = "";
        for (var i = 0; i <= this._affairMemberList.length - 1; i++) {
            if (this._affairMemberList[i].mName == memberName) {
                member = this._affairMemberList[i].mName;
            }
        }
        return member;
    };
    return Affair;
}());
exports.Affair = Affair;
//# sourceMappingURL=affair.js.map