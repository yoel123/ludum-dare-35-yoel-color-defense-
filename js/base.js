
 ////////  y_base////////
var y_base = function(x,y,z,speed,mesh)
{ 
	 this.did_init = false;
	 this.type = 'y_base'; 

	 y_entity.call(this,x,y,z,speed,mesh); 
	 
	 this.spawn_powerup_timer =  new y_timer(5);
	 
	 this.powers = ["explode","slice","shrink"];
	 this.colors = ["red","green","blue"];
	 
	 this.hp = 300;
	 this.collision_show =false;
} 
 
 y_base.prototype= new y_entity(); 
 
 var y_base_p = y_base.prototype; 
 
 y_base_p.init = function()
{

 if(this.did_init){return;}//if did init escape 

 }//end init 

 y_base_p.update = function()
{
	this.init();
	this.spawn_powerup();
	this.collide_enemy();
	 y_entity_p.update.call(this); 

}//end update

y_base_p.spawn_powerup = function()
{
		//update timer
	this.spawn_powerup_timer.update();
	
	//if timer finished
	if(this.spawn_powerup_timer.finished )
	{
		this.create_powerup();
		//reset timer
		this.spawn_powerup_timer.reset()
	}
}//end spawn_powerup

y_base_p.create_powerup = function()
{
		p = new y_powerup(this.x,this.y,0);
		rand = y_random(0,2);
		p.power = this.powers[rand];
		p.color = this.colors[rand];
	
		//add powerup to the game world
		window.game_world.add(p);
}//end create_powerup

y_base_p.collide_enemy = function()
{
	e_hit = ycolide(this,'y_enemy');
	if(!e_hit){return;}
	this.hp--;
	if(this.hp<=0)
	{
		//reduce base count only once
		if(!this.reduce_base)
		{
			this.reduce_base = true;
			game_manager_p.bases--;
			
		}
		//remove it
		yremove(this,this);
		
	}
}//end collide_enemy
 //////// end y_base////////
