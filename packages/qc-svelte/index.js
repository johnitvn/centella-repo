/**
 * @type {import("eslint").Linter.Config}
 */
const eslint = {
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
};
module.exports = eslint;
