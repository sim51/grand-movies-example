import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'grand-movie-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class MovieViewCardComponent {

  // TODO: add the movie type
  @Input() movie: any;

  constructor(private router: Router) {
    // Nothing
  }

  onClick(): void {
    this.router.navigate(['/movie', this.movie.movieId, this.movie.title]);
  }

}
