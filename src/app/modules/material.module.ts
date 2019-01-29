import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatSelectModule, MatToolbarModule, MatIconModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatInputModule, MatButtonModule,
		MatSelectModule, MatToolbarModule, MatIconModule
	],
	exports: [
		MatInputModule, MatButtonModule,
		MatSelectModule, MatToolbarModule, MatIconModule
	]
})
export class MaterialModule { }
