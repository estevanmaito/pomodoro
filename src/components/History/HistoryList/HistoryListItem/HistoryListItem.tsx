import React from 'react'

import date from '../../../../helpers/formatDate'

interface Props {
  name: string
  duration: number
  started?: string
}

function HistoryListItem({ name, duration, started }: Props) {
  return (
    <tr>
      <td className="px-4 py-1">{name}</td>
      <td className="px-4 py-1">{date.printFromSeconds(duration)}</td>
      <td className="px-4 py-1">{started}</td>
    </tr>
  )
}

export default HistoryListItem
