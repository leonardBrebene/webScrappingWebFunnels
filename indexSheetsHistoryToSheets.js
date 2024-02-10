
import getRowsFromGoogleSheets from "./projectElements/googleSheetsOperations/getRowsFromGoogleSheets.js";
import getTodaysRowsEntries from "./projectElements/googleSheetsInstruments/getTodaysRowsEntries.js";
import addDataToSheet from "./projectElements/googleSheetsOperations/addDataToSheet.js";
import getSheetsNamesGoogleSheets from "./projectElements/googleSheetsOperations/getSheetsNamesGoogleSheets.js";
import getIndexOfFunnel from "./projectElements/instrumentsForPage/getIndexOfFunnel.js";
import appendRowToGoogleSheets from "./projectElements/googleSheetsOperations/appendRowsToGoogleSheets.js";
import getFunnelEntriesForToday from "./projectElements/instrumentsForPage/getFunnelEntriesForToday.js";


const indexSheetsHistoryToSheets = async () => {

  const tableData = await getRowsFromGoogleSheets("HistoricalData", "A:B")
  const lastEntryDate = tableData[tableData.length - 1][1]
  const lastEntryIndex = tableData[tableData.length - 1][0]
  var firstEntryIndex = 0

  for (let index = lastEntryIndex; index >= 1; index--) {
    if (lastEntryDate !== tableData[index - 1][1]) {
      firstEntryIndex = index +1
      break
    }
  }

  const sheet = await getRowsFromGoogleSheets("HistoricalData", `A${firstEntryIndex.toString()}:AF${lastEntryIndex}`)
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
