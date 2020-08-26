import React from 'react'
import HistoryListItem from './HistoryListItem/HistoryListItem'

interface Props {
  pomos: Array<{ id: number; name: string; duration: number; started?: string }>
}

function HistoryList({ pomos }: Props) {
  return (
    <div className="inline-block mb-4">
      <table>
        <thead className="text-left">
          <tr>
            <th className="px-4 py-1">Type</th>
            <th className="px-4 py-1">Length</th>
            <th className="px-4 py-1">Started</th>
          </tr>
        </thead>
        <tbody>
          {pomos.map((pomo) => (
            <HistoryListItem
              key={pomo.id}
              name={pomo.name}
              duration={pomo.duration}
              started={pomo.started}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryList
