import express, { Request, Response } from 'express';
import cluster from 'cluster';
import { setRoutes } from './routes/index';
import os from 'os';
import process from 'node:process';
import { FibonacciSeries } from '../math-logic/fibonacci-series';

const app = express();
const PORT = process.env.PORT || 3000;
const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`主进程正在运行，CPU数量: ${totalCPUs}`);
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        console.log(`工作进程 ${worker.process.pid} 已启动`);
    });
    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出，退出码: ${code}，信号: ${signal}`);
        console.log('重新启动工作进程');
        cluster.fork();
    });

} else {
    const app = express();
    app.get('/', (req: Request, res: Response) => {
        console.log(`工作进程 ${process.pid} 收到请求`);
        const fibonacciSeries = new FibonacciSeries();
        const fibonacciValue = fibonacciSeries.calculateFibonacciValue(req.query.number as unknown as number);
        res.send(`工作进程 ${process.pid} 的斐波那契数列值: ${fibonacciValue}`);
    });
    app.listen(PORT, () => {
        console.log(`正在运行，端口号: ${PORT}`);
    });
}
