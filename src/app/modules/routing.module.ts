import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { MovieDetailsComponent } from '../views/movie-details/movie-details.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'movie-details', component: MovieDetailsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class RoutingModule { }
