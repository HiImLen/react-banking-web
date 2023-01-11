module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
	"parser": "@babel/eslint-parser",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    },
    "settings":{
        "react":{
            "version": "detect"
        }
    }
}
