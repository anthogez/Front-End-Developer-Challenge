import { Injectable } from '@angular/core';
@Injectable({
	providedIn: 'root'
})
export class ManageComponentService {

	private map = new Map<string, Object>();
	constructor() { }

	registerComponent(key: string, component: Object) {
		this.map.set(key, component);
	}

	getComponentByKey(key: string): any {
		return this.map.get(key);
	}
}
