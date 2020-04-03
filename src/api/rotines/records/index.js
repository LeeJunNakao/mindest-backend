const RecordGameController = require('../../controller/recordGameController');

async function getUserRecords(req,res,next){
    const user = req.decoded.user._id;
    const records = await RecordGameController.find({ user });
    res.status(200).send(records);
}

module.exports = { getUserRecords }