/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mapSize=40;
var screenWidth=800;
var screenHeight=600;
var mouseX=0;
var mouseY=0;
var bodyPanzerSprite = new Image();
var towerPanzerSprite = new Image();
var wallSprite= new Image();
var scale=1;// маштабированиве всех обьекто обязательно вначеле должно быть 1
var pressKeyArr=[];// массив нажатых клавиш в данный момент
var panzer={// класс танк
    x:800,
    y:800,
    width:30,
    height:30,
    towerX:null,
    towerY:null,
    mixTowerX:6.5,
    mixTowerY:18.5,
    mixTowerPosX:14.5,
    mixTowerPosY:15,
    towerWidth:10,
    towerHeight:10,
    angle:0,
    updateState:function()// обновить состояние танка, пересчитывается центральная точка
    {
        this.towerX=this.x-this.mixTowerX+this.mixTowerPosX;
        this.towerY=this.y-this.mixTowerY+this.mixTowerPosY;
    },
}
var map={// обьект карта
    x:0,
    y:0,
    width:mapSize*30,
    height:mapSize*30,
}
camera={// обьект камера
    x:0,
    y:0,
    width:mapSize*20,//screenWidth,
    height:mapSize*15,//screenHeight,
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
        }
        if (y<map.y+this.height/2/scale) this.y=map.y;
        else if (y>map.x+map.height-this.height/2/scale) this.y=map.y+map.height-this.height/scale;;
        if (this.height/2/scale > screenHeight)
        {
            this.y=0;
        }
        if (this.width/2/scale > screenWidth)
        {
            this.x=0;
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
var wall={// стена
    x:null,
    y:null,
    width:mapSize,
    height:mapSize,
}
wallArr=[];//массив стен
window.addEventListener('load', function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    bodyPanzerSprite.src = "img/body10.png";
    towerPanzerSprite.src = "img/tower1.png";
    wallSprite.src="img/wall.png";
    //.загрузка картинок
    bodyPanzerSprite.onload = function() {
          context.drawImage(bodyPanzerSprite,100,100);
    }
    towerPanzerSprite.onload = function() {
         context.drawImage(towerPanzerSprite,100,100);
    }
    wallSprite.onload = function() {
         context.drawImage(wallSprite,100,100);
    }
    //console.log(scale+" "+camera.x+" "+camera.y+" "+camera.dxScale);
    if (canvas.addEventListener) // событие врашеник колесиком
    {
        if ('onwheel' in document) 
        {
          // IE9+, FF17+, Ch31+
          canvas.addEventListener("wheel", onWheel);
        }
        else if ('onmousewheel' in document) {
          // устаревший вариант события
          canvas.addEventListener("mousewheel", onWheel);
        } 
        else
        {
          // Firefox < 17
          canvas.addEventListener("MozMousePixelScroll", onWheel);
        }
    } 
    else
    { // IE8-
        canvas.attachEvent("onmousewheel", onWheel);
    }
    function onWheel(e)
    {
        e = e || window.event;    
        var delta = e.deltaY || e.detail || e.wheelDelta;
        let k=camera.multScaling;
        let power=4.42125;
        if (delta>0)
        {      
            scale=camera.scaling(1,scale);  
        }
        if (delta<0)
        {
            scale=camera.scaling(-1,scale);
        }
        camera.focusXY(panzer.x+panzer.width/2,panzer.y+panzer.height/2,map);
        //console.log(scale+" "+camera.x+" "+camera.y+" "+camera.dxScale+" "+camera.countScaling);
    }
    initWall();// инициализировать стены
    window.addEventListener('mousemove', function () {
        mouseX=event.clientX;
        mouseY=event.clientY;
  });
  window.addEventListener('keydown', function () {
        let gameKeyArr=["KeyA","KeyS","KeyD","KeyW",'ArrowLeft',
            'ArrowRight','ArrowUp','ArrowDown'
        ]; 

        if (checkElemArr(gameKeyArr,event.code)==true &&
                 checkElemArr(pressKeyArr,event.code)==false)
        {
            pressKeyArr.push(event.code);
        }
        // console.log(pressKeyArr);
  });
  window.addEventListener('keyup', function () {
        deleteElemArr(pressKeyArr,event.code);
  })
  setInterval(game,30);
});
function checkPressKey(code)
{
    if(checkElemArr(pressKeyArr,code)==true) return true; else return false;
}
function control()// функция управление с клавиатуры и мыши
{
  /// console.log(pressKeyArr);
  speed=13;
    if (checkPressKey('KeyW')==true &&
            ( checkPressKey('KeyA') ||
            checkPressKey('KeyS') ||
            checkPressKey('KeyD') )==false) panzer.y-=speed;
    if (checkPressKey('KeyD')&&
            ( checkPressKey('KeyA') ||
            checkPressKey('KeyS') ||
            checkPressKey('KeyW') )==false) panzer.x+=speed;
    if (checkPressKey('KeyS')&&
            ( checkPressKey('KeyA') ||
            checkPressKey('KeyD') ||
            checkPressKey('KeyW') )==false) panzer.y+=speed;
    if (checkPressKey('KeyA')&&
            ( checkPressKey('KeyD') ||
            checkPressKey('KeyS') ||
            checkPressKey('KeyW'))==false) panzer.x-=speed; 
    // рассчитаем точку от которой нужно целится
    let rotateXY=mathTowerRotateXY(((panzer.x+panzer.mixTowerPosX)),
                  ((panzer.y+panzer.mixTowerPosY)),camera,map);
    panzer.angle= angleIm(rotateXY.x*camera.summMultScalingX, 
                          rotateXY.y*camera.summMultScalingY,mouseX,mouseY);
}
function game()// главный цикл
{
    control();
    panzer.updateState();
    context.clearRect(0,0,800,800);// очистка экрана
    camera.focusXY(panzer.x+panzer.width/2,panzer.y+panzer.height/2,map);
    // отрисовка
    drawPanzer(context,panzer,bodyPanzerSprite,towerPanzerSprite,camera,scale);
    for (let i=0;i<wallArr.length;i++)
    {
        drawSprite(context,wallSprite,wallArr[i].x,wallArr[i].y,camera,scale);
    }
    //console.log(wallArr[0].x);    
}
function mathTowerRotateXY(x,y,camera,map)// расчитать координаты на экране взависимости от положеиня на карте
{
    let resX=x-camera.x;
    let resY=y-camera.y;
    return {x:resX,y:resY};
}
function drawSprite(context,image,x,y,camera,scale)// функция вывода спрайта на экран
{
    if(!context || !image) return;
    context.save();
    context.scale(scale,scale);
    context.drawImage(image,x-camera.x,y-camera.y);
    context.restore();
}
function drawPanzer(context,obj,imageBody,imageTower,camera,scale)// функция рисования танка вместе с башней
{
    if(!context || !imageBody || !imageTower ) return;
    context.save();
    context.scale(scale,scale);
    context.drawImage(imageBody,obj.x-camera.x,obj.y-camera.y);
    context.restore();
    context.save();
    context.translate((obj.towerX+obj.mixTowerX-camera.x)*scale,
                        (obj.towerY+obj.mixTowerY-camera.y)*scale);
    context.scale(scale,scale);
    context.rotate(panzer.angle*Math.PI/180);
    context.drawImage(imageTower,-obj.mixTowerX,-obj.mixTowerY);
 //   console.log (obj.x+' '+obj.y+" "+obj.towerX+' '+obj.towerY);
    context.restore();
}
function newWall(x,y)// создать и вернуть новую стену
{
        wallRes=clone(wall);       
        wallRes.x=x;
        wallRes.y=y;
        return wallRes;
}
function initWall()// инициализирвать стены
{
    for (let i=0;i<map.width/mapSize;i+=1)
    {    
        for (let j=0;j<map.height/mapSize;j+=1)
        {
            if ((i==0 || i==(map.width/mapSize)-1) ||( j==0 || j==(map.height/mapSize)-1))
            {
                wallArr[wallArr.length]=newWall(i*mapSize,j*mapSize);
            }
           
        }
    }
    for (let i=0;i<220;i++)
    {   
        let x=0;
        let y=0;
        x=(randomInteger(1,map.width/mapSize-1-1))*mapSize;
        y=randomInteger(1,map.height/mapSize-1-1)*mapSize;
        wallArr[wallArr.length]=newWall(x,y);
    }
    //console.log(wallArr);
}