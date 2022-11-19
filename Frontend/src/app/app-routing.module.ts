import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AngularFireAuthGuard , redirectUnauthorizedTo , redirectLoggedInTo} from '@angular/fire/compat/auth-guard';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['user-profile']);

const routes: Routes = [{
  path:"login",
  component:LoginComponent,
  canActivate: [AngularFireAuthGuard], 
  data : {
    authGuardPipe : redirectLoggedInToProfile
  }
},{
  path:'register',
  component:RegisterComponent,
  canActivate: [AngularFireAuthGuard], 
  data : {
    authGuardPipe : redirectLoggedInToProfile
  }
},
{ path: 'user-profile', 
  component: ProfileComponent,
  canActivate: [AngularFireAuthGuard], 
  data: { authGuardPipe: redirectUnauthorizedToLogin  }
},
{
  path:'',
  component:HomeComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
