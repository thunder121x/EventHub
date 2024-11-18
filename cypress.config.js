const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Adjust based on your app
    viewportWidth: 1600, // Set the width
    viewportHeight: 900, // Set the height
  },
});
