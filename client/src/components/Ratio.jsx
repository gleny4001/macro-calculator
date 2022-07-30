import React from 'react'

function Ratio({formData, setFormData}) {
  return (
    <div className="ratio-container">
      <input type="number" placeholder="protein" min="0" max="100" value={formData.proteinRatio} onChange={(e)=> setFormData({...formData, proteinRatio: e.target.value})}/>
      <input type="number" placeholder="fat" min="0" max="100" value={formData.fatRatio} onChange={(e)=> setFormData({...formData, fatRatio: e.target.value})}/>
      <input type="number" placeholder="carb" min="0" max="100" value={formData.carbRatio} onChange={(e)=> setFormData({...formData, carbRatio: e.target.value})}/>
    </div>
  )
}

export default Ratio