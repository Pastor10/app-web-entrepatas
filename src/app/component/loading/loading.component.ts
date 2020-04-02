import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  loading= false;
  private subscription: Subscription;
  constructor(private loadinService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loadinService.loadingStatus
            .subscribe((value: boolean) => {
              this.loading = value;              
            });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
