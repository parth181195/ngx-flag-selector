import { Component, OnInit, Input, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, ReplaySubject } from 'rxjs';
import { CountryInterface, countryData } from '../country-select/data';
import { takeUntil } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.sass']
})
export class MobileInputComponent implements OnChanges, OnDestroy {
  @Input() dialCodeControl: FormControl;
  @Input() control: FormControl;
  title = 'flag-selector';
  country = 'in';
  filterCtrl = new FormControl('');
  isLoading = true;
  protected _onDestroy = new Subject<void>();
  countryData: CountryInterface[] = [];
  filteredcountryData: ReplaySubject<CountryInterface[]> = new ReplaySubject<CountryInterface[]>(1);

  constructor(private http: HttpClient) {
    this.filteredcountryData.next(this.countryData.slice());
    console.log(this.control);
    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountry();
      });
    this.getCountryData();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.control.currentValue) {
      this.control = changes.control.currentValue;
      console.log(this.control);
    }
  }
  protected filterCountry() {
    if (!this.countryData) {
      return;
    }
    // get the search keyword
    let search = this.filterCtrl.value;
    if (!search) {
      this.filteredcountryData.next(this.countryData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the countryData
    this.filteredcountryData.next(
      this.countryData.filter(country => country.name.toLowerCase().indexOf(search) > -1)
    );
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  getCountryData() {
    this.isLoading = true;
    this.http.get('http://192.168.1.50:8081/common/v1/country/list', {
      headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4MTY2ODJiYjlmMTI0YmNlOWZhNzYwZmIwNjVkYWJiYiIsImF1dGgiOlsiQ29ycG9yYXRlIEFkbWluaXN0cmF0b3IiXSwicm9sZUlkIjoiOWIzMmY0MmQ4NDkzNGQwNmFjZGQ4YWFjY2UxYzBkZDUiLCJyb2xlX25hbWUiOiJDT1JQT1JBVEVfQURNSU5JU1RSQVRPUiIsInRva2VuX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNTc0OTE0NTU5LCJleHAiOjE1NzQ5NDY5NTl9._Nt_36I9loAK43U_FzWyxS8CGcQ_mpcoe_lVQllM74A'
      )
    }
    ).subscribe(res => {
      console.log(res);
      this.countryData = res['data'];
      this.filteredcountryData.next(this.countryData);
      this.isLoading = false;
    });
  }



}
