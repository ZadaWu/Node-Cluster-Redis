const { FibonacciSeries } = require('../math-logic/fibonacci-series');
const fabObj = new FibonacciSeries();

process.on('message', (message) => {
    console.log('worker2 is receiving the number', message);
    const fibonacciValue = fabObj.calculateFibonacciValue(parseInt(message.number));
    console.log(`Fibonacci-series  - PID is ${process.pid} 计算斐波那契数列值: ${fibonacciValue}`);
    process.send({ fibonacciValue });
});
