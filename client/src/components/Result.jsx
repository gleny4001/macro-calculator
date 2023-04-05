import React from 'react'


function Result({macroData, formData}) {
  if (Object.keys(macroData).length === 0) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="result-container">
      <p>{formData.proteinSource} : {macroData.proteinTargetGram}g</p>
      <p>{formData.fatSource} : {macroData.fatTargetGram}g</p>
      <p>{formData.carbSource} : {macroData.carbTargetGram}g</p>
      <p>Total Kcal : {macroData.totalKcal}</p>
      <p>Protein : {macroData.totalProtein}g</p>
      <p>Fat : {macroData.totalFat}g</p>
      <p>Carb : {macroData.totalCarb}g</p>
    </div>
  )
}

export default Result