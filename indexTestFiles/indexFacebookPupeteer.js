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

  await page.goto("https://www.facebook.com/", {
    waitUntil: "networkidle2",
  });
  await page.waitForTimeout(2000);

  const [acceptButton] = await page.$x(`//*[@data-cookiebanner="accept_only_essential_button"]`);
  await acceptButton.click();
  

  const [inputEmail] = await page.$x(`//*[@name="email"]`);
  const [inputPassword] = await page.$x(`//*[@type="password"]`);

  await inputEmail.type("brebene.leonard@yahoo.ro")
  await inputPassword.type("parolaAroganta_954")

}
main()
