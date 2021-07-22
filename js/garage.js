garage={
    open:false,
    x:100,
    y:100,
    width:400,
    height:300,
    numPanz:0,
    init:function()
    {
       this.x=screenWidth/2-this.width/2;
       this.y=screenHeight/2-this.height/2; 
    },
    start:function()
    {
        this.init();
        console.log('GARAGE');
        pause=true;
        this.open=true;
        if (this.open==true)  timerId=setInterval(function(){
            garage.update()
        },50);
    }, 
    close:function()
    {
        pause=false;
        this.open=false;
    },
    draw:function()
    {
        context.fillStyle="#000000";
        context.fillRect(this.x,this.y,this.width,this.height);
        let n=this.numPanz;
        let x=this.x;
        let y=this.y;
        let xRect=30, yRect=30,widthRect=40, heightRect=40;
        let towerX=panzerInGarageArr[n].mixTowerPosX-panzerInGarageArr[n].mixTowerX;
        let towerY=panzerInGarageArr[n].mixTowerPosY-panzerInGarageArr[n].mixTowerY;
        
        context.fillStyle="#888888";
        context.fillRect(x+xRect,y+yRect,40,40);
      //  panzerInGarageArr[n].x=x+widthRect/2-panzerAiGarage[n].width/2;
      //  panzerInGarageArr[n].y=y+heightRect/2-panzerAiGarage[n].height/2;
     //   drawPanzer(context,panzerInGarageArr[n],camera,scale);
        context.drawImage(imageArr.get(panzerInGarageArr[n].bodyNameImage),
                        x+xRect+ widthRect/2-panzerInGarageArr[n].width/2,
                        y+yRect+ heightRect/2-panzerInGarageArr[n].height/2,);
        context.drawImage(imageArr.get(panzerInGarageArr[n].towerNameImage),
                        x+xRect+ widthRect/2-panzerInGarageArr[n].width/2+towerX,
                        y+yRect+ heightRect/2-panzerInGarageArr[n].height/2+towerY);
        context.fillStyle="#FF0000";
        context.font = '16px Arial';
        let mixX=80;
        let mixY=42;
        let dy=25;
        context.fillText("Броня", this.x+mixX,this.y+mixY+dy*0);
        context.fillText("Скорострельность", this.x+mixX,this.y+mixY+dy*1);
        context.fillText("Урон", this.x+mixX,this.y+mixY+dy*2);
        context.fillText("Скорость", this.x+mixX,this.y+mixY+dy*3);
        context.fillText("Точность", this.x+mixX,this.y+mixY+dy*4);
        
    },
   
    update: function()
    {
        if (keyUpDuration("Escape",100))
        {
            this.close();
        }
    }
    
}
