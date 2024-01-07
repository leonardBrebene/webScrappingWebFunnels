import puppeteer from "puppeteer";
import loginToClickFunnels from "./clickFunnelsPupeteer/loginToClickFunnells.js";


const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ignoreDefaultArgs: ["--enable-automation"]
  });
  const page = await browser.newPage();

  await page.goto("https://maxtornow-app.clickfunnels.com/users/sign_in", {
    waitUntil: "networkidle2",
  });
  await page.waitForTimeout(1000);

  const startPage = await loginToClickFunnels(page, "admin@freedombusinessmentoring.com", "cc6*45y0r%*")

  console.log("Terminai")
}
main()
