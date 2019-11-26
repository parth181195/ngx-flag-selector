// tslint:disable: variable-name
// tslint:disable: no-output-native
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Optional, Self, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, ReplaySubject } from 'rxjs';
import { CountryInterface, countryData } from './data';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.sass'],

})

export class CountrySelectComponent implements OnDestroy, OnChanges {
  @Input() control: FormControl;
  title = 'flag-selector';
  country = 'in';
  filterCtrl = new FormControl('');
  isFocussed: any;
  disabled: boolean;
  value: any;
  protected _onDestroy = new Subject<void>();
  countryData: CountryInterface[] = countryData;
  filteredcountryData: ReplaySubject<CountryInterface[]> = new ReplaySubject<CountryInterface[]>(1);

  constructor() {
    this.filteredcountryData.next(this.countryData.slice());
    console.log(this.control)
    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountry();
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.control.currentValue) {
      this.control = changes.control.currentValue;
      console.log(this.control)
    }
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
      this.countryData.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}



// @Input() public _value: any;
// @Input() public formControlName: string;
// @Output() public change: EventEmitter<any> = new EventEmitter();
// @Output() public open: EventEmitter<any> = new EventEmitter();
// @Output() public close: EventEmitter<any> = new EventEmitter();
// title = 'flag-selector';
// country = 'in';
// filterCtrl = new FormControl('');
// isFocussed: any;
// disabled: boolean;
// value: any;
// protected _onDestroy = new Subject<void>();
// countryData: CountryInterface[] = countryData;
// filteredcountryData: ReplaySubject<CountryInterface[]> = new ReplaySubject<CountryInterface[]>(1);

// onTouched: () => void;
// onChange = (value) => { };

// writeValue(value: any) {
//   this.value = value ? value : '';
//   this.onChange(this.value);
// }


// onFocus = (val) => {
//   this.isFocussed = val;
// }


// constructor() {
//   this.filteredcountryData.next(this.countryData.slice());
//   this.filterCtrl.valueChanges
//     .pipe(takeUntil(this._onDestroy))
//     .subscribe(() => {
//       this.filterCountry();
//     });
// }


// registerOnChange(fn) {
//   this.onChange = fn;
// }
// registerOnTouched(fn) {
//   this.onTouched = fn;
// }
// registerOnFocus(fn) {
//   this.onFocus = fn;
// }

// setDisabledState(isDisabled: boolean): void {
//   this.disabled = isDisabled;
// }
// protected filterCountry() {
//   if (!this.countryData) {
//     return;
//   }
//   // get the search keyword
//   let search = this.filterCtrl.value;
//   if (!search) {
//     this.filteredcountryData.next(this.countryData.slice());
//     return;
//   } else {
//     search = search.toLowerCase();
//   }
//   // filter the countryData
//   this.filteredcountryData.next(
//     this.countryData.filter(bank => bank.en_short_name.toLowerCase().indexOf(search) > -1)
//   );
// }
// ngOnDestroy() {
//   this._onDestroy.next();
//   this._onDestroy.complete();
// }
