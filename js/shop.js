var mX=mouseX-mouseOffsetX;
var mY=mouseY-mouseOffsetY;
let listProduct=[];
var timerId=null;
shop={
    open:false,
    tabMenu:0,
    x:100,
    y:100,
    pauseShop:false,
    numShopImage:0,
    width:586,
    height:400,
    widthTab:108,
    heightTab:30,
    widthProduct:500,
    heightProduct:30,
    startNumProduct:0,
    tabText:["Ремонт","Амуниция","Улучшения","Танки","Доход"],
    countProductList:4,
    maxI:0,
    quantityTab:null,
    noMoneyLabel:false,
    countNoMoney:0,
    timerIdResponse:null,
    blockMouseLeft:false,
    startI:0,
    sellPanzer:false,
    arrMaxValuesParam:[500,100,20,5,100],
    arrMaxValuesParamTwo:[],
    valuesParam:[],
    labelCoord:{x:20,y:220,width:535,height:130},
    buttonPayPanz:{x:400,y:180,width:100,height:30,text:"Купить!"},
    labelText:'',
    boughtIncomeArr:[],
    create:function()
    {

    },
    init:function(num)
    {
        this.x=screenWidth/2-this.width/2;
        this.y=screenHeight/2-this.height/2;
        this.quantityTab=shop.tabText.length;
        
    },
    calcValuesParam:function(startI,numPanz=-1)
    {
        
        this.valuesParam=[];
        let attackPatron=null;
        if (numPanz==-1)
        {
            attackPatron=listProduct[startI].option.attackPatron;
        }
        else
        {
            attackPatron=panzerArr[numPanz].attackPatron;
        }
        let arrValuesName;
        arrValuesName=["maxHP",attackPatron==false?"timeAttack":"timeAttackPatron",
                            attackPatron==false?"hitAttack":"hitAttackPatron","speed",
                            "accuracy"];
        
        if (numPanz==-1)
        {
            
       
            for (let i=0;i<arrValuesName.length;i++)
            {
                for (let attr in listProduct[startI].option)
                {
                    if (""+attr===arrValuesName[i] && arrValuesName[i].length==""+attr.length)
                    {
                        if (arrValuesName[i]=="timeAttack"||arrValuesName[i]=="timeAttackPatron")
                        {             
                                this.valuesParam.push(100/listProduct[startI].option[attr]);   
                        }
                        else
                        {
                                this.valuesParam.push(listProduct[startI].option[attr]);
                        }


                        //console.log(attr+" "+listProduct[startI].option[attr]);
                       // break;
                    }
                }
            }
        }
        else if(numPanz!=-1)
        {
//            if ((panzerArr[numPanz].numType==0||
//                    panzerArr[numPanz].numType==2)&&
//                    attr=='u'    
//                    )
            if (( panzerArr[numPanz].numType==0 ||  panzerArr[numPanz].numType==2))
            {
                arrValuesName=["maxHP",attackPatron==false?"hitAttack":"hitAttackPatron",
                    "speed",    "accuracy"];
            }
            for (let i=0;i<arrValuesName.length;i++)
            { 
//                if  ( ( panzerArr[numPanz].numType==0 ||  panzerArr[numPanz].numType==2)&&
//                          (arrValuesName[i]=="timeAttack"||arrValuesName[i]=="timeAttackPatron")
//                        )
//                {
//                    continue;
//                }
                for (let attr in panzerArr[numPanz])
                {
                   
                    if (""+attr===arrValuesName[i] && arrValuesName[i].length==""+attr.length)
                    {
                      
                        if (arrValuesName[i]=="timeAttack"||arrValuesName[i]=="timeAttackPatron")
                           
                        {             
                                this.valuesParam.push(100/panzerArr[numPanz][attr]);   
                        }
                        else
                        {
                                this.valuesParam.push(panzerArr[numPanz][attr]);
                        }


                        //console.log(attr+" "+listProduct[startI].option[attr]);
                       // break;
                    }
                }
            }
        }
        //console.log(this.valuesParam);
//        console.log(numPanz);
//        console.log(this.valuesParam);
    },
    start:function (num,sellPanzer=false)
    {
     // drawShop(); 
        this.init();
        console.log('SHOP');
        pause=true;
        this.numShopImage=num;
        this.open=true;
        this.sellPanzer=sellPanzer;
        if (sellPanzer==true)
        {
            this.tabMenu= 3
            this.countProductList=1;
        }
        else 
        {
            this.tabMenu= 0
            this.countProductList=4;
        }
      //  this.countProductList=4;
        //this.clearListProduct();
        this.startNumProduct=0;
        this.arrMaxValuesParam=calcMaxParams();
        this.arrMaxValuesParamTwo=calcMaxParams(true);
        
        this.createListProduct();
      //  this.calcValuesParam(0);
        if (this.open==true)  timerId=setInterval(function(){
            if (shop.pauseShop==false) shop.update();
            if (shop.open==true)
            {
                let response=messageBox.checkResponse();
                if (response!=0)
                {
                    shop.select();
                    shop.pauseShop=false;
                }
                console.log("shop");
            }
        },50);  
    },
    newPanzerId:function()
    {
        let maxId=0;
        if (maxPanzerId==0)
        {
            for (let i=0;i<panzerInGarageArr.length;i++)
            {
                if (maxId<panzerInGarageArr[i].id)
                {
                    maxId=panzerInGarageArr[i].id;
                }
            }
            maxPanzerId=maxId;
        }
        maxPanzerId++;   
         
        return maxPanzerId;
    },
    select:function ()
    {
        if (messageBox.response==1)
        {
            console.log("RESPONSE 1");
            money-=listProduct[this.startI].price;
            for (var attr1 in panzerArr[numPanzer])
            {
                for (var attr2 in listProduct[this.startI].option)
                {
                    console.log(listProduct[this.startI].option[attr2]);
                    if (attr1==attr2) 
                    {
                        panzerArr[numPanzer][attr1]=listProduct[this.startI].option[attr2];
                    }
                }
            } 
            panzerArr[numPanzer].being=true;
            for (let key in panzerArr[numPanzer].mapUp)
            {
                panzerArr[numPanzer].mapUp[key].levelUp=0;
            }
            //panzerArr[numPanzer].mapUp.upSpeed.levelUp=0;
            panzerArr[numPanzer].id=this.newPanzerId();
            let copy=copyPanz(panzerArr[numPanzer]);

            panzerInGarageArr.push(copy);
            panzerNumGarage = panzerInGarageArr.length - 1;
            playerGun=nextGun(1);
            let num=lastShop.numShop;
            let entr=lastShop.numEntrance;
            let x=shopImageArr[num].entranceArr[entr].x+shopImageArr[num].x;
            let y=shopImageArr[num].entranceArr[entr].y+shopImageArr[num].y;
            x+=mapSize/2-panzerArr[numPanzer].width/2;
            y+=mapSize/2-panzerArr[numPanzer].height/2;
            panzerArr[numPanzer].x=x;
            panzerArr[numPanzer].y=y;
            panzerArr[numPanzer].HP=panzerArr[numPanzer].maxHP;
            if (this.sellPanzer) this.close();
        }
        if (messageBox.response==2)
        {
            money-=listProduct[this.startI].price;
            let onePanz=clone(panzer);
            for (var attr1 in onePanz)
            {
                for (var attr2 in listProduct[this.startI].option)
                {
                    //console.log(listProduct[this.startI].option[attr2]);
                    if (attr1==attr2) 
                    {
                        onePanz[attr1]=listProduct[this.startI].option[attr2];
                    }
                }
            }  
            onePanz.id=this.newPanzerId();
            for (let key in onePanz.mapUp)
            {
                onePanz.mapUp[key].levelUp=0;
            }
            panzerInGarageArr.push(onePanz);
            panzerNumGarage = panzerInGarageArr.length - 1;
        }
        if (messageBox.response==3)
        {
        }
        messageBox.close();
        messageBox.response=0;

    },
    calcBought:function(value)
    {
        //let bought = false;
        for (let j = 0; j < this.boughtIncomeArr.length;j++)
        {
            if (this.boughtIncomeArr[j]==value/*listProduct[i+startI].numCount*/ )
            {
                return true;
            }
        }
        return false;
    },
    draw:function()
    {
        context.fillStyle="#000000"
        context.fillRect(this.x,this.y,this.width,this.height);
        context.font = "20px serif";
        let widthTab=this.widthTab;
        let heightTab=this.heightTab;
        for (let i=0;i<this.tabText.length;i++)
        {
           /// context.fillStyle="rgb("+randomInteger(0,255)+","+randomInteger(0,255)+","
           //         +randomInteger(0,255)+")";
           
            
            context.strokeStyle="#FFFFFF";
            context.strokeRect(this.x+widthTab*i,this.y,widthTab,heightTab); 
            if (this.tabMenu==i)
            {
                context.fillStyle="#FF0000";
                context.fillRect(this.x+widthTab*i+1,this.y+1,widthTab-1,heightTab-1); 
            }
            context.fillStyle="#FFFFFF";
            context.fillText(this.tabText[i], this.x+widthTab*i+5,this.y+20);
        }
        context.strokeStyle="#FFFFFF";
        context.strokeRect(this.x+this.width-heightTab,this.y,heightTab,heightTab);
        
        context.fillStyle="#FF0000";
        context.fillText("X", this.x+this.width-heightTab+7,this.y+20);

       // let k=0;this.countProductList=4;
        let startI=this.startNumProduct;
        if (this.tabMenu==0||this.tabMenu==1||this.tabMenu==4)
        {
            context.font = '18px Arial';
           // this.countProductList=4;
            for (let i=0;i<this.maxI;i++)
            {
               // if (shopProduct[i].category==this.tabMenu)
                { 

                    if (levelPlayer>=listProduct[i+startI].levelOpen&&
                            listProduct[i+startI].select==true)
    //                if (mX>this.x+20&&mX<this.x+20+widthProduct&&
    //                   mY>this.y+40+40*k&&mY<this.y+40+40*k+heightProduct)
                    {
                        context.fillStyle="#FFFF00";
                        context.fillRect(this.x+20,this.y+40+40*i,this.widthProduct,this.heightProduct);  
                    }
                    context.strokeStyle="#FFFFFF";
                    context.fillStyle="#FF0000";
                    context.strokeRect(this.x+20,this.y+40+40*i,this.widthProduct,this.heightProduct);
                    context.fillText(listProduct[i+startI].text, this.x+25,this.y+60+40*i);
                    context.fillText('цена '+listProduct[i+startI].price+"$", 
                                    this.x+this.widthProduct-100,this.y+60+40*i);
                    if (this.tabMenu==4)
                    {                    
                        if (this.calcBought(listProduct[i+startI].numCount)==true/*bought==true*/)
                        {
                            context.fillStyle = '#00FF00';    
                            context.fillText('Куплено',this.x+this.widthProduct-250,this.y+60+40*i);
                        }
                    }
                    if (levelPlayer<listProduct[i+startI].levelOpen)
                    {
                        context.fillStyle="#888888AA";
                        context.fillRect(this.x+20,this.y+40+40*i,
                                    this.widthProduct,this.heightProduct);
                    }
                    //k++;
                }
            }
        }else if(this.tabMenu==2)
        {
            context.font = '16px Arial';
            
            for (let i=0;i<listProduct.length;i++)
            {
                context.fillStyle="#FF0000";
               // dy=25;
                context.strokeRect(this.x+20,this.y+45+(25+8)*i,300,25);
                context.fillText(listProduct[i].text, this.x+25,this.y+63+(25+8)*i);
                for (let j=0;j<3;j++)
                {
                    context.drawImage(j<panzerArr[numPanzer].mapUp[listProduct[i].id].levelUp?
                    imageArr.get("star"):imageArr.get("starContur"),
                    this.x+180+j*20,this.y+48+(25+8)*i);
                    
                }
                this.calcValuesParam(2,numPanzer);
                if (( panzerArr[numPanzer].numType==0 ||  panzerArr[numPanzer].numType==2))
                {
                    drawListProgressBar(this.valuesParam,this.arrMaxValuesParamTwo,this.x,this.y,350,50,33);
                }
                else
                {    
                    drawListProgressBar(this.valuesParam,this.arrMaxValuesParam,this.x,this.y,350,50,33);
                }
            }
        }
        else if(this.tabMenu==3)
        {
            context.fillStyle="#AAAAAA";
            context.fillRect(this.x+20,this.y+50,80,80);
            context.strokeStyle="#00FF00";
            context.strokeRect(this.x+20,this.y+50,80,80); 
            
            
            let centerRectX=this.x+20+80/2;
            let centerRectY=this.y+50+80/2;
            let widthPanz=listProduct[startI].option.width;
            let heightPanz=listProduct[startI].option.height;
            drawPanzerIcon(centerRectX-widthPanz/2,
                        centerRectY-heightPanz/2,startI,0,true);
            let dy=25;
            context.fillStyle="#FF0000";
            context.fillText("Броня", this.x+130,this.y+63+dy*0);
            context.fillText("Скорострельность", this.x+130,this.y+63+dy*1);
            context.fillText("Урон", this.x+130,this.y+63+dy*2);
            context.fillText("Скорость", this.x+130,this.y+63+dy*3);
            context.fillText("Точность", this.x+130,this.y+63+dy*4);
            this.calcValuesParam(startI);
            drawListProgressBar(this.valuesParam,this.arrMaxValuesParam,this.x,this.y,350,50,dy);           
            context.fillStyle="#FF0000";
            context.fillText("Цена: "+listProduct[startI].price, this.x+20,this.y+200);
            context.fillStyle="#FFFF00";
            context.fillRect(this.x+this.buttonPayPanz.x,
                            this.y+this.buttonPayPanz.y,
                            this.buttonPayPanz.width,this.buttonPayPanz.height);
            
            context.fillStyle="#FF0000";           
            context.fillText(this.buttonPayPanz.text,this.x+this.buttonPayPanz.x+15,
                                this.y+this.buttonPayPanz.y+20);
            if(money<listProduct[startI].price)
            {
                context.fillStyle="#AAAAAA88";
                context.fillRect(this.x+this.buttonPayPanz.x,
                            this.y+this.buttonPayPanz.y,
                            this.buttonPayPanz.width,this.buttonPayPanz.height);
            }
            if (levelPlayer<listProduct[startI].levelOpen)
            {
                context.fillStyle="#88888888";
                context.fillRect(this.x,this.y+heightTab,this.width-30,this.y+140-heightTab);
                
            }
            
        }
        context.strokeStyle="#FFFFFF";
        context.strokeRect(this.x+this.labelCoord.x,this.y+this.labelCoord.y,
                this.labelCoord.width,this.labelCoord.height);
        context.fillStyle="#00FF00";
        context.fillText("Деньги "+money+"$", this.x+20,this.y+this.height-20);
        if (this.tabMenu!=2)
        {
            context.strokeStyle="#FFFFFF";
            context.strokeRect(this.x+this.width-heightTab,this.y+heightTab+10,
                    heightTab,/*heightProduct*this.countProductList*/4*38);
        
            context.fillStyle="#FFFF00";
            let mult=/*this.countProductList*/4*38;
            let dy=1;
            if (this.countProductList<listProduct.length)
            {
                dy=this.countProductList/listProduct.length*mult;
            }
            else
            {
                dy=mult
            }
            let dyOne=1/listProduct.length*mult;
            context.fillRect(this.x+this.width-heightTab,
                    this.y+heightTab+10+this.startNumProduct*dyOne,
                    heightTab,/*heightProduct**/dy);
        }
        this.drawLabelText();
        
        
    },
    close:function ()
    {
        shop.open=false;
        clearInterval(timerId);
        clearInterval(this.timerIdResponse);
        pause=false; 
    },
    update:function()
    {
        if (keyUpDuration("Escape",100))
        {
            this.close();
        }   
        mX=mouseX-mouseOffsetX;
        mY=mouseY-mouseOffsetY;
        
        let resWhell=checkWheel();
        if (resWhell==-1) 
        { 
          if (this.startNumProduct>=1)this.startNumProduct--;
         // alert('kln');
        }
        if (resWhell==1) 
        { 
            if (this.startNumProduct<listProduct.length-this.countProductList)
            {
                this.startNumProduct++;
            }
         // alert('kln');
        }
        let startI=this.startNumProduct;
        if (this.tabMenu==0||this.tabMenu==1||this.tabMenu==4)
        {
            
            
            let count=0;
            for (let i=0;i<this.maxI;i++)
            {



                if (mX>this.x+20&&mX<this.x+20+this.widthProduct&&
                        mY>this.y+40+40*i&&mY<this.y+40+40*i+this.heightProduct)
                {
                    listProduct[i+startI].select=true;
                    this.labelText=listProduct[i+startI].title; 
                    if (this.tabMenu==1)
                    {
                        switch(listProduct[i+startI].id)
                        {
                            case "cartridges":
                            {
                                this.labelText+=" Количество ваших патронов: "+gunQuantityArr[1];
                            }
                            break;
                            case "shell":
                            {
                                this.labelText+=" Количество ваших снарядов: "+gunQuantityArr[0];
                            }
                            break;
                            case "laser":
                            {
                                this.labelText+=" Количество ваших лазеров: "+gunQuantityArr[2];
                            }
                            break;
                            case "rocket":
                            {
                                this.labelText+=" Количество ваших ракет: "+gunQuantityArr[3];
                            }
                            break;
//                            case "income":
//                            {
//                                this.labelText+=" Количество ваших ракет: "+gunQuantityArr[3];
//                            }
//                            break;
                        }
                    }
                    if (this.tabMenu==0)
                    {
                        this.labelText+=" Целостность вашего танка: "+
                        Math.round(panzerArr[numPanzer].HP/panzerArr[numPanzer].maxHP*100)+"%";
                    }
                    if (money<listProduct[i+startI].price)
                    {
                        if (this.calcBought(listProduct[i+startI].numCount)==false || this.tabMenu!=4)
                        this.labelText=" Недостачно средств!";
                     
                    }
                    if (levelPlayer<listProduct[i+startI].levelOpen)
                    {
                        this.labelText="Не доступно. Откроется когда вы достигнете звания: "+
                                nameRankLevel[listProduct[i+startI].levelOpen-1];
                    }
                    if (mouseLeftClick())
                    {
                        if (money>=listProduct[i+startI].price &&
                             levelPlayer>=listProduct[i+startI].levelOpen )
                        {
                            if (listProduct[i+startI].id!='repairs'||
                                panzerArr[numPanzer].HP<panzerArr[numPanzer].maxHP)
                            {
                                if (this.calcBought(listProduct[i+startI].numCount)==false || this.tabMenu!=4)
                                {
                                    money-=listProduct[i+startI].price;
                                }
                                
                            }
                            switch (listProduct[i+startI].id)
                            {
                                case "cartridges":
                                {
                                    gunQuantityArr[1]+=listProduct[i+startI].pieces;

                                }
                                break; 
                                case "shell":
                                {
                                    gunQuantityArr[0]+=listProduct[i+startI].pieces;

                                }
                                break; 
                                case "repairs":
                                {
                                    let dHP=panzerArr[numPanzer].maxHP*
                                            listProduct[i+startI].pieces/100;
                                    if (dHP+panzerArr[numPanzer].HP<panzerArr[numPanzer].maxHP)
                                    {
                                        panzerArr[numPanzer].HP+=dHP;
                                    }
                                    else
                                    {
                                        panzerArr[numPanzer].HP=panzerArr[numPanzer].maxHP;
                                    }
                                   // console.log(panzerArr[numPanzer].HP);    

                                }
                                break;
                                case "laser":
                                {
                                    gunQuantityArr[2]+=listProduct[i+startI].pieces;
                                }
                                break;
                                case "rocket":
                                {
                                    gunQuantityArr[3]+=listProduct[i+startI].pieces;;
                                }
                                break; 
                                case "income":
                                {
                                   if (this.calcBought(listProduct[i+startI].numCount)==false )
                                   {
                                       addMoney+=listProduct[i+startI].pieces;
                                       this.boughtIncomeArr.push(listProduct[i + startI].numCount);
                                   }
                                }
                                break;
                            }
                             
                        }
                    
                    }
                }
                else 
                {
                    listProduct[i+startI].select=false;
                    count++;
                    //this.labelText="";
                }

            }
            if (count==this.maxI)this.labelText="";
        }
        else if(this.tabMenu==2)
        {
            let count=0;
            for (let i=0;i<listProduct.length;i++)
            {
                if (mX>this.x+20&&mX<this.x+20+300&&
                        mY>this.y+45+(25+8)*i&&mY<this.y+45+(25+8)*i+25)
                {
                    listProduct[i].select=true;
                    let levelUp=panzerArr[numPanzer].mapUp[listProduct[i].id].levelUp;
                    let levelOpen;
                    if (levelUp<3)
                    {
                        levelOpen=panzerArr[numPanzer].mapUp[listProduct[i].id].levelOpen[levelUp];
                    }
                    else
                    {
                        levelOpen=3;
                    }
//                    if (levelOpen<=levelPlayer)
//                    {
                        if (levelUp<3 && levelOpen<=levelPlayer)
                        {
                            this.labelText="Улучшить "+listProduct[i].text+
                                " на "+
                                panzerArr[numPanzer].mapUp[listProduct[i].id].up[levelUp]+
                                ' процентов за '+
                                panzerArr[numPanzer].mapUp[listProduct[i].id].price[levelUp]+
                                "$.";
                            //if (this.noMoneyLabel==true)
                            if (money<panzerArr[numPanzer].mapUp[listProduct[i].id].price[levelUp])
                            {
                              this.labelText+=" Недостачно средств!";  
                            }
                        }
                        else if (levelUp>=3)
                        {
                            this.labelText="Этот параметр нельзя больше увеличить";
                        }
                        else if (levelOpen>levelPlayer)
                        {
                            this.labelText="Для того что бы увеличить этот "+
                             "параметр достигнете звания: "+nameRankLevel[levelOpen-1];
                        }
//                        else
//                        {
//                            this.labelText="Этот параметр нельзя больше увеличить";
//                        }
                   // }
                    if (mouseLeftClick())
                    if (panzerArr[numPanzer].mapUp[listProduct[i].id].levelUp<3 &&
                            levelOpen<=levelPlayer
                    )
                    {
                        let id=listProduct[i].id;
                        let levelUp=panzerArr[numPanzer].mapUp[id].levelUp;
                        
                        if (money>=panzerArr[numPanzer].mapUp[id].price[levelUp])
                        {
                            money-=panzerArr[numPanzer].mapUp[id].price[levelUp];
                            panzerArr[numPanzer].mapUp[id].levelUp++;
                            //levelUp++;
                            let value=panzerArr[numPanzer].mapUp[id].up[levelUp];
                            switch(id)
                            {
                                case "upHP":
                                {
                                    
                                    panzerArr[numPanzer].maxHP*=1+value/100;
                                    panzerArr[numPanzer].HP=panzerArr[numPanzer].maxHP;
                                }
                                break;
                                case "upTimeAttack":
                                {
                                    //let value=panzerArr[numPanzer].mapUp[id].up[levelUp];
                                    panzerArr[numPanzer].timeAttack*=1-value/100;
                                    panzerArr[numPanzer].timeAttackPatron*=1-value/100;
                                }
                                break;
                                case "upHit":
                                {
                                    //let value=panzerArr[numPanzer].mapUp[id].up[levelUp];
                                    panzerArr[numPanzer].hitAttack*=1+value/100;
                                    panzerArr[numPanzer].hitAttackPatron*=1+value/100;
                                }
                                break;
                                case "upSpeed":
                                {
                                    //let value=panzerArr[numPanzer].mapUp[id].up[levelUp];
                                    panzerArr[numPanzer].speed*=1+value/100;
                                }
                                break;
                                case "upAccuracy":
                                {
                                    let value=panzerArr[numPanzer].mapUp[id].up[levelUp];
                                    let buffer=panzerArr[numPanzer].accuracy
                                    value/=100;
                                    //let value=panzerOption[i].mapUp.upAccuracy.up[j]/100;
                                    buffer/=100;
                                    buffer=(buffer+value)-buffer*value;
                                    buffer*=100;
                                    panzerArr[numPanzer].accuracy=buffer;    
                                }
                                break;
                                
                            }
                            let num=calcNumById(panzerArr[numPanzer].id,
                                                            panzerInGarageArr)
                            if (num!=-1)
                            {
                                for (var attr1 in panzerArr[numPanzer])
                                {
                                    for (var attr2 in panzerInGarageArr[num])
                                    {
                                        //console.log(listProduct[this.startI].option[attr2]);
                                        if (attr1==attr2) 
                                        {
                                           console.log(attr1);
                                       //    if (attr1!='x' && attr1!='y')
                                           {
                                               panzerInGarageArr[num][attr1]=panzerArr[numPanzer][attr2];
                                           }
                                        }
                                    }
                                }  
                            }
//                            console.log("Upgrade");
//                            console.log("maxHP "+panzerArr[numPanzer].maxHP);
//                            console.log("timeAttack "+panzerArr[numPanzer].timeAttack);
//                            console.log("hitAttack "+panzerArr[numPanzer].hitAttack);
//                            console.log("speed "+panzerArr[numPanzer].speed);
//                            console.log("accuracy "+panzerArr[numPanzer].accuracy);
                            
                        }
                    }
                }
                else
                {
                  count++;
                  listProduct[i].select=false;   
                }
            }
            if (count==listProduct.length) this.labelText='';
        } 
        else if(this.tabMenu==3)
        {
            if (levelPlayer<listProduct[startI].levelOpen)
            {
                this.labelText="Для того что бы купить этот танк вам необходимо "+
                                 "достигнуть звания: "+
                                 nameRankLevel[listProduct[startI].levelOpen-1];
                 
            }
            else if(money<listProduct[startI].price)
            {
               this.labelText="Недостачно средств."; 
            }
            else if(levelPlayer>=listProduct[startI].levelOpen)
            {
                this.labelText=listProduct[startI].title;
                
                if (mX>this.x+this.buttonPayPanz.x &&
                    mX<this.x+this.buttonPayPanz.x+this.buttonPayPanz.width &&
                    mY>this.y+this.buttonPayPanz.y &&
                    mY<this.y+this.buttonPayPanz.y+this.buttonPayPanz.height)
                {
                   
                    if (mouseLeftClick())
                    { 
                        if (this.sellPanzer==false)
                        {
                            
                            messageBox.start("Выбирете что нужно сделать?","сесть",
                                                "в гараж","отмена");
                        }   
                        else
                        {
                            messageBox.start("Выбирете что нужно сделать?","сесть",
                                                "отмена",[1,3]);
                        }
                        this.startI=startI;
                       // this.close();
                        this.pauseShop=true;
                    }
                }   
            }
        }
      
        if (this.blockMouseLeft==false && mouseLeftClick() && this.sellPanzer==false)
        {
       
            console.log(mX+" "+mY);
            console.log(this.widthTab+" "+this.y);
            let widthTab=this.widthTab;
            let heightTab=this.heightTab;
            if (mY>this.y && mY<this.y+heightTab)
            {
                
                
                for (let i=0;i<this.tabText.length;i++)
                {
                    if (mX>this.x+widthTab*i && mX<this.x+widthTab*(i+1) )
                    {
                        this.tabMenu=i;
                        this.startNumProduct=0;
                        if (this.tabMenu==0||this.tabMenu==1||this.tabMenu==4)
                        {
                            this.countProductList=4;
                        }
                        else if (this.tabMenu==3)
                        {
                            this.countProductList=1;
                        }
                        this.createListProduct();
//                        if (this.tabMenu==2)this.countProductList=5;
//                            else  this.countProductList=4;
                        this.maxI=this.countProductList<=listProduct.length?this.countProductList:listProduct.length;
                        break;
                    }

                }
                if (mX>this.x+this.width-heightTab&& mX<this.x+this.width)
                {
                    this.close();
                }
            }
        }
       
      //  setTimeout(shop.update,30);
    }, 
    drawLabelText:function(){
        context.font = '18px Monaco';
        context.fillStyle="#FFFFFF";
        let str=this.labelText;
        let strArr=str.split(" ");
        let widthString=400;
        let countRow=0;
        let countPix=0;
        for (let i=0;i<strArr.length;i++)
        {
            
            if (countPix>widthString)
            {
                countRow++;
                countPix=0;
            }
            context.fillText(strArr[i], 
                    this.x+20+this.labelCoord.x+countPix,
                         this.y+this.labelCoord.y+20+countRow*22);
            countPix+=context.measureText(strArr[i]).width+10;
          //  console.log(countPix);
        }
    },
    clearListProduct:function ()
    {
       
        listProduct=[];
    },
   
    createListProduct:function ()
    {
        this.clearListProduct();
      //  console.log(panzerArr[numPanzer].maskGun);
        for (let i=0;i<shopProduct.length;i++)
        {
            if (shopProduct[i].category==this.tabMenu)         
            {
                if (this.tabMenu==2 &&
                    ( panzerArr[numPanzer].numType==0||
                      panzerArr[numPanzer].numType==2)&&
                      shopProduct[i].id=="upTimeAttack"  
                    )
                {
                    continue;
                }
                if (this.tabMenu==1)
                {
                    let flag=false;
                    for (let j=0;j<panzerArr[numPanzer].maskGun.length;j++)
                    {
                        if (panzerArr[numPanzer].maskGun[j]==1 &&
                                    shopProduct[i].maskGun[j]==1)
                            {
                                flag=true
                            }
                    }
                    if (flag==true) listProduct.push(shopProduct[i]);
                }
                else
                {
                    listProduct.push(shopProduct[i]);
                }
            }
        }
        this.maxI=this.countProductList<=listProduct.length?this.countProductList:listProduct.length;
    },
}
