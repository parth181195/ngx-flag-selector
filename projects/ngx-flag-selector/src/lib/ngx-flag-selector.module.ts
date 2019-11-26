import { NgModule } from '@angular/core';
import { NgxFlagSelectorComponent } from './ngx-flag-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    BrowserModule, CommonModule, NgxFlagSelectorComponent],
  imports: [
    MatSelectModule
  ],
  exports: [NgxFlagSelectorComponent]
})
export class NgxFlagSelectorModule { }
