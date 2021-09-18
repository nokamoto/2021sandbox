import { compareFn, listCandidates } from "./gcr";

const a = { created_at: "2021-09-17T15:00:00Z", name: "0", id: 0 };
const b = { created_at: "2021-09-18T15:00:00Z", name: "1", id: 1 };
const c = { created_at: "2021-09-19T15:00:00Z", name: "2", id: 2 };

test("compareFn", () => {
  const versions = [b, a, c];
  versions.sort(compareFn);
  expect(versions).toStrictEqual([c, b, a]);
});

test("listCandidates", () => {
  expect(listCandidates([b, a, c], 1)).toStrictEqual([b, a]);
  expect(listCandidates([b, a, c], 2)).toStrictEqual([a]);
  expect(listCandidates([b, a, c], 3)).toStrictEqual([]);
  expect(listCandidates([b, a, c], 4)).toStrictEqual([]);
});
