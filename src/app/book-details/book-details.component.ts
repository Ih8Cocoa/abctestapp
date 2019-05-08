import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
    private readonly fields = `title description priceEBook pricePhysical authors {name}
   categories {name} language {name} publisher {name} linkCover`;
    isLoading: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
