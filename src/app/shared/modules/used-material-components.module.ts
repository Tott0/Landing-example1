import { NgModule } from '@angular/core';
/* Material Components */
import {
  MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
  MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
  MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
  MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule, MatAutocompleteModule,
  MatMenuModule, MatTableModule, MatSortModule, MatButtonToggleModule,
} from '@angular/material';

import { MatPaginatorIntl } from '@angular/material';
import { CustomMatPaginatorIntl } from '@core/providers/custom-mat-paginator-intl';

@NgModule({
  imports: [
    MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
    MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
    MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule,
    MatAutocompleteModule, MatMenuModule, MatTableModule, MatSortModule, MatButtonToggleModule,
  ],
  exports: [
    MatInputModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatSidenavModule,
    MatSelectModule, MatGridListModule, MatIconModule, MatCardModule, MatListModule, MatPaginatorModule,
    MatTabsModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatRadioModule, MatChipsModule,
    MatAutocompleteModule, MatMenuModule, MatTableModule, MatSortModule, MatButtonToggleModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ]
})
export class UsedMaterialComponentsModule { }
