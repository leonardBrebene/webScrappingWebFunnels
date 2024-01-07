import { CookieJar, JSDOM as jsdom } from "jsdom";
import request from 'request-promise';

const getPathWithDate =  () => {

    const html= ".html"
    const fileName = "./extracted/" + new Date(Date.now() + 2 * 3600 * 1000).toISOString().replace(':', '-').replace(':', '-').slice(0, 19)
    console.log("fileName: "+ fileName)
    return fileName + html
}
export default getPathWithDate;