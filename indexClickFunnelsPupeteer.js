import puppeteer, { Page } from "puppeteer";
import loginToClickFunnels from "./clickFunnelsPupeteer/loginToClickFunnells.js";


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
  
  // const [clickFunnelsButton] = await startPage.$x(`//*[contains(@class, 'ui dropdown simple link item')]`);
  // await clickFunnelsButton.click()
  await startPage.goto("https://maxtornow-app.clickfunnels.com/funnels")
  await startPage.waitForXPath('//*[@class="ui menu secondary"]');

  console.log("Terminai")
}

const url = "https://maxtornow-app.clickfunnels.com/users/sign_in"
main(url)