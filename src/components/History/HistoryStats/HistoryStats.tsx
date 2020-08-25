import React from 'react'

interface Props {
  value: number
  label: string
  avg?: string | number
}

function HistoryStats({ value, label, avg }: Props) {
  return (
    <ul className="">
      <li className="">{value}</li>
      <li className="">{label}</li>
      {avg !== undefined && <li className="text-gray-500">avg. {avg}</li>}
    </ul>
  )
}

export default HistoryStats
