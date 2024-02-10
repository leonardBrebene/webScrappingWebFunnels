import createSheetInGoogleSheets from "../googleSheetsOperations/createSheetInGoogleSheets.js";
import getSheetsNamesGoogleSheets from "../googleSheetsOperations/getSheetsNamesGoogleSheets.js";

const createSheetsIfNeeded = async (funnelNamesFromTodaysEntries, requiredFunnelNames) => {
  const allSheetsFromSpreadSheet = await getSheetsNamesGoogleSheets()
  funnelNamesFromTodaysEntries.forEach(funnelname => {
    if (allSheetsFromSpreadSheet.indexOf(funnelname) === -1 && requiredFunnelNames.indexOf(funnelname) === -1) {
      createSheetInGoogleSheets(funnelname)
    }
  });

}
export default createSheetsIfNeeded;
