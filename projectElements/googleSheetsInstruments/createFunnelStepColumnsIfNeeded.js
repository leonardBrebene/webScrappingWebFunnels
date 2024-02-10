import addDataToSheet from "../googleSheetsOperations/addDataToSheet.js";
import getRowsFromGoogleSheets from "../googleSheetsOperations/getRowsFromGoogleSheets.js";
import getMissingFunnelStepsFromCurentSheet from "./getMissingFunnelStepsFromCurentSheet.js";


const createFunnelStepColumnsIfNeeded = async (todaysEntries,requiredFunnelSteps) => {

  for (const rawEntry of todaysEntries) {
    const currentFunnelName = rawEntry[2]
    const [, , ...funnelStepsFromTodaysEntries] = rawEntry;
    const funnelStepsFromCurentSheet = await getRowsFromGoogleSheets(currentFunnelName, "B1:AF1")

    const missingFunnelStepsFromCurentSheet = getMissingFunnelStepsFromCurentSheet(funnelStepsFromCurentSheet, funnelStepsFromTodaysEntries, requiredFunnelSteps)
    console.log("currentFunnelName: " + currentFunnelName);
    console.log("missingFunnelStepsFromCurentSheet: " + missingFunnelStepsFromCurentSheet);
    
    if (missingFunnelStepsFromCurentSheet.length > 0) {
      addDataToSheet(missingFunnelStepsFromCurentSheet,currentFunnelName,"11")
    }

  };

}
export default createFunnelStepColumnsIfNeeded;
