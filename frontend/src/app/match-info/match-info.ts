import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatchItem } from '../services/rest-backend/match-item.type';
import { RestBackendService } from '../services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { SecondsToHoursPipe } from '../pipes/seconds-to-hours/seconds-to-hours.pipe';
import { DecodeURIPipe } from '../pipes/decode-uri/decode-uri.pipe';

@Component({
  selector: 'app-match-info',
  imports: [SecondsToHoursPipe, DecodeURIPipe],
  templateUrl: './match-info.html',
  styleUrl: './match-info.scss',
})
export class MatchInfo {
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);

  route = inject(ActivatedRoute);
  title = inject(Title);

  match: WritableSignal<MatchItem | undefined> = signal<MatchItem | undefined>(undefined);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.title.setTitle(`Partita ${id} | RoadToUniNa`);

    this.fetchMatchByID(id ? id : '');
  }

  fetchMatchByID(id: string) {
    this.restService.getPartitaByID(id).subscribe({
      next: (data) => { this.match.set(data); console.log(data); },
      error: (error) => { this.toastr.error(error.message, error.statusText); }
    });
  }

}
