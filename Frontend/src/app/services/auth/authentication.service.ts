import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { catchError, from, Observable, switchMap,throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData !: Observable<firebase.default.User | null>;
  
  constructor(private auth : AngularFireAuth,private http:HttpClient) {
    this.userData = auth.authState;
  }
  
  signUp(email:string , password:string) : Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email , password))
      .pipe( 
        switchMap((value)=>{
          return from(value.user?.getIdToken() as Promise<string>)
            .pipe(switchMap(idToken => this.registUserToBackend(idToken , value.user)))
          }),
        catchError((error:any)=>this.handleError(error))
      );
  }

  logIn(email:string , password:string):Observable<any>{
    return from(this.auth.signInWithEmailAndPassword(email , password))
    .pipe(
      catchError(
        (err:any)=> this.handleError(err.message.split(": ")[1] || "Something went wrong")
      )
    )
  }

  logOut() : Observable<any>{
    return from(this.auth.signOut()).pipe(catchError(()=>this.handleError("Could not log out!")));
  }


  registUserToBackend(idToken:string , user:any){

    return this.http.post("http://localhost:9000/user" , undefined , 
    { headers : new HttpHeaders().set("Authorization" , `Bearer ${idToken}`)}
    ).pipe(
        catchError((error)=>{
          console.log("Registration Error",error)
          from(user.delete()).subscribe();
          return this.handleError(error.error.message || "Something went wrong. Please try again!");
        })
      );
  }
  
  private handleError(error:string){
    return throwError(()=> new Error(error));
  }
}