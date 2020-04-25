import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { parser } from 'mathjs';


@Component({
  selector: 'app-regula-falsi',
  templateUrl: './regula-falsi.component.html',
  styleUrls: ['./regula-falsi.component.css']
})
export class RegulaFalsiComponent implements OnInit {
  MAX_ITERATION=100;
  isSubmited = false;
  f:any;
  precision:string;
  data:rfData[];
  root:number;
  gotResult = false;

  rfForm:FormGroup ;  
  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    this.rfForm = this.fb.group({
      equation:"",
      from:null,
      to:null,
      precision:1
    });
    this.rfForm.valueChanges.subscribe(()=>this.isSubmited=false);
  }

  eval(){
    if(this.rfForm.invalid) return;
    this.isSubmited = true;
    const par = parser();
    par.evaluate('f(x) = '+this.rfForm.value.equation);
    this.f = par.get('f');
    par.clear();
    let a:number,b:number,p:number;
    a = this.rfForm.value.from;
    b = this.rfForm.value.to;
    p = this.rfForm.value.precision;
    this.precision = '.1-'+p;
    this.regulaFalsiMethod(a,b,p,this.MAX_ITERATION);
    this.root = this.data.slice(-1)[0].c;
  }

  regulaFalsiMethod(a:number,b:number,p:number,n:number){
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
        this.data.push(new rfData(i,a,b,c,f_of_c));
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
        if ( f_of_a*f_of_c  < 0) b = c;
        else a = c;
    }
     
  }

  roundOff(x:number,p:number){
    x = x * Math.pow(10,p);
    return Math.round(x);
  }
}

class rfData {
  constructor (public i:number,public a:number,public b:number,public c:number,public f_of_c:number){}
}