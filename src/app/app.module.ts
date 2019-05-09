import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {NaviComponent} from "./navi/navi.component";
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatDialogModule, MatSelectModule, MatOptionModule
} from '@angular/material';
import {MarkdownModule} from "ngx-markdown";
import {FormsModule} from "@angular/forms";
import {LayoutModule} from "@angular/cdk/layout";
import {FlexLayoutModule} from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { AllBooksComponent } from './all-books/all-books.component';
import { LoadingComponent } from './loading/loading.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { LoginComponent } from './login/login.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

@NgModule({
    declarations: [
        AppComponent,
        NaviComponent,
        AllBooksComponent,
        LoadingComponent,
        BookDetailsComponent,
        LoginComponent,
        ViewCartComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        FlexLayoutModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        HttpClientModule,
        GraphQLModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule,
        MarkdownModule.forRoot(),
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
