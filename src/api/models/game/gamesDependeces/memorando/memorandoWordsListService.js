const restful = require('node-restful');
let Model = require('./memorandoWordsList');

Model = restful.model('memorandoWords',Model);

Model.methods(['get','put','delete','post']);
Model.updateOptions({ new: true, runValidators: true});

module.exports = Model;
