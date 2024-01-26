import getPathWithDate from "./getPathWithDate.js";
import getElementFromPathToHaveValue from "./getElementFromPathToHaveValue.js";


const getStepElementsViewsFromStats = async (page) => {


    async function getValuesFromRow(page, rowNumber, tableNumber) {
        let funnelStepViews = []
        const titleValue = await getElementFromPathToHaveValue(page, `//table[${tableNumber}]//*[@class=" funnelstep divided"][${rowNumber}]//td[1]//div`, 5, null)
        funnelStepViews.push(titleValue)

        for (let j = 2; j <= 4; j++) {
            const locator = `//table[${tableNumber}]//*[@class=" funnelstep divided"][${rowNumber}]//td[${j}]`
            const value = await getElementFromPathToHaveValue(page, locator, 5, null)
            funnelStepViews.push(value)

        }
        return funnelStepViews
    };

    async function getValuesFromTable(page, tableNumber, funnelStepsAndViews) {
        const stepElementViews = await page.$x(`//table[${tableNumber}]//*[@class=" funnelstep divided"]`);

        for (let i = 1; i <= stepElementViews.length; i++) {
            const values = await getValuesFromRow(page, i, tableNumber)
            funnelStepsAndViews.push(values)
        }
        return funnelStepsAndViews
    }

    let funnelStepsAndViews = []
    const tableElements = await page.$x(`//table[@class="ui table"]`);
    for (let x = 1; x <= tableElements.length; x++) {
        const values = await getValuesFromTable(page, x, funnelStepsAndViews)
    }
    console.log("funnelStepsAndViews:" + funnelStepsAndViews)
}
export default getStepElementsViewsFromStats;

