Let's write a function in WebAssembly! Buckle up.

To keep this from immediately turning into a disaster, we'll set the bar low: the function should just add two numbers and return the result. For comparison, the equivalent JavaScript function would be this: 

<pre>
function add(a, b) {
  return a + b;
}
</pre>

This is essentially useless, because you could get the same result just by running `a + b`, without even bothering with the function at all. However, useless things are probably more likely to be achievable.

Everything in WebAssembly is a module. Everything in WebAssembly is also an [s-expression](https://en.wikipedia.org/wiki/S-expression). So the first thing we do is open an s-expression that declares a module. The simplest possible valid WebAssembly module is literally just `(module)`, but that would be insufficiently interesting for our purposes here.

```webassembly
(module
```

Next it's time to create the function definition. Handles in WebAssembly are denoted with the `$` prefix. This feels familiar enough for variables given that I first started programming in PHP, but for *function* names it's pretty weird! Now that I think about it, I actually can't think of another language that names functions this way, but as we'll see in a moment, it does nicely parallel the ways in which WebAssembly refers to function parameters and variables.

```webassembly
  (func $add
```

The function signature is very structured compared to what you'd typically do in JavaScript. It's tedious, but remember that this is an assembly language that humans weren't really meant to write; I must assume the machines find it less aggravating than I do. Writing the parameters vertically helps with the noise of the annotations, at least.

WebAssembly can *only* deal with numerical values, and you need to explicitly provide whatever other abstractions are necessary to coerce other data types into numerical forms, such as deriving a string by converting integers into ASCII text characters using `String.fromCharCode()`. There are four *types* of numbers to choose from: each number can be either 32-bit or 64-bit, and each can also be either an integer or a float. 

The function parameters and return value are explicitly declared as being 32-bit integers, which means the function will probably crash if we try to run it using decimal values. It'd also be nice if this module could present a [variadic](https://en.wikipedia.org/wiki/Variadic_function) interface so you could throw as many values as necessary into it. I'm still not sure how to do that at the moment, and I suspect it may not be possible at all, since the whole point of WebAssembly is really to highly optimize beforehand, which is probably considerably harder if you can't predict what the inputs are going to be. 

```webassembly
    (param $a i32)
    (param $b i32)
    (result i32)
```

The function body just takes one of the [available operators](https://webassembly.org/docs/semantics/) and throws parameters into it. Even for something so short, the syntax is starting to feel sort of <a href="https://en.wikipedia.org/wiki/Lisp_(programming_language)">Lisp</a>y.

```webassembly
    (i32.add
      (get_local $a)
      (get_local $b)
    )
```

Close the function definition.

```webassembly
  )
```

The very last step is to define the module API and close the outermost expression. Because this is separate from the function definition, it parallels the [CommonJS](http://commonjs.org/) module practice where you'd assign everything to `module.exports` at the *end* of the source code file, thereby *very clearly* defining the public API. That was nice, and it's a shame that it seems to have been lost with ES modules, which often recklessly throw `export` around.

```
  (export "add" (func $add))
)
```

That's it, we are done! With tremendous effort and *two* fragile compile stages — one for the literate programming and one for WebAssembly — we have managed to create what is effectively a clone of JavaScript's native `+` operator, except that it will probably choke on certain kinds of numbers and it will *definitely* choke if we try to use it for string concatenation. But whatever, hooray anyway!

At this juncture you'll probably want to head on over to the [tests](./test.js) to make sure it's actually working as intended.
