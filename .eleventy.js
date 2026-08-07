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
    pathPrefix: "/CW6-notes/",
    passthroughFileCopy: true,
  };
};
