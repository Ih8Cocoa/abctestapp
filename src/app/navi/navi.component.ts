import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";

interface Hyperlinks {
    href: string;
    text: string;
}

@Component({
    selector: 'app-navi',
    templateUrl: './navi.component.html',
    styleUrls: ['./navi.component.css']
})
export class NaviComponent {
    private readonly handsetWidth = 1024;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([`(max-width: ${this.handsetWidth}px)`])
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    }

    isLoggedIn() {
        return !!localStorage.getItem('token') && !!localStorage.getItem('userEmail');
    }

    links(): Hyperlinks[] {
        const rtn: Hyperlinks[] = [
            {href: '/', text: 'Homepage'}
        ];
        if (this.isLoggedIn()) {
            rtn.push({href: '/shopping-cart', text: 'Shopping Cart'});
        } else {
            rtn.push({href: '/login', text: 'Login page'});
        }
        return rtn;
    }

    changeRoute(href: string) {
        this.router.navigate(['/shopping-cart']);
    }
}
