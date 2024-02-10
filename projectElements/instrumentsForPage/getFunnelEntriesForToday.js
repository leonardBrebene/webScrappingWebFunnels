const numberBetweenPipelinesAndComma =/(?<=\|\|\s)(\d+)/g
 
const getFunnelEntriesForToday = (funnelStepsFromCurentSheet, funnelStepFromToday, funnelStepEntriesFromToday) => {

  var funnelResult = [funnelStepEntriesFromToday[0]]

  for (const funnelStep of funnelStepsFromCurentSheet) {

    const funnelStepIndex = funnelStepFromToday.indexOf(funnelStep)

    if (funnelStepIndex !== -1) {  //row is present in todays entries
      const viewsFromADay = funnelStepEntriesFromToday[funnelStepIndex]
      var viewsForASingleFunnelStep = ""
      try {
        viewsForASingleFunnelStep= viewsFromADay.match(numberBetweenPipelinesAndComma).toString()
      } catch (error) {
        viewsForASingleFunnelStep = viewsFromADay
      }
      funnelResult.push(viewsForASingleFunnelStep)
    }
  }
  console.log(`On funel ${funnelStepEntriesFromToday[1]} there are next entries: ${funnelResult}`)
  return funnelResult
}

export default getFunnelEntriesForToday;