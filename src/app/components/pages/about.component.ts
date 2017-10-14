import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from '../../services/company.service';
import { ICompany } from '../../classes/company';
import { AppSettings } from './../../classes/appSettings';

@Component({
  //moduleId: module.id,
  templateUrl: './about.html',
  providers: [CompanyService]
})

export class AboutComponent implements OnInit, OnDestroy {
  WebApiUrl: string = AppSettings.WebApiUrl;

  company: ICompany = null;
  companySubscription: Subscription = null;
  
  constructor(private companyService: CompanyService){}

  ngOnInit(){
    this.companySubscription = this.companyService.getCompany().subscribe(company => {
      this.company = company;
      console.log(this.company);
    });
  }

  ngOnDestroy(){
    if (this.companySubscription) this.companySubscription.unsubscribe();
  }
}