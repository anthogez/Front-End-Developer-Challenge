import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

	constructor(private searchService: SearchService, private route: ActivatedRoute) { }

	ngOnInit() { this.searchMovie(); }
	ngOnDestroy() { this.onDestroy.next(); }

	searchMovie(): void {
		this.route.queryParams.pipe(map(params => {
			const searchTerm = params['searchTerm'] ? params['searchTerm'] : '';
			const pageNumber = params['pageNumber'] ? params['pageNumber'] : '';
			this.movies$ = this.searchService.searchMovie(searchTerm, pageNumber).pipe(map(value => value['Search']), takeUntil(this.onDestroy));
		})).subscribe();
	}

	posterIsAvailable(poster: string) {
		return poster !== 'N/A';
	}

	trackByFn(index, item) {
		return item.id;
	}
}
