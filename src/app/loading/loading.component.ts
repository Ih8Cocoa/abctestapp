import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() marginTop: number;

  constructor() {
  }

  ngOnInit() {
    if (!this.marginTop || this.marginTop === 0) {
      this.marginTop = 250;
    }
  }

}
