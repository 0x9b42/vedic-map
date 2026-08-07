module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  // eleventyConfig.addPassthroughCopy("src/assets/images");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },

    templateFormats: ["njk", "md", "html"],

    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    jsDataFileEngine: true,

    passthroughFileCopy: true,

    watchIgnores: ["**/node_modules/**", "_site/**", ".git/**"],
  };
};
