import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: ["_archive/", "src-tauri/", "out/"],
  },
];

export default config;
