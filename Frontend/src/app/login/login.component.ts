import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { NotificationService } from '../services/notification/notification.service';
import { SpinnerService } from '../services/spinner/spinner.service';

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
    private router : Router,
    private noti : NotificationService,
    private spin : SpinnerService
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


  onSubmit(){
    const {email , password} = this.loginForm.value;
    this.spin.load();
    this.auth.logIn(email , password).subscribe({
      next : (value)=>{
        this.noti.success("User logged in Successfully!");
        this.router.navigate(['/']);
        this.spin.stop();
      },
      error : (error)=>{
        this.noti.failure(error);
        this.spin.stop();
      }
    });
  }
}
