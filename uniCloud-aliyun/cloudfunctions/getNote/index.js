'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection("notewall");
	const note=await collection.where({
		anhao:event.anhao
	}).limit(event.page*20).orderBy("anhao", "desc").get()
	if(note!=null){
		return {
			"code":1,
			"msg":"ok",
			"data":note.data
		}
	}
	else{
		return {
			"code":2,
			"msg":"fail"
		}
	}
	//返回数据给客户端
};
