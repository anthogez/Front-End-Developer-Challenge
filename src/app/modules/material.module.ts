import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatSelectModule, MatToolbarModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatInputModule, MatButtonModule,
		MatSelectModule, MatToolbarModule
	],
	exports: [
		MatInputModule, MatButtonModule,
		MatSelectModule, MatToolbarModule
	]
})
export class MaterialModule { }
