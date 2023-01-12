
import React from 'react'
import { useSelector } from 'react-redux'

export default function Transaction () {
  const status = useSelector((state) => state.transfer.status)
  return (
      <div> {status} </div>
  )
}
