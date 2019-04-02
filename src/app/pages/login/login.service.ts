import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('logged') || 'false'));
  private userLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('user') || '');
  private idLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('id') || '');



  url = environment.url;
  constructor(private http: HttpClient) { }

  getLogin(user: string, senha: string) {
    const url = `${this.url}/lista`;
    var body = {
      usuario: user,
      senha: senha
    }
    return this.http.post(url, body, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }

  setLogged(value: boolean, user: string, id: string) {
    // this.loggedStatus = value;
    localStorage.setItem('logged', value.toString());
    user ? localStorage.setItem('user', user) : localStorage.removeItem('user');
    id ? localStorage.setItem('id', id) : localStorage.removeItem('id');
    this.loggedIn.next(value);
    this.userLoggedIn.next(user);
    this.idLoggedIn.next(id);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userLogged() {
    return localStorage.getItem('user');
  }

  get idLogged() {
    return localStorage.getItem('id');
  }

  get isLogged() {
    return JSON.parse(localStorage.getItem('logged') || 'false');
  }
}
