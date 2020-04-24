import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <code>
      <span style="color:red;font-size:2rem;"> Error : </span>
      <p style="padding:1rem;font-size:1rem;"> 404 Page not found</p>
    <code>
  `
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
