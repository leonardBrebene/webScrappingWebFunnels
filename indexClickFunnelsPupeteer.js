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

  const cookiesString = await fs.promises.readFile('./jsonFiles/cookies.json')
  const cookies = JSON.parse(cookiesString)

  if (cookiesString.length < 100) {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    await page.waitForTimeout(1000);//to be removed
    await loginToClickFunnels(page, account, password)
  }
  else {
    await page.goto("https://www.google.com", {
      waitUntil: "networkidle2",
    });
    await page.setCookie(...cookies)
    await page.waitForTimeout(1000) //for any reason

  }

  await page.goto("https://maxtornow-app.clickfunnels.com/funnels")
  await page.waitForXPath('//*[@class="ui menu secondary"]');

  const hrefFunnelsValues = await getAllUrlsFromFunnels(page)
  for (const url of hrefFunnelsValues) {
    await openFunnelStepStats(url);
  }

  async function openFunnelStepStats(hrefFunnelsValue) {
    console.log("Went stats")
    const statsUrl = hrefFunnelsValue + "/stats"
    await page.goto(statsUrl, { waitUntil: 'domcontentloaded' });
    //await page.waitForTimeout(1000); //probably dynamic wait to trick that this is not a robot

    await page.waitForXPath('//*[@class="bar"]');
    const firstCellFromtable = await getElementFromPathToHaveValue(page, '//*[@class=" funnelstep divided"]//td[2]', 7, null)
    console.log("firstCellFromtable"+firstCellFromtable)
  }

    console.log("Terminai")
  }

  const url = "https://maxtornow-app.clickfunnels.com/users/sign_in"
  main(url,"admin@freedombusinessmentoring.com", "cc6*45y0r%*")
