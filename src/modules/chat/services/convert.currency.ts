import axios from "axios";

const consultCurrency = async () => {
  const { data: currencyInfo } = await axios.get(
    `https://openexchangerates.org/api/latest.json?app_id=${process.env.API_KEY_CURRENCY}`
  );
  const {rates}= currencyInfo;

  return rates;
  
};


export const convertCurrency = async(option:string,value:string, currency:string[]) => {
  const currencyData= await consultCurrency();
  if(option==="1"){
   return  (parseFloat(value)/currencyData[currency[0]]).toFixed(2)
  }else{
    return (parseFloat(value)  *currencyData[currency[0]]).toFixed(2)
  }
    
  

};
