'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection("notewall");
	const write=collection.add({
		anhao:event.anhao,
		content:event.content,
		time:new Date().getTime()
	})
	if(write!=null){
		return {
			"code":1,
			"msg":"ok"
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
