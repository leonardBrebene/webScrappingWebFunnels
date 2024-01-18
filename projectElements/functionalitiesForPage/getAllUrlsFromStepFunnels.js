const getAllUrlsFromStepFunnels = async (page) => {

    const funnelUrlsElements = await page.$x(`//div[@class='funnel_step']//div[contains(@class, 'link')]/*[1]`);
    const hrefPromises = funnelUrlsElements.map(element => element.getProperty('href')
    );
    const hrefs = await Promise.all(hrefPromises);
    const hrefValues = hrefs.map(hrefHandle => hrefHandle.remoteObject().value);
    return hrefValues;
}
export default getAllUrlsFromStepFunnels;

