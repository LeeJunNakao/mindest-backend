const MemorandoWordsList = require('../../api/models/game/gamesDependeces/memorando/memorandoWordsListService');
const AddScript = require('../../api/models/game/gamesDependeces/memorando/scripts/add');

async function verifyIfMemorandoWordsListExists(){
    try{
      const wordsList = await  MemorandoWordsList.find();
      if(wordsList.length<1){
        const addScript = new AddScript();
        addScript.initProcess();
      }
    }catch(error){
        console.log(error);
    }
}

verifyIfMemorandoWordsListExists();