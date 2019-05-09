import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllBooksComponent} from "./all-books/all-books.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {LoginComponent} from "./login/login.component";
import {ViewCartComponent} from "./view-cart/view-cart.component";

const routes: Routes = [{
    path: '',
    component: AllBooksComponent
}, {
    path: 'book/:id',
    component: BookDetailsComponent,
    pathMatch: 'full'
}, {
    path: 'login',
    component: LoginComponent
}, {
    path: 'shopping-cart',
    component: ViewCartComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
