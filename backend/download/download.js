const sha1 = require('sha1'); //usage sha1()
const pt=require("path");
const fs=require("fs");
const https = require('https');
const mk = require("mkdirp");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function match(path,sha,size) {
  try {
    if (size) {
      return (fs.statSync(path).size==size);
    }
    return (sha1(fs.readFileSync(path))==sha);
  } catch(e) {
    return false;
  }
}

function download(data,path,c) {
  data.sha1=data.sha1 || data.hash || "unkown";
  if (data.path) {
    if (path) {
      to=pt.normalize(path+"/"+data.path);
    } else {
      to=data.path;
    }
  } else {
    to=path;
  }
  if (match(to,data.sha1,data.size)) {
    //file exists
    console.log("[SKIP] "+to);
    c();
  } else {
    console.log("[DATA] "+data.url+" [TO] "+to);
    mk(pt.parse(to).dir,function() {
      var file = fs.createWriteStream(to);
      https.get(data.url, function(response) {
        response.pipe(file);
        file.once("finish", function() {
          if (match(to,data.sha1)) {
            c();
          } else {
            console.log("[DATA] Hash Error "+sha1(fs.readFileSync(to))+" != "+data.sha1);
            c("Wrong Hash");
          }
        });
      });
    });
  }
}
module.exports=download;
