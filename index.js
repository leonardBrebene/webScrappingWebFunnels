import indexClickFunnelsToSheets from "./indexClickFunnelsToSheets.js"
import indexSheetsHistoryToSheets from "./indexSheetshistoryToSheets.js"
import puppeteer, { Page } from "puppeteer";
import fs from "fs"

const index = async (page, account, password) => {
    for (let index = 13; index <= 15; index++) {
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



        await indexClickFunnelsToSheets(url, page, filteringUrl, date, numberOfFunnelPages, account, password)
        await indexSheetsHistoryToSheets()
    }
}

const browser = await puppeteer.launch({
    headless: false, //to see what the application does
    defaultViewport: null,
    args: ["--start-maximized"],
    // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ignoreDefaultArgs: ["--enable-automation"]
});
const page = await browser.newPage();
const credentialsString = await fs.promises.readFile('./jsonFiles/credentials.json')
const credentials = JSON.parse(credentialsString)

index(page, credentials.account, credentials.password)

