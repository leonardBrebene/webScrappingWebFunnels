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

const domWindow = await getLoadedPage("https://www.olx.ro/")
const linkToLogin = await getNextNavigationPage("https://www.olx.ro/","div[color='white'] a")
console.log("linkToLogin " + linkToLogin)

const domWindowUser = await getLoadedPage(linkToLogin)
setElementValueOnPage(domWindowUser,"div input[name='username']","value","brebene.leonard@yahoo.ro")
setElementValueOnPage(domWindowUser,"div input[name='password']","value","parolaBomba.123")

const anchor = domWindow.document.querySelector("div a[data-cy='post-new-ad-button']");
anchor.click()
setTimeout(
  ()=>setElementValueOnPage(domWindow,"div input[name='username']","value","brebene.leonard@yahoo.ro")
  , 5000);

const fileNameHtml = getPathWithDate()
fs.writeFileSync(fileNameHtml, domWindow.document.body.innerHTML)