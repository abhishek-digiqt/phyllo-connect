!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.PhylloConnectSDK=o():e.PhylloConnectSDK=o()}(self,(function(){return e={717:e=>{const o={sandbox:"http://localhost:3000/",production:"http://localhost:3000/"};e.exports={clientConnect:async(e,r,t,n,i=null)=>{try{return(e=>{if(!e.env||!["sandbox","production"].includes(e.env))throw new Error("Please Provide Valid Environment");if(!e.userId)throw new Error("Please Provide User Id");if(!e.appName)throw new Error("Please Provide App Name");if(!e.token)throw new Error("Please Provide Token")})({env:e,userId:r,token:t,appName:n}),`${o[e]}?userId=${r}&appName=${n}&workPlatformId=${i}&redirectURL=${window.location.href}&token=${t}&env=${e}`}catch(e){console.error(e)}}}}},o={},function r(t){var n=o[t];if(void 0!==n)return n.exports;var i=o[t]={exports:{}};return e[t](i,i.exports,r),i.exports}(717);var e,o}));