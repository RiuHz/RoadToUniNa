import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthState } from './auth-state.type';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  authState: WritableSignal<AuthState> = signal<AuthState> ({
    user: this.getUser(),
    token: this.getToken(),
    isAuthenticated: this.verifyToken(this.getToken())
  })

  user = computed(() => this.authState().user);
  token = computed(() => this.authState().token);
  isAuthenticated = computed(() => this.authState().isAuthenticated);

  constructor () {
    effect( () => {
      const token = this.authState().token;
      
      if (token !== null) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }

      const user = this.authState().user;

      if (user !== null) {
        localStorage.setItem('user', user);
      } else {
        localStorage.removeItem('user');
      }

    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return localStorage.getItem('user');
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken());
  }

  logout() {
    this.authState.set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }

  verifyToken(token: string | null): boolean {
    if (token === null) {
      return false;
    }

    const expiration = jwtDecode(token).exp;

    if (expiration === undefined) {
      return false;
    }

    if (Date.now() >= expiration * 1000) {
      return false;
    }

    return true;
  }

  async updateToken(token: string) {
    const decodedToken: any = jwtDecode(token);

    this.authState.set({
      user: decodedToken.username,
      token: token,
      isAuthenticated: this.verifyToken(token)
    })
  }

}
