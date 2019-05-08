import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

    constructor(private breakpointObserver: BreakpointObserver) {
    }

    readonly links: Hyperlinks[] = [
        {href: '/', text: 'Homepage'}
    ];
}
