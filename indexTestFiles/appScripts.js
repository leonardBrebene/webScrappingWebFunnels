function checkIfNumbersAreTodayDates() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getRange("C2:C" + sheet.getLastRow()).getValues();
    var results = [];

    for (var i = 0; i < data.length; i++) {
        var cellValue = data[i][0];

        if (cellValue !== "") {
            var today = new Date();
            var day = today.getDate();
            var result = cellValue === day ? "Yes" : "No";
            results.push([result]);
        } else {
            results.push([""]); // Blank result for empty cell in column C.
        }
    }

    results.push([today.toISOString()]);
    Logger.log("C2:C" + sheet.getLastRow())

    sheet.getRange(2, 26, results.length, 1).setValues(results);
}

function moveRowFromOneSpredSheetToAnother() {

    var sourceSpreadsheetId = "1tIe5ozyuw0rLT1HArMshsZj5JskZ49gk3e6yHJ_0Wlk"; // Replace with the ID of your source spreadsheet
    var destinationSpreadsheetId = "1uobEYWHhcnYTKyYvgxHtm9rb3H8l7ddV2MaPzx1Gxd0"; // Replace with the ID of your destination spreadsheet

    var sourceSpreadsheet = SpreadsheetApp.openById(sourceSpreadsheetId);
    var sourceSheet = sourceSpreadsheet.getSheetByName('Completed Orders'); // Change 'Sheet1' to the actual name of your source sheet

    var destinationSpreadsheet = SpreadsheetApp.openById(destinationSpreadsheetId);
    var destinationSheet = destinationSpreadsheet.getSheetByName('Sheet1'); // Change 'Products' to the actual name of your destination sheet

    var lastRowWritten = sourceSheet.getLastRow()
    var lastRow = sourceSheet.getRange("A" + lastRowWritten + ":" + "Z" + lastRowWritten).getValues()[0];

    Logger.log(lastRow)
    Logger.log(lastRowWritten)

    // Append the values to the destination sheet
    destinationSheet.appendRow(lastRow);
}

function sendSlackMsgOnEdit() {

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();
    var lastRowWritten = sheet.getLastRow()
    var lastRow = sheet.getRange("A" + lastRowWritten + ":" + "K" + lastRowWritten).getValues();
    var lastRowFormatted = lastRow.toString().replaceAll(",,", "\n").replaceAll(",", "\n")
    Logger.log(lastRowFormatted);

    var payload = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
            text: lastRowFormatted
        }),
        muteHttpExceptions: true,
    }
    var response = UrlFetchApp.fetch("https://hooks.slack.com/services/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", payload);

    Logger.log(response.getContentText());


}

function sortDataForHarrysAndJansTable() {
    var JansSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Jan");
    var rangeJan = JansSheet.getRange("A2:Z"); // Adjust the range to match your data
    rangeJan.sort({ column: 2, ascending: false }); // Sort by the first column (change the column number as needed)

    var HarrysSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Harry");
    var rangeHarry = HarrysSheet.getRange("A2:Z"); // Adjust the range to match your data
    rangeHarry.sort({ column: 2, ascending: false });
}

function writeDateToFirstEmptyCell() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();

    var data = sheet.getRange("A:A").getValues();

    var emptyCellIndex = data.findIndex(cellValue => cellValue[0] === "");

    // If there is an empty cell, write the current date to it
    if (emptyCellIndex !== -1) {
        var rowToUpdate = emptyCellIndex + 1; // Adjust for 1-based index
        var currentDate = new Date();
        sheet.getRange(rowToUpdate, 1).setValue(currentDate);
        Logger.log("Date written to K" + rowToUpdate + ": " + currentDate);
    } else {
        Logger.log("No empty cell found in column k");
    }
}

function sendDataToRequiredSheets() {
    var sourceSpreadsheet = SpreadsheetApp.getActiveSheet();
    var sourceSheet = sourceSpreadsheet.getSheetByName('HistoricalData')

    var lastRowWritten = sourceSheet.getLastRow()
    var lastRow = sheet.getRange("A" + lastRowWritten + ":" + "AE" + lastRowWritten).getValues();
}

function sendDataToRequiredSheets() {

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName('HistoricalData')

    var lastRowIndex = sheet.getLastRow()
    Logger.log("(lastRowIndex); " + lastRowIndex);

    var lastRowDate = sheet.getRange("A" + lastRowWritten).getValues();
    Logger.log("(lastRowDate); " + lastRowDate);
    var currentDate = lastRow[0]
    var previousRow

    while (true) {
        lastRowIndex -= lastRowIndex
        var previousRow = sheet.getRange("A" + lastRowWritten).getValues();
        var previousDate = previousRow[0]
        if (currentDate !== previousDate) {
            break
        }
    }
    Logger.log(lastRow[0][0]);
}

function copyDataWithoutValue() {
    var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("test1");
    var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("test2");
  
    if (sourceSheet && targetSheet) {
      var sourceData = sourceSheet.getDataRange().getValues();
      var filteredData = [];
  
      for (var i = 0; i < sourceData.length; i++) {
        var row = [];
        for (var j = 0; j < sourceData[i].length; j++) {
          const ceva =sourceData[i][j];
          if (sourceData[i][j].toString().includes("VALUE")||sourceData[i][j].toString().includes("|| 0") ) {
            sourceData[i][j]="";
          }
        }
       
      }
  
      targetSheet.getRange("A1:Z65").setValues(sourceData);
      Logger.log("Data copied successfully!");
    } else {
      Logger.log("Sheets not found!");
    }
  }

  
  function copyDataWithoutValue2() {
    var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("test2");
    var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("test3");
  
    if (sourceSheet && targetSheet) {
      var sourceData = sourceSheet.getDataRange().getValues();
      var filteredData = [];
  
      for (var i = 0; i < sourceData.length; i++) {
        var row = [];
        for (var j = 0; j < sourceData[i].length; j++) {
         
            sourceData[i][j]=sourceData[i][j].replace(/\s*\|\|\s*\d+$/, '');
          
        }
       
      }
  
      targetSheet.getRange("A1:X65").setValues(sourceData);
      Logger.log("Data copied successfully!");
    } else {
      Logger.log("Sheets not found!");
    }
  }
  
