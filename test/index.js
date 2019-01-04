const { expect } = require('chai');

const GPU = require('../src/index.js');


describe('Test Node GPU', () => {
  it('should find gpu', () => {
    const gpu = new GPU({ mode: 'webgl' });

    const myFunc = gpu.createKernel(function compute() {
      const i = this.thread.x;
      const j = 0.89;
      return i + j;
    }).setOutput([512, 512]);

    myFunc()

    expect(typeof GPU).to.equal('function');
    expect(typeof gpu).to.equal('object');
  });

  it('should find gpu', () => {
    const gpu2 = new GPU({ mode: 'webgl' });

    console.time('Kernel init')

    const matMult = gpu2.createKernel(function(a, b) {
      var sum = 0;
      for (var i = 0; i < 2048; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
      }
      return sum;
    }).setOutput([2048, 2048]);
    console.timeEnd('Kernel init')

    function fillArrayRandom(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = Math.random();
      }
      return array;
    }

    function splitArray(array, part) {
      var result = [];
      for (var i = 0; i < array.length; i += part) {
        result.push(array.slice(i, i + part));
      }
      return result;
    }
    // Perform matrix multiplication on 2 matrices of size 2048 x 2048

    var matrixSize = 2048;
    var allowChangeOutput = true;
    var a = new Array(matrixSize * matrixSize);
    var b = new Array(matrixSize * matrixSize);
    a = splitArray(fillArrayRandom(a), matrixSize);
    b = splitArray(fillArrayRandom(b), matrixSize);

    for (let i = 1; i <= 5; i++) {

      console.log(`sequence ${i}`)
      console.time('gpu calc')
      const c = matMult(a, b)
      console.timeEnd('gpu calc')
    }

    expect(typeof GPU).to.equal('function');
    expect(typeof gpu2).to.equal('object');
  });
});
