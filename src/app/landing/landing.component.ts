import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AppConstants } from '@app/app-constants';
import { getErrorMessage } from '@core/static-methods';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100)
      ]),
      transition(':leave', [
        animate(100, style({ opacity: 0 }))
      ])
    ]),
    trigger('flipFrontBack', [
      state('true', style({
        transform: 'rotateY(0)'
      })),
      state('false', style({
        transform: 'rotateY(0)'
      })),
      transition('false <=> true', [
        style({
          transform: 'rotateY(180deg)'
        }),
        animate('350ms ease-out', keyframes([
          style({ transform: 'rotateY(180deg)', offset: 0 }),
          style({ transform: 'rotateY(90deg)', offset: 0.3 }),
          style({ transform: 'rotateY(0)', offset: 1 })
        ]))
      ]),
      transition('back => front', [
        animate('0ms')
      ])
    ]),
    trigger('slideLeftRight', [
      state('left', style({
        transform: 'translateX(-100%)'
      })),
      state('right', style({
        transform: 'translateX(100%)'
      })),
      state('normalFromLeft', style({
        transform: 'translateX(0)'
      })),
      state('normalFromRight', style({
        transform: 'translateX(0)'
      })),
      transition('* => left', [
        style({
          transform: 'translateX(0)'
        }),
        animate('600ms ease-in-out', style({
          transform: 'translateX(-100%)'
        }))
      ]),
      transition('* => right', [
        style({
          transform: 'translateX(0)'
        }),
        animate('6000s ease-in-out', style({
          transform: 'translateX(100%)'
        }))
      ]),
      transition('* => normalFromLeft', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('600ms ease-in-out', style({
          transform: 'translateX(0)'
        }))
      ]),
      transition('* => normalFromRight', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('600ms ease-in-out', style({
          transform: 'translateX(0)'
        }))
      ]),
      transition('* => *', [animate('600ms ease-in-out')]),
    ])
  ]
})
export class LandingComponent implements OnInit, OnDestroy {

  carouselItems = [
    {
      id: 1,
      img: '/assets/images/carousel-bg-1.jpg',
      text: '<span>SECURE</span> AND <span>EASY WAY</span> <br> TO BITCOIN',
      button: 'LEARN MORE',
      animState: 'normal'
    },
    {
      id: 2,
      img: '/assets/images/carousel-bg-2.jpg',
      text: '<span>BITCOIN</span> EXCHANGE <br> YOU CAN <span>TRUST</span>',
      button: 'OUR PRICES'
    }
  ];
  carouselIndex = 0;

  selectedAboutTab = 0;

  selectedService = 0;

  buyingOffers = [
    {
      value: '0.007 BTC',
      price: '$100'
    },
    {
      value: '0.015 BTC',
      price: '$300'
    },
    {
      value: '0.031 BTC',
      price: '$500'
    },
    {
      value: '0.081 BTC',
      price: '$1000'
    }
  ];
  sellingOffers = [
    {
      value: '100 USD',
      price: '₿0.2'
    },
    {
      value: '1000 USD',
      price: '₿0.5'
    },
    {
      value: '3000 USD',
      price: '₿1'
    },
    {
      value: '9000 USD',
      price: '₿2'
    }
  ];
  visibleOffers = this.buyingOffers;
  isBuying = 0;
  priceOfferFlipState = false;

  currs = [
    {
      code: 'USD'
    },
    {
      code: 'EUR'
    },
    {
      code: 'COP'
    },
    {
      code: 'CAD'
    },
    {
      code: 'YEN'
    }
  ];
  selectedCurrencyIndex = 0;
  btcValue = 1;
  currValue = 1;

  teamMembers = [
    {
      name: 'Lina Marzouki',
      role: 'Ceo Founder',
      img: 'assets/images/member1.jpg'
    },

    {
      name: 'Marco Verratti',
      role: 'Director',
      img: 'assets/images/member2.jpg'
    },

    {
      name: 'Emilia Bella',
      role: 'Bitcoin Consultant',
      img: 'assets/images/member3.jpg'
    },

    {
      name: 'Antonio Conte',
      role: 'Bitcoin Developer',
      img: 'assets/images/member4.jpg'
    },
  ];

  reviews = [
    {
      review: 'Vestibulum sed mauris quis arcu bibendum semper sed vitae erat. Praesent sit amet nisi tristique, lacinia mauris ut.',
      author: 'Keelan Wade',
      authorPosition: 'Financial Services Professional',
      thumbnail: 'assets/images/review-thumb1.jpg',
      rating: 5.0
    },
    {
      review: 'Praesent dictum dolor a augue tempor, et congue nisi accumsan. Mauris tempus orci dolor. Donec elementum magna.',
      author: 'Elizabeth Mcgregor',
      authorPosition: 'Future Group Specialist',
      thumbnail: 'assets/images/review-thumb2.jpg',
      rating: 4.0
    },
    {
      review: 'Fusce nec pharetra quam, sit amet sagittis erat. Praesent convallis maximus quam at feugiat. Ut condimentum.',
      author: 'Dylan Castaneda',
      authorPosition: 'Product Response Facilitator',
      thumbnail: 'assets/images/review-thumb3.jpg',
      rating: 4.8
    },
    {
      review: 'Vestibulum tellus magna, malesuada non lacus facilisis, consectetur odio. Cras non odio sit amet mauris efficitur vel.',
      author: 'Esha Barnes',
      authorPosition: 'Internal Directives Specialist',
      thumbnail: 'assets/images/review-thumb4.jpg',
      rating: 4.6
    },
    {
      review: 'Sed congue magna vel libero blandit, nec mollis risus consectetur. Praesent lectus dolor, iaculis vitae sem non, posuere.',
      author: 'Zayn Wynn',
      authorPosition: 'Legacy Factors Manager',
      thumbnail: 'assets/images/review-thumb5.jpg',
      rating: 4.2
    },
    {
      review: 'Proin pellentesque dolor a facilisis vestibulum. Suspendisse vestibulum orci sapien, at semper nisl pharetra vel. Integer.',
      author: 'Lacie Forrest',
      authorPosition: 'Product Usability Agent',
      thumbnail: 'assets/images/review-thumb6.jpg',
      rating: 5.0
    }
  ];
  reviewIndex = 0;
  shownReviews = this.reviews.slice(0, 3);
  hideRevRight = false;
  hideRevLeft = false;


  // lineChart
  public lineChartData: Array<any> = [
    {
      data: [
        {
          x: '2018-09-01',
          y: 2106.13
        },
        {
          x: '2018-09-02',
          y: 2099.52
        },
        {
          x: '2018-09-03',
          y: 2112.87
        },
        {
          x: '2018-09-04',
          y: 2025.42
        },
        {
          x: '2018-09-05',
          y: 2073.61
        },
        {
          x: '2018-09-06',
          y: 2085.1
        },
        {
          x: '2018-09-07',
          y: 2454.76
        },
        {
          x: '2018-09-08',
          y: 2749.62
        },
        {
          x: '2018-09-09',
          y: 2013.58
        },
        {
          x: '2018-09-10',
          y: 2133.38
        },
        {
          x: '2018-09-11',
          y: 2233.13
        },
        {
          x: '2018-09-12',
          y: 3069.10
        },
        {
          x: '2018-09-13',
          y: 2221.40
        },
        {
          x: '2018-09-14',
          y: 2937.44
        },
        {
          x: '2018-09-15',
          y: 2478.7
        },
        {
          x: '2018-09-16',
          y: 3565.6
        },
        {
          x: '2018-09-17',
          y: 3288.27
        },
        {
          x: '2018-09-18',
          y: 3435.10
        },
        {
          x: '2018-09-19',
          y: 2640.91
        },
        {
          x: '2018-09-20',
          y: 3513.0
        },
        {
          x: '2018-09-21',
          y: 3021.17
        },
        {
          x: '2018-09-22',
          y: 2849.38
        },
        {
          x: '2018-09-23',
          y: 2082.77
        },
        {
          x: '2018-09-24',
          y: 3261.46
        },
        {
          x: '2018-09-25',
          y: 4138.33
        },
        {
          x: '2018-09-26',
          y: 3729.63
        },
        {
          x: '2018-09-27',
          y: 2634.92
        },
        {
          x: '2018-09-28',
          y: 4169.48
        },
        {
          x: '2018-09-29',
          y: 4420.52
        },
        {
          x: '2018-09-30',
          y: 3963.81
        },
        {
          x: '2018-09-30',
          y: 2850.70
        },
        {
          x: '2018-10-01',
          y: 4062.51
        },
        {
          x: '2018-10-02',
          y: 4174.61
        },
        {
          x: '2018-10-03',
          y: 4328.72
        },
        {
          x: '2018-10-04',
          y: 4140.37
        },
        {
          x: '2018-10-05',
          y: 4412.67
        },
        {
          x: '2018-10-06',
          y: 4136.61
        },
        {
          x: '2018-10-07',
          y: 4395.55
        },
        {
          x: '2018-10-08',
          y: 4636.35
        },
        {
          x: '2018-10-09',
          y: 4106.40
        },
        {
          x: '2018-10-10',
          y: 4952.3
        },
        {
          x: '2018-10-11',
          y: 4745.7
        },
        {
          x: '2018-10-12',
          y: 4376.78
        },
        {
          x: '2018-10-13',
          y: 4403.44
        },
        {
          x: '2018-10-14',
          y: 4220.64
        },
        {
          x: '2018-10-15',
          y: 4397.32
        },
        {
          x: '2018-10-16',
          y: 5572.65
        },
        {
          x: '2018-10-17',
          y: 4698.84
        },
        {
          x: '2018-10-18',
          y: 5132.98
        },
        {
          x: '2018-10-19',
          y: 5800.61
        },
        {
          x: '2018-10-20',
          y: 5472.83
        },
        {
          x: '2018-10-21',
          y: 5690.29
        },
        {
          x: '2018-10-22',
          y: 2624.10
        },
        {
          x: '2018-10-23',
          y: 2489.79
        },
        {
          x: '2018-10-24',
          y: 2284.11
        },
        {
          x: '2018-10-25',
          y: 2002.44
        },
        {
          x: '2018-10-26',
          y: 2820.54
        },
        {
          x: '2018-10-27',
          y: 2916.22
        },
        {
          x: '2018-10-28',
          y: 2648.39
        },
        {
          x: '2018-10-29',
          y: 2400.8
        },
        {
          x: '2018-10-30',
          y: 2182.7
        },
        {
          x: '2018-10-31',
          y: 2912.89
        },
        {
          x: '2018-11-01',
          y: 2158.68
        },
        {
          x: '2018-11-02',
          y: 2291.96
        },
        {
          x: '2018-11-03',
          y: 2302.39
        },
        {
          x: '2018-11-04',
          y: 2167.86
        },
        {
          x: '2018-11-05',
          y: 2490.51
        },
        {
          x: '2018-11-06',
          y: 2275.72
        },
        {
          x: '2018-11-07',
          y: 2501.38
        },
        {
          x: '2018-11-08',
          y: 2567.25
        },
        {
          x: '2018-11-09',
          y: 2113.13
        },
        {
          x: '2018-11-10',
          y: 2785.49
        },
        {
          x: '2018-11-11',
          y: 2700.11
        },
        {
          x: '2018-11-12',
          y: 2371.45
        },
        {
          x: '2018-11-13',
          y: 3109.54
        },
        {
          x: '2018-11-14',
          y: 3173.60
        },
        {
          x: '2018-11-15',
          y: 3310.43
        },
        {
          x: '2018-11-16',
          y: 3359.54
        },
        {
          x: '2018-11-17',
          y: 3234.89
        },
        {
          x: '2018-11-18',
          y: 3653.59
        },
        {
          x: '2018-11-19',
          y: 3418.12
        },
        {
          x: '2018-11-20',
          y: 3695.6
        },
        {
          x: '2018-11-21',
          y: 3628.79
        },
        {
          x: '2018-11-22',
          y: 3229.63
        },
        {
          x: '2018-11-23',
          y: 3326.26
        },
        {
          x: '2018-11-24',
          y: 3135.37
        },
        {
          x: '2018-11-25',
          y: 3545.78
        },
        {
          x: '2018-11-26',
          y: 3473.24
        },
        {
          x: '2018-11-27',
          y: 5039.20
        },
        {
          x: '2018-11-28',
          y: 5907.29
        },
        {
          x: '2018-11-29',
          y: 5298.82
        },
        {
          x: '2018-11-30',
          y: 5085.58
        },
        {
          x: '2018-12-01',
          y: 5068.23
        },
        {
          x: '2018-12-02',
          y: 5209.28
        },
        {
          x: '2018-12-03',
          y: 5206.86
        },
        {
          x: '2018-12-04',
          y: 5251.17
        },
        {
          x: '2018-12-05',
          y: 5415.48
        },
        {
          x: '2018-12-06',
          y: 5257.10
        },
        {
          x: '2018-12-07',
          y: 5672.38
        },
        {
          x: '2018-12-08',
          y: 5755.69
        },
        {
          x: '2018-12-09',
          y: 5386.27
        },
        {
          x: '2018-12-10',
          y: 5865.49
        },
        // {
        //   x: '2018-12-11',
        //   y: 7453.77
        // },
        // {
        //   x: '2018-12-12',
        //   y: 8223.43
        // },
        // {
        //   x: '2018-12-13',
        //   y: 8036.3
        // },
        // {
        //   x: '2018-12-14',
        //   y: 7581.42
        // },
        // {
        //   x: '2018-12-15',
        //   y: 7920.0
        // },
        // {
        //   x: '2018-12-16',
        //   y: 8075.4
        // },
        // {
        //   x: '2018-12-17',
        //   y: 8548.77
        // },
        // {
        //   x: '2018-12-18',
        //   y: 7467.86
        // },
        // {
        //   x: '2018-12-19',
        //   y: 8441.85
        // },
        // {
        //   x: '2018-12-20',
        //   y: 7935.92
        // },
        // {
        //   x: '2018-12-21',
        //   y: 8778.27
        // },
        // {
        //   x: '2018-12-22',
        //   y: 7211.74
        // },
        // {
        //   x: '2018-12-23',
        //   y: 7357.71
        // },
        // {
        //   x: '2018-12-24',
        //   y: 7131.17
        // },
        // {
        //   x: '2018-12-25',
        //   y: 9435.22
        // },
        // {
        //   x: '2018-12-26',
        //   y: 7269.21
        // },
        // {
        //   x: '2018-12-27',
        //   y: 9492.93
        // },
        // {
        //   x: '2018-12-28',
        //   y: 7483.43
        // },
        // {
        //   x: '2018-12-29',
        //   y: 8514.94
        // },
        // {
        //   x: '2018-12-30',
        //   y: 9045.61
        // },
        // {
        //   x: '2018-12-31',
        //   y: 7841.93
        // },
      ]
    },
  ];
  // public lineChartLabels: Array<any> = ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10'];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 32,
      },
    },
    animation: {
      duration: 0, // general animation time
    },
    hover: {
      animationDuration: 0, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0, // disables bezier curves,
        borderWidth: 1,
      }
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      yAxes: [{
        type: 'linear',
        ticks: {
          // min: 1000,
          beginAtZero: true,
          fontColor: 'rgba(255, 255, 255, 0.7)'
        },
        position: 'left',
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
      }],
      xAxes: [{
        type: 'time',
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          fontColor: 'rgba(255, 255, 255, 0.7)'
        },
        time: {
          unit: 'month'
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(17, 17, 17, 0.4)',
      borderColor: '#FB8C00',
      pointBackgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: '#EF6C00',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // blog posts
  latestPosts = [
    {
      url: 'blog-post-1',
      img: 'assets/images/blog-post-small-1.jpg',
      title: 'How Cryptocurrency Begun and Its Impact To Financial Transactions',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
      day: '01',
      month: 'JAN',
    },
    {
      url: 'blog-post-2',
      img: 'assets/images/blog-post-small-2.jpg',
      title: 'Cryptocurrency - Who Are Involved With It? Words about members',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
      day: '25',
      month: 'FEB',
    },
    {
      url: 'blog-post-3',
      img: 'assets/images/blog-post-small-3.jpg',
      title: 'Risks & Rewards Of Investing In Bitcoin. Pros and Cons',
      text: 'incididunt ut labore et dolore magna aliqua. Ut enim aminim veniam, quis nostrud...',
      day: '17',
      month: 'MAR',
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    AppConstants.isAtLanding = true;
  }

  ngOnDestroy() {
    AppConstants.isAtLanding = false;
  }

  selectAboutTab(tab) {
    if (this.selectedAboutTab < 0) {
      return;
    }
    this.selectedAboutTab = -1;

    setTimeout(() => {
      this.selectedAboutTab = tab;
    }, 150);
  }

  togglePricingList() {
    this.priceOfferFlipState = !this.priceOfferFlipState;
    this.visibleOffers = this.priceOfferFlipState ? this.sellingOffers : this.buyingOffers;
  }

  triggerCarouselLeft() {
    const prevIndex = this.carouselIndex;
    if (--this.carouselIndex < 0) {
      this.carouselIndex = this.carouselItems.length - 1;
    }
    console.log(prevIndex);
    console.log(this.carouselIndex);
    this.carouselItems[prevIndex].animState = 'right';
    this.carouselItems[this.carouselIndex].animState = 'normalFromLeft';
  }
  triggerCarouselRight() {
    const prevIndex = this.carouselIndex;
    if (++this.carouselIndex >= this.carouselItems.length) {
      this.carouselIndex = 0;
    }
    console.group('group');

    console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);

    this.carouselItems[prevIndex].animState = 'left';
    this.carouselItems[this.carouselIndex].animState = 'normalFromRight';

    console.log('prev ' + prevIndex, this.carouselItems[prevIndex].animState);
    console.log('sel ' + this.carouselIndex, this.carouselItems[this.carouselIndex].animState);
    console.groupEnd();
  }

}
