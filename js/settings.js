this.nameSettingTypeArr = ['slider', 'toggle', 'selectKey'];
var changePropData = {
    flag:false,
    id:null,
    value:null,
}
var exceptionArrKey = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyR','Digit1','Digit2','Digi3','Digit4'
                        ,'F1','F5','F7','F11','F12','Tab','PrintScreen','NumLock','','Escape'];
var arrKeyRAM = ['KeyM','KeyG'];
function Settings() {
    this.being = false;
    this.flagClose = false;
    this.width = screenWidth;
    this.height = screenHeight;
    this.x = screenWidth/2-this.width/2;
    this.y = screenHeight/2-(this.height)/2;
    this.timerId = null;
    this.SledersX = 500;
    this.headerText = 'Настройки';
    this.flagChange = false;
    this.idProp = null;
    this.valueProp = null;
    //this.messageBox = new MessageBox();
   // this.selectKey = new SelectKey(100,100,'KeyB');
    this.propertyArr = [];
    this.buttonExit = { 
        width:40,
        height:40,
        x:null,
        y:null,
       
        colorText:'rgb(255,255,0)',
        text: 'X',
    }

    //this.buttonMainMenu = { 
    //    width:330,
    //    height:40,
    //    x:null,
    //    y:null,
       
    //    colorText:'rgb(255,255,0)',
    //    text: 'Выйти в главное меню',
    //         //levelBeingRedactor
       

    //}
    this.toggle = null;
    this.addProperty=function(id,label,type,xElem)
    {
        let y = this.propertyArr.length * 80 + 150;
        let yElem = y-20///null;
        //switch (type)
        //{
        //    case 'slider': yElem = y + 20; break; 
        //    case 'toggle': yElem = y + 20; break; 
        //    case 'selectKey': yElem = y + 20; break; 

        //}
        let property = new PropertyOne(id,50,y,type,xElem,yElem)
        property.strLabel = label;    
        this.propertyArr.push(property);
        console.log(this.propertyArr);
        //this.updateProp();
    }
    this.init=function()
    {
        //this.addProperty(0,'Кнопка гараж','toggle'/*'selectKey'*/,300);
        //this.addProperty(1,'Кнопка гараж','slider'/*'selectKey'*/,300);
        this.addProperty(2,'Кнопка гараж','selectKey',300);
        this.setPropertyById (2,'key','KeyM');
        this.addProperty(3,'Кнопка магазин','selectKey',300);
        this.setPropertyById(3,'key','KeyG');;
        //this.propertyArr[2].element.setExceptionArrKey(['KeyW','KeyA','KeyS','KeyD','KeyR',]);
        //this.buttonExit.x = this.x + this.width - this. buttonExit.width;
        //this.buttonExit.y = this.y ;
        //this.buttonMainMenu.x = this.x + this.width / 2 - this.buttonMainMenu.width / 2;
        //this.buttonMainMenu.y = this.y + 330; 
      //  this.volume.slider = new Slider(this.SledersX,this.y+this.volume.y-20,150,volumeSound,0,1);
      //  this.volume.slider.init();
        //Slider(x,y,width,value,min,max)
        //this.speedMotion.slider = new Slider(this.SledersX,this.y+this.speedMotion.y-20,150,speedMotionPanz,1,30);
        //this.speedMotion.slider.init();
       // this.toggle = new Toggle(this.SledersX+88, this.y + 275,autoStepEnd);
    }
    this.start=function()
    {
        this.being = true;
        //this.buttonMainMenu.text = levelBeingRedactor == false ? 'Выйти в главное меню' : 'Выйти в редактор';
        //this.timerId=setInterval(function(){
        //    if (settings.messageBox.being==false)
        //    {
        //        settings.update(); 
        //    }
        //    else
        //    {
        //        settings.messageBox.update();
        //        settings.messageBox.getSelect(function (value) {
        //            //console.log('select='+value);
        //            switch (value) {
        //                case 0:
        //                    {
        //                        settings.close();
        //                        autoGame = false;
        //                        if (levelBeingRedactor == false) {
        //                            bigText.close();
        //                            mainMenu.start();
                                    
        //                        }
        //                        else {
        //                            bigText.close();
        //                            exitInRedactor();
        //                            //searchRoute.deleteData();
                                   
        //                            //interface.select.type = null;
        //                            //interface.select.num = null;
        //                            loadGameMap(0, dataRAMLevel);
        //                            //redactorMode = true;
        //                        }
        //                        settings.messageBox.close();
        //                        break;
        //                    }
        //                case 1: { settings.messageBox.close(); break; }
        //            }
        //        });
        //    }
        //},30);
    }
    this.close=function()
    {
        this.being = false;
       // clearInterval(this.timerId);
        this.flagClose = true;
    }
    this.closing=function(callback)
    {
        if (this.flagClose==true)
        {
            this.flagClose = false;
            callback();
        }
    }
    this.draw=function()
    {
        if (this.being==true)
        {
            context.fillStyle = 'black';
            context.fillRect(this.x,this.y,this.width,this.height);

            //context.font = "32px serif";
            //context.fillStyle = 'yellow'
            //context.fillText('Настройки',this.x+230,this.y+30);
            let strHeader = this.headerText;
            context.font = '32px serif';
            context.fillStyle = 'yellow'
            let widthText = context.measureText(strHeader).width;
            context.fillText(strHeader, this.x + this.width / 2 - widthText / 2,this.y + 30);


            context.strokeStyle = 'red'//"rgb(128,128,128)";
            context.strokeRect(this.buttonExit.x,this.buttonExit.y,
                                this.buttonExit.width,this.buttonExit.height);

            context.font = "32px serif";
            context.fillStyle = this.buttonExit.colorText;
            context.fillText(this.buttonExit.text,this.buttonExit.x+8,this.buttonExit.y+30);

            for (let i = 0; i < this.propertyArr.length;i++)
            {
                context.font = this.propertyArr[i].fontSize+"px serif";
                context.fillStyle = 'white';
                context.fillText(this.propertyArr[i].strLabel,this.propertyArr[i].x,        
                                this.propertyArr[i].y);
                this.propertyArr[i].element.draw();
            }
            //context.strokeStyle = 'red'//"rgb(128,128,128)";

            //context.strokeRect(this.buttonMainMenu.x,this.buttonMainMenu.y,
            //                    this.buttonMainMenu.width,this.buttonMainMenu.height);

            //context.font = "32px serif";
            
            //context.fillText(this.buttonMainMenu.text,this.buttonMainMenu.x+8,this.buttonMainMenu.y+30);
            //context.fillStyle = this.buttonMainMenu.colorText;
            //let strHeader = this.buttonMainMenu.text;
            //context.font = '32px serif';
            //let widthText = context.measureText(strHeader).width;
            //context.fillText(strHeader,this.buttonMainMenu.x+ this.buttonMainMenu.width / 2 - widthText / 2, 
            //    this.buttonMainMenu.y+30);

            //context.font = "24x serif";
            //context.fillStyle = "white";
            //context.fillText('Громкость',this.x+this.volume.x,this.y+this.volume.y);
            //context.fillText("Скорость движения",this.x+20,this.y+200);
            //context.fillText("Автозавершение хода",this.x+20,this.y+300);
            //this.selectKey.draw();
            //this.volume.slider.draw();
            //this.speedMotion.slider.draw();
            //this.toggle.draw();
          //  settings.messageBox.draw();
        }
    }
    this.setPropertyById=function(id,prop,value)
    {
        for (let i = 0; i < this.propertyArr.length;i++)
        {
            //alert(7799);
            if (this.propertyArr[i].element.id==id)
            {
               // alert(7799);
                this.propertyArr[i].element[prop] = value;
            }
        }
    }
    this.update=function ()
    {   
        let mouseCLick = mouseLeftClick();
        if (mouseCLick==true)
        { 
            if (checkInObj(this.buttonExit,mouseX,mouseY)==true)
            {
               // saveDataStorage();
                this.close();
            } 
            
        }
        for (let i = 0; i < this.propertyArr.length;i++)
        {
            this.propertyArr[i].element.update(mouseCLick);
         
            let idFlag = null;
            this.propertyArr[i].element.change(function (value) {
                changePropData.flag = true;
//                changePropData.id = ;
                idFlag = true;
                changePropData.value = value;
               // alert(111);
            });
            if (idFlag==true) changePropData.id = this.propertyArr[i].id;
        }
        //var changePropData = {
        //    flag:false,
        //    id:null,
        //    value:null,
        //}
      //  this.selectKey.update(mouseCLick);
    }
    this.changeProp=function(callback)
    {
        if (changePropData.flag==true)
        {
           // alert(565);
            changePropData.flag = false;
            callback(changePropData.id,changePropData.value);
        }
    }

}
function PropertyOne(id,x,y,type,xElem,yElem) 
{
    this.id = id;
    this.x = x;
    this.y = y;
    this.strLabel='';
    this.fontSize = 25;
    this.typeName = '';
    this.element = null;
    if (checkElemArr(nameSettingTypeArr,type))
    {
        //this.type = type;
        this.typeName = type;
        switch (type)
        {
            case 'slider': this.element = new Slider(xElem, yElem,50, 10, 1, 100); break; 
            case 'toggle': this.element = new Toggle(xElem, yElem, false); break; 
            case 'selectKey': this.element = new SelectKey(xElem, yElem, 'KeyA'); break; 
        }
        this.element.id = this.id;
        //this.nameSettingTypeArr = ['slider', 'toggle', 'selectKey'];

    }
}
function Slider(x,y,width,value,min,max)// ползунок
{
    this.being = true;
    this.id=0;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 30;
    this.value = value;
    this.max = max;
    this.min = min;
    this.grabMouseBar = false;
    this.oldX = null;
    this.click = false;
    this.flagChange = false;
    this.countMousePress = null;
    this.bar={
        x: null,
        y: null,
        width:20,
        height:40,
    }
    this.updateBar=function()
    {
        this.bar.x = this.x + this.width * (this.value -this.min)/ (this.max - this.min);
        this.bar.y = this.y - (this.bar.height - this.height) / 2;
    }
    this.init=function()
    {
        //this.bar.x = this.x + this.width * this.value / (this.max - this.min);
        //this.bar.y = this.y - (this.bar.height - this.height) / 2;
        this.updateBar();
    }
    this.updateBar();
    this.draw=function()
    {
        context.fillStyle = "green";
        context.fillRect(this.x,this.y,this.width*(this.value-this.min)/(this.max-this.min),this.height);
        context.strokeStyle = "red";
        context.strokeRect(this.x,this.y,this.width,this.height);
        context.fillStyle = "red";
        context.fillRect(this.bar.x,this.bar.y,this.bar.width,this.bar.height);
        context.strokeStyle = "white";
        context.strokeRect(this.bar.x,this.bar.y,this.bar.width,this.bar.height);

    }
    this.clickBar=function(callback)
    {
        if (this.click==true)
        {
            this.click = false;
            if (checkInObj(this.bar,mouseX,mouseY)==true)
            {
                callback();
            }
            
        }
    }
    this.update=function()
    {
        if (mouseLeftPress==true)
        {
            
            if (checkInObj(this.bar,mouseX,mouseY)==true)
            {
                this.grabMouseBar = true;
            }
         
            if (this.grabMouseBar==true)
            {
                this.bar.x +=( mouseX - this.oldX);
                if (this.bar.x > this.x + this.width)
                {
                    this.bar.x = this.x + this.width;
                    this.grabMouseBar = false;
                }
                if (this.bar.x < this.x)
                {
                    this.bar.x = this.x;
                    this.grabMouseBar = false;
                }
                this.value = this.min+((this.max - this.min) * (this.bar.x - this.x) / this.width);
                this.flagChange = true;
            }
     
           // console.log(this.value);
            //if (this.countMousePress==null)
            //{
            //    this.countMousePress=1;
            //}
            //else
            //{
            //    this.countMousePress++;
            //}

        }  
        else
        {
            if (this.grabMouseBar==true)
            {
                this.click = true;
            }
            this.grabMouseBar = false;
            //if (this.countMousePress!=null && this.countMousePress<20)
            //{
            //    this.click = true;
            //    this.countMousePress = null;
            //}
            //this.countMousePress = null;
        }
        this.oldX = mouseX;
    }
    this.change=function(callback)
    {
        if (this.flagChange==true)
        {
            this.flagChange = false;
            callback(this.value);
        }
    }
}
function Toggle(x,y,valueOn)//  переключатель
{
    this.being = true;
    this.id=0;
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 30;
    this.depthRect = 4;
    this.valueOn = valueOn;
    this.flagChange = false;
    this.bar = {
        x:null,
        y:null,
        width:null,
        height:null,
        depth: 4,
    };
    this.bar.width = this.height - this.depthRect*2;
    this.bar.height = this.height - this.depthRect*2;
    this.calcBarX=function()
    {
        if (this.valueOn==true)
        {
            this.bar.x = this.x + this.width-this.depthRect-this.bar.width;

        }
        else
        {
            this.bar.x=this.x + this.depthRect;
        }
    }
    this.calcBarX();
    //this.bar.x = x + this.depthRect;
    this.bar.y = y + this.depthRect;
    
    this.draw=function()
    {
        context.save();
        context.strokeStyle = 'rgb(128,128,128)';
        context.lineWidth = this.depthRect;
        context.strokeRect(this.x,this.y,this.width,this.height);
        context.restore();

        context.save();
        context.fillStyle = this.valueOn==true?'rgb(128,128,255)':'rgb(128,128,128)';
        context.fillRect(this.bar.x,this.bar.y,this.bar.width,this.bar.height);

        context.strokeStyle = 'white';
        context.lineWidth = this.bar.depth;
        context.strokeRect(this.bar.x,this.bar.y,this.bar.width,this.bar.height);
        context.restore();
    }
    this.update=function(clickMouse)
    {
        if (clickMouse==true)
        {
            if (checkInObj(this,mouseX,mouseY))
            {
                this.valueOn = !this.valueOn;
                this.flagChange = true;
            }
            this.calcBarX();         
        }
    
    }
    this.change=function(callback)
    {
        if (this.flagChange==true)
        {
            this.flagChange = false;
            callback(this.valueOn);
        }
    }
}
function SelectKey(x,y,key)
{
    this.being = true;
    this.id=0;
    this.x = x;
    this.y = y;
    this.key = key;
    this.focusOn = false;
    this.count = 0;
    this.flashingColorArr = ['red', 'blue'];// цвета для мигания;
    this.colorFlashing = 'red';
    this.width = 150;
    this.height = 20;
    this.flagChange = false;
    this.exceptionArrKey = [];
    this.draw=function()
    {
        if (this.being==true)
        {
        //    context.save();
            if (this.focusOn==true)
            {
               
                context.fillStyle = this.colorFlashing;
                
            }
            else
            {
                context.fillStyle = 'grey';//серый
            }
            
            context.fillRect(this.x,this.y,this.width,this.height)
            context.fillStyle = 'yellow';
            let str = this.key;
            context.font = '18px Arial';
            let widthText = context.measureText(str).width;
            context.fillText(str,this.x+ this.width / 2 - widthText / 2, this.y+ 18);
            //context.restore();

            
        }

    }
    //this.setExceptionArrKey=function(valueArr)
    //{
    //    this.exceptionArrKey = valueArr;
    //}
    this.update=function(clickMouse)
    {
        if (clickMouse==true)      
        {
            if (checkInObj(this,mouseX,mouseY)==true)
            {
                this.focusOn = true;
            }
            else
            {
                this.focusOn = false;
            }

        }
        //this.colorFlashing = 'red';
        if (this.focusOn==true)
        {
            this.count++;
            let value=25;
            if (this.count>0 && this.count<=value)
            {
                                          //flashingColorArr
                this.colorFlashing = this.flashingColorArr[1];
            }
            else if (this.count>value && this.count<value*2)
            {
                this.colorFlashing = this.flashingColorArr[0];
            }
            else
            {
                this.count = 0;
            }
            if (getPressKeyNow()!=null)
            {
                if (checkElemArr(exceptionArrKey,getPressKeyNow())==false)
                {
                    if (checkElemArr(arrKeyRAM,getPressKeyNow())==false)
                    {
                        deleteElemArr(arrKeyRAM, this.key);
                        arrKeyRAM.push(getPressKeyNow());
                        this.key = getPressKeyNow();
                        this.flagChange = true;
                    }
                   

                }
                console.log(arrKeyRAM);
                //if (checkElemArr(this.exceptionArrKey,getPressKeyNow())==false)
                //{
                //    this.key = getPressKeyNow();
                //    this.flagChange = true;
                //}
            }
            //console.log(getPressKeyNow());
        }
    }
    this.change=function(callback)
    {
        if (this.flagChange==true)
        {
            this.flagChange = false;
            callback(this.key);
        }
    }
}