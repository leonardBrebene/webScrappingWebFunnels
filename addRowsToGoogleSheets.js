import {google} from "googleapis"; 
const sheets = google.sheets('v4');
const SPREADSHEET_ID = '1A4lCLCaHeyOKKV3kfRmaK7dYhFHbZOGl6quYO_iVZd8';
const SHEET_NAME = 'TestApi'; // Replace with the name of your sheet


const addRowToGoogleSheets = async (values1) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json', // Replace with the path to your credentials JSON file
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const authClient = await auth.getClient();


  const sheetsClient = await sheets.spreadsheets.values.append({
    auth: authClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:A`, // Choose the range where the new row will be added
    valueInputOption: 'RAW',
    resource: {
      values: [values1], // An array of values for each column in the new row
    },
  });

  console.log('Row added successfully:', sheetsClient.data);
};

const values =  ['Value3', 'Value4']
  ;; // Replace with your data
addRowToGoogleSheets(values);