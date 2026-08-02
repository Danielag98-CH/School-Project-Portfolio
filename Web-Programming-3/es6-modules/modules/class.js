export default class Person{

	#name;

	constructor(name){
		this.#name = name;
	}

	sayHello(){
		alert(`Hello, I'm ${this.#name}`);
	}

}