# anki-importer-pro

This is a text import plugin with functionality similar to Anki's built-in import feature, but with the following new capabilities:

- Supports direct text input, eliminating the need to save temporary snippets as CSV files before importing
- Enables custom field content, such as special HTML tags, free formatting, and adding prefixes/suffixes
- Supports context insertion, e.g., for poetry types, displaying preceding/following lines, line numbers, etc.

---

这是一个文本导入插件，功能和 Anki 本身的导入类似，但有一些新功能如下：

- 支持输入文本，避免一些临时小片段还要先保存个csv文件才能导入
- 支持自定义字段内容，比如用一些特殊 html tags、自由排版、加点前缀后缀等等
- 支持插入上下文，比如诗歌类型，同时显示上一句/下一句，甚至行号等等

# Quasar App (anki-importer-pro)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## anki plugin

```bash
ln -s $PWD/anki_plugin/ ~/.local/share/Anki2/addons21/importer_pro
```

```bash
DEBUG=1 anki -p manong --debug
```

```bash
cd anki_plugin
zip -r ../imporrt_pro.ankiaddon ./* -x ".*"
```
