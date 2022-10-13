'use strict';

const fs = require('fs');
const once = require('node:events').once;
const csv = require('@fast-csv/parse');
const JsonStreamStringify = require('json-stream-stringify');

const Executor = require('@runnerty/module-core').Executor;

class csv2jsonExecutor extends Executor {
  constructor(process) {
    super(process);
    this.endOptions = { end: 'end' };
  }

  async exec(params) {
    const jsonResult = [];
    try {
      if (!params.inputPath) throw new Error('Missing inputPath (csv2json).');
      await fs.promises.access(params.inputPath, fs.constants.R_OK);
      const streamCSV = fs.createReadStream(params.inputPath);
      if (!params.options) params.options = {};
      if (params.options?.headers) {
        if (params.options.headers instanceof Array) {
          params.options.headers = params.options.headers.map(item => {
            return item == null ? undefined : item;
          });
        }
      } else {
        // Headers options default: true.
        if (params.options.headers === undefined) params.options.headers = true;
      }

      csv
        .parseStream(streamCSV, params.options || {})
        .on('error', error => {
          throw error;
        })
        .on('data', row => {
          jsonResult.push(row);
        })
        .on('end', async rowCount => {
          // JSON Export
          if (params.outputPath) {
            const streamJSON = fs.createWriteStream(params.outputPath);
            const jsonStream = new JsonStreamStringify(jsonResult).pipe(streamJSON);
            await once(jsonStream, 'close');
          }
          //STANDARD OUPUT:
          this.endOptions.data_output = jsonResult || '';
          //EXTRA DATA OUTPUT:
          this.endOptions.extra_output = {};
          this.endOptions.extra_output.rowcount = rowCount;
          this.end(this.endOptions);
        });
    } catch (err) {
      this.endOptions.end = 'error';
      this.endOptions.messageLog = err.message;
      this.endOptions.err_output = err.message;
      this.end(this.endOptions);
    }
  }
}

module.exports = csv2jsonExecutor;
