import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  ctrl = new FormControl('');
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      ctrlName: this.ctrl
    })
    this.form.valueChanges.subscribe(data => {
      console.log(data)
    })
  }
}
