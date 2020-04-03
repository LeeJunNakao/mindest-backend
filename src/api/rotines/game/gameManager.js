const Numemoria = require('./classes/Numemoria');
const Memorando=require('./classes/Memorando');
const NullGame = require('./classes/NullGame');

module.exports = (name)=>{
    switch(name){
        case 'numemoria':
            return Numemoria;
        case 'memorando':
            return Memorando;
        default:
            return NullGame;
    }
}