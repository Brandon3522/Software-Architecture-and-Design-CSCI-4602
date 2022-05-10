"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
var Member = (function () {
    function Member(name, email) {
        var _this = this;
        this.toString = function () {
            return "Member: " + _this.mName + " Email: " + _this.email;
        };
        this._mName = name;
        this._email = email;
    }
    Object.defineProperty(Member.prototype, "mName", {
        get: function () {
            return this._mName;
        },
        set: function (name) {
            this._mName = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Member.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (email) {
            this._email = email;
        },
        enumerable: false,
        configurable: true
    });
    return Member;
}());
exports.Member = Member;
//# sourceMappingURL=member.js.map