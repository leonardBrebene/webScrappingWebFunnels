

const getElementFromPathToHaveValue = async (page, path, timeInSeconds, value) => {

    function containsLetterAndNumber(inputString) {
        const result = /[a-zA-Z]/.test(inputString) || /\d/.test(inputString);  //result must contain a letter or a digit
        return result
    }

    async function getValueFromElement() {
        await page.waitForXPath(path);
        const [elem] = await page.$x(path);
        const valueRaw = await elem.evaluate(el => el.textContent)
        const value = valueRaw.replace(/\n/g, '')

        if (containsLetterAndNumber(value) === false) {
            await new Promise(resolve => setTimeout(resolve, 500))
        }
        else {
            return value
        }
    };

    for (let index = 0; index < timeInSeconds * 2; index++) {
        const requstedValue = await getValueFromElement()

        if (value === null && requstedValue !== null && requstedValue !== undefined) {
            return requstedValue
        }
        else if (value !== null && requstedValue === value && requstedValue !== undefined) {
            return requstedValue
        }
    }
}
export default getElementFromPathToHaveValue;

