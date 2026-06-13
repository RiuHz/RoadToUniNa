import { Component, inject } from '@angular/core';
import { AuthenticationForm } from '../authentication-form/authentication-form';
import { RestBackendService } from '../services/rest-backend/rest-backend.service';
import { AuthorizationService } from '../services/auth/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { AuthRequest } from '../services/rest-backend/auth-request.type';

@Component({
  selector: 'app-signup',
  imports: [AuthenticationForm],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  restService = inject(RestBackendService);
  authService = inject(AuthorizationService);
  toastr = inject(ToastrService);

  userSignUp(signUpRequest: AuthRequest) {
    this.restService.signup(signUpRequest).subscribe({
      next: (data) => {
        this.toastr.success('Registrato correttamente, adesso puoi effettuare l\'accesso', 'Puoi effettuare l\'accesso!');
      },
      error: (error) => { this.toastr.error('L\'username scelto è già esistente', 'Credenziali non valide!'); }
    });
  }
}
