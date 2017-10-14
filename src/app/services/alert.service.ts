import { Injectable } from '@angular/core';
import { AppSettings } from './../classes/appSettings';

declare var require: any;
var swal = require('sweetalert');

@Injectable()
export class AlertService {

    private isNull(val: any): boolean{
        if(val == undefined || val == null || val == '' || val == "") return true;
        return false;
    }

    alertSuccess(title: string, text: string){
        swal(title, text, "success");
    }

    alertError(title: string, text: string){
        swal(title, text, "error");
    }

    alertSuccessClose(title: string, text: string, timer: number = 1500){
        if (this.isNull(title)) title = 'Sucesso';
        if (this.isNull(text)) title = 'Operação efetuada com sucesso.';
        if (this.isNull(timer)) timer = 1500;
        
        swal({
            title: title,
            text: text,
            timer: timer,
            type: 'success',
            showConfirmButton: false
        });
    }

    alertErrorClose(title: string, text: string, timer: number = 5000){
        if (this.isNull(title)) title = 'Erro';
        if (this.isNull(text)) title = 'Não foi possível concluir a operação pois ocorreram erros.';
        if (this.isNull(timer)) timer = 5000;
        
        swal({
            title: title,
            text: text,
            timer: timer,
            type: 'error',
            showConfirmButton: true
        });
    }
}