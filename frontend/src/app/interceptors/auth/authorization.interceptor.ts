import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthorizationService } from '../../services/auth/authorization.service';

export const authorizationInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthorizationService);
  const token = authService.getToken();

  if (token !== null) {
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  return next(request);
};
