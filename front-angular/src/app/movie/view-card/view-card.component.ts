import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'movie-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class MovieViewCardComponent {

  @Input() movie:any;

  constructor(private router: Router) {
  }

  onClick() {
    this.router.navigate(['/movie', this.movie.movieId, this.movie.title]);
  }

}
