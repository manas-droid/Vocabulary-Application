import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData !: Observable<firebase.default.User | null>;

  constructor(
    private auth : AngularFireAuth,
    private spinnerService:SpinnerService
    ) {
    this.userData = auth.authState;
  }
  
  async signUp(email:string , password:string){
    try {
      this.spinnerService.load();
      const newUser = await this.auth.createUserWithEmailAndPassword(email , password);
      this.spinnerService.stop();
      return newUser.user;   
    } catch (error:any) {
      console.error("Authentication Service -> Sign Up Error -> ",error.message.split(":")[1]);
      this.spinnerService.stop();
      throw new Error(error.message);
    }
  }

  async logIn(email:string , password:string):Promise<Boolean>{
    try {
      this.spinnerService.load();
      await this.auth.signInWithEmailAndPassword(email , password);
      this.spinnerService.stop();
      return true;
    } catch (error:any) {
      console.error("Authentication Service -> LogOut Error -> ",error);
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
