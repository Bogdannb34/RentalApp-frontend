import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './1.home-page/home-page.component';
import { RentalComponent } from './2.rental-comp/rental/rental.component';
import { ReservationComponent } from './2.rental-comp/reservation/reservation.component';
import { LoginComponent } from './3.user-comp/login/login.component';
import { RegisterComponent } from './3.user-comp/register/register.component';
import { UserComponent } from './3.user-comp/user/user.component';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '404'},
  { path: 'home', component: HomePageComponent, canActivate: [AuthenticationGuard] },
  { path: 'rentals', component: RentalComponent, canActivate: [AuthenticationGuard] },
  { path: 'reservation', component: ReservationComponent, canActivate: [AuthenticationGuard] },
  { path: 'profile', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
