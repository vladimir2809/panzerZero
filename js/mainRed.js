var mapWidth=2400;
var mapHeight=2000;
var screenWidth=800;
var screenHeight=500;
var mapSize=40;
var context;
var scale=1;
var nameImageArr=["body10","body11",'body12','body13','body14','body15',
                "body101","body111",'body121','body131','body141',
                "body20","body21",'body22','body23','body24','body25',
                "tower1","tower2","tower3","tower4","box","bonusMoney","bonusXP",
                "bonusPatron",'bonusBullet','garage',
                'wall',"water","brickwall","badbrickwall",'bullet',"rocket",
                'patron','burst','burstBig','burstSmall','barrel',/*'barrel2',*/
                'ganIcon','shop',"star",'starContur','gate',"base"];
var imageArr=new Map();// массив картинок
var countLoadImage=0;// количество загруженных картинок
selectColor=0;// выбор цвета для дверей
var map={// обьект карта
    x:0,
    y:0,
    width:mapWidth,//mapSize*30,
    height:mapHeight,//mapSize*30,
    drawPerimetr:function()
    {
        for (let i=0;i<mapWidth/mapSize;i++)
        {
            drawSprite(context,imageArr.get("wall"),i*mapSize,0,camera,scale);;
            drawSprite(context,imageArr.get("wall"),i*mapSize,mapHeight-mapSize,camera,scale);;
        }
        for (let i=0;i<mapHeight/mapSize;i++)
        {
            drawSprite(context,imageArr.get("wall"),0,i*mapSize,camera,scale);;
            drawSprite(context,imageArr.get("wall"),mapWidth-mapSize,i*mapSize,camera,scale);;
        }
    }
}
var selectObj={
    tabMenu:null,
    numSelect:null,
}

camera={// обьект камера
    x:0,//mapWidth/2-screenWidth/2,
    y:0,//mapHeight/2-screenHeight/2,
    width:screenWidth,//mapSize*20,//screenWidth,
    height:screenHeight-50,//mapSize*15,//screenHeight,
    focusX:null,// точка на которую сфокусированна камера
    focusY:null,
    multScaling:1.5,// множитель маштабиравания обезательно должен быть 1.5
    summMultScalingX:1,// суммурный множетель смешения при маштабировании
    summMultScalingY:1,
    offsetX:0,// смешение камеры
    offsetY:0,
    countScaling:0,// количество маштабирований 
    power:4.42125,// степень для расчета смешения камеры при маштабировании
    flagMove:false,
    focusXY:function(x,y,map)// следить камерой за определеной точкой
    {
        this.focusX=x;
        this.focusY=y;
        this.x=x-this.width/2+this.offsetX;
        this.y=y-this.height/2+this.offsetY;
        if (x<map.x+(this.width/2)/scale) this.x=map.x;
        else if (x>map.x+(map.width-this.width/2/scale)) 
        {
            
          this.x=map.x+map.width-this.width/scale;
          //alert("123");
        }
        if (y<map.y+(this.height/2)/scale) this.y=map.y;
        else if (y>map.x+map.height-this.height/2/scale) this.y=map.y+map.height-this.height/scale;;
        if (this.height/scale > map.height)
        {
            this.y=0;
            console.log("YES1");
        }
        if (this.width/scale > map.width)
        {
            this.x=0;
            console.log("YES2");
         ///   console.log(this.width/2/scale+"   "+screenWidth);
        }
    },
    calcSummMultScaling:function()// посчитать сумарный множитель маштабирования
    {
        this.summMultScalingX=Math.pow(this.multScaling,this.countScaling);
        this.summMultScalingY=Math.pow(this.multScaling,this.countScaling);
    },
    scaling:function(value,scaleValue)// увеличить маштаб и переместить камеру
    {
        let k=this.multScaling;
        if (value>0)
        {
            this.countScaling++;
            // это формула смешения камеры так чтобы при маштабировании она 
            // смотрела на определенную точку
            // эту формулу я выводил более суток и она все равно зависит 
            // от определенного коэфецента power. рассчитана на 
            // маштабирование в 1.5 раза
            this.offsetX+=(this.width*k)/(Math.pow(k,this.power)*Math.pow(k,this.countScaling));
            this.offsetY+=(this.height*k)/(Math.pow(k,this.power)*Math.pow(k,this.countScaling)); 
            this.calcSummMultScaling();
             console.log("Offset "+this.offsetX+' '+this.offsetY);
            return scaleValue*k;
        }
        if (value<0)
        {
            this.offsetX-=(this.width*k)/(Math.pow(k,this.power)*Math.pow(k,this.countScaling));
            this.offsetY-=(this.height*k)/(Math.pow(k,this.power)*Math.pow(k,this.countScaling));  
            this.countScaling--;
            this.calcSummMultScaling();
             console.log("Offset "+this.offsetX+' '+this.offsetY);
            return scaleValue/k;
        }
        //console.log("Offset "+this.offsetX+' '+this.offsetY);
        return scaleValue;
    },
}
gates={
    
}
var objMap={
    x:0,
    y:0,
    lookX:0,
    lookY:0,
    width:mapWidth,
    height:mapHeight,
    objArr:[],
    draw:function()
    {
        context.fillStyle="#CCCCCC";
        context.fillRect(0,0,camera.width,camera.height);
        for(let i=0;i<this.objArr.length;i++)
        {
       //     drawSprite(context,image,x,y,camera,scale)
            let x=this.objArr[i].x;
            let y=this.objArr[i].y; 
            let dir=this.objArr[i].dir;
            let color=this.objArr[i].color;
            if (this.objArr[i].type=="gate")
            {
//                let x=this.objArr[i].x;
//                let y=this.objArr[i].y; 
//                let dir=this.objArr[i].dir;
                drawGate(x,y,dir,color,scale,false);
            }
            else if(this.objArr[i].type=='keyGate')
            {
              let color=this.objArr[i].color;  
                drawKeyForGate(color,x,y,scale);
            }
            else
            {
                drawSprite(context,imageArr.get(this.objArr[i].nameImage),
                            this.objArr[i].x,this.objArr[i].y,camera,scale);
            }
        }
    },
    checkMapSquad:function(x,y,width=0,height=0)
    {
        for (let i=0;i<this.objArr.length;i++)
        {
           // if (this.objArr[i].x==x && this.objArr[i].y==y)
            if (this.objArr[i].x+this.objArr[i].width>x&&
                this.objArr[i].x<x+width&&    
                this.objArr[i].y+this.objArr[i].height>y&&
                this.objArr[i].y<y+height
                )
            {
                return false;
            }
        }
        return true;
    },
    moveCamera:function ()
    {
        let speed=mapSize/2;
        if (checkPressKey("KeyW")&&this.lookY>=0) this.lookY-=speed;
        if (checkPressKey("KeyD")&&this.lookX+screenWidth<=mapWidth) this.lookX+=speed;
        if (checkPressKey("KeyS")&&this.lookY+screenHeight<=mapHeight)this.lookY+=speed;
        if (checkPressKey("KeyA")&&this.lookX>=0) this.lookX-=speed;
        camera.x=this.lookX;
        camera.y=this.lookY;
        //camera.focusXY(this.lookX,this.lookY,map);
//        console.log(camera.x+' '+camera.y);
        console.log(this.lookX+' '+this.lookY);
    },
    drawLook:function()
    {
        context.beginPath();
        context.fillStyle="#0000FF";
        context.moveTo(this.lookX-camera.x,this.lookX-camera.y);    
        context.arc(this.lookX-camera.x,this.lookY-camera.y,14, Math.PI*2,(Math.PI*2)-0.1,false);
        context.fill();
        context.closePath();  
    },
    
    
};
var selectInterface={
    x:1,
    y:450,
    width:screenWidth,
    heigth:150,
    being:false,
    tabMenu:0,
    widthTab:120,
    coordWall:[{x:20,y:450+40},{x:100,y:450+40},{x:180,y:450+40},],
    multGate:2.5,
    multBuilding:2,
    tabValues:["препятствия", "двери", "бочки", "танки","бонусы", "здания", "ключи"],
    drawImageByNum:function(tabMenu,num,xx=-1,yy=-1)
    {
            let nameImage=redactOption[tabMenu][num].nameImage;
            let x;
            let y;
            if (xx==-1 && yy==-1)
            {
                x=redactOption[tabMenu][num].x+this.x;
                y=redactOption[tabMenu][num].y+this.y; 
                let mult=this.multBuilding;
                if (tabMenu==5)
                {
                    context.save();;
                    context.scale(1/mult,1/mult);
                    x*=mult;
                    y*=mult;
                    
                }
                context.drawImage(imageArr.get(nameImage),x, y);
                if (tabMenu==5)
                {
                    context.restore();
                    //context.scale(1,1);
                }
            }
            else
            {
               x=xx;
               y=yy;
               drawSprite(context,imageArr.get(nameImage),x, y,camera,scale);
            }
           
    },
    draw:function()
    {
        context.fillStyle="#CCCCCC";
        context.fillRect(0,this.y,this.width,this.heigth);
        for(let i=0;i<this.tabValues.length;i++)
        {
            
            if (this.tabMenu==i)
            {
               context.fillStyle="#FFFF00"; 
               context.fillRect(this.widthTab*i+1,this.y+1,this.widthTab-1,19);
            }
           
            context.fillStyle="#00FF00";
            context.strokeStyle="#00FF00";
            context.font = '18px Arial';
            context.strokeRect(this.widthTab*i,this.y,this.widthTab,20);
            context.fillText(this.tabValues[i],this.widthTab*i+5,this.y+15);
            context.closePath();
        }
        for (let i=0;i<redactOption[this.tabMenu].length;i++)
        {
//            let nameImage=redactOption[this.tabMenu][i].nameImage;   
            if (this.tabMenu==1)
            {
                let  mult=this.multGate; 
                let x=redactOption[this.tabMenu][i].x;
                let y=redactOption[this.tabMenu][i].y;
                let dir=redactOption[this.tabMenu][i].dir;
                let width=redactOption[this.tabMenu][i].width;
                let height=redactOption[this.tabMenu][i].height;
                drawGate((this.x+x)*mult,(this.y+y)*mult,dir,
                                    colorsForGate[selectColor],1/mult,true);
                for (let i=0;i<8;i++)
                {
                   context.fillStyle=colorsObj[i].color;
                   context.fillRect(this.x+colorsObj[i].x,this.y+colorsObj[i].y,mapSize,mapSize);
                }
                if (selectObj.tabMenu==this.tabMenu && selectObj.numSelect==i)
                {
                    context.strokeStyle="#0000FF";
                    let mult=this.multGate;
                    context.strokeRect(this.x+x,this.y+y,width/mult,height/mult);
                }
//                drawGate((this.x+x)*mult,(this.y+y)*mult,dir,'#FF0000',1/mult,true);
//                drawGate((this.x+x)*mult,(this.y+y)*mult,dir,'#FF0000',1/mult,true);
//                drawGate((this.x+x)*mult,(this.y+y)*mult,dir,'#FF0000',1/mult,true);
            }
            else if(this.tabMenu==6)
            {
                //let keyGate={};
                x=redactOption[this.tabMenu][i].x+this.x;
                y=redactOption[this.tabMenu][i].y+this.y;
                color=redactOption[this.tabMenu][i].color;
                let colorRect='green';
                if (selectObj.tabMenu==this.tabMenu && selectObj.numSelect==i)
                {
                    colorRect='blue';
                }
                
                drawKeyForGate(color,x,y,1,colorRect);
            }
            else         
            {
                let x=redactOption[this.tabMenu][i].x;
                let y=redactOption[this.tabMenu][i].y;
                //            context.drawImage(imageArr.get(nameImage),this.x+x, this.y+y);\
                this.drawImageByNum(this.tabMenu,i);
            
                if (selectObj.tabMenu==this.tabMenu && selectObj.numSelect==i)
                {
                    context.strokeStyle="#0000FF";
                    if (this.tabMenu==5)
                    {
                        let width=redactOption[this.tabMenu][i].width;
                        let height=redactOption[this.tabMenu][i].height;
                        let mult=this.multBuilding;
                        context.strokeRect(this.x+x,this.y+y,width/mult,height/mult);
                    }
//                    else if(this.tabMenu==1)
//                    {
//                        let width=redactOption[this.tabMenu][i].width;
//                        let height=redactOption[this.tabMenu][i].height;
//                        let mult=this.multGate;
//                        context.strokeRect(this.x+x,this.y+y,width/mult,height/mult);
//                    }
                    else
                    {
                        context.strokeRect(this.x+x,this.y+y,mapSize,mapSize);
                    }
                }
            }
//            context.drawImage(imageArr.get("water"),this.coordWall[1].x,
//                                this.coordWall[1].y);
//            context.drawImage(imageArr.get("brickwall"),this.coordWall[2].x,
//                                this.coordWall[2].y);  
         
        }
    
        
        if (mY<this.y &&selectObj.tabMenu!=null && selectObj.numSelect!=null)
        {
            let posXY=this.calcXYScaling(mX,mY);
            if (selectObj.tabMenu==1)
            {
                let dir=redactOption[selectObj.tabMenu][selectObj.numSelect].dir;
                drawGate(posXY.x,posXY.y,dir,colorsForGate[selectColor],scale,false);
                
            }
            else
            {
                this.drawImageByNum(selectObj.tabMenu,selectObj.numSelect,posXY.x,posXY.y);
            }
            
        }
           
                   
                   
        
    },
    calcXYScaling:function(x,y)
    {
        let X;
        let Y;
        if (scale<=1)
        {
            X=Math.floor((mX/scale-camera.summMultScalingX+camera.x)/mapSize)*mapSize;
            Y=Math.floor((mY/scale-camera.summMultScalingY+camera.y)/mapSize)*mapSize;
        }
//        else
//        {
//            X=Math.floor((mX/**scale-camera.summMultScalingX*/)/mapSize)*mapSize;
//            Y=Math.floor((mY/**scale-camera.summMultScalingY*/)/mapSize)*mapSize;
//        }
        return {x:X,y:Y}
          
    },
    update:function()
    {
        mX=mouseX-mouseOffsetX;
        mY=mouseY-mouseOffsetY;
       //this.tabMenu=(this.tabMenu+1)%6;
        if (mouseLeftClick())
        {  
             
            
            for(let i=0;i<this.tabValues.length;i++)
            {
                
                if (mX>this.widthTab*i && mX<this.widthTab*(i+1) && mY>this.y && mY<this.y+20)
                {
                    this.tabMenu=i;
                    //alert(i);
                    break;
                    
                }
            }
            for (let i=0;i<redactOption[this.tabMenu].length;i++)
            {
               
                let x=redactOption[this.tabMenu][i].x;
                let y=redactOption[this.tabMenu][i].y;
                let width;
                let height;
                if (this.tabMenu==1 || this.tabMenu==5)
                {
                    width=redactOption[this.tabMenu][i].width;
                    height=redactOption[this.tabMenu][i].height;
                }
                else
                {
                    width=mapSize;
                    height=mapSize;
                }
                if (mX>this.x+x && mX<this.x+x+width 
                            && mY>this.y+y && mY<this.y+y+height)
                {
                    // alert(555);
                    selectObj.tabMenu=this.tabMenu;
                    selectObj.numSelect=i;
                }
                
                
            }
            for (let i=0;i<8;i++)
            {
                if (mX>this.x+colorsObj[i].x && mX<this.x+colorsObj[i].x+mapSize &&
                        mY>this.y+colorsObj[i].y && mY<this.y+colorsObj[i].y+mapSize)
                {
                    selectColor=i;
                    console.log(i);
               //     break;
                }
            }
       
            
        }  
        if (checkMouseLeft()==true)
        {
            if (mY<this.y &&selectObj.tabMenu!=null && selectObj.numSelect!=null)
            {
                let objOne=clone(redactOption[selectObj.tabMenu][selectObj.numSelect]);
                let posXY=this.calcXYScaling(mX,mY);
                objOne.x=posXY.x;
                objOne.y=posXY.y;
                if (this.tabMenu==5 || this.tabMenu==1)
                {
                    objOne.width=redactOption[selectObj.tabMenu][selectObj.numSelect].width;
                    objOne.height=redactOption[selectObj.tabMenu][selectObj.numSelect].height;
                    if (this.tabMenu==1)
                    {
                        objOne.color=colorsForGate[selectColor];
                    }
                }
                else
                {
                    objOne.width=0;
                    objOne.height=0;
                }
//                objOne.x=Math.floor((mX+camera.x)/mapSize)*mapSize;
//                objOne.y=Math.floor((mY+camera.y)/mapSize)*mapSize;

                if (objMap.checkMapSquad(objOne.x,objOne.y,
                            objOne.width,objOne.height)==true)
                {
                    objMap.objArr.push(objOne);
                    console.log(objMap);
                }
                console.log(objMap.objArr);
                
                
            }
        }
    },
}
function loadImageArr()// загрузить массив изображений
{
    // заполняем массив изображений именами
    for (let value of nameImageArr  )
    {
        let image=new Image();
        image.src="img/"+value+".png";        imageArr.set(value,image);
    }
    // проверяем загружены ли все изображения
    for (let pair of imageArr  )
    {
             imageArr.get(pair[0]).onload = function() {
                   countLoadImage++;
                   //console.log(imageArr);
                   console.log(countLoadImage);
                   if (countLoadImage==imageArr.size) 
                   {
                       imageLoad=true;
                    //  console.log(imageArr);
                   } // если загруженны все ищображения
             }
             imageArr.get(pair[0]).onerror = function() {   
                   alert("во время загрузки произошла ошибка");
                   //alert(pair[0].name);
                   
             }
     }  
}
function setOffsetMousePosXY(x,y)// устонавить смешения координаат для прицелевания так как экран начинается не в 0 0
{
    mouseOffsetX=x;
    mouseOffsetY=y;
}
window.addEventListener('load', function () {
    
    preload();
    create();
    
   // audio.play("shot");
    setInterval(drawAll,20);
    setInterval(function (){
        selectInterface.update();
        objMap.moveCamera();
        let resWhell=checkWheel();
        if (resWhell==-1&&scale>0.05) 
        { 
            scale=camera.scaling(-1,scale);
            console.log(scale);
            console.log(camera.x+' '+camera.y);
        }
        else if (resWhell==1 && scale<1)
        {
            scale=camera.scaling(1,scale);
            console.log(scale);
            console.log(camera.x+' '+camera.y);
        }
    },30);
   // setTimeout(gameLoop,60,1,true);
    //setTimeout(playSoundTrack,2000);
    
});
function preload()// функция предзагрузки
{
    //srand(1);
    let timeNow=new Date().getTime()
    srand(timeNow);
    loadImageArr(); 
    initKeyGate ();
    initColors();
 //   console.log(option[numOption].typePanzerArrGR0);

}

function create ()// функция создание обьектов неоюходимых для игры
{
        
        var canvas = document.getElementById("canvas");
        canvas.setAttribute('width',screenWidth/*camera.width*/);
        canvas.setAttribute('height',screenHeight/*camera.height*/);
        canvas.width = 800;//camera.width;//(window.innerWidth * 90) / 100;
        canvas.height = 600;//camera.height+200//(window.innerHeight * 90) / 100;
        canvas.style.setProperty('left', (window.innerWidth - canvas.width)/2 + 'px');
        canvas.style.setProperty('top', (window.innerHeight - canvas.height)/2 + 'px')
        context = canvas.getContext("2d");
        setOffsetMousePosXY((window.innerWidth - canvas.width)/2,
                            (window.innerHeight - canvas.height)/2);
        initKeyboardAndMouse(["KeyA","KeyS","KeyD","KeyW","KeyM","KeyB","KeyR",'ArrowLeft',
                    'ArrowRight','ArrowUp','ArrowDown',"Enter","KeyP","KeyO",'KeyG',"KeyM",
                    "KeyI","KeyK" ]);   
}
function drawAll()
{
     context.fillStyle='rgb(210,210,210)';
     context.fillRect(0,0,camera.width,camera.height+200);// очистка экрана
     objMap.draw();
   //  objMap.drawLook();
     map.drawPerimetr();
     selectInterface.draw();
}
function drawSprite(context,image,x,y,camera,scale)// функция вывода спрайта на экран
{
    if(!context || !image) return;
    context.save();
    context.scale(scale,scale);
    context.drawImage(image,x-camera.x,y-camera.y);
    context.restore();
}
function drawGate(x,y,dir,color,scale,flagCam=false)
{
   // let dir=gate.direction;
    let camX,camY;
    let gateX,gateY,gateAngle;
    if (flagCam==true)
    {
        camX=camera.x;
        camY=camera.y;
        camera.x=0;
        camera.y=0;
    }
    context.fillStyle=color;
    if (dir==1||dir==3)
    {
        drawSprite(context,imageArr.get("wall"),
                                    x,y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    x,y+mapSize,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    x+mapSize*4,y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    x+mapSize*4,y+mapSize,camera,scale);
        
      //  context.fillRect(gate.x+mapSize,gate.y,mapSize*3,mapSize*2);
          drawFillRectScale(x+mapSize,y,mapSize*3,mapSize*2,color,scale);
//        context.fillRect((gate.x+mapSize)*scale-(camera.x*camera.summMultScalingX),//-camera.x,//camera.summMultScalingX,
//                    gate.y*scale-(camera.y*camera.summMultScalingY),//-camera.y,//camera.summMultScalingY,
//                            mapSize*3*scale,mapSize*2*scale);
        
        if (dir==1)
        {            
            gateY=y;    
        }
        else if (dir==3)
        {
            gateY=y+mapSize;
        }
        gateAngle=0;
        gateX=x+mapSize;
        
    }
    if (dir==2||dir==4)
    {
        drawSprite(context,imageArr.get("wall"),
                                    x,y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    x+mapSize,y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    x,y+mapSize*4,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    x+mapSize,y+mapSize*4,camera,scale);
        //context.fillStyle="orange";
        drawFillRectScale(x,y+mapSize,mapSize*2,mapSize*3,color,scale);
//        context.fillRect(gate.x*scale-(camera.x*camera.summMultScalingX),//-camera.x,//camera.summMultScalingX,
//                    (gate.y+mapSize)*scale-(camera.y*camera.summMultScalingY),//-camera.y,//camera.summMultScalingY,
//                            mapSize*2*scale,mapSize*3*scale);
        if (dir==2)
        {            
            gateX=x;    
        }
        else if (dir==4)
        {
            gateX=x-mapSize;
        }
        gateAngle=90;
        gateY=y+mapSize*2;
       //drawTurnSprite(context,imageArr.get("gate"),gate.x-mapSize,gate.y+mapSize*2,90,60,20,camera,scale);
    }
    //if (gate.close==true)
    {
        drawTurnSprite(context,imageArr.get("gate"),gateX,gateY,gateAngle,
                                                  60,20,camera,scale);
    }
    if (flagCam==true)
    {
        camera.x=camX;
        camera.y=camY;
    }
}
function drawFillRectScale(x,y,w,h,color,scale=1)
{
    context.fillStyle=color;
    context.fillRect (x*scale-(camera.x*camera.summMultScalingX),
                        y*scale-(camera.y*camera.summMultScalingY),
                        w*scale,h*scale);
}
function drawTurnSprite(context,image,x,y,angle,x1,y1,camera,scale)// функция вывода повернутого спрайта на экран
{
    if(!context || !image) return;
//    context.save();
//    context.scale(scale,scale);
//    context.drawImage(image,x-camera.x,y-camera.y);
//    context.restore();
    context.save();
    context.translate((x+x1-camera.x)*scale,
                        (y+y1-camera.y)*scale);
    context.scale(scale,scale);
    context.rotate(angle*Math.PI/180);
    context.drawImage(image,-x1,-y1);
    context.restore();
}
function drawKeyForGate(color,x,y,scale,colorRect='green')
{
    //context.save();
    //context.closePath();
//    let oldScale;
//    let x;
//    let y;
//    if (rect==true && xx==-1 && yy==-1)
    {
        context.strokeStyle=colorRect;
        context.strokeRect (x*scale-(camera.x*camera.summMultScalingX),
                        y*scale-(camera.y*camera.summMultScalingY),
                        mapSize*scale,mapSize*scale);
        x=x+12;
        y=y+18;
        x=x*scale-(camera.x*camera.summMultScalingX);
        y=y*scale-(camera.y*camera.summMultScalingY);
    }
//    else 
//    {
//        oldScale=scale;
//        scale=0.8;
//        x=xx;
//        y=yy;
//       // console.log("scale");
//    }
    
    context.beginPath();
    context.fillStyle=color;
    context.arc(x,y, 9*scale, 0, degressToRadian(360));
    context.fill(); 
    context.closePath();
    
    context.beginPath();
    context.fillStyle="black";//keyGate.color;
    context.arc(x, y, 3*scale, 0, degressToRadian(360));
    context.fill();
    context.closePath();
    
    context.fillStyle=color ;
    context.fillRect(x+6*scale, y-2*scale,17*scale,5*scale);
    context.fillRect(x+(6+17-4)*scale,y-2*scale+5*scale,4*scale,3*scale);
//    if (rect==false && xx!=-1 && yy!=-1)
//    {
//        scale=oldScale;
//    }
    //console.log(scale);
 //   context.strokeRect (keyGate.x,keyGate.y,mapSize,mapSize);
    //context.stroke();
}