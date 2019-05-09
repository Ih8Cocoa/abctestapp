import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, combineLatest, defer} from "rxjs";
import {GqlGeneratorService} from "../services/gql-generator.service";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

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
    publishDate: string;
}

interface BookCard {
    id: string;
    linkCover: string;
    authors: [{
        name: string;
    }];
    title: string;
}

interface BookDetailsRepo {
    oneBook: BookDetails;
}

interface SimilarBookRepo {
    findSimilarBooks: BookCard;
}

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
    private readonly detailsFields = `title description priceEBook pricePhysical authors {name}
   categories {name} language {name} publisher {name} linkCover categoryPaths publishDate`;
    private readonly recommendFields = "id linkCover authors {name} title";
    isLoading: boolean;
    bookDetails: Observable<BookDetails>;
    similarBooks: Observable<BookCard[]>;
    private subs: Subscription[] = [];
    private readonly RECOMMENDATION_LIMIT = 5;

    constructor(private route: ActivatedRoute, private gqlGen: GqlGeneratorService, private router: Router) {
    }

    refreshData() {
        const sub = this.route.params
            .subscribe(params => {
                console.log("I entered");
                this.isLoading = true;
                const id = params.id;
                console.log(id);
                this.bookDetails = this.gqlGen.findBookByIDApolloQuery<BookDetailsRepo>(id, this.detailsFields)
                    .valueChanges
                    .pipe(map(({data}: any) => {
                        console.log(data.oneBook);
                        return data.oneBook;
                    }));
                this.similarBooks = this.gqlGen.findRelatedBooksApolloQuery<SimilarBookRepo>(
                    id, this.RECOMMENDATION_LIMIT, this.recommendFields
                )
                    .valueChanges
                    .pipe(map(({data}: any) => {
                        console.log(data.findSimilarBooks);
                        return data.findSimilarBooks;
                    }));
                const sub1 = combineLatest([this.bookDetails, this.similarBooks])
                    .subscribe(() => this.isLoading = false);
                this.subs.push(sub1);
            });
        this.subs.push(sub);
    }

    ngOnInit() {
        this.refreshData();
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    toDateStr(str: string) {
        return (new Date(str)).toUTCString();
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token') && !!localStorage.getItem('userEmail');
    }

    toAuthorsStr(book: BookCard) {
        return book.authors.map(a => a.name).join(', ');
    }

    addEBookToCart() {
        const id = this.route.snapshot.paramMap.get('id');
        this.gqlGen.readerAddEBookToCartApolloMutation(id)
            .subscribe(() => {
                alert('e-book has been added to cart');
                this.router.navigate(['/']);
            });
    }

    addRealBookToCart() {
        const id = this.route.snapshot.paramMap.get('id');
        this.gqlGen.readerAddPhysicalBookToCartApolloMutation(id, 1)
            .subscribe(() => {
                alert('Physical book has been added to cart');
                this.router.navigate(['/']);
            });
    }
}
