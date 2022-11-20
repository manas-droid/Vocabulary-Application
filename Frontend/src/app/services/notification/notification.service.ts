import { EventEmitter, Injectable } from '@angular/core';
import { NotificationType, ResponseType } from 'src/app/types/NotificationType';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notiEvent:EventEmitter<NotificationType>;
  constructor() { 
    this.notiEvent =  new EventEmitter<NotificationType>();
  }
  
  success(message:string){
    this.notiEvent.emit({
      message,
      responseType: ResponseType.SUCCESS
    });
  }

  failure(message:string){
    this.notiEvent.emit({
      message,
      responseType:ResponseType.FAILURE
    });
  }

  get notificationEvent(){
    return this.notiEvent;
  }
}
