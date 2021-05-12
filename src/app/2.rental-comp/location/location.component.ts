import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RentalLocation } from 'src/app/model/rental-location';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
  }

}
