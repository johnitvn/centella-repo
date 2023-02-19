import { expect } from '@jest/globals';
import { classMerge } from './utils';

describe("classMerge", () => {
  test("with string input", () => {
    const case1 = classMerge("test");
    expect(case1).toBe("test");
  });

  test("with array string input", () => {
    const case2 = classMerge(["test"]);
    expect(case2).toBe("test");
  });

  test("with mixed string and array string input", () => {
    const case3 = classMerge("test", ["love"]);
    expect(case3).toBe("test love");
  });

  test("remove wasted space beetween", () => {
    const case4 = classMerge("test", [" love "], ["love2 ", "    solo     "], " solo2");
    expect(case4).toBe("test love love2 solo solo2");
  });

  test("remove undefined", () => {
    const case5 = classMerge(["test"], undefined, "love", ["love2", "love3", undefined]);
    expect(case5).toBe("test love love2 love3");
  });

  test("remove duplicate", () => {
    const case6 = classMerge(["test"], undefined, "love", [undefined, "love   "], "love2      ");
    expect(case6).toBe("test love love2");
  });


  test("remove duplicate", () => {
    const case6 = classMerge(["test"], undefined, "love", [undefined, "love   "], "love2      ");
    expect(case6).toBe("test love love2");
  });
});

