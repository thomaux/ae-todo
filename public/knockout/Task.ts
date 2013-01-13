/// <reference path="lib/knockout-2.2.d.ts" />

import facade = module('Facade');

export
	class Task {
		name: KnockoutObservableString;
		duedate: KnockoutObservableDate;
		completed: KnockoutObservableBool;

		title: KnockoutComputed;

		constructor(public id: number, name: string, duedate: Date, completed: bool) {
			this.name = ko.observable(name).extend({ required: true });
			this.duedate = ko.observable(duedate);
			this.completed = ko.observable(completed);

			this.title = ko.computed(function(){
				return this.name() + (this.duedate() ? ' (' + this.duedate() + ')' : '');
			}, this);

			this.completed.subscribe(function (newValue) {
				facade.Facade.update(this.id, this.toJSON());
			}, this);
		}

		toJSON() {
			return {
				name: this.name(),
				duedate: this.duedate(),
				completed: this.completed()
			};
		}
	}