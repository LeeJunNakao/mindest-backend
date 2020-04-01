const restful = require('node-restful')


let {History, HistoryData} = require('./userHistory')

History = restful.model('userHistory', History)
History.methods(['get','put','delete','post'])
History.updateOptions({ new: true, runValidators: true})


HistoryData = restful.model('userHistoryData', HistoryData)
HistoryData.methods(['get','put','delete','post'])
HistoryData.updateOptions({ new: true, runValidators: true})

module.exports =  {History,HistoryData}
