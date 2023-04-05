import React, {useState} from 'react';
import Calories from './Calories';
import Ratio from './Ratio';
import Protein from './Protein';
import Fat from './Fat';
import Carb from './Carb';
import Result from "./Result";
import axios from "axios";

function Form() {

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    calories:"",
    proteinRatio:0,
    fatRatio:0,
    carbRatio:0,
    proteinSource:"",
    fatSource:"",
    carbSource:""
  });
  const [finalData, setFinalData] = useState({});
  
  const formTitles = ["What is your target calories?", "What is ratio?", "Choose your protein source", "Choose your fat source",  "Choose your carb source", ""];
  

  async function postData(e){
    e.preventDefault();
    
    const response =  await axios.post("http://localhost:4000/getData", {formData})
    setFinalData(response.data);
  }

 

  const pageDisplay = () => {
    switch (page){
      case 0 :
        return <Calories formData={formData} setFormData={setFormData} />;
      case 1:
        return <Ratio formData={formData} setFormData={setFormData} />;
      case 2: 
        return <Protein formData={formData} setFormData={setFormData} />;
      case 3:
        return <Fat formData={formData} setFormData={setFormData}/>;
      case 4:
        return <Carb formData={formData} setFormData={setFormData} />;
      case 5:
        return <Result formData={formData} macroData={finalData}/>;
      default:
        return;
      }

  }

  return (
    <form className="form" onSubmit={postData}>
      <div className="form-container">
        <div className="header">
          <h1 className="title">{formTitles[page]}</h1>
        </div>
        <div className="body">{pageDisplay()}</div>
        <div className="footer">
        <button className="button1" style={{visibility: page === 0? "hidden" : "visible"}} type="button" onClick={()=> {setPage((currPage)=> currPage - 1)}}><i className="fa-solid fa-angle-left arrow" ></i></button>

        <button className="button2" type={page === formTitles.length-1? "submit" : "button"} onClick={()=> {
            if(page < formTitles.length-1){
              setPage((currPage)=> currPage +1);
            }
          }} style={{visibility: page > formTitles.length-2? "hidden" : "visible"}}><i className="fa-solid fa-angle-right arrow"></i></button>
        </div>
      </div>
      <div className="progress" style={{visibility: page === formTitles.length-1? "hidden" : "visible"}}>
      <i className="fa-solid fa-circle" style={{color: page === 0? "#37447E" : "#e9ecef"}}></i>
      <i className="fa-solid fa-circle" style={{color: page === 1? "#37447E" : "#e9ecef"}}></i>
      <i className="fa-solid fa-circle" style={{color: page === 2? "#37447E" : "#e9ecef"}}></i>
      <i className="fa-solid fa-circle" style={{color: page === 3? "#37447E" : "#e9ecef"}}></i>
      <i className="fa-solid fa-circle" style={{color: page === 4? "#37447E" : "#e9ecef"}}></i>
      </div>
    </form>
  )
}

export default Form


