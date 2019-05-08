import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Apollo} from "apollo-angular";
import {GqlGeneratorService} from "../services/gql-generator.service";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

interface BookDetails {
    title: string;
    description: string;
    priceEBook: number;
    pricePhysical: number;
    linkCover: string;
    authors: [{
        name: string;
    }];
    categories: [{
        name: string;
    }];
    publisher: {
        name: string;
    };
    language: {
        name: string;
    };
    categoryPaths: string[];
}

interface BookDetailsRepo {
    oneBook: BookDetails;
}
@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
    private readonly fields = `title description priceEBook pricePhysical authors {name}
   categories {name} language {name} publisher {name} linkCover categoryPaths`;
    isLoading: boolean;
    bookDetails: Observable<BookDetails>;
    private sub: Subscription;

    private extract({data}: any): BookDetails {
        console.log(data);
        console.log(data.oneBook);
        return data.oneBook;
    }

    constructor(private route: ActivatedRoute, private gqlGen: GqlGeneratorService) {
    }

    refreshData() {
        const id = this.route.snapshot.paramMap.get('id');
        this.bookDetails = this.gqlGen.findBookByIDApolloQuery(id, this.fields)
            .valueChanges
            .pipe(map(this.extract));
        this.sub = this.bookDetails.subscribe(() => this.isLoading = false);
    }

    ngOnInit() {
        this.refreshData();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
