
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
        return fetch(url,{
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json",
                "version":"200",
                "clientId":"10101",
                "token":global.userToken,
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

module.exports = Request;