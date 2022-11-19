import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData !: Observable<firebase.default.User | null>;

  constructor(private auth : AngularFireAuth) {
    this.userData = auth.authState;
  }
  
  async signUp(email:string , password:string){
    try {
      const newUser = await this.auth.createUserWithEmailAndPassword(email , password);
      return newUser.user;   
    } catch (error:any) {
      console.error("Authentication Service -> Sign Up Error -> ",error.message.split(":")[1]);
    }
    return null;
  }

  async logIn(email:string , password:string):Promise<Boolean>{
    try {
      await this.auth.signInWithEmailAndPassword(email , password);
      return true;
    } catch (error) {
      console.error("Authentication Service -> LogOut Error -> ",error);
    }
    return false;
  }

  async logOut() : Promise<Boolean>{
    try {
      await this.auth.signOut();
      return true;
    } catch (error) {
      console.error("Authentication Service -> LogOut Error -> ",error);
    }
    return false;
  }

  
}
