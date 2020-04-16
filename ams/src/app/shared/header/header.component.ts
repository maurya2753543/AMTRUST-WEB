import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  constructor(public router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.currentUser);
  }

  logout() {
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if (countryId == "1") {
      countryName = "ind"
    }else if(countryId == "2"){
      countryName = "idn"
    }else if (countryId == "3") {
      countryName = "ph"
    }
    localStorage.removeItem('currentUser');
    let url = '/login/' + countryName;
    this.router.navigate([url]);
  }
}
