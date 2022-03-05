# simulation-reptile
模拟爬虫爬取网页内容

> 描述：模拟reptile爬取指定网页的html内容，并使用cheerio操作服务器端的dom，将读取到的html中具有title属性的a标签内容筛选出来，存储到指定文件中。  
> 该demo中爬取的url是搜狐首页https://www.sohu.com/?spm=smpc.news-home.top-subnav.1.16463510960254dHLuhg

### 所使用知识点：
1. 该demo主要巩固ts类型、类、private修饰符、interface（接口）知识点
2. nodejs中path、fs模块
3. cheerio：服务器端操作dom，非常轻量级，`const $ = cheerio.load('html标签内容，string类型')`。类似于jquery，但是jquery只能操作浏览器中的Dom，Bom

### 创建项目步骤：
1. `npm init --y`生成package.json配置文件
2. `tsc --init`生成tsconfig.json配置文件，如果本地没有ts的运行环境先`npm install typescript -g`，安装ts运行环境，才会执行tsc命令
3. 本地是否安装有`ts-node`插件，在node中不用编译成js的文件下执行ts文件。如果没有 `npm install ts-node -g`全局安装ts-node插件
4. 引入fs、path、axios、cheerio等模块的时候，可能提示错误，那是因为通常这些模块引入的是js文件，ts环境下会报错，这时候根据提示会安装转换成相应的ts文件即可。
5. 配置项目运行及打包命令：
```javascript
    "scripts": {
    "dev": "ts-node ./src/index.ts", // 运行
    "build": "tsc" // 打包
  }
```
5. typescript.json配置打包生成的js文件路径
```json
    "outDir": "./dist", 
```

### 运行该项目
1. clone该项目，npm install安装项目依赖
2. npm run dev运行该项目，每次运行将爬取指定URL下通过css选择器选择出来的`li a[title]`的text内容
3. 在该项目的`src/index.ts`文件下通过new Reptile(url)实例化传入指定爬取的url路径，改project默认爬取搜狐首页
```javascript
new Reptile('https://www.sohu.com/?spm=smpc.news-home.top-subnav.1.16463510960254dHLuhg')`
```

