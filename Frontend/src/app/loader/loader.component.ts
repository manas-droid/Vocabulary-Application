import { Component, ElementRef, OnInit, ViewChild , AfterViewInit } from '@angular/core';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit , AfterViewInit {
  @ViewChild('loader') loaderRef !: ElementRef;
  constructor(private spinnerService : SpinnerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.spinnerService.spinner.subscribe((next)=>{
      if (next){
        this.loaderRef.nativeElement.classList.add('display-block');
      }else{
        this.loaderRef.nativeElement.classList.remove('display-block');
      }
    })
  }







}
