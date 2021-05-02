#! /usr/bin/env node

const getStdin = require("get-stdin");

getStdin()
  .then((data) => {console.log(data)})
  .catch((err) => {console.log(err)})


// POSIX
// process.stdout.write("Hello world\n");
// console.log("Hello world");
// const readable = process.stdin;

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