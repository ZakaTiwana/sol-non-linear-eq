import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import {MathJaxModule} from 'ngx-mathjax'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BisectionComponent } from './bisection/bisection.component';
import { RegulaFalsiComponent } from './regula-falsi/regula-falsi.component';
import { SecantComponent } from './secant/secant.component';
import { NewtonRaphsonComponent } from './newton-raphson/newton-raphson.component';
import { IterationComponent } from './iteration/iteration.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BisectionComponent,
    RegulaFalsiComponent,
    SecantComponent,
    NewtonRaphsonComponent,
    IterationComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MathJaxModule.forRoot({
      version: '2.7.5',
      config: 'TeX-AMS_HTML',
      hostname: 'cdnjs.cloudflare.com'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
