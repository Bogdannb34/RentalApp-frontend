import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './service/user.service';
import { AuthenticationService } from './service/authentication.service';
import { LoginComponent } from './3.user-comp/login/login.component';
import { RegisterComponent } from './3.user-comp/register/register.component';
import { UserComponent } from './3.user-comp/user/user.component';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { HomePageComponent } from './1.home-page/home-page.component';
import { RentalComponent } from './2.rental-comp/rental/rental.component';
import { ReservationComponent } from './2.rental-comp/reservation/reservation.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from './2.rental-comp/location/location.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RentalService } from './service/rental.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HomePageComponent,
    RentalComponent,
    ReservationComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    BrowserAnimationsModule
  ],
  providers: [RentalService, UserService, AuthenticationService, NotificationService,
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
