import puppeteer, { Page } from "puppeteer";
import loginToClickFunnels from "./projectElements/clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromFunnels.js";
import getAllUrlsFromStepFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromStepFunnels.js";


const main = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
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
  await page.waitForTimeout(1000);

 await loginToClickFunnels(page, "admin@freedombusinessmentoring.com", "cc6*45y0r%*")

  await page.goto("https://maxtornow-app.clickfunnels.com/funnels")
  await page.waitForXPath('//*[@class="ui menu secondary"]');

  const hrefFunnelsValues = await getAllUrlsFromFunnels(page)
  for (const url of hrefFunnelsValues) {
    await openFunnel(url);
  }

  async function openFunnel(hrefFunnelsValue) {
    console.log("Went stats")
    await page.waitForTimeout(3000);

    const statsUrl = hrefFunnelsValue + "/stats"
    await page.goto(statsUrl)
    await page.waitForXPath('//*[@class="bar"]');
    await page.waitForXPath('//*[@class=" funnelstep divided"]//td[2]');
    console.log("Elements charged")

   async function ceva () {
      const [cell] = await page.$x(`//*[@class=" funnelstep divided"]//td[2]`);
      const value = await cell.evaluate(el => el.textContent)

      console.log("value of value is:" + value +"'")
      if(value.includes("\n") || isNaN(value)){
        console.log("value from setInterval: " + value )
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      else{
        return "5"
      }
    };
   for (let index = 0; index < 5; index++) {
    console.log("index:"+index)
    const plm=await ceva()
    if(plm=="5"){
      console.log("Am intrat pe break")
        break
    }
   }

    const [cell] = await page.$x(`//*[@class=" funnelstep divided"]//td[2]`);
    const value = await cell.evaluate(el => el.textContent)
    console.log("value: " + value )

    await page.waitForTimeout(3000);
    console.log("Out of stats")
  }

  const hrefStepsFunnelValues = await getAllUrlsFromStepFunnels(page)
  await page.goto(hrefStepsFunnelValues[3])
  await page.waitForTimeout(3000);

  await page.goBack();

  console.log("Terminai")
}

const url = "https://maxtornow-app.clickfunnels.com/users/sign_in"
main(url)
