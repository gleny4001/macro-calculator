import React from 'react'

function Protein({formData, setFormData}) {
  return (
    <div className="protein-container">
      <input className="input-box" type="text" placeholder="Protein" value={formData.proteinSource} onChange={(e)=> setFormData({...formData, proteinSource: e.target.value})}/>
      </div>
  )
}

export default Protein