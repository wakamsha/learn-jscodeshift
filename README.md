# learn-jscodeshift

## Prerequisites

|  Module | Ver.                     |
| ------: | ------------------------ |
| Node.js | `./.node-version` を参照 |
|    yarn | `./package.json` を参照  |

### Node.js

本リポジトリで利用可能な Node.js のバージョンは `./.node-version` ファイルにて管理しているため、開発者にはこのファイルをサポートしている Node.js バージョン管理ツールの利用を推奨します。以下は推奨するバージョン管理ツールの例です。

- [nodenv](https://github.com/nodenv/nodenv)
- [n](https://github.com/tj/n)
- [asdf](https://github.com/asdf-vm/asdf)
- [NVS](https://github.com/jasongin/nvs)
- [fnm](https://github.com/Schniz/fnm)

### yarn

本リポジトリではパッケージマネージャーに yarn を使用します。corepack コマンドを実行して yarn を有効化します。

```bash
corepack enable
```

## Install dependencies

```bash
yarn install
```

## Run

```bash
yarn jscodeshift --transform ./transforms/replace-range.ts ./src/**/*.tsx --parser tsx
```