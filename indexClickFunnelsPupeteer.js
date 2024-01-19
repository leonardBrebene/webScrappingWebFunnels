import puppeteer, { Page } from "puppeteer";
import loginToClickFunnels from "./projectElements/clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromFunnels.js";
import getAllUrlsFromStepFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromStepFunnels.js";


const main = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ignoreDefaultArgs: ["--enable-automation"]
  });
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  await page.waitForTimeout(1000);

 await loginToClickFunnels(page, "admin@freedombusinessmentoring.com", "cc6*45y0r%*")

  await page.goto("https://maxtornow-app.clickfunnels.com/funnels")
  await page.waitForXPath('//*[@class="ui menu secondary"]');

  const hrefFunnelsValues = await getAllUrlsFromFunnels(page)
  await page.goto(hrefFunnelsValues[0])
  
  await page.waitForXPath('//*[@class="funnelStepsTitleExplainerTitle pull-left" and contains(text(), "Funnel Steps")]');
  const hrefStepsFunnelValues = await getAllUrlsFromStepFunnels(page)
  await page.goto(hrefStepsFunnelValues[3])
  await page.waitForTimeout(3000);

  await page.goBack();

  console.log("Terminai")
  console.log("Terminai")
}

const url = "https://maxtornow-app.clickfunnels.com/users/sign_in"
main(url)
