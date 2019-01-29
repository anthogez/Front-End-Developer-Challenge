import { Rating } from './rating.interface.';

export interface Movie {
	title: string;
	year: string;
	rated: string;
	released: string;
	runtime: string;
	genre: string;
	director: string;
	writer: string;
	actors: string;
	plot: string;
	language: string;
	country: string;
	awards: string;
	poster: string;
	ratings: Rating[];
	metaScore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	type: string;
	dvd: string;
	boxOffice: string;
	production: string;
	website: string;
	response: string;
}

