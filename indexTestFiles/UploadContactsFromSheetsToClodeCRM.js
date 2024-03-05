import puppeteer, { Page } from "puppeteer";
import fs from "fs"
import loginToClickFunnels from "./projectElements/clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromFunnels.js";
import getStepElementsViewsFromStats from "./projectElements/functionalitiesForPage/getStepElementsViewsFromStats.js";
import addRowToGoogleSheets from "./projectElements/googleSheetsOperations/addRowsToGoogleSheets.js";
import getRowsFromGoogleSheets from "./projectElements/googleSheetsOperations/getRowsFromGoogleSheets.js";


const testApi = async () => {

  const tableData = await getRowsFromGoogleSheets("TestApi", "A:B")
  const apiKey = 'api_5XnP17lmtFckF9EwtsNWuZ.5HDM1Qe7qC3JprxRICZija';
  const apiUrl = 'https://api.close.com/api/v1/lead/';


  for (let index = 0; index < tableData.length; index++) {
    const element = tableData[index];
    const email = element[0]
    const createdDateTime = element[1]

    const data = {
      "date_created": createdDateTime,
      "contacts": [
        {
          "emails": [
            {
              "type": "office",
              "email": email
            }
          ],
          "custom.cf_iXHQeOmZSLeDT2GWwI3ZW2HfXOqWE9qrGiBWn2Qn7l0": createdDateTime
        }
      ]
    }

    const ceva = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${btoa(`${apiKey}:`)}`, // Encoding the API key in Base64
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => console.log('Success:', result))
      .catch(error => console.error('Error:', error.toString()));

      console.log("ceva: " +ceva )

  }

}
testApi()
