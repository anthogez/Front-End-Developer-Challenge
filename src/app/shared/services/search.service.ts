import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchType } from '../enums/search-type.enum';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	private API_URL = environment.omdbApi.url;
	private API_KEY = environment.omdbApi.key;

	constructor(private http: HttpClient) { }

	searchMovie(searchTerm: string, pageNumber: string): Observable<Movie[]> {
		const params = this.movieSearchParams(searchTerm, pageNumber);
		return this.http.get<Movie[]>(`${this.API_URL}/?${params}`);
	}

	searchMovieDetails(imdbId: string): Observable<Movie> {
		const params = this.movieDetailsParams(imdbId);
		return this.http.get<Movie>(`${this.API_URL}/?${params}`);
	}

	movieSearchParams(searchTerm: string, pageNumber: string): HttpParams {
		return new HttpParams({
			fromObject: {
				apikey: this.API_KEY,
				s: `[${searchTerm}]`,
				type: SearchType.MOVIE,
				page: `[${pageNumber}]`
			}
		});
	}

	movieDetailsParams(imdbId: string): HttpParams {
		return new HttpParams({
			fromObject: {
				apikey: this.API_KEY,
				i: imdbId
			}
		});
	}
}


