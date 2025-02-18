export class SimpleStore extends EventTarget {
	constructor(initialState = {}) {
		super();
		this.state = initialState;
	}

	set(path, value) {
		this.state[path] = value;
		this.dispatchEvent(new CustomEvent(`state:${path}`, { detail: value }));
	}

	get(path) {
		return this.state[path];
	}

	subscribe(path, callback) {
		this.addEventListener(`state:${path}`, (event) => callback(event.detail));
	}
}
