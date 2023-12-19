import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ApartmentsComponent } from './apartments/apartments.component'; 
import { MatGridListModule} from '@angular/material/grid-list'; 
import { NgFor} from '@angular/common';
import { BookingComponent } from './booking/booking.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Fancybox } from '@fancyapps/ui';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UiComponent } from './ui/ui.component';
import {MatStepperModule} from '@angular/material/stepper';

Fancybox.bind('[data-fancybox="default-gallery"]', {
  //
});

@NgModule({
  declarations: [
    AppComponent,
    ApartmentsComponent,
    BookingComponent,
    LoginComponent,
    HomeComponent,
    UiComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgFor,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    JsonPipe,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    HttpClientModule,
    MatStepperModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}