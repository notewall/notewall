'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection("notewall");
	const write=collection.add({
		anhao:"张三"
		content:"这是一条留言",
	})
	let res;
	if(write!=null){
		res={
			"code":1,
			"msg":"ok"
		}
	}
	else{
		res={
			"code":2,
			"msg":"fail"
		}
	}
	//返回数据给客户端
	return {
		"code":1,
		"msg":"ok"
	}
};
