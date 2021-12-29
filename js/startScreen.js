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
        let x=100;
        context.fillText("WASD - Управление.",20,x+80);
        context.fillText("1234 - Выбор оружия.",20,x+120);
        context.fillText("Левая кнопка мыши - Стрелять.",20,x+160);
        context.fillText("Колёсико мыши - сменить оружие.",20,x+200);
        context.fillText("M - Магазин.",20,x+240);
        context.fillText("G - Гараж.",20,x+280);
        context.fillText("R - Войти в здание или открыть дверь.",20,x+320);
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


