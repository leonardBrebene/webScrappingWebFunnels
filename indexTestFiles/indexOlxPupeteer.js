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

  await page.goto("https://www.olx.ro/", {
    waitUntil: "networkidle2",
  });
  await page.waitForTimeout(2000);

  const [acceptButton] = await page.$x(`//*[@id="onetrust-accept-btn-handler"]`);
  await acceptButton.click();
  
  const [contultau] = await page.$x(`//*[@color='white']/a`);
  await contultau.click();
  await page.waitForTimeout(2000);

  const [inputEmail] = await page.$x(`//*[@name="username"]`);
  const [inputPassword] = await page.$x(`//*[@name="password"]`);

  await inputEmail.type("brebene.leonard@yahoo.ro")
  await inputPassword.type("parolaBomba.123")

}
main()
