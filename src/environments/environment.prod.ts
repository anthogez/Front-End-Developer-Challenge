export const environment = {
	production: true,
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
