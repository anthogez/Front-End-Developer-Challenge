import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { SearchService } from 'src/app/shared/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

	private readonly onDestroy = new Subject<void>();
	movie$: Observable<Movie>;

	imageNotFoundUrl = environment.appSettings.images.not_found;

	constructor(private searchService: SearchService, private route: ActivatedRoute) { }

	ngOnInit() { this.searchMovie(); }
	ngOnDestroy() { this.onDestroy.next(); }

	searchMovie(): void {
		this.route.queryParams.pipe(map(params => {
			const imdbId = params['i'] ? params['i'] : '';
			this.movie$ = this.searchService.searchMovieDetails(imdbId).pipe(map(result => result));
		}), takeUntil(this.onDestroy)).subscribe();
	}

	getMoviePoster(imageUrl: string) {
		return imageUrl === 'N/A' ? this.imageNotFoundUrl : imageUrl;
	}

	trackByFn(index, item) {
		return item.id;
	}
}
