const fs=require("fs");
const pt=require("path");

window.jsonfile=function config(name,d,ser) {
  if (!d) d={};
  if (!ser) ser={};
  var path=pt.normalize(window.mcpath+"/config/"+name+".config");
  var c;
  try {
    fs.accessSync(path);
    c=JSON.parse(fs.readFileSync(path).toString());
  } catch(e) {
    c={};
  }
  for (var p in c) {
    d[p]=c[p];
  }
  c=d;

  function save() {
    fs.writeFile(path,JSON.stringify(c),function(err) {
      if (err) console.log("save","fail",path,err);
    });
  }

  save();

  function get(key) {
    var a=key.split(".");
    var cc=c;
    a.map(function(k) {
      if (cc) {cc=cc[k];} else {throw "Key "+key+" is missing parent\nAdd it to the defaults";}
    });
    return cc;
  }

  function set(key,val) {
    var a=key.split(".");
    var cc=c;
    var keys=[];
    a.map(function(k) {
      keys.push(k);
    });
    var kk=function(k) {
      keys.push(k);
      if (cc) {
        cc=cc[k];
      } else {
        throw "Key "+key+" is missing parent\nAdd it to the defaults";
      }
    };
    var ccc=val;
    var run=true;
    var lk;
    while(run) {
      lk=keys[keys.length-1];
      delete keys[keys.length-1];
      a=keys;
      keys=[];
      a.map(kk);
      try {
        cc[lk]=ccc;
      } catch(e) {
        var keylist=keys.join(".");
        throw "Key "+keylist+" is missing\nAdd it to the defaults";
      }
      ccc=cc;cc=c;
      if (keys.length===0) {run=false;}
    }
    save();
  }

    function s(key) {
      if (ser[key]) {
        return ser[key](get(key),r);
      } else {
        throw "Cannot ser "+key;
      }
    }

  var r={get:get,g:get,set:set,s:s};

  return r;
};


window.auther=function auther(file) {
  const dras=require("prismarine-yggdrasil");
  const conf=new jsonfile(file);

  function auth(user,pw,store) {
    dras.getSession(user,pw);
  }
  return {auth:auth,a:auth,conf:conf,c:conf};
};

const gui = require('nw.gui');

window.tabs=function(tab) {
  gui.Window.open(app.baseLoc+"?tab="+tab,{toolbar:false,frame:false});
};
