import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RestBackendService } from '../services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { MatchItem } from '../services/rest-backend/match-item.type';
import { SecondsToHoursPipe } from '../pipes/seconds-to-hours/seconds-to-hours.pipe';
import { RouterLink } from '@angular/router';
import { DecodeURIPipe } from '../pipes/decode-uri/decode-uri.pipe';

@Component({
  selector: 'app-match-history',
  imports: [RouterLink, SecondsToHoursPipe, DecodeURIPipe],
  templateUrl: './match-history.html',
  styleUrl: './match-history.scss',
})
export class MatchHistory {
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  
  matchHistory: WritableSignal<MatchItem[]> = signal<MatchItem[]>([]);

  ngOnInit() {
    this.fetchLeaderboard();
  }

  fetchLeaderboard() {
    this.restService.getPartite({
      stato: 'terminata'     
    }).subscribe({
      next: (data) => { this.matchHistory.set(data); },
      error: (error) => { this.toastr.error(error.message, error.statusText); }
    });
  }

}
