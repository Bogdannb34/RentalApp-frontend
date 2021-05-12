import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Rental } from '../model/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  public getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/server/rental/list`);
  }

  public getRental(id: number): Observable<Rental> {
    return this.http.get<Rental>(`/server/rental/find/${id}`);
  }

  public addRental(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(`/server/rental/add`, rental);
  }

  public updateRental(rental: Rental): Observable<Rental> {
    return this.http.put<Rental>(`/server/rental/update`, rental);
  }

  // public deleteRental(name: string): Observable<CustomHttpResponse> {
  //   return this.http.delete<CustomHttpResponse>(`/server/rental/delete/${name}`);
  // }

  public deleteRental(id: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`/server/rental/delete/${id}`);
  }
  
  public createRentalFormData(rental: Rental): FormData {
    const formData = new FormData();
    formData.append('type', rental.type);
    formData.append('name', rental.name);
    formData.append('address', rental.address);
    formData.append('location', JSON.stringify(rental.location));
    formData.append('description', rental.description);
    formData.append('maxPeople', JSON.stringify(rental.maxPeople));
    formData.append('beds', JSON.stringify(rental.beds));
    formData.append('bathrooms', JSON.stringify(rental.bathrooms));
    formData.append('bedrooms', JSON.stringify(rental.bedrooms));
    formData.append('rule', rental.rule);
    formData.append('priceOvernight', JSON.stringify(rental.priceOvernight));
    formData.append('host', JSON.stringify(rental.host));
    return formData;
  } 
}
