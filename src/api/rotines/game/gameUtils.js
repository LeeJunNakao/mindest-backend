function generateArrayOfRandomNumbers(max,min,lenght){
  const arrayOfNumber = [];

  const generateRandomNumber = ()=>{
    let number;
    do{
      number = parseInt(Math.random()*(max-min))+min;
    }while(arrayOfNumber.includes(number))
    return number;
  }

  for(let i=1; i<=lenght; i++){
    arrayOfNumber.push(generateRandomNumber());
  }

  return arrayOfNumber;
}

module.exports = { generateArrayOfRandomNumbers }
