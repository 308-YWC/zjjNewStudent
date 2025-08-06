const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api', require('./routes'));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: '服务器运行正常' });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ message: '页面未找到' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 服务器运行在端口 ${PORT}`);
  console.log(`🌐 本地访问: http://localhost:${PORT}`);
  console.log(`🌐 局域网访问: http://你的IP地址:${PORT}`);
  console.log(`💡 获取你的IP地址: ipconfig (Windows) 或 ifconfig (Mac/Linux)`);
});