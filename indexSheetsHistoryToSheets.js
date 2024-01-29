import puppeteer, { Page } from "puppeteer";
import fs from "fs"
import loginToClickFunnels from "./projectElements/clickFunnelsPupeteer/loginToClickFunnells.js";
import getAllUrlsFromFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromFunnels.js";
import getAllUrlsFromStepFunnels from "./projectElements/functionalitiesForPage/getAllUrlsFromStepFunnels.js";
import getElementFromPathToHaveValue from "./projectElements/functionalitiesForPage/getElementFromPathToHaveValue.js";
import getStepElementsViewsFromStats from "./projectElements/functionalitiesForPage/getStepElementsViewsFromStats.js";
import addRowToGoogleSheets from "./projectElements/googleSheetsOperations/addRowsToGoogleSheets.js";
import getRowsFromGoogleSheets from "./projectElements/googleSheetsOperations/getRowsFromGoogleSheets.js";
import getTodaysRowsEntries from "./projectElements/googleSheetsInstruments/getTodaysRowsEntries.js";


const indexSheetsHistoryToSheets = async () => {


  const sheet = await getRowsFromGoogleSheets("HistoricalData", "A:AF")
  const todaysEntries = getTodaysRowsEntries(sheet)

  var funnelNamesFromTodaysEntries = todaysEntries.map( (value) => {
    return value[2]
  });
  
//   createSheetsIfNeeded(funnelNamesFromTodaysEntries)

//   var todaysEntries = sheet.getRange("A" + firstRowIndex + ":" + "AE" + lastRowIndex).getValues();
//   //createFunnelStepColumnsIfNeeded(funnelNamesFromTodaysEntries, todaysEntries)

//   for (var i = 0; i < todaysEntries.length; i++) {
//     var actualSheet2 = spreadsheet.getSheetByName(todaysEntries[i][1])
//     var todaysEntriesFormatted = todaysEntries[i].filter(function (value) {
//       return value !== null && value !== undefined && value !== '';
//     });

//     var actualSheetFunnelSteps = getFunnelStepsFromSheet(todaysEntriesFormatted[1])
//     var lastRowIndex = actualSheet2.getLastRow()

//     for (var j = 2; j < todaysEntriesFormatted.length; j++) {
//       var stepName = todaysEntriesFormatted[j].split(' ||')[0].trim()
//       var columnIndex = actualSheetFunnelSteps.indexOf(stepName)
//       var allPageViews = todaysEntriesFormatted[j].split(' ||')[1].trim().split(',')[0].trim()

//       actualSheet2.getRange(lastRowIndex + 1, columnIndex + 2, 1, 1).setValues([[allPageViews]]);

//       Logger.log("todaysEntriesFormatted[j]: " + todaysEntriesFormatted[j]);
//       Logger.log("stepName: " + stepName);
//       Logger.log("index: " + columnIndex);

//     }

//     console.log("Terminai trimiterea")
//   }
 }

 indexSheetsHistoryToSheets()
