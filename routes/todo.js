var todos = [];

exports.options = function(req, res){
	var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
	  res.end();
}

exports.list = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(todos);
};

exports.create = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    todos.push(req.body);
    console.log(todos.length, todos[todos.length - 1]);
    var index = "" + (todos.length - 1);
    res.send(index);
};

exports.update = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var id = req.params.id,
        todo = todos[id],
        body = req.body;

    if(typeof(todo) == "undefined"){
        res.send('',404);
        return;
    }

    if(typeof(body.name) != "undefined"){
        todo.name = body.name;
    }
    if(typeof(body.completed) != "undefined"){
        todo.completed = body.completed;
    }
    if(typeof(body.duedate) != "undefined"){
        todo.duedate = body.duedate;
    }

    res.send();
};