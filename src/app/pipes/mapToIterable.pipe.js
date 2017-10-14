"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MapToIterablePipe = (function () {
    function MapToIterablePipe() {
    }
    MapToIterablePipe.prototype.transform = function (obj, arg) {
        if (arg === void 0) { arg = 'keyval'; }
        var returnArray = new Array();
        obj.forEach(function (value, key) {
            if (arg === 'keyval') {
                returnArray.push({ value: value, key: key });
            }
            else if (arg == 'key') {
                returnArray.push(key);
            }
            else if (arg == 'value') {
                returnArray.push(value);
            }
        });
        //console.log(arg, obj, returnArray);
        return returnArray;
    };
    return MapToIterablePipe;
}());
MapToIterablePipe = __decorate([
    core_1.Pipe({
        name: 'mapToIterable',
        pure: false
    })
], MapToIterablePipe);
exports.MapToIterablePipe = MapToIterablePipe;
//# sourceMappingURL=mapToIterable.pipe.js.map