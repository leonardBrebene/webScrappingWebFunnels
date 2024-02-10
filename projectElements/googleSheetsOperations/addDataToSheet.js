import {google} from "googleapis"; 
const sheets = google.sheets('v4');
const SPREADSHEET_ID = '1OCL2lbh1X0LmJ-CRNXdWMa64Cbi4kG3lFVFKIteKRc0';


const addDataToSheet = async (data, sheetName, range) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'projectElements/googleSheetsOperations/credentials.json', // Replace with the path to your credentials JSON file
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const authClient = await auth.getClient();

  const sheetsClient = await sheets.spreadsheets.values.update({
    auth: authClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!${range}`, // Choose the range where the new row will be added    example: A:AF or R1
    valueInputOption: 'RAW',
    resource: {
      values: data, // An array of values for each column in the new row
    },
  });
    
  console.log('Row added successfully:', sheetsClient.data);
}

export default addDataToSheet;
// addDataToSheet(["9z","9z"],"B2B VSL Funnel","2")

