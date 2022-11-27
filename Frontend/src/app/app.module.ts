import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthenticationService } from './services/auth/authentication.service';
import { ProfileComponent } from './profile/profile.component';
import { LoaderComponent } from './loader/loader.component';
import { SpinnerService } from './services/spinner/spinner.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './main-page/home/home.component';
import { CurrentUserPipe } from './pipes/Auth/current-user.pipe';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './services/notification/notification.service';
import { SearchComponent } from './main-page/search/search.component';
import { ComponentComponent } from './post/component/component.component';
import { LikeComponent } from './post/like/like.component';
import { LikedPostsComponent } from './liked-posts/liked-posts.component';
import { YourPostsComponent } from './your-posts/your-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    LoaderComponent,
    NavbarComponent,
    HomeComponent,
    CurrentUserPipe,
    NotificationComponent,
    SearchComponent,
    ComponentComponent,
    LikeComponent,
    LikedPostsComponent,
    YourPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    SpinnerService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*

*/