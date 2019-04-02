import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
}
