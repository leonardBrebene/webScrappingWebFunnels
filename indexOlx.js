import { CookieJar, JSDOM as jsdom } from "jsdom";
import fs from "fs";
import request from 'request-promise';
import cheerio from 'cheerio'



const requestDef = request.defaults({ jar: CookieJar })
const cockieJar = requestDef.jar

const main = async (parameter) => {
    console.log(parameter)

    const clickFunnelsLink = "https://www.olx.ro/"
    const result = await requestDef.get(clickFunnelsLink)
    let $ =cheerio.load(result)

    const html= ".html"
    const fileName = "./extracted/" + new Date(Date.now() + 2 * 3600 * 1000).toISOString().replace(':', '-').replace(':', '-').slice(0, 19)
    console.log("fileName: "+ fileName)
    
    // const fileNameHtml = fileName + html
    // fs.writeFileSync(fileNameHtml, result)

    const dom = new jsdom(result)
    const document = dom.window.document
    // const fileNameJsonDom = fileName + "jsdom" + html
    // fs.writeFileSync(fileNameJsonDom , document.body.innerHTML)
    


    const contulTau = document.querySelector("div[color='white'] a")
    console.log( contulTau.getAttribute("href"))


    console.log("cockieJar.get:"+ cockieJar.get)

    
}

main("Function was called");