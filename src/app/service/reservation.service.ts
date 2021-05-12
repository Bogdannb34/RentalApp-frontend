import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  public getReservations(): Observable<Reservation> {
    return this.http.get<Reservation>(`/server/reservation/list`);
  }

  public addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`/server/reservation/add`, reservation);
  }

  public updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`/server/reservation/update`, reservation);
  }

  public deleteReservation(id: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`/server/reservation/delete/${id}`);
  }
}
