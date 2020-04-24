import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css'],
})
export class BisectionComponent implements OnInit {
  isSubmited = false;
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

  eval(expression:string){
  }
}
