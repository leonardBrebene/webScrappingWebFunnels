
const getIndexOfFunnel = (funnelNamesAndStepsFromTodaysEntries, sheetName) => {
  for (let index = 0; index < funnelNamesAndStepsFromTodaysEntries.length; index++) {
    if (funnelNamesAndStepsFromTodaysEntries[index][1] === sheetName) {
      return index
    };
  }
  return -1;
}
export default getIndexOfFunnel;