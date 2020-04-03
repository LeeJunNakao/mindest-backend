module.exports = (req,res,next)=>{
	res.header('Access-Control-Allow-Origin','https://mindest.herokuapp.com')
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
	res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,token')
	
	next();
}