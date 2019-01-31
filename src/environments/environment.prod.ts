export const environment = {
	production: true,
	// the config below was created only for demo purpose
	appSettings: {
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
