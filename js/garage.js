garage={
    open:false,
    x:100,
    y:100,
    width:500,
    height:270,
    numPanz:0,
    maxParamArr:[],
    valuesParam:[],
    timerId:null,
    timerIdResponse:null,
    buttonArrows:{
                    left:{x:25,y:80,width:25,height:100}, 
                    right:{x:0,y:80,width:25,height:100}
    }, 
    buttonSelectPanz:{x:319,y:160,width:100,height:30,text:"Выбрать!"},
    buttonSellPanz:{x:100,y:160,width:100,height:30,text:"Продать!"},
    init:function()
    {
       this.x=screenWidth/2-this.width/2;
       this.y=screenHeight/2-this.height/2;
       this.maxParamArr=calcMaxParams();
       this.buttonArrows.right.x=this.width-25;
    },
    start:function()
    {
        this.init();
        console.log('GARAGE');
        pause=true;
        resetMouseLeft();
        this.open=true;
        if (this.open==true)  this.timerId=setInterval(function(){
            garage.update();
        },50);
        this.timerIdResponse=setInterval(function(){
            garage.select();
        },50);
        
    }, 
    close:function()
    {
        clearInterval(this.timerId);
        //clearInterval(this.timerIdResponse);
        pause=false;
        this.open=false;
    },
    stop:function()
    {
         clearInterval(this.timerId);
    },
    play:function()
    {
        pause=trie;
        this.open=true;
        this.timerId=setInterval(function(){
             garage.update();
         },50); 
    },
    select:function ()
    {
        if (messageBox.open==true || this.open==true)
        {
            pause=true;
        }else
        {
            pause=false;
        }
        if (messageBox.open==false)
        {
            if (messageBox.response!=0)
            {
             //   messageBox.draw(); messageBox.close();
                    
                if (messageBox.response==1)
                {
                    messageBox.close();
                    messageBox.response=0;
                    this.start();
                   // clearInterval(this.timerIdResponse);
                }
                if (messageBox.response==2)
                {
                    messageBox.close();
                    messageBox.response=0;
                    this.start();
                }
            }
        }
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
           //drawArrowLeft
        this.drawArrow(0);
        this.drawArrow(1);
        context.fillStyle="#FFFF00";   
        context.fillRect(this.x+this.buttonSelectPanz.x,
                            this.y+this.buttonSelectPanz.y,
                            this.buttonSelectPanz.width,this.buttonSelectPanz.height);
        context.fillStyle="#FF0000";          
        context.fillText(this.buttonSelectPanz.text,this.x+this.buttonSelectPanz.x+15,
                            this.y+this.buttonSelectPanz.y+20);
        context.fillStyle="#FFFF00";   
        context.fillRect(this.x+this.buttonSellPanz.x,
                            this.y+this.buttonSellPanz.y,
                            this.buttonSellPanz.width,this.buttonSellPanz.height);
        context.fillStyle="#FF0000";           
        context.fillText(this.buttonSellPanz.text,this.x+this.buttonSellPanz.x+15,
                            this.y+this.buttonSellPanz.y+20);
        context.fillStyle="#FFFFFF";
        quantityPanzer=panzerInGarageArr.length;
        context.fillText((this.numPanz+1)+"/"+quantityPanzer,this.x+5,this.y+20);
        
        
        
        
    },
    drawArrow:function(dir)
    { 
        let xx=dir==0?this.buttonArrows.left.x:this.buttonArrows.right.x;               
        let yy=dir==0?this.buttonArrows.left.y:this.buttonArrows.right.y;
        let width=dir==0?this.buttonArrows.left.width:this.buttonArrows.right.width;
        let height=dir==0?this.buttonArrows.left.height:this.buttonArrows.right.height;
//        let yy=this.buttonArrows.y;
//        let width=this.buttonArrows.width;
//        let height=this.buttonArrows.height;
        context.beginPath();
        context.fillStyle="#FFFF00";       
        context.moveTo(this.x+xx,this.y+yy);
        if (dir==0)
            
        {
            context.lineTo(this.x+xx-width,this.y+yy+height/2);
        }
        else
        {
            context.lineTo(this.x+xx+width,this.y+yy+height/2);
        }
        context.lineTo(this.x+xx,this.y+yy+height);
        context.fill();
       // console.log('arrow left');
    },
    calcValuesParams: function(num)
    {
        let arr=[];
        arr[0]=panzerInGarageArr[num].HP;
        arr[1]=100/(panzerInGarageArr[num].attackPatron==false ?
                            panzerInGarageArr[num].timeAttack:
                            panzerInGarageArr[num].timeAttackPatron);
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
            if (mX>x && mX<x+this.buttonArrows.left.x 
                    && mY>y+this.buttonArrows.left.y &&
                    mY<y+this.buttonArrows.left.y+this.buttonArrows.left.height)
            {
                if (this.numPanz>0)this.numPanz--;
                        else this.numPanz=panzerInGarageArr.length-1;
                this.numPanz%=panzerInGarageArr.length;
                
            }
            //if (mX>x+this.width-25 && mX<x+this.width && mY>y+100 && mY<y+100+150)
            if (mX>x+this.buttonArrows.right.x &&
                    mX<x+this.buttonArrows.right.x+this.buttonArrows.right.width
                    && mY>y+this.buttonArrows.right.y &&
                    mY<y+this.buttonArrows.right.y+this.buttonArrows.right.height)
            
            {
                this.numPanz++;
                this.numPanz%=panzerInGarageArr.length;
            }
            if (mX>x+this.buttonSelectPanz.x &&
                    mX<x+this.buttonSelectPanz.x+this.buttonSelectPanz.width
                    && mY>y+this.buttonSelectPanz.y &&
                    mY<y+this.buttonSelectPanz.y+this.buttonSelectPanz.height)
            
            {
                // выбор танка
            }
            if (mX>x+this.buttonSellPanz.x &&
                    mX<x+this.buttonSellPanz.x+this.buttonSellPanz.width
                    && mY>y+this.buttonSellPanz.y &&
                    mY<y+this.buttonSellPanz.y+this.buttonSellPanz.height)
            
            {
                // продать танк
                let price=0;
                for (let i=0;i<shopProduct.length;i++)
                {
                    if (shopProduct[i].category==3 &&
                            shopProduct[i].numCount==this.numPanz)
                    {
                        price=shopProduct[i].price*0.7;
                    }
                }
                if (messageBox.open==false)
                {
                   
                    messageBox.start("Продать танк за "+price+"$ ?","Да","Нет",);
                    this.close();
                }
            }
           console.log("CLICK GARAGE"+(mouseX-x)+" "+(mouseY-y));
        }
            
    },
    
}
