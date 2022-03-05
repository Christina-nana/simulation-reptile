import axios from 'axios'
import cheerio from 'cheerio'
import path from 'path'
import fs from 'fs'

interface TitleData {
    title:string
}
interface JsonInfo {
    time:number;
    data:TitleData[]
}
interface Content{
    [propName:number]:TitleData[]
}

class Reptile{
    // 请求抓取的url
    private url :string ; 
    // 指定目录路径
    private filePath = path.resolve(__dirname,'../data/data.json'); // path.resolve从右往左获取绝对路径， __dirname当前文件所在路径

    constructor(url:string){
        this.url = url
        this.init()
    }

    // 初始化：运行所有项目的方法
     init(){
        this.getHtml()
    }

    // 请求url获取到的页面中html内容
     getHtml(){
        let result:string=''
        axios(this.url).then(async (response)=>{
            result =  response.data
            this.getJsonInfo(result)
        })
    }

    // 获取到a所有标签的title，使用cheerio服务器端操作dom
    getJsonInfo(val:string){
        const $ = cheerio.load(val)
        const list = $('li a[title]')
        let titleList: TitleData[] = [];
        list.map((index,ele)=>{
            let item = $(ele).text().trim()
            titleList.push({
                title:item
            })
        })
        let jsonInfo:JsonInfo =  {
            time : new Date().getTime(),
            data:titleList
        }  
        // console.log(jsonInfo);
        // return  jsonInfo 
        this.saveFile(jsonInfo)
    }

    // 存入到目录（判断当前目录有没有？）
    saveFile(data:JsonInfo){
        let fileContnet:Content = {}
        // 判断路径中是否有该文件，有该文件，将内容读取出来，在之前的文件之后继续增加 fs.existsSync(this.filePath)返回true｜false
        if(fs.existsSync(this.filePath)){
           fileContnet =  JSON.parse(fs.readFileSync(this.filePath,'utf-8')) // fs.readFileSync(path,code码)文件读取操作
            // console.log('fileContnet=',fileContnet);
        }   
        // 重构了一下数据
         fileContnet[data.time] = data.data
         this.writeFile(fileContnet)
    }

    // 向指定目录写入内容
    writeFile(data:Content){
        fs.writeFileSync(this.filePath,JSON.stringify(data)) // fs.writeFileSync(path，string)文件写入操作
    }
}

new Reptile('https://www.sohu.com/?spm=smpc.news-home.top-subnav.1.16463510960254dHLuhg') // 搜狐首页