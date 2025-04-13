/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";

declare global {
  interface Function {
    myCall(this: Function, thisArg: any, ...argArray: any[]): any;
  }
}

Function.prototype.myCall = function (thisArg, ...argArray) {
  // 1. Handle null/undefined and primitive thisArg
  // Use Object() to wrap primitives and handle null/undefined gracefully.
  // In non-strict mode, null/undefined would become the global object.
  // In strict mode, they remain null/undefined. Using Object() provides a
  // safe way to attach the method without throwing errors on null/undefined.
  // If thisArg is null or undefined, Object(thisArg) creates an empty object.
  // If thisArg is a primitive, Object(thisArg) creates the wrapper object (e.g., new String('foo')).
  const context =
    thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);

  // 2. Create a unique property key
  const uniqueKey = Symbol("uniqueKey");

  // 3. Attach the function to the context object
  context[uniqueKey] = this;

  let result: any;
  try {
    // 4. Invoke the function on the context object
    result = context[uniqueKey](...argArray);
  } finally {
    // 6. Remove the temporary property (even if an error occurs)
    delete context[uniqueKey];
  }

  // 7. Return the result
  return result;
};

describe("Function.prototype.myCall", () => {
  const person = {
    name: "John",
  };

  function getName(this: any) {
    return this.name;
  }

  function sum(...args: Array<number>) {
    return args.reduce((acc, num) => acc + num, 0);
  }

  test("Function.prototype.myCall is a function", () => {
    expect(typeof Function.prototype.myCall).toBe("function");
  });

  test("`this` is bound", () => {
    expect(getName.myCall(person)).toStrictEqual("John");
  });

  test("with a parameter", () => {
    expect(sum.myCall(null, 1)).toBe(1);
  });
});
