define(["require", "exports", 'Task', 'Facade'], function(require, exports, __task__, __facade__) {
    var task = __task__;

    var facade = __facade__;

    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;
            this.tasks = ko.observableArray();
            this.newTask = ko.observable(new task.Task(undefined, undefined, undefined, false));
            this.errors = ko.validation.group(this.newTask());
            this.showCompletedTasks = ko.observable(true);
            this.toggleCompletedTasksText = ko.computed(function () {
                return this.showCompletedTasks() ? "Hide completed tasks" : "Show completed tasks";
            }, this);
            facade.Facade.list().done(function (data) {
                $.each(data, function (k, todo) {
                    _this.tasks.push(new task.Task(k, todo.name, todo.duedate, todo.completed == true));
                });
            });
        }
        ViewModel.prototype.addTask = function () {
            var _this = this;
            var newTask;
            newTask = this.newTask();
            if(newTask.name.isValid()) {
                facade.Facade.create(this.newTask().toJSON()).done(function (data) {
                    _this.newTask().id = data;
                    _this.tasks.push(_this.newTask());
                    _this.newTask(new task.Task(undefined, undefined, undefined, false));
                    _this.errors = ko.validation.group(_this.newTask());
                });
            } else {
                this.errors.showAllMessages();
            }
        };
        ViewModel.prototype.toggleCompletedTasks = function () {
            this.showCompletedTasks(!this.showCompletedTasks());
        };
        return ViewModel;
    })();    
    ko.applyBindings(new ViewModel());
})
