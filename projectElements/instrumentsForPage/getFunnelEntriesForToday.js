const numberBetweenPipelinesAndComma =/(?<=\|\|\s)(\d+)/g
 
const getFunnelEntriesForToday = (funnelStepsFromCurentSheet, funnelStepFromToday, funnelStepEntriesFromToday) => {

  var funnelResult = [funnelStepEntriesFromToday[0]]

  for (const funnelStep of funnelStepsFromCurentSheet) {

    const funnelStepIndex = funnelStepFromToday.indexOf(funnelStep)

    if (funnelStepIndex !== -1 && funnelStepIndex !== 1) {  //row is present in todays entries
      const viewsFromADay = funnelStepEntriesFromToday[funnelStepIndex]
      funnelResult.push(viewsFromADay.match(numberBetweenPipelinesAndComma).toString())
    }
  }
  console.log(`On funel ${funnelStepEntriesFromToday[1]} there are next entries: ${funnelResult}`)
  return funnelResult
}

export default getFunnelEntriesForToday;