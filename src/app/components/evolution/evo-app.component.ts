import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from '../../services/company.service';
import { ICompany } from '../../classes/company';
import { AppSettings } from './../../classes/appSettings';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

declare var ga:Function;

@Component({
  //moduleId: module.id,
  selector: 'evo-app',
  templateUrl: './evo-app.html',
  providers: [CompanyService, Title]
})

export class EvoAppComponent implements OnInit, OnDestroy {
  currentRoute: string = '';

  WebApiUrl: string = AppSettings.WebApiUrl;
  IsAnalyticsActive: boolean = AppSettings.IsAnalyticsActive;

  company: ICompany = null;
  companySubscription: Subscription = null;
  
  constructor(private companyService: CompanyService, private titleService: Title, private router: Router){
    if (this.IsAnalyticsActive){
      router.events.subscribe((route) => {
      let newRoute: string = router.url;
      if(newRoute !== this.currentRoute) {
        ga('send', 'pageview', newRoute);
        this.currentRoute = newRoute;
      }
    });
    }
  }

  ngOnInit(){
    this.companySubscription = this.companyService.getCompany().subscribe(company => {
      this.company = company;

      // define title of page
      if (this.company.title.length > 0){
        this.titleService.setTitle(this.company.title);
      }
    });
  }

  ngOnDestroy(){
    if (this.companySubscription) this.companySubscription.unsubscribe();
  }
}