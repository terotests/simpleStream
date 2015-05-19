Simple usage 
------------

Simple usage of the class

```
  var cs = css();
  cs.animation("animClassName", {
        duration : "2s",
        "iteration-count" : 1,
        "timing-function" : "ease-in"
    },  { rotate : -100 }, 0.5, { rotate : 100 }, { rotate : 0 }); 
```

[Demo at jsFiddle] (http://jsfiddle.net/az2daat0/)