import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
  declarations: [AppComponent, UserListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    InputsModule,
    FormsModule,
    DropDownsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
