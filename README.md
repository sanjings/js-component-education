# 原生js实现组件化开发在线教育webapp

### 技术栈
- **[jquery](https://github.com/jquery/jquery):**  神一样的js库
- **[swiper](https://github.com/nolimits4web/swiper):** 著名轮播图插件 
- **[better-scroll](https://github.com/ustbhuangyi/better-scroll):**  著名移动端滚动插件

### 项目说明
- 使用webpack搭建项目工程化，相关配置在build文件夹中；  
- 使用ES6类的方式进行组件化开发； 
- 使用jquery，为了方便快速操作dom；  
- 使用ejs模板渲染；  
- 使用mockjs模拟数据，并拦截ajax；  
- 列表滚动使用huangyi大佬的[better-scroll](https://github.com/ustbhuangyi/better-scroll);  
- 使用swiper来实现轮播图；  
- 项目只为探索原生js组件化、模块化的开发方式，目前完成了列表，搜索，筛选，排序等功能，感兴趣的欢迎探讨和优化；  

### 安装依赖（如果没有yarn推荐使用cnpm）
```
npm install cnpm -g --registry=https://registry.npm.taobao.org
yarn install or cnpm install
```

### 本地运行
```
yarn dev or npm run dev
```
### 打包
```
yarn build or npm run build
```

### 最后
喜欢就赏个⭐吧，谢谢支持
