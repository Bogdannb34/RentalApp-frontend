import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '../model/custom-http-response';
import { RentalLocation } from '../model/rental-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  public getLocations(): Observable<RentalLocation[]> {
    return this.http.get<RentalLocation[]>(`/server/rentLocation/list`);
  }

  public addLocation(location: RentalLocation): Observable<RentalLocation> {
    return this.http.post<RentalLocation>(`/server/rentLocation/add`, location);
  }

  public updateLocation(location: RentalLocation): Observable<RentalLocation> {
    return this.http.put<RentalLocation>(`/server/rentLocation/update`, location);
  }

  public deleteLocation(id: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`/server/delete/${id}`);
  }
}
