import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { parser } from 'mathjs';

@Component({
  selector: 'app-secant',
  templateUrl: './secant.component.html',
  styleUrls: ['./secant.component.css']
})
export class SecantComponent implements OnInit {
  MAX_ITERATION=100;
  isSubmited = false;
  f:any;
  precision:string;
  data:sData[];
  root:number;
  gotResult = false;

  sForm:FormGroup ;  
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.sForm = this.fb.group({
      equation:"",
      from:null,
      to:null,
      precision:1
    });
    this.sForm.valueChanges.subscribe(()=>this.isSubmited=false);
  }

  eval(){
    if(this.sForm.invalid) return;
    this.isSubmited = true;
    const par = parser();
    par.evaluate('f(x) = '+this.sForm.value.equation);
    this.f = par.get('f');
    par.clear();
    let a:number,b:number,p:number;
    a = this.sForm.value.from;
    b = this.sForm.value.to;
    p = this.sForm.value.precision;
    this.precision = '.1-'+p;
    this.secantMethod(a,b,p,this.MAX_ITERATION);
    this.root = this.data.slice(-1)[0].c;
  }

  secantMethod(a:number,b:number,p:number,n:number){
    this.data = [];
    let c:number;
    let pre_c:number;

    for (let i = 0; i < n; i++) {
        pre_c = this.roundOff(c,p);
        let f_of_a:number = this.f(a);
        let f_of_b:number = this.f(b);
        c = ( (a*f_of_b ) - (b*f_of_a) )
               /  (f_of_b - f_of_a) ;
        let f_of_c:number = this.f(c);
        this.data.push(new sData(i,a,b,c,f_of_c));
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
        a=b;b=c;
    }
     
  }

  roundOff(x:number,p:number){
    x = x * Math.pow(10,p);
    return Math.round(x);
  }
}

class sData {
  constructor (public i:number,public a:number,public b:number,public c:number,public f_of_c:number){}
}