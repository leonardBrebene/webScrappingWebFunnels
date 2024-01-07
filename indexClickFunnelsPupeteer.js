import { CookieJar, JSDOM as jsdom } from "jsdom";
import request from 'request-promise';
import  puppeteer from "puppeteer" ;



const requestDef = request.defaults({ jar: CookieJar })
const cockieJar = requestDef.jar


const main =async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    //  args: ["--start-maximized","--user-data-dir=C:\\Program Files (x86)\\Google\\Chrome\\Application\\puppeteer_dev_chrome_profile"],
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ignoreDefaultArgs: ["--enable-automation"]
  });

  const page = await browser.newPage();

  await page.goto("https://maxtornow-app.clickfunnels.com/users/sign_in", {
    waitUntil: "networkidle2",
  });
  await page.waitForTimeout(2000);
  

  const [inputEmail] = await page.$x(`//*[@type="email"]`);
  const [inputPassword] = await page.$x(`//*[@type="password"]`);

  await inputEmail.type("admin@freedombusinessmentoring.com")
  await inputPassword.type("cc6*45y0r%*")

}
main()
