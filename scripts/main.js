/*var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var c = document.getElementById("mainCanvas");
c.width = dimension[0];
c.height = dimension[1];
var ctx = c.getContext("2d");
ctx.font = "60px Orbitron";
ctx.fillStyle = "#FFFFFF";
textWidth = ctx.measureText("pureJSpong").width;
ctx.fillText("pureJSpong",(c.width/2) - (textWidth / 2),100);
ctx.font = "40px Orbitron";
textWidth = ctx.measureText(">1 Player<").width;
ctx.fillText(">1 Player<",(c.width/2) - (textWidth / 2),200);
ctx.fillStyle = "#999999";
textWidth = ctx.measureText("2 Players").width;
ctx.fillText("2 Players",(c.width/2) - (textWidth / 2),240);
textWidth = ctx.measureText("Options").width;
ctx.fillText("Options",(c.width/2) - (textWidth / 2),280);
var writeText=function(text,size,top,color){
    ctx.fillStyle = color;
    ctx.font = size+"px Orbitron";
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text,(c.width/2) - (textWidth / 2),top);
}*/
var menu = [{font:60, text:"pureJSpong",color:"#FFFFFF", top:100},{font:40, text:"1 Player",color:"#999999", top:200},{font:40, text:"2 Players",color:"#999999", top:240},{font:40, text:"Options",color:"#999999", top:280}];
//document.onkeydown = checkKey;
var pom=1;
/*function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        ctx.clearRect(0,0,c.width,c.height);
        pom--;
        if(pom<1)pom=3;
        for(var i=0;i<4;i++) {
            if(i!=pom)writeText(menu[i].text,menu[i].font,menu[i].top,menu[i].color);
            else writeText(">"+menu[i].text+"<",menu[i].font,menu[i].top,"#FFFFFF");
        }
    }
    else if (e.keyCode == '40') {
        ctx.clearRect(0,0,c.width,c.height);
            pom++;
            if(pom>3)pom=1;
        for(var i=0;i<4;i++) {
            if(i!=pom)writeText(menu[i].text,menu[i].font,menu[i].top,menu[i].color);
            else writeText(">"+menu[i].text+"<",menu[i].font,menu[i].top,"#FFFFFF");
        }
        // down arrow
    }
}*/
//====Screen class basic methods and hooks
var canvasScreen = (function() {
  var keyHooks = [];
  var canvasElement;
  var canvasContex;

  var init = function(selector) {
    canvasElement = document.querySelector(selector);
    canvasElement.width = document.documentElement.clientWidth;
    canvasElement.height= document.documentElement.clientHeight;
    canvasContex= canvasElement.getContext("2d");
    document.onkeydown = checkHook;
  }


  var addKeyHook=function(code,functionName) {
    keyHooks.push({key:code, func:functionName});
  };

  var checkHook = function(e) {
    e = e || window.event;
    keyHooks.some(function(keyObject) {
      if(e.keyCode === keyObject.key){
        keyObject.func();
        return true;
      }
    });
  };

  var cleanScreen = function() {
    canvasElement.width = canvasElement.width;
  };

  var putText=function(size, color, text,top,left) {
    canvasContex.font = size+"px Orbitron";
    canvasContex.fillStyle = color;
    var textWidth = canvasContex.measureText(text).width;
    if(typeof left === 'string' && left==="center") left=(canvasElement.width/2) - (textWidth / 2);
    canvasContex.fillText(text,left,top);
  };

  return {
    init: init,
    cleanScreen: cleanScreen,
    putText: putText,
    addKeyHook: addKeyHook
  }
})();

var keyUp = function() {
    canvasScreen.cleanScreen();
    pom--;
        if(pom<1)pom=3;
        for(var i=0;i<4;i++) {
            if(i!=pom)canvasScreen.putText(menu[i].font,menu[i].color,menu[i].text,menu[i].top,"center");
            else canvasScreen.putText(menu[i].font,"#FFFFFF",">"+menu[i].text+"<",menu[i].top,"center");
        }
}
var keyDown = function() {
    canvasScreen.cleanScreen();
    pom++;
            if(pom>3)pom=1;
        for(var i=0;i<4;i++) {
            if(i!=pom)canvasScreen.putText(menu[i].font,menu[i].color,menu[i].text,menu[i].top,"center");
            else canvasScreen.putText(menu[i].font,"#FFFFFF",">"+menu[i].text+"<",menu[i].top,"center");
        }
}

canvasScreen.init("canvas");
canvasScreen.addKeyHook(40,keyDown);
canvasScreen.addKeyHook(38,keyUp);
keyUp();
keyDown();
