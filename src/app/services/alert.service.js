"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var swal = require('sweetalert');
var AlertService = (function () {
    function AlertService() {
    }
    AlertService.prototype.isNull = function (val) {
        if (val == undefined || val == null || val == '' || val == "")
            return true;
        return false;
    };
    AlertService.prototype.alertSuccess = function (title, text) {
        swal(title, text, "success");
    };
    AlertService.prototype.alertError = function (title, text) {
        swal(title, text, "error");
    };
    AlertService.prototype.alertSuccessClose = function (title, text, timer) {
        if (timer === void 0) { timer = 1500; }
        if (this.isNull(title))
            title = 'Sucesso';
        if (this.isNull(text))
            title = 'Operação efetuada com sucesso.';
        if (this.isNull(timer))
            timer = 1500;
        swal({
            title: title,
            text: text,
            timer: timer,
            type: 'success',
            showConfirmButton: false
        });
    };
    AlertService.prototype.alertErrorClose = function (title, text, timer) {
        if (timer === void 0) { timer = 5000; }
        if (this.isNull(title))
            title = 'Erro';
        if (this.isNull(text))
            title = 'Não foi possível concluir a operação pois ocorreram erros.';
        if (this.isNull(timer))
            timer = 5000;
        swal({
            title: title,
            text: text,
            timer: timer,
            type: 'error',
            showConfirmButton: true
        });
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable()
], AlertService);
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map