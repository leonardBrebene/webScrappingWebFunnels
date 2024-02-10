import { google } from "googleapis";

async function createSheetInGoogleSheets(sheetName) {
    const spreadsheetId = '1OCL2lbh1X0LmJ-CRNXdWMa64Cbi4kG3lFVFKIteKRc0';
    const auth = new google.auth.GoogleAuth({
        keyFile: 'projectElements/googleSheetsOperations/credentials.json', // Replace with the path to your credentials JSON file
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const response = await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
                requests: [
                    {
                        addSheet: {
                            properties: {
                                title: sheetName,
                            },
                        },
                    },
                ],
            },
        });

        const createdSheetProperties = response.data.replies[0].addSheet.properties;
        console.log('Created Sheet:', createdSheetProperties.title);
        return createdSheetProperties.title;
    } catch (error) {
        console.error('Error creating sheet:', error.message);
        return null;
    }
}
export default createSheetInGoogleSheets;

// Example usage:
// createSheetInGoogleSheets('NewSheetName');
