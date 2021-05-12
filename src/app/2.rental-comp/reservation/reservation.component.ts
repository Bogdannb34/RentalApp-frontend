import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/model/rental';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservationDetails: Rental;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params as any;
    this.reservationDetails = JSON.parse(params.data);
  }
}
