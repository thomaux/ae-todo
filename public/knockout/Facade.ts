/// <reference path="lib/jquery-1.8.d.ts" />

//var BASE_PATH = "http://localhost:3000/";
var BASE_PATH = 'http://aetodo.cloudfoundry.com/';



export class Facade {
	static list() {
		return $.get(BASE_PATH + 'todos');
	}
	static create(data: any) {
		return $.post(BASE_PATH + 'todo', data);
	}
	static update(id: number, data: any) {
		return $.ajax(BASE_PATH + 'todo/' + id, {
			type: 'PUT',
			data: $.param(data)
		});
	}
}