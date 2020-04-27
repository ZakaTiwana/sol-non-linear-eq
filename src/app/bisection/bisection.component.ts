import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, AbstractControl } from '@angular/forms';
import { parser } from 'mathjs';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css'],
})
export class BisectionComponent implements OnInit {
  MAX_ITERATION=100;
  isSubmited = false;
  f:any;
  precision:string;
  data:biData[];
  root:number;
  gotResult = false;

  biForm:FormGroup ;  
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.biForm = this.fb.group({
      equation:["",validFormula],
      from:null,
      to:null,
      precision:1
    });
    this.biForm.valueChanges.subscribe(()=>this.isSubmited=false);
    // console.log(this.biForm)
  }

  eval(){
    if(this.biForm.invalid) {
      console.log("invalid");  
      return;
    }
    this.isSubmited = true;
    const par = parser();
    par.evaluate('f(x) = '+this.biForm.value.equation);
    this.f = par.get('f');
    par.clear();
    let a:number,b:number,p:number;
    a = this.biForm.value.from;
    b = this.biForm.value.to;
    p = this.biForm.value.precision;
    this.precision = '.1-'+p;
    this.bisectionMethod(a,b,p,this.MAX_ITERATION);
    this.root = this.data.slice(-1)[0].c;
  }

  bisectionMethod(a:number,b:number,p:number,n:number){
    this.data = [];
    let c:number;
    let pre_c:number;

    for (let i = 0; i < n; i++) {
        pre_c = this.roundOff(c,p);
        c = (a+b)/2;
        let f_of_c:number = this.f(c);
        this.data.push(new biData(i,a,b,c,f_of_c));
        if( this.roundOff(f_of_c,p) === 0){ 
          this.gotResult = true;
          console.log({gotResult:this.gotResult});
          break;
        }
        if( this.roundOff(c,p) === pre_c) {
          this.gotResult = false;
          console.log({gotResult:this.gotResult});
          break;
        }
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

function validFormula(control:AbstractControl) : {[key:string]:any}|null{
  if(control.pristine) return null;
  const formula = control.value;
  const par = parser();
  try{
    par.evaluate('f(x) = '+formula);
  let f:any = par.get('f');
  par.clear();
    f(0);
  } catch (error) {
    console.log("validFormula: invalid");
    return {"validFormula":false}
  }
  return null;
}