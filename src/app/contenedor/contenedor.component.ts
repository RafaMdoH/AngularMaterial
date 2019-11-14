import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {
  usuario = true;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

}
