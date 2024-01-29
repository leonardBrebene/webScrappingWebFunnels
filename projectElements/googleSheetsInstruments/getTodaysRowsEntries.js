
const getTodaysRowsEntries = (sheet) => {
  const currentDate = sheet[sheet.length-1][1];

  return sheet.filter((value) => {
    return value[1] === currentDate;
  });

}
export default getTodaysRowsEntries;
