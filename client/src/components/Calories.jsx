import React from 'react'


function Calories({formData, setFormData}) {
  return (
    <div className="calories-container">
      <input className="input-box" min="0" max="10000" type="number" placeholder="kcal" value={formData.calories} onChange={(e)=> setFormData({...formData, calories: e.target.value})}/>

    </div>
  )
}

export default Calories