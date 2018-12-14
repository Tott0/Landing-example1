import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/** */
import { AppComponent } from './app.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { FooterComponent } from '@app/footer/footer.component';
//
import { AuthModule } from '@app/auth/auth.module';
import { LandingModule } from '@app/landing/landing.module';
/** */
import { environment } from '@env/environment';
import { CoreModule } from '@app/core/core.module';
import { AppRoutingModule } from '@app/app.routing';
import { UsedMaterialComponentsModule } from '@shared/modules/used-material-components.module';

import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    UsedMaterialComponentsModule,
    BrowserAnimationsModule,
    //
    //
    CoreModule,
    AuthModule,
    LandingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
