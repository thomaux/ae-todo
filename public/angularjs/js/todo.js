angular.module('todoApp', ['ui', 'services']);

var BASE_PATH = "http://aetodo.cloudfoundry.com/";


function TodoCtrl($scope, $http, socket) {

    $scope.todos = [];


    var updateTodos = function () {
        $http.get(BASE_PATH + "todos").success(function (data, status) {
            $scope.todos = data;
        });
    };

    updateTodos();

    socket.on('todo:update', function (data) {
        updateTodos();
    });

    $scope.addTodo = function () {
        var todo = {};
        todo.name = $scope.todoText;
        todo.completed = false;
        todo.duedate = $scope.selectedDate;

        $http.post(BASE_PATH + "todo", todo).success(function (data, status) {
            $scope.todos.push(todo);
            $scope.todoText = '';
        });

        socket.emit('todo:update', {})
    };

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.completed ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function () {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.completed) $scope.todos.push(todo);
        });
    };

    $scope.changeCompleted = function (todo) {
        var id = $scope.todos.indexOf(todo);
        $http.put(BASE_PATH + "todo/" + id, todo).success(function (data, status) {
            //done
        });
        socket.emit('todo:update', {})
    }
}