import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css'],
})
export class BisectionComponent implements OnInit {
  isSubmited = false;
  ans:Number;
  f:any;

  biFrom:FormGroup ;  
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.biFrom = this.fb.group({
      equation:"",
      from:null,
      to:null,
      precision:1
    });

  }

  eval(){
    if(this.biFrom.invalid) return;
    this.isSubmited = true;
    const parser = math.parser();
    parser.evaluate('f(x) = '+this.biFrom.value.equation);
    this.f = parser.get('f');
    parser.clear();
    console.log(this.f(2));
  }

  bisectionMethod(a:number,b:number,p:number,n:number){

  }
}
