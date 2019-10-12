import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { ManageComponentService } from 'src/app/shared/services/manage-component.service';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'search-movie',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	// TODO ADD i18n
	private NORMAL_HINT_MESSAGE = environment.appSettings.search_form.hint.normal_message;
	private ERROR_HINT_MESSAGE = environment.appSettings.search_form.hint.error_message;
	private MOVIE_TITLE_MIN_LENGTH = environment.appSettings.search_form.min_characters;

	movie: FormGroup;
	private submitted: boolean;

	constructor(private router: Router, private manageComponentService: ManageComponentService) { }

	ngOnInit() { this.init(); }

	private init() {
		this.submitted = false;
		this.setFormGroup();
	}

	private setFormGroup(): void {
		this.movie = new FormGroup({
			titleCtrl: new FormControl('', [Validators.required, Validators.minLength(this.MOVIE_TITLE_MIN_LENGTH)])
		});
	}

	onSubmit(): void {
		this.submitted = true;
		if (this.movie.invalid) { return; }
		this.setRouterQueryParams();
		this.manageComponentService.getComponentByKey('HomeComponent').searchMovie();
	}

	private setRouterQueryParams() {
		const searchTerm = this.getFormValue('titleCtrl');
		const queryParams: Params = { searchTerm };
		this.router.navigate(['.'], { queryParams });
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
