import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { authorizationInterceptor } from './interceptors/auth/authorization.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideToastr({
      progressBar: true,
      newestOnTop: true
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([authorizationInterceptor])
    ),
    provideRouter(routes)
  ]
};
