import React, { useContext } from 'react'
import noteContext  from './context/Notes/noteContext'

export default function About() {
  const a=useContext(noteContext)
  return (
    <div>This is about</div>
  )
}
    