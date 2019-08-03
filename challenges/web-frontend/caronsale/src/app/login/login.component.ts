import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

import { AuthenticationResult } from '../models/authentication-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuiler: FormBuilder,
    private router: Router) {
    this.loginForm = this.formBuiler.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.authService.authenticate(email, password)
      .subscribe((auth: AuthenticationResult) => {
        localStorage.setItem('token', auth.token);
        localStorage.setItem('userId', auth.userId);

        this.router.navigateByUrl('/overview');
      });
  }
}
