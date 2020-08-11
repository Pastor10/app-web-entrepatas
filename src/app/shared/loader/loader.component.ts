import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderRequestService } from '../service/locader-request.service';
import { LoaderState } from 'src/app/domain/loader-state';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;


  constructor(private loaderService: LoaderRequestService, private spinner: NgxSpinnerService) { }
  ngOnInit() {
      console.log("llega al loader");
      
      this.subscription = this.loaderService.loaderState
          .subscribe((state: LoaderState) => {
              if (state.show) {
                  this.spinner.show();
              } else {
                  this.spinner.hide();
              }
          });
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}