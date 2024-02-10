import getFormatedDate from "../instrumentsForPage/getFormatedDate.js";
import getPathWithDate from "../instrumentsForPage/getPathWithDate.js";
import getElementFromPathToHaveValue from "./getElementFromPathToHaveValue.js";


const getStepElementsViewsFromStats = async (page, statsUrl) => {

    let funnelStepsAndViews = []

    await page.goto(statsUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForXPath('//*[@class="bar"]');

    const title = await getElementFromPathToHaveValue(page, `//div//h3[@class="truncated white text"]`, 5, null)
    funnelStepsAndViews.push( title)

    async function getValuesFromRow(page, rowNumber, tableNumber) {
        const titleValue = await getElementFromPathToHaveValue(page, `//table[${tableNumber}]//*[@class=" funnelstep divided"][${rowNumber}]//td[1]//div`, 5, null)
        let funnelStepViews = titleValue + " || "

        for (let j = 2; j <= 4; j++) {
            const locator = `//table[${tableNumber}]//*[@class=" funnelstep divided"][${rowNumber}]//td[${j}]`
            const value = await getElementFromPathToHaveValue(page, locator, 5, null)
            if (j === 2) {
                funnelStepViews += value
            } else {
                funnelStepViews += ',' + value
            }
        }
        return funnelStepViews
    };

    async function getValuesFromTable(page, tableNumber) {
        const stepElementViews = await page.$x(`//table[${tableNumber}]//*[@class=" funnelstep divided"]`);

        for (let i = 1; i <= stepElementViews.length; i++) {
            const values = await getValuesFromRow(page, i, tableNumber)
            funnelStepsAndViews.push(values)
        }
    }

    const tableElements = await page.$x(`//table[@class="ui table"]`);
    for (let x = 1; x <= tableElements.length; x++) {
        const values = await getValuesFromTable(page, x)
    }

    console.log("funnelStepsAndViews: \n" + funnelStepsAndViews)
    return funnelStepsAndViews
}
export default getStepElementsViewsFromStats;

