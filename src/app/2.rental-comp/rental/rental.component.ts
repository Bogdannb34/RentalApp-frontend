import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Role } from 'src/app/enum/role.enum';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { Rental } from 'src/app/model/rental';
import { RentalLocation } from 'src/app/model/rental-location';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LocationService } from 'src/app/service/location.service';
import { NotificationService } from 'src/app/service/notification.service';
import { RentalService } from 'src/app/service/rental.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  
  public rentals: Rental[];
  private subscriptions: Subscription[] = [];
  public refreshing: boolean;
  public editRental = new Rental();
  public selectedRental: Rental;
  public fileName: string;
  public currentRentalName: string;
  public locations: RentalLocation[];
  public rentalImage : File;
  public location: RentalLocation;
  public newRental = new Rental();
  public users: User[];
  public host: User;
  
  constructor(private rentalService: RentalService, private notificationService: NotificationService,
    private authenticationService: AuthenticationService, private router: Router, private locationService: LocationService, private userService: UserService) { }

  ngOnInit(): void {
    this.getRentals(true);
    this.getLocations();
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public viewReservationRental(rental: Rental): void {
    this.router.navigate([`/reservation`, { data: JSON.stringify(rental) }])
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public getLocations(): void {
    this.locationService.getLocations().subscribe(
      (response: RentalLocation[]) => {
        this.locations = response;
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public getRentals(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.rentalService.getRentals().subscribe(
        (response: Rental[]) => {
          this.rentals = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} rental(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );
  }

  public onAddNewRental(rentalForm: NgForm): void {
    // const formData = this.rentalService.createRentalFormData(rentalForm.value);
    this.subscriptions.push(
      this.rentalService.addRental(rentalForm.value).subscribe(
        (response: Rental) => {
          this.clickButton('new-rental-close');
          this.getRentals(false);
          rentalForm.reset();
          this.sendNotification(NotificationType.SUCCESS,
            `${response.type} ${response.name} added successfully.`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public rentalForm = new FormGroup({
    type: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    description: new FormControl(''),
    location: new FormGroup({
      city: new FormControl(''),
      country: new FormControl('')
    }),
    maxPeople: new FormControl(''),
    beds: new FormControl(''),
    bathrooms: new FormControl(''),
    bedrooms: new FormControl(''),
    mainImage: new FormControl(''),
    rule: new FormControl(''),
    amenities: new FormControl(''),
    priceOvernight: new FormControl(''),
    host: new FormGroup({
      username: new FormControl('')
    })
  });

  public onUpdateRental(editRental: Rental): void {
    // const formData = this.rentalService.createRentalFormData(this.currentRentalName, this.editRental, this.rentalImage);
    this.subscriptions.push(
      this.rentalService.updateRental(editRental).subscribe(
        (response: Rental) => {
          this.clickButton('closeEditRentalModalButton');
          this.getRentals(false);
          this.fileName = null;
          this.sendNotification(NotificationType.SUCCESS,
            `${response.name} ${response.type} updated successfully.`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public saveNewRental(): void {
    this.clickButton('new-rental-save');
  }

  public searchRentals(searchTerm: string): void {
    const results: Rental[] = [];
    for (const rental of this.rentals) {
      if (rental.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        rental.type.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        rental.rule.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(rental);
      }
    }
    this.rentals = results;
    if (results.length === 0 || !searchTerm) {
      this.getRentals(true);
    }
  }

  public onSelectRental(selectedRental: Rental): void {
    this.selectedRental = selectedRental;
    this.clickButton('openRentalInfo');
  }

  public onEditRental(editRental: Rental): void {
    this.editRental = editRental;
    this.currentRentalName = editRental.name;
    this.clickButton('openRentalEdit');
  }

  public onDeleteRental(id: number): void {
    this.subscriptions.push(
      this.rentalService.deleteRental(id).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getRentals(false);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again');
    }
  }

}

