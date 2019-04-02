import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: string;
  senha: string;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(): void{
    this.loginService.getLogin(this.user,this.senha)
    .subscribe(data => {

    })

  }
}
