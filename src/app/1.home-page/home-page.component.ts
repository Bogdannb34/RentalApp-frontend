import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../enum/role.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private titleSubject = new BehaviorSubject<string>('Home');
  public titleAction$ = this.titleSubject.asObservable();
  public user: User;
  public refreshing: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

}