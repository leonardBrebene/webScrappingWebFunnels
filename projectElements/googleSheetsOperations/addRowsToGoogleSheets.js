import {google} from "googleapis"; 
import getRowsFromGoogleSheets from "./getRowsFromGoogleSheets.js";
const sheets = google.sheets('v4');
const SPREADSHEET_ID = '1KyOJhOQpoXO1ac2J8ZQb23-mLU_d19cwi_ZQRxJpn5o';
const SHEET_NAME = 'HistoricalData'; // Replace with the name of your sheet


const addRowToGoogleSheets = async (stepFunnelViews) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'projectElements/googleSheetsOperations/credentials.json', // Replace with the path to your credentials JSON file
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const authClient = await auth.getClient();
  const tableData = await getRowsFromGoogleSheets("HistoricalData", "A:A")

  const sheetsClient = await sheets.spreadsheets.values.append({
    auth: authClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:AF`, // Choose the range where the new row will be added
    valueInputOption: 'RAW',
    resource: {
      values: [[tableData.length, ...stepFunnelViews]], // An array of values for each column in the new row
    },
  });
    
  console.log('Row added successfully:', sheetsClient.data);
}

export default addRowToGoogleSheets;

const values =  ['value2, Value3', 'Value4']
  ;; // Replace with your data
addRowToGoogleSheets(values);