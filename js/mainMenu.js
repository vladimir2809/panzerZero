mainMenu={
    being:false,
    gameStart:false,
    timerId:null,
    widthOneItem:380,
    heightOneItem:80,
    dist:15,
    listSelectMain: ['Играть', 'Продолжить','Помошь','Выход' ],
    listSelectNewGame:['Да','Нет'],
    select:null,
    start:function()
    {
        //if (this.being==true)
        this.timerId=setInterval(function(){
           mainMenu.update(); 
        },50);
    },
    draw:function()
    {
        let y=150;
        let x = screenWidth/2-this.widthOneItem/2;
        context.fillStyle='rgb(0,0,0)';
        context.fillRect(0,0,camera.width,camera.height);// очистка экрана
        //context.fillStyle='rgb(210,210,0)';
        context.strokeStyle = 'rgb(210,210,0)';
        let sizeFont = 60;
        context.font = sizeFont+"px Arial";
        context.fillStyle='#FF8800';
        for (let i = 0; i < this.listSelectMain.length;i++)
        {
            let widthText = context.measureText(this.listSelectMain[i]).width;
            context.strokeRect(x,y+i*(this.heightOneItem+this.dist),this.widthOneItem,this.heightOneItem);
            let addX = this.widthOneItem / 2 - widthText / 2;
            //console.log(addX);
            context.fillText(this.listSelectMain[i],x+addX,y+i*this.heightOneItem+this.dist*i+this.heightOneItem/2+sizeFont/3);
        }
        //context.fillText("Играть.",20,y+80);
        //context.fillText("Продолжить.",20,y+120);
        //context.fillText("Помошь.",20,y+160);
        //context.fillText("Выход.",20,y+200);


        //context.fillStyle='rgb(210,210,210)';
        //context.fillRect(0,0,camera.width,camera.height);// очистка экрана
        //context.font = "58px Arial";
        //context.fillStyle='#FF8800';
        //context.fillText("PANZER-ZERO",165,60);
        //context.font = "38px Arial";
        //context.fillStyle='#3333FF';
        //let y=100;
        //context.fillText("WASD - Управление.",20,y+80);
        //context.fillText("1234 - Выбор оружия.",20,y+120);
        //context.fillText("Левая кнопка мыши - Стрелять.",20,y+160);
        //context.fillText("Колёсико мыши - сменить оружие.",20,y+200);
        //context.fillText("M - Магазин.",20,y+240);
        //context.fillText("G - Гараж.",20,y+280);
        //context.fillText("R - Войти в здание или открыть дверь.",20,y+320);
        //context.fillStyle='rgb(210,10,10)';
        //context.fillRect(this.button.x,this.button.y,
        //            this.button.width,this.button.height);
        //context.fillStyle='rgb(255,255,0)';
        //context.fillText("ИГРАТЬ",this.button.x+30,this.button.y+32);
    },
    update:function()
    {
        mX=mouseX-mouseOffsetX;
        mY=mouseY-mouseOffsetY;
        //
        //if (mouseLeftClick())
        //{   //alert();
        //    if (mX>this.button.x && mX<this.button.x+this.button.width &&
        //            mY>this.button.y && mY<this.button.y+this.button.height
        //       )
        //    {
                
        //        this.being=false;
        //        pause=false;
        //        clearInterval(this.timerId);
        //    }
        //}
    }    
}