import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup, Validators}  from "@angular/forms"
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { SpinnerService } from '../services/spinner/spinner.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private auth:AuthenticationService,
    private router : Router,
    private spinnerService:SpinnerService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email:['' , [Validators.required, Validators.email]],
      password:['' , [Validators.required]],
      confirmPassword:['' , [Validators.required]]
    },{
      validators:this.MatchPassword('password'  , "confirmPassword")
    });
  }

  async onSubmit(){
    
    console.log(this.registerFormControl);
    
    if(!this.registerForm.valid) return;

    const {email , password} = this.registerForm.value;

    this.spinnerService.load();
    const user = await this.auth.signUp(email , password);
    this.spinnerService.stop();

    this.router.navigateByUrl('/login');
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}
