
 ////////  y_powerup////////
var y_powerup = function(x,y,z)
{ 
	 this.did_init = false;
	 this.type = 'y_powerup'; 
	 speed = 2;
	 y_entity.call(this,x,y,z,speed,"");
	 
	 this.power ="";
	 
	 this.collision_show =false;

} 
 
 y_powerup.prototype= new y_entity(); 
 
 var y_powerup_p = y_powerup.prototype; 
 
 y_powerup_p.init = function()
{

	if(this.did_init){return;}//if did init escape 
	this.did_init = true;
	size=10;
	this.width = size;
	this.height = size;	
	this.hitbox_width = size;
	this.hitbox_height = size;	
	yw_h(this,this.width,this.height);
	//set color
	$("#"+this.id).css("background-color",this.color);
}//end init 

 y_powerup_p.update = function()
{
	this.init();
	this.move();
	this.collide();
	 y_entity_p.update.call(this); 

}//end update 

 y_powerup_p.move = function()
 {
	 y_entity_p.move_by.call(this,0,-this.speed,10);
	 
	 //remove if out of screen
	 if(this.y<0){yremove(this,this);}
 }//end move
 y_powerup_p.collide = function()
 {
	p_hit = ycolide(this,'y_player');
	if(!p_hit){return;}
	p_hit.power = this.power;
	$("#"+p_hit.id).css("background-color",this.color);
	yremove(this,this);
 }//end collide


 //////// end y_powerup////////
