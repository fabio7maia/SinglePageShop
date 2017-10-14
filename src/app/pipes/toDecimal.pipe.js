"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ToDecimalPipe = (function () {
    function ToDecimalPipe() {
    }
    ToDecimalPipe.prototype.transform = function (value, decimalPoints) {
        var result = 0;
        var aux = Math.pow(10, decimalPoints);
        result = Math.round(value * aux);
        result /= aux;
        return result.toFixed(decimalPoints);
    };
    return ToDecimalPipe;
}());
ToDecimalPipe = __decorate([
    core_1.Pipe({
        name: 'toDecimal',
        pure: false
    })
], ToDecimalPipe);
exports.ToDecimalPipe = ToDecimalPipe;
//# sourceMappingURL=toDecimal.pipe.js.map