const request=require("request");

function download(url,call) {
  console.log("[JSON] "+url);
  request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error) {
      call(null,body);
    } else {
      call(error);
    }
  });
}
module.exports=download;
