import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private auth : AuthenticationService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }


  async onSubmit(){
    const {email , password} = this.loginForm.value;

    console.log(email," " , password);
    await this.auth.logIn(email , password);
    this.router.navigate([''])
  }
}
