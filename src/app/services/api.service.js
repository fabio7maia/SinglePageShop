"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var appSettings_1 = require("./../classes/appSettings");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var ApiServiceSuccess = (function () {
    function ApiServiceSuccess(data) {
        this.data = data;
        this.success = true;
    }
    return ApiServiceSuccess;
}());
exports.ApiServiceSuccess = ApiServiceSuccess;
var ApiServiceError = (function () {
    function ApiServiceError(errors) {
        this.data = null;
        this.success = false;
        this.errors = errors;
    }
    return ApiServiceError;
}());
exports.ApiServiceError = ApiServiceError;
var ApiService = (function () {
    function ApiService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
    }
    ApiService.prototype.extractData = function (res) {
        var body = res.json();
        return new ApiServiceSuccess(body || {});
    };
    ApiService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        var errStatus;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errStatus = error.status.toString();
            errMsg = error.statusText.toString();
        }
        else {
            errMsg = error.message ? error.message : error.toString();
            errStatus = error.status;
        }
        return Observable_1.Observable.throw(new ApiServiceError([{ status: errStatus, message: errMsg }]));
    };
    ApiService.prototype.GetJsonP = function (url) {
        if (url.indexOf('?') >= 0) {
            url = appSettings_1.AppSettings.WebApiUrl + url + '&callback=JSONP_CALLBACK';
        }
        else {
            url = appSettings_1.AppSettings.WebApiUrl + url + '?callback=JSONP_CALLBACK';
        }
        return this.jsonp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ApiService.prototype.Post = function (url, data) {
        url = appSettings_1.AppSettings.WebApiUrl + url;
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: headers });
        return this.http.post(url, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ApiService.prototype.Get = function (url) {
        url = appSettings_1.AppSettings.WebApiUrl + url;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_1.Jsonp])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map