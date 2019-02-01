// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	// the config below was created only for demo purpose (usually avoid this kind of config and place it in a properly config file)
	appSettings: {
		search_form: {
			min_characters: 3,
			hint: {
				// TODO install https://github.com/ngx-translate/ and apply i18n
				normal_message: 'Hint: e.g. Resident Evil',
				error_message: 'This field requires minimum 3 characters.'
			}
		},
		omdb_api: {
			url: 'http://www.omdbapi.com',
			key: 'd777cf78',
			default_page_number: '1'
		},
		images: {
			not_found: './assets/images/not-found.jpeg'
		}
	}
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
