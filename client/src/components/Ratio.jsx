import React from 'react'

function Ratio({formData, setFormData}) {

  const handleProteinChange = (e) => {
    const newProteinRatio = e.target.value;
    let newFatRatio = formData.fatRatio;
    let newCarbRatio = formData.carbRatio;
    if (newProteinRatio === "100") {
      newFatRatio = "0";
      newCarbRatio = "0";
    }
    else {
      newFatRatio = (100 - parseInt(newProteinRatio) - parseInt(formData.carbRatio) >= 0) ? 100 - parseInt(newProteinRatio) - parseInt(formData.carbRatio) : 0;
    }
    setFormData({...formData, proteinRatio: newProteinRatio, fatRatio: newFatRatio, carbRatio: newCarbRatio});
  }

  const handleFatChange = (e) => {
    const newFatRatio = e.target.value;
    let newProteinRatio = formData.proteinRatio;
    let newCarbRatio = formData.carbRatio;
    if (newFatRatio === "100") {
      newProteinRatio = "0";
      newCarbRatio = "0";
    }
    else {
      newProteinRatio = (100 - parseInt(newFatRatio) - parseInt(formData.carbRatio) >= 0) ? 100 - parseInt(newFatRatio) - parseInt(formData.carbRatio) : 0;
    }
    setFormData({...formData, proteinRatio: newProteinRatio, fatRatio: newFatRatio, carbRatio: newCarbRatio});
  }

  const handleCarbChange = (e) => {
    const newCarbRatio = e.target.value;
    let newProteinRatio = formData.proteinRatio;
    let newFatRatio = formData.fatRatio;
    if (newCarbRatio === "100") {
      newProteinRatio = "0";
      newFatRatio = "0";
    }
    else {
      newProteinRatio = (100 - parseInt(newCarbRatio) - parseInt(formData.fatRatio) >= 0) ? 100 - parseInt(newCarbRatio) - parseInt(formData.fatRatio) : 0;
    }
    setFormData({...formData, proteinRatio: newProteinRatio, fatRatio: newFatRatio, carbRatio: newCarbRatio});
  }

  return (
    <div className="ratio-container">
      <p>Protien</p>
      <input type="range" min="0" max="100" value={formData.proteinRatio} onChange={handleProteinChange}/>
      <p>{formData.proteinRatio}</p>

      <p>Fat</p>
      <input type="range"  min="0" max="100"  value={formData.fatRatio} onChange={handleFatChange}/>
      <p>{formData.fatRatio}</p>
      <p>Carb</p>
      <input type="range"min="0" max="100" value={formData.carbRatio} onChange={handleCarbChange}/>
      <p>{formData.carbRatio}</p>
    </div>
  )
}



export default Ratio