import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pages/home.component';
import { ProductComponent } from './components/pages/product-detail.component';
import { AboutComponent } from './components/pages/about.component';
import { ContactsComponent } from './components/pages/contacts.component';
import { CheckOutComponent } from './components/pages/checkout.component';
import { PageNotFoundComponent } from './components/pages/page-not-found.component';

// Route Configuration
export const routes: Routes = [
  { path: 'product/:id', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
