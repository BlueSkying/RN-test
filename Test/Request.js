
const  Request = {
    get:(url,successCallback,failCallBack) =>{
        console.log(url);
        return fetch(url,{
            method:"GET",
            headers:{
                // Accept:'application/json',
                "Content-Type":"text/x-json",
                "version":"200",
                "clientId":"10101",
            },
        })
            .then((response)=>response.json())
            .then((reshonse)=>{
                successCallback(reshonse);
            })
            .catch((error)=>{
                failCallBack(error);
            });
    },
    post:(url,dic,successCallback,failCallBack) =>{
        let token = this.loadFromLocal();
        console.log('token1==' + token);
        return fetch(url,{
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json",
                "version":"200",
                "clientId":"10101",
                "token":'34FA9F5F826C927FF83E765D33F05ED5',
            },
            body:JSON.stringify(dic)
        })  .then((response)=>response.json())
            .then((reshonse)=>{
                successCallback(reshonse);
            })
            .catch((error)=>{
                failCallBack(error);
            })
    },
};

//加载本地缓存数据  A272BBCAFE9E34A8E28B59A80EA0C474
loadFromLocal = async()=>{
    let oldData = await global.storage.load({
        key:'recommendList'
    })
    let token = oldData['token'];
    console.warn('token==' + token);
    return token;
}

module.exports = Request;