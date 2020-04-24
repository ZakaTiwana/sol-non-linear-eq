import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
