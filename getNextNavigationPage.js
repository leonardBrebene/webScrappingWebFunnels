import { CookieJar, JSDOM as jsdom } from "jsdom";
import request from 'request-promise';

const getNextNavigationPage = async (link, locator) => {

    const result = await request.get(link)
    const dom = new jsdom(result)
    const document = dom.window.document
    const element = document.querySelector(locator)
    return element.getAttribute("href")
}
export default getNextNavigationPage;