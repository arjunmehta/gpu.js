const GPU = require('../src/index.js');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;


const gpuRunner = new GPU({ mode: 'webgl' });
const cpuRunner = new GPU({ mode: 'cpu' });

const size = 4096*3;


// SIMPLE

const myGPUFunc = gpuRunner
  .createKernel(function compute() {
    const i = this.thread.x;
    const j = this.thread.y;
    return i + j;
  })
  .setOutputToTexture(true)
  .setOutput([size, size]);


const myCPUFunc = cpuRunner
  .createKernel(function compute() {
    const i = this.thread.x;
    const j = this.thread.y;
    return i + j;
  })
  .setOutput([size, size]);


// add tests
suite
  .add('gpu', function() {
    myGPUFunc();
  })
  .add('cpu', function() {
    myCPUFunc();
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': false });
