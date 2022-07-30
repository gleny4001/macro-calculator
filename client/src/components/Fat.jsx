import React from 'react'

function Fat({formData, setFormData}) {
  return (
    <div className="fat-container">
      <input className="input-box" type="text" placeholder="fat" value={formData.fatSource} onChange={(e)=> setFormData({...formData, fatSource: e.target.value})}/>
    </div>
  )
}

export default Fat