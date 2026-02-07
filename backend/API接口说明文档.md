# API接口说明文档

## 1. 接口概览

### 1.1 接口名称
根据学生学号查询学生姓名

### 1.2 接口功能
通过学生学号查询学生的姓名信息，返回JSON格式的响应数据。

### 1.3 接口地址
`http://localhost:3000/api/students/name`

## 2. 请求参数

### 2.1 请求方式
GET

### 2.2 查询参数
| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| studentId | String | 是 | 学生学号，长度不超过20个字符 |

### 2.3 请求示例
```
GET http://localhost:3000/api/students/name?studentId=2021001
```

## 3. 响应数据

### 3.1 响应格式
JSON

### 3.2 成功响应
| 字段名 | 类型 | 描述 |
|-------|------|------|
| studentId | String | 学生学号 |
| name | String | 学生姓名 |

#### 成功响应示例
```json
{
  "studentId": "2021001",
  "name": "张三"
}
```

### 3.3 失败响应
| 字段名 | 类型 | 描述 |
|-------|------|------|
| error | String | 错误信息 |

#### 失败响应示例

**缺少学生学号**
```json
{
  "error": "请提供学生学号"
}
```

**未找到该学生**
```json
{
  "error": "未找到该学生"
}
```

**服务器内部错误**
```json
{
  "error": "服务器内部错误"
}
```

## 4. 错误码说明

| 状态码 | 错误信息 | 说明 |
|-------|---------|------|
| 400 | 请提供学生学号 | 请求缺少必要的学生学号参数 |
| 404 | 未找到该学生 | 根据提供的学号未查询到对应的学生信息 |
| 500 | 服务器内部错误 | 服务器处理请求时发生内部错误 |

## 5. 接口调用示例

### 5.1 使用curl调用
```bash
curl "http://localhost:3000/api/students/name?studentId=2021001"
```

### 5.2 使用JavaScript调用
```javascript
fetch('http://localhost:3000/api/students/name?studentId=2021001')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### 5.3 在小程序中调用
```javascript
wx.request({
  url: 'http://localhost:3000/api/students/name',
  method: 'GET',
  data: {
    studentId: '2021001'
  },
  success: function(res) {
    console.log(res.data);
  },
  fail: function(error) {
    console.error(error);
  }
});
```

## 6. 注意事项

1. **参数验证**：接口会验证学生学号是否为空，为空时返回400错误
2. **数据查询**：接口会根据学生学号在数据库中查询学生信息，未找到时返回404错误
3. **错误处理**：接口会捕获并处理服务器内部错误，确保返回友好的错误信息
4. **响应格式**：接口始终返回JSON格式的响应数据，便于前端处理
5. **性能优化**：接口使用数据库索引，确保查询性能

## 7. 相关数据表

### 7.1 students表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| studentId | STRING(20) | 主键，非空，唯一 | 学号 |
| name | STRING(50) | 非空 | 学生姓名 |
| createdAt | DATE | 默认当前时间 | 创建时间 |
| updatedAt | DATE | 默认当前时间，更新时自动更新 | 更新时间 |