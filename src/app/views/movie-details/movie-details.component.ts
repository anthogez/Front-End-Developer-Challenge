import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { SearchService } from 'src/app/shared/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

	private readonly onDestroy = new Subject<void>();

	movie$: Observable<Movie>;

	constructor(private searchService: SearchService, private route: ActivatedRoute) { }

	ngOnInit() { this.searchMovie(); }

	ngOnDestroy() { this.onDestroy.next(); }

	searchMovie(): void {
		this.route.queryParams.pipe(map(params => {
			const imdbId = params['i'] ? params['i'] : '';
			this.movie$ = this.searchService.searchMovieDetails(imdbId).pipe(map(result => result), takeUntil(this.onDestroy));
		})).subscribe();
	}

	posterIsAvailable(poster: string) {
		return poster !== 'N/A';
	}

	trackByFn(index, item) {
		return item.id;
	}

}
