var canvasScreen = (function() {
  var keyHooks = [];
  var resizeHooks = [];
  var canvasElement;
  var canvasContex;

  var init = function(selector) {
    canvasElement = document.querySelector(selector);
    canvasElement.width = document.documentElement.clientWidth;
    canvasElement.height= document.documentElement.clientHeight;
    canvasContex= canvasElement.getContext("2d");
    document.onkeydown = checkHook;
    window.onresize = resizeScreen;
  }
  var reInit = function() {
    keyHooks = [];
    resizeHooks = [];
    canvasElement.width = document.documentElement.clientWidth;
    canvasElement.height= document.documentElement.clientHeight;
  }
  var resizeScreen = function() {
    canvasElement.width = document.documentElement.clientWidth;
    canvasElement.height= document.documentElement.clientHeight;
    for (i = 0; i < resizeHooks.length; i++) {
      resizeHooks[i]();
    }
  }
  var addResizeHook = function(functionName) {
    resizeHooks.push(functionName);
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
    reInit: reInit,
    cleanScreen: cleanScreen,
    putText: putText,
    addKeyHook: addKeyHook,
    addResizeHook: addResizeHook
  }
})();
var onePlayer=null;
var options=null
var twoPlayers=function(){
  canvasScreen.reInit();
  canvasScreen.addKeyHook(27,function(){
    canvasScreen.reInit();
    canvasScreen.addKeyHook(40,keyDown);
    canvasScreen.addKeyHook(38,keyUp);
    canvasScreen.addKeyHook(13,menuWrapper.execute);
    canvasScreen.addResizeHook(menuWrapper.printMenu);
    menuWrapper.printMenu();
  });
}
var menuWrapper =(function(){
  var menu = [
    {
        font:60,
        text:"pureJSpong",
        color:"#FFFFFF",
        hoverText: "",
        hoverColor: "",
        top:100,
        hover: 0,
        click: null
    },
    {
        font:40,
        text:"1 Player",
        color:"#999999",
        hoverText: ">1 Player<",
        hoverColor: "#FFFFFF",
        top:200,
        hover: 1,
        click: onePlayer
    },
    {
        font:40,
        text:"2 Players",
        color:"#999999",
        hoverText: ">2 Players<",
        hoverColor: "#FFFFFF",
        top:240,
        hover: 1,
        click: twoPlayers
    },
    {
        font:40,
        text:"Options",
        color:"#999999",
        hoverText: ">Options<",
        hoverColor: "#FFFFFF",
        top:280,
        hover: 1,
        click: options
    }
  ];
  var pom=1;
  var printMenu=function(val)//0-refresh 1-down -1 up
  {
    val = typeof val !== 'undefined' ? val : 0;
    canvasScreen.cleanScreen();
    if(val==1) {
      pom++;
      if(pom==menu.length) pom=0;
    }
    else if(val==-1){
      pom--;
      if(pom==-1) pom=menu.length-1;
    }
    for(var i=0;i<menu.length;i++) {
      if(i==pom && menu[i].hover==0) pom++;
      if(i!=pom)canvasScreen.putText(menu[i].font,menu[i].color,menu[i].text,menu[i].top,"center");
      else canvasScreen.putText(menu[i].font,menu[i].hoverColor,menu[i].hoverText,menu[i].top,"center");
    }

  }
  var execute=function() {
    menu[pom].click();
  }
  return {
    execute: execute,
    printMenu: printMenu
  }


})();

var keyUp = function() {
      menuWrapper.printMenu(-1);
}
var keyDown = function() {
    menuWrapper.printMenu(1);
}
canvasScreen.init("canvas");
canvasScreen.addKeyHook(40,keyDown);
canvasScreen.addKeyHook(38,keyUp);
canvasScreen.addKeyHook(13,menuWrapper.execute);
canvasScreen.addResizeHook(menuWrapper.printMenu);
menuWrapper.printMenu();
