import { Injectable } from '@angular/core';
import { authState, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { SpinnerService } from '../spinner/spinner.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData !: Observable<firebase.default.User | null>;

  constructor(
    private auth : AngularFireAuth,
    private spinnerService:SpinnerService,
    private noti:NotificationService,
    private http:HttpClient
    ) {
    this.userData = auth.authState;
  }
  
  async signUp(email:string , password:string){
    try {
      this.spinnerService.load();
      const newUser = await this.auth.createUserWithEmailAndPassword(email , password);
      const idToken = await newUser.user?.getIdToken() as string;

      console.log(idToken);
      
      this.http.post('http://localhost:9000/user' , null ,{
       headers: {
        "Authorization" : "Bearer "+idToken
       } 
        
      }).subscribe((result)=>{
        console.log(result);
        this.noti.success("Congratulations! You have successfully created an Account!");
      } , (error)=>{
        console.log("Error: ", error);
        
      });


      this.spinnerService.stop();
      return null;   
    } catch (error:any) {
      this.noti.failure(error.message.split(': ')[1]);
      this.spinnerService.stop();
      throw new Error(error.message);
    }
  }

  async logIn(email:string , password:string):Promise<Boolean>{
    try {
      this.spinnerService.load();
      const user = await this.auth.signInWithEmailAndPassword(email , password);
      console.log(await user.user?.getIdToken());
      console.log(user);
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
