import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { SearchService } from 'src/app/shared/services/search.service';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ManageComponentService } from 'src/app/shared/services/manage-component.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	private readonly onDestroy = new Subject<void>();
	movies$: Observable<Movie[]>;

	private searchTerm: string;
	private pageNumber: string;

	private nextPageResponse: boolean;
	private nextPageResults: Movie[];

	imageNotFoundUrl = environment.appSettings.images.not_found;

	constructor(private searchService: SearchService,
		private route: ActivatedRoute, private manageComponentService: ManageComponentService) { }

	ngOnInit() { this.init(); }

	ngOnDestroy() { this.onDestroy.next(); }

	init() {
		this.manageComponentService.registerComponent('HomeComponent', this);
		this.searchMovie();
	}

	searchMovie(): void {
		this.nextPageResults = [];
		this.route.queryParams.pipe(map(params => {
			this.pageNumber = environment.appSettings.omdb_api.default_page_number;
			this.searchTerm = params['searchTerm'] ? params['searchTerm'] : '';
			this.movies$ = this.searchService.searchMovie(this.searchTerm, this.pageNumber).pipe(map(value => value['Search']));
			this.prepareNextPageResults();
		}), takeUntil(this.onDestroy)).subscribe();
	}

	private prepareNextPageResults(): void {
		this.pageNumber = (Number(this.pageNumber) + 1).toString();
		this.searchService.searchMovie(this.searchTerm, this.pageNumber)
			.pipe(map(res => {
				this.nextPageResponse = (res['Response'].toLowerCase() === 'true');
				this.nextPageResults = this.nextPageResponse ? res['Search'] as Movie[] : [];
			}), takeUntil(this.onDestroy)).subscribe();
	}

	loadMore(currentPageResults: Movie[]): void {
		this.movies$ = of(currentPageResults.concat(this.nextPageResults));
		this.nextPageResults = [];
		this.prepareNextPageResults();
	}

	isAllowedToLoadMore(): boolean {
		return !this.nextPageResponse;
	}

	trackByFn(index, item) {
		return item.id;
	}

	getMoviePoster(imageUrl: string): string {
		// TODO handle me properly with exceptions
		return imageUrl === 'N/A' ? this.imageNotFoundUrl : imageUrl;
	}
}
