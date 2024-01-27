function createFunnelStepColumnsIfNeeded(funnelNamesFromTodaysEntries, todaysEntries) {
    for (var i = 0; i < funnelNamesFromTodaysEntries.length; i++) {
        var todaysEntriesOnCurrentFunnel = todaysEntries[i]
        var currentFunnelName = funnelNamesFromTodaysEntries[i]

        var funnelStepsFromCurentSheet = getFunnelStepsFromSheet(currentFunnelName)
        var funnelStepsFromTodaysEntries = getFunnelStepsFromTodaysEntries(todaysEntriesOnCurrentFunnel)
        var missingFunnelStepsFromCurentSheet = getMissingFunnelStepsFromCurentSheet(funnelStepsFromCurentSheet, funnelStepsFromTodaysEntries)

        Logger.log("currentFunnelName: " + currentFunnelName);
        Logger.log("missingFunnelStepsFromCurentSheet: " + missingFunnelStepsFromCurentSheet);

        if (missingFunnelStepsFromCurentSheet.length > 0) {
            var actualSheet = spreadsheet.getSheetByName(currentFunnelName)
            actualSheet.getRange(1, funnelStepsFromCurentSheet.length + 2, 1, missingFunnelStepsFromCurentSheet.length).setValues([missingFunnelStepsFromCurentSheet]);
        }
    }
}

function createSheetsIfNeeded(funnelNames) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    for (var i = 0; i < funnelNames.length; i++) {
        var funnelName = funnelNames[i].toString();
        if (!spreadsheet.getSheetByName(funnelName)) {
            spreadsheet.insertSheet(funnelName);
            Logger.log('Sheet created: ' + funnelName);
        }
    }
}

function getFirstRowIndex(firstRowIndex, currentDate) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName('HistoricalData')

    while (true) {
        firstRowIndex = firstRowIndex - 1
        var previousDate = sheet.getRange("A" + firstRowIndex).getValues().toString();
        if (currentDate !== previousDate) {
            firstRowIndex = firstRowIndex + 1
            break
        }
    }
    return firstRowIndex
}

function getFunnelStepsFromSheet(funnelName) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var currentSheet = spreadsheet.getSheetByName(funnelName)
    var funnelStepNamesFromCurrentSheetRaw = currentSheet.getRange("B1:Z1").getValues()[0];

    var nonNullValues = funnelStepNamesFromCurrentSheetRaw.filter(function (value) {
        return value !== null && value !== undefined && value !== '';
    });

    return nonNullValues
}

function getFunnelStepsFromTodaysEntries(todaysEntriesOnCurrentFunnelRaw) {
    var todaysEntriesOnCurrentFunnel = todaysEntriesOnCurrentFunnelRaw.filter(function (value) {
        return value !== null && value !== undefined && value !== '';
    });

    var funnelStepsFromCurrentEntries = [];
    for (var i = 2; i < todaysEntriesOnCurrentFunnel.length; i++) {
        funnelStepsFromCurrentEntries.push(todaysEntriesOnCurrentFunnel[i].split(' ||')[0].trim());
    }
    return funnelStepsFromCurrentEntries;
}

function getMissingFunnelStepsFromCurentSheet(funnelStepsFromCurentSheet, funnelStepsFromTodaysEntries) {
    var missingFunnelStepsFromCurentSheet = [];

    for (var i = 0; i < funnelStepsFromTodaysEntries.length; i++) {
        var element = funnelStepsFromTodaysEntries[i];

        if (funnelStepsFromCurentSheet.indexOf(element) === -1) {
            missingFunnelStepsFromCurentSheet.push(element);
        }
    }

    return missingFunnelStepsFromCurentSheet;
}

function sendDataToRequiredSheets() {

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName('HistoricalData')

    var lastRowIndex = sheet.getLastRow()
    var currentDate = sheet.getRange("A" + lastRowIndex).getValues().toString();
    var firstRowIndex = getFirstRowIndex(lastRowIndex, currentDate)

    var funnelNamesRawFromTodaysEntries = sheet.getRange("B" + firstRowIndex + ":" + "B" + lastRowIndex).getValues();
    var funnelNamesFromTodaysEntries = funnelNamesRawFromTodaysEntries.map(function (value) {
        return value[0]
    });
    createSheetsIfNeeded(funnelNamesFromTodaysEntries)

    var todaysEntries = sheet.getRange("A" + firstRowIndex + ":" + "AE" + lastRowIndex).getValues();
    //createFunnelStepColumnsIfNeeded(funnelNamesFromTodaysEntries, todaysEntries)

    for (var i = 0; i < todaysEntries.length; i++) {
        var actualSheet2 = spreadsheet.getSheetByName(todaysEntries[i][1])
        var todaysEntriesFormatted = todaysEntries[i].filter(function (value) {
            return value !== null && value !== undefined && value !== '';
        });

        var actualSheetFunnelSteps = getFunnelStepsFromSheet(todaysEntriesFormatted[1])
        var lastRowIndex = actualSheet2.getLastRow()

        for (var j = 2; j < todaysEntriesFormatted.length; j++) {
            var stepName = todaysEntriesFormatted[j].split(' ||')[0].trim()
            var columnIndex = actualSheetFunnelSteps.indexOf(stepName)
            var allPageViews = todaysEntriesFormatted[j].split(' ||')[1].trim().split(',')[0].trim()

            actualSheet2.getRange(lastRowIndex + 1, columnIndex + 2, 1, 1).setValues([[allPageViews]]);

            Logger.log("todaysEntriesFormatted[j]: " + todaysEntriesFormatted[j]);
            Logger.log("stepName: " + stepName);
            Logger.log("index: " + columnIndex);

        }

    }


}


