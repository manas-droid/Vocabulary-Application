import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public auth : AuthenticationService,
    private router : Router) { }

  ngOnInit(): void {

    
  }

  async onLogOut(){
    
    await this.auth.logOut();

    this.router.navigate(['login']);
  }

}
