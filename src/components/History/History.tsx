import React from 'react'
import HistoryList from './HistoryList/HistoryList'
import HistoryStats from './HistoryStats/HistoryStats'
import {
  getPomodorosPerDay,
  getPomodorosPerWeek,
  getPomodorosPerMonth,
  getAveragePomos,
  getTodayPomos,
  getThisWeekPomos,
  getThisMonthPomos,
} from '../../helpers/historyPomodoroParser'

interface Props {
  allPomodorosMade: []
  pomos: Array<{ type: string; name: string; id: number; duration: number; started?: string }>
}

function History(props: Props) {
  const allPomodorosMade = props.allPomodorosMade

  const pomosPerDay = getPomodorosPerDay(allPomodorosMade)
  const pomosPerWeek = getPomodorosPerWeek(pomosPerDay)
  const pomosPerMonth = getPomodorosPerMonth(pomosPerDay)
  const avgPomosPerDay = getAveragePomos(pomosPerDay)
  const avgPomosPerWeek = getAveragePomos(pomosPerWeek)
  const avgPomosPerMonth = getAveragePomos(pomosPerMonth)
  const allTimePomos = allPomodorosMade.length
  const pomosToday = getTodayPomos(pomosPerDay)
  const pomosThisWeek = getThisWeekPomos(pomosPerWeek)
  const pomosThisMonth = getThisMonthPomos(pomosPerMonth)

  return (
    <div className="flex flex-col items-center mt-12 text-sm">
      <HistoryList pomos={props.pomos} />
      <div className="flex space-x-4 text-center">
        <HistoryStats value={pomosToday} label="Today" avg={avgPomosPerDay} />
        <HistoryStats value={pomosThisWeek} label="This Week" avg={avgPomosPerWeek} />
        <HistoryStats value={pomosThisMonth} label=" This Month" avg={avgPomosPerMonth} />
        <HistoryStats value={allTimePomos} label="All time" />
      </div>
    </div>
  )
}

export default React.memo(History)
