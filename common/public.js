module.exports = {
	/**
	 * @description 获取当前时间戳, 精确到秒
	 */
	getCurrTimestamp: function(){
		return Date.parse(new Date())/1000;
	},
	
	/**
	 * 格式化时间 例：20180604
	 */
	getIntDate: function(date) {
	  date = new Date(date)
	  let day = date.getDate()
	  let month = date.getMonth() + 1
	  let year = date.getFullYear()
	  if (day < 10) {
	    day = '0' + day
	  }
	  if (month < 10) {
	    month = '0' + month
	  }
	  return year.toString() + month.toString() + day.toString()
	},
	
	getNowFormatDate: function() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}
}
