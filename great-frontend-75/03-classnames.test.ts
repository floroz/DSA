import { expect, test, describe } from "vitest";

type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, boolean | number | null | undefined>
  | ClassValue[];

/**
 * classnames is a commonly-used utility in modern front end applications to conditionally join CSS class names together. If you've written React applications, you likely have used a similar library.
 */
function classNames(...args: ClassValue[]): string {
  const classes: (string | number)[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === "string" || typeof arg === "number") {
      classes.push(arg);
    } else if (typeof arg === "object") {
      if (Array.isArray(arg)) {
        classes.push(classNames(...arg));
      } else {
        for (const key in arg) {
          if (arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}

describe("classNames", () => {
  test("empty values", () => {
    expect(classNames([])).toEqual("");
  });

  test("single value", () => {
    expect(classNames("foo")).toEqual("foo");
  });

  test("two values", () => {
    expect(classNames("foo", "bar")).toEqual("foo bar");
  });

  test("array values", () => {
    expect(classNames(["foo", "bar", "baz"])).toEqual("foo bar baz");
  });

  test("object values", () => {
    expect(classNames({ "foo-bar": true })).toEqual("foo-bar");
    expect(classNames({ "foo-bar": false })).toEqual("");
    expect(classNames({ foo: true }, { bar: true })).toEqual("foo bar");
    expect(classNames({ foo: true, bar: false, qux: true })).toEqual("foo qux");
  });

  test("mixed values", () => {
    expect(
      classNames(
        "foo",
        {
          bar: true,
          duck: false,
        },
        "baz",
        { quux: true }
      )
    ).toEqual("foo bar baz quux");
    expect(
      classNames("boo", "loo", null, {
        foo: true,
        bar: false,
        baz: 1,
      })
    ).toEqual("boo loo foo baz");
  });

  test("ignores falsey values", () => {
    expect(
      classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "")
    ).toEqual("bar 1");
  });

  test("recursively flattens arrays", () => {
    expect(classNames("a", ["b", { c: true, d: false }])).toEqual("a b c");
    expect(classNames("a", ["b", ["c", ["d"]]])).toEqual("a b c d");
  });
});
