#! /usr/bin/env node

"use strict";
const util =  require("util");
const path = require("path");
const fs = require("fs");
const Transform = require("stream").Transform
const zlib = require("zlib");

const args = require('minimist')(process.argv.slice(2), {
  boolean: ['help', 'in', 'out', 'compress', 'un-compress'],
  string: ['file']
});

// environment variables
const BASE_PATH = path.resolve(
  process.env.BASE_PATH || __dirname
)
let OUTPUT_PATH = path.join(BASE_PATH, "out.txt");

function printHelp() {
  console.log("ex2 usage:");
  console.log("ex2 --help");
  console.log("");
  console.log("--help                                                           print Help");
  console.log("[BASE_PATH={{optional_path}}] --file={{FILENAME}}                print file to out.txt");
  console.log("--in                                                             print stdin to shell");
  console.log("--out                                                            print to shell");
  console.log("--compress                                                       gzip the output");
  console.log("--un-compress                                                    un-compress the gzip input");
  console.log("");
}

function error(msg, includeHelp = false) {
  console.error(msg)
  if(includeHelp) {
    console.log("");
    printHelp();
  }
}

function processFile (inStream) {
  let outStream = inStream;

  // un-compress gzipped input
  if (args['un-compress']) {
    let unCompressStream = zlib.createGunzip(outStream);
    outStream = outStream.pipe(unCompressStream)
  }

  // To uppercase
  const upperStream = new Transform({
    transform (chunk, encoding, endOfChunkCallback) {
      // transform works a little like working with a array
      this.push(chunk.toString().toUpperCase());
      endOfChunkCallback();
    }
  });

  outStream = outStream.pipe(upperStream);

  // gzip
  if (args.compress) {
    const gzipStream = zlib.createGzip();
    outStream = outStream.pipe(gzipStream);
    OUTPUT_PATH = `${OUTPUT_PATH}.gz`;
  }

  // output to shell or to a file
  let targetStream;
  if (args.out) {
    // to shell
    targetStream = process.stdout;
  } else {
    // to file
    targetStream = fs.createWriteStream(OUTPUT_PATH);
  }

  outStream.pipe(targetStream);
}

/****************************************************************
 * Main
 ***************************************************************/

if (args.help) {
  printHelp();
} else if (args.file) {
  const filename = path.join(BASE_PATH, args.file);
  let stream = fs.createReadStream(filename);
  processFile(stream);

} else if (args.in || args._.includes("-")) {
  processFile(process.stdin)

} else {
  error("Incorrect usage");
}

