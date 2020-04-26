import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { parser } from 'mathjs';

@Component({
  selector: 'app-newton-raphson',
  templateUrl: './newton-raphson.component.html',
  styleUrls: ['./newton-raphson.component.css']
})
export class NewtonRaphsonComponent implements OnInit {
  MAX_ITERATION=100;
  isSubmited = false;
  f:any;
  f_prime:any;
  precision:string;
  data:nrData[];
  root:number;
  gotResult = false;

  nrForm:FormGroup ;  
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.nrForm = this.fb.group({
      equation:"",
      derivative:"",
      from:null,
      precision:1
    });
    this.nrForm.valueChanges.subscribe(()=>this.isSubmited=false);
  }

  eval(){
    if(this.nrForm.invalid) return;
    this.isSubmited = true;
    const par = parser();
    par.evaluate('f(x) = '+this.nrForm.value.equation);
    par.evaluate('f_prime(x) = '+this.nrForm.value.derivative);
    this.f = par.get('f');
    this.f_prime = par.get('f_prime');
    par.clear();
    let x0:number,p:number;
    x0 = this.nrForm.value.from;
    p = this.nrForm.value.precision;
    this.precision = '.1-'+p;
    this.newtonRaphsonMethod(x0,p,this.MAX_ITERATION);
    this.root = this.data.slice(-1)[0].x1;
  }

  newtonRaphsonMethod(x0:number,p:number,n:number){
    this.data = [];
    let x1:number;
    // let pre_c:number;

    for (let i = 0; i < n; i++) {
        let f_of_x0:number = this.f(x0);
        let f_p_of_x0:number = this.f_prime(x0);
        x1 = x0-(f_of_x0 / f_p_of_x0);
        
        let f_of_x1:number = this.f(x1);
        this.data.push(new nrData(i,x0,x1,f_of_x1));
        if( this.roundOff(f_of_x1,p) === 0){ 
          this.gotResult = true;
          break;
        }
        if( this.roundOff(x1,p) === this.roundOff(x0,p)) {
          this.gotResult = false;
          break;
        }
        x0=x1;
    }
     
  }

  roundOff(x:number,p:number){
    x = x * Math.pow(10,p);
    return Math.round(x);
  }
}

class nrData {
  constructor (public i:number,public x0:number,public x1:number,public f_of_x1:number){}
}