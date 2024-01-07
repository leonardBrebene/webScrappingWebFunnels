import { CookieJar, JSDOM as jsdom } from "jsdom";
import request from 'request-promise';

const setElementValueOnPage = (domWindow, locator,attribute,value) => {

    var element = domWindow.document.querySelector(locator)
    return element.setAttribute(attribute,value)
}
export default setElementValueOnPage;