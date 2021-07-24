garage={
    open:false,
    x:100,
    y:100,
    width:500,
    height:300,
    numPanz:1,
    maxParamArr:[],
    valuesParam:[],
    init:function()
    {
       this.x=screenWidth/2-this.width/2;
       this.y=screenHeight/2-this.height/2;
       this.maxParamArr=calcMaxParams();
    },
    start:function()
    {
        this.init();
        console.log('GARAGE');
        pause=true;
        resetMouseLeft();
        this.open=true;
        if (this.open==true)  timerId=setInterval(function(){
            garage.update();
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
        let xRect=40, yRect=30,widthRect=40, heightRect=40;
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
        let mixX=100;
        let mixY=42;
        let dy=25;
        context.fillText("Броня", this.x+mixX,this.y+mixY+dy*0);
        context.fillText("Скорострельность", this.x+mixX,this.y+mixY+dy*1);
        context.fillText("Урон", this.x+mixX,this.y+mixY+dy*2);
        context.fillText("Скорость", this.x+mixX,this.y+mixY+dy*3);
        context.fillText("Точность", this.x+mixX,this.y+mixY+dy*4);
        this.valuesParam=this.calcValuesParams(this.numPanz);
        drawListProgressBar(this.valuesParam,this.maxParamArr,x,y,mixX+170,28,dy);
        this.drawArrow(x+25,y+100,0,"#FFFF00");
        this.drawArrow(x+this.width-25,y+100,1,"#FFFF00");
        
        
        
    },
    drawArrow:function(x,y,dir,color)
    {
        context.beginPath();
        context.fillStyle=color;
        context.moveTo(x,y);
        if (dir==0)
        {
            context.lineTo(x-25,y+50);
            
        }else if (dir==1)
        {
            context.lineTo(x+25,y+50);
        }
        context.lineTo(x,y+100);
        context.fill();
    },
    calcValuesParams: function(num)
    {
        let arr=[];
        arr[0]=panzerInGarageArr[num].maxHP;
        arr[1]=panzerInGarageArr[num].attackPatron==false ?
                            panzerInGarageArr[num].timeAttack:
                            panzerInGarageArr[num].timeAttackPatron;
        arr[2]=panzerInGarageArr[num].attackPatron==false ?
                            panzerInGarageArr[num].hitAttack:
                            panzerInGarageArr[num].hitAttackPatron;
        arr[3]=panzerInGarageArr[num].speed;
        arr[4]=panzerInGarageArr[num].accuracy;
        return arr;
    },
    update: function()
    {
        let x=this.x;
        let y=this.y;
        mX=mouseX-mouseOffsetX;
        mY=mouseY-mouseOffsetY;
        if (keyUpDuration("Escape",100))
        {
            this.close();
        }
        if (mouseLeftClick())
        {
            if (mX>x && mX<x+25 && mY>y+100 && mY<y+100+150)
            {
                if (this.numPanz>0)this.numPanz--;
                        else this.numPanz=panzerInGarageArr.length-1;
                this.numPanz%=panzerInGarageArr.length;
                
            }
           console.log("CLICK GARAGE"+(mouseX-x)+" "+(mouseY-y));
        }
            
    },
    
}
