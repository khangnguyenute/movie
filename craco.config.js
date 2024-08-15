require("react-scripts/config/env");

const path = require("path");
const fs = require("fs");

module.exports = {
  devServer: {
    port: 3000,
    host: "localhost",
  },
  webpack: {
    alias: {
      "@constants": path.resolve(__dirname, "src/app/Constants"),
      "@services": path.resolve(__dirname, "src/app/Services"),
      "@slices": path.resolve(__dirname, "src/app/Slices"),
      "@enums": path.resolve(__dirname, "src/app/Enums"),
      "@selectors": path.resolve(__dirname, "src/app/Selectors"),
      "@interfaces": path.resolve(__dirname, "src/app/Types"),
      "@app": path.resolve(__dirname, "src/app"),
      "@components": path.resolve(__dirname, "src/common/Components"),
      "@hooks": path.resolve(__dirname, "src/common/Hooks"),
      "@utils": path.resolve(__dirname, "src/common/Utils"),
      "@common": path.resolve(__dirname, "src/common"),
      "@auth": path.resolve(__dirname, "src/features/Auth"),
    },
  },
};
