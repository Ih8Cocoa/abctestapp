import {Component, OnDestroy, OnInit} from '@angular/core';
import {GqlGeneratorService} from "../services/gql-generator.service";
import {MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

interface LoginCredential {
    email: string;
    token: string;
}

interface LoginRepo {
    readerLogin: LoginCredential;
}

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

    private sub: Subscription;

    fields = "email token";

    constructor(private gqlGen: GqlGeneratorService, private matDialogRef: MatDialogRef<LoginDialogComponent>,
                private router: Router) {
    }

    ngOnInit() {
    }

    submit(email: string, password: string) {
        this.sub = this.gqlGen.readerLoginApolloQuery<LoginRepo>(email, password, this.fields)
            .valueChanges
            .subscribe(result => {
                const token = result.data.readerLogin.token;
                localStorage.setItem('token', token);
                alert('Login successful');
                this.router.navigate(['/']);
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
