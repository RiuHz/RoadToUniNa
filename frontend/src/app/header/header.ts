import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthorizationService } from '../services/auth/authorization.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  authService = inject(AuthorizationService);

  logout() : void {
    this.authService.logout();
  }

}
