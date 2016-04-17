
 ////////  y_player////////
var y_player = function(x,y,z,speed,mesh)
{ 
	 this.did_init = false;
	 this.type = 'y_player'; 

	 y_entity.call(this,x,y,z,speed,mesh); 
	 this.power = "shrink";//explode,poison,slice,shrink
	//game div ofset
	this.offset = $("#y_game").offset();
} 
 
 y_player.prototype= new y_entity(); 
 
 var y_player_p = y_player.prototype; 
 
 y_player_p.init = function()
{

 if(this.did_init){return;}//if did init escape 

}//end init 

y_player_p.update = function()
{
	this.init();
	this.move();
	 y_entity_p.update.call(this); 

}//end update 

y_player_p.move = function()
{
	
	//get xy
	ymouce = y_input2_p.mouse_cor.y-this.offset.top;
	xmouce = y_input2_p.mouse_cor.x-this.offset.left;
	
	//do simple easing
	yDifference = Math.round(ymouce-this.y);
	y_Amount_to_Move_Ship = Math.round(yDifference / 10);
	this.y = y_Amount_to_Move_Ship + this.y ;
	//this.y = ymouce;
	
	xDifference = Math.round(xmouce-this.x);
	x_Amount_to_Move_Ship = Math.round(xDifference / 10);
	this.x = x_Amount_to_Move_Ship + this.x ;
	//this.x = xmouce;
	
	y_entity_p.move_by.call(this,0,0,1);
	
	//rotation
	angle_in_radians = Math.atan2(ymouce, xmouce);
	angle_in_degrees = Math.round((angle_in_radians*180/Math.PI));
	y_entity_p.rotate.call(this,angle_in_degrees*2);
	
	
	
}//end move

 //////// end y_player////////
