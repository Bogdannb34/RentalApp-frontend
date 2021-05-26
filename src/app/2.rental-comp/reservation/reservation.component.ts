import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Rental } from 'src/app/model/rental';
import { Reservation } from 'src/app/model/reservation';
import { NotificationService } from 'src/app/service/notification.service';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  public reservationDetails: Rental;
  public newReservation = new Reservation();
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params as any;
    this.reservationDetails = JSON.parse(params.data);
  }

  public onAddNewReservation(reservationForm: NgForm): void {
    console.log(reservationForm.value);
    this.subscriptions.push(
      this.reservationService.addReservation(reservationForm.value).subscribe(
        (response: Reservation) => {
          reservationForm.reset();
          this.sendNotification(NotificationType.SUCCESS,
            `Reservation number ${response.id} added successfully.`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public get totalCost() {
    return this.reservationDetails.priceOvernight * 2;
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again');
    }
  }
}
