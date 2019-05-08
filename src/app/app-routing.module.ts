import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllBooksComponent} from "./all-books/all-books.component";

const routes: Routes = [{
  path: '',
  component: AllBooksComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
