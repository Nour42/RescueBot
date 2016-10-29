var radar = document.getElementById('radar'), 
diameter = 300,
radius = diameter / 2,
padding = 14,
ctx = Sketch.create({
  container: radar,
  fullscreen: false,
  width: diameter,
  height: diameter
}),
dToR = function( degrees ){ 
  return degrees * (Math.PI / 180);
},
sweepAngle = 270,
sweepSize = 2,
sweepSpeed = 1.2,
rings = 4,
hueStart = 120,
hueEnd = 170,
hueDiff = Math.abs( hueEnd - hueStart ),
saturation = 50,
lightness = 40,
lineWidth = 2,
gradient = ctx.createLinearGradient( radius, 0, 0, 0 );


radar.style.marginLeft = radar.style.marginTop = ( -diameter / 2 ) - padding + 'px';
gradient.addColorStop( 0, 'hsla( ' + hueStart + ', ' + saturation + '%, ' + lightness + '%, 1 )' );
gradient.addColorStop( 1, 'hsla( ' + hueEnd + ', ' + saturation + '%, ' + lightness + '%, 0.1 )' );

var renderRings = function(){
  var i;
  for( i = 0; i < rings; i++ ){
    ctx.beginPath();
    ctx.arc( radius, radius, ( ( radius - ( lineWidth / 2) ) / rings) * ( i + 1 ), -PI, 0, false );
    ctx.strokeStyle = 'hsla(' + ( hueEnd - ( i * ( hueDiff / rings ) ) ) + ', ' + saturation + '%, ' + lightness + '%, 0.1)';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };
};

var renderGrid = function(){
  ctx.beginPath();
  ctx.moveTo( radius - lineWidth / 2, lineWidth );
  ctx.lineTo( radius - lineWidth / 2, (diameter - lineWidth)/2 );
  ctx.moveTo( lineWidth, radius - lineWidth / 2 );
  ctx.lineTo( diameter - lineWidth, radius - lineWidth / 2 );
  ctx.strokeStyle = 'hsla( ' + ( ( hueStart + hueEnd ) / 2) + ', ' + saturation + '%, ' + lightness + '%, .03 )';
  ctx.stroke();
};

var renderSweep = function(){
  ctx.save();
  ctx.translate( radius, radius );
  ctx.rotate( dToR(sweepAngle) );  
  ctx.beginPath();
  ctx.moveTo( 0, 0 );
  ctx.arc( 0, 0, radius, dToR( -sweepSize ), dToR( sweepSize ), false );
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();  
  ctx.restore();
};

var renderScanLines = function(){
  var i;
  var j;
  ctx.beginPath();
  for( i = 0; i < diameter; i += 2 ){    
    ctx.moveTo( 0, i + .5 );
    ctx.lineTo( diameter, i + .5);
  };
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'hsla( 0, 0%, 0%, .02 )';
  ctx.globalCompositeOperation = 'source-over';
  ctx.stroke();
};

var renderDot = function(angle,distance){
  ctx.beginPath();
  ctx.arc(diameter/2-cos(dToR(angle))*distance, diameter/2-sin(dToR(angle))*distance, 3, 0, Math.PI*2, true);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = 0;
  ctx.stroke();
}

var dots = [];

var updateDots = function(){
  //$.get( "test.cgi", { name: "John", time: "2pm" } )
  //.done(function( data ) {
  //  alert( "Data Loaded: " + data );
  //});
  //for(var i=0;i<36;i++)
  //  dots[i] = Math.floor((Math.random() * diameter/2) + 0); ;
}

var renderDots = function(){
  for(var degree=0;degree<180;degree+=5)
    renderDot(degree,dots[degree/5]/200*diameter/2);
}

ctx.clear = function(){
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'hsla( 0, 0%, 0%, 0.1 )';
  ctx.fillRect( 0, 0, diameter, diameter );
};
  
var forward = true;
ctx.update = function(){
  if(forward)
    sweepAngle += sweepSpeed;
  else
    sweepAngle -= sweepSpeed;
  if(sweepAngle>=360)
    forward = false;
  else if(sweepAngle<=180)
    forward = true;
};

ctx.draw = function(){
  ctx.globalCompositeOperation = 'lighter';
  renderRings();
  renderGrid();
  renderSweep();
  renderScanLines();
  renderDots();
};