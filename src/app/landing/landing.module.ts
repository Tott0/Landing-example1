import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';

import { LandingComponent } from './landing.component';

import { LandingRoutingModule } from './landing.routing';

@NgModule({
  imports: [
    SharedModule,
    UsedMaterialComponentsModule,
    LandingRoutingModule
  ],
  declarations: [
    LandingComponent,
  ],
  providers: [
  ]
})
export class LandingModule { }
