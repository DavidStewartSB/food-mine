import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup
  isSubmitted = false;
  returnUrl = ""

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginFormBuider()
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  loginFormBuider() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  submitForm() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({
      email: this.fc.email.value,
      password: this.fc.password.value
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl)
    })
  }
  get fc() {
    return this.loginForm.controls;
  }
}
