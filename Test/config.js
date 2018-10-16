
const Config={
    api:{
        homeList:"http://openapi.justbon.cn:8392/members/member",
        wetherUrl:"http://api.justbon.com/weather/queryWeatherInfo.json",
        buttoRoleUrl:"http://weblink.justbon.com/getPicByRoleIdAndType.action?roleid=role_30",
        bannerAdsUrl:"http://jcp.justbon.com/api/ads",
        shopMailUrl:"http://jcp.justbon.com/api/frontAd",
        boundHouseUrl:"http://jcp.justbon.com/api/commons/getBindHouseInfo",
        loginUrl:"http://jcp.justbon.com/api/customer/userLogin",
        queryBeam:"http://openapi.justbon.cn/api/scarlettBean/queryScarlettBeam",
        createPayUrl:"http://tokengateway.justbon.com/v1/api/createOrder",
        wechatPayUrl:'https://brcpay.justbon.com/pay/createPayInfo',
    },
};

module.exports = Config;