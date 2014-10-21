var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var c = document.getElementById("mainCanvas");
c.width = dimension[0];
c.height = dimension[1];
var ctx = c.getContext("2d");
ctx.font = "60px Orbitron";
ctx.fillStyle = "#FF0000";
textWidth = ctx.measureText("pureJSpong").width;
ctx.fillText("pureJSpong",(c.width/2) - (textWidth / 2),200);
