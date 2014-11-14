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
  var drawBox = function(x, y, width, height){
    canvasContex.fillStyle = "#FFFFFF";
    canvasContex.fillRect(x,y,width,height);
  }

  return {
    init: init,
    reInit: reInit,
    cleanScreen: cleanScreen,
    putText: putText,
    addKeyHook: addKeyHook,
    addResizeHook: addResizeHook,
    drawBox: drawBox
  }
})();
var game=(function(){
  var players=[{width: 20,height: 200, x:100,y:100,points:0},{width: 20,height: 200, x:1800,y:100,points:0}];
  var playerOneMoveUp = function(){}
  var playerOneMoveDown = function(){}
  var playerTwoMoveUp = function(){}
  var playerTwoMoveDown = function(){}
  var drawScreen = function(){
    canvasScreen.cleanScreen();
    canvasScreen.drawBox(players[0].x,players[0].y,players[0].width,players[0].height);
    canvasScreen.drawBox(players[1].x,players[1].y,players[1].width,players[1].height);
  }

  return {
    playerOneMoveUp: playerOneMoveUp,
    playerOneMoveDown: playerOneMoveDown,
    playerTwoMoveUp: playerTwoMoveUp,
    playerTwoMoveDown: playerTwoMoveDown,
    drawScreen: drawScreen
  }
})();
var onePlayer=null;
var options=null;
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
  game.drawScreen();
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
