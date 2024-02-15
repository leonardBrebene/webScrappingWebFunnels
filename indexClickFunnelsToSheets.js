import puppeteer, { Page } from "puppeteer";
import fs from "fs"
import loginToClickFunnels from "./projectElements/clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromFunnels.js";
import getStepElementsViewsFromStats from "./projectElements/functionalitiesForPage/getStepElementsViewsFromStats.js";
import addRowToGoogleSheets from "./projectElements/googleSheetsOperations/addRowsToGoogleSheets.js";


const indexClickFunnelsToSheets = async (url, page, filteringUrl, date, numberOfFunnelPages, account, password) => {

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
}

export default indexClickFunnelsToSheets;