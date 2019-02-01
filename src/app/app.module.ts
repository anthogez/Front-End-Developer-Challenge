import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './modules/routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { SearchComponent } from './components/search/search.component';
import { SearchService } from './shared/services/search.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './components/container/container.component';
import { StickyToolbarComponent } from './components/sticky-toolbar/sticky-toolbar.component';
import { MovieDetailsComponent } from './views/movie-details/movie-details.component';
import { HomeComponent } from './views/home/home.component';
import { ManageComponentService } from './shared/services/manage-component.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [
		AppComponent,
		SearchComponent,
		ContainerComponent,
		StickyToolbarComponent,
		MovieDetailsComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		RoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule,
		HttpClientModule,
		FlexLayoutModule
	],
	providers: [SearchService, ManageComponentService],
	bootstrap: [AppComponent]
})
export class AppModule { }
