import minimatch from "minimatch";

test("minimatch root file", () => {
  expect(minimatch("example.json", "*")).toStrictEqual(true);
  expect(minimatch("example.json", "**")).toStrictEqual(true);

  expect(minimatch("example.json", "*.json")).toStrictEqual(true);
  expect(minimatch("example.json", "**.json")).toStrictEqual(true);

  expect(minimatch("example.json", "example.*")).toStrictEqual(true);
  expect(minimatch("example.json", "example.**")).toStrictEqual(true);
});

test("minimatch subdirectory", () => {
  expect(minimatch("example/sub/file", "*")).toStrictEqual(false);
  expect(minimatch("example/sub/file", "**")).toStrictEqual(true);

  expect(minimatch("example/sub/file", "example/*")).toStrictEqual(false);
  expect(minimatch("example/sub/file", "example/**")).toStrictEqual(true);

  expect(minimatch("example/sub/file", "example/*/*")).toStrictEqual(true);
  expect(minimatch("example/sub/sub/file", "example/*/*")).toStrictEqual(false);

  expect(minimatch("example/sub/file", "example/**/*")).toStrictEqual(true);
  expect(minimatch("example/sub/sub/file", "example/**/*")).toStrictEqual(true);
});

test("mminimatch file extension", () => {
  expect(minimatch("file.ts", "*.ts")).toStrictEqual(true);
  expect(minimatch("example/sub/file.ts", "*.ts")).toStrictEqual(false);

  expect(minimatch("file.ts", "**.ts")).toStrictEqual(true);
  expect(minimatch("example/sub/file.ts", "**.ts")).toStrictEqual(false);

  expect(minimatch("file.ts", "*/*.ts")).toStrictEqual(false);
  expect(minimatch("example/sub/file.ts", "*/*.ts")).toStrictEqual(false);

  expect(minimatch("file.ts", "**/*.ts")).toStrictEqual(true);
  expect(minimatch("example/sub/file.ts", "**/*.ts")).toStrictEqual(true);
});
