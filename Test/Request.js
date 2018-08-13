
const  Request = {
    get:(url,successCallback,failCallBack) =>{
        console.log(url);
        return fetch(url)
            .then((response)=>response.json())
            .then((reshonse)=>{
                successCallback(reshonse);
            })
            .catch((error)=>{
                failCallBack(error);
            });
    },
    post:(url,dic,successCallback,failCallBack) =>{
        console.log(url);
        return fetch(url,{
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
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