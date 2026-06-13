import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from './auth-request.type';
import { AuthResponse } from './auth-response.type';
import { MatchItem, MatchStartingLink } from './match-item.type';
import { LeaderboardItem } from './leaderboard-item.type';
import { MatchRequest } from './match-request.type';

@Injectable({
  providedIn: 'root',
})
export class RestBackendService {

  url = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor (private http: HttpClient) {}

  login(loginRequest: AuthRequest) {
    const url = `${this.url}/login`;

    return this.http.post<AuthResponse>(url, loginRequest, this.httpOptions);
  }

  signup(signupRequest: AuthRequest) {
    const url = `${this.url}/sign-up`;

    return this.http.post(url, signupRequest, this.httpOptions);
  }

  getPartite(query: MatchRequest = {}) {
    const url = `${this.url}/partite`;

    let params = new HttpParams();

    if (query.giocatore) {
      params = params.set('giocatore', query.giocatore);
    }

    if (query.limite) {
      params = params.set('limite', query.limite.toString());
    }

    if (query.stato) {
      params = params.set('stato', query.stato);
    }

    if (query.ordine) {
      params = params.set('ordine', query.ordine);
    }

    return this.http.get<MatchItem[]>(url, {...this.httpOptions, params});
  }

  createPartita() {
    const url = `${this.url}/partite`;

    return this.http.post<MatchStartingLink>(url, this.httpOptions);
  }

  getPartitaByID(id: string) {
    const url = `${this.url}/partite/${id}`;

    return this.http.get<MatchItem>(url, this.httpOptions);
  }

  updateStatoPartita(id: number, status: string) {
    const url = `${this.url}/partite/${id}`;

    return this.http.patch(url, { stato: status }, this.httpOptions);
  }

  updateSequenzaPartita(id: number, nextLink: string) {
    const url = `${this.url}/partite/${id}`;

    return this.http.patch(url, { 'link-successivo': nextLink }, this.httpOptions);
  }

  getLeaderboardPartite(type: string) {
    const url = `${this.url}/classifiche/partite?tipologia=${type}&limite=10`;

    return this.http.get<LeaderboardItem[]>(url, this.httpOptions);
  }

  getLeaderboardUtenti(type: string) {
    const url = `${this.url}/classifiche/utenti?tipologia=${type}&limite=10`;

    return this.http.get<LeaderboardItem[]>(url, this.httpOptions);
  }

}
