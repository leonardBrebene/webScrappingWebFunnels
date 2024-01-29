import puppeteer, { Page } from "puppeteer";
import fs from "fs"
import loginToClickFunnels from "./projectElements/clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromFunnels.js";
import getAllUrlsFromStepFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromStepFunnels.js";
import getElementFromPathToHaveValue from "./projectElements/functionalitiesForPage/getElementFromPathToHaveValue.js";
import getStepElementsViewsFromStats from "./projectElements/functionalitiesForPage/getStepElementsViewsFromStats.js";
import addRowToGoogleSheets from "./projectElements/googleSheetsOperations/addRowsToGoogleSheets.js";


const indexClickFunnelsToSheets = async (url, filteringUrl, account, password) => {
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
    break
  }

  async function openFunnelStepStats(hrefFunnelsValue) {
    console.log("Went stats")
    const statsUrl = hrefFunnelsValue + "/stats" + filteringUrl
    //create condition when page does not load
    const stepFunnelViews = await getStepElementsViewsFromStats(page, statsUrl)
    await addRowToGoogleSheets(stepFunnelViews)
  
  }

  console.log("Terminai pagina 1")
}

const day = "26"
const month = "January"
const year = "2024"
const url = "https://maxtornow-app.clickfunnels.com/users/sign_in"
const filteringUrl = "?utf8=%E2%9C%93&filter%5Bcampaign_content%5D=&filter%5Bcampaign_medium%5D=&filter%5Bcampaign_name%5D=&filter%5B"+
"campaign_source%5D=&filter%5Bcampaign_term%5D=&filter%5Baffiliate_subscription_affiliate_id%5D=&filter%5B"+
"affiliate_subscription_aff_sub%5D=&filter%5Baffiliate_subscription_aff_sub2%5D=&filter%5Baffiliate_subscription_aff_sub3%5D=&filter%5B"+
`date_start%5D=${month}+${day}%2C+${year}&filter%5Bdate_end%5D=${month}+${day}%2C+${year}&filter%5Bdevice_category_id%5D=&filter%5Btotal_cost%5D=&commit=Apply+Filter`

indexClickFunnelsToSheets(url, filteringUrl, "admin@freedombusinessmentoring.com", "cc6*45y0r%*")
