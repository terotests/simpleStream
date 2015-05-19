Simple Stream Class
-------------------



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
