gate-executor
=============

Used internally in [Seneca](http://senecajs.org/) micro-service communication to execute tasks in order. If you haven't heard about Seneca, check out the [getting started guide](http://senecajs.org/getting-started.html).

### Custom Use

The gate executor provides functionality to pause gated tasks and to quit tasks that exceed a given timeout. The executor can be created with a few options:
```JavaScript
var e0 = executor({
	trace: true,			 // Error logging trace, default false
	timeout: 150,			 // Timout for tasks, default 3333
	error: function() {...}, // A function to wrap all errors in, default noop
	stubs: {				 // Stubs to substitute default node functions
		now: {...},
		setTimeout: {...},
		clearTimeout: {...}
	}
})
```

When calling the executor with a task, use the following pattern:
```JavaScript
e0.execute({
	id: 'a',			 // Optional identifier for trace
	fn: function() {...} // Function to be preformed
	cb: function(err, out) {...}
})
```