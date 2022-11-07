import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string ,token : string) {
   const logData = this.http.post('http://localhost:3333/session', { email, password ,token})
         this.isUserLoggedIn = true ;
         localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
         return logData;
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }
}