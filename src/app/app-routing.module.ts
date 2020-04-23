import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BisectionComponent } from './bisection/bisection.component';
import { RegulaFalsiComponent } from './regula-falsi/regula-falsi.component';
import { SecantComponent } from './secant/secant.component';
import { NewtonRaphsonComponent } from './newton-raphson/newton-raphson.component';
import { IterationComponent } from './iteration/iteration.component';


const routes: Routes = [
  {
    path:"bisection",
    component:BisectionComponent
  },
  {
    path:"regula-falsi",
    component:RegulaFalsiComponent
  },
  {
    path:"secant",
    component:SecantComponent
  },
  {
    path:"newton-raphson",
    component:NewtonRaphsonComponent
  },
  {
    path:"iteration",
    component:IterationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents = [BisectionComponent,RegulaFalsiComponent,
//                                   SecantComponent,NewtonRaphsonComponent,
//                                   IterationComponent];