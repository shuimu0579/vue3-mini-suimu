# TS和Jest的集成

## TS的集成

```shell
npm init
yarn add typescript --dev
npx tsc --init
```

## Jest的集成

```shell
yarn add jest @types/jest --dev
```

## Jest里面继承Babel

```shell
# 配置babel( https://jestjs.io/docs/getting-started ):用于将esm规范的import转换为 commonjs的require
yarn add --dev babel-jest @babel/core @babel/preset-env
# 然后在根目录下创建babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};

# Using TypeScript via Babel
yarn add --dev @babel/preset-typescript
# 然后在根目录下创建babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```
