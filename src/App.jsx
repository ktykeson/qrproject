import { useState } from 'react'
import './App.css'
import PdfFormFiller from './write_pdf'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <PdfFormFiller />
    </>
  )
}

export default App
