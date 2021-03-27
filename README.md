<p align="center">
  <a href="http://runnerty.io">
    <img height="257" src="https://runnerty.io/assets/header/logo-stroked.png">
  </a>
  <p align="center">Smart Processes Management</p>
</p>

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency Status][david-badge]][david-badge-url]
<a href="#badge">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>

# Executor for [Runnerty]: CSV2JSON

### Installation:

Through NPM

```bash
npm i @runnerty/executor-csv2json
```

You can also add modules to your project with [runnerty-cli]

```bash
npx runnerty-cli add @runnerty/executor-csv2json
```

This command installs the module in your project, adds example configuration in your `config.json` and creates an example plan of use.

If you have installed [runnerty-cli] globally you can include the module with this command:

```bash
rty add @runnerty/executor-csv2json
```

### Configuration sample:

Add in [config.json]:

```json
{
  "id": "csv2json_default",
  "type": "@runnerty-executor-csv2json"
}
```

### Plan sample:

Add in [plan.json]:

#### Example 1:

```json
{
  "id": "csv2json_default",
  "inputPath": "test.csv",
  "outputPath": "test.json",
  "options": {
    "headers": true,
    "delimiter": ";",
    "escape": "\""
  }
}
```

#### Example 2:

```json
{
  "id": "csv2json_default",
  "inputPath": "test.csv",
  "options": {
    "headers": ["id_renamed", null, "email"],
    "renameHeaders": true,
    "discardUnmappedColumns": true,
    "delimiter": "|"
  }
}
```

### Params

#### Options

| Option                 | Description                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| delimiter              | The delimiter that will separate columns. Default: ','                                                                                     |
| quote                  | The character to use to quote fields that contain a delimiter. Default: '"'                                                                |
| escape                 | The character to used tp escape quotes inside of a quoted field. Default: '"'                                                              |
| headers                | If set to true the first row will be treated as the headers. If you want to manually specify the headers set to a string[]. Default: true  |
| renameHeaders          | If you want the first line of the file to be removed and replaced by the one provided in the headers option. Default: false                |
| ignoreEmpty            | Set to true to ignore empty rows. Default: false                                                                                           |
| comment                | If your CSV contains comments you can use this option to ignore lines that begin with the specified character. Default: null               |
| discardUnmappedColumns | If you want to discard columns that do not map to a header. Default: false                                                                 |
| strictColumnHandling   | If you want to consider empty lines/lines with too few fields as invalid and emit a data-invalid event. Default: false                     |
| trim                   | Set to true to trim all white space from columns. Default: false                                                                           |
| rtrim                  | Set to true to right trim all columns. Default: false                                                                                      |
| ltrim                  | Set to true to left trim all columns. Default: false                                                                                       |
| encoding               | Passed to StringDecoder when decoding incoming buffers. Change if incoming content is not 'utf8' encoded. Default: 'utf8'                  |
| maxRows                | If number is > 0 then only the specified number of rows will be parsed. Default: 0                                                         |
| skipRows               | If number is > 0 then the specified number of parsed rows will be skipped. Default: 0                                                      |
| skipLines              | If number is > 0 the specified number of lines will be skipped. Default: 0                                                                 |

### Output (Process values):

- `PROCESS_EXEC_MSG_OUTPUT`: Output message.
- `PROCESS_EXEC_ERR_OUTPUT`: Error output message.
#### Data output
- `PROCESS_EXEC_DATA_OUTPUT`: JSON output data.
- `PROCESS_EXEC_DB_ROWCOUNT`: MySQL query count rows.
### More information:

This executor uses the fast-csv module, for more information consult the website of the [csv2json].

[runnerty]: http://www.runnerty.io
[downloads-image]: https://img.shields.io/npm/dm/@runnerty/executor-csv2json.svg
[npm-url]: https://www.npmjs.com/package/@runnerty/executor-csv2json
[npm-image]: https://img.shields.io/npm/v/@runnerty/executor-csv2json.svg
[david-badge]: https://david-dm.org/runnerty/executor-csv2json.svg
[david-badge-url]: https://david-dm.org/runnerty/executor-csv2json
[config.json]: http://docs.runnerty.io/config/
[plan.json]: http://docs.runnerty.io/plan/
[runnerty-cli]: https://www.npmjs.com/package/runnerty-cli
[csv2json]: https://github.com/C2FO/fast-csv
