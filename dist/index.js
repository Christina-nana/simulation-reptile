"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Reptile {
    constructor() {
        // 请求抓取的url
        this.url = 'https://www.sohu.com/?spm=smpc.news-home.top-subnav.1.16463510960254dHLuhg'; // 搜狐首页
        // 指定目录路径
        this.filePath = path_1.default.resolve(__dirname, '../data/data.json'); // path.resolve从右往左获取绝对路径， __dirname当前文件所在路径
        this.init();
    }
    // 初始化：运行所有项目的方法
    init() {
        this.getHtml();
    }
    // 请求url获取到的页面中html内容
    getHtml() {
        let result = '';
        (0, axios_1.default)(this.url).then((response) => __awaiter(this, void 0, void 0, function* () {
            result = response.data;
            this.getJsonInfo(result);
        }));
    }
    // 获取到a所有标签的title，使用cheerio服务器端操作dom
    getJsonInfo(val) {
        const $ = cheerio_1.default.load(val);
        const list = $('li a[title]');
        let titleList = [];
        list.map((index, ele) => {
            let item = $(ele).text().trim();
            titleList.push({
                title: item
            });
        });
        let jsonInfo = {
            time: new Date().getTime(),
            data: titleList
        };
        // console.log(jsonInfo);
        // return  jsonInfo 
        this.saveFile(jsonInfo);
    }
    // 存入到目录（判断当前目录有没有？）
    saveFile(data) {
        let fileContnet = {};
        // 判断路径中是否有该文件，有该文件，将内容读取出来，在之前的文件之后继续增加 fs.existsSync(this.filePath)返回true｜false
        if (fs_1.default.existsSync(this.filePath)) {
            fileContnet = JSON.parse(fs_1.default.readFileSync(this.filePath, 'utf-8')); // fs.readFileSync(path,code码)文件读取操作
            // console.log('fileContnet=',fileContnet);
        }
        // 重构了一下数据
        fileContnet[data.time] = data.data;
        this.writeFile(fileContnet);
    }
    // 向指定目录写入内容
    writeFile(data) {
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(data)); // fs.writeFileSync(path，string)文件写入操作
    }
}
new Reptile();
