'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	console.log("1-----------------1");
	const collection = db.collection("notewall");
	const note=await collection.where({
		anhao:event.anhao
	}).limit(event.page).get()
	
	let res;
	if(note!=null){
		res={
			"code":1,
			"msg":"ok",
			note
		}
	}
	else{
		res={
			"code":2,
			"msg":"fail"
		}
	}
	//返回数据给客户端
	return res;
};
