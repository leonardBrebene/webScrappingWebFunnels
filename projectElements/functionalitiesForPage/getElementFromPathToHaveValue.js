

const getElementFromPathToHaveValue = async (page, path, timeInSeconds, value) => {

    async function getValueFromElement() {
        await page.waitForXPath(path);
        const [elem] = await page.$x(path);
        const value = await elem.evaluate(el => el.textContent)

        if (value.includes("\n") || value.length === 0 || value === "'") {
            await new Promise(resolve => setTimeout(resolve, 500))
        }
        else {
            console.log("The value of requested element is: " + value)
            return value
        }
    };

    for (let index = 0; index < timeInSeconds * 2; index++) {
        const requstedValue = await getValueFromElement()

        if (value===null && requstedValue !== null && requstedValue !== undefined) {
            return requstedValue
        }
        else if(value!==null && requstedValue === value && requstedValue !== undefined){
            return requstedValue
        }
    }
}
export default getElementFromPathToHaveValue;

