import { CookieJar, JSDOM as jsdom } from "jsdom";
import fs from "fs";
import request from 'request-promise';
import cheerio from 'cheerio'
import getNextNavigationPage from "./getNextNavigationPage.js";
import getLoadedPage from "./getLoadedPage.js";
import getPathWithDate from "./getPathWithDate.js";
import setElementValueOnPage from "./setElementValueOnPage.js";
import  puppeteer from "puppeteer" ;



const requestDef = request.defaults({ jar: CookieJar })
const cockieJar = requestDef.jar


const main =async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();

  await page.goto("https://www.wikipedia.org/", {
    waitUntil: "networkidle2",
  });

  await page.waitForTimeout(2000);

  let searchText = await page.waitForXPath('//*[@id="searchInput"]');
  // * before [] means any type of tag object
  //@ is like contains property

  
  const [search] = await page.$x(`//*[@id="search-form"]/fieldset/button`);
  //all elements with id search-form then go into fieldset then go into button
  if (search) {
    await search.click();
    search.getProperty
  }
}
main()
