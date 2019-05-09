import {Component, OnDestroy, OnInit} from '@angular/core';
import {GqlGeneratorService} from "../services/gql-generator.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

interface Credential {
    email: string;
    token: string;
}

interface LoginRepo {
    readerLogin: Credential;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    credential = {
        email: "",
        password: ""
    };
    sub: Subscription;
    fields = "email token";

    constructor(private gqlGen: GqlGeneratorService, private router: Router) {
    }

    ngOnInit() {
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token') && !!localStorage.getItem('userEmail');
    }

    private storeToken({data}): void {
        const token = data.readerLogin.token;
        const email = data.readerLogin.email;
        localStorage.setItem('userEmail', email);
        localStorage.setItem('token', token);
        alert('Login successful');
    }

    submit() {
        console.log('Submitting login data...');
        console.log(this.credential);
        this.sub = this.gqlGen.readerLoginApolloQuery<LoginRepo>(this.credential.email, this.credential.password, this.fields)
            .valueChanges
            .pipe(map(this.storeToken))
            .subscribe(() => this.router.navigate(['/']));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
