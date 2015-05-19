Simple Stream Class
-------------------

[Example summing integers] (http://jsfiddle.net/6nt9kmje/)


```
var stream = simpleStream();

stream.map( function(v) {
    return "TEST "+v; 
});
stream.reduce( function(p,n) {
    return p+n;
},"");

steam.pushValue("foobar");

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
