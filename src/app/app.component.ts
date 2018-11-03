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

    @ViewChild('.countdown') countdown;

    ngAfterViewInit() {
        // console.log(this.countdown);

        const start = new Date(2018, 10, 0);
        const now = new Date();
        const end = new Date(2019, 0, 6);

        $('.countdown').final_countdown({
            start: Math.floor(start.getTime() / 1000),
            end: Math.floor(end.getTime() / 1000),
            now: Math.floor(now.getTime() / 1000),
            // selectors: {
            //     value_seconds: '.clock-seconds .val',
            //     canvas_seconds: 'canvas_seconds',
            //     value_minutes: '.clock-minutes .val',
            //     canvas_minutes: 'canvas_minutes',
            //     value_hours: '.clock-hours .val',
            //     canvas_hours: 'canvas_hours',
            //     value_days: '.clock-days .val',
            //     canvas_days: 'canvas_days'
            // },
            seconds: {
                borderColor: '#FFFFFF',
                borderWidth: '6'
            },
            minutes: {
                borderColor: '#FFFFFF',
                borderWidth: '6'
            },
            hours: {
                borderColor: '#FFFFFF',
                borderWidth: '6'
            },
            days: {
                borderColor: '#FFFFFF',
                borderWidth: '6'
            }
        }, function() {
            // Finish callback
        });

    }
}
