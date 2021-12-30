garage={
    open:false,
    x:100,
    y:100,
    width:500,
    height:270,
    numPanz:0,
    pauseGarage:false,
    maxParamArr:[],
    valuesParam:[],
    timerId:null,
    blockMouseLeft:false,
    price:0,
    timerIdResponse:null,
    numPanzerPlayer:null,
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
        this.numPanz=0;
        if (this.open==true)  this.timerId=setInterval(function(){
            if (garage.pauseGarage==false)   garage.update();
            if (garage.open==true)
            {
                let response=messageBox.checkResponse();
                if (response!=0)
                {
                    garage.select();
                    garage.pauseGarage=false;
                }
            }
        },50);
        console.log(panzerInGarageArr);
        
    }, 
    close:function()
    {
        clearInterval(this.timerId);
        pause=false;
        this.open=false;
    },
    stop:function()
    {
         clearInterval(this.timerId);
    },
    play:function()
    {
        pause=true;
        this.open=true;
        this.timerId=setInterval(function(){
             garage.update();
         },50); 
    },
    select:function ()
    {

        if (garage.pauseGarage==true)
        {
            if (messageBox.response==1)
            {
                let flag=false;
                if (panzerInGarageArr[this.numPanz].id=panzerArr[numPanzer].id)
                {
                    flag=true;
                }
                deleteElemArrToNum(panzerInGarageArr,this.numPanz);
                money+=this.price;
                console.log(panzerInGarageArr);
                this.numPanz=this.numPanz<=0?0:this.numPanz-1;
                if (flag==true)
                {
                    for (var attr1 in panzerArr[numPanzer])
                    {
                        for (var attr2 in panzerInGarageArr[this.numPanz])
                        {
                            //console.log(listProduct[this.startI].option[attr2]);
                            if (attr1==attr2) 
                            {
                               console.log(attr1);
                               if (attr1!='x' && attr1!='y')
                               {
                                   panzerArr[numPanzer][attr1]=panzerInGarageArr[this.numPanz][attr2];
                               }
                            }
                        }
                    }  
                    playerGan=nextGan(1);

                }
                panzerArr[numPanzer].HP=panzerArr[numPanzer].maxHP;
               // clearInterval(this.timerIdResponse);
            }
            if (messageBox.response==2)
            {

            }  
          //  garage.pauseGarage=false;
        }
        messageBox.close();
        messageBox.response=0;
               // this.start();
//            }
//        }
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
        context.drawImage(imageArr.get(panzerInGarageArr[n].bodyNameImage),
                        x+xRect+ widthRect/2-panzerInGarageArr[n].width/2,
                        y+yRect+ heightRect/2-panzerInGarageArr[n].height/2);
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
        arr[0]=panzerInGarageArr[num].maxHP;
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
            
            {  // выбор танка
                for (var attr1 in panzerArr[numPanzer])
                {
                    for (var attr2 in panzerInGarageArr[this.numPanz])
                    {
                        //console.log(listProduct[this.startI].option[attr2]);
                        if (attr1==attr2) 
                        {
                           console.log(attr1);
                           if (attr1!='x' && attr1!='y')
                           {
                               panzerArr[numPanzer][attr1]=panzerInGarageArr[this.numPanz][attr2];
                           }
                        }
                    }
                }  
                panzerArr[numPanzer].being=true;
                let num=lastNumGarage;
                let x=garageImageArr[num].entranceArr[0].x+garageImageArr[num].x;
                let y=garageImageArr[num].entranceArr[0].y+garageImageArr[num].y;
                x+=mapSize/2-panzerArr[numPanzer].width/2;
                y+=mapSize/2-panzerArr[numPanzer].height/2;
                panzerArr[numPanzer].x=x;
                panzerArr[numPanzer].y=y;
                playerGan=nextGan(1);
                this.close();
              
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
                            shopProduct[i].numCount==panzerInGarageArr[this.numPanz].numType)
                    {
                        price=shopProduct[i].price*0.7;
                    }
                }
                if (messageBox.open==false)
                {
                    if (panzerInGarageArr.length>1)
                    {
                        messageBox.start("Продать танк за "+price+"$ ?","Да","Нет",);
                        this.price=price;
                    
                        this.pauseGarage=true;
                    }
                  //  this.close();
                }
            }
           console.log("CLICK GARAGE"+(mouseX-x)+" "+(mouseY-y));
        }
            
    },
    
}
