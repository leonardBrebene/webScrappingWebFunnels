
const getMissingFunnelStepsFromCurentSheet = (funnelStepsFromCurentSheet, funnelStepsFromTodaysEntries, requiredFunnelSteps) => {
  var missingFunnelStepsFromCurentSheet = [];

  funnelStepsFromTodaysEntries.forEach(funnelStep => {
    //if funnel step is absent from sheet and funnel step is present on requiredFunnelSteps
    if (funnelStepsFromCurentSheet.indexOf(funnelStep) === -1 && requiredFunnelSteps.indexOf(funnelStep) !== -1) {
      missingFunnelStepsFromCurentSheet.push(element);
    }
  });
return missingFunnelStepsFromCurentSheet
}
export default getMissingFunnelStepsFromCurentSheet;
