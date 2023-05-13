﻿function Menu()
{
    this.being=false;
    this.timerId = null;
    this.x = 0;
    this.xMenu = 0;
    this.yMenu = 0;
    this.y = 0;
    this.width = 350;
    this.height = 380;
    this.widthOneItem = 200;
    this.heightOneItem = 40;
    this.sizeFontItem = 20;
    this.dist = 15;
    this.listSelect = [];
    this.header = '';
    this.headerFontSize = 30;
    this.numSelectHower = null;
    this.selectHower = null;
    this.loadMap = false;
    this.loadMapTrue = true;
    this.blocking = false;
    this.selectNow = false;
    this.setOption=function(option)
    {
        for (var attr1 in this)
        {
            for (var attr2 in option)
            {
                if (attr1==attr2)    this[attr1] = option[attr2];
            }
        }
        this.updateProp();
    }
    this.updateProp=function()
    {
    
        this.blocking = false;
        this.y = screenHeight / 2 - this.height / 2;
        this.x = screenWidth / 2 - this.width / 2;
        this.xMenu =this.x+ this.width/2-this.widthOneItem/2;
        this.yMenu = this.y+this.height/2-(this.listSelect.length)*(this.heightOneItem+this.dist)/2 ;
        this.yMenu += this.dist/2;
    }
    this.start=function()
    {
        //if (this.being==true)
        this.being = true;
        this.updateProp();
        //this.blocking = false;
        //this.y = screenHeight / 2 - this.height / 2;
        //this.x = screenWidth / 2 - this.width / 2;
        //this.xMenu =this.x+ this.width/2-this.widthOneItem/2;
        //this.yMenu = this.y+this.height/2-(this.listSelect.length)*(this.heightOneItem+this.dist)/2 ;
        //this.yMenu += this.dist/2;
        //this.timerId=setInterval(function(){
        
        //       menuRedactor.update(); 
           
        //},20);
    }
    this.close=function()
    {
        this.being = false;
        clearInterval(this.timerId);
    }
    this.draw=function ()
    {
        let x = this.xMenu;
        let y = this.yMenu;
        context.fillStyle='rgb(0,0,0)';
        context.fillRect(this.x,this.y,this.width,this.height);// очистка экрана
        context.fillStyle='rgb(0,255,0)';

        let strHeader = this.header;
        context.font =  this.headerFontSize+'px Arial';
        let widthTextHeid = context.measureText(strHeader).width;
        context.fillText(strHeader,this.x+ this.width / 2 - widthTextHeid / 2, this.y+ this.headerFontSize);

        //context.fillStyle='rgb(210,210,0)';
        context.strokeStyle = 'rgb(210,210,0)';
        let sizeFont =  this.sizeFontItem;
        context.font = sizeFont+"px Arial";
        context.fillStyle='#FF8800';
        for (let i = 0; i < this.listSelect.length;i++)
        {
            let widthText = context.measureText(this.listSelect[i]).width;
            context.save();
            context.strokeStyle = this.numSelectHower == i ? 'red' : 'blue';
            context.lineWidth = 3;
            context.strokeRect(x,y+i*(this.heightOneItem+this.dist),this.widthOneItem,this.heightOneItem);
            let addX = this.widthOneItem / 2 - widthText / 2;
            //console.log(addX);
            context.fillText(this.listSelect[i],x+addX,y+i*this.heightOneItem+this.dist*i+this.heightOneItem/2+sizeFont/3);
            context.restore();
        }
       
    }
    this.update=function()
    {
        let mX = mouseX;//-mouseOffsetX;
        let mY = mouseY;//-mouseOffsetY;
        let x = this.xMenu;
        let y = this.yMenu;
        this.numSelectHower = null;
        this.selectHower = null;
        if (this.blocking==false)
        {
            for (let i = 0;i<this.listSelect.length;i++)
            {
                if ( mX>x && mX<x+this.widthOneItem &&
                    mY>y+i*(this.heightOneItem+this.dist)&&
                    mY<y+i*(this.heightOneItem+this.dist)+ this.heightOneItem)
                {
                    this.numSelectHower = i;
                    this.selectHower = this.listSelect[i];

                }

            }
        }
        if (mouseLeftClick())
        {
            this.selectNow = true;
       
        }   
        //console.log(777);
    }
    this.selectOn=function(callback)
    {
        if (this.selectNow==true)
        {
            this.selectNow = false;
            callback(this.selectHower);
        }
    }
}
