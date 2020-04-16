import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  isError: boolean = false;
  loginForm: FormGroup;
  returnUrl: string;
  isLoading: boolean = false;
  loginResponse: any;
  userRole: any;
  isAuthentic: boolean = true;
  errorMsg: string = "";
  url: any;
  constructor(public lf: FormBuilder, public router: Router, public route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit() {
    localStorage.clear();
    this.url = this.router.url;
    if (this.url.includes("ind")) {
      localStorage.setItem("countryId", "1");
    }
    else if (this.url.includes("idn")) {
      localStorage.setItem("countryId", "2");
    }
    else if(this.url.includes("ph")){
      localStorage.setItem("countryId","3")
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.loginForm = this.lf.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.isAuthentic = true;
    this.isLoading = true;
    this.isError = false;
    let obj = {};
    let username = this.loginForm.value['username'];
    let password = this.loginForm.value['password'];
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if(countryId=="1"){
      countryName="India"
    }
    else if(countryId=="2"){
      countryName="Indonesia"
    }else if(countryId=="3"){
      countryName="Philippines"
    }
    else if(countryId == "3"){
      countryName = "Philippines"
    }
    obj = {
      "userDetails": [{
        "userName": username,
        "password": password,
        "userPortal":"Repair portal",
        "userPortalCountry":countryName
      }]
    }
    this.userService.login(obj).subscribe(
      (res) => {
        this.loginResponse = res;
        this.isLoading = false;
        if (res) {
          if (this.loginResponse.responseCode === "602" || this.loginResponse.responseCode === "601") {
            this.isAuthentic = false;
            this.errorMsg = this.loginResponse.responseMsg;
          }
          else if(this.loginResponse.responseCode === "606"){
            this.isAuthentic = false;
            this.errorMsg = this.loginResponse.responseMsg;
          }
          else {
            this.isLoading = false;
            let time = new Date().getTime().toString();
            localStorage.setItem('token', this.loginResponse.token);
            localStorage.setItem('lastActivityTime', time);
            let authTokenDecypt = this.parseJwt(this.loginResponse.token);
            this.userRole = JSON.stringify(authTokenDecypt.permissionList.role.toLowerCase());
            if (this.userRole !== '"arc"') {
              this.isAuthentic = false;
              this.errorMsg = "You are not authorised to login to ARC";
            } else {
              localStorage.setItem('currentUser', JSON.stringify(authTokenDecypt.permissionList));
              this.router.navigate([this.returnUrl]);
            }
          }
        }
      },
      (err) => {
        this.isLoading = false;
        this.isError = true;
      }
    )
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
}
