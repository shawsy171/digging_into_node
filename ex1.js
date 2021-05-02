#! /usr/bin/env node

"use strict";
const util =  require("util");
const path = require("path");
const fs = require("fs");
const getStdin = require("get-stdin");

const args = require('minimist')(process.argv.slice(2), {
  boolean: ['help', 'in'],
  string: ['file']
});

// environment variables
const BASE_PATH = path.resolve(
  process.env.BASE_PATH || __dirname
)

function printHelp() {
  console.log("ex1 usage:");
  console.log("ex1 --help");
  console.log("");
  console.log("--help                                                           print Help");
  console.log("[BASE_PATH=<optional_path>] --file=<FILENAME>                    print file to console");
  console.log("--in                                                             print stdin to shell");
  console.log("");
}

function error(msg, includeHelp = false) {
  console.error(msg)
  if(includeHelp) {
    console.log("");
    printHelp();
  }
}

function processFile (filename) {
  const content = fs.readFileSync(filename) // content is a buffer, which can be seen by using console.log

  process.stdout.write(content);
}

function processAsyncFile (filename) {
  fs.readFile(filename, (err, contents) => {
    if (err) return error(err);
    const UppercaseContents = contents.toString().toUpperCase();
    process.stdout.write(UppercaseContents);
  }) // content is a buffer, which can be seen by using console.log  
}

if (args.help) {
  printHelp();
} else if (args.file) {
  const filename = path.join(BASE_PATH, args.file);
  // if (fs.existsSync(filename)) {
    processAsyncFile(filename);
  //   return;
  // }
  return console.log('no file at this path: ' + filename);
  
  // console.log(__dirname)
} else if (args.in) {
  getStdin()
    .then((data) => {
      process.stdout.write(data)
    })
    .catch(error)
} else {
  error("Incorrect usage");
}

