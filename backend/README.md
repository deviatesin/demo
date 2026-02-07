# 后端服务说明

## 项目结构

```
backend/
├── config/            # 配置文件
│   └── database.js    # 数据库连接配置
├── models/            # 数据模型
│   └── index.js       # 模型定义
├── routes/            # 路由
│   └── students.js    # 学生相关路由
├── app.js             # 主应用文件
├── database.sql       # 数据库初始化脚本
├── package.json       # 项目依赖
└── README.md          # 说明文档
```

## 安装依赖

```bash
npm install
```

## 数据库配置

1. 修改 `config/database.js` 文件中的数据库连接参数：

```javascript
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',      // 数据库主机
  port: 3306,             // 数据库端口
  username: 'root',       // 数据库用户名
  password: 'password',   // 数据库密码
  database: 'tcm_exam_system',  // 数据库名称
  // ...
});
```

2. 执行数据库初始化脚本：

```bash
# 使用MySQL命令行工具执行
source database.sql
```

## 启动服务

```bash
# 启动服务
npm start

# 开发模式启动（自动重启）
npm run dev
```

服务将运行在 `http://localhost:3000`

## API接口

### 1. 根据学号查询学生姓名

**请求方式：** GET
**请求路径：** `/api/students/name`
**请求参数：**
- `studentId`：学生学号（必填）

**响应格式：** JSON

**示例请求：**
```
GET http://localhost:3000/api/students/name?studentId=2021001
```

**示例响应：**
```json
{
  "studentId": "2021001",
  "name": "张三"
}
```

### 2. 健康检查

**请求方式：** GET
**请求路径：** `/health`

**响应格式：** JSON

**示例响应：**
```json
{
  "status": "ok"
}
```

## 数据库结构

后端服务使用MySQL数据库，包含以下表：

1. **students**：学生信息表
2. **questions**：题目表
3. **exam_sessions**：考试会话表
4. **exam_records**：考试记录表

详细结构见 `database.sql` 文件。