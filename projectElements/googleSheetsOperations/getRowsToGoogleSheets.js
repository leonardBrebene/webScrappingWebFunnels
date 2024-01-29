import {google} from "googleapis"; 
const sheets = google.sheets('v4');
const SPREADSHEET_ID = '1KyOJhOQpoXO1ac2J8ZQb23-mLU_d19cwi_ZQRxJpn5o';
const SHEET_NAME = 'HistoricalData'; // Replace with the name of your sheet


const getRowsToGoogleSheets = async (stepFunnelViews) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'projectElements/googleSheetsOperations/credentials.json', // Replace with the path to your credentials JSON file
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const authClient = await auth.getClient();

  const response = await sheets.spreadsheets.values.get({
    auth: authClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1:E2`, // Adjust the range as needed
  });

  const values = response.data.values;
  console.log("values: "+ values)

}

export default getRowsToGoogleSheets;

// const values =  ['value2, Value3', 'Value4']
// // Replace with your data
// getRowsToGoogleSheets(values);