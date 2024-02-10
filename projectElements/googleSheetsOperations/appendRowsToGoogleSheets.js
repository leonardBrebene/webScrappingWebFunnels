import {google} from "googleapis"; 
import getRowsFromGoogleSheets from "./getRowsFromGoogleSheets.js";
const sheets = google.sheets('v4');
const SPREADSHEET_ID = '1OCL2lbh1X0LmJ-CRNXdWMa64Cbi4kG3lFVFKIteKRc0';


const appendRowToGoogleSheets = async (sheetName, data) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'projectElements/googleSheetsOperations/credentials.json', // Replace with the path to your credentials JSON file
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const authClient = await auth.getClient();
  const tableData = await getRowsFromGoogleSheets(sheetName, "A:A")

  const sheetsClient = await sheets.spreadsheets.values.append({
    auth: authClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`, // Choose the range where the new row will be added
    valueInputOption: 'RAW',
    resource: {
      values: [data], // An array of values for each column in the new row
    },
  });
    
  console.log('Row added successfully:', sheetsClient.data);
}

export default appendRowToGoogleSheets;

//const values =  ['value2, Value3', 'Value4']
// Replace with your data
//addRowToGoogleSheets(values);