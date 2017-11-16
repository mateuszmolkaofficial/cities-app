import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit, OnDestroy {
  private searchParamSubscribtion: Subscription;
  private dataSubscribtion: Subscription;
  private searchParam: string;
  private citiesToDisplay: Array<any>;
  private componentReady: boolean = false;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {}

  ngOnInit() {
    this.searchParamSubscribtion = this.route.params.subscribe((params: Params) => {
      this.searchParam = params['search'];
    });

    this.dataSubscribtion = this.http.get('http://www.mocky.io/v2/5a0df575300000640843346b').subscribe(data => {
      this.citiesToDisplay = <Array<any>>data;
      this.componentReady = true;
    });
  }

  ngOnDestroy() {
    this.searchParamSubscribtion.unsubscribe();
    this.dataSubscribtion.unsubscribe();
  }
}
