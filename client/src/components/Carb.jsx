import React from 'react'

function Carb({formData, setFormData}) {
  return (
    <div className="carb-container">
      <input className="input-box" type="text" placeholder="Carb" value={formData.carbSource} onChange={(e)=> setFormData({...formData, carbSource: e.target.value})}/>
    </div>
  )
}

export default Carb