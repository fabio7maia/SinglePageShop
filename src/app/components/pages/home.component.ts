import { Component } from '@angular/core';
import { ProductsService } from './../../services/products.service';

@Component({
  //moduleId: module.id,
  providers: [ProductsService],
  templateUrl: './home.html'
})
export class HomeComponent  { }
