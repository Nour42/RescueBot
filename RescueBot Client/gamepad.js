var updater;
var padId;
var padInterface = 
{
    rightStick: {
        onVertChange: function(value){
            console.log("纵向"+value);
        },
        onHoriChange: function(value){
            console.log("横向"+value);
        },
        onPressedChange: function(value){
            console.log("按下"+value);
        }
    },
    leftStick: {
        onVertChange: function(value){
            console.log("纵向"+value);
        },
        onHoriChange: function(value){
            console.log("横向"+value);
        },
        onPressedChange: function(value){
            console.log("按下"+value);
        }        
    },
    rightPad: {
        onTriangleChange: function(value){
            console.log("三角"+value);
        },
        onCircleChange: function(value){
            console.log("圆圈"+value);
        },
        onCrossChange: function(value){
            console.log("叉"+value);
        },
        onSquareChange: function(value){
            console.log("方块"+value);
        },
        onTrigger1Change: function(value){
            console.log("trigger 1 "+value);
        },
        onTrigger2Change: function(value){
            console.log("trigger 2 "+value);
        }
    },
    leftPad: {
        onUpChange: function(value){
            console.log("上"+value);
        },
        onDownChange: function(value){
            console.log("下"+value);
        },
        onLeftChange: function(value){
            console.log("左"+value);
        },
        onRightChange: function(value){
            console.log("右"+value);
        },
        onTrigger1Change: function(value){
            console.log("trigger 1 "+value);
        },
        onTrigger2Change: function(value){
            console.log("trigger 2 "+value);
        }
    }
}
window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    padId = e.gamepad.index;
    update();
});
window.addEventListener("gamepaddisconnected", function(e) {
    window.cancelRequestAnimationFrame(updater);
});
function update()
{
    var pad = navigator.getGamepads()[padId];
    if(!pad) return;
    process(pad);
    updater = window.requestAnimationFrame(update);
}
function process(pad)
{
    processRS(pad);
    processLS(pad);
    processRP(pad);
    processLP(pad);
}
function processRS(pad)
{
    var hori = pad.axes[2].toFixed(1)==0?0:pad.axes[2].toFixed(1);
    var vert = pad.axes[3].toFixed(1)==0?0:pad.axes[3].toFixed(1);
    var pressed = pad.buttons[11].pressed;
    if(processRS.old.hori!=hori)
        padInterface.rightStick.onHoriChange(hori);
    if(processRS.old.vert!=vert)
        padInterface.rightStick.onVertChange(vert);
    if(processRS.old.pressed!=pressed)
        padInterface.rightStick.onPressedChange(pressed);
    processRS.old.hori=hori;
    processRS.old.vert=vert;
    processRS.old.pressed=pressed;
}
processRS.old = {hori:0.0,vert:0.0,pressed:false};
function processLS(pad)
{
    var hori = pad.axes[0].toFixed(1)==0?0:pad.axes[0].toFixed(1);
    var vert = pad.axes[1].toFixed(1)==0?0:pad.axes[1].toFixed(1);
    var pressed = pad.buttons[10].pressed;
    if(processLS.old.hori!=hori)
        padInterface.leftStick.onHoriChange(hori);
    if(processLS.old.vert!=vert)
        padInterface.leftStick.onVertChange(vert);
    if(processLS.old.pressed!=pressed)
        padInterface.leftStick.onPressedChange(pressed);
    processLS.old.hori=hori;
    processLS.old.vert=vert;
    processLS.old.pressed=pressed;
}
processLS.old = {hori:0.0,vert:0.0,pressed:false};
function processRP(pad)
{
    var triangle = pad.buttons[3].pressed;
    var cross = pad.buttons[0].pressed;
    var square = pad.buttons[2].pressed;
    var circle = pad.buttons[1].pressed;
    var trigger1 = pad.buttons[5].pressed;
    var trigger2 = pad.buttons[7].value.toFixed(1);
    if(processRP.old.triangle!=triangle)
        padInterface.rightPad.onTriangleChange(triangle);
    if(processRP.old.cross!=cross)
        padInterface.rightPad.onCrossChange(cross);
    if(processRP.old.square!=square)
        padInterface.rightPad.onSquareChange(square);
    if(processRP.old.circle!=circle)
        padInterface.rightPad.onCircleChange(circle);
    if(processRP.old.trigger1!=trigger1)
        padInterface.rightPad.onTrigger1Change(trigger1);
    if(processRP.old.trigger2!=trigger2)
        padInterface.rightPad.onTrigger2Change(trigger2);
    processRP.old.triangle = triangle;
    processRP.old.cross = cross;
    processRP.old.square = square;
    processRP.old.circle = circle;
    processRP.old.trigger1 = trigger1;
    processRP.old.trigger2 = trigger2;
}
processRP.old={triangle:false,cross:false,square:false,circle:false,trigger1:false,trigger2:0.0};
function processLP(pad)
{
    var up = pad.buttons[12].pressed;
    var down = pad.buttons[13].pressed;
    var left = pad.buttons[14].pressed;
    var right = pad.buttons[15].pressed;
    var trigger1 = pad.buttons[4].pressed;
    var trigger2 = pad.buttons[6].value.toFixed(1);
    if(processLP.old.up!=up)
        padInterface.leftPad.onUpChange(up);
    if(processLP.old.down!=down)
        padInterface.leftPad.onDownChange(down);
    if(processLP.old.left!=left)
        padInterface.leftPad.onLeftChange(left);
    if(processLP.old.right!=right)
        padInterface.leftPad.onRightChange(right);
    if(processLP.old.trigger1!=trigger1)
        padInterface.leftPad.onTrigger1Change(trigger1);
    if(processLP.old.trigger2!=trigger2)
        padInterface.leftPad.onTrigger2Change(trigger2);
    processLP.old.up = up;
    processLP.old.down = down;
    processLP.old.left = left;
    processLP.old.right = right;
    processLP.old.trigger1 = trigger1;
    processLP.old.trigger2 = trigger2;
}
processLP.old={up:false,down:false,left:false,right:false,trigger1:false,trigger2:0.0};
//up b12
//down b13
//left b14
//right b15
//vertical axes[1]
//horizontal axes[0]
//press b10

//rvertical axes[3]
//rhorizontal axes[2]
//tri b3
//cross b0
//square b2
//circle b1
//press b11