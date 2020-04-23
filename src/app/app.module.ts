import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BisectionComponent } from './bisection/bisection.component';
import { RegulaFalsiComponent } from './regula-falsi/regula-falsi.component';
import { SecantComponent } from './secant/secant.component';
import { NewtonRaphsonComponent } from './newton-raphson/newton-raphson.component';
import { IterationComponent } from './iteration/iteration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BisectionComponent,
    RegulaFalsiComponent,
    SecantComponent,
    NewtonRaphsonComponent,
    IterationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
