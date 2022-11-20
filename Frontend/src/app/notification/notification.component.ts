import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';
import { ResponseType } from '../types/NotificationType';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit , AfterViewInit {
  @ViewChild('snackbar') snackbar !: ElementRef;

  constructor(private notiService:NotificationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.notiService.notificationEvent.subscribe(
      (next)=>{
        this.snackbar.nativeElement.classList.add("show");
        console.log(next.message);
        
        this.snackbar.nativeElement.textContent = next.message;

        this.snackbar.nativeElement.classList.add(
          next.responseType === ResponseType.FAILURE ? 
          "snackbar-error" : "snackbar-success");
        setTimeout(()=>{
          this.snackbar.nativeElement.classList.remove("show");
        } , 5000);
      });
  }
}
