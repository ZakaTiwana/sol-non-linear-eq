import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { parser } from 'mathjs';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css'],
})
export class BisectionComponent implements OnInit {
  isSubmited = false;
  f:any;
  precision:string;
  data:biData[];

  biFrom:FormGroup ;  
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.biFrom = this.fb.group({
      equation:"",
      from:null,
      to:null,
      precision:1
    });
    this.biFrom.valueChanges.subscribe(()=>this.isSubmited=false);
  }

  eval(){
    if(this.biFrom.invalid) return;
    this.isSubmited = true;
    const par = parser();
    par.evaluate('f(x) = '+this.biFrom.value.equation);
    this.f = par.get('f');
    par.clear();
    let a:number,b:number,p:number;
    a = this.biFrom.value.from;
    b = this.biFrom.value.to;
    p = this.biFrom.value.precision;
    this.precision = '.1-'+p;
    this.bisectionMethod(a,b,p,100);
  }

  bisectionMethod(a:number,b:number,p:number,n:number){
    this.data = [];
    let c:number;
    for (let i = 0; i < n; i++) {
        c = (a+b)/2;
        let f_of_c:number = this.f(c);
        this.data.push(new biData(i,a,b,c,f_of_c));
        if( this.roundOff(f_of_c,p) === 0) break;
        let f_of_a:number = this.f(a);
        if ( f_of_a*f_of_c  < 0) b = c;
        else a = c;
    } 
  }

  roundOff(x:number,p:number){
    x = x * Math.pow(10,p);
    return Math.round(x);
  }
}

class biData {
  constructor (public i:number,public a:number,public b:number,public c:number,public f_of_c:number){}
}