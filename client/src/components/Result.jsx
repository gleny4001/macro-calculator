import React from 'react'


function Result({macroData, formData}) {
  if (Object.keys(macroData).length === 0) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="result-container">
      <h1>{macroData.totalKcal}</h1>
      <h1>{macroData.totalProtein}</h1>
    </div>
  )
}

export default Result