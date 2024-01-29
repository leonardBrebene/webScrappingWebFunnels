import {google} from "googleapis"; 
const sheets = google.sheets('v4');
const SPREADSHEET_ID = '1KyOJhOQpoXO1ac2J8ZQb23-mLU_d19cwi_ZQRxJpn5o';


const getRowsFromGoogleSheets = async (sheetName, range) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'projectElements/googleSheetsOperations/credentials.json', // Replace with the path to your credentials JSON file
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const authClient = await auth.getClient();

  const response = await sheets.spreadsheets.values.get({
    auth: authClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!${range}`, // Adjust the range as needed Example: !A1:E2
  });

  return response.data.values;

}

export default getRowsFromGoogleSheets;

// const values =  ['value2, Value3', 'Value4']
// // Replace with your data
// getRowsToGoogleSheets(values);