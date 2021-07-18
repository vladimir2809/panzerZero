boxWindowSelect={
    open:false,
    select:null,
    x:100,
    y:100,
    width:350,
    height:200,
    a:100,
    dxdyKvadr:50,
    hoverXP:false,
    hoverMoney:false,
    addXP:1000,
    addMoney:500,
    timerId:null,
    init:function()
    {
        this.x=screenWidth/2-this.width/2;
        this.y=screenHeight/2-this.height/2;
        this.quantityTab=shop.tabText.length;
    },
    start:function ()
    {
     // drawShop(); 
        this.init();
        console.log('boxSelect');
        resetMouseLeft();
        pause=true;
        this.open=true;
        if (this.open==true) 
        {
            setTimeout(function(){
                 boxWindowSelect.timerId=setInterval(function(){boxWindowSelect.update()},50);
            },200);
        }
        
    //  do{
    //          
    //  } while(keyUpDuration("Escape",100)==false);  
    },
    close:function ()
    {
        clearInterval(boxWindowSelect.timerId);
        this.open=false;
        pause=false;
        
    },
    draw:function()
    {
        context.fillStyle="#000000"
        context.fillRect(this.x,this.y,this.width,this.height);  
        context.strokeStyle="#FF0000"
        context.strokeRect(this.x,this.y,this.width,this.height); 
        context.fillStyle="#FFFFFF";
        context.font = '18px Arial';
        context.fillText("Выберите приз?", this.x+110,this.y+20);
        let dxdyKvadr=this.dxdyKvadr;
        let a=this.a;
        context.strokeStyle="#FFFFFF";
        context.strokeRect(this.x+a,this.y+this.height/2-dxdyKvadr/2,
                                                        dxdyKvadr,dxdyKvadr);
                                                        
        context.font = '28px Arial';
        context.fillStyle="#FFFF00";
        context.fillText("XP", this.x+a+7,this.y+this.height/2+9);                                              
        context.strokeRect(this.x+this.width-a-dxdyKvadr,
                        this.y+this.height/2-dxdyKvadr/2,dxdyKvadr,dxdyKvadr);
        context.fillStyle="#00FF00";
        context.fillText("$", this.x+this.width-a-dxdyKvadr+17,
                                this.y+this.height/2+9);
        context.font = '18px Arial';    
        if (this.hoverXP==true)
        {
            
            context.fillStyle="#FFFF88";
            context.fillText("получить "+this.addXP+" опыта.",this.x+85,
                                        this.y+this.height-20); 
        }
        if (this.hoverMoney==true)
        {
            
            context.fillStyle="#88FF88";
            context.fillText("получить "+this.addMoney+"$ денег.",this.x+92,
                                        this.y+this.height-20); 
        }
    },
    update: function()
    {
        let a=this.a;
        let dxdyKvadr=this.dxdyKvadr;
        mX=mouseX-mouseOffsetX;
        mY=mouseY-mouseOffsetY;
        var mouseClick=mouseLeftClick();
        
        if (mX>this.x+a && 
            mX<this.x+a+dxdyKvadr &&
            mY>this.y+this.height/2-dxdyKvadr/2 && 
            mY<this.y+this.height/2-dxdyKvadr/2 + dxdyKvadr)
        {
            this.hoverXP=true;
            if (mouseClick==true)
            {
                XP+=1000;
                this.close();
            }
        }
        else
        {
            this.hoverXP=false;
        }
        if (mX>this.x+this.width-a-dxdyKvadr && 
            mX<this.x+this.width-a-dxdyKvadr+dxdyKvadr &&
            mY>this.y+this.height/2-dxdyKvadr/2&&
            mY<this.y+this.height/2-dxdyKvadr/2+dxdyKvadr)
        { //  this.y+this.height/2-dxdyKvadr/2
            this.hoverMoney=true;
            if (mouseClick==true)
            {
                money+=500;
                this.close();
                             
            }
        }
        else
        {
            this.hoverMoney=false;
        }
        console.log ("Megera");
        //console.log(mX);
    },
}

