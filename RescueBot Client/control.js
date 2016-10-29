var hostname = window.location.hostname;
function Send(type,command,value,callback,retry=3,timeout=3000)
{
    //h183
    //v163
    //hostname = "192.168.137.4";
    var data = "http://"+hostname+"/arduino/"+type+"/"+command+"/"+value;
    data = "http://"+hostname+"/mailbox/"+type+command+value;
    //data = "http://"+hostname+"/mailbox/"+value;
    var req = new XMLHttpRequest();
    /*req.onreadystatechange = function()
    {
        if (req.readyState == 4 && req.status == 200) 
            if(callback)
                callback(req.responseText);
            else
                console.log(req.responseText);
    };*/
    req.timeout = 3000;
    req.open("GET",data,true);
    req.send(null);
    /*req.timeoutHandler = setTimeout(function()
    {
        //if( retry>0 ) 
        //    Send(type,command,value,callback,retry-1);
        //else
            console.log("send failed: "+data);
    },timeout);*/
}
function Scale( value, r1, r2 ) { 
    return (( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ]).toFixed();
}
padInterface.rightStick.onHoriChange = function(value)
{
    console.log("sending "+Scale( -value, [ -1, 1 ], [ 50, 255 ] ));
    Send("c","h",Scale( -value, [ -1, 1 ], [ 50, 255 ] ));
}

padInterface.rightStick.onVertChange = function(value)
{
    console.log("sending "+Scale( value, [ -1, 1 ], [ 50, 255 ] ));
    Send("c","v",Scale( value, [ -1, 1 ], [ 50, 255 ] ));
}
padInterface.leftPad.hori = 0;
padInterface.leftPad.vert = 0;
padInterface.leftPad.onUpChange = function(value)
{
    if(!value) return;
    padInterface.leftPad.vert-=0.1;
    console.log("sending "+Scale( padInterface.leftPad.vert, [ -1, 1 ], [ 50, 255 ] ));
    Send("c","v",Scale( padInterface.leftPad.vert, [ -1, 1 ], [ 50, 255 ] ));
}
padInterface.leftPad.onDownChange = function(value)
{
    if(!value) return;
    padInterface.leftPad.vert+=0.1;
    console.log("sending "+Scale( padInterface.leftPad.vert, [ -1, 1 ], [ 50, 255 ] ));
    Send("c","v",Scale( padInterface.leftPad.vert, [ -1, 1 ], [ 50, 255 ] ));
}
padInterface.leftPad.onRightChange = function(value)
{
    if(!value) return;
    padInterface.leftPad.hori-=0.1;
    console.log("sending "+Scale( padInterface.leftPad.hori, [ -1, 1 ], [ 50, 255 ] ));
    Send("c","h",Scale( padInterface.leftPad.hori, [ -1, 1 ], [ 50, 255 ] ));
}
padInterface.leftPad.onLeftChange = function(value)
{
    if(!value) return;
    padInterface.leftPad.hori+=0.1;
    console.log("sending "+Scale( padInterface.leftPad.hori, [ -1, 1 ], [ 50, 255 ] ));
    Send("c","h",Scale( padInterface.leftPad.hori, [ -1, 1 ], [ 50, 255 ] ));
}
/*
padInterface.leftStick.onHoriChange = function(value)
{
    console.log("test");
}*/

var cam = document.getElementById("cam");
cam.src = "http://"+hostname+":8080/javascript_simple.html";
function Sendf(command,retry=3,timeout=3000)
{
    //h183
    //v163
    //hostname = "192.168.137.4";
    var data = "http://"+hostname+"/mailbox/"+command;
    var req = new XMLHttpRequest();
    req.timeout = 3000;
    req.open("GET",data,true);
    req.send(null);
}
document.onkeydown = function(e) 
{
    switch (e.keyCode) {
        case 37:
            //alert('left');
            Sendf("cl");
            break;
        case 38:
            //alert('up');
            Sendf("cu");
            break;
        case 39:
            //alert('right');
            Sendf("cr");
            break;
        case 40:
            //alert('down');
            Sendf("cd");
            break;
        case 13:
            Sendf("test");
            break;
    }
}

function enable_camera()
{
    Sendf("s");
    cam.src = cam.src;
}
//mjpg_streamer -i "input_uvc.so -y -n -f 30 -r 320x240" -o "output_http.so -p 8080 -n -w /www/webcam"
//mac	B4:21:8A:F0:33:F4
