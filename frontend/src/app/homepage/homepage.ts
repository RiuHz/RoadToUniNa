import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthorizationService } from '../services/auth/authorization.service';
import { RestBackendService } from '../services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {
  authService = inject(AuthorizationService);
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);

  pausedGame: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit() {
    this.userHasPausedGame();
  }

  userHasPausedGame() {
    this.restService.getPartite({
      giocatore: this.authService.user() as string,
      stato: 'in-pausa',
      limite: 1
    }).subscribe({
      next: (data) => { this.pausedGame.set(data.length > 0); },
      error: (error) => { this.toastr.error(error.message, error.statusText); }
    });
  }
}
