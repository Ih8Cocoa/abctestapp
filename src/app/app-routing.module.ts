import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllBooksComponent} from "./all-books/all-books.component";
import {BookDetailsComponent} from "./book-details/book-details.component";

const routes: Routes = [{
    path: '',
    component: AllBooksComponent
}, {
    path: 'book/:id',
    component: BookDetailsComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
