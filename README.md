# sandbox
Playground for testing app dev

## Bazel
To update `BUILD.bazel` files, run
 
```bash
$ bazelisk run //:gazelle
```

To run example project, run

```bash
$ bazelisk run //cmd/example:example
```

To run all tests in the workspace, run

```bash
$ bazelisk test --test_output=errors //...
```
