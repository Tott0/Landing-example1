import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AppConstants } from '@app/app-constants';
import { getErrorMessage } from '@core/static-methods';

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
      state('front', style({
        transform: 'rotateY(0)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front => back', [
        animate('200ms ease')
      ]),
      transition('back => front', [
        animate('0ms')
      ])
    ])
  ]
})
export class LandingComponent implements OnInit, OnDestroy {

  carouselItems = [
    {
      id: 1,
      img: '/assets/images/carousel-bg-1.jpg',
      text: '<span>SECURE</span> AND <span>EASY WAY</span> <br> TO BITCOIN',
      button: 'LEARN MORE'
    },
    {
      id: 2,
      img: '/assets/images/carousel-bg-1.jpg',
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
  priceOfferFlipState: 'front' | 'back' = 'front';

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

  errors: any = {};
  warehouseForm: FormGroup;
  get city() { return this.warehouseForm.get('city'); }
  get pallets() { return this.warehouseForm.get('pallets'); }
  getErrorMessage = getErrorMessage;

  iLat = 10.9838119;
  iLng = -74.8180175;
  zoom = 13;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    AppConstants.isAtLanding = true;

    this.warehouseForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      pallets: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnDestroy() {
    AppConstants.isAtLanding = false;
  }

  nextReviews() {
    this.hideRevLeft = false;

    this.reviewIndex++;
    const t = this.reviewIndex * 3;
    if (t >= this.reviews.length) {
      this.hideRevRight = true;
    }

    this.shownReviews = [];
    setTimeout(() => {
      this.shownReviews = this.reviews.slice(t, t + 3);
    }, 100);

    if ((this.reviewIndex + 1) * 3 >= this.reviews.length) {
      this.hideRevRight = true;
    }
  }
  prevReviews() {
    this.hideRevRight = false;

    this.reviewIndex--;
    const t = this.reviewIndex * 3;
    if (t < 0) {
      this.hideRevLeft = true;
      return;
    }

    this.shownReviews = [];
    setTimeout(() => {
      this.shownReviews = this.reviews.slice(t, t + 3);
    }, 100);

    if ((this.reviewIndex - 1) * 3 < 0) {
      this.hideRevLeft = true;
    }
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
    this.priceOfferFlipState = 'back';
    this.visibleOffers = this.isBuying === 0 ? this.buyingOffers : this.sellingOffers;
    setTimeout(() => {
      // this.priceOfferFlipState = 'front';
    }, 201);
  }

}