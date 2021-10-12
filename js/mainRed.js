var mapWidth=2000;
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
var map={// обьект карта
    x:0,
    y:0,
    width:mapWidth,//mapSize*30,
    height:mapHeight,//mapSize*30,
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
        if (this.height/scale > screenHeight)
        {
            this.y=0;
        }
        if (this.width/scale > screenWidth)
        {
            this.x=0;
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
            return scaleValue*k;
        }
        if (value<0)
        {
            this.offsetX-=(this.width*k)/(Math.pow(k,this.power)*Math.pow(k,this.countScaling));
            this.offsetY-=(this.height*k)/(Math.pow(k,this.power)*Math.pow(k,this.countScaling));  
            this.countScaling--;
            this.calcSummMultScaling();
            return scaleValue/k;
        }
        return scaleValue;
    },
}
var objMap={
    x:0,
    y:0,
    lookX:screenWidth/2,
    lookY:screenHeight/2,
    width:1000*40,
    height:1000*40,
    objArr:[],
    draw:function()
    {
        context.fillStyle="#CCCCCC";
        context.fillRect(0,0,camera.width,camera.height);
        for(let i=0;i<this.objArr.length;i++)
        {
       //     drawSprite(context,image,x,y,camera,scale)
            drawSprite(context,imageArr.get(this.objArr[i].nameImage),
                    this.objArr[i].x,this.objArr[i].y,camera,scale);
        }
    },
    checkMapSquad:function(x,y)
    {
        for (let i=0;i<this.objArr.length;i++)
        {
            if (this.objArr[i].x==x && this.objArr[i].y==y)
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
        if (checkPressKey("KeyD")&&this.lookX<=mapWidth) this.lookX+=speed;
        if (checkPressKey("KeyS")&&this.lookY<=mapHeight)this.lookY+=speed;
        if (checkPressKey("KeyA")&&this.lookX>=0) this.lookX-=speed;
        camera.focusXY(this.lookX,this.lookY,map);
    },
    drawLook:function()
    {
        context.beginPath();
        context.fillStyle="#0000FF";
        context.moveTo(screenWidth/2,screenHeight/2);    
        context.arc(screenWidth/2/*this.lookX*/,screenHeight/2/*this.lookY*/,14, Math.PI*2,(Math.PI*2)-0.1,false);
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
    tabValues:["препятствия", "двери", "бочки", "танки","бонусы", "гараж", "магазин"],
    drawImageByNum:function(tabMenu,num,xx=-1,yy=-1)
    {
            let nameImage=redactOption[tabMenu][num].nameImage;
            let x;
            let y;
            if (xx==-1 && yy==-1)
            {
                x=redactOption[tabMenu][num].x+this.x;
                y=redactOption[tabMenu][num].y+this.y; 
                context.drawImage(imageArr.get(nameImage),x, y);
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
            context.font = '18px Arial';
            context.strokeRect(this.widthTab*i,this.y,this.widthTab,20);
            context.fillText(this.tabValues[i],this.widthTab*i+5,this.y+15);
            context.closePath();
        }
        for (let i=0;i<redactOption[this.tabMenu].length;i++)
        {
//            let nameImage=redactOption[this.tabMenu][i].nameImage;
            let x=redactOption[this.tabMenu][i].x;
            let y=redactOption[this.tabMenu][i].y;
//            context.drawImage(imageArr.get(nameImage),this.x+x, this.y+y);\
            this.drawImageByNum(this.tabMenu,i);
            if (selectObj.tabMenu==this.tabMenu && selectObj.numSelect==i)
            {
                context.strokeStyle="#0000FF";
                context.strokeRect(this.x+x,this.y+y,mapSize,mapSize);
            }
//            context.drawImage(imageArr.get("water"),this.coordWall[1].x,
//                                this.coordWall[1].y);
//            context.drawImage(imageArr.get("brickwall"),this.coordWall[2].x,
//                                this.coordWall[2].y);
        }
        if (mY<this.y &&selectObj.tabMenu!=null && selectObj.numSelect!=null)
        {
        //    rotateXY.x*camera.summMultScalingX+mouseOffsetX
            //bulletArr[i].x*scale-camera.summMultScalingX
//            let x=Math.floor((mX/scale+camera.summMultScalingX/*+mapSize/2*/)/mapSize)*mapSize;//+mouseOffsetX;
//            let y=Math.floor((mY/scale+camera.summMultScalingY/*+mapSize/2*/)/mapSize)*mapSize;//+mouseOffsetY;
            let posXY=this.calcXYScaling(mX,mY);
            this.drawImageByNum(selectObj.tabMenu,selectObj.numSelect,posXY.x,posXY.y);
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
                if (mX>this.x+x && mX<this.x+x+mapSize 
                            && mY>this.y+y && mY<this.y+y+mapSize)
                {
                    // alert(555);
                    selectObj.tabMenu=this.tabMenu;
                    selectObj.numSelect=i;
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
//                objOne.x=Math.floor((mX+camera.x)/mapSize)*mapSize;
//                objOne.y=Math.floor((mY+camera.y)/mapSize)*mapSize;

                if (objMap.checkMapSquad(objOne.x,objOne.y)==true)
                {
                    objMap.objArr.push(objOne);
                    console.log(objMap);
                }
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
        if (resWhell==-1) 
        { 
            scale=camera.scaling(-1,scale);
            console.log(scale);
        }else if (resWhell==1 && scale<1)
        {
            scale=camera.scaling(1,scale);
            console.log(scale);
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
     objMap.drawLook();
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

