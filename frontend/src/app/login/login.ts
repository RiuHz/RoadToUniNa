import { Component, inject } from '@angular/core';
import { AuthenticationForm } from '../authentication-form/authentication-form';
import { RestBackendService } from '../services/rest-backend/rest-backend.service';
import { AuthRequest } from '../services/rest-backend/auth-request.type';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../services/auth/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [AuthenticationForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  restService = inject(RestBackendService);
  authService = inject(AuthorizationService);
  toastr = inject(ToastrService);
  router = inject(Router);

  userLogin(loginRequest: AuthRequest) {
    this.restService.login(loginRequest).subscribe({
      next: (data) => {
        this.authService.updateToken(data.token).then(() => {
          this.toastr.success('Benvenuto su RoadToUniNa', `Ciao ${this.authService.user()}`);

          this.router.navigate(['/']);
        })
      },
      error: (error) => { this.toastr.error('Inserisci delle credenziali valide per l\'accesso', 'Accesso negato!'); }
    });
  }

}
