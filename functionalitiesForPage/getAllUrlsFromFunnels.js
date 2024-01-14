const getAllUrlsFromFunnels = async (page) => {

    const funnelUrlsElements = await page.$$('tr.funnel-content-wrapper.divided td a.ui.link');
    const hrefPromises = funnelUrlsElements.map(element => element.getProperty('href')
    );
    const hrefs = await Promise.all(hrefPromises);
    const hrefValues = hrefs.map(hrefHandle => hrefHandle.remoteObject().value);
    return hrefValues;
}
export default getAllUrlsFromFunnels;

