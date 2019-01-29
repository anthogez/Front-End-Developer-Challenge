import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

	constructor() { }

	ngOnInit() { }
}
