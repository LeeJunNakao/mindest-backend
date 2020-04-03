class Numemoria{

    static sendInfo(level,res){
      const array = this.createArray(level);
      return res.status(200).send({ itens: array });
    }
    
    static createArray(level){
      const array=[]
  
      for(let i=1;i<=level;i++){
        const number = this.generateNumber(array,level)
        array.push(number)
      }
  
      return array
    }
  
    static generateNumber(array,level){
      let number;
      do{
        number = parseInt(Math.random()*level*10)
      }
      while(array.includes(number))
      return number
    }
  }

module.exports = Numemoria;