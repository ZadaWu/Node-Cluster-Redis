# My Express App

这是一个使用 Express 和 TypeScript 构建的简单应用程序。

## 项目结构

```
my-express-app
├── src
│   ├── app.ts               # 应用程序的入口点
│   ├── controllers          # 控制器目录
│   │   └── index.ts         # 导出 IndexController 类
│   ├── routes               # 路由目录
│   │   └── index.ts         # 设置应用程序的路由
│   └── types                # 类型定义目录
│       └── index.ts         # 扩展 express 接口的类型
├── package.json             # npm 配置文件
├── tsconfig.json            # TypeScript 配置文件
└── README.md                # 项目文档
```

## 安装依赖

在项目根目录下运行以下命令以安装依赖：

```
npm install
```

## 启动应用

使用以下命令启动应用程序：

```
npm start
```

## 贡献

欢迎任何形式的贡献！请提交问题或拉取请求。