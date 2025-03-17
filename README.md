# 交互式太阳系模型

[![EN Doc](https://img.shields.io/badge/Document-English-blue)](README_EN.md)

一个基于Three.js的3D交互式太阳系模型，提供沉浸式的太阳系探索体验。

## 功能特点

- 🌟 精确的行星运动模拟
  - 包含太阳系八大行星
  - 真实的公转和自转动画
  - 按比例缩放的行星大小和轨道距离

- 🎮 丰富的交互控制
  - 鼠标左键拖动：旋转视角
  - 鼠标滚轮：缩放视图
  - 鼠标右键拖动：平移视角
  - 点击行星查看详细信息

- 🎨 逼真的视觉效果
  - 星空背景
  - 行星轨道可视化
  - 土星环系统
  - 流畅的动画效果

## 技术栈

- Three.js - 3D图形渲染
- HTML5 & CSS3 - 页面布局和样式
- JavaScript - 交互逻辑和动画控制

## 快速开始

1. 使用本地服务器运行项目

推荐使用 Visual Studio Code 的 Live Server 插件或其他HTTP服务器运行项目。

2. 在浏览器中访问
```
http://localhost:端口号
```

## 项目结构

```
├── index.html          # 主页面
├── js/                 # JavaScript文件
│   ├── main.js        # 主要逻辑
│   └── animate.js     # 动画相关
└── README.md          # 项目文档
```

## 贡献指南

欢迎提交Issue和Pull Request来帮助改进项目。

1. Fork 项目
2. 创建新的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 致谢

- [Three.js](https://threejs.org/) - JavaScript 3D库