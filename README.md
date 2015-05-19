Simple Stream Class
-------------------

[Example summing integers] (http://jsfiddle.net/6nt9kmje/1/)

Starting the stream van be done like this:

```
var stream = simpleStream();
```

Then typically add filters or similar
```
stream.map( function(v) {
    return "TEST "+v; 
});
stream.reduce( function(p,n) {
    return p+n;
},"");

```
Pause before continuing

```
stream.collectValuesFor( 500 );
```

Do something with results

```
stream.forEach( function(valueOrArray) { } );
```

And then start pushing values for the stream

```
steam.pushValue("foobar");
```

Adding Observers
----------------

```
this.addObserver(function(stream) {
    var value = stream.getValue();
    
    if(value != goodValue) {
        stream.stopStream();
    }
    stream.run(value); // set the value ( optional )
}); 
```

#forEach(v, i, ctx)
--------------------

Gets the filtered values out from the stream


#collectValuesFor(ms)
--------------------

Will pause the stream  `ms` milliseconds before starting
```
stream2.collectValuesFor( 500 );
```
