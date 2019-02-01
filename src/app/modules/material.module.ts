import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatInputModule, MatButtonModule, MatSelectModule, MatToolbarModule,
	MatIconModule, MatCardModule, MatListModule, MatGridListModule
} from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatInputModule, MatButtonModule, MatSelectModule,
		MatToolbarModule, MatIconModule, MatCardModule, MatListModule, MatGridListModule
	],
	exports: [
		MatInputModule, MatButtonModule, MatSelectModule,
		MatToolbarModule, MatIconModule, MatCardModule, MatListModule, MatGridListModule
	]
})
export class MaterialModule { }
