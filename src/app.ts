import express, { Request, Response } from 'express';
import cluster from 'cluster';
import os from 'os';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`主进程正在运行，CPU数量: ${totalCPUs}`);

    const worker1 = require("child_process").fork(path.join(__dirname, "workers/fab-series-worker1.js"));
    const worker2 = require("child_process").fork(path.join(__dirname, "workers/fab-series-worker2.js"));

    console.log(`工作进程1 PID: ${worker1.pid}`);
    console.log(`工作进程2 PID: ${worker2.pid}`);

    worker1.on('message', (message: any) => {
        console.log(`工作进程1的Fibonacci数: ${JSON.stringify(message)}`);
    });
    worker2.on('message', (message: any) => {
        console.log(`工作进程2的Fibonacci数: ${JSON.stringify(message)}`);
    });

    cluster.on("online", (worker) => {
        console.log(`工作进程 ${worker.process.pid} 已启动`);
        worker.on('message', (num: number) => {
            if (num % 2 === 0) {
                console.log('worker1 is sending the number', num);
                worker1.send({ number: num });
            } else {
                console.log('worker2 is sending the number', num);
                worker2.send({ number: num });
            }
        });
    });

    for (let i = 0; i < totalCPUs - 2; i++) {
        const worker = cluster.fork();
        console.log(`工作进程已启动，PID: ${worker.process.pid}`);
    }
    
    console.log(`总工作进程数: ${totalCPUs}`);

} else {
    app.get('/', (req: Request, res: Response) => {
        const number = parseInt(req.query.number as string);
        
        if (process.send) {
            process.send(number);
        }
        
        console.log(`进程 ${process.pid} 收到请求`);
        res.send("<h3>请求已成功接收！计算完成后我们会通过邮件通知您！</h3>");
    });

    app.listen(PORT, () => {
        console.log(`服务器运行在端口: ${PORT}`);
    });
}
