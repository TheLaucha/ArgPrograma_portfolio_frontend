import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  public onLogout(): void {
    this.tokenService.logOut()
    this.router.navigate(['iniciar-sesion'])
  }

}
