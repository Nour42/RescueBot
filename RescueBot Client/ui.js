var hostname = window.location.hostname;
var cam = document.getElementById("cam");
cam.src = "http://"+hostname+":8080/javascript_simple.html";
var consolebox = document.getElementById("console");
var textbox = document.getElementById("textbox");

  //$.get( "test.cgi", { name: "John", time: "2pm" } )
  //.done(function( data ) {
  //  alert( "Data Loaded: " + data );
  //});

var updateDots = function(){
        $.get( "../arduino/scan" )
        .done(function( data ) {
            var raw = data.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
            for(var i=0;i<36;i++)
                dots[i] = parseInt(raw[i]);
        });    
}

function log(text)
{
    consolebox.value = consolebox.value + text + "\n";
    consolebox.scrollTop = consolebox.scrollHeight;
}

function parse(text)
{
    if(text=="help")
    {
        log("Available commands:");
        log("Move the robot");
        log("  [forward/backward/left/right]/speed/time , speed[0-255],time ms");
        log("Turn the camera");
        log("  servo/x/y ,xy[0-180]");
        log("Turn on camera stream");
        log("  stream/");
        log("Perform radar scan:");
        log("  scan/");
        return;
    }
        $.get( "../arduino/"+text )
        .done(function( data ) {
            log( data );
        });       
}

textbox.onkeydown = function(e)
{
    if(e.keyCode == 13)
    {
        log(textbox.value);
        parse(textbox.value);       
    }
}

var x = 90;
var y = 90;
var turnSpeed = 150;
var turnTime = 500;
var forwardSpeed = 255;
var forwardTime = 1000;
var backwardSpeed = 200;
var backwardTime = 1000;

document.onkeydown = function(e)
{
    var focused = document.activeElement;
    if (focused == textbox)
        return;
    if(e.keyCode == 82) //r
    {
        log("r pressed");
        updateDots();
    }
    switch (e.keyCode) {
        case 37:
            log("left pressed");
            $.get( "../arduino/left/150/500" )
            .done(function( data ) {
                log( "left pressed "+ data );
            }); 
            break;
        case 38:
            log("up pressed");
            $.get( "../arduino/forward/150/500" )
            .done(function( data ) {
                log( "up pressed "+ data );
            }); 
            break;
        case 39:
            log("right pressed");
            $.get( "../arduino/right/150/500" )
            .done(function( data ) {
                log( "right pressed "+ data );
            }); 
            break;
        case 40:
            log("down pressed");
            $.get( "../arduino/backward/150/500" )
            .done(function( data ) {
                log( "down pressed "+ data );
            }); 
            break;
    }
    switch (e.keyCode) {
        case 87:
            log("w pressed");
            $.get( "../arduino/servo/"+x+"/"+(y+=15) )
            .done(function( data ) {
                log( "w pressed "+ data );
            }); 
            break;
        case 65:
            log("a pressed");
            $.get( "../arduino/servo/"+(x-=15)+"/"+y )
            .done(function( data ) {
                log( "a pressed "+ data );
            }); 
            break;
        case 83:
            log("s pressed");
            $.get( "../arduino/servo/"+x+"/"+(y-=15) )
            .done(function( data ) {
                log( "s pressed "+ data );
            }); 
            break;
        case 68:
            log("d pressed");
            $.get( "../arduino/servo/"+(x+=15)+"/"+y )
            .done(function( data ) {
                log( "d pressed "+ data );
            }); 
            break;
    }
}