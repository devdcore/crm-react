module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "standard",
        "standard-react",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: {
    allowImportExportEverywhere: false,
    codeFrame: true,
        ecmaVersion: "latest",
        sourceType: "module",
    },
    settings: { react: { version: "18.2" } },
    plugins: ["react", "react-refresh"],
    parser: "babel-eslint",
    rules: {
        strict: 0,
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
}
