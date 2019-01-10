import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';

import { BlogComponent } from './blog.component';

import { BlogRoutingModule } from './blog.routing';

@NgModule({
  imports: [
    SharedModule,
    UsedMaterialComponentsModule,
    BlogRoutingModule
  ],
  declarations: [
    BlogComponent,
  ],
  providers: [
  ]
})
export class BlogModule { }
