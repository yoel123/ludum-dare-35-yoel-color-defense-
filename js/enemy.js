
 ////////  y_enemy////////
var y_enemy = function(x,y,z)
{ 
	 this.did_init = false;
	 this.type = 'y_enemy';
	 
	 speed = 2;
	 y_entity.call(this,x,y,z,speed,""); 
	 
	 this.hp = 3;
	 this.dmg_efect ="";
	 
	 //colors
	 this.colors = ["red","green","blue"];
	 this.color = "";
	 //target
	 this.targ = {x:0,y:0};
	 //timers
	 this.move_timer =  new y_timer(0.09);
	 this.explode_timer =  new y_timer(2);
	 this.poisen_timer =  new y_timer(0.5);
	 
	 //sound
	 this.explode_sound = new y_sound("sound/Explosion.wav",.12,false);
	 this.slice_sound = new y_sound("sound/slice.wav",.12,false);
	 this.shink_sound = new y_sound("sound/shrink.wav",0,false);
	 
	 this.collision_show =false;
} 
 
 y_enemy.prototype= new y_entity(); 
 
 var y_enemy_p = y_enemy.prototype; 
 
 y_enemy_p.init = function()
{

	 if(!this.did_init)
	 {
		 //change size acording to hp
		 this.width *= (this.hp/2);
		 this.height *= (this.hp/2);	
		 this.hitbox_width *= (this.hp/2);
		 this.hitbox_height *= (this.hp/2);	
		 yw_h(this,this.width,this.height);
		 
		 //change color
		 if(this.color =="")
		 {
			rand_color = y_random(0,2);
			this.color = this.colors[rand_color];
		 }
		 $("#"+this.id).css("background-color",this.color);
		 
		 //set target
		 //get all bases
		 var bases = y_entity_p.get_by_type.call(this,"y_base");
		 //chose one at random
		 rand_b =  Math.round(y_random(0,bases.length-1));
		 //move to
		 this.targ = bases[rand_b];
		 ytrace(this.speed)
		 this.did_init = true;
		 return;
	 }//if did init escape 

}//end init 

 y_enemy_p.update = function()
{
	this.init();
	this.move();
	this.collide();
	this.explode();
	this.slice();
	this.shrink();
	 y_entity_p.update.call(this); 

 }//end update 
 
y_enemy_p.collide = function()
{
	p_hit = ycolide(this,'y_player');
	if(!p_hit){return;}
	
	//set damage type
	this.dmg_efect = p_hit.power;
	
}//end collide
y_enemy_p.move = function()
{
	//if no bases left
	if(game_manager_p.bases < -1)
	{
		//if no bases game over
		game_manager_p.game_over = true;
		return;
	}
	
	this.move_timer.update();
	if( this.move_timer.finished)
	{
		this.move_timer.reset();
		
	}else{return;}
	y_entity_p.move_to.call(this,this.targ );
	
}//end move

y_enemy_p.explode = function()
{
	if(this.dmg_efect !="explode" || this.color !="red"){return;}
	
	this.explode_timer.update();
	if( this.explode_timer.finished)
	{
		//make it grow a little
		options = { to: { width: this.width+50, height: this.height+50 } };
		// explode effect
		$( "#"+this.id ).effect( "explode", options, 500 );
		this.explode_sound .play();
		//remove this
		yremove(this,this);
	}
	
}//end explode
y_enemy_p.slice = function()
{
	if(this.dmg_efect !="slice" || this.color !="green"){return;}
	//if its too small remove it
	if(this.hp<1){yremove(this,this); return;}
	for(i=0;i<=1;i++)
	{
		//create two smaller ones
		enemy = new y_enemy(this.x+(50*i),this.y,0);
		enemy.hp = this.hp/2;
		enemy.color =this.color;
		window.game_world.add(enemy);
		this.slice_sound.play();
		yremove(this,this);
	}
}//end slice
y_enemy_p.shrink = function()
{
	if(this.dmg_efect !="shrink" || this.color !="blue"){return;}
	//first rest dmg type dont want it to happen all the timers
	this.dmg_efect ="";
	by = 1;
	this.width -= by ;
	this.height -= by ;	
	this.hitbox_width -= by ;
	this.hitbox_height -= by ;	
	yw_h(this,this.width,this.height);
	this.shink_sound.play();
	//remove iff too small
	if(this.width<20)
	{
		yremove(this,this);
	}
}//end shrink
y_enemy_p.poison = function(){}//end poison

 //////// end y_enemy////////
