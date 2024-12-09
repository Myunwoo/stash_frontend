// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";


// export default [
//   {rules: {
//     'vue/multi-word-component-names': 'off',
//   }},
//   {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
//   {languageOptions: { globals: {...globals.browser, ...globals.node} }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   ...pluginVue.configs["flat/essential"],
//   {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
// ];

// eslint.config.js
export default {
  rules: {
    'vue/multi-word-component-names': 'off',
  },
};
