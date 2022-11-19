import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerLoad!:EventEmitter<Boolean>;

  constructor() { 
    this.spinnerLoad = new EventEmitter<Boolean>();
  }

  load(){
    this.spinnerLoad.emit(true);
  }

  stop(){
    this.spinnerLoad.emit(false);
  }

  get spinner(){
    return this.spinnerLoad;
  }
}
