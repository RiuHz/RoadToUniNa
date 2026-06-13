import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RestBackendService } from '../services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { LeaderboardItem } from '../services/rest-backend/leaderboard-item.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  imports: [RouterLink],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.scss',
})
export class Leaderboard {
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  matchLeaderboard: WritableSignal<LeaderboardItem[]> = signal<LeaderboardItem[]>([]);
  userLeaderboard: WritableSignal<LeaderboardItem[]> = signal<LeaderboardItem[]>([]);

  ngOnInit() {
    this.fetchMatchLeaderboard();
    this.fetchUserLeaderboard();
  }

  fetchMatchLeaderboard() {
    this.restService.getLeaderboardPartite(
      'numero-passi'
    ).subscribe({
      next: (data) => { this.matchLeaderboard.set(data); },
      error: (error) => { this.toastr.error(error.message, error.statusText); }
    });
  }

  fetchUserLeaderboard() {
    this.restService.getLeaderboardUtenti(
      'sfide-completate'
    ).subscribe({
      next: (data) => { this.userLeaderboard.set(data); },
      error: (error) => { this.toastr.error(error.message, error.statusText); }
    });
  }

}
