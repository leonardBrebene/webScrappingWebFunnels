import { CookieJar, JSDOM as jsdom } from "jsdom";
import request from 'request-promise';
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

  await page.goto("https://www.olx.ro/", {
    waitUntil: "networkidle2",
  });

  await page.waitForTimeout(2000);

  let searchText = await page.waitForXPath('//*[@id="searchInput"]');
  console.log(searchText)

  
  const [search] = await page.$x(`//*[@id="search-form"]/fieldset/button`);
  if (search) {
    await search.click();
    search.getProperty
  }
}
main()