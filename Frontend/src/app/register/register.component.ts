import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup, Validators}  from "@angular/forms"
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { NotificationService } from '../services/notification/notification.service';
import { SpinnerService } from '../services/spinner/spinner.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm !: FormGroup;
  public submit:Boolean = false;

  constructor(
    private fb : FormBuilder,
    private auth:AuthenticationService,
    private router : Router,
    private noti:NotificationService,
    private spin : SpinnerService
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
    
    if(!this.registerForm.valid) return;

    const {email , password} = this.registerForm.value;


    this.submit = true;
    this.spin.load();

    this.auth.signUp(email , password).subscribe({
      next : (value)=>{
        this.noti.success('Successfully Created a User');
        this.spin.stop();
        this.router.navigate(['/']);
        this.submit = false;
      },
      error : (err) =>{
        this.noti.failure(err);
        this.spin.stop();
        this.submit = false;   
      }
    });

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
