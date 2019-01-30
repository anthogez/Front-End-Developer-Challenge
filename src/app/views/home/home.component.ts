import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { SearchService } from 'src/app/shared/services/search.service';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	private readonly onDestroy = new Subject<void>();
	nothingToLoad: boolean;
	movies$: Observable<Movie[]>;

	searchTerm: string;
	pageNumber: string;
	availableMovies: Movie[];

	constructor(private searchService: SearchService, private route: ActivatedRoute) { }

	ngOnInit() { this.init(); }
	ngOnDestroy() { this.onDestroy.next(); }

	init() { this.searchMovie(); }

	searchMovie(): void {
		this.route.queryParams.pipe(map(params => {
			this.pageNumber = '1';
			this.searchTerm = params['searchTerm'];
			this.movies$ = this.searchService.searchMovie(this.searchTerm, this.pageNumber).pipe(map(value => value['Search']));
			this.prepareNextPageResults();
		}), takeUntil(this.onDestroy)).subscribe();
	}

	prepareNextPageResults() {
		this.pageNumber = (Number(this.pageNumber) + 1).toString();
		this.searchService.searchMovie(this.searchTerm, this.pageNumber)
			.pipe(map(value => value)).subscribe(nextPage => {

				const nextPageResponse = nextPage['Response'];
				const nextPageHaveResults = (nextPageResponse === 'True');

				if (nextPageHaveResults) {
					const nextPageResults = nextPage['Search'];
					this.availableMovies = nextPageResults;
				}
				this.nothingToLoad = !nextPageHaveResults;
			});
	}

	loadMore(currentPageResults: any): void {
		currentPageResults = currentPageResults.concat(this.availableMovies);
		this.movies$ = of(currentPageResults);
		this.availableMovies = [];
		this.prepareNextPageResults();
	}

	trackByFn(index, item) {
		return item.id;
	}

	posterIsAvailable(poster: string) {
		return poster !== 'N/A';
	}
}
