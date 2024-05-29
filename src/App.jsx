import { useState } from 'react'
import './App.css'
import PdfFormFiller from './write_pdf'
import PdfFormMembership from './write_membership_certificate'
import RegionRegistrationForm from './pages/RegionRegistrationForm'
import OfficerRegistrationForm from './pages/OfficerRegistrationForm'
import MemberRegistrationForm from './pages/MemberRegistrationForm'
import VehicleRegistrationForm from './pages/VehicleRegistrationForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VehicleRegistrationForm />
      <MemberRegistrationForm />
      <OfficerRegistrationForm />
      <RegionRegistrationForm />
     <PdfFormMembership />
    </>
  )
}

export default App
