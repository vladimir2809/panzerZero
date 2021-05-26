var numOption=0;//номер настроек
var mapSize=option[numOption].mapSize;// размер ячейки карты
screenWidth=option[numOption].widthScreenBlock*mapSize;// ширина экрана
screenHeight=option[numOption].heightScreenBlock*mapSize;// высота экрана
var context;// контекс канвас
var mapWidth=option[numOption].mapWidthBlock*mapSize;// размер карты в ячейках по ширине
var mapHeight=option[numOption].mapHeightBlock*mapSize;// размер карты в ячейках по высоте
var scale=1;// маштаб карты
var quantityBurst=100;// количество взрывов
var mouseOffsetX=0;// смешение мыши для правильно прицеливания так как экран выровнян по сиредине
var mouseOffsetY=0;
var maxDistBullet=calcDist(0,0,screenWidth,screenHeight)/3.5;// максимальная дистанция полета пули
var quantityBox=option[numOption].quantityBox;// количество яшиков
var quantityBarrel=option[numOption].quantityBarrel;;// количество взрываюшихшя бочек
var quantityBullet=option[numOption].quantityBullet;;// количенство пуль
var quantityWall=option[numOption].quantityWall;// количество стен
var quantityWater=option[numOption].quantityWater;// количество Воды
var quantityBrickWall=option[numOption].quantityBrickWall;// количество кирпичных стен
var quantityPanzerGroup0=0;//option[numOption].quantityPanzerGroup0;// количество танков зеленых
var quantityPanzerGroup1=0;//option[numOption].quantityPanzerGroup1;// количество танков красных
var visibleGame=option[numOption].visibleGame;// отображение игры
var gamePlayer=option[numOption].gamePlayer;// играет ли игрок или игра идет автоматически
var playerGan=0;// номер оружия у танка игрока
var money=10000;// деньги игрока
var addMoney=0;
var timeAddMoney=0;
var levelPlayer=1;
var levelXPValue=[1000,2500,5000,8000,12000,20000,30000,50000,];
var XP=0;
var ganQuantityArr=[130,500,100,100];
var labelGanXY={x:635,y:40};
var win=0;// количество побед зеленых над красными
var maxPowerGroup;// максимальная мошность команды
var numBattle=0;// количество битв
var countBeforeUpload=0;// время задержки в циклах после того как бой закончен
let flagPressV=false;// флаг того что нажата кнопка отключить\включить отобюражение

var time=0;// время боя
var timeNow=0;// текушие время
var timeOld=0;// старое время перед боем
var quantityPanzer=quantityPanzerGroup0+quantityPanzerGroup1;// количесво такнов игре

var numPanzer=option[numOption].numPanzer;// номер танка которым можно управлять
var pause=false;// пауза игры
var countIterationGameLoop=0;// счетчик игровых циклов
// массив имен картинок для загрузки 
var nameImageArr=["body10","body11",'body12','body13','body14','body15',
                "body101","body111",'body121','body131','body141',
                "body20","body21",'body22','body23','body24','body25',
                "tower1","tower2","tower3","tower4","box",'wall',"water",
                "brickwall","badbrickwall",'bullet',"rocket",'patron','burst',
                'burstBig','burstSmall','barrel','barrel2','ganIcon','shop',
                "star",'starContur'];
var audio;
var soundTrack;
var flagSoundTrack=false;
var imageArr=new Map();// массив картинок
var imageLoad=false;// флаг того что все ресурсы загруженны
var loadLevel=false;// флаг того что уровень загружен
var countLoadImage=0;// количество загруженных картинок
var accuracyTest=1;
var countShot=0;
var countHits=0;
var countTestMixShot=0;
var viewTextInShop=false;
var strFile='';
// обьект танк
var panzer={
    numType:null,
    bodyNameImage:null,// имя картинки корпуса
    towerNameImage:null,// имя картинки башни
    speed:2,// скорость
    x:2*mapSize-mapSize/2,
    y:2*mapSize-mapSize/2,
    being:true,// сушествование
    HP:100,
    maxHP:this.HP,
    DMG:1,
    group:0,// номер команды
    width:30,
    height:30,
    towerX:null,// координаты башни
    towerY:null,
    mixTowerX:6.5,// смешение башни что бы она поворачивалась вокруг опреденлленой точки
    mixTowerY:18.5,
    mixTowerPosX:14.5,// координаты куда должна встать башня у корпуса
    mixTowerPosY:15,
    towerWidth:10,
    towerHeight:10,
    shotX:this.x,// координаты выстрела
    shotY:this.y,
    attackPatron:true,
    countAttack:0,// счетчик перезарядки
    timeAttack:10,// время перезарядки
    hitAttack:10,
    timeAttackPatron:1000/580,// время перезарядки пулемята
    timeAttackLaser:4,
    speedReaction:100,// скорость реакции при виде врага
    hitAttackPatron:1,
    maskGan:[],
    timeReaction:1000/this.speedReaction,// время реакции
    countReaction:0,// счетчик реакции
    accuracy:100,// точность
    angleTower:90,// угол башни 
    angleBody:90,// угол корпуса
    angleAim:0,// угол точки в которую нужно целится
    imTookAim:false,// флаг я прицелился
    direction:1,// напрвавление
    stopMove:false,// стоп движение
    imInShop:false,
    randII:0,// переменная для искуственного интелекта
    lineArr:[],
    mapUp:null,
    updateState:function()// обновить состояние танка, пересчитывается центральная точка
    {
        this.towerX=this.x-this.mixTowerX+this.mixTowerPosX;
        this.towerY=this.y-this.mixTowerY+this.mixTowerPosY;
    },
} ;
var map={// обьект карта
    x:0,
    y:0,
    width:mapWidth,//mapSize*30,
    height:mapHeight,//mapSize*30,
}
camera={// обьект камера
    x:mapWidth/2-screenWidth/2,
    y:mapHeight/2-screenHeight/2,
    width:screenWidth,//mapSize*20,//screenWidth,
    height:screenHeight,//mapSize*15,//screenHeight,
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
var box={
    x:null,
    y:null,
    being:false,
    width:mapSize,
    height:mapSize,
    sprite: null,
    lineArr:[],// массив линий для определение пересечения с прямой при расчетах
};
// обьект стена
var wall={
    sprite:null,
    x:null,
    y:null,
    being:false,
    type:0,// если тип 0 - это стена, 1 - вода, 2 - кирпичная стена
    HP:100,
    state:0,
    width:mapSize,
    height:mapSize,
    lineArr:[],// массив линий для определение пересечения с прямой при расчетах
};
var gateType={
    x:null,
    y:null,
    width:null,
    height:null,
    close:true,
    being:false,
    direction:1,
}
// обьект линия
var line={
  x:null,
  y:null,
  x1:null,
  y1:null,
  numObject:0,
};
// обьект пуля
var bullet={
  x:-10,
  y:-10,
  x1:null,
  y1:null,
  width:0,
  height:0,
  being:false,
  flagCalc:false,
  count:0,
  type:0,// тип
  angle:0,
  dist:0,// дистанция
  speed:10,
  hit:0,// урон
  spriteNameImage:['bullet','patron'],
  //hitPatron:3,
};
// взрыв
var burst={
  x:-20,
  y:-20,
  spriteNameImage:["burst",'burstBig',"burstSmall"],
  width:[49,120,17],
  height:[49,120,17],
  being:false,
  type:0,
  count:0,
  maxCount:[10,10,2],// макисмальный счет времени взрыва
};
// взрываюшаяся бочка
var barrel={
    x:-40,
    y:-40,
    being:false,
    sprite:null,
    width:mapSize,
    height:mapSize,
    distHit:100,// дистанция урона
    hit:100,
    lineArr:[],
};
shopImageType={
    being:true,
    x:null,
    y:null,
    width:200,
    height:200,
    entranceArr:[
        {x:80,y:0,width:40,height:40}, //наверху
        {x:160,y:80,width:40,height:40}, // справа
        {x:80,y:160,width:40,height:40}, // внизу   
        {x:0,y:80,width:40,height:40}, // слева
    ],
    entranceWidth:40,
    entranceHeight:40,
    lineArr:[],
    linePerimetrArr:[],
}
shopImage={};
leser={
    x:null,
    y:null,
    x1:null,
    y1:null,
    angle:null,
    hit:10000,
    being:false,

}
text={
    x:0,
    y:0,
    str:'',
    font:'',
}
boxArr=[];//массив яшиков
wallArr=[];// массив стен
gateArr=[];//массив дверей
burstArr=[];// массив взрывов
barrelArr=[];// массив бочек
bulletArr=[];// массив пуль
panzerArr=[];// массив танков
textArr=new Object();// массив текстов
//panzerArr.push(panzer);
function addText(key,font,fill,str,x,y)// добавить текс
{
    textArr[key]={font:font,fill:fill,str:str,x:x,y:y};
}
function setText(key,str,fill,x,y)// изменить текс
{
    if (key in textArr)
    {
        textArr[key].str=str;
        textArr[key].fill=fill;
        textArr[key].x=x;
        textArr[key].y=y;
    }
}
// событие загрузки страницы
window.addEventListener('load', function () {
    
    preload();
    create();
    
   // audio.play("shot");
    setInterval(drawAll,2);
    setTimeout(gameLoop,60,1,true);
    //setTimeout(playSoundTrack,2000);
    
});
function playSoundTrack()
{
    if (soundTrack.playing()==false)
    {
       soundTrack.play();
      // flagSoundTrack=true;
    }
}
//window.addEventListener("DOMContentLoaded",function() {
//
//       soundTrack.play();  
//        ;  
//
//});
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
                   
             }

     }
    
    
    
}
function calcQuantityPanzer()
{
 for (i=0;i<option[numOption].typePanzerArrGR0.length;i++)
    {
        quantityPanzerGroup0+=option[numOption].typePanzerArrGR0[i];
        //console.log(option[numOption].typePanzerArrGR0[i]);
    }
    for (i=0;i<option[numOption].typePanzerArrGR1.length;i++)
    {
        quantityPanzerGroup1+=option[numOption].typePanzerArrGR1[i];
        //console.log(option[numOption].typePanzerArrGR1[i]);
    }
 //   quantityPanzerGroup0++;
 //   quantityPanzerGroup1++;
    quantityPanzer=quantityPanzerGroup0+quantityPanzerGroup1;
    console.log('GR0'+quantityPanzerGroup0);
    console.log('GR1'+quantityPanzerGroup1);
}
function preload()// функция предзагрузки
{
    //srand(1);
    let timeNow=new Date().getTime()
    srand(timeNow);
    loadImageArr();   
    console.log(option[numOption].typePanzerArrGR0);
    addText('QuantityGan',"12px Arial","#0000FFAA","win",635,110);
    //addText('Shot/Hits',"18px Arial","#00FF00","win",100,100);
    addText('Level',"18px Arial","#00FF00","win",100,100);
    addText('Money',"18px Arial","#00FF00","win",100,100);
    addText('Balance',"18px Arial","#00FF00","win",100,150);
    addText('XP',"18px Arial","#00FF00","win",100,200);
    addText('Time',"18px Arial","#0000FF","win",100,250);
    addText('EnterShop',"18px Arial","#00FF00","Enter to in Shop",250,600);
    //Howler.autoUnlock = false;
    audio = new Howl({
        src: ['sound/sound.mp3'],
        volume: 1,
        sprite:{
            patron:[1,1418],
            shot: [5000,1613],
           // soundTrack:[10*1000,4*60*1000,true]
        },
       
//        onend: function () {
//          console.log('Finished sound!');
 //     }
    });
    soundTrack = new Howl({
        src: ['sound/BlitzKaskade.mp3'],
        //src: ['sound/ton.mp3'],
        volume: 0.6,
        //autoplay:false,
        loop:true,
//        onplayerror: function() {
//                soundTrack.once('unlock', function() {
//                soundTrack.play();
//            });       
//        }

    });
 //   soundTrack.play();
}

function create ()// функция создание обьектов неоюходимых для игры
{
        
        var canvas = document.getElementById("canvas");
        canvas.setAttribute('width',camera.width);
        canvas.setAttribute('height',camera.height);
        canvas.width = camera.width;//(window.innerWidth * 90) / 100;
        canvas.height = camera.height//(window.innerHeight * 90) / 100;
        canvas.style.setProperty('left', (window.innerWidth - canvas.width)/2 + 'px');
        canvas.style.setProperty('top', (window.innerHeight - canvas.height)/2 + 'px')
        context = canvas.getContext("2d");
        setOffsetMousePosXY((window.innerWidth - canvas.width)/2,
                            (window.innerHeight - canvas.height)/2);
        initKeyboardAndMouse(["KeyA","KeyS","KeyD","KeyW","KeyM","KeyB","KeyR",'ArrowLeft',
                    'ArrowRight','ArrowUp','ArrowDown',"Enter","KeyP" ]);
        //changeColorImg(context,imageArr.get('body10'),0xb5e61dff,0xdf0d00ff);
        
        calcQuantityPanzer();
        initPanzers();
        initBullet();
        initBurst();
        //initBox();
        initAllNoMoveObject();
//        boxArr=initNoMoveObject(quantityBox,box);
//        wallArr=initNoMoveObject(quantityWall,wall);
//        barrelArr=initNoMoveObject(quantityBarrel,barrel);
        //initWall();
        //initBarrel();
        playerGan=nextGan(1);
        loadLevel=true;
       

        
}
function drawAll()// нарисовать все
{
    if (imageLoad==true)// если изображения загружены
    {
        //context.clearRect(0,0,camera.width,camera.height);// очистка экрана
        if (shop.open==true)
        {
            shop.draw();
            return 0;
        }
        if (boxWindowSelect.open==true)
        {
            boxWindowSelect.draw();
            return 0;
        }
        context.fillStyle='rgb(210,210,210)';
        context.fillRect(0,0,camera.width,camera.height);// очистка экрана
        if (visibleGame==true)// если влючено отображение
        {
            
            drawSprite(context,imageArr.get("shop"),shopImage.x,shopImage.y,camera,scale)
            for (let i=0;i<boxArr.length;i++)
            {
                if (boxArr[i].being==true)
                if (checkCollision(camera,boxArr[i])==true || scale<=1)
                drawSprite(context,imageArr.get("box"),boxArr[i].x,boxArr[i].y,camera,scale);
            }
            drawGate(gateArr[0],1);
            for (let i=0;i<wallArr.length;i++)
            {
                if (wallArr[i].being==true)
                if (checkCollision(camera,wallArr[i])==true || scale<=1)
                {
                    if (wallArr[i].type==0)
                    {
                        drawSprite(context,imageArr.get("wall"),
                                    wallArr[i].x,wallArr[i].y,camera,scale);
                    }
                    if (wallArr[i].type==1)
                    {
                        drawSprite(context,imageArr.get("water"),
                                    wallArr[i].x,wallArr[i].y,camera,scale);
                    }
                    if (wallArr[i].type==2)
                    {
                        if (wallArr[i].state==0)
                        {
                            drawSprite(context,imageArr.get("brickwall"),
                                wallArr[i].x,wallArr[i].y,camera,scale);
                        }else if (wallArr[i].state==1)
                        {
                            drawSprite(context,imageArr.get("badbrickwall"),
                                wallArr[i].x,wallArr[i].y,camera,scale);
                        }
                    }
                }
            }
            for (let i=0;i<barrelArr.length;i++)
            {
                if (barrelArr[i].being==true)
                if (checkCollision(camera,barrelArr[i])==true || scale<=1)
                drawSprite(context,imageArr.get("barrel"),barrelArr[i].x,barrelArr[i].y,camera,scale);
            } 
            for (let i=0;i<bulletArr.length;i++)
            {
                if (bulletArr[i].being==true)
                if (checkCollision(camera,bulletArr[i])==true || scale<=1)
                {
                    if (bulletArr[i].type<2)
                    {
                        let image=imageArr.get(bulletArr[i].spriteNameImage[bulletArr[i].type]);
                        drawSprite(context,image,bulletArr[i].x,bulletArr[i].y,camera,scale);
                    }
                    else if(bulletArr[i].type==2)
                    {
                        console.log(bulletArr[i].type+" "+bulletArr[i].x+" "+bulletArr[i].y+" "+
                                 bulletArr[i].x1+" "+ bulletArr[i].y1);
                        drawLaser(bulletArr[i].x,bulletArr[i].y,
                                 bulletArr[i].x1, bulletArr[i].y1,camera,scale);
                    }
                    else if(bulletArr[i].type==3)
                    {
                        let image=imageArr.get("rocket");
                        
                        drawTurnSprite(context,image,bulletArr[i].x,bulletArr[i].y,
                        bulletArr[i].angle,7,16,camera,scale);   
                    }
                    
                }
            } 
            for (let i=0;i<panzerArr.length;i++)
            {
                if (panzerArr[i].being==true)
                if (checkCollision(camera,panzerArr[i])==true || scale<=1)
                drawPanzer(context,panzerArr[i],camera,scale);
            } 
            for (let i=0;i<burstArr.length;i++)
            {
                if (burstArr[i].being==true)    
                {
                   let image=imageArr.get(burstArr[i].spriteNameImage[burstArr[i].type]);
                   drawSprite(context,image,burstArr[i].x,burstArr[i].y,camera,scale);
                }
            }
        }
        for (key in textArr)
        {
            
            drawText(context,textArr[key]);
        }
        drawIconGan(playerGan);
        for (let i=0;i<shopImage.lineArr.length;i++)
        {
            context.beginPath();
            context.strokeStyle="#00FF00";
            context.moveTo(shopImage.lineArr[i].x,shopImage.lineArr[i].y); //передвигаем перо
            context.lineTo(shopImage.lineArr[i].x1,shopImage.lineArr[i].y1); //рисуем линию
            context.stroke();
        }
        for (let i=0;i<panzerArr[numPanzer].lineArr.length;i++)
        {
            context.beginPath();
            context.strokeStyle="#0000FF";
            context.moveTo(panzerArr[numPanzer].lineArr[i].x,panzerArr[numPanzer].lineArr[i].y); //передвигаем перо
            context.lineTo(panzerArr[numPanzer].lineArr[i].x1,panzerArr[numPanzer].lineArr[i].y1); //рисуем линию
            context.stroke();
        }
      
      
    }
}
function drawText(context,text)// нарисовать текс
{
  context.save();
  context.font = text.font;
  context.fillStyle=text.fill;
  context.fillText(text.str, text.x, text.y);
  context.restore();
}
function drawIconGan(numGan)
{
    if(!context || !imageArr.get('ganIcon')) return;
    context.save();
    //context.scale(scale,scale);
    context.drawImage(imageArr.get('ganIcon'),1+30*numGan,1,30,30,
                labelGanXY.x,labelGanXY.y,30,30);
    context.restore();
    context.fillStyle="#FF0000";
    context.fillRect(labelGanXY.x,labelGanXY.y+30,30,4);
    context.fillStyle="#00FF00";
    rectWidth=panzerArr[numPanzer].countAttack<maxPanzerTimeAttack(numPanzer)?
            panzerArr[numPanzer].countAttack/maxPanzerTimeAttack(numPanzer)*30:
            30;
    context.fillRect(labelGanXY.x,labelGanXY.y+30,rectWidth,4);
}
function drawSprite(context,image,x,y,camera,scale)// функция вывода спрайта на экран
{
    if(!context || !image) return;
    context.save();
    context.scale(scale,scale);
    context.drawImage(image,x-camera.x,y-camera.y);
    context.restore();
}
function drawTurnSprite(context,image,x,y,angle,x1,y1,camera,scale)// функция вывода спрайта на экран
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
function drawLaser(x,y,x1,y1,camera,scale)
{
    //context.fillStyle="#00FF00";
    context.beginPath();
    context.strokeStyle="#00FF00";
    //context.scale(scale,scale);
    context.moveTo((x-camera.x)*scale,(y-camera.y)*scale);
    context.lineTo((x1-camera.x)*scale,(y1-camera.y)*scale);
    context.stroke();

}
function drawPanzer(context,panzer,camera,scale)// функция рисования танка вместе с башней
{
    if(!context || !imageArr.get(panzer.bodyNameImage) || !imageArr.get(panzer.towerNameImage )) return;
    context.save();
    
    context.translate((panzer.x+panzer.width/2-camera.x)*scale,
                        (panzer.y+panzer.height/2-camera.y)*scale);
    context.scale(scale,scale);
    context.rotate(panzer.angleBody*Math.PI/180);                  
    context.drawImage(imageArr.get(panzer.bodyNameImage),-panzer.width/2/*-camera.x*/,
                       /*panzer.y-*/-panzer.height/2/*-camera.y*/);
    context.restore();
    
    context.save();
    context.translate((panzer.towerX+panzer.mixTowerX-camera.x)*scale,
                        (panzer.towerY+panzer.mixTowerY-camera.y)*scale);
    context.scale(scale,scale);
    context.rotate(panzer.angleTower*Math.PI/180);
    context.drawImage(imageArr.get(panzer.towerNameImage),-panzer.mixTowerX,-panzer.mixTowerY);
    context.restore();
 //   console.log(panzer.bodyNameImage);
}
function drawGate(gate,dir)
{
    if (dir==1)
    {
        drawSprite(context,imageArr.get("wall"),
                                    gate.x,gate.y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x,gate.y+mapSize,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x+mapSize*4,gate.y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x+mapSize*4,gate.y+mapSize,camera,scale);
        context.fillStyle="orange";
        context.fillRect(gate.x+mapSize,gate.y,mapSize*3,mapSize*2);
        
    }
}
//function playSoundTrack
function gameLoop(mult,visible)// игровой цикл
{
    //let mult=2;
    let multIter=1;
    let countUpload=1000;
    let countIter=visible==true?mult:mult*(countUpload/mult)*multIter;
    let countBreak=0;
//    if (imageLoad==true && countIterationGameLoop==0 ) 
//    {
//        console.log('good');
//        console.log(changeColorImg(context,imageArr.get('body10'), [181,230,29],[255,0,0]));
//        
//    }
    if (imageLoad==true && loadLevel==true)
    {
    
       // playSoundTrack();
        //обновим текст
        addText('QuantityGan',"13px Arial","#0000FF",+ganQuantityArr[playerGan],
                    labelGanXY.x+35,labelGanXY.y+12/*+30*/);
        let y=450;
        let stepY=25;
//        setText('Shot/Hits','Test:'+countTestMixShot+' HP1: '+panzerArr[0].HP+
//                '  HP2:'+panzerArr[1].HP,"#44FF44",10,y-stepY);
        setText('Level','Уровень: '+levelPlayer,"#44FF44",10,y);
        let str=money+"$";
        setText('Money',str,"#00FF00",screenWidth-90-str.length*10,55);
       // money++;
       // setText('Balance','HP1: '+panzerArr[0].HP+' HP2: '+panzerArr[1].HP,"#44FF44",10,y+stepY);
        setText('XP','XP: '+XP+"/"+levelXPValue[levelPlayer-1],
                                            "#FF0000",10,y+stepY);
        setText('Balance','Balance: '+calcBalance(false),
                calcBalance()<0?"#FF0000":"#00FF00",10,y+stepY*2);
        setText('Time','Time: '+Math.trunc(time),"#0000FF",10,y+stepY*3);
        if (checkInShop(numPanzer)==true)
        {
            if (viewTextInShop==false)
            {
                setText('EnterShop',"Press R to in Shop","#00FF00",(screenWidth/2)-80,400);
                viewTextInShop=true;
            }
        }
        else
        {
            if (viewTextInShop==true)
            {
                setText('EnterShop',"Enter to in Shop","#FFFFFF00",(screenWidth/2)-80,400);
                viewTextInShop=false;
            }
        }
        if (XP>=levelXPValue[levelPlayer-1]) levelPlayer++;
        if (timeAddMoney>=1000) 
        {
            
            money+=addMoney;
            timeAddMoney=0;
        }
        if(shop.open==false)controlHuman();// управление программой с клавиатуры
        if (gamePlayer==true && pause==false)panzerControll(numPanzer);// управление танком игрока
        // следим за танком игрока
        camera.focusXY(panzerArr[numPanzer].x+panzerArr[numPanzer].mixTowerPosX,
                panzerArr[numPanzer].y+panzerArr[numPanzer].mixTowerPosY,map);
        for (let k=0;k<countIter;k++ )// цикл в котором может несколько раз произоити игровые действия
        {
           
            for (let i=0;i<panzerArr.length; i++)// тики танков
            {
                if (panzerArr[i].being==true && pause==false 
                        && (i!=numPanzer || ( gamePlayer==false || visibleGame==false)))
                {
                      panzerControll(i);
                   if (countIterationGameLoop>option[numOption].delayBeforeAttack) 
                        panzerAutoAttack(i);
                }

            }
           // calibrationAccuracy();

            if (keyUpDuration('KeyP',300))
            {
                restartLevel();
            }
            if (keyUpDuration('KeyV',300)) // вкл\выкл отображение игры
            {
                if (flagPressV==false)
                {
                    visibleGame=!visibleGame;
                    flagPressV=true;
                    uploadLevel();
//                    countIterationGameLoop=0;
//                    countBeforeUpload=0;
                 }
            }
            else
            {
                flagPressV=false;
            }
            timeNow=new Date().getTime();
            time=timeNow-timeOld;
           if (shop.open==false && boxWindowSelect.open==false) timeAddMoney+=time;
            timeOld=new Date().getTime();
           //if (countIterationGameLoop>countUpload) // условия обновления уровня       
            if (killGroupPanzer()!=-1)
            {
//               timeNow=new Date().getTime();
//                time=timeNow-timeOld;
                countBeforeUpload++;
                if (countBeforeUpload>=mult*30)// задержка после боя
                {
                    numBattle++;
                    if (calcBalance()!=0)
                    {
                        if (calcBalance()>0) win++; else win--;
                    }
                    uploadLevel();
//                    countIterationGameLoop=0;
//                    countBeforeUpload=0;
                    countBreak++;
                    //timeOld=new Date().getTime();
                    break;
                }
            }
            if (pause==false)
            {
                controlBullets();
                boxAppearance();
                burstService();
                countIterationGameLoop++;
            }
            


        }
    }
    setTimeout(gameLoop,30,option[numOption].speedGame,visibleGame);
}
function calibrationAccuracy()
{
    if (countTestMixShot<=100)
    {
        if (countShot>=1000)
        {
            accuracyArr[countTestMixShot]={
                accuracy:accuracyTest,
                hits:Math.floor(countHits/countShot*100),
            }
            //Arr[i].lineArr[j]=JSON.parse(JSON.stringify(line));
            countShot=0;
            countHits=0;
            accuracyTest+=1;
            countTestMixShot++;
        }
    }
    else
    {
        strFile=JSON.stringify(accuracyArr);
        downloadAsFile(strFile);
        numBattle=0;
        accuracyTest=40;;
        strFile="";
        countTestMixShot=0;
        restartLevel();
        pause=true;

    }
}
function controlHuman()// управление программой человеком
{
    if (checkPressKey("KeyR"))
    {
       if (checkInShop(numPanzer)!=true) 
       {
           pause=!pause;
           if (pause==true) console.log(panzerArr[numPanzer]);
       }
       else
       {
          if(shop.open==false) shop.start();
       }
        //alert(myBinSearch(80,accuracyToHits,"accuracy","hits")/*accuracyToHits[0].accuracy*/);
    }
    if (keyUpDuration("Space",100)) 
    {
        nextNumPanzer(true);
    }
    if (keyUpDuration("NumpadSubtract",100)) 
    {
        scale=camera.scaling(-1,scale);
    }
    if (keyUpDuration("NumpadAdd",100)) 
    {
        scale=camera.scaling(1,scale);
    }
    if (keyUpDuration("Digit2",100)) 
    {
        playerGan=0;
    }
    if (keyUpDuration("Digit1",100)) 
    {
        playerGan=1;
    }
     if (keyUpDuration("Numpad1",100)) 
    {
        option[numOption].speedGame=1;
    }
    if (keyUpDuration("Numpad2",100)) 
    {
        option[numOption].speedGame=12;
    }
    if (keyUpDuration("Numpad3",100)) 
    {
        option[numOption].speedGame=100;
    }
    if (shop.open==false && checkPressKey("KeyM")) 
    {
          shop.start();
    }
    if (boxWindowSelect.open==false && checkPressKey("KeyB")) 
    {
         boxWindowSelect.start();
    }
    let resWhell=checkWheel();
    if (resWhell==-1) 
    {    //                      attackPatron
        if (panzerArr[numPanzer].attackPatron==false)
        {
            playerGan=nextGan(-1);
//            playerGan--;
//            if (playerGan==-1) playerGan=1;
         //    playerGan%=2;
        }
        else
        {
           playerGan=1;
        }
        
    }
    if (resWhell==1) // если сработало колесико мыши
    {
       // if (panzerArr[numPanzer].attackPatron==false)
        {
//            playerGan++;
//            playerGan%=4;
            playerGan=nextGan(1);
        }
      //  else
        {
       ///     playerGan=1;
        }

    }
   
}
function nextGan(dir)
{
    let count=0;
    let num=playerGan;
    
    while(count<ganQuantityArr.length)
    {
        if (dir>0) num++; else num--;
        if (num<0) num=ganQuantityArr.length-1;
        num=num%ganQuantityArr.length;
//        let flag=false;
//        
//        for (let i=0;i<ganQuantityArr.length;i++)
//        {
//            if (ganQuantityArr[i]>0) flag=true;
//        }
//        if (flag==false)
//        {
//            for (let i=0;i<panzerArr[numPanzer].maskGan.length;i++)
//            {
//                if (panzerArr[numPanzer].maskGan[i]==1)
//                {
//                    return i;
//                    break;
//                }
//            }
//        }
        if (/*ganQuantityArr[num]>0 &&*/
                panzerArr[numPanzer].maskGan[num]==1)
        {
            return num;
        } 
        else
        {
            count++;
        }
    }
    return playerGan;
    
}
function calcPanzerShotXY(num)// расчитать точку в которой должна появится пуля при выстреле
{
    
     panzerArr[num].shotY = 13 * 
             Math.sin(pi*(panzerArr[num].angleTower-90 ) / 180)+
               panzerArr[num].y+panzerArr[num].mixTowerPosY ;
     panzerArr[num].shotX= 13 * 
             Math.cos(pi * (panzerArr[num].angleTower -90) / 180)+
             panzerArr[num].x+panzerArr[num].mixTowerPosX ;
}
//function movePanzerKeyboard(num)// управление танком игрока человеком
//{
//    if (panzerArr[numPanzer].being==true)
//    {
//        if (checkMouseLeft()==true )// условие выстрела
//        {
//           calcPanzerShotXY(num);//            if  (/*  playerGan==0 &&*/ panzerArr[num].countAttack>=maxPanzerTimeAttack(num)&&
//                    ganQuantityArr[playerGan]>0)
//            {
//                
//                shot(panzerArr[num].shotX,panzerArr[num].shotY,
//                        panzerArr[num].angleTower+
//                                ((playerGan>=2)? 0:
//                        mixingShot(panzerArr[num].accuracy)),
//                        panzerArr[num].hitAttack,playerGan,
//                        playerGan==3?(mouseX-mouseOffsetX+camera.x):-1,
//                        playerGan==3?(mouseY-mouseOffsetY+camera.y):-1);
//                panzerArr[num].countAttack=0;
//                ganQuantityArr[playerGan]--;
//                console.log(panzerArr[num].x+' '+panzerArr[num].x+' '+
//                        ' '+panzerArr[num].shotX+" "+panzerArr[num].shotY+
//                        " "+mouseX+' '+mouseY);
//            }
////            if ( playerGan==1 && panzerArr[num].countAttack>=maxPanzerTimeAttack(num))
////            {
////                shot(panzerArr[num].shotX,panzerArr[num].shotY,
////                        panzerArr[numPanzer].angleTower+
////                        mixingShot(panzerArr[num].accuracy),panzerArr[num].hitAttackPatron,
////                        1);
////                panzerArr[num].countAttack=0;
////            }
//        }
//        var dx=0;
//        var dy=0;
//        // управление движением танка клавиатурой
//        if (checkPressKey("KeyW") && panzerArr[num].direction==1){
//            dx=0;
//            dy=-panzerArr[num].speed; 
//        }
//
//         if (checkPressKey("KeyD") && panzerArr[num].direction==2){
//            dx=panzerArr[num].speed;
//            dy=0; 
//        }
//
//         if (checkPressKey("KeyS") && panzerArr[num].direction==3){
//            dx=0;
//            dy=panzerArr[num].speed;
//        }
//        if (checkPressKey("KeyA") && panzerArr[num].direction==4){
//            dx=-panzerArr[num].speed;
//            dy=0;
//        }
//        // прибовляем смешение при движении
//        panzerArr[num].x+=dx;
//        panzerArr[num].y+=dy;
//        if (collissionPanzerSolid(num))// если танк столкнулся с твердым предметом
//        {
//            panzerArr[num].x-=dx;
//            panzerArr[num].y-=dy;
//        }
//        collisionPanzerBox(num);
//        // поворот танка перед началом движения
//        if (checkPressKey("KeyW")) {
//            panzerArr[num].direction=1;
//            panzerArr[num].angleBody=0;
//        }
//        if (checkPressKey("KeyD")){
//            panzerArr[num].direction=2;
//            panzerArr[num].angleBody=90;
//        }
//        if (checkPressKey("KeyS")){
//            panzerArr[num].direction=3;
//            panzerArr[num].angleBody=180;
//        }
//        if (checkPressKey("KeyA")){
//            panzerArr[num].direction=4;
//            panzerArr[num].angleBody=270;
//        }
//// расчитаем точку выстрела с разными положением камеры относительно края карты
//        rotateXY=mathTowerRotateXY(panzerArr[num].x+panzerArr[num].mixTowerPosX,
//                            panzerArr[num].y+panzerArr[num].mixTowerPosY);
//        let angleAim=angleIm(rotateXY.x*camera.summMultScalingX+mouseOffsetX,
//                             rotateXY.y*camera.summMultScalingY+mouseOffsetY,
//                             mouseX,mouseY);
//// плавно поварачиваем башню танка                             
//        panzerArr[num].angleTower=movingToAngle(panzerArr[num].angleTower,angleAim,100);
//        panzerArr[num].updateState();
//        // прибавляем счетчик задержки перезарядки
//        if (panzerArr[num].countAttack<maxPanzerTimeAttack(num) /*||
//            panzerArr[num].countAttack<panzerArr[num].timeAttackPatron*/) 
//        {
//            panzerArr[num].countAttack++;
//        }
//    }
//}
function panzerControll(num)// функция автоуправления танком
{
    var dx=0;
    var dy=0;
    if (checkMouseLeft()==true && num==numPanzer)// условие выстрела
        {
            calcPanzerShotXY(num);
            if  ((panzerArr[num].countAttack>=maxPanzerTimeAttack(num)&&
                    ganQuantityArr[playerGan]>0)&&
                    ( (checkPointCollisionAll(mouseX-mouseOffsetX+camera.x,
                      mouseY-mouseOffsetY+camera.y,true))==false||playerGan!=3)
                    )
            {
                
                shot(panzerArr[num].shotX,panzerArr[num].shotY,
                        panzerArr[num].angleTower+
                                ((playerGan>=2)? 0:
                        mixingShot(panzerArr[num].accuracy)),
                        panzerArr[num].hitAttack,playerGan,
                        playerGan==3?(mouseX-mouseOffsetX+camera.x):-1,
                        playerGan==3?(mouseY-mouseOffsetY+camera.y):-1);
                panzerArr[num].countAttack=0;
                ganQuantityArr[playerGan]--;
                console.log(panzerArr[num].x+' '+panzerArr[num].x+' '+
                        ' '+panzerArr[num].shotX+" "+panzerArr[num].shotY+
                        " "+mouseX+' '+mouseY);
                if (playerGan==1) audio.play("patron");
                if (playerGan==0) audio.play("shot");
            }
        }
    if (panzerArr[num].stopMove==false || num==numPanzer)
    {
        // случайно изменим напрвления движения время от времени
        if (randomInteger(0,300)>298)
        {
            panzerArr[num].randII=randomInteger(1,4);
        }
        if ((panzerArr[num].direction==1 && num!=numPanzer) ||
                ( num==numPanzer && checkPressKey("KeyW")))
        {
            dx=0;
            dy=-panzerArr[num].speed;
          //  playSoundTrack();       
        }

         if ((panzerArr[num].direction==2 && num!=numPanzer)  || 
                ( num==numPanzer && checkPressKey("KeyD")))
        {
            dx=panzerArr[num].speed;
            dy=0;
          //  playSoundTrack();
        }

         if ((panzerArr[num].direction==3  && num!=numPanzer)|| 
                ( num==numPanzer && checkPressKey("KeyS")))
        {
            dx=0;
            dy=panzerArr[num].speed;

          //  playSoundTrack();
        }
        if ((panzerArr[num].direction==4 && num!=numPanzer)|| 
                ( num==numPanzer && checkPressKey("KeyA")))
        {
            dx=-panzerArr[num].speed;
            dy=0;
         //   playSoundTrack();

        }
    }
    if ( num==numPanzer &&( checkPressKey("KeyA")||checkPressKey("KeyS")||
            checkPressKey("KeyD")||checkPressKey("KeyW")))
    {
        playSoundTrack();
    }
    panzerArr[num].x+=dx;
    panzerArr[num].y+=dy;
    if (collissionPanzerSolid(num))
    {
        panzerArr[num].x-=dx;
        panzerArr[num].y-=dy;
        panzerArr[num].randII=randomInteger(1,4);
    }
    collisionPanzerBox(num);
       if (dx!=0 || dy!=0)
       {
          
           panzerArr[num].updateState();
       }
       if (panzerArr[num].stopMove==false || num==numPanzer)
       {
            if ((panzerArr[num].randII==1 && num!=numPanzer)|| 
                ( num==numPanzer && checkPressKey("KeyW"))) {
                panzerArr[num].direction=1;
                panzerArr[num].angleBody=0;
                if ( num!=numPanzer)panzerArr[num].angleTower=0;
            }
            if ((panzerArr[num].randII==2 && num!=numPanzer)|| 
                ( num==numPanzer && checkPressKey("KeyD"))){
                panzerArr[num].direction=2;
                panzerArr[num].angleBody=90;
                if ( num!=numPanzer)panzerArr[num].angleTower=90;
            }
            if ((panzerArr[num].randII==3 && num!=numPanzer)|| 
                ( num==numPanzer && checkPressKey("KeyS"))){
                panzerArr[num].direction=3;
                 panzerArr[num].angleBody=180;
                if ( num!=numPanzer) panzerArr[num].angleTower=180;
            }
            if ((panzerArr[num].randII==4 && num!=numPanzer)|| 
                ( num==numPanzer && checkPressKey("KeyA"))){
                panzerArr[num].direction=4;
                panzerArr[num].angleBody=270;
                if ( num!=numPanzer) panzerArr[num].angleTower=270;
            }
        }
        if (num==numPanzer)
        {
            rotateXY=mathTowerRotateXY(panzerArr[num].x+panzerArr[num].mixTowerPosX,
                                panzerArr[num].y+panzerArr[num].mixTowerPosY);
            let angleAim=angleIm(rotateXY.x*camera.summMultScalingX+mouseOffsetX,
                                 rotateXY.y*camera.summMultScalingY+mouseOffsetY,
                                 mouseX,mouseY);
            // плавно поварачиваем башню танка                             
            panzerArr[num].angleTower=movingToAngle(panzerArr[num].angleTower,angleAim,100);
        }
        panzerArr[num].updateState();
        // прибавляем счетчик задержки перезарядки
//        if (panzerArr[num].countAttack<maxPanzerTimeAttack(num) /*||
//            panzerArr[num].countAttack<panzerArr[num].timeAttackPatron*/) 
//        {
//            panzerArr[num].countAttack++;
//        }
    if (panzerArr[num].countAttack<maxPanzerTimeAttack(num)) panzerArr[num].countAttack++;

}
function maxPanzerTimeAttack(num)
{
   if (gamePlayer==true && num==numPanzer)
   {
        if (playerGan<2)
        {
          return playerGan==1?panzerArr[num].timeAttackPatron:panzerArr[num].timeAttack; 
        }
        else if (playerGan==2)
            //                      timeAttackLaser
        {    
            return panzerArr[num].timeAttackLaser;
        }
   }
   return panzerArr[num].attackPatron==true?panzerArr[num].timeAttackPatron:panzerArr[num].timeAttack;
   
}
function panzerAutoAttack(num)// функция отвечаюшия за атаку танков ботов
{
    let minDist=maxDistBullet-1;//
    let numPanz=null;
    let numBarrel=null;
    let flag=false;
    // расчитаем минимальную дистанцию и номер танка в который нужно стрелять
    for (let i=0;i<panzerArr.length;i++)
    {
        if (panzerArr[i].being==true && i!=num && panzerArr[num].group!=panzerArr[i].group)
        {
//            if (PointCrossPanzerWall(num,{x:panzerArr[i].x+panzerArr[i].width/2,
//                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
//            if (PointCrossPanzerBarrel(num,{x:panzerArr[i].x+panzerArr[i].width/2,
//                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
//            if (PointCrossPanzerBox(num,{x:panzerArr[i].x+panzerArr[i].width/2,
//                    y:panzerArr[i].y+panzerArr[i].height/2})==false  ||
//                        panzerArr[num].attackPatron==false)
            if (crossPanzerToPanzer(num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2},i)==false)
            if (checkCrossLinePanzerArrObj(wallArr,num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
            if (checkCrossLinePanzerArrObj(barrelArr,num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
            if (checkCrossLinePanzerArrObj(boxArr,num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
                
            if (checkCrossLinePanzerShopImage(num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
            {
            
                let dx=panzerArr[num].x-panzerArr[i].x;
                let dy=panzerArr[num].y-panzerArr[i].y;
                let dist=Math.sqrt(dx*dx+dy*dy);
                if (dist<minDist && maxDistBullet>minDist)
                {
                    minDist=dist;
                    numPanz=i;
                    flag=true;
                }
                
            }
        }
        panzerArr[num].stopMove=flag;
    }
    
    
    // расчитаем номер бочки которую нужно атаковать чтобы нанести большой урон
    if (panzerArr[num].attackPatron==false)
    {
        for (let i=0;i<barrelArr.length;i++)
        if (barrelArr[i].being==true)
        {
            let dx=panzerArr[num].x-(barrelArr[i].x+mapSize/2);
            let dy=panzerArr[num].y-(barrelArr[i].y+mapSize/2);
            let dist=Math.sqrt(dx*dx+dy*dy);
            if (dist-5<maxDistBullet)
            {
               // if (PointCrossPanzerWall(num,{x:barrelArr[i].x+mapSize/2,
               //                                    y:barrelArr[i].y+mapSize/2})==false)
               if (checkCrossLinePanzerArrObj(wallArr,num,{x:barrelArr[i].x+barrelArr[i].width/2,
                    y:barrelArr[i].y+barrelArr[i].height/2})==false)
                {
                  //if (panzerArr[num].group ==0)
                  if (CalcAttackCommandBerrel(i)!=-1 && CalcAttackCommandBerrel(i)!=panzerArr[num].group  )  
                  {
                      //if (PointCrossPanzerBarrel(num,{x:barrelArr[i].x+mapSize/2,y:barrelArr[i].y+mapSize/2},i)==false)
                      if (checkCrossLinePanzerArrObj(barrelArr,num,{x:barrelArr[i].x+barrelArr[i].width/2,
                                y:barrelArr[i].y+barrelArr[i].height/2},i)==false)
                      {
                        numBarrel=i;
                        break;
                      }
                  }
                }
            }
}
    }
    let imReaction=false;// я среагировал
    if (numPanz!==null || numBarrel!==null)
    {
        panzerArr[num].countReaction++;
        if (panzerArr[num].countReaction>=panzerArr[num].timeReaction)
        {
            imReaction=true;
        }
    }
    else
    {
        panzerArr[num].countReaction=0;
       
    }
    // если есть что атаковать и время реакции прошло
    if (panzerArr[num].countAttack >= maxPanzerTimeAttack(num)
            
                && imReaction==true /*&& (numPanz!==null || numBarrel!==null)*/)
    {
        let attackX=0;
        let attackY=0;
        if (numPanz!==null)
        {
            attackX=panzerArr[numPanz].x;
            attackY=panzerArr[numPanz].y;
        }
        if (numBarrel!==null)
        {
            attackX=barrelArr[numBarrel].x+mapSize/2;
            attackY=barrelArr[numBarrel].y+mapSize/2;
        }
        panzerArr[num].angleAim=angleIm(panzerArr[num].x,panzerArr[num].y,attackX,attackY); 
        panzerArr[num].angleTower=movingToAngle(panzerArr[num].angleTower,panzerArr[num].angleAim,65);
        if (Math.abs(panzerArr[num].angleTower-panzerArr[num].angleAim)<1)
        {
            panzerArr[num].ImTookAim=true;// я прицелился
        }
        else
        {
             panzerArr[num].ImTookAim=false;
        }
        if (panzerArr[num].ImTookAim==true)// если прицелился то атаковать
        {
            calcPanzerShotXY(num);
            shot(panzerArr[num].shotX,panzerArr[num].shotY,
                    panzerArr[num].angleTower+
                            mixingShot(panzerArr[num].accuracy),
                            panzerArr[num].attackPatron==true?panzerArr[num].hitAttackPatron:
                                        panzerArr[num].hitAttack,
                            panzerArr[num].attackPatron==true?1:0);
            countShot++;
            panzerArr[num].countAttack=0;
        }
    }
}
function CalcAttackCommandBerrel(num)// расчитать какой команде будет нанесен вред если взорвятся бочка
{
    let flagGroup0=false;
    let flagGroup1=false;

    
    for (let i=0;i<panzerArr.length;i++)
    {
       if  (checkAttackBigBurstToPanz(barrelArr[num].x+mapSize/2,
                            barrelArr[num].y+mapSize/2,i,
                            barrelArr[num].distHit)==true)
       {
           if (panzerArr[i].group==0)
           {
               flagGroup0=true;
           } 
           else
            {
                flagGroup0=false;
                break;
            } 
       }
    }
    if (flagGroup0==true) return 0;
    for (let i=0;i<panzerArr.length;i++)
    {
       if  (checkAttackBigBurstToPanz(barrelArr[num].x+mapSize/2,
                            barrelArr[num].y+mapSize/2,i,
                            barrelArr[num].distHit)==true)
       {
           if (panzerArr[i].group==1)
           {
               flagGroup1=true;
               
           } else
           {
               flagGroup1=false;
               break;
           } 
       }
    }
    if (flagGroup1==true) return 1;
    return -1;
        
}
function searchNumWall(x,y)
{
    for (let i=0;i<wallArr.length;i++)
    {
        if (x>=wallArr[i].x && x<=wallArr[i].x+wallArr[i].width &&
                y>=wallArr[i].y && y<=wallArr[i].y+wallArr[i].height)
        {
            return i;
        }
    }
    return -1;
}
function controlBullets()// функция управления полетами пуль
{
    let speedBullet=20.0;
    // присоить новые координаты всем пулям
    for (let i=0;i<bulletArr.length;i++)
    {
        if (bulletArr[i].being==true)
        {
            if (bulletArr[i].type<2)
            {
                let dx=0;
                let dy=0;

                dy = speedBullet * Math.sin(pi*(bulletArr[i].angle - 90) / 180) ;
                dx = speedBullet * Math.cos(pi * (bulletArr[i].angle - 90) / 180) ;
                bulletArr[i].dist+=Math.sqrt(dx*dx+dy*dy);
                if (bulletArr[i].dist>maxDistBullet)
                {
                    killBullet(i);
                    continue;
                }
                bulletArr[i].x+=dx;
                bulletArr[i].y+=dy;
            }
            else if (bulletArr[i].type==2)// лазер
            {
                while (/*bulletArr[i].dist<maxDistBullet && */bulletArr[i].flagCalc==false)
                {
                    let dx=0;
                    let dy=0;

                    dy = speedBullet * Math.sin(pi*(bulletArr[i].angle - 90) / 180) ;
                    dx = speedBullet * Math.cos(pi * (bulletArr[i].angle - 90) / 180) ;
                    bulletArr[i].dist+=Math.sqrt(dx*dx+dy*dy);
                    bulletArr[i].x1+=dx;
                    bulletArr[i].y1+=dy;
                   // if (bulletArr[i].dist>=maxDistBullet)bulletArr[i].flagCalc=true;
                    if ((bulletArr[i].x1-camera.x)*scale<1 ||
                         (bulletArr[i].x1-camera.x)*scale>screenWidth||
                        (bulletArr[i].y1-camera.y)*scale<1 || 
                        (bulletArr[i].y1-camera.y)*scale>screenHeight)
                    {
                       bulletArr[i].flagCalc=true;
                    }
                    console.log("Laser "+x1+"  "+y1);
                    if (checkPointCollisionAll(bulletArr[i].x1,bulletArr[i].y1)==true)
                    if (checkWater(bulletArr[i].x1,bulletArr[i].y1)==false)    
//                    if (bulletArr[i].x1+bulletArr[i].width>shopImage.x &&
//                        bulletArr[i].x1<shopImage.x+shopImage.width &&
//                        bulletArr[i].y1+bulletArr[i].height>shopImage.y &&
//                        bulletArr[i].y1<shopImage.y+shopImage.height)
                    {
                       
                        let index=numObjPointCollision(bulletArr[i].x1,bulletArr[i].y1,panzerArr)
                        let index2=numObjPointCollision(bulletArr[i].x1,bulletArr[i].y1,boxArr)
                        //  alert("good");
                        if ((index!=numPanzer || index==-1) && index2==-1) // если не сам танк и не коробки
                        {  
                            bulletArr[i].flagCalc=true;
                            bulletArr[i].being=true;
                            if (index!=-1)
                            {
                                newBurst(panzerArr[index].x+panzerArr[index].width/2,
                                        panzerArr[index].y+panzerArr[index].height/2);
                            }
                            break;
                        }
                    }
                    else
                    {
                       
                    }
                    
                }
                if (bulletArr[i].count>=3)
                {
                    bulletArr[i].count=0;
                    bulletArr[i].flagCalc=false;
                    bulletArr[i].dist=0;
                    bulletArr[i].being=false;
                }
                else
                {
                    bulletArr[i].count++;
                }
                let index=numObjPointCollision(bulletArr[i].x1,bulletArr[i].y1,panzerArr)
                if (index!=-1&&index!=numPanzer)
                {
                   
                    killPanzer(index);
                }
            }
            else if(bulletArr[i].type==3)
            {
                let dx=0;
                let dy=0;

                dy = speedBullet * Math.sin(pi*(bulletArr[i].angle - 90) / 180) ;
                dx = speedBullet * Math.cos(pi * (bulletArr[i].angle - 90) / 180) ;
                bulletArr[i].dist+=Math.sqrt(dx*dx+dy*dy);
                bulletArr[i].x+=dx;
                bulletArr[i].y+=dy;
                if (bulletArr[i].x*scale-camera.summMultScalingX<bulletArr[i].x1+15*scale &&
                    bulletArr[i].x*scale-camera.summMultScalingX>bulletArr[i].x1-15*scale&&
                    bulletArr[i].y*scale-camera.summMultScalingY<bulletArr[i].y1+15*scale &&
                    bulletArr[i].y*scale-camera.summMultScalingY>bulletArr[i].y1-15*scale  )
                {
                    bulletArr[i].being=false;
                    newBurst(bulletArr[i].x,bulletArr[i].y,1);
                    attackPanzerBigBurst(bulletArr[i].x,bulletArr[i].y,
                        100,100);
                    
                }
                console.log("Rx:"+bulletArr[i].x+" Rx:"+bulletArr[i].y+
                        ' Rx1:'+bulletArr[i].x1+' Ry1:'+bulletArr[i].y1
                        )
            }
                
        }
    }
    for (let i=0;i<bulletArr.length;i++)
    {
        if (bulletArr[i].being==true && bulletArr[i].type<2)
        {
                if (checkCollisionArr(bulletArr[i],wallArr)!=-1||// пуля столкнулась со стеной или с магазином
                    (x>=shopImage.x && x<=shopImage.x+shopImage.width &&
                     y>=shopImage.y && y<=shopImage.y+shopImage.height))
                if (checkWater(bulletArr[i].x,bulletArr[i].y)==false) 
                {
                    if (bulletArr[i].type==0)
                    {
                        newBurst(bulletArr[i].x,bulletArr[i].y); 
                        
                        let numWall=searchNumWall(bulletArr[i].x,bulletArr[i].y);
                        if (numWall!=-1)
                        {
                            if (wallArr[numWall].type==2)
                            {
                                wallArr[numWall].HP-=20;
                                if (wallArr[numWall].HP<=50) wallArr[numWall].state=1;
                                if (wallArr[numWall].HP<=0)
                                {
                                    wallArr[numWall].being=false;
                                }
}
                        }
                    }
                    else
                    {
                        newBurst(bulletArr[i].x,bulletArr[i].y,2);
                    }  
                
                    killBullet(i);
                 
                    continue;  
                }
                index=checkCollisionArr(bulletArr[i],boxArr)// пуля столкнулась с яшиком
                if (index!=-1)
                {
                    if (bulletArr[i].type==0)
                    {
                        newBurst(bulletArr[i].x,bulletArr[i].y);
                        boxArr[index].being=false;
                        //boxArr.splice(index, 1); 
                    }
                    else
                    {
                        newBurst(bulletArr[i].x,bulletArr[i].y,2);
                    }
                    killBullet(i);
                    continue;
                }

                index=checkCollisionArr(bulletArr[i],barrelArr)// пуля столкнулась с бочкой
                if (index!=-1)
                {
                    if (bulletArr[i].type==0)
                    {
                      burstBarrel(index);
                    }
                    killBullet(i);
                    continue;

                }

                let flag=false;
                for (let j=0;j<panzerArr.length;j++)// пуля столкнулась с танком
                {
                    if (panzerArr[j].being==true)
                    {
                        if (checkCollision(bulletArr[i],panzerArr[j],0,0,
                                    panzerArr[j].width/2,panzerArr[j].height/2)==true)
                        {
                            if (bulletArr[i].type==0)
                            {
                                newBurst(bulletArr[i].x,bulletArr[i].y);
                            }
                            else
                            {
                                newBurst(bulletArr[i].x,bulletArr[i].y,2);
                            }
                            killBullet(i);
                            panzerArr[j].HP-=bulletArr[i].hit;
                            if(panzerArr[j].HP<=0 /*&& j!=0*/) 
                            {
                                killPanzer(j);
                                if  (j==numPanzer && gamePlayer==true)   nextNumPanzer();
                            }
                            ////console.log("bul col panz");
                            flag=true;
                            countHits++;
                            break;

                        }
                    }
                }
               // if (flag==true)   continue;
        }  
    }
    
}
function killPanzer(num)// убить танк
{
    panzerArr[num].being=false;
}
function killBullet(num)// убить пулю
{
     bulletArr[num].being=false;
     bulletArr[num].dist=0;
     bulletArr[num].flagCalc=false;
}
function checkBurstAttack(x,y)
{
    
}
function checkAttackBigBurstToPanz(x,y,nPanz,distBurst)// проверить может ли взрыв атаковать танк при взрыве
{

    
        if (panzerArr[nPanz].being==true)
        {
            let dx=x-panzerArr[nPanz].x;
            let dy=y-panzerArr[nPanz].y;
            let dist=Math.sqrt(dx*dx+dy*dy);
            if (dist<distBurst)
            {
//                if (checkCrossLinePanzerArrObj(wallArr,num,{x:panzerArr[i].x+panzerArr[i].width/2,
//                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
                if (checkCrossLinePanzerArrObj(wallArr,nPanz,
                    {x:x,y:y})==false)
                {
                    return true;
                }
            }
        }
        return false;
   
}
function attackPanzerBigBurst(x,y,hitBurst,distBurst)
{
    for (let i=0;i<panzerArr.length;i++)
    {
        if (checkAttackBigBurstToPanz(x,y,i,distBurst))
        {
            let dx=x-(panzerArr[i].x+panzerArr[i].mixTowerPosX);
            let dy=y-(panzerArr[i].y+panzerArr[i].mixTowerPosY);
            let dist=Math.trunc(Math.sqrt(dx*dx+dy*dy));
            if (dist<distBurst)
            {
                
                panzerArr[i].HP-=(distBurst-dist)/distBurst*hitBurst;
               // console.log((distBurst-dist)/distBurst*hitBurst);
                if(panzerArr[i].HP<=0 /*&& j!=0*/) 
                {
                    killPanzer(i);
                    if  (i==numPanzer)   nextNumPanzer();
                }
            }
        }
    }
}
function burstBarrel(num,destroy=true)// взрыв бочки
{
    newBurst(barrelArr[num].x+mapSize/2,barrelArr[num].y+mapSize/2,1);
    attackPanzerBigBurst(barrelArr[num].x+mapSize/2,barrelArr[num].y+mapSize/2,
            barrelArr[num].hit,barrelArr[num].distHit);
//    for (let i=0;i<panzerArr.length;i++)
//    {
//        if (checkAttackBigBurstToPanz(barrelArr[num].x+mapSize/2,
//                        barrelArr[num].y+mapSize/2,i,
//                        barrelArr[num].distHit))
//        {
//            let dx=barrelArr[num].x+mapSize/2-panzerArr[i].x;
//            let dy=barrelArr[num].y+mapSize/2-panzerArr[i].y;
//            let dist=Math.sqrt(dx*dx+dy*dy);
//            panzerArr[i].HP-=dist/barrelArr[num].distHit*barrelArr[num].hit;
//            if(panzerArr[i].HP<=0 /*&& j!=0*/) 
//            {
//                killPanzer(i);
//                if  (i==numPanzer)   nextNumPanzer();
//            }
//        
//        }
//    }
    if (destroy==true)
    {
        barrelArr[num].being=false;
        //barrelArr.splice(num, 1);
    }
    
}
function shot(x,y,angle,hit,type=0,x1=-1,y1=-1)// функция регистрации пули при выстреле
{
//    if (type<2)
//    {
        for (var i=0;i<bulletArr.length;i++)
        {
            if (bulletArr[i].being===false)
            {
                if ( (x1==-1 && y1==-1) )
                {
                    bulletArr[i].x1=bulletArr[i].x=x;
                    bulletArr[i].y1=bulletArr[i].y=y; 
                    bulletArr[i].angle=angle;
                  //  console.log("BAAAD");
                }
                else
                {
                    bulletArr[i].x=x;
                    bulletArr[i].y=y;
                    bulletArr[i].x1=x1;
                    bulletArr[i].y1=y1;
                    rotateXY=mathTowerRotateXY(x,y);
                    bulletArr[i].angle=angleIm(rotateXY.x*camera.summMultScalingX+mouseOffsetX,
                             rotateXY.y*camera.summMultScalingY+mouseOffsetY,
                             mouseX,mouseY);
//                    bulletArr[i].angle=angleIm(x/**camera.summMultScalingX+mouseOffsetX*/,
//                             y/**camera.summMultScalingY+mouseOffsetY*/,
//                             x1,y1);
                }
               
                bulletArr[i].being=true;
                bulletArr[i].flagCalc=false;
                
                bulletArr[i].type=type;
                bulletArr[i].hit=hit;

               // if (type==0) bulletArr[i].hit=10;
               // else if (type==1) bulletArr[i].hit=2;
                ////console.log('Shot'+' lemngth '+bulletArr.length+" i="+i);
                break;
            }

        }
    }
//    else if(type==2)
//    {
//        leser
//    }
    
    
    ////console.log(bulletArr);

function nextNumPanzer(live=false)// присвоить новый номер танка которым можно управлять
{
    let res=null;
    for (let i=live==false?0:numPanzer+1;i<panzerArr.length;i++)
    {
        if (panzerArr[i].being==true && panzerArr[i].group==0)
        {
            res=i;
            break;
        }
    }
    panzerArr[numPanzer].bodyNameImage='body1'+panzerArr[numPanzer].numType;// предыдуший танк раскрашиваем в родной цвет
    numPanzer=res==null?0:res;
    if (panzerArr[numPanzer].numType!=5)
    {
        panzerArr[numPanzer].bodyNameImage='body1'+panzerArr[numPanzer].numType+'1';
    }
    else
    {
        panzerArr[numPanzer].bodyNameImage='body15';
    }
    playerGan=nextGan(1);
    //console.log(panzerArr[numPanzer].bodyNameImage);
}
function burstService()// функция ослуживания тиков взрывов
{
    
    for (let i=0;i<burstArr.length;i++)
    {
        if (burstArr[i].being==true)
        {
            burstArr[i].count++;
            if (burstArr[i].count>=burstArr[i].maxCount[burstArr[i].type])
            {
                burstArr[i].count=0;
                burstArr[i].being=false;
            }
        }
    }
    
}
function newBurst(x,y,type=0)// функция регистрации взрыва
{
    for (let i=0;i<burstArr.length;i++)
    {
        if (burstArr[i].being==false)
        {
            burstArr[i].x=x-burstArr[i].width[type]/2;
            burstArr[i].y=y-burstArr[i].height[type]/2;
            burstArr[i].being=true;
            burstArr[i].type=type;
            ////console.log("burst");
            break;
        }
    }
    ////console.log(burstArr);
}
function collissionPanzerSolid(num)// столкновения танка ствердыми обьектами
{
    if (  checkCollisionArr(panzerArr[num],wallArr)!=-1||
          checkCollisionArr(panzerArr[num],barrelArr)!=-1||
          checkCollisionPanz(num,panzerArr)||
          panzerArr[num].x<0||
          panzerArr[num].x+panzerArr[num].width>mapWidth||
          panzerArr[num].y<0||
          panzerArr[num].y+panzerArr[num].height>mapHeight
          )
    {
        return true;
    }
    if (panzerArr[num].x+panzerArr[num].width>shopImage.x &&
        panzerArr[num].x<shopImage.x+shopImage.width &&
        panzerArr[num].y+panzerArr[num].height>shopImage.y &&
        panzerArr[num].y<shopImage.y+shopImage.height)
        {
            let res=true;
            let X=shopImage.x;
            let Y=shopImage.y;
            let pointArr=[
                {x:panzerArr[num].x,y:panzerArr[num].y},
                {x:panzerArr[num].x+panzerArr[num].width,
                            y:panzerArr[num].y},
                {x:panzerArr[num].x+panzerArr[num].width,
                            y:panzerArr[num].y+panzerArr[num].height},
                {x:panzerArr[num].x,y:panzerArr[num].y+panzerArr[num].height},
            ]
            let count=0;
            for (let i=0;i<shopImage.entranceArr.length;i++ )
            {
                let flag=false;
                for (let j=0;j<pointArr.length;j++)
                {
                    if (pointArr[j].x>shopImage.entranceArr[i].x &&
                        pointArr[j].x<shopImage.entranceArr[i].x+shopImage.entranceWidth  &&
                        pointArr[j].y>shopImage.entranceArr[i].y &&
                        pointArr[j].y<shopImage.entranceArr[i].y+shopImage.entranceHeight )
                    {
                       
                        if (num==numPanzer )res=false; else res=true;
                        if (checkCrossPerimeterPanzToLine(shopImage.lineArr,num))
                        {
                            res=true;
                           
                            ///break;
                        } 
                        flag=true;
                        break;
                    }
                    if (flag==true) break;
//                if (panzerArr[num].x+panzerArr[num].width>X+shopImage.entranceArr[i].x &&
//                    panzerArr[num].x<X+shopImage.entranceArr[i].x+shopImage.entranceWidth &&
//                    panzerArr[num].y+panzerArr[num].height>Y+shopImage.entranceArr[i].y &&
//                    panzerArr[num].y<Y+shopImage.entranceArr[i].y+shopImage.entranceHeight)
//                    {
//                        res=false;
//                        break;
//                    }
                }
            }
            return res;
        }
    return false;
}
function checkInShop(num)
{
    if (panzerArr[num].x/*+panzerArr[num].width*/>shopImage.x &&
        panzerArr[num].x+panzerArr[num].width<shopImage.x+shopImage.width &&
        panzerArr[num].y/*+panzerArr[num].height*/>shopImage.y &&
        panzerArr[num].y+panzerArr[num].height<shopImage.y+shopImage.height)
    {
        return true;
    }
    return false;
}
function collisionPanzerBox(num)// столкновения танка с ящиком
{
    index=checkCollisionArr(panzerArr[num],boxArr)
    if (index!=-1)
    {
        boxArr[index].being=false;
        if (num==numPanzer)
        {
            boxWindowSelect.start();
        }
            
        //boxArr.splice(index, 1); 
    }
}
function setOffsetMousePosXY(x,y)// устонавить смешения координаат для прицелевания так как экран начинается не в 0 0
{
    mouseOffsetX=x;
    mouseOffsetY=y;
}
function mathTowerRotateXY(x,y)// расчитать точку вокруг которой должна крутиться башня танка
{
    
  // var x=panzerArr[num].x+panzerArr[num].mixTowerPosX;
 ///  var y=panzerArr[num].y+panzerArr[num].mixTowerPosY;
   let resX=x-camera.x;
   let resY=y-camera.y;
   return {x:resX,y:resY};
}
function checkWater(x,y)
{
       objCheck={x:x,y:y,width:0,height:0};
       for (let i=0;i<wallArr.length;i++)
       {
            if (wallArr[i].being==true&&wallArr[i].type==1)
            {
                if (checkCollision(objCheck,wallArr[i],0,0,
                                        wallArr[i].width/2,wallArr[i].height/2)==true)

                {
                  return true;
                }

            }
        }   
        return false;
}
function checkPointCollisionAll(x,y,noPanzer=false)//попадает ли точка в какой ни будь обьект
{
    objCheck={x:x,y:y,width:0,height:0};
  //  panzerArr;
    if (panzerArr.length>0 && noPanzer==false)
    {
       for (let i=0;i<panzerArr.length;i++)
       {
            if (panzerArr[i].being==true)
            {
                if (checkCollision(objCheck,panzerArr[i],0,0,
                                        panzerArr[i].width/2,panzerArr[i].height/2)==true)

                {
                  return true;
                }

            }
        }
    }
  //  //console.log(boxArr.length); 
    if (x>=shopImage.x && x<=shopImage.x+shopImage.width &&
            y>=shopImage.y && y<=shopImage.y+shopImage.height)
    {
        return true;
    }
    if (wallArr.length>0 && checkCollisionArr(objCheck,wallArr)!=-1) return true;
    if (boxArr.length>0 && checkCollisionArr(objCheck,boxArr)!=-1) return true;
    if (barrelArr.length>0 && checkCollisionArr(objCheck,barrelArr)!=-1) return true;
   
    return false;

}
function checkKvadrMap(x,y)
{
        x=Math.floor(x);
        y=Math.floor(y);

     if (checkPointCollisionAll(x*mapSize+2,y*mapSize+2)==true) return true;
     if (checkPointCollisionAll(x*mapSize+mapSize/2,y*mapSize+2)==true) return true;
     if (checkPointCollisionAll(x*mapSize+mapSize-2,y*mapSize+2)==true) return true;
//     
     if (checkPointCollisionAll(x*mapSize+2,y*mapSize+mapSize/2)==true) return true;
     if (checkPointCollisionAll(x*mapSize+mapSize/2,y*mapSize+mapSize/2)==true) return true;
     if (checkPointCollisionAll(x*mapSize+mapSize-2,y*mapSize+mapSize/2)==true) return true;
//     
     if (checkPointCollisionAll(x*mapSize+2,y*mapSize+mapSize-2)==true) return true;
     if (checkPointCollisionAll(x*mapSize+mapSize/2,y*mapSize+mapSize-2)==true) return true;
     if (checkPointCollisionAll(x*mapSize+mapSize-2,y*mapSize+mapSize-2)==true) return true;
     //context.fillRect(x*mapSize+2,y*mapSize+mapSize-2,2,2);
     console.log(x+"  "+y);
     return false;
}
function numObjPointCollision(x,y,arr)
{
    objCheck={x:x,y:y,width:0,height:0};
  //  panzerArr;
    if (arr.length>0)
    {
       for (let i=0;i<arr.length;i++)
       {
            if (arr[i].being==true)
            {
                if (checkCollision(objCheck,arr[i],0,0,
                                        arr[i].width/2,arr[i].height/2)==true)

                {
                  return i;
                }

            }
        }
    }
    return -1;
  //  //console.log(boxArr.length);
}
function checkCollisionPanz(num,arrPanz)//проверка столкновений танков между собой
{
    for (i=0;i<arrPanz.length;i++)
    {
        if (num!=i && panzerArr[i].being==true)
        {
            if (checkCollision(arrPanz[num],arrPanz[i])==true)

            {
                return true;
            }
        }   
    }
   
    return false;
}
function checkCollision(obj1,obj2)// проверка столкновений двух прямоугольных обьектов
{
   ////console.log(obj1.x);
    x=obj1.x;//-dx;
    y=obj1.y;//-dy;
    x1=obj2.x;//-dx1;
    y1=obj2.y;//-dy1;
    ////console.log('x '+x+' y '+y+'  x1'+x1+'  y1'+y1+'  Dx1'+dx1+'  Dy1'+dy1);
    if (x<=x1+obj2.width && x+obj1.width>=x1 &&
        y<=y1+obj2.height && y+obj1.height>=y1)
    {
        return true;
    }
    else
    {
        return false;
    }
    
}
function checkCollisionArr(obj,arr)// сталкновение обьекта с массивом обьектов
{
    for (let i=0;i<arr.length;i++)
    {   
        if (arr[i].being==true)
        if (checkCollision(obj,arr[i]))
        {
            return i;
            break;
        }
    }
    return -1;
}
function initShopImage()// инициализировать обьект магазин 
{
    shopImage=JSON.parse(JSON.stringify(shopImageType));;
    let x=mapWidth/2-shopImage.width/2+mapSize;
    let y=mapHeight/2-shopImage.height/2+mapSize;
    
    shopImage.x=Math.floor(x/mapSize)*mapSize;
    shopImage.y=Math.floor(y/mapSize)*mapSize;
    for (let i=0;i<shopImage.entranceArr.length;i++ )
    {
        shopImage.entranceArr[i].x+= shopImage.x;
        shopImage.entranceArr[i].y+= shopImage.y;
    }
    for (let i=0;i<shopImage.entranceArr.length;i++ )
    {
        let buffer=calcLineArr(shopImage.entranceArr[i],i);
        for (let j=0;j<4;j++)
        {
            shopImage.lineArr.push(buffer[j]);
        }
        
    }
    deleteElemArrToNum(shopImage.lineArr,0);
    deleteElemArrToNum(shopImage.lineArr,4);
    deleteElemArrToNum(shopImage.lineArr,8);
    deleteElemArrToNum(shopImage.lineArr,12);
    
    let buffer=calcLineArr(shopImage,0);
    for (let j=0;j<4;j++)
    {
        shopImage.linePerimetrArr.push(buffer[j]);
    }
   // delete shopImage.lineArr[1];
    console.log(shopImage.linePerimetrArr);
//    for (let i=0;i<shopImage.entranceArr.length;i++ )
//    {
//        for (let j=0;j<4;j++)
//        {
//            shopImage.lineArr[j].x=shopImage.x+shopImage.entranceArr[i].x; 
//            shopImage.lineArr[j].y=shopImage.y+shopImage.entranceArr[i].y;
//            shopImage.lineArr[j].x1=shopImage.x+shopImage.entranceArr[i]+
//                                shopImage.entranceArr.entranceWidth; 
//            shopImage.lineArr[j].y1=shopImage.y+shopImage.entranceArr[i].y+
//                                shopImage.entranceArr.entranceWidth;
//        }
//    }
   
}
function initAllNoMoveObject()
{
    initShopImage();
    gateArr.push(initGate(1));
    boxArr=initNoMoveObject(quantityBox,box);
    wallArr=initNoMoveObject(quantityWall,wall);
    buffer= initNoMoveObject(quantityWater,wall,1);
    for (let i=0;i<buffer.length;i++)
    {
        for (let j=0;j<buffer[i].lineArr.length;j++)
        {
            buffer[i].lineArr[j].x=0;
            buffer[i].lineArr[j].y=0;
            buffer[i].lineArr[j].x1=0;
            buffer[i].lineArr[j].y1=0;
        }
    }
    wallArr = wallArr.concat(buffer);
    buffer= initNoMoveObject(quantityBrickWall,wall,2);
    wallArr = wallArr.concat(buffer);
    barrelArr=initNoMoveObject(quantityBarrel,barrel); 
}
function initGate(dir)
{
   let gate=JSON.parse(JSON.stringify(gateType));; 
   gate.direction=dir;//randomInteger(1,4);
   gate.x=(randomInteger(1,mapWidth/mapSize-1-1))*mapSize;
   gate.y=randomInteger(1,mapHeight/mapSize-1-1)*mapSize;
   if (gate.direction==1||gate.direction==3)
   {
       gate.width=2*mapSize;
       gate.height=5*mapSize;
   }
   if (gate.direction==2||gate.direction==4)
   {
       gate.width=5*mapSize;
       gate.height=2*mapSize;
   }
   return gate;
}
function initNoMoveObject(quantity,object,type=0)
{
    let arr=[];
    for (let i=0;i<quantity;i++)
    {
        // скопируем в него все свойства 
        arr[i]=JSON.parse(JSON.stringify(object));;
        let flag=false;
        let x=0;
        let y=0;
        do
        {
            flag=false;
            x=(randomInteger(1,mapWidth/mapSize-1-1))*mapSize;
            y=randomInteger(1,mapHeight/mapSize-1-1)*mapSize;
            flag=checkPointCollisionAll(x+mapSize/2,y+mapSize/2);
            if (x>=shopImage.x-mapSize && x<=shopImage.x+shopImage.width+mapSize &&
                y>=shopImage.y-mapSize && y<=shopImage.y+shopImage.height+mapSize)
            {
                 flag=true;
            }
            
        }
        while(flag==true/*&&i>0*/);
        arr[i].x=x;
        arr[i].y=y;
        arr[i].being=true;
        arr[i].type=type;
        arr[i].lineArr=calcLineArr(arr[i],i);

    }
    return arr;
}
//function initBox()
//{
//    	//boxArr=game.add.group();			
//    for (let i=0;i<quantityBox;i++)
//    {
//        // скопируем в него все свойства 
//         boxArr[i]=JSON.parse(JSON.stringify(box));;
//
//        let flag=false;
//        let x=0;
//        let y=0;
//        do
//        {
//            flag=false;
//            x=(randomInteger(1,mapWidth/mapSize-1-1))*mapSize;
//            y=randomInteger(1,mapHeight/mapSize-1-1)*mapSize;
//            flag=checkPointCollisionAll(x+mapSize/2,y+mapSize/2);
//        }
//        while(flag==true&&i>0);
//        boxArr[i].x=x;
//        boxArr[i].y=y;
//        boxArr[i].being=true;
//        boxArr[i]=calcLineArr(boxArr,i);
//
//    }
//}
/////функция раставления стен
//function initWall()
//{
//    for (let i=0;i<quantityWall;i++)
//    {
//        wallArr[i]=JSON.parse(JSON.stringify(wall));;
//        let flag=false;
//        let x=0;
//        let y=0;
//        do
//        {
//            flag=false;
//            x=(randomInteger(1,mapWidth/mapSize-1-1))*mapSize;
//            y=randomInteger(1,mapHeight/mapSize-1-1)*mapSize;
//            flag=checkPointCollisionAll(x+mapSize/2,y+mapSize/2);
//        }while(flag==true && i>0);
//        wallArr[i].x=x;
//        wallArr[i].y=y;
//        wallArr[i].being=true;
//        wallArr[i]=calcLineArr(wallArr,i);
//    }
//}
//function initBarrel()// функция раставления бочек
//{
//    for (let i=0;i<quantityBarrel;i++)
//    {
//        barrelArr[i]=JSON.parse(JSON.stringify(barrel));;
//        let flag=false;
//        let x=0;
//        let y=0;
//        do
//        {
//            flag=false;
//            x=randomInteger(1,mapWidth/mapSize-1-1)*mapSize;
//            y=randomInteger(1,mapHeight/mapSize-1-1)*mapSize;
//            flag=checkPointCollisionAll(x+mapSize/2,y+mapSize/2);
//        }while(flag==true && i>0);
//        barrelArr[i].x=x;
//        barrelArr[i].y=y;
//        barrelArr[i].being=true;
//        barrelArr[i]=calcLineArr(barrelArr,i);
//    }
//}
function calcLineArr(obj,i=-1)
{
   let lineArr=[];
   for (let j=0;j<4;j++)
        {
            lineArr[j]=JSON.parse(JSON.stringify(line));//clone(line);
            
            if (j==0) lineArr[j]={
                x:obj.x,
                y:obj.y,
                x1:obj.x+obj.width,
                y1:obj.y,
            }
            if (j==1) lineArr[j]={
                x:obj.x+obj.width,
                y:obj.y,
                x1:obj.x+obj.width,
                y1:obj.y+obj.height,
            }
            if (j==2) lineArr[j]={
                x:obj.x+obj.width,
                y:obj.y+obj.height,
                x1:obj.x,
                y1:obj.y+obj.height,
            }
            if (j==3) lineArr[j]={
                x:obj.x,
                y:obj.y+obj.height,
                x1:obj.x,
                y1:obj.y,
            }
            if (i!=1) lineArr[j].numObject=i;
            ////console.log(wallArr[i].lineArr[j].x);      
        }
        return lineArr;
}
function initPanzers()// функция инициализации танков
{
    let numType=0;
    let count=0;
    numPanzer=0;
    for (let i=0;i<quantityPanzer;i++)
    {
        {
            panzerArr[i]=clone(panzer);
            //let speedReaction=50;
            
            if (i<quantityPanzerGroup0 )
            {
                panzerArr[i].x=i*mapSize;
                panzerArr[i].y=1;
                panzerArr[i].group=0;
                let flag=false;
                let type=numType;
                //for (j=0;j<option[numOption].typePanzerArrGR0.length;j++)
                //if(flag==true)
                {
                    if (option[numOption].typePanzerArrGR0[numType]==count)
                    {
                        numType++;
                        count=1;
                    }
                    else
                    {
                        count++;
                    }
                }
                while (numType<=5/*|| flag==false*/)
                {
                
                    if (option[numOption].typePanzerArrGR0[numType]==0)
                    {
                        numType++;
                        //count=0;
                    
                    }
                    else
                    {
                        flag=true;
                        break;
                    }
                }
                for (var attr1 in panzerArr[i])
                {
                    for (var attr2 in panzerOption[numType])
                    {
                        if (attr1==attr2) 
                        {
                            panzerArr[i][attr1]=panzerOption[numType][attr2];
                        }
                    }
                }
               // console.log(panzerArr[i].bodyNameImage);
               
                if (i==numPanzer && panzerArr[numPanzer].numType!=5)
                {
                    panzerArr[numPanzer].bodyNameImage='body1'+
                                    panzerArr[numPanzer].numType+'1';
                }
                if (i==quantityPanzerGroup0-1)
                {
                    numType=0;
                    count=0;
                }
                //panzerArr[i].HP= option[numOption].panzerGreen[(i==0)?0:1].HP;//(i==0)?1000:100; 
                //panzerArr[i].speedReaction=option[numOption].panzerGreen[(i==0)?0:1].speedReaction;//(i==0)?10:speedReaction*2; 
                //panzerArr[i].accuracy=option[numOption].panzerGreen[(i==0)?0:1].accuracy;
            }
            else
            {
                panzerArr[i].x=mapWidth-(i-quantityPanzerGroup0+1)*mapSize;
                panzerArr[i].y=mapHeight-mapSize;
                panzerArr[i].group=1;

                {
                    if (option[numOption].typePanzerArrGR1[numType]==count)
                    {
                        numType++;
                        count=1;
                    }
                    else
                    {
                        count++;
                    }
                }
                while (numType<=5/*|| flag==false*/)
                {
                
                    if (option[numOption].typePanzerArrGR1[numType]==0)
                    {
                        numType++;
                        //count=0;
                    
                    }
                    else
                    {
                        flag=true;
                        break;
                    }
                }
                for (var attr1 in panzerArr[i])
                {
                    for (var attr2 in panzerOption[numType])
                    {
                        if (attr1==attr2) 
                        {
                            panzerArr[i][attr1]=panzerOption[numType][attr2];
                        }
                    }
                }
            //   panzerArr[i].bodyNameImage[4]='2';
                var str=panzerArr[i].bodyNameImage;
                console.log(str);
                panzerArr[i].bodyNameImage=str.replace('body1','body2');;
                console.log(panzerArr[i].bodyNameImage);
//                panzerArr[i].HP= option[numOption].panzerRed[(i==quantityPanzerGroup0)?0:1].HP;//(i==0)?1000:100; 
//                panzerArr[i].speedReaction=option[numOption].panzerRed[(i==quantityPanzerGroup0)?0:1].speedReaction;
//                panzerArr[i].accuracy=option[numOption].panzerRed[(i==quantityPanzerGroup0)?0:1].accuracy;
// 
            }
            
            panzerArr[i].being=true;
            panzerArr[i].maxHP=panzerArr[i].HP;
            panzerArr[i].stopMove=false;
            panzerArr[i].angleTower=0;
            panzerArr[i].angleBody=0;
            panzerArr[i].countAttack=0;//randomInteger(0,panzerArr[i].timeAttack);
            panzerArr[i].countReaction=0;
            panzerArr[i].timeReaction=3000/ (panzerArr[i].speedReaction*2);
            panzerArr[i].DMG*=panzerArr[i].attackPatron==false?
                ((100/panzerArr[i].timeAttack)*panzerArr[i].hitAttack):
                ((100/panzerArr[i].timeAttackPatron)*panzerArr[i].hitAttackPatron);
            panzerArr[i].DMG*=myBinSearch(panzerArr[i].accuracy,
                 accuracyToHits,"accuracy","hits")/100;
                console.log(panzerArr[i].DMG);
            console.log(panzerArr[i]);
        }   
    }
    
    //console.log(panzerArr);
}
function boxAppearance()
{
    for (let i=0;i<boxArr.length;i++)
    {
        if (boxArr[i].being==false)
        {
            boxOne=initNoMoveObject(1,box)[0];
            boxArr[i]=boxOne;
        }
    }
}
function initOnePanzer(x,y,GR,type)
{
    let onePanzer=clone(panzer);
    onePanzer.x=x;
    onePanzer.y=y;
    onePanzer.group=GR;
    for (var attr1 in onePanzer)
    {
        for (var attr2 in panzerOption[type])
        {
            if (attr1==attr2) 
            {
                onePanzer[attr1]=panzerOption[type][attr2];
            }
        }
    }
    if (GR==1)
    {
        var str=onePanzer.bodyNameImage;
        console.log(str);
        onePanzer.bodyNameImage=str.replace('body1','body2');;
    }           
    onePanzer.being=true;
    onePanzer.maxHP=onePanzer.HP;
    onePanzer.stopMove=false;
    onePanzer.angleTower=0;
    onePanzer.angleBody=0;
    onePanzer.countAttack=0;//randomInteger(0,onePanzer.timeAttack);
    onePanzer.countReaction=0;
    onePanzer.timeReaction=3000/ (onePanzer.speedReaction*2);
    onePanzer.DMG*=onePanzer.attackPatron==false?
        ((100/onePanzer.timeAttack)*onePanzer.hitAttack):
        ((100/onePanzer.timeAttackPatron)*onePanzer.hitAttackPatron);
    onePanzer.DMG*=myBinSearch(onePanzer.accuracy,
         accuracyToHits,"accuracy","hits")/100;
        console.log(onePanzer.DMG);
    let flag=false;
    for (let i=0;i<panzerArr.length;i++)
    {
        if (panzerArr[i].being==false)
        {
            flag=true;
            panzerArr[i]=clone(onePanzer);
        }
    }
    if (flag==false)
    {
        panzerArr.push(onePanzer);
    }  
}
function initBullet()// функция создания массива пуль
{
      for (let i=0;i<quantityBullet;i++)
        {
             bulletArr[i]=Object.create(bullet);
            // скопируем в него все свойства 
            for (var key in bullet) 
            {
              bulletArr[i][key] = bullet[key];
            }

        }
}
function initBurst()// функция сосзлания массива взрывов
{
      for (let i=0;i<quantityBurst;i++)
        {
             burstArr[i]=Object.create(burst);
            // скопируем в него все свойства 
            for (var key in burst) 
            {
              burstArr[i][key] = burst[key];
            }
            
        }
}
function restartLevel()
{
    for (let i=0;i<boxArr.length;i++)
    {
        boxArr[i].being=true;
    }  
    for (let i=0;i<barrelArr.length;i++)
    {
        barrelArr[i].being=true;
    } 
    for (let i=0;i<panzerArr.length;i++)
    {
        delete panzerArr[i].body;
        delete panzerArr[i].tower;
        delete panzerArr[i];
    }
    while (panzerArr.length>0)
    {
        panzerArr.splice(0,1);
    }
    initPanzers();
    countIterationGameLoop=0;
    countBeforeUpload=0;
    playerGan=nextGan(1);
}
function uploadLevel()// функция обновления уровня после того как бой закончен
{
    for (let i=0;i<panzerArr.length;i++)
    {
        delete panzerArr[i].body;
        delete panzerArr[i].tower;
        delete panzerArr[i];
    }
    for (let i=0;i<boxArr.length;i++)
    {
        delete boxArr[i];
    }
    for (let i=0;i<wallArr.length;i++)
    {
        delete wallArr[i];
    }
    for (let i=0;i<barrelArr.length;i++)
    {
        delete barrelArr[i];
    }
        
        
    
    
    let i=0;
    while (panzerArr.length>0)
    {
        panzerArr.splice(i,1);
    }
    while (boxArr.length>0)
    {
        boxArr.splice(i,1);
    }
    while (wallArr.length>0)
    {
        wallArr.splice(i,1);
    }
    while (barrelArr.length>0)
    {
        barrelArr.splice(i,1);
    }
    initPanzers();
    initAllNoMoveObject();
//    initBox();
//    initWall();
//    initBarrel();
    calcBalance(false,true);
    countIterationGameLoop=0;
    countBeforeUpload=0;
//    //console.log('USPEH');
//    //console.log(panzerArr.length);
//    //console.log(bulletArr.length);
//    //console.log(boxArr.length);
//    //console.log(wallArr.length);
//    //console.log(barrelArr.length);
//    //console.log(lineWallArr.length);
//    //console.log(lineBarrelArr.length);
//    //console.log('USPEH');
}

function VectMult( ax,  ay,  bx, by)
{
       
}

function IsCrossing( a1x,  a1y,  a2x,  a2y,  b1x, b1y,  b2x,  b2y)
{

}

function CrossingPoint(a1,  b1,  c1,  a2,  b2,  c2)
{
    
}
function GetCrossVector(aP1, aP2,  bP1,  bP2)
{

}
function checkCrossLinePanzerArrObj(arr,num,point,numNeg=-1)
{
      let pPanz={x:panzerArr[num].x+panzerArr[num].width/2,
                y:panzerArr[num].y+panzerArr[num].height/2};
    for (let i=0;i<arr.length;i++)
    {
        if (arr[i].being==true )
        {
            
            ////console.log('true');
            for (let j=0;j<4;j++)
            {
                if (IsCrossing( pPanz.x, pPanz.y,  point.x,point.y,
                    arr[i].lineArr[j].x,arr[i].lineArr[j].y,
                    arr[i].lineArr[j].x1, arr[i].lineArr[j].y1)) 
                    {
                        if (numNeg!=i) return true;
                    }
            }
        }
    }
    return false;
}
function checkCrossLinePanzerShopImage(num,point)
{
     let pPanz={x:panzerArr[num].x+panzerArr[num].width/2,
                y:panzerArr[num].y+panzerArr[num].height/2};
        
        if (shopImage.being==true )
        {        
            ////console.log('true');
            for (let j=0;j<4;j++)
            {
                if (IsCrossing( pPanz.x, pPanz.y,  point.x,point.y,
                    shopImage.linePerimetrArr[j].x,shopImage.linePerimetrArr[j].y,
                    shopImage.linePerimetrArr[j].x1, shopImage.linePerimetrArr[j].y1)) 
                    {
                        return true;
                    }
            }
        }
        return false;
}
function checkCrossPerimeterPanzToLine(lineArr,numPanz)
{
    panzerArr[numPanz].lineArr=calcLineArr(panzerArr[numPanz],numPanz);
    for (let i=0;i<panzerArr[numPanz].lineArr.length;i++)
    {
//        panzerArr[i].lineArr=calcLineArr(panzerArr[i],i);
        
        for (let j=0;j<lineArr.length;j++)
        {
            if (IsCrossing( panzerArr[numPanz].lineArr[i].x,
                    panzerArr[numPanz].lineArr[i].y,
                    panzerArr[numPanz].lineArr[i].x1,
                    panzerArr[numPanz].lineArr[i].y1,
                    lineArr[j].x,lineArr[j].y,
                    lineArr[j].x1, lineArr[j].y1)) 
            {
                 return true;
            }
        }
    }
    return false;
}
//определение пересечения линии выстрела с краями бочки
//function PointCrossPanzerBarrel(num,point,numBarrel=-1)
//{
//    let pPanz={x:panzerArr[num].x+panzerArr[num].width/2,
//                y:panzerArr[num].y+panzerArr[num].height/2};
//    for (let i=0;i<barrelArr.length;i++)
//    {
//        if (barrelArr[i].being==true )
//        {
//            
//            ////console.log('true');
//            for (let j=0;j<4;j++)
//            {
//                if (IsCrossing( pPanz.x, pPanz.y,  point.x,point.y,
//                    barrelArr[i].lineArr[j].x,barrelArr[i].lineArr[j].y,
//                    barrelArr[i].lineArr[j].x1, barrelArr[i].lineArr[j].y1)) 
//                    {
//                        if (numBarrel!=i) return true;
//                    }
//            }
//        }
//    }
//    return false;
//}
//// определиние пересечения линии выстрела с краями стен
//function PointCrossPanzerWall(num,point)
//{
//    let pPanz={x:panzerArr[num].x+panzerArr[num].width/2,
//                y:panzerArr[num].y+panzerArr[num].height/2,};
//   // //console.log(pPanz.x+' '+pPanz.y+' '+point.x+' '+point.y);
//    for (let i=0;i<wallArr.length;i++)
//    {
//        if (wallArr[i].being==true)
//        {
//            ////console.log('true');
//            for (let j=0;j<4;j++)
//            {
//                ////console.log(i+" "+j);
//                if (IsCrossing( pPanz.x, pPanz.y,  point.x,point.y,
//                    wallArr[i].lineArr[j].x,wallArr[i].lineArr[j].y,
//                    wallArr[i].lineArr[j].x1, wallArr[i].lineArr[j].y1)) 
//                    {
//                        return true;;
//                    }
//            }
//        }
//    }
//    return false;
//    
//}
//function PointCrossPanzerBox(num,point)
//{
//    let pPanz={x:panzerArr[num].x+panzerArr[num].width/2,
//                y:panzerArr[num].y+panzerArr[num].height/2,};
//   // //console.log(pPanz.x+' '+pPanz.y+' '+point.x+' '+point.y);
//    for (let i=0;i<boxArr.length;i++)
//    {
//        if (boxArr[i].being==true)
//        {
//            ////console.log('true');
//            for (let j=0;j<4;j++)
//            {
//                ////console.log(i+" "+j);
//                if (IsCrossing( pPanz.x, pPanz.y,  point.x,point.y,
//                    boxArr[i].lineArr[j].x,boxArr[i].lineArr[j].y,
//                    boxArr[i].lineArr[j].x1, boxArr[i].lineArr[j].y1)) 
//                    {
//                        return true;;
//                    }
//            }
//        }
//    }
//    return false;
//    
//}
function crossPanzerToPanzer(num,point,numAttack)
{
    let pPanz={x:panzerArr[num].x+panzerArr[num].width/2,
                y:panzerArr[num].y+panzerArr[num].height/2,};
   // //console.log(pPanz.x+' '+pPanz.y+' '+point.x+' '+point.y);
    let dx=pPanz.x-(panzerArr[numAttack].x+panzerArr[numAttack].width/2);
    let dy=pPanz.y-(panzerArr[numAttack].y+panzerArr[numAttack].width/2);
    let dist=Math.sqrt(dx*dx+dy*dy);
    if (dist>maxDistBullet) return false;
    for (let i=0;i<panzerArr.length;i++)
    if (panzerArr[i].being==true)
    if (i!=numAttack)
    {
        let dx=pPanz.x-(panzerArr[i].x+panzerArr[i].width/2);
        let dy=pPanz.y-(panzerArr[i].y+panzerArr[i].width/2);
        let dist=Math.sqrt(dx*dx+dy*dy);
        if (dist<maxDistBullet)
        {
            panzerArr[i].lineArr=calcLineArr(panzerArr[i],i);
            ////console.log('true');
            for (let j=0;j<4;j++)
            {
                ////console.log(i+" "+j);
                if (IsCrossing( pPanz.x, pPanz.y,  point.x,point.y,
                    panzerArr[i].lineArr[j].x,panzerArr[i].lineArr[j].y,
                    panzerArr[i].lineArr[j].x1, panzerArr[i].lineArr[j].y1)) 
                    {
                      //  if (panzerArr[i].lineArr[j].numObject!=numAttack)
                        if (i!=num)
                            return true;;
                    }
            }
            
        }
    }
    return false;
    
}
// расчет баланса сил между комондами
function calcBalance(absolute=true,maxPower=false)
{
    let powerGroup0=0;
    let powerGroup1=0;
    let countGroup0=0;
    let countGroup1=0;
    for (let i=0;i<panzerArr.length;i++)
    {
        if (panzerArr[i].being==true)
        {
            if (panzerArr[i].group==0/*&&i!=0*/)
            {
                powerGroup0+=panzerArr[i].HP*panzerArr[i].DMG;
                countGroup0++;
            }
            if (panzerArr[i].group==1)
            {
                powerGroup1+=panzerArr[i].HP*panzerArr[i].DMG;
                countGroup1++;
            }
            
        }
            
    }
  //  powerGroup0*=countGroup0*0.66;
  //  powerGroup1*=countGroup1*0.66;
  //  console.log('PG0 '+powerGroup0+' PG1 '+powerGroup1);
    if (maxPower==true)
    {
        maxPowerGroup=powerGroup0>=powerGroup1?powerGroup0:powerGroup1
        return powerGroup0>=powerGroup1?powerGroup0:powerGroup1;
        //return Math.trunc(powerGroup0-powerGroup1);
    }
    ////console.log ("PG0: "+powerGroup0+" PG1: "+powerGroup1);
    if (absolute==true) 
    {
        return Math.trunc(powerGroup0-powerGroup1);
    }
    else
    {
        let max=10000;
        let mult=100;
        let res0=powerGroup1!=0 ? powerGroup0/powerGroup1*mult : max;
        let res1=powerGroup0!=0 ? powerGroup1/powerGroup0*mult : max;
        res0=Math.trunc(res0);
        res1=Math.trunc(res1);
        if (res0>res1) {if(res0<max) return res0-mult; else return max;}
        if (res1>res0) {if(res1<max) return -res1+mult; else return -max;}
        if (res0==res1) return 0;
        //return Math.trunc(((powerGroup0/maxPowerGroup)-(powerGroup1/maxPowerGroup))*1000);
    }
    //return Math.trunc(powerGroup0-powerGroup1);

}
function killGroupPanzer()// вычесление какая группа танков убита
{
    let countGroup0=0;
    let countGroup1=0;
    for (let i=0;i<panzerArr.length;i++)
    {
        if (panzerArr[i].being==true)
        {
            if (panzerArr[i].group==0/*&&i!=0*/)
            {
                
                countGroup0++;
            }
            if (panzerArr[i].group==1)
            {
                
                countGroup1++;
            }
            
        }
            
    }
    if (countGroup0==0) return 0;
    if (countGroup1==0) return 1;
    return -1;
}
function memoryGameObject()// функция которая считает сколько памяти занимают игровые обьекты
{
    let memoryGameObj=0;
    memoryGameObj+=memorySizeOf(panzerArr);
    memoryGameObj+=memorySizeOf(boxArr,);
    memoryGameObj+=memorySizeOf(wallArr);
    memoryGameObj+=memorySizeOf(barrelArr);
    return formatByteSize(memoryGameObj);
    //return memoryGameObj;

}