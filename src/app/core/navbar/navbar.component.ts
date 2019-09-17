import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.loginService.setLogged(false, null, null);
    this.router.navigate([`login`]);

  }
}
