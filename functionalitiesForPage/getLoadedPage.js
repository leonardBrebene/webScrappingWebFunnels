import { CookieJar, JSDOM as jsdom } from "jsdom";
import request from 'request-promise';

const getLoadedPage = async (link) => {

    const result = await request.get(link)
    const dom = new jsdom(result)
    const window = dom.window
    return window
}
export default getLoadedPage;

