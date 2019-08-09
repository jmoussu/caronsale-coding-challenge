import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { Validators, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit() { }

  loginModel: { email: string; password: string } = {
    email: "salesman@random.com",
    password: "123test"
  };

  onSubmit(f: FormGroup) {
    if (f.valid) {
      this.authService.login(this.loginModel.email, this.loginModel.password);
    }
  }
}
