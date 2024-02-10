import puppeteer, { Page } from "puppeteer";
import fs from "fs"
import loginToClickFunnels from "./projectElements/clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromFunnels.js";
import getStepElementsViewsFromStats from "./projectElements/functionalitiesForPage/getStepElementsViewsFromStats.js";
import addRowToGoogleSheets from "./projectElements/googleSheetsOperations/addRowsToGoogleSheets.js";
import indexSheetsHistoryToSheets from "./indexSheetshistoryToSheets.js";


const indexClickFunnelsToSheets = async (url, filteringUrl, date, numberOfFunnelPages, account, password) => {
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

  await page.goto("https://www.google.com", {
    waitUntil: "networkidle2",
  });
  await page.setCookie(...cookies)
  await page.waitForTimeout(1000) //for any reason

  await page.goto("https://maxtornow-app.clickfunnels.com/funnels")
  try {
    await page.waitForXPath('//*[@class="ui menu secondary"]', { timeout: 10000 });
  } catch (error) {
    console.log("Coockies expired")
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    await page.waitForTimeout(1000);//to be removed
    await loginToClickFunnels(page, account, password)
  }

  var hrefFunnelsValues = []
  for (let i = 1; i <= numberOfFunnelPages; i++) {
    await page.goto(`https://maxtornow-app.clickfunnels.com/funnels?page=${i}`)
    await page.waitForXPath('//*[@class="ui menu secondary"]')
    const urlFromPage = await getAllUrlsFromFunnels(page)
    hrefFunnelsValues.push(...urlFromPage)
  }

  for (const url of hrefFunnelsValues) {
    await openFunnelStepStats(url);
  }

  async function openFunnelStepStats(hrefFunnelsValue) {
    console.log("Went stats")
    const statsUrl = hrefFunnelsValue + "/stats" + filteringUrl
    //create condition when page does not load
    const stepFunnelViews = await getStepElementsViewsFromStats(page, statsUrl)
    await addRowToGoogleSheets([date, ...stepFunnelViews])
  }

  console.log("Terminai pagina 1")
}

for (let index = 2; index < 10; index++) {
const startDay = "1"
const day = index
const month = "February"
const year = "2024"
const date = `${day} ${month} ${year}`
const numberOfFunnelPages = 3
const url = "https://maxtornow-app.clickfunnels.com/users/sign_in"
const filteringUrl = "?utf8=%E2%9C%93&filter%5Bcampaign_content%5D=&filter%5Bcampaign_medium%5D=&filter%5Bcampaign_name%5D=&filter%5B" +
  "campaign_source%5D=&filter%5Bcampaign_term%5D=&filter%5Baffiliate_subscription_affiliate_id%5D=&filter%5B" +
  "affiliate_subscription_aff_sub%5D=&filter%5Baffiliate_subscription_aff_sub2%5D=&filter%5Baffiliate_subscription_aff_sub3%5D=&filter%5B" +
  `date_start%5D=${month}+${day}%2C+${year}&filter%5Bdate_end%5D=${month}+${day}%2C+${year}&filter%5Bdevice_category_id%5D=&filter%5Btotal_cost%5D=&commit=Apply+Filter`

await indexClickFunnelsToSheets(url, filteringUrl, date, numberOfFunnelPages, "admin@freedombusinessmentoring.com", "cc6*45y0r%*")
await indexSheetsHistoryToSheets()
}