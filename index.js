import { CookieJar, JSDOM as jsdom } from "jsdom";
import fs from "fs";
import request from 'request-promise';


const requestDef = request.defaults({ jar: CookieJar })
const cockieJar = requestDef.jar

const main = async (parameter) => {
    console.log(parameter)

    const clickFunnelsLink = "https://app.clickfunnels.com/users/sign_in"
    const result = await requestDef.get(clickFunnelsLink)

    const html= ".html"
    const fileName = "./extracted/" + new Date(Date.now() + 2 * 3600 * 1000).toISOString().replace(':', '-').replace(':', '-').slice(0, 19)
    console.log("fileName: "+ fileName)
    const fileNameHtml = fileName + html
    fs.writeFileSync(fileNameHtml, result)

    const dom = new jsdom(result)
    const document = dom.window.document
    const fileNameJsonDom = fileName + "jsdom" + html
    fs.writeFileSync(fileNameJsonDom , document.body.innerHTML)
    
    console.log(cockieJar.get)


    
}

main("Function was called");