import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../services/auth/authorization.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthorizationService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  if (!authService.isUserAuthenticated()) {
    toastr.warning('Per accedere a questa pagina bisogna fare l\'accesso', 'Non autorizzato!');

    return router.parseUrl('/login');
  }

  return true;
};
