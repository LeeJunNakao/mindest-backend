function generateArray(num){
  const array=[]
  for(let i=1;i<=num;i++){
    const number = generateNumber(array,num)
    array.push(number)
  }
  return array
}

function generateNumber(array,num){
  let number = parseInt(Math.random()*num*10)
  while(array.includes(number)){
    console.log('numero repetido', number)
    number = parseInt(Math.random()*num*10)
  }
  return number
}

module.exports = { generateArray }
