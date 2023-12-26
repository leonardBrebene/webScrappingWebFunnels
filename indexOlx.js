import { CookieJar, JSDOM as jsdom } from "jsdom";
import fs from "fs";
import request from 'request-promise';
import cheerio from 'cheerio'
import getNextNavigationPage from "./getNextNavigationPage.js";
import getLoadedPage from "./getLoadedPage.js";
import getPathWithDate from "./getPathWithDate.js";
import setElementValueOnPage from "./setElementValueOnPage.js";



const requestDef = request.defaults({ jar: CookieJar })
const cockieJar = requestDef.jar

// const main = async (parameter) => {
//     console.log(parameter)

//     const clickFunnelsLink = "https://www.olx.ro/"
//     const result = await requestDef.get(clickFunnelsLink)
//     let $ =cheerio.load(result)

//     const html= ".html"
//     const fileName = "./extracted/" + new Date(Date.now() + 2 * 3600 * 1000).toISOString().replace(':', '-').replace(':', '-').slice(0, 19)
//     console.log("fileName: "+ fileName)


//     const dom = new jsdom(result)
//     const document = dom.window.document
//     const window=dom.window
//     // const fileNameJsonDom = fileName + "jsdom" + html
//     // fs.writeFileSync(fileNameJsonDom , document.body.innerHTML)
   
//     window.location.replace()

//     const contulTau = document.querySelector("div[color='white'] a")
//     console.log( contulTau.getAttribute("href"))
//     console.log("cockieJar.get:"+ cockieJar.get) 
// }

// main("Main was called");
const domWindow = await getLoadedPage("https://www.olx.ro/")
const linkToLogin = await getNextNavigationPage("https://www.olx.ro/","div[color='white'] a")
console.log("linkToLogin " + linkToLogin)
const domWindowUser = await getLoadedPage(linkToLogin)
setElementValueOnPage(domWindowUser,"div input[name='username']","value","brebene.leonard@yahoo.ro")
setElementValueOnPage(domWindowUser,"div input[name='password']","value","parolaBomba.123")
// domWindowUser.document.querySelector("div input[name='password']").setAttribute("value","parola")

const anchor = domWindow.document.querySelector("span span[class^='button-text-wrapper']");
// await anchor.click();

const fileNameHtml = getPathWithDate()
fs.writeFileSync(fileNameHtml, domWindowUser.document.body.innerHTML)