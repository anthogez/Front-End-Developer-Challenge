import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatInputModule, MatButtonModule, MatSelectModule, MatToolbarModule,
	MatIconModule, MatCardModule, MatListModule
} from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatInputModule, MatButtonModule, MatSelectModule,
		MatToolbarModule, MatIconModule, MatCardModule, MatListModule
	],
	exports: [
		MatInputModule, MatButtonModule, MatSelectModule,
		MatToolbarModule, MatIconModule, MatCardModule, MatListModule
	]
})
export class MaterialModule { }
