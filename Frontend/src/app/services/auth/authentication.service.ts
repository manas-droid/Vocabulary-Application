import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { SpinnerService } from '../spinner/spinner.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData !: Observable<firebase.default.User | null>;

  constructor(
    private auth : AngularFireAuth,
    private spinnerService:SpinnerService,
    private noti:NotificationService
    ) {
    this.userData = auth.authState;
  }
  
  async signUp(email:string , password:string){
    try {
      this.spinnerService.load();
      const newUser = await this.auth.createUserWithEmailAndPassword(email , password);
      this.spinnerService.stop();
      this.noti.success("Congratulations! You have successfully created an Account!");
      return newUser.user;   
    } catch (error:any) {
      this.noti.failure(error.message.split(': ')[1]);
      this.spinnerService.stop();
      throw new Error(error.message);
    }
  }

  async logIn(email:string , password:string):Promise<Boolean>{
    try {
      this.spinnerService.load();
      await this.auth.signInWithEmailAndPassword(email , password);
      this.spinnerService.stop();
      this.noti.success("Congratulations! You have successfully logged in!");
      return true;
    } catch (error:any) {

      this.noti.failure(error.message.split(': ')[1] || "Something went wrong");
      this.spinnerService.stop();
      throw new Error(error.message);
    }
  }

  async logOut() : Promise<Boolean>{
    try {
      this.spinnerService.load();
      await this.auth.signOut();
      this.spinnerService.stop();
      return true;
    } catch (error) {
      this.spinnerService.stop();
      console.error("Authentication Service -> LogOut Error -> ",error);
    }
    return false;
  }

  
}
