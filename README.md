[WebAssembly](https://webassembly.org/) is a new code format for the internet intended as a minimal set of instructions with which to build software. WebAssembly is not written by developers; rather, other programming languages can be *converted* to WebAssembly, which enables developers to build web applications using languages *other* than JavaScript, which has been the only code format for the web since it was invented in 1994. Just as you'd compile C++ source code to create a program that runs on your local computer, you can now also compile source code to create a usable program that runs *on the web*.

WebAssembly comes in two forms: there's a *binary* form, which is what the interpreting engines will actually execute, and there's also a *text* form, which expresses the same concepts as the binary form using more verbose text that humans can more readily read, debug, and understand (debatable). Browsers will transparently convert between the two forms whenever you try to examine and run WebAssembly code.

This repository contains code in the WebAssembly *text* format which was, against all advice, *written by hand* instead of compiled as intended. It was also then wrapped in a [Markdown](https://daringfireball.net/projects/markdown/) file and heavily annotated using a verbose coding style called [literate programming](https://en.wikipedia.org/wiki/Literate_programming), which treats source code like written material intended for humans instead of instructions intended for execution by computers. (For more on literate programming, see the [`lit.sh` repository](https://github.com/vijithassar/lit).) I did this both as an exercise to help me learn how WebAssembly works under the hood, and also because it is ridiculous.

Before the [annotated code](./add.wat.md) can be executed, it must first be compiled *twice*. Those two compilation tasks are:

1. parse the Markdown and strip the annotations, leaving behind pure WebAssembly code
2. compile the WebAssembly into a module so it's usable from JavaScript

In order to parse the Markdown, you'll first need to install [`lit.sh`](https://github.com/vijithassar/lit), a tool that helps with literate programming. To get it, navigate to the project directory in your terminal and run this line of code:

```bash
# install lit.sh
$ curl https://raw.githubusercontent.com/vijithassar/lit/master/lit.sh > lit.sh && chmod +x lit.sh
```

In addition, you'll need to install the other project dependencies as listed in [`package.json`](./package.json) using the [npm](https://npmjs.org) package manager.

```bash
# install npm dependencies
$ npm install
```

Now you're ready to run the code.

```bash
$ npm run test
```

The test script will itself run the `npm run assemble` script, which performs the two compilation tasks described above. Afterwards, you'll see two additional artifacts in the directory, both of them [`.gitignore`](./.gitignore)d:

- `add.wat` is the WebAssembly code in *text* format
- `add.wasm` is the WebAssembly code in *binary* format; this is what will actually be executed

The "execution" command is really just a wrapper around a couple of unit tests, so it won't show you anything interesting unless something goes wrong, but if the tests pass then you can be certain the [annotated WebAssembly code](./add.wat.md) actually works as expected.