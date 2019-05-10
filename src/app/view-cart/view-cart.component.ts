import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Subscription} from "rxjs";
import {GqlGeneratorService} from "../services/gql-generator.service";
import {map} from "rxjs/operators";
import {CheckoutDialogComponent} from "../checkout-dialog/checkout-dialog.component";

interface ShoppingCart {
    bookId: string;
    title: string;
    EBook: boolean;
    amount: number;
}

interface ShoppingCartRepo {
    readerGetShoppingCart: {
        itemsInCart: ShoppingCart[]
    };
}

@Component({
    selector: 'app-view-cart',
    templateUrl: './view-cart.component.html',
    styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource = new MatTableDataSource<ShoppingCart>();
    isLoading = true;
    private sub: Subscription;
    readonly displayedColumns = ['title', 'EBook', 'amount'];
    private readonly fields = "itemsInCart {bookId title EBook amount}";

    constructor(private gqlGen: GqlGeneratorService, private dialog: MatDialog) {
    }

    private extract({data}: any): ShoppingCart[] {
        const items = data.readerGetShoppingCart.itemsInCart;
        console.log(items);
        return items;
    }

    ngOnInit() {
        this.sub = this.gqlGen.readerGetShoppingCartApolloQuery<ShoppingCartRepo>(this.fields)
            .valueChanges
            .pipe(map(this.extract))
            .subscribe(sources => {
            this.dataSource.data = sources;
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    prepareCheckout() {
        this.dialog.open(CheckoutDialogComponent);
    }

    placeHolder() {
        alert('Place button clicked!');
    }
}
