import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { parser } from 'mathjs';

@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.css']
})
export class IterationComponent implements OnInit {
  MAX_ITERATION=100;
  isSubmited = false;
  f:any;
  precision:string;
  data:itData[];
  root:number;
  gotResult = false;

  itForm:FormGroup ;  
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.itForm = this.fb.group({
      equation:"",
      from:null,
      precision:1
    });
    this.itForm.valueChanges.subscribe(()=>{
      this.isSubmited=false;
      this.gotResult=false;
    });
  }

  eval(){
    if(this.itForm.invalid) return;
    this.isSubmited = true;
    const par = parser();
    par.evaluate('f(x) = '+this.itForm.value.equation);
    this.f = par.get('f');
    par.clear();
    let x0:number,p:number;
    x0 = this.itForm.value.from;
    p = this.itForm.value.precision;
    this.precision = '.1-'+p;
    this.iterationMethod(x0,p,this.MAX_ITERATION);
    this.root = this.data.slice(-1)[0].x1;
  }

  iterationMethod(x0:number,p:number,n:number){
    this.data = [];
    let x1:number;
    x1 = x0;

    for (let i = 0; i < n; i++) {
        x0=x1;  
        x1 = this.f(x0);
        let diff:number = x1 - x0;
        this.data.push(new itData(i,x0,x1,diff));
        if( this.roundOff(diff,p) === 0){ 
          this.gotResult = true;
          break;
        }
    }
     
  }

  roundOff(x:number,p:number){
    x = x * Math.pow(10,p);
    return Math.round(x);
  }
}

class itData {
  constructor (public i:number,public x0:number,public x1:number,public diff:number){}
}