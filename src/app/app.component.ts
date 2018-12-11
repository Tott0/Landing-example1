import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

// import * as $ from 'jquery';
// import 'final_countdown';

declare let $: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    title = 'BitcoinWorldWeb';

    ngAfterViewInit() {

    }
}
