import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {GqlGeneratorService} from "../services/gql-generator.service";
import {map} from "rxjs/operators";

interface BookCard {
    id: string;
    linkCover: string;
    authors: [{
        name: string;
    }];
    title: string;
}

interface BookLocalRepo {
    allBooks: BookCard[];
}

@Component({
    selector: 'app-all-books',
    templateUrl: './all-books.component.html',
    styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit, OnDestroy {
    private readonly fields = "id title authors {name} linkCover language {name}";

    loading: boolean;

    bookCards: Observable<BookCard[]>;

    // avoid memory leaks
    private subs: Subscription[] = [];

    private extract({data}: any): BookCard[] {
        console.log(data);
        console.log(data.allBooks);
        return data.allBooks;
    }

    refreshData() {
        this.loading = true;
        this.bookCards =  this.gqlGen.allBooksApolloQuery<BookLocalRepo>(this.fields)
            .valueChanges
            .pipe(map(this.extract));
        const sub = this.bookCards.subscribe(() => this.loading = false);
        this.subs.push(sub);
    }

    constructor(private gqlGen: GqlGeneratorService) {
    }

    ngOnInit() {
        this.refreshData();
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    toAuthorsStr(book: BookCard) {
        return book.authors.map(a => a.name).join(', ');
    }
}
