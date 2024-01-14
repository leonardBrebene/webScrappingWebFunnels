import puppeteer, { Page } from "puppeteer";
import loginToClickFunnels from "./clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./functionalitiesForPage/getAllUrlsFromFunnels.js";


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

  const startPage = await loginToClickFunnels(page, "admin@freedombusinessmentoring.com", "cc6*45y0r%*")

  await page.goto("https://maxtornow-app.clickfunnels.com/funnels")
  await page.waitForXPath('//*[@class="ui menu secondary"]');

  const hrefFunnelsValues = await getAllUrlsFromFunnels(page)
  
  await page.goto(hrefFunnelsValues[0])
  await page.waitForXPath('//*[@class="funnelStepsTitleExplainerTitle pull-left" and contains(text(), "Funnel Steps")]');


  const [statsButton] = await page.$x(`//div[@class="funnelHeaderActionsItems pull-right clearfix"]//a[2]`);

  if (statsButton) {
     await statsButton.click()
  }
  await page.goBack();
  await page.waitForTimeout(5000);
  
  // const stepFunnelsUrlsElements = await page.$$('tr.funnel-content-wrapper.divided td a.ui.link');
  // const hrefPromises = stepFunnelsUrlsElements.map(element => element.getProperty('href')
  // );
  // const hrefs = await Promise.all(hrefPromises);
  // const hrefStepsFunnelValues = hrefs.map(hrefHandle => hrefHandle.remoteObject().value);


  console.log("Terminai")
}

const url = "https://maxtornow-app.clickfunnels.com/users/sign_in"
main(url)
