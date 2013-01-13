define(["require", "exports", 'Facade'], function(require, exports, __facade__) {
    var facade = __facade__;

    var Task = (function () {
        function Task(id, name, duedate, completed) {
            this.id = id;
            this.name = ko.observable(name).extend({
                required: true
            });
            this.duedate = ko.observable(duedate);
            this.completed = ko.observable(completed);
            this.title = ko.computed(function () {
                return this.name() + (this.duedate() ? ' (' + this.duedate() + ')' : '');
            }, this);
            this.completed.subscribe(function (newValue) {
                facade.Facade.update(this.id, this.toJSON());
            }, this);
        }
        Task.prototype.toJSON = function () {
            return {
                name: this.name(),
                duedate: this.duedate(),
                completed: this.completed()
            };
        };
        return Task;
    })();
    exports.Task = Task;    
})
