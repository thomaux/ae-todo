define(["require", "exports"], function(require, exports) {
    var BASE_PATH = 'http://aetodo.cloudfoundry.com/';
    var Facade = (function () {
        function Facade() { }
        Facade.list = function list() {
            return $.get(BASE_PATH + 'todos');
        }
        Facade.create = function create(data) {
            return $.post(BASE_PATH + 'todo', data);
        }
        Facade.update = function update(id, data) {
            return $.ajax(BASE_PATH + 'todo/' + id, {
                type: 'PUT',
                data: $.param(data)
            });
        }
        return Facade;
    })();
    exports.Facade = Facade;    
})
