import puppeteer, { Page } from "puppeteer";
import fs from "fs"
import loginToClickFunnels from "./projectElements/clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromFunnels.js";
import getAllUrlsFromStepFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromStepFunnels.js";
import getElementFromPathToHaveValue from "./projectElements/functionalitiesForPage/getElementFromPathToHaveValue.js";


const main = async (url, account, password) => {
  const browser = await puppeteer.launch({
    headless: false, //to see what the application does
    defaultViewport: null,
    args: ["--start-maximized"],
    // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ignoreDefaultArgs: ["--enable-automation"]
  });
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  await page.waitForTimeout(1000);//to be removed

  // await loginToClickFunnels(page, account, password)


  // await page.waitForTimeout(10000)
  // const cookies = await page.cookies();
  // await fs.promises.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));


  const cookiesString = await fs.promises.readFile('./cookies.json')
  const cookies = JSON.parse(cookiesString)
  await page.setCookie(...cookies)
  await page.waitForTimeout(3000) //for any reason

  await page.goto("https://maxtornow-app.clickfunnels.com/funnels")
  await page.waitForXPath('//*[@class="ui menu secondary"]');

  const hrefFunnelsValues = await getAllUrlsFromFunnels(page)
  for (const url of hrefFunnelsValues) {
    await openFunnelStepStats(url);
  }

  async function openFunnelStepStats(hrefFunnelsValue) {
    console.log("Went stats")
    await page.waitForTimeout(1000); //tobe removed

    const statsUrl = hrefFunnelsValue + "/stats"
    await page.goto(statsUrl)
    await page.waitForXPath('//*[@class="bar"]');
    const firstCellFromtable = await getElementFromPathToHaveValue(page, '//*[@class=" funnelstep divided"]//td[2]', 7, null)
    console.log("firstCellFromtable"+firstCellFromtable)
  }

    console.log("Terminai")
  }

  const url = "https://maxtornow-app.clickfunnels.com/users/sign_in"
  main(url,"admin@freedombusinessmentoring.com", "cc6*45y0r%*")
