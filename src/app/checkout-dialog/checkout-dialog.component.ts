import {Component, OnDestroy, OnInit} from '@angular/core';
import {GqlGeneratorService} from "../services/gql-generator.service";
import {MatDialogRef} from "@angular/material";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";

interface CheckoutInfo {
    name: string;
    address: string;
    paymentMethod: string;
}

@Component({
    selector: 'app-checkout-dialog',
    templateUrl: './checkout-dialog.component.html',
    styleUrls: ['./checkout-dialog.component.scss']
})
export class CheckoutDialogComponent implements OnInit, OnDestroy {

    currentInfo = {} as CheckoutInfo;
    stuff: string[] = Array(5).fill('');

    constructor(private gqlGen: GqlGeneratorService, private matDialogRef: MatDialogRef<CheckoutDialogComponent>,
                private router: Router) {
    }

    onCancel() {
        this.matDialogRef.close();
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

    submit() {
        const {name, address, paymentMethod} = this.currentInfo;
        this.gqlGen.readerCheckoutApolloMutation(name, address, paymentMethod)
            .pipe(take(1))
            .subscribe(() => {
                alert('Checkout completed');
                this.router.navigate(['/']);
            });
    }

}
