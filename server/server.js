const express = require('express');
const axios = require('axios');
const app = express(); 
const cors = require('cors');
const port = 4000;


app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());


app.post("/getData", (req, res) =>{
  const targetKcal = req.body.formData.calories;
  const proteinRatio = req.body.formData.proteinRatio;
  const fatRatio = req.body.formData.fatRatio;
  const carbRatio = req.body.formData.carbRatio;
  const proteinSource = req.body.formData.proteinSource;
  const fatSource = req.body.formData.fatSource;
  const carbSource = req.body.formData.carbSource;
  const getURL = "https://api.edamam.com/api/food-database/v2/parser?app_id=df43b31a&app_key=542ecc8650968563ef453fa88da3502b";
  const postURL = "https://api.edamam.com/api/food-database/v2/nutrients?app_id=df43b31a&app_key=542ecc8650968563ef453fa88da3502b";
  //GET Request to parse and get uri and foodID to post
  try{
    Promise.all([
      axios.get(getURL, {params :{"ingr" : proteinSource}}),
      axios.get(getURL, {params :{"ingr" : fatSource}}),
      axios.get(getURL, {params :{"ingr" : carbSource}}),
  
  ]).then(axios.spread((proteinData, fatData, carbData) => { 
    try{
      //USing data from get requests post data to get macros/gram data
    Promise.all([
      axios.post(postURL, {"ingredients" :[{"quantity":1, "measureURI": proteinData.data.hints[0].measures.filter(obj => obj["label"] === "Gram")[0].uri,"foodId":proteinData.data.parsed[0].food.foodId}]}),
 
      axios.post(postURL, {"ingredients" :[{"quantity":1, "measureURI": fatData.data.hints[0].measures.filter(obj => obj["label"] === "Gram")[0].uri,"foodId":fatData.data.parsed[0].food.foodId}]}),
  
      axios.post(postURL, {"ingredients" :[{"quantity":1, "measureURI": carbData.data.hints[0].measures.filter(obj => obj["label"] === "Gram")[0].uri,"foodId":carbData.data.parsed[0].food.foodId}]})
    
     ]).then(axios.spread(async (data1, data2, data3) => {
      //TODO: calculate calories and grams to match 
          let proteinKcal = data1.data.totalNutrients.ENERC_KCAL.quantity;
          let protein = data1.data.totalNutrients.PROCNT.quantity;
          let proteinFat = data1.data.totalNutrients.FAT.quantity;
          let proteinCarb = data1.data.totalNutrients.CHOCDF.quantity;

          let fatKcal = data2.data.totalNutrients.ENERC_KCAL.quantity;
          let fatProtein = data2.data.totalNutrients.PROCNT.quantity;
          let fat = data2.data.totalNutrients.FAT.quantity;
          let fatCarb = data2.data.totalNutrients.CHOCDF.quantity;


          let carbKcal = data3.data.totalNutrients.ENERC_KCAL.quantity;
          let carbProtein = data3.data.totalNutrients.PROCNT.quantity;
          let carbFat = data3.data.totalNutrients.FAT.quantity;
          let carb = data3.data.totalNutrients.CHOCDF.quantity;

          //Calculate each macros for target calories 
          const proteinTargetGram = (targetKcal * (proteinRatio / 100))/proteinKcal;
          const fatTargetGram = (targetKcal * (fatRatio / 100))/fatKcal;
          const carbTargetGram = (targetKcal * (carbRatio / 100))/carbKcal;
          
          proteinKcal *= proteinTargetGram;
          protein *= proteinTargetGram;
          proteinFat *= proteinTargetGram;
          proteinCarb *= proteinTargetGram;
          
          fatKcal *= fatTargetGram;
          fatProtein *= proteinTargetGram;
          fat *= fatTargetGram;
          fatCarb *= proteinTargetGram; 

          carbKcal *=carbTargetGram;  
          carbProtein *= proteinTargetGram;
          carbFat *= proteinTargetGram;
          carb *= carbTargetGram;

          const totalKcal = (proteinKcal + fatKcal + carbKcal).toFixed(0);
          const totalProtein = (protein + fatProtein + carbProtein).toFixed(0);
          const totalFat = (proteinFat + fat + carbFat).toFixed(0);
          const totalCarb = (proteinCarb + fatCarb + carb).toFixed(0);

          const data = {
            "totalKcal": totalKcal, 
            "totalProtein": totalProtein,
             "totalFat": totalFat,
             "totalCarb": totalCarb, 
             "proteinTargetGram": proteinTargetGram.toFixed(0),
             "fatTargetGram": fatTargetGram.toFixed(0),
             "carbTargetGram":carbTargetGram.toFixed(0)
            };
            console.log(data);
            res.json(data);
          
    }))
    }catch(err) { console.log(err); }
  }));
  }
  catch (err) { console.error(err); }
});


app.listen({port}, ()=>{console.log('listening on port ' + port)});



//EDAMAN
//appid : df43b31a
//app_key : 542ecc8650968563ef453fa88da3502b
//parserURL : https://api.edamam.com/api/food-database/v2/parser?app_id=df43b31a&app_key=542ecc8650968563ef453fa88da3502b&ingr=chicken%20breast&nutrition-type=cooking