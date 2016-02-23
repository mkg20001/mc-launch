const spawn=require("child_process").spawn;
const fs=require("fs");
const unzip=require("unzip");
const exec=require("child_process").execSync;

function argR(ar,j) {
  for (var p in j) {
    ar=ar.map(function(st) {
      //if (typeof st=="string") {
        return st.replace("${"+p+"}",j[p]);
      //}
      //st=st.replace("${"+p+"}",JSON.stringify(j[p]));
      //return st;
    });
  }
  return ar;
}

function game(path,dirs,libs,data) {
  function launch(user) {
    if (!user) user={accessToken:"<YOUR ACCESS TOKEN>",selectedProfile:{name:"<MINECRAFT USERNAME>",id:"<MINECRAFT ID>"}};
    var ar={
      version_name:data.id,
      game_directory:dirs.game,
      assets_root:dirs.assets,
      assets_index_name:data.assets,
      user_type:"mojang", // TODO: find out what this means
      user_properties:JSON.stringify({"twitch_access_token":["0000"]}), // TODO: find out how to get this
      //Stuff from user var
      auth_player_name:user.selectedProfile.name,
      auth_uuid:user.selectedProfile.id,
      auth_access_token:user.accessToken
    };
    var a=argR(data.minecraftArguments.split(" "),ar);
    //console.log("launch",a,libs);
    libs.map(function(l) {
      if (l) {
        console.log(l+" extract lib to "+dirs.natives);
        //fs.createReadStream(l).pipe(unzip.Extract({ path: dirs.natives }));
        exec("cd %d;unzip -o %l 2> /dev/null;exit 0".replace("%d",dirs.natives).replace("%l",l));
      }
    });
    var ja=[].concat("-Djava.library.path="+dirs.natives,["-cp",[].concat([dirs.client+"/minecraft.jar"],libs).join(":"),data.mainClass,],a);
    console.log(ja);
    var p=spawn("java",ja,a);
    p.stdout.pipe(process.stdout);
    p.stderr.pipe(process.stderr);

  }
  return {l:launch,launch:launch};
}
module.exports=game;
