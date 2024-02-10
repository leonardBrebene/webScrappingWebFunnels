
import getRowsFromGoogleSheets from "./projectElements/googleSheetsOperations/getRowsFromGoogleSheets.js";
import getTodaysRowsEntries from "./projectElements/googleSheetsInstruments/getTodaysRowsEntries.js";
import addDataToSheet from "./projectElements/googleSheetsOperations/addDataToSheet.js";
import getSheetsNamesGoogleSheets from "./projectElements/googleSheetsOperations/getSheetsNamesGoogleSheets.js";
import getIndexOfFunnel from "./projectElements/instrumentsForPage/getIndexOfFunnel.js";
import appendRowToGoogleSheets from "./projectElements/googleSheetsOperations/appendRowsToGoogleSheets.js";
import getFunnelEntriesForToday from "./projectElements/instrumentsForPage/getFunnelEntriesForToday.js";


const indexSheetsHistoryToSheets = async () => {


  const sheet = await getRowsFromGoogleSheets("HistoricalData", "A:AF")
  const todaysEntries = getTodaysRowsEntries(sheet)

  const funnelNamesAndStepsFromTodaysEntries = todaysEntries.map((funnelStepEntries) => {
    funnelStepEntries.shift();
    const funnelNamesAndSteps = funnelStepEntries.map(str => str.split(" || ")[0]);
    return funnelNamesAndSteps
  });

  await addDataToSheet(funnelNamesAndStepsFromTodaysEntries, "LatestFunnelsAndSteps", "A2")
  const allSheetsFromSpreadSheet = await getSheetsNamesGoogleSheets()

  for (const sheet of allSheetsFromSpreadSheet) {

    const funnelIndex = getIndexOfFunnel(funnelNamesAndStepsFromTodaysEntries, sheet)
   
    if (funnelIndex !== -1) {  //if the sheet is present

      const funnelStepsFromCurentSheetRaw = await getRowsFromGoogleSheets(sheet, "B1:Z1")
      const funnelStepsFromCurentSheet = funnelStepsFromCurentSheetRaw[0]
      const funnelStepFromToday = funnelNamesAndStepsFromTodaysEntries[funnelIndex]
      const funnelStepEntriesFromToday = todaysEntries[funnelIndex]

      const funnelResult = getFunnelEntriesForToday(funnelStepsFromCurentSheet, funnelStepFromToday, funnelStepEntriesFromToday)
      appendRowToGoogleSheets(sheet, funnelResult)
    }
  };

}

indexSheetsHistoryToSheets()
