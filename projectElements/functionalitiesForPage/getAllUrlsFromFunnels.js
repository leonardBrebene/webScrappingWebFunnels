const getAllUrlsFromFunnels = async (page) => {

    const funnelUrlsElements = await page.$x(`//tr[@class=' funnel-content-wrapper divided']//a[@class="ui link"]`);
    const hrefPromises = funnelUrlsElements.map(element => element.getProperty('href')
    );
    const hrefs = await Promise.all(hrefPromises);
    const hrefValues = hrefs.map(hrefHandle => hrefHandle.remoteObject().value);
    return hrefValues;
}
export default getAllUrlsFromFunnels;

