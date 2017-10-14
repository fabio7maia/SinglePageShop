"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/pages/home.component");
var product_detail_component_1 = require("./components/pages/product-detail.component");
var about_component_1 = require("./components/pages/about.component");
var contacts_component_1 = require("./components/pages/contacts.component");
var checkout_component_1 = require("./components/pages/checkout.component");
var page_not_found_component_1 = require("./components/pages/page-not-found.component");
// Route Configuration
exports.routes = [
    { path: 'product/:id', component: product_detail_component_1.ProductComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'contacts', component: contacts_component_1.ContactsComponent },
    { path: 'checkout', component: checkout_component_1.CheckOutComponent },
    { path: '', component: home_component_1.HomeComponent },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });
//# sourceMappingURL=app.routes.js.map