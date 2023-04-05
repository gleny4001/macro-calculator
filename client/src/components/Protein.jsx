import React from 'react'

function Protein({formData, setFormData}) {
  return (
    <div className="protein-container">
      <p className="info">Please specify food to get more accurate data (eg. cooked skinless chicken breast)</p>
      <input className="input-box" type="text" placeholder="Protein" value={formData.proteinSource} onChange={(e)=> setFormData({...formData, proteinSource: e.target.value})}/>
      </div>
  )
}

export default Protein