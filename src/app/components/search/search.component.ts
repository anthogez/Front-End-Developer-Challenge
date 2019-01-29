import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/shared/services/search.service';
@Component({
	selector: 'search-movie',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


	// TODO ADD i18n
	private NORMAL_HINT_MESSAGE = 'Hint: e.g. Kill Bill';
	private ERROR_HINT_MESSAGE = 'This field requires minimum 3 characters.';

	private MOVIE_TITLE_MIN_LENGTH = 3;

	movie: FormGroup;
	private submitted: boolean;

	constructor(private searchService: SearchService) { }

	ngOnInit() { this.init(); }

	private init() {
		this.submitted = false;
		this.setFormGroup();
	}

	private setFormGroup(): void {
		this.movie = new FormGroup({
			title: new FormControl('', [Validators.required, Validators.minLength(this.MOVIE_TITLE_MIN_LENGTH)])
		});
	}

	onSubmit(): void {
		this.submitted = true;
		if (this.movie.invalid) {
			return;
		}
		const searchTerm = this.getFormValue('title');
		this.searchService.searchMovie(searchTerm, '0').subscribe(res => {
			console.log(res);
		});
	}

	getFormValue(key: string): string {
		return this.movie.get(key) ? this.movie.get(key).value : '';
	}

	private displayError(): boolean {
		return this.movie.invalid && this.submitted;
	}

	hintStyleClass(): string {
		return this.displayError() ? 'error' : '';
	}

	showHintMessage(): string {
		return this.displayError() ? this.ERROR_HINT_MESSAGE : this.NORMAL_HINT_MESSAGE;
	}
}
