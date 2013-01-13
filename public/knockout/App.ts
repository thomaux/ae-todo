/// <reference path="lib/knockout-2.2.d.ts" />
/// <reference path="lib/knockout.validation.d.ts" />
/// <reference path="lib/jquery-1.8.d.ts" />

import task = module('Task');
import facade = module('Facade');

class ViewModel {
	tasks: KnockoutObservableArray;
	newTask: KnockoutObservableAny;
	errors: KnockoutValidationErrors;
	toggleCompletedTasksText: KnockoutComputed;
	showCompletedTasks: KnockoutObservableBool;

	constructor() {
		this.tasks = ko.observableArray();
		this.newTask = ko.observable(new task.Task(undefined, undefined, undefined, false));
		this.errors = ko.validation.group(this.newTask());
		this.showCompletedTasks = ko.observable(true);

		this.toggleCompletedTasksText = ko.computed(function () {
			return this.showCompletedTasks() ? "Hide completed tasks" : "Show completed tasks";
		}, this);

		facade.Facade.list().done(function(data){
            $.each(data, (k, todo) => {
                this.tasks.push(new task.Task(k, todo.name, todo.duedate, todo.completed === "true"));
            });
        });
	}

	addTask() {
		var newTask: task.Task;
		newTask = this.newTask();
		if (newTask.name.isValid()) {
			facade.Facade.create(this.newTask().toJSON()).done((data) => {
				this.newTask().id = data;
				this.tasks.push(this.newTask());

				this.newTask(new task.Task(undefined, undefined, undefined, false));
				this.errors = ko.validation.group(this.newTask());
			});
		} else {
			this.errors.showAllMessages();
		}
	}

	toggleCompletedTasks() {
		this.showCompletedTasks(!this.showCompletedTasks());
	}
}

ko.applyBindings(new ViewModel());