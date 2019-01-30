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
	movies$: Observable<Movie[]>;

	searchTerm: string;
	pageNumber: string;
	availableMovies: Movie[];

	private nextPageResponse: boolean;
	private nextPageResults: Movie[];

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

	private prepareNextPageResults() {
		this.pageNumber = (Number(this.pageNumber) + 1).toString();
		this.searchService.searchMovie(this.searchTerm, this.pageNumber)
			.pipe(map(res => {
				this.nextPageResponse = (res['Response'].toLowerCase() === 'true');
				this.nextPageResults = this.nextPageResponse ? res['Search'] as Movie[] : [];
			})).subscribe();
	}

	loadMore(currentPageResults: any): void {
		this.movies$ = of(currentPageResults.concat(this.nextPageResults));
		this.nextPageResults = [];
		this.prepareNextPageResults();
	}


	isAllowedToLoadMore() {
		return !this.nextPageResponse;
	}

	trackByFn(index, item) {
		return item.id;
	}

	posterIsAvailable(poster: string) {
		return poster !== 'N/A';
	}
}
