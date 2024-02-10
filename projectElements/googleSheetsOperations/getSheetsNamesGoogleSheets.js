import { google } from "googleapis";
const spreadsheetId = '1OCL2lbh1X0LmJ-CRNXdWMa64Cbi4kG3lFVFKIteKRc0';

async function getSheetsNamesGoogleSheets() {
  
  const auth = new google.auth.GoogleAuth({
    keyFile: 'projectElements/googleSheetsOperations/credentials.json', // Replace with the path to your credentials JSON file
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.get({ spreadsheetId, });
  const sheetNames = response.data.sheets.map(sheet => sheet.properties.title);

  return sheetNames;

}
export default getSheetsNamesGoogleSheets;

//getSheetsNamesGoogleSheets()
