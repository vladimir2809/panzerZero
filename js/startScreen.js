startScreen={
    being:true,
    gameStart:false,
    timerId:null,
    button:{
      x:250,
      y:500,
      width:200,
      height:40,
             
    },
    start:function()
    {
        //if (this.being==true)
        this.being = true;
        this.timerId=setInterval(function(){
           startScreen.update(); 
        },50);
    },
    draw:function()
    {
        context.fillStyle='rgb(210,210,210)';
        context.fillRect(0,0,camera.width,camera.height);// очистка экрана
        context.font = "58px Arial";
        context.fillStyle='#FF8800';
        context.fillText("PANZER-ZERO",165,60);
        context.font = "38px Arial";
        context.fillStyle='#3333FF';
        let y=30;
        let step = 40;
        context.fillText("WASD - Управление.",20,y+step*2);
        context.fillText("1234 - Выбор оружия.",20,y+step*3);
        context.fillText("Левая кнопка мыши - Стрелять.",20,y+step*4);
        context.fillText("Колёсико мыши - Сменить оружие.",20,y+step*5);
        let str = keysGame.buttonShop.at(-1);
        context.fillText(str+" - Магазин.",20,y+step*6);
        str = keysGame.buttonGarage.at(-1);
        context.fillText(str+" - Гараж.",20,y+step*7);
        str = keysGame.buttonOpen.at(-1);
        context.fillText(str+" - Войти в здание или открыть дверь.",20,y+step*8);
        context.fillText("ESC - Игровое меню.",20,y+step*9);
        context.fillStyle='#FF0000';
        context.fillText("Звания в игре",235,y+step*10+10);
        let xText = 0;
        context.font = "15px Arial";
        for (let i = 0; i < nameRankLevel.length;i++)
        {
            let x = 30;
            if (i==0)
            {
                context.fillText(nameRankLevel[i]+',',x,y+step*10+30+10);
            }
            else
            {
                xText+=context.measureText(nameRankLevel[i-1]).width+10;
                let flag = false;
                if (i == nameRankLevel.length - 1) flag = true;
                context.fillText(nameRankLevel[i] + (flag == false ? ',' : ''),x+xText,y+step*10+30+10);
            }
           
        }
        context.font = "38px Arial";
        context.fillStyle='rgb(210,10,10)';
        context.fillRect(this.button.x,this.button.y,
                    this.button.width,this.button.height);
        context.fillStyle='rgb(255,255,0)';
        context.fillText("ИГРАТЬ",this.button.x+30,this.button.y+32);
    },
    update:function()
    {
        mX=mouseX-mouseOffsetX;
        mY=mouseY-mouseOffsetY;
        //
        if (mouseLeftClick())
        {   //alert();
            if (mX>this.button.x && mX<this.button.x+this.button.width &&
                    mY>this.button.y && mY<this.button.y+this.button.height
               )
            {
                
                this.being=false;
                pause=false;
                clearInterval(this.timerId);
            }
        }
    }
}


