const baseUrl = 'https://unidemo.dcloud.net.cn' 
const request = (url='',type='GET',data={},header={}) => {
    return new Promise((resolve, reject) => {
        uni.request({
			method:type,
			url:url,
			data:data,
			header:header,
			dataType:'json'
		}).then(response => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
			let res=response[1];
            resolve(res.data);
        }).catch(error => {
            reject(error[0])
        })
    });
}
export default request
