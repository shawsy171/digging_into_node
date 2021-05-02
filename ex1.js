#! /usr/bin/env node

"use strict";
const path = require("path");
const fs = require("fs");
const args = require('minimist')(process.argv.slice(2), {
  boolean: ['help'],
  string: ['file']
});
// printHelp();

// POSIX
// process.stdout.write("Hello world\n");
// console.log("Hello world");
const readable = process.stdin;

// readable.on('readable', () => {
//   let chunk;
//   console.log('Stream is readable (new data received in buffer)');
//   // Use a loop to make sure we read all currently available data
//   while (null !== (chunk = readable.read())) {
//     console.log(`Read ${chunk.length} bytes of data...`);
//   }
// });

// // 'end' will be triggered once when there is no more data available
// readable.on('end', () => {
//   console.log('Reached end of stream.');
// });

function printHelp() {
  console.log("ex1 usage:");
  console.log("ex1 --help");
  console.log("");
  console.log("--help                               printHelp");
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
  const filename = path.resolve(args.file)
  // if (fs.existsSync(filename)) {
    processAsyncFile(filename);
  //   return;
  // }
  return console.log('no file at this path: ' + filename);
  
  // console.log(__dirname)
} else {
  error("Incorrect usage");
}

