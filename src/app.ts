import express from 'express';
import { setRoutes } from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

// 设置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置路由
setRoutes(app);

app.listen(PORT, () => {
    console.log(`服务器正在运行，端口号: ${PORT}`);
});