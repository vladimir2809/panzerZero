var numOption=0;//номер настроек
var mapSize=option[numOption].mapSize;// размер ячейки карты
screenWidth=option[numOption].widthScreenBlock*mapSize;// ширина экрана
screenHeight=option[numOption].heightScreenBlock*mapSize;// высота экрана
var context;// контекс канвас
var mapWidth=option[numOption].mapWidthBlock*mapSize;// размер карты в ячейках по ширине
var mapHeight=option[numOption].mapHeightBlock*mapSize;// размер карты в ячейках по высоте
var windowWidth=document.documentElement.clientWidth;
var windowHeight=document.documentElement.clientHeight;
var windowWidthOld = windowWidth;
var windowHeighOld = windowHeight;
var  canvasWidth= windowWidth;
var  canvasHeight= windowHeight;
var canvas;
var scale=1;// маштаб карты
var quantityBurst=100;// количество взрывов
var mouseOffsetX=0;// смешение мыши для правильно прицеливания так как экран выровнян по сиредине
var mouseOffsetY=0;

var maxDistBullet=calcDist(0,0,screenWidth,screenHeight)/3.5;// максимальная дистанция полета пули
var quantityBonus=option[numOption].quantityBonus;// количество яшиков
var quantityBarrel=option[numOption].quantityBarrel;;// количество взрываюшихшя бочек
var quantityBullet=option[numOption].quantityBullet;;// количенство пуль
var quantityWall=option[numOption].quantityWall;// количество стен
var quantityWater=option[numOption].quantityWater;// количество Воды
var quantityBrickWall=option[numOption].quantityBrickWall;// количество кирпичных стен
var quantityPanzerGroup0=0;//option[numOption].quantityPanzerGroup0;// количество танков зеленых
var quantityPanzerGroup1=0;//option[numOption].quantityPanzerGroup1;// количество танков красных
var mainMenu = null;
var visibleGame=option[numOption].visibleGame;// отображение игры
var gamePlayer=option[numOption].gamePlayer;// играет ли игрок или игра идет автоматически
var playerGun=0;// номер оружия у танка игрока
var money=option[numOption].startMoney;// деньги игрока
var addMoney=0;
var timeAddMoney=0;
var levelPlayer=1;
var levelGame=2;
var XP=0;
var gunQuantityArr=[130,500,100,100];
var labelGunXY={x:635,y:40};
var win=0;// количество побед зеленых над красными
var maxPowerGroup;// максимальная мошность команды
var numBattle=0;// количество битв
var countBeforeUpload=0;// время задержки в циклах после того как бой закончен
let flagPressV=false;// флаг того что нажата кнопка отключить\включить отображение
var maxPanzerId=0;
var modeDev=false;
var XPminDev=0;
var XPmaxDev=1000;
var devXP=500;
var time=0;// время боя
var timeNow=0;// текушие время
var timeOld=0;// старое время перед боем
var quantityPanzer=quantityPanzerGroup0+quantityPanzerGroup1;// количесво такнов игре

var numPanzer=option[numOption].numPanzer;// номер танка которым можно управлять
var pause=true;// пауза игры
var levelUpdates = false;
var countIterationGameLoop=0;// счетчик игровых циклов
// массив имен картинок для загрузки 
var nameImageArr=["body10","body11",'body12','body13','body14','body15',
                "body101","body111",'body121','body131','body141',
                "body20","body21",'body22','body23','body24','body25',
                "tower1","tower2","tower3","tower4","box","bonusMoney","bonusXP",
                "bonusPatron",'bonusBullet','garage',
                'wall',"water","brickwall","badbrickwall",'bullet',"rocket",
                'patron','burst','burstBig','burstSmall','barrel',/*'barrel2',*/
                'gunIcon','shop',"star",'starContur','gate',"base"];
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
var countNewBonus=0;
var viewTextInShop=false;
var viewTextInGate=false;
var viewTextInGarage=false;
var lastNumGarage=0;
var countLoopShot=0;
var countShot=0;
var flagShot=false;
var canvasWidthMore = null;
var volumeSoundTrack = 1;
var volumeAudio = 1;
var flagAudio = false;
var timerAudio = null;
var flagFocus = true;
var flagSaveDataStoroge = false;
var panzerNumGarage = 0;
var flagPanzerLoad = false;
var levelXPValue=[1000,2500,5000,8000,12000,20000,30000,50000,];
var gameWin = false;
var nameRankLevel = ['Рядовой','Сержант','Старшина','Прапорщик','Лейтенант','Капитан',
                     'Майор','Полковник','Генерал',];
var keysGame = {
    buttonShop: 'KeyF',
    buttonGarage: 'KeyG',
    buttonOpen: 'KeyR',
}
var lastShop={
    numShop:0,
    numEntrance:0,
}
var strFile='';
// обьект танк
var panzer={
    id:0,
    numType:null,
    enabled:false,
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
    timeAttackLaser:20,
    speedReaction:100,// скорость реакции при виде врага
    hitAttackPatron:1,
    maskGun:[],
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
var bonus={
    x:null,
    y:null,
    being:false,
    count:0,
    type:null,
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
    color:null,
    being:false,
    direction:1,
    squareCollision:[],
    squareDoor:[],// массив стен открываюшей двери
}
var keyType={
    x:null,
    y:null,
    width:mapSize,
    height:mapSize,
    being:false,
    state:0,
    color:null,
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
var shopImageType={
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
var garageImageType={
    being:true,
    x:null,
    y:null,
    width:120,
    height:80,
    entranceArr:[
        {x:0,y:40,width:40,height:40}, //наверху
    ],
    entranceWidth:40,
    entranceHeight:40,
    lineArr:[],
    linePerimetrArr:[],
}
baseImageType={
    x:null,
    y:null,
    enabled:false,
    being:false,
   // sprite:null,
    maxHP:250,
    HP:250,
    width:80,
    height:80,
    maxCount:250,
    count:0,
    typePanzerCreate:0,
    lineArr:[],
}
shopImageArr=[];
garageImageArr=[];
baseImageArr=[];
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
bigText={
    being:false,
    count:0,
    maxCount:0,
    str:'',
    color:"#FF0000",
    value:null,
    
}
buttonGarage = {
    being: true,
    x:10,
    y:10,
    width:80,
    height:28,
    color:"blue",
    text:'Гараж',
    textSize:19,
    textColor:'rgb(255,255,0)',
}
buttonShop = {
    being: true,
    x:100,
    y:10,
    width:100,
    height:28,
    color:"blue",
    text:'Магазин',
    textSize:19,
    textColor:'rgb(255,255,0)',
}
bonusArr=[];//массив яшиков
wallArr=[];// массив стен
gateArr=[];//массив дверей
keyGateArr=[];//массив ключей для дверей
keyInStokArr=[];//массив ключей для дверей в наличиии у игрока
burstArr=[];// массив взрывов
barrelArr=[];// массив бочек
bulletArr=[];// массив пуль
panzerArr=[];// массив танков
panzerInGarageArr=[];
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

//range.addEventListener("change",function(){
    
   
   //pXP.innerHTML="опыт: "+55;//range.value;
//});
//window.addEventListener('load', function () {
//    
//}
// событие загрузки страницы
window.onresize = function()
{
    updateSize()
}
function updateSize()
{
    windowWidth=document.documentElement.clientWidth;
    windowHeight=document.documentElement.clientHeight;
    let mult =1;
    if (windowWidth>=windowHeight)
    {
        canvasWidth = /*canvas.width = */windowHeight*screenWidth/screenHeight;
        canvasHeight = /*canvas.height = */windowHeight;
        if (canvasWidth>windowWidth)
        {
            mult = windowWidth/canvasWidth;
           // canvas.width =
                canvasWidth *= mult;
            //canvas.height =
                canvasHeight *= mult;
        }
        canvasWidthMore = true;
    }
    else
    {
        canvasWidthMore = false;
        canvasWidth = /*canvas.width*/  windowWidth;
        canvasHeight= /*canvas.height*/  windowWidth*screenHeight/screenWidth;
    }
    
    canvas.setAttribute('width',canvasWidth);
    canvas.setAttribute('height',canvasHeight);
    canvas.style.setProperty('left', (window.innerWidth - canvas.width)/2 + 'px'); 
    canvas.style.setProperty('top', (window.innerHeight - canvas.height) / 2 + 'px'); 
    if (canvasWidthMore==true)
    {
        context.scale(windowHeight / screenHeight * mult, windowHeight / screenHeight * mult);   
        mouseMultX = windowHeight / screenHeight * mult;
        mouseMultY = windowHeight / screenHeight * mult;
    }
    else
    {
       context.scale(windowWidth/screenWidth,windowWidth/screenWidth);
        mouseMultX = windowWidth / screenWidth;
        mouseMultY = windowWidth / screenWidth;
    }
    //setOffsetMousePosXY((window.innerWidth - canvas.width)/2,
    //                        (window.innerHeight - canvas.height)/2);
    //camera.width = canvasWidth;
    //camera.height = canvasHeight;
}
//document.addEventListener("visibilitychange", function(){
//	if (document.hidden){
//        pause = true;
//        soundTrack.pause();//console.log('Вкладка не активна');
//	} else {

//        pause = false;
//        if (flagSoundTrack == true) soundTrack.play();
//		console.log('Вкладка активна');    
//	}
//});
window.onfocus = function(){
   // pause = false;
    if (flagSoundTrack == true) soundTrack.play();
    flagFocus = true;
	console.log('Вкладка активна');
}
 
window.onblur = function(){ 
  //  pause = true;
    soundTrack.pause();
    flagFocus = false;
    clearPressKey();
	console.log('Вкладка не активна');
}
window.addEventListener('load', function () {
    //console.log(localStorage.getItem("gameMap"));
    preload();
    create();
    var textLevel=document.getElementById('textLevel');
    var range=document.getElementById('range');
    var buttonForm=document.getElementById("buttonForm");
    document.getElementById('pXP').innerHTML=devXP;
    function updatepXP()
    {
        devXP=XPminDev+(XPmaxDev-XPminDev)*range.value/100;
        devXP=Math.trunc(devXP);
        document.getElementById('pXP').innerHTML="опыт: "+devXP;
    }
    textLevel.onchange=function(){
       // var levelXPValue=[1000,2500,5000,8000,12000,20000,30000,50000,];
        let levelDev=textLevel.value-1;
        
        XPminDev=levelDev>0?levelXPValue[levelDev-1]:0;
        XPmaxDev=levelDev<9?levelXPValue[levelDev]-1:50000;
        updatepXP();
        //alert(XPminDev+ ' ' +XPmaxDev);
       // range.setAttribute('min', XPminDEv);
      //  range.setAttribute('max', XPmaxDEv);
//        range.min=XPminDev;
//        range.max=XPmaxDev;
//        devXP=(XPmaxDev-XPminDev)*range.value/100;
//        devXP=Math.trunc(devXP);
//        document.getElementById('pXP').innerHTML="опыт: "+devXP;
    }
    
    range.onchange=function(){
        updatepXP();
//       devXP=(XPmaxDev-XPminDev)*range.value/100;
//       devXP=Math.trunc(devXP);
//       document.getElementById('pXP').innerHTML="опыт: "+devXP; 
    }
    buttonForm.onclick=function(){
       // alert(545);
        levelPlayer=textLevel.value;
        XP=devXP;
        money=Number(document.getElementById('textMoney').value);
    }
    const file = document.getElementById('your-files');
    file.addEventListener("change", handleFiles);
    function handleFiles()
    {
        var form=document.getElementById('formFile');
        
        var fileOne=file.files[0];
        //console.log(fileOne);
        //objMap.loadMap(JSON.parse(localStorage.getItem('gameMap')));
     //   alert(readFile(file));
        var reader = new FileReader();
        reader.readAsText(fileOne);
        reader.onload = function() {
            setDataLevel(JSON.parse(reader.result));
            flagPanzerLoad = true;
            uploadLevelOrRestart(2);
            
         // objMap.loadMap(JSON.parse(reader.result));
          //  alert(reader.result);
        }
        reader.onerror = function() {
        
            alert('ошибка загрузки карты');
        }
        //;
        file.value="";
        form.style.display='none';
   //     this.form.reset;
    }
    form=document.getElementById('')
   // audio.play("shot");
    fireworks = new Fireworks();
    //fireworks.run();
    setInterval(drawAll,16);
    setTimeout(gameLoop,60,1,true);
    
    
    //setTimeout(playSoundTrack,2000);
    
});
function playSoundTrack()
{
    if (soundTrack.playing()==false)
    {
       soundTrack.play();
       flagSoundTrack=true;
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
                   //alert(pair[0].name);
                   
             }
     }  
}
function calcQuantityPanzer()
{
    quantityPanzerGroup0=0;
    quantityPanzerGroup1=0;
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
   // getDataGoogleSheets();
    console.log(option[numOption].typePanzerArrGR0);
    addText('QuantityGun',"12px Arial","#0000FFAA","win",635,110);
    //addText('Shot/Hits',"18px Arial","#00FF00","win",100,100);
    addText('Level',"18px Arial","#00FF00","",100,100);
    addText('Money',"18px Arial","#00FF00","win",100,100);
    addText('Balance',"18px Arial","#00FF00","",100,150);
    addText('XP',"18px Arial","#00FF00","",100,200);
    addText('Time',"18px Arial","#0000FF","",100,250);
    addText('MessageText',"24px font-family","#00FF00","",250,600);
    //Howler.autoUnlock = false;
    audio = new Howl({
        src: ['sound/sound.mp3'],
        volume: volumeAudio,
        sprite:{
            patron:[1,1418],
            shot: [5000,1613],
            laser: [7975,1300],
            rocket: [9469,556],
           // soundTrack:[10*1000,4*60*1000,true]
        },
       
//        onend: function () {
//          console.log('Finished sound!');
 //     }
    });
    soundTrack = new Howl({
        src: ['sound/BlitzKaskade.mp3'],
        //src: ['sound/ton.mp3'],
        volume: volumeSoundTrack,
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
        
    canvas = document.getElementById("canvas");
    // canvas.setAttribute('width',camera.width);
    // canvas.setAttribute('height',camera.height);
    // canvas.width = camera.width;//(window.innerWidth * 90) / 100;
    // canvas.height = camera.height//(window.innerHeight * 90) / 100;
    //// updateSize();
    // canvas.style.setProperty('left', (window.innerWidth - canvas.width)/2 + 'px');
    // canvas.style.setProperty('top', (window.innerHeight - canvas.height) / 2 + 'px');   
    context = canvas.getContext("2d");
    updateSize();
    //setOffsetMousePosXY((window.innerWidth - canvas.width)/2,
    //                    (window.innerHeight - canvas.height)/2);
    initKeyboardAndMouse(["KeyA","KeyS","KeyD","KeyW","KeyM","KeyB","KeyR",'ArrowLeft',
                'ArrowRight','ArrowUp','ArrowDown',"Enter","KeyP","KeyO",'KeyG',"KeyM",
                "KeyI","KeyK",'ControlLeft',"KeyQ",'Escape','KeyZ','KeyX' ]);
    if (localStorage.getItem('panzerZeroData')!=null &&
        localStorage.getItem('panzerZeroData')!=undefined)
    {
        flagSaveDataStoroge = true;
    }
    if (localStorage.getItem('panzerZeroOption')!=null &&
        localStorage.getItem('panzerZeroOption')!=undefined)
    {
        readDataOption();
        soundTrack.volume(volumeSoundTrack);
        audio.volume(volumeAudio);
    }
    for (let i = 0; i < allowedKeyArr.length; i++)
    {
        addInKeyArr(allowedKeyArr[i])
    }
    //changeColorImg(context,imageArr.get('body10'),0xb5e61dff,0xdf0d00ff);
    // initMap(JSON.parse(localStorage.getItem('gameMap')));
    mainMenu = new Menu();
    mainMenu.setOption({ 
        width: screenWidth,
        height: screenHeight,
        listSelect:['Новая игра','Продолжить'],
        listFlagOn:[true,false],
        header:'Panzer Zero',
        headerFontSize: 50,
        widthOneItem: 300,
        heightOneItem: 60,
        sizeFontItem:30,
    });
    if (flagSaveDataStoroge == true) mainMenu.listFlagOn[1] = true;
    mainMenu.start();
    gameMenu = new Menu();
    gameMenu.setOption({
        width: screenWidth / 3,
        height: screenHeight / 2,
        listSelect:['Продолжить','Настройки','Помошь','Главное меню'],
        listFlagOn:[true,true,true,true,],
        header:'Игровое меню',
        headerFontSize: 20,
        widthOneItem: 150,
        heightOneItem: 30,
        sizeFontItem:20,
    });
    gameSettings = new Settings();
    gameSettings.addProperty(0,'Громкость музыки','slider'/*'selectKey'*/,300,volumeSoundTrack);
    gameSettings.addProperty(1,'Громкость выстрела','slider',300,volumeAudio);;
    gameSettings.addProperty(2,'Кнопка магазин','selectKey',300,keysGame.buttonShop/*"KeyM"*/);
    gameSettings.addProperty(3,'Кнопка гараж','selectKey',300,keysGame.buttonGarage/*"KeyM"*/);
    gameSettings.addProperty(4,'Кнопка открыть','selectKey',300,keysGame.buttonOpen/*"KeyM"*/);
    // this.addProperty(4,'Кнопка магазин','selectKey',300,'Digit2'/*"KeyH"*/);
    // this.addProperty(5,'Кнопка магазин','selectKey',300,'Digit3'/*"KeyP"*/);
//    var keysGame = {
//    buttonShop: 'KeyM',
//    buttonGarage: 'KeyG',
//    buttonOpen: 'KeyR',
//}
    gameSettings.init();
    messageExitMainMenu = new MessageWin();
    messageNewGame = new MessageWin();
    messageNewGame.setOption({
        width: 500,
    });
    //gameSettings.start();

  //  initMap(levelMap[levelGame-1]);
    map.width=mapWidth;
    map.height=mapHeight;
    calcQuantityPanzer();
    //  initPanzers();
    initBullet();
    initBurst();
    //initBox();
        
    //initAllNoMoveObject();
//        bonusArr=initNoMoveObject(quantityBonus,bonus);
//        wallArr=initNoMoveObject(quantityWall,wall);
//        barrelArr=initNoMoveObject(quantityBarrel,barrel);
    //initWall();
    //initBarrel();
    numPanzer=0;
    //playerGun=nextGun(1);
    // panzerArr[numPanzer].id=1;
    //let panz=copyPanz(panzerArr[numPanzer]);
    //console.log("panz start");
    //console.log(panz);
    //panzerInGarageArr.push(panz);
    //loadLevel=true;
    // mainMenu.start();
    //startScreen.start();
    // alert(panzerArr[numPanzer].id);
       

        
}
function drawTextNow(text,fontSize,x,y,color='rgb(255,128,0')
{
    context.fillStyle=color;
    context.font = fontSize+'px Arial';
   // context.strokeRect(this.widthTab*i,this.y,this.widthTab,20);
    context.fillText(text,x,y);
}
function drawAll()// нарисовать все
{
    //fireworks.render.bind();
   // fireworks.render();
    if (imageLoad==true)// если изображения загружены
    {
        //context.clearRect(0,0,camera.width,camera.height);// очистка экрана
        if (mainMenu.being==true)
        {
            mainMenu.draw();
        }
        else if (gameMenu.being==true)
        {
            gameMenu.draw();
        }
        else if (gameSettings.being==true)
        {

            gameSettings.draw();
        }
        else  if (startScreen.being==true)
        {
            startScreen.draw(); 
            //drawTextNow('xButton: ' + Math.trunc(startScreen.button.x), 20, 100, 100, "Red");
            //drawTextNow('yButton: ' + Math.trunc(startScreen.button.y), 20, 100, 150, "Red");
            //drawTextNow('xMouse: ' + Math.trunc( mouseX-mouseOffsetX), 20, 220, 100, "Green");
            ////drawTextNow(canvasWidthMore ? 'WidthMore' :'HeightMore', 20, 220, 100, "Blue");
            //drawTextNow('yMouse: ' + Math.trunc( mouseY-mouseOffsetY), 20, 220, 150, "Green");
            
        }    
        
        if (shop.open==true)
        {
            shop.draw();
          //  return 0;
        }
        if (boxWindowSelect.open==true)
        {
            boxWindowSelect.draw();
           // return 0;
        }
        if (garage.open==true)
        {
            garage.draw();
          //  return 0;
        }
        if (messageBox.open==true)
        {
            messageBox.draw();
          //  return 0;
        }
        messageExitMainMenu.draw();
        messageNewGame.draw();
        if (shop.open==true || boxWindowSelect.open==true || 
                garage.open==true ||   messageBox.open==true ||
                startScreen.being==true || gameSettings.being==true ||
                mainMenu.being==true ||
                gameMenu.being==true ||
                messageExitMainMenu.being==true)
        {
           return 0;   
        }
        context.fillStyle='rgb(210,210,210)';
        context.fillRect(0,0,camera.width,camera.height);// очистка экрана
       
        if (visibleGame==true)// если влючено отображение
        {
            for (let i=0;i<shopImageArr.length;i++)
            {
                drawSprite(context,imageArr.get("shop"),shopImageArr[i].x,shopImageArr[i].y,
                                                        camera,scale);
            }
            for (let i=0;i<garageImageArr.length;i++)
            {
                drawSprite(context,imageArr.get("garage"),garageImageArr[i].x,garageImageArr[i].y,
                                                        camera,scale);
            }
            for (let i=0;i<bonusArr.length;i++)
            {
                if (bonusArr[i].being==true)
                if (checkCollision(camera,bonusArr[i])==true || scale<=1)
                {
                    let image;
                    switch (bonusArr[i].type)
                    {
                        case 0: image=imageArr.get("box"); break;
                        case 1: image=imageArr.get("bonusXP"); break;
                        case 2: image=imageArr.get("bonusMoney"); break;
                        case 3: image=imageArr.get("bonusPatron"); break;
                        case 4: image=imageArr.get("bonusBullet"); break;
                    }
                    drawSprite(context,image,bonusArr[i].x,bonusArr[i].y,camera,scale);
                }
            }
            for (let i=0;i<gateArr.length;i++)
            {
                drawGate(gateArr[i]);
            }
            for (let i=0;i<keyGateArr.length;i++)
            {
               if(keyGateArr[i].being==true)
               {
                   drawKeyForGate(keyGateArr[i]);
               }
            }
         
                
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
                {
                    drawPanzer(context,panzerArr[i],camera,scale);
                    if (panzerArr[i].group==1)
                    {
                        context.fillStyle= 'red';
                        context.fillRect(panzerArr[i].x-camera.x, panzerArr[i].y-camera.y - 7, panzerArr[i].width,4);
                        context.fillStyle= 'green';
                        context.fillRect(panzerArr[i].x-camera.x, panzerArr[i].y-camera.y - 7,
                                panzerArr[i].width*panzerArr[i].HP/panzerArr[i].maxHP,4)
                    }
                }
            } 
            for (let i=0;i<baseImageArr.length;i++)
            {
                drawBase(baseImageArr[i]);
            }
            for (let i=0;i<burstArr.length;i++)
            {
                if (burstArr[i].being==true)    
                {
                   let image=imageArr.get(burstArr[i].spriteNameImage[burstArr[i].type]);
                   drawSprite(context,image,burstArr[i].x,burstArr[i].y,camera,scale);
                }
            }
            for (let i=0;i<keyInStokArr.length;i++)
            {
                //if(keyInStokArr[i].being==true && keyInStokArr[i].state==1)
                {
                   drawKeyForGate(keyInStokArr[i],false,20,50+20*i);
                }
                
            }
            if (bigText.being==true)
            {
                context.font = "38px Arial";
                context.fillStyle=bigText.color;
                
                let widthText=context.measureText(bigText.str).width+10;
                let x=screenWidth/2-widthText/2;
                context.fillText(bigText.str,x,280);
            }
            addText('QuantityGun',"13px Arial","#0000FF",+gunQuantityArr[playerGun],
                        labelGunXY.x+35,labelGunXY.y+12/*+30*/);
            let str=money+"$";
            setText('Money',str,"#00FF00",screenWidth-53-str.length*10,95);
            let y=475
            let stepY=25;
    //        setText('Shot/Hits','Test:'+countTestMixShot+' HP1: '+panzerArr[0].HP+
    //                '  HP2:'+panzerArr[1].HP,"#44FF44",10,y-stepY);
            if (levelGame>1) 
            {
                setText('Level','Звание: '+nameRankLevel[levelPlayer-1],"#44FF44",10,y);
                context.lineWidth = 1;
                drawButton(buttonGarage);
                drawButton(buttonShop);
            }
            
           // money++;

           // setText('Balance','HP1: '+panzerArr[0].HP+' HP2: '+panzerArr[1].HP,"#44FF44",10,y+stepY);
            if (option[numOption].calcShotTime==false)
            {
                if (levelGame>1) 
                {
                    if (levelPlayer<9)
                    {
                        setText('XP','XP: '+XP+"/"+levelXPValue[levelPlayer-1],
                                                        "#FF0000",10,y+stepY);
                    }
                    else
                    {
                        setText('XP','XP: '+XP,"#FF0000",10,y+stepY);
                    }
                   
                }
//                setText('Balance','Balance: '+calcBalance(false),
//                        calcBalance()<0?"#FF0000":"#00FF00",10,y+stepY*2);
            }
            else
            {
                setText("XP",'countLoop '+countLoopShot,"#44FF44",10,y+stepY);
                setText('Balance',"countShoT "+countShot, "#FF0000",10,y+stepY*2);
            }
    //        setText('Balance','Balance: '+calcBalance(false),
    //                calcBalance()<0?"#FF0000":"#00FF00",10,y+stepY*2);
            
            if (checkInShop(numPanzer).num!=-1)
            {
                if (viewTextInShop==false)
                {
                    let str = keysGame.buttonOpen.at(-1);
                    setText('MessageText',"нажмите "+str+" для того что бы войти в магазин","#00FF00",(screenWidth/2)-210,400);
                  //  messageCenterScreen("нажмите R для того что бы войти в магазин","#00FF00");
                    viewTextInShop=true;
                }
            }
            else
            {
                if (viewTextInShop==true)
                {
                    setText('MessageText',"","#FFFFFF00",(screenWidth/2)-210,400);
                   // messageCenterScreen("нажмите R для того что бы войти в магазин","#FFFFFF00");
                    viewTextInShop=false;
                }
            }
            let index=checkInGate(numPanzer);
            if (index!=-1 && gateArr[index].close==true)
            {
                if (viewTextInGate==false)
                {
                    if (checkColorInStokKey(gateArr[index].color)==true)
                    {
                        setText('MessageText',"нажмите R для того что бы открыть дверь","#00FF00",(screenWidth/2)-190,400);
                    }
                    else
                    {
                        setText('MessageText',"У вас нет подходяшего ключа для этой двери","#00FF00",(screenWidth/2)-240,400);
                    }
                    viewTextInGate=true;
                }
            }
            else
            {
                if (viewTextInGate==true)
                {
                    setText('MessageText',"нажмите R для того что бы открыть дверь","#FFFFFF00",(screenWidth/2)-240,400);
                    viewTextInGate=false;
                }
            }
            if (checkInGarage(numPanzer)!=-1)
            {
                if (viewTextInGarage==false)
                {
                    setText('MessageText',"нажмите R для того что бы войти в гараж","#00FF00",(screenWidth/2)-210,400);
                  //  messageCenterScreen("нажмите R для того что бы войти в магазин","#00FF00");
                    viewTextInGarage=true;
                }
            }
            else
            {
                if (viewTextInGarage==true)
                {
                    setText('MessageText',"","#FFFFFF00",(screenWidth/2)-210,400);
                   // messageCenterScreen("нажмите R для того что бы войти в магазин","#FFFFFF00");
                    viewTextInGarage=false;
                }
            }
        }
        for (key in textArr)
        {
            
            drawText(context,textArr[key]);
        }
        drawIconGun(playerGun);
        drawHPPlayer();
//        for (let i=0;i<shopImageArr.length;i++)
//        {
//            for (let j=0;j<shopImageArr[i].lineArr.length;j++)
//            {
//                context.beginPath();
//                context.strokeStyle="#00FF00";
//                context.moveTo(shopImageArr[i].lineArr[j].x,shopImageArr[i].lineArr[j].y); //передвигаем перо
//                context.lineTo(shopImageArr[i].lineArr[j].x1,shopImageArr[i].lineArr[j].y1); //рисуем линию
//                context.stroke();
//            }
//        }
        for (let i=0;i<panzerArr[numPanzer].lineArr.length;i++)
        {
            context.beginPath();
            context.strokeStyle="#0000FF";
            context.moveTo(panzerArr[numPanzer].lineArr[i].x,panzerArr[numPanzer].lineArr[i].y); //передвигаем перо
            context.lineTo(panzerArr[numPanzer].lineArr[i].x1,panzerArr[numPanzer].lineArr[i].y1); //рисуем линию
            context.stroke();
        }
     
       // buttonGarage = {
       // being: true,]
       // x:10,
       // y:10,
       // width:50,
       // height:20,
       // text:'Гараж',
       // textSize:15,
       // textColor='yellow',
       //}

      
    }
}
function drawButton (obj)
{
    context.strokeStyle = obj.color;
    context.strokeRect(obj.x, obj.y, obj.width, obj.height);
    let str= obj.text;
    context.font =  obj.textSize+'px Arial';
    let widthText = context.measureText(str).width;
    context.fillStyle = obj.textColor;
    context.fillText(str,obj.x+ obj.width / 2 - widthText / 2, obj.y+obj.textSize);
}
function drawText(context,text)// нарисовать текс
{
  context.save();
  context.font = text.font;
  context.fillStyle=text.fill;
  context.fillText(text.str, text.x, text.y);
  context.restore();
}
function drawHPPlayer()
{
    context.fillStyle="#0000FF";
    let maxHP=panzerArr[numPanzer].maxHP;
    let HP=panzerArr[numPanzer].HP;
    
    context.beginPath();
    context.moveTo(610,57);
    if (HP>0)
    {
        context.arc(610,57,14, Math.PI*2,(Math.PI*2)*(HP-0.1)/maxHP,false);
    }
    context.fill();
    context.closePath();
    //arc(x,y, radius, startAngle, endAngle, anticlockwise);
}
function drawIconGun(numGun)
{
    if(!context || !imageArr.get('gunIcon')) return;
    context.save();
    //context.scale(scale,scale);
    context.drawImage(imageArr.get('gunIcon'),1+30*numGun,1,30,30,
                labelGunXY.x,labelGunXY.y,30,30);
    context.restore();
    context.fillStyle="#FF0000";
    context.fillRect(labelGunXY.x,labelGunXY.y+30,30,4);
    context.fillStyle="#00FF00";
    rectWidth=panzerArr[numPanzer].countAttack<maxPanzerTimeAttack(numPanzer)?
            panzerArr[numPanzer].countAttack/maxPanzerTimeAttack(numPanzer)*30:
            30;
    context.fillRect(labelGunXY.x,labelGunXY.y+30,rectWidth,4);
}
function drawSprite(context,image,x,y,camera,scale)// функция вывода спрайта на экран
{
    if(!context || !image) return;
    context.save();
    context.scale(scale,scale);
    context.drawImage(image,x-camera.x,y-camera.y);
    context.restore();
}
//function drawTurnCenterSprite(context,image,x,y,angle,camera,scale)// функция вывода повернутого в центре спрайта на экран
//{
//    if(!context || !image) return;
//    context.save();
//    context.translate((x+image.width/2-camera.x)*scale,
//                        (y+image.height/2-camera.y)*scale);
//    context.scale(scale,scale);
//    context.rotate(angle*Math.PI/180);
//    context.drawImage(image,-x1,-y1);
//    context.restore();
//}
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
function drawPanzerIcon(x,y,type,GR=0,noScaleAndCamera=false)
{
    let bodyNameImage=panzerOption[type].bodyNameImage;
    let towerNameImage=panzerOption[type].towerNameImage;
    if (GR!=0)
    {
       bodyNameImage= bodyNameImage.replace('body1',"body2");
        //towerNameImage.replace('body1',"body2");
    } 
    let towerX=panzerOption[type].mixTowerPosX - panzerOption[type].mixTowerX+x;
    let towerY=panzerOption[type].mixTowerPosY - panzerOption[type].mixTowerY+y;
    if (noScaleAndCamera==false)
    {
        drawSprite(context,imageArr.get(bodyNameImage),x,y,camera,scale);  
        drawSprite(context,imageArr.get(towerNameImage),towerX,towerY,camera,scale);
    }
    else
    {
       context.drawImage(imageArr.get(bodyNameImage),x,y);
       context.drawImage(imageArr.get(towerNameImage),towerX,towerY); 
    }
    
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
function drawStrokeRectScale(x,y,w,h,color)
{
    context.strokeStyle=color;
    context.strokeRect (x*scale-(camera.x*camera.summMultScalingX),
                        y*scale-(camera.y*camera.summMultScalingY),
                        w*scale,h*scale);
}
function drawFillRectScale(x,y,w,h,color)
{
    context.fillStyle=color;
    context.fillRect (x*scale-(camera.x*camera.summMultScalingX),
                        y*scale-(camera.y*camera.summMultScalingY),
                        w*scale,h*scale);
}
function drawBase(base)
{
    if (base.being==true)
    {
        drawSprite(context,imageArr.get("base"),
                                    base.x,base.y,camera,scale);
        drawFillRectScale(base.x,base.y-10,
                           base.width*base.HP/base.maxHP,3,"#00FF00");
        drawFillRectScale(base.x,base.y-5,
                            base.width*base.count/base.maxCount,3,"#0000FF");
            
        let type=base.typePanzerCreate;
        let x=(base.x+base.width-4-panzerOption[type].width);//*scale-(camera.x*camera.summMultScalingX);            
        let y=(base.y+base.height-4-panzerOption[type].height);//*scale-(camera.y*camera.summMultScalingY);            
        drawPanzerIcon(x,y,base.typePanzerCreate,1);                    
       // context.fillStyle="rgb(0,255,0)";
//        context.fillRect(base.x*scale-(camera.x*camera.summMultScalingX),
//                         (base.y-10)*scale-(camera.y*camera.summMultScalingY),
//                          (base.width*(base.HP/base.maxHP))*scale-(camera.x*camera.summMultScalingX),
//                         3*scale-(camera.y*camera.summMultScalingY));
//        context.fillStyle="rgb(0,0,255)";
//        context.fillRect(base.x*scale-(camera.x*camera.summMultScalingX),
//                         (base.y-5)*scale-(camera.y*camera.summMultScalingY),
//                         ( base.width*(base.count/base.maxCount))*
//                                  scale-(camera.x*camera.summMultScalingX),
//                         3*scale-(camera.y*camera.summMultScalingY));
     //   context.fillRect(base.x-camera.x,base.y-camera.y-5,base.width*(base.count/base.maxCount),3);
    }
}

function drawGate(gate)
{
    let dir=gate.direction;
    let gateX,gateY,gateAngle;
    context.fillStyle=gate.color;
    if (dir==1||dir==3)
    {
        drawSprite(context,imageArr.get("wall"),
                                    gate.x,gate.y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x,gate.y+mapSize,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x+mapSize*4,gate.y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x+mapSize*4,gate.y+mapSize,camera,scale);
        
      //  context.fillRect(gate.x+mapSize,gate.y,mapSize*3,mapSize*2);
          drawFillRectScale(gate.x+mapSize,gate.y,mapSize*3,mapSize*2,gate.color);
//        context.fillRect((gate.x+mapSize)*scale-(camera.x*camera.summMultScalingX),//-camera.x,//camera.summMultScalingX,
//                    gate.y*scale-(camera.y*camera.summMultScalingY),//-camera.y,//camera.summMultScalingY,
//                            mapSize*3*scale,mapSize*2*scale);
        
        if (dir==1)
        {            
            gateY=gate.y;    
        }
        else if (dir==3)
        {
            gateY=gate.y+mapSize;
        }
        gateAngle=0;
        gateX=gate.x+mapSize;
        
    }
    if (dir==2||dir==4)
    {
        drawSprite(context,imageArr.get("wall"),
                                    gate.x,gate.y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x+mapSize,gate.y,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x,gate.y+mapSize*4,camera,scale);
        drawSprite(context,imageArr.get("wall"),
                                    gate.x+mapSize,gate.y+mapSize*4,camera,scale);
        //context.fillStyle="orange";
        drawFillRectScale(gate.x,gate.y+mapSize,mapSize*2,mapSize*3,gate.color);
//        context.fillRect(gate.x*scale-(camera.x*camera.summMultScalingX),//-camera.x,//camera.summMultScalingX,
//                    (gate.y+mapSize)*scale-(camera.y*camera.summMultScalingY),//-camera.y,//camera.summMultScalingY,
//                            mapSize*2*scale,mapSize*3*scale);
        if (dir==2)
        {            
            gateX=gate.x;    
        }
        else if (dir==4)
        {
            gateX=gate.x-mapSize;
        }
        gateAngle=90;
        gateY=gate.y+mapSize*2;
       //drawTurnSprite(context,imageArr.get("gate"),gate.x-mapSize,gate.y+mapSize*2,90,60,20,camera,scale);
    }
    if (gate.close==true)
    {
        drawTurnSprite(context,imageArr.get("gate"),gateX,gateY,gateAngle,
                                                  60,20,camera,scale);
    }
}
function drawKeyForGate(keyGate,rect=true,xx=-1,yy=-1)
{
    //context.save();
    //context.closePath();
    let oldScale;
    let x;
    let y;
    if (rect==true && xx==-1 && yy==-1)
    {
        context.strokeStyle="blue";
        context.strokeRect (keyGate.x*scale-(camera.x*camera.summMultScalingX),
                        keyGate.y*scale-(camera.y*camera.summMultScalingY),
                        mapSize*scale,mapSize*scale);
        x=keyGate.x+12;
        y=keyGate.y+18;
        x=x*scale-(camera.x*camera.summMultScalingX);
        y=y*scale-(camera.y*camera.summMultScalingY);
    }
    else 
    {
        oldScale=scale;
        scale=0.8;
        x=xx;
        y=yy;
       // console.log("scale");
    }
    
    context.beginPath();
    context.fillStyle=keyGate.color;
    context.arc(x,y, 9*scale, 0, degressToRadian(360));
    context.fill(); 
    context.closePath();
    
    context.beginPath();
    context.fillStyle="black";//keyGate.color;
    context.arc(x, y, 3*scale, 0, degressToRadian(360));
    context.fill();
    context.closePath();
    
    context.fillStyle=keyGate.color ;
    context.fillRect(x+6*scale, y-2*scale,17*scale,5*scale);
    context.fillRect(x+(6+17-4)*scale,y-2*scale+5*scale,4*scale,3*scale);
    if (rect==false && xx!=-1 && yy!=-1)
    {
        scale=oldScale;
    }
    //console.log(scale);
 //   context.strokeRect (keyGate.x,keyGate.y,mapSize,mapSize);
    //context.stroke();
}
//function playSoundTrack
function initBigText(str,color,maxCount,value)
{
    bigText.being=true;
    bigText.str=str;
    bigText.color=color;
    bigText.maxCount=maxCount;
    bigText.value=value;
    pause=true;
    
}
function controlBigText()
{
    if (bigText.being==true)
    {
        if (bigText.maxCount!=0)bigText.count++;
       // pause=true;
        if (bigText.count>=bigText.maxCount && bigText.maxCount!=0 )
        {
            bigText.being=false;
            pause=false;
            bigText.count=0;
            switch (bigText.value)
            {
                case 1://  уровень пройден
                    {
                        
                        uploadLevelOrRestart(0);
                        saveDataLevel();
                    }
                    break;
                case 2:// вы проиграли
                {
                    if (localStorage.getItem('panzerZeroData')!=null && localStorage.getItem('panzerZeroData')!=undefined)
                    {
                        readDatalevel();
                        console.log('Уровень Загружен');
                    }
                    uploadLevelOrRestart(2);
                    garage.close();
                }
                    break;
            }
        }
    }
}
function messageCenterScreen(str)
{
    let countPix=context.measureText(str).width;
    setText('MessageText',str,"#00FF00",(screenWidth/2)-countPix/2,400);
}
//setInterval(function () {
//    mouseX=
//}, 60);
function removeDataOption()
{
    localStorage.removeItem('panzerZeroOption');
}
function saveDataOption()
{
     localStorage.setItem('panzerZeroOption',JSON.stringify({volumeSoundTrack:volumeSoundTrack,
                                            volumeAudio:volumeAudio,
                                            keyButtonShop:keysGame.buttonShop,
                                            keyButtonGarage:keysGame.buttonGarage,
                                            keyButtonOpen:keysGame.buttonOpen,
                            }));
    // volumeSoundTrack = value;
                
    //volumeAudio = value;
                  
    //keysGame.buttonShop = value;
                
    //keysGame.buttonGarage = value;
                  
    //keysGame.buttonOpen = value;
}
function readDataOption()
{
    let data=localStorage.getItem('panzerZeroOption');
    data = JSON.parse(data);
    console.log(data);
    if (typeof(data.volumeSoundTrack)=='number')
    {
        volumeSoundTrack=data.volumeSoundTrack;
    }
    if (typeof(data.volumeAudio)=='number')
    {
        volumeAudio=data.volumeAudio;
    }
    if (typeof(data.keyButtonShop)=='string')
    {
        keysGame.buttonShop = data.keyButtonShop;
    }
    if (typeof(data.keyButtonGarage)=='string')
    {
        keysGame.buttonGarage = data.keyButtonGarage;
    }
    if (typeof(data.keyButtonOpen)=='string')
    {
        keysGame.buttonOpen = data.keyButtonOpen;
    }
}
function removeDataLevel()
{
    localStorage.removeItem('panzerZeroData');
}
function saveDataLevel()
{
    //let dataWall = [];
    //let dataFood = [];
    //for (let i = 0; i < arrWall.length;i++)
    //{
    //    dataWall.push({x: arrWall.children[i].x, y: arrWall.children[i].y});
    //}
    //for (let i = 0; i < arrFood.length;i++)
    //{
    //    dataFood.push({x: arrFood.children[i].x, y: arrFood.children[i].y});
    //}
    localStorage.setItem('panzerZeroData',JSON.stringify({panzerInGarageArr:panzerInGarageArr,
                                            panzerNumGarage:panzerNumGarage,
                                            money:money,XP:XP,gunQuantityArr:gunQuantityArr,
                                            levelPlayer:levelPlayer,levelGame:levelGame,}));
    console.log('Уровень сохранен');
    console.log(localStorage.getItem('panzerZeroData'))
   // console.log(dataWall);
   // console.log(dataFood);
    //readDatalevel();
}
function readDatalevel()
{
    let data=localStorage.getItem('panzerZeroData');
    data = JSON.parse(data);
    console.log(data);
    setDataLevel(data);
    flagPanzerLoad = true;
}
function setDataLevel(data)
{
    if (Array.isArray(data.panzerInGarageArr)==true)
    {
        while (panzerInGarageArr.length>0)
        {
            panzerInGarageArr.splice(0,1);
        }
        for (let i = 0; i <data.panzerInGarageArr.length;i++)
        {
            panzerInGarageArr.push(data.panzerInGarageArr[i]);
        }
    }
    if (Array.isArray(data.gunQuantityArr)==true)
    {
        while (gunQuantityArr.length>0)
        {
            gunQuantityArr.splice(0,1);
        }
        for (let i = 0; i <data.gunQuantityArr.length;i++)
        {
            gunQuantityArr.push(data.gunQuantityArr[i]);
        }
    }
    if (typeof(data.levelGame)=='number')
    {
        levelGame=data.levelGame;
    }
    if (typeof(data.money)=='number')
    {
        money=data.money;
    }
    if (typeof(data.XP)=='number')
    {
        XP=data.XP;
    }
    if (typeof(data.levelPlayer)=='number')
    {
        levelPlayer=data.levelPlayer;
    }
    if (typeof(data.panzerNumGarage)=='number')
    {
        panzerNumGarage=data.panzerNumGarage;
    }
}
function startNewGame()
{
    removeDataLevel();
    uploadLevelOrRestart(1);
    messageNewGame.close();
    mainMenu.close();
   // initMap(levelMap[levelGame-1]);
    playerGun=1;
    let panz=copyPanz(panzerArr[numPanzer]);
    console.log("panz start");
    console.log(panz);
    panzerInGarageArr.push(panz);
    calcQuantityPanzer();

    startScreen.start();
}
 function gameLoop(mult,visible)// игровой цикл
{
    //let mult=2;
    let multIter=1;
    let countUpload=1000;
    let countIter=visible==true?mult:mult*(countUpload/mult)*multIter;
    let countBreak=0;
    let timeNow1=new Date().getTime();
    setText('Time','Time: '+/*Math.trunc*/(timeNow1-timeOld),"#0000FF",10,400);
    timeOld=new Date().getTime();
    //fireworks.run();
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
        
//        if (checkInGarage(numPanzer)!=-1)
//        {
//            setText('MessageText',"нажмите R для того что бы открыть дверь","#FFFFFF00",(screenWidth/2)-240,400);
////            context.fillStyle="#00FF00";
//         //   str="Нажмите R для того чтобы войти в гараж";
//         //   context.fillText(str, (screenWidth/2)-240,400);
//        }
        if (XP>=levelXPValue[levelPlayer-1]) levelPlayer++;
        if (timeAddMoney>=1000) 
        {
            
            money+=addMoney;
            timeAddMoney=0;
        }
        if(shop.open==false &&  garage.open==false)controlHuman();// управление программой с клавиатуры
        if (gamePlayer==true && pause==false && flagFocus==true)panzerControll(numPanzer);// управление танком игрока
        // следим за танком игрока
        camera.focusXY(panzerArr[numPanzer].x+panzerArr[numPanzer].mixTowerPosX,
                panzerArr[numPanzer].y+panzerArr[numPanzer].mixTowerPosY,map);
        for (let k=0;k<countIter;k++ )// цикл в котором может несколько раз произоити игровые действия
        {
            
            for (let i=0;i<panzerArr.length; i++)// тики танков
            {
                if (panzerArr[i].being==true && pause==false && flagFocus==true
                        && (i!=numPanzer || ( gamePlayer==false || visibleGame==false))&&
                        (controlEnabled(panzerArr[i])==true&&i!=numPanzer))
                {
                      panzerControll(i);
                   if (countIterationGameLoop>option[numOption].delayBeforeAttack) 
                        panzerAutoAttack(i);
                }

            }
           // calibrationAccuracy();

//            if (keyUpDuration('KeyP',300))
//            {
//                restartLevel();
//            }
        //    if (false)
        //    {    
        //        if (keyUpDuration('KeyV',300)) // вкл\выкл отображение игры
        //        {
        //            if (flagPressV==false)
        //            {
        //                visibleGame=!visibleGame;
        //                flagPressV=true;
        //                uploadLevelOrRestart();
        ////                    countIterationGameLoop=0;
        ////                    countBeforeUpload=0;
        //             }
        //        }
        //        else
        //        {
        //            flagPressV=false;
        //        }
        //    }
            controlBigText();
            if (shop.open==false && boxWindowSelect.open==false && garage.open==false)
            {
                if ( checkPressKey("KeyA")||checkPressKey("KeyS")||
                        checkPressKey("KeyD")||checkPressKey("KeyW"))
                {
                    timeAddMoney+=time!=0?time:1;
                }
            }
            
           //if (countIterationGameLoop>countUpload) // условия обновления уровня       
            if (killGroupPanzer()==0 ||
                    (killGroupPanzer()==1 && checkKillBaseAll()==true)
                )
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
                    if (killGroupPanzer()==0 && killGroupPanzer()!=-1 && levelUpdates==false)
                    {
                        if (pause==false)
                        {
                            let num=calcNumById(panzerArr[numPanzer].id,
                                                                panzerInGarageArr);
                          //deleteElemArrToNum
                        //    alert(num+" "+panzerArr[numPanzer].id+" "+panzerInGarageArr[0].id);
                        //    alert (num);
                            deleteElemArrToNum(panzerInGarageArr,num);
                            let flag=false;
                            if (panzerInGarageArr.length>0 &&
                                                garageImageArr.length>0)
                            {
                                if (garage.open==false)garage.start();
                            }
                            else
                            {
                                if (money>=500)
                                {
                                    if (shopImageArr.length>0)
                                    {
                                        if (shop.open==false)shop.start(0,true); 
                                    }
                                    else
                                    {
                                       // uploadLevelOrRestart();
                                       flag=true;
                                       // 
                                        //console.log(panzerArr);
                                   //     alert("Game Over");
                                    }
                                        
                                    
                                }
                                else
                                {
                                  //  alert("Game Over");
                                 //   uploadLevelOrRestart();
                                    flag=true;
                                }
                                if (flag==true)
                                {
                                    initBigText("Вы проиграли","#FF0000",130,2);
                                    levelUpdates = true;
                                }
                            }
                        }
                    }
                    else if (killGroupPanzer()==1 && killGroupPanzer()!=-1&&
                            checkKillBaseAll()==true
                            )
                    {
                        
                        if (levelGame>=levelMap.length)
                        {
                            initBigText("Поздравляем вы прошли игру!!!","#00FF00",0,3);
                            gameWin = true;
                        }
                        else
                        {
                        //    saveDataLevel();
                          initBigText("Уровень пройден","#00FF00",130,1); 
                        }
                        console.log(panzerArr);
                        
//                        alert("YOU WIN!!!");
                    }
//                    countIterationGameLoop=0;
//                    countBeforeUpload=0;
                    countBreak++;
                    //timeOld=new Date().getTime();
                    break;
                }
            }
            if (pause==false && flagFocus==true)
            {
                controlBullets();
                if (( checkPressKey("KeyA")||checkPressKey("KeyS")||
                    checkPressKey("KeyD")||checkPressKey("KeyW")))
                {
                    if (levelGame>1)bonusAppearance();
                 
                }
                burstService();
                controlBase();
                collisionPanzerKeyGate();
                countIterationGameLoop++;
                if (gameSettings.being==false && mouseLeftClick()==true && levelGame>1)
                {
                    if (checkInObj(buttonGarage,mouseX,mouseY)==true)
                    {
                        garage.start();
                    }
                    if (checkInObj(buttonShop,mouseX,mouseY)==true)
                    {
                        shop.start();
                    }
                }
            
            }
            //function startNewGame()
            //{
            //    removeDataLevel();
            //    messageNewGame.close();
            //    mainMenu.close();
            //    startScreen.start();
            //}
            //if (mainMenu.being == true && messageNewGame.being == false)
            //{
            //    mainMenu.update();
            //    mainMenu.selectOn(function (select) {
            //        switch (select) 
            //        {
            //            case 'Продолжить': 
            //                {
            //                    mainMenu.close();
            //                    startScreen.start();
            //                    //if (localStorage.getItem('panzerZeroData')!=null &&
            //                    //    localStorage.getItem('panzerZeroData')!=undefined)
            //                    if (flagSaveDataStoroge==true )
            //                    {
            //                        readDatalevel();
            //                        uploadLevelOrRestart(2);
            //                       // initMap(levelMap[levelGame-1]);
            //                    }
            //                    break;
            //                }
            //            case 'Новая игра':
            //                {
            //                    //mainMenu.close();
            //                    //gameSettings.start();
            //                    if (flagSaveDataStoroge==true)
            //                    {
            //                        messageNewGame.start("Вы действительно хотите начать новую игру? Прогресс будет утерян.",
            //                                        ['Да','Нет']);
            //                    }
                                
            //                    else
            //                    {
            //                        startNewGame();
            //                    }
                               
            //                    break;
            //                }
                        
            //        }
            //    });
            //}
            if (gameMenu.being==true && messageExitMainMenu.being==false)
            {
                gameMenu.update();
                gameMenu.selectOn(function (select) {
                    switch (select) {
                        case 'Продолжить':
                            {
                                gameMenu.close();
                                //startScreen.start();
                                pause = false;
                                if (flagSoundTrack==true)  soundTrack.play();
                                break;
                            }
                        case 'Настройки':
                            {
                                gameMenu.close();
                                gameSettings.start();
                                break;
                            }
                        case 'Помошь':
                            {
                                gameMenu.close();
                                startScreen.start();
                                break;
                            }
                        case 'Главное меню':
                            {
                                messageExitMainMenu.start('Вы действительно хотите выйты?',['Да','Нет']);
                                //gameMenu.close();
                                //mainMenu.start();
                                //startScreen.start();
                                break;
                            }

                    }
                });
            }
            if (gameSettings.being==true)
            {
                gameSettings.update();
                //let flagAudio = false;
                gameSettings.changeProp(function (id, value) {
                    console.log('idProp '+id+' value '+value);
                    switch (id)
                    {
                        case 0:
                            {
                                volumeSoundTrack = value;
                                soundTrack.volume(volumeSoundTrack);
                                if (soundTrack.playing()==false)
                                {
                                    soundTrack.play();
                                    setTimeout(function () {
                                        soundTrack.pause();
                                    }, 2000);
                                }
                                break;
                            }
                        case 1:
                            {
                                volumeAudio = value;
                                audio.volume(volumeAudio);
                                if (flagAudio==false)
                                {
                                    timerAudio= setInterval(function () {
                                        if (checkMouseLeft()==false)
                                        {
                                            audio.play('shot');
                                            flagAudio = false;
                                            clearInterval(timerAudio);
                                            
                                        }
                                    });

                                }
                                flagAudio = true;            
                                break;
                            }
                        case 2:
                            {
                                keysGame.buttonShop = value;
                                break;
                            }
                        case 3:
                            {
                                keysGame.buttonGarage = value;
                                break;
                            }
                        case 4:
                            {
                                keysGame.buttonOpen = value;
                                break;
                            }
                    }
                    //alert(5252);
                });
                
            
                gameSettings.closing(function () {
                    //gameSettings.close();
                    saveDataOption();
                    drawAll();
                    gameMenu.start();

                });
            }
            if (messageExitMainMenu.being==true)
            {
                messageExitMainMenu.update(mouseLeftClick());
                messageExitMainMenu.getSelect(function (select) {
                    switch(select)
                    {
                        case 0: 
                            {
                                
                                messageExitMainMenu.close();
                                gameMenu.close();
                                mainMenu.start();
                                soundTrack.stop();
                                flagSoundTrack = false;
                                break;
                            };
                        case 1: 
                        {
                                messageExitMainMenu.close();
                                gameMenu.close();
                                drawAll();
                                gameMenu.start();
                                break; ;
                        }
                    }
                });
            }
   
            
            //controlBigText();
            


        }
    }
    if (mainMenu.being == true && messageNewGame.being == false)
    {
        mainMenu.update();
        mainMenu.selectOn(function (select) {
            switch (select) 
            {
                case 'Продолжить': 
                    {
                        mainMenu.close();
                        startScreen.start();
                        //if (localStorage.getItem('panzerZeroData')!=null &&
                        //    localStorage.getItem('panzerZeroData')!=undefined)
                        if (flagSaveDataStoroge==true )
                        {
                            readDatalevel();
                            uploadLevelOrRestart(2);
                            // initMap(levelMap[levelGame-1]);
                        }
                        loadLevel = true;
                        break;
                    }
                case 'Новая игра':
                    {
                        //mainMenu.close();
                        //gameSettings.start();
                        if (flagSaveDataStoroge==true)
                        {
                            messageNewGame.start("Вы действительно хотите начать новую игру? Прогресс будет утерян.",
                                            ['Да','Нет']);
                        }
                                
                        else
                        {
                            startNewGame();
                            loadLevel = true;
                        }
                               
                        break;
                    }
                        
            }
        });
     }
     if (messageNewGame.being==true)
     {
        messageNewGame.update(mouseLeftClick());
        messageNewGame.getSelect(function (select) {
            switch(select)
            {
                case 0: 
                    {
                        //removeDataLevel();
                        //messageNewGame.close();
                        //mainMenu.close();
                        //startScreen.start();
                        startNewGame();
                        loadLevel = true;
                        break;
                    }
                case 1: messageNewGame.close(); break;
            }
        });
     }
//    do
//    {
//       timeNow=new Date().getTime();
//    }
//    while(timeNow-timeOld<1)
    timeNow=new Date().getTime();
    time=timeNow-timeOld;
    let timeLoop=16;
   // setText('Time','Time: '+/*Math.trunc*/(timeLoop-time),"#0000FF",10,400);
    
    setTimeout(gameLoop,(time<timeLoop==true)?timeLoop-time:1,option[numOption].speedGame,visibleGame);
}
function controlEnabled(obj)
{
    if(obj.x+obj.width>camera.x && obj.x<camera.x+camera.width &&
            obj.y+obj.height>camera.y && obj.y<camera.y+camera.height)
    {
        return true;
    }
    return false;
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
        accuracyTest=ьфз;;
        strFile="";
        countTestMixShot=0;
        restartLevel();
        pause=true;

    }
}
function checkColorInStokKey(color)
{
    for (let j=0;j<keyInStokArr.length;j++)
    {
        if (color==keyInStokArr[j].color)
        {
           return true; 
        }
    }
    return false;
}
function calcNumById(id,arr)
{
    for(let i=0;i<arr.length;i++)
    {
        if (id==arr[i].id)
        {
            return i;
        }
    }
    return -1;
}
function searchKeyInStokByColor(color)
{
    for (let i=0;i<keyInStokArr.length;i++)
    {
        if (color==keyInStokArr[i].color)
        {
           return i; 
        }
    }
    return -1;
}
function informationOfPanzer(numPanz)
{
    for (var attr in panzerArr[numPanz])
    {
        console.log(attr+ " "+panzerArr[numPanz][attr]);
    }
}
function controlHuman()// управление программой человеком
{
    if (checkPressKey(keysGame.buttonOpen/*"KeyR"*/))
    {
        let numShop=checkInShop(numPanzer);
        if (numShop.num!=-1) 
        {
           lastShop.numShop=numShop.num; 
           lastShop.numEntrance=numShop.numEntr;
         //  alert(checkInShop(numPanzer).num+" "+checkInShop(numPanzer).numEntr);
           if(shop.open==false) shop.start(numShop.num);
        }
        //открывание двери
        let index=checkInGate(numPanzer);
        if (index!=-1 &&checkColorInStokKey(gateArr[index].color))
        {
            openGate(gateArr[index].color,index);
            let indexKey=searchKeyInStokByColor(gateArr[index].color);
            if (indexKey!=-1)
            {
                deleteElemArrToNum(keyInStokArr,indexKey);
            }
        }
        if (checkInGarage(numPanzer)!=-1)
        {
            lastNumGarage=checkInGarage(numPanzer);
            if (garage.open==false)garage.start(numPanzer);
            
        }
              
    }  
    if (gameWin==false)
    {    
        if (shop.open==false && garage.open==false && checkPressKey(keysGame.buttonGarage/*"KeyG"*/)
                && pause==false && levelGame>1) 
        {
            garage.start();
        }//    console.log("sosiska");
        if (shop.open==false && garage.open==false && checkPressKey(keysGame.buttonShop/*"KeyM"*/) 
                && pause==false &&levelGame>1) 
        {
                shop.start(0);
}
    }
    if (keyUpDuration("Escape", 100) && garage.open == false && shop.open == false) 
    {
        if (gameWin==false)
        {   
            if (gameMenu.being==false)
            {
                if (gameSettings.being==false && startScreen.being==false)
                {
                    gameMenu.start(); 
                    soundTrack.pause();
                    pause = true;
                
                }

            }
            else
            {
                gameMenu.close();
                pause = false;
                if (flagSoundTrack==true)  soundTrack.play();
            }
        } 
        else
        {
           // mainMenu.start();
            messageExitMainMenu.close();
            gameMenu.close();
            mainMenu.start();
            soundTrack.stop();
            bigText.being = false;
            fireworks.stop();
            flagSoundTrack = false;
        }
        
    }
    if (keyUpDuration("Digit2",100) && panzerArr[0].maskGun[0]==1) 
    {
        playerGun=0;
    }
    if (keyUpDuration("Digit1",100) && panzerArr[0].maskGun[1]==1) 
    {
        playerGun=1;
    }
    if (keyUpDuration("Digit3",100) && panzerArr[0].maskGun[3]==1) 
    {
        if (panzerArr[numPanzer].numType==5)playerGun=3;
    }
    if (keyUpDuration("Digit4",100) && panzerArr[0].maskGun[2]==1) 
    {
        if (panzerArr[numPanzer].numType==5) playerGun=2;
    }
 
    let resWhell=checkWheel();
    if (resWhell==1) 
    {    
        if (panzerArr[numPanzer].attackPatron==false)
        {
            playerGun=nextGun(-1);
        }
        else
        {
           playerGun=1;
        }
        
    }
    if (resWhell==-1) // если сработало колесико мыши
    {
            playerGun=nextGun(1);
    }
    if (keyUpDuration("Space",100)) 
    {
        //  nextNumPanzer(true);
        fireworks.stop();
    }
    if (keyUpDuration("KeyH",100)) 
    {
        initBigText("Поздравляем вы прошли игру!!!","#00FF00",0,3);
        gameWin = true;
        fireworks = new Fireworks();
        fireworks.run();
    }
    if (checkPressKey('KeyQ') && checkPressKey('ControlLeft') && modeDev==false
            && pause==false) 
    {
        modeDev=true;
        initBigText("Режим разработчика активирован.","#0000FF",80,-1);
        document.getElementById('formText').style.display="block"; 
    }
    if (modeDev==true)
    {
        if (keyUpDuration("KeyN",100)) 
        {
            
            initBigText("Уровень пройден","#00FF00",130,1); 
            //uploadLevelOrRestart(false);
        } 
        if (keyUpDuration("KeyL",100)) 
        {
            uploadLevelOrRestart(0,true);
        }
        
        if (keyUpDuration("KeyK",100))
        {
            killPanzer(0);
//            panzerArr[numPanzer].being=false;
        } 

       
        if (keyUpDuration("KeyI",100)) 
        {
          //  informationOfPanzer(numPanzer);
            console.log(panzerArr);
        }

        if (keyUpDuration("KeyJ",100)) 
        {
            money = 10000;
            levelPlayer = 9;
          //  informationOfPanzer(numPanzer);
           // panzerArr[0].HP = 0;
            
        //  initBigText("Вы проиграли","#FF0000",130,2);
        }
      
    //    if (keyUpDuration("KeyI",100)) 
    //    {
    //        console.log(panzerArr);
    //    }
        if (keyUpDuration('KeyZ',100))
        {
            downloadAsFile(/*JSON.stringify*/(localStorage.getItem('panzerZeroData')),'savePanzerZero')
            alert(localStorage.getItem('panzerZeroData'));
        }
        if (keyUpDuration('KeyX',100))
        {
            var formFile=document.getElementById("formFile");
            formFile.style.display="block"
        }
        //if (keyUpDuration("KeyH",100)) 
        //{
        //    if (messageBox.open==false)messageBox.start("Выбирете что нужно сделать?","сесть","в гараж","отмена");
        //}
        //if (keyUpDuration("Space",100)) 
        //{
        //  //  nextNumPanzer(true);
        //    fireworks.stop();
        //}
        if (keyUpDuration("NumpadSubtract",100)) 
        {
            scale=camera.scaling(-1,scale);
        }
        if (keyUpDuration("NumpadAdd",100)) 
        {
            scale=camera.scaling(1,scale);
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

        if (boxWindowSelect.open==false && checkPressKey("KeyB")) 
        {
             boxWindowSelect.start();
        }
    }
    
   
}
function nextGun(dir)
{
    let count=0;
    let num=playerGun;
    
    while(count<gunQuantityArr.length)
    {
        if (dir>0) num++; else num--;
        if (num<0) num=gunQuantityArr.length-1;
        num=num%gunQuantityArr.length;
        if (/*gunQuantityArr[num]>0 &&*/
                panzerArr[numPanzer].maskGun[num]==1)
        {
            return num;
        } 
        else
        {
            count++;
        }
    }
    return playerGun;
    
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
function panzerControll(num)// функция автоуправления танком
{
    var dx=0;
    var dy=0;
 //   var flagShot=false;
    if (option[numOption].calcShotTime==true)
    {
        if (countLoopShot>0) 
        {
           countLoopShot--;
           if (countLoopShot==0) 
           {
              flagShot=true; 
              // alert('выстрелов за 100 тактов: '+countShot);
              // countShot=0;
           }
        }
    }
    if (checkMouseLeft()==false) flagShot=false; 
    if (flagShot==false)
    if((checkInObj(buttonGarage,mouseX,mouseY)==false && checkInObj(buttonShop,mouseX,mouseY)==false))
    if (checkMouseLeft()==true && num==numPanzer &&panzerArr[num].being==true)// условие выстрела
        {
            calcPanzerShotXY(num);
            if  ((panzerArr[num].countAttack>=maxPanzerTimeAttack(num)&&
                    gunQuantityArr[playerGun]>0)&&
                    ( (checkPointCollisionAll(mouseX-mouseOffsetX+camera.x,
                      mouseY-mouseOffsetY+camera.y,true))==false||playerGun!=3)
                    )
            {
                if (option[numOption].calcShotTime==true)
                {
                    if (countLoopShot==0)
                    {
                        countLoopShot=100;
                        countShot=1;
                    }
                    else
                    {
                       // countLoopShot--;
                        countShot++;
                    }
                }
                
                
            
                shot(panzerArr[num].shotX,panzerArr[num].shotY,
                        panzerArr[num].angleTower+
                                ((playerGun>=2)? 0:
                        mixingShot(panzerArr[num].accuracy)),
                        //panzerArr[num].hitAttack,
                        playerGun==1?panzerArr[num].hitAttackPatron:
                                        panzerArr[num].hitAttack,
                        playerGun,
                        playerGun==3?(mouseX-mouseOffsetX+camera.x):-1,
                        playerGun==3?(mouseY-mouseOffsetY+camera.y):-1
                );
                panzerArr[num].countAttack=0;
                gunQuantityArr[playerGun]--;
                console.log(panzerArr[num].x+' '+panzerArr[num].x+' '+
                        ' '+panzerArr[num].shotX+" "+panzerArr[num].shotY+
                        " "+mouseX+' '+mouseY);
                
                if (playerGun==1) audio.play("patron");
                if (playerGun==0) audio.play("shot");
                if (playerGun==2) audio.play("laser");
                if (playerGun==3) audio.play("rocket");
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
    collisionPanzerBonus(num);
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
    if (panzerArr[num].countAttack<maxPanzerTimeAttack(num)) panzerArr[num].countAttack++;

}
function maxPanzerTimeAttack(num)
{
   if (gamePlayer==true && num==numPanzer)
   {
        if (playerGun<2)
        {
          return playerGun==1?panzerArr[num].timeAttackPatron:panzerArr[num].timeAttack; 
        }
        else if (playerGun==2)
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
            if (checkCrossLinePanzerArrObj(bonusArr,num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
            if (checkCrossLinePanzerArrObj(baseImageArr,num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
            if (checkCrossLinePanzerArrObj(shopImageArr,num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2})==false)    
            if (checkCrossLinePanzerArrObj(garageImageArr,num,{x:panzerArr[i].x+panzerArr[i].width/2,
                    y:panzerArr[i].y+panzerArr[i].height/2})==false) 
//            if (checkCrossLinePanzerShopImage(num,{x:panzerArr[i].x+panzerArr[i].width/2,
//                    y:panzerArr[i].y+panzerArr[i].height/2})==false)
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
function perimetrObjForPanzer(xx,yy,width,height)
{
   // for (let i=0;i<shopImageArr[index].width/mapSize;i++)
   let x=xx;
   let y=yy-mapSize;
    while (x<width+xx)
    {
        if (checkKvadrMap((x+5),(y+5))==true)
        {
            x+=mapSize;

        }
        else 
        {
           break;
        }
    }
    if (x>=width+xx)
    {
                // for (let i=0;i<shopImageArr[index].height/mapSize+1;i++)
        while (y<=height+yy-mapSize)
        {
            if (checkKvadrMap((x+5),(y+5))==true)
            {
                y+=mapSize;

            }
            else 
            {
               break;
            }
        } 
    }
    if (y>height+yy-mapSize)
    {
      //  y-=5;
        while (x>=xx)
        {
            if (checkKvadrMap((x+5),(y+5))==true)
            {
                x-=mapSize;

            }
            else 
            {
               break;
            }
        } 
    }
    if (x<xx)
    {
      //  y-=5;
        while (y>yy)
        {
            if (checkKvadrMap((x+5),(y+5))==true)
            {
                y-=mapSize;
                if (checkKvadrMap((x+5),(y+5))==true)
                {
                    return 0;
                }
            }
            else 
            {
               break;
            }
            
        } 
    }
    return {x:x,y:y}
}
function controlBase()// функция ответственная за то что бы поелялись новые танки возле базы
{
    for (let i=0;i<baseImageArr.length;i++)
    {
        if (baseImageArr[i].being==true)
        {
            if (baseImageArr[i].count>=baseImageArr[i].maxCount)
            {
                let data=perimetrObjForPanzer(baseImageArr[i].x,
                                    baseImageArr[i].y,
                                    baseImageArr[i].width,
                                    baseImageArr[i].height);
                if (data!=0) 
                {
                    baseImageArr[i].count=0;
                    initOnePanzer(data.x+2,data.y+2,1,baseImageArr[i].typePanzerCreate);
                   // break;
                }
                //initOnePanzer(baseImageArr[i].x,baseImageArr[i].y-mapSize,1,0);
                // alert("count BAse");
                
            }
            else
            {
                if (controlEnabled(baseImageArr[i])==true)
                if (checkCrossLinePanzerArrObj(wallArr,0,
                                {x:baseImageArr[i].x+baseImageArr[i].width/2,
                                 y:baseImageArr[i].y+baseImageArr[i].height/2}/*,numNeg=-1)*/)==false)
                {
                    baseImageArr[i].count++;
                }
            }
            
        }
    }
    
    
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
                    {
                       
                        let index=numObjPointCollision(bulletArr[i].x1,bulletArr[i].y1,panzerArr)
                        let index2=numObjPointCollision(bulletArr[i].x1,bulletArr[i].y1,bonusArr)
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
                let flag=false;
                for (let j=0;j<shopImageArr.length;j++)
                {
                    // если пуля столкнулась с магазином
                    if (x>=shopImageArr[j].x && x<=shopImageArr[j].x+shopImageArr[j].width &&
                         y>=shopImageArr[j].y && y<=shopImageArr[j].y+shopImageArr[j].height)
                    {
                        flag=true;
                    }
                }
                {
                    if (checkCollisionArr(bulletArr[i],wallArr)!=-1//||// пуля столкнулась со стеной 
                        //(x>=shopImageArr[j].x && x<=shopImageArr[j].x+shopImageArr[j].width &&
                         //y>=shopImageArr[j].y && y<=shopImageArr[j].y+shopImageArr[j].height)
                                     )
                    {
                        flag=true;
                    }
                }
                if (flag==true)
                if (checkWater(bulletArr[i].x,bulletArr[i].y)==false) 
                {
                   // if (bulletArr[i].type==0)
                    {
                        //newBurst(bulletArr[i].x,bulletArr[i].y); 
                        
                        let numWall=searchNumWall(bulletArr[i].x,bulletArr[i].y);
                        if (numWall!=-1)
                        {
                            if (wallArr[numWall].type==2)
                            {
                                if (bulletArr[i].type==0)
                                {
                                    wallArr[numWall].HP-=20;
                                    newBurst(bulletArr[i].x,bulletArr[i].y,0)
                                }
                                else if (bulletArr[i].type==1)
                                {
                                    wallArr[numWall].HP-=2;
                                    newBurst(bulletArr[i].x,bulletArr[i].y,2)
                                }
                                
                                if (wallArr[numWall].HP<=50) wallArr[numWall].state=1;
                                if (wallArr[numWall].HP<=0)
                                {
                                    wallArr[numWall].being=false;
                                }
                            }
                            else
                            {
                                if (bulletArr[i].type==0)
                                {
                                   
                                    newBurst(bulletArr[i].x,bulletArr[i].y,0)
                                }
                                else if (bulletArr[i].type==1)
                                {
                                    
                                    newBurst(bulletArr[i].x,bulletArr[i].y,2)
                                }
                             //  newBurst(bulletArr[i].x,bulletArr[i].y); 
                            }
                        }
                    }
                   // else
                    {
                        //newBurst(bulletArr[i].x,bulletArr[i].y,2);
                    }  
                
                    killBullet(i);
                 
                    continue;  
                }
                index=checkCollisionArr(bulletArr[i],bonusArr)// пуля столкнулась с яшиком
                if (index!=-1 && bonusArr[index].type==0)
                {
                    callBurst(i);
//                    if (bulletArr[i].type==0)
//                    {
//                        
//                        newBurst(bulletArr[i].x,bulletArr[i].y);
//                        bonusArr[index].being=false;
//                        //bonusArr.splice(index, 1); 
//                    }
//                    else
//                    {
//                        newBurst(bulletArr[i].x,bulletArr[i].y,2);
//                    }
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

               // let flag=false;
                for (let j=0;j<panzerArr.length;j++)// пуля столкнулась с танком
                {
                    if (panzerArr[j].being==true)
                    {
                        if (checkCollision(bulletArr[i],panzerArr[j],0,0,
                                    panzerArr[j].width/2,panzerArr[j].height/2)==true)
                        {
                            callBurst(i);
//                            if (bulletArr[i].type==0)
//                            {
//                                newBurst(bulletArr[i].x,bulletArr[i].y);
//                            }
//                            else
//                            {
//                                newBurst(bulletArr[i].x,bulletArr[i].y,2);
//                            }
                            killBullet(i);
                            panzerArr[j].HP-=bulletArr[i].hit;
                            if(panzerArr[j].HP<=0 /*&& j!=0*/) 
                            {
                                killPanzer(j);
                                //if  (j==numPanzer && gamePlayer==true)   nextNumPanzer();
                            }
                            ////console.log("bul col panz");
                            flag=true;
                            countHits++;
                            break;

                        }
                    }
                }
                for (let j=0;j<baseImageArr.length;j++)  // если пуля столкнулась с базой врага
                {
                    if (baseImageArr[j].being==true)
                    if (checkCollision(bulletArr[i],baseImageArr[j],0,0,
                                    baseImageArr[j].width/2,baseImageArr[j].height/2)==true)
                    {
                        callBurst(i);
                        killBullet(i);
                        baseImageArr[j].HP-=bulletArr[i].hit;
                        if (baseImageArr[j].HP<=0)  baseImageArr[j].being=false;
                    }
                }
               // if (flag==true)   continue;
        }  
    }
    callBurst=function(i)
    {
        if (bulletArr[i].type==0)
        {
            newBurst(bulletArr[i].x,bulletArr[i].y);
        }
        else
        {
            newBurst(bulletArr[i].x,bulletArr[i].y,2);
        }
    }
    
}
function killPanzer(num)// убить танк
{
    panzerArr[num].being=false;
    if (panzerArr[num].group==1&&levelGame>1)
    {
        switch(panzerArr[num].numType)
        {
            case 0: XP+=100;break;
            case 1: XP+=150;break;                
            case 2: XP+=250;break;
            case 3: XP+=500;break;
            case 4: XP+=750;break;
            case 5: XP+=1000;break;
        }
        let x=Math.floor(panzerArr[num].x/mapSize)*mapSize;
        let y=Math.floor(panzerArr[num].y/mapSize)*mapSize;
        newBonus(x,y,randomInteger(1,4));
        
    }
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
                if(panzerArr[i].HP<=0 /*&& j!=0*/) 
                {
                    killPanzer(i);
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
    if (destroy==true)
    {
        barrelArr[num].being=false;
        //barrelArr.splice(num, 1);
    }
    
}
function shot(x,y,angle,hit,type=0,x1=-1,y1=-1)// функция регистрации пули при выстреле
{

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
            }

            bulletArr[i].being=true;
            bulletArr[i].flagCalc=false;

            bulletArr[i].type=type;
            bulletArr[i].hit=hit;

            break;
        }

    }
}

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
    playerGun=nextGun(1);
}
function burstService()// функция облуживания тиков взрывов
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
          checkCollisionArr(panzerArr[num],baseImageArr)!=-1||
          (checkCollisionArr(panzerArr[num],garageImageArr)!=-1 && num!=numPanzer)||
          (checkCollisionArr(panzerArr[num],shopImageArr)!=-1 && num!=numPanzer)|| 
          checkCollisionPanz(num,panzerArr)||
          panzerArr[num].x<0||
          panzerArr[num].x+panzerArr[num].width>mapWidth||
          panzerArr[num].y<0||
          panzerArr[num].y+panzerArr[num].height>mapHeight
          )
    {
        return true;
    }
    return false;
}
function checkInGarage(num)
{
    for (let i=0;i<garageImageArr.length;i++)
    {
        if (panzerArr[num].x/*+panzerArr[num].width*/>garageImageArr[i].x &&
            panzerArr[num].x+panzerArr[num].width<garageImageArr[i].x+garageImageArr[i].width &&
            panzerArr[num].y/*+panzerArr[num].height*/>garageImageArr[i].y &&
            panzerArr[num].y+panzerArr[num].height<garageImageArr[i].y+garageImageArr[i].height)
        {
            return i;
        }
    }
    return -1;   
}
function checkInShop(num)
{
    for (let i=0;i<shopImageArr.length;i++)
    {
        if (panzerArr[num].x/*+panzerArr[num].width*/>shopImageArr[i].x &&
            panzerArr[num].x+panzerArr[num].width<shopImageArr[i].x+shopImageArr[i].width &&
            panzerArr[num].y/*+panzerArr[num].height*/>shopImageArr[i].y &&
            panzerArr[num].y+panzerArr[num].height<shopImageArr[i].y+shopImageArr[i].height)
        {
            for (let j=0;j<shopImageArr[i].entranceArr.length;j++)
            {
                let entrX=shopImageArr[i].entranceArr[j].x+shopImageArr[i].x;
                let entrY=shopImageArr[i].entranceArr[j].y+shopImageArr[i].y;
                let width=shopImageArr[i].entranceArr[j].width;
                let height=shopImageArr[i].entranceArr[j].height;
                if (panzerArr[num].x/*+panzerArr[num].width*/>entrX &&
                    panzerArr[num].x+panzerArr[num].width<entrX+width &&
                    panzerArr[num].y/*+panzerArr[num].height*/>entrY &&
                    panzerArr[num].y+panzerArr[num].height<entrY+height)
                {
                   // alert (i+'  '+j);
                    return {num:i,numEntr:j};
                }
            }
        }
    }
    return {num:-1,numEntr:-1}
}
function checkInGate(num)
{
    for (let i=0;i<gateArr.length;i++)
    {
        if (panzerArr[num].x/*+panzerArr[num].width*/>gateArr[i].x &&
            panzerArr[num].x+panzerArr[num].width<gateArr[i].x+gateArr[i].width &&
            panzerArr[num].y/*+panzerArr[num].height*/>gateArr[i].y &&
            panzerArr[num].y+panzerArr[num].height<gateArr[i].y+gateArr[i].height)
        {
            return i;
        }
    }
    return -1;
}
function collisionPanzerBonus(num)// столкновения танка с ящиком
{
    index=checkCollisionArr(panzerArr[num],bonusArr)
    if (index!=-1)
    {
        bonusArr[index].being=false;
        if (num==numPanzer)
        {
            switch (bonusArr[index].type)
            {
                case 0: boxWindowSelect.start();break;
                case 1: XP+=option[numOption].addBonusXP;
                // XP+=randomInteger(1,10)*100;
                break
                case 2: money+=option[numOption].addBonusMoney;//randomInteger(1,10)*100;
                    break;
                case 3: gunQuantityArr[1]+=randomInteger(1,50);break;
                case 4: gunQuantityArr[0]+=randomInteger(1,5);break;
                    

            }
        }
            
        //bonusArr.splice(index, 1); 
    }
}
function collisionPanzerKeyGate()
{
   let num=numPanzer;
   let index=checkCollisionArr(panzerArr[num],keyGateArr)
   
   if (index!=-1)
   {
        keyGateArr[index].being=false;
       // keyGateArr[index].state=1;
       keyInStokArr.push(keyGateArr[index]);
       //console.log(keyInStokArr);
   }
    
}
function setOffsetMousePosXY(x,y)// устонавить смешения координаат для прицелевания так как экран начинается не в 0 0
{
    mouseOffsetX = 0;//x;
    mouseOffsetY = 0;//y;
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
  //  //console.log(bonusArr.length); 
    for (let i=0;i<shopImageArr.length;i++)
    {
        if (x>=shopImageArr[i].x && x<=shopImageArr[i].x+shopImageArr[i].width &&
                y>=shopImageArr[i].y && y<=shopImageArr[i].y+shopImageArr[i].height)
        {
            return true;
        }
    }
    if (wallArr.length>0 && checkCollisionArr(objCheck,wallArr)!=-1) return true;
    if (bonusArr.length>0 && checkCollisionArr(objCheck,bonusArr)!=-1) return true;
    if (barrelArr.length>0 && checkCollisionArr(objCheck,barrelArr)!=-1) return true;
    if (barrelArr.length>0 && checkCollisionArr(objCheck,baseImageArr)!=-1) return true;
   
    return false;

}
function checkKvadrMap(x,y)
{
        x=Math.floor(x/mapSize);
        y=Math.floor(y/mapSize);
    
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
  //  //console.log(bonusArr.length);
}
function checkCollisionPanz(num,arrPanz)//проверка столкновений танков между собой
{
    for (i=0;i<arrPanz.length;i++)
    {
        if (num!=i && arrPanz[i].being==true)
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
function openGate(color,numGate)
{
    for (let i=0;i<gateArr.length;i++)
    {
        if (gateArr[i].color==color && gateArr[i].close==true && numGate==i)
        {
            gateArr[i].close=false;
            for (let j=0;j<gateArr[i].squareDoor.length;j++)
            {
               let n=searchNumWall(gateArr[i].squareDoor[j].x+2,
                                            gateArr[i].squareDoor[j].y+2) ;
                //alert(n);
                if (n!=-1)  wallArr[n].being=false;
               
               console.log(wallArr);
            }
            
        }
    }
}
function initShopImage(xx=-1,yy=-1)// инициализировать обьект магазин 
{
    {
        shopImageArr.push(JSON.parse(JSON.stringify(shopImageType)));;
        i=shopImageArr.length-1;
        let x;
        let y;
        if (xx==-1 && yy==-1)
        {
            x=mapWidth/2-shopImageArr[i].width/2+mapSize+shopImageArr[i].width*i+mapSize*2;
            y=mapHeight/2-shopImageArr[i].height/2+mapSize+shopImageArr[i].height*i+mapSize*2;
        }
        else
        {
            x=xx;
            y=yy;
        }
        shopImageArr[i].x=Math.floor(x/mapSize)*mapSize;
        shopImageArr[i].y=Math.floor(y/mapSize)*mapSize;
        addWallObject(shopImageArr[i].x,shopImageArr[i].y,3,true);
        addWallObject(shopImageArr[i].x+mapSize,shopImageArr[i].y,3,true);
        addWallObject(shopImageArr[i].x+mapSize*3,shopImageArr[i].y,3,true);
        
        addWallObject(shopImageArr[i].x+mapSize*4,shopImageArr[i].y,3,true);
        addWallObject(shopImageArr[i].x+mapSize*4,shopImageArr[i].y+mapSize,3,true);
        addWallObject(shopImageArr[i].x+mapSize*4,shopImageArr[i].y+mapSize*3,3,true);
        
        addWallObject(shopImageArr[i].x+mapSize*4,shopImageArr[i].y+mapSize*4,3,true);
        addWallObject(shopImageArr[i].x+mapSize*3,shopImageArr[i].y+mapSize*4,3,true);
        addWallObject(shopImageArr[i].x+mapSize,shopImageArr[i].y+mapSize*4,3,true)
        ;
        addWallObject(shopImageArr[i].x,shopImageArr[i].y+mapSize*4,3,true);
        addWallObject(shopImageArr[i].x,shopImageArr[i].y+mapSize*3,3,true);
        addWallObject(shopImageArr[i].x,shopImageArr[i].y+mapSize,3,true);
        
        addWallObject(shopImageArr[i].x+mapSize*2,shopImageArr[i].y+mapSize,3,true);
        addWallObject(shopImageArr[i].x+mapSize*2,shopImageArr[i].y+mapSize*3,3,true);
        
        addWallObject(shopImageArr[i].x+mapSize,shopImageArr[i].y+mapSize*2,3,true);
        addWallObject(shopImageArr[i].x+mapSize*3,shopImageArr[i].y+mapSize*2,3,true);
        console.log(shopImageArr);
        shopImageArr[i].lineArr=calcLineArr(shopImageArr[i]);
    }
   
}
function initGarageImage(xx=-1,yy=-1)
{
    
   // for (let i=0;i<2;i++)
    {
        garageImageArr.push(JSON.parse(JSON.stringify(garageImageType)));;
        let i=garageImageArr.length-1;
//        let x;
//        let y;
        if (xx==-1||yy==-1)
        {
            garageImageArr[i].x=200+i*(garageImageArr[i].width+mapSize);
            garageImageArr[i].y=80;
        }
        else
        {
           garageImageArr[i].x=xx;
           garageImageArr[i].y=yy; 
        }
        addWallObject(garageImageArr[i].x,garageImageArr[i].y,3,true);
        addWallObject(garageImageArr[i].x+mapSize,garageImageArr[i].y,3,true);
        addWallObject(garageImageArr[i].x+mapSize*2,garageImageArr[i].y,3,true);
        addWallObject(garageImageArr[i].x+mapSize,garageImageArr[i].y+mapSize,3,true);
        addWallObject(garageImageArr[i].x+mapSize*2,garageImageArr[i].y+mapSize,3,true);
        garageImageArr[i].lineArr=calcLineArr(garageImageArr[i]);
    }
   
    console.log(garageImageArr);
}
function addWallObject(x,y,type,solid=true)
{
    

    let buffer;
    if (x!=-1 && y!=-1)
    {
        buffer= initNoMoveObject(1,wall,type,x,y);      

    }
    else
    {
        buffer= initNoMoveObject(1,wall,type);
    }
    if (solid==false)
    {
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
    }
    wallArr = wallArr.concat(buffer);
    
}
function initKeyGate(x,y,color)
{
    keyGateArr=keyGateArr.concat(initNoMoveObject(1,keyType));
    let i=keyGateArr.length-1;
    keyGateArr[i].x=x;
    keyGateArr[i].y=y;
    keyGateArr[i].color=color;
    
    
}
function initAllNoMoveObject()
{
    
    //gateArr.push(initGate(1));
    bonusArr=initNoMoveObject(quantityBonus,bonus);
    for (let i=0;i<bonusArr.length;i++)
    {
        bonusArr[i].type=randomInteger(0,4);
    }
    
    wallArr=initNoMoveObject(quantityWall,wall);
    initShopImage();
    initGarageImage();
    initBase(100,100,randomInteger(0,5));
    initBase(100,260,randomInteger(0,5));
    for (let i=0;i<quantityWater;i++)
    {
        addWallObject(-1,-1,1,false)
    }
    buffer= initNoMoveObject(quantityBrickWall,wall,2);
    wallArr = wallArr.concat(buffer);
    barrelArr=initNoMoveObject(quantityBarrel,barrel);
    keyGateArr=initNoMoveObject(8,keyType);;
    for (let i=0;i<keyGateArr.length;i++)
    {
        let flag=false;
        let color;
        do
        {
            color=colorsForGate[randomInteger(0,colorsForGate.length-1)];
            flag=false;
            for (let j=0;j<keyGateArr.length;j++)
            {
                if (color==keyGateArr[j].color)
                {
                    flag=true;
                }
            }
            keyGateArr[i].color=colorsForGate[randomInteger(0,7/*colorsForGate.length-1)*/)];
            
        }while(flag==true)
        keyGateArr[i].color=color;
    }
   // let count=1;
    for (let i=0;i<4;i++)
    {
        let flag=false;
        let gate;
        do
        {
            flag=false;
            gate=initGate(i+1);
            for (let x=gate.x;x<=gate.x+gate.width;x+=mapSize)
            {
                for (let y=gate.y;y<=gate.y+gate.height;y+=mapSize)
                {
                    if (checkPointCollisionAll(x+mapSize/2,y+mapSize/2))
                    {
                            flag=true;
                    }


                }
            }
            if (gate.x+gate.width>mapWidth || gate.y+gate.height>mapHeight)
            {
                flag=true;
            }
        }while(flag==true); 

        console.log(gate);

        for (let i=0;i<gate.squareCollision.length;i++)
        {
            addWallObject(gate.squareCollision[i].x,gate.squareCollision[i].y,3,true);
        }
        //console.log(wallArr);
        gateArr.push(gate);
    }
 
}
function initBase(x,y,typePanz=0)
{
      let base=JSON.parse(JSON.stringify(baseImageType));;
      base.x=Math.floor(x/mapSize)*mapSize;
      base.y=Math.floor(y/mapSize)*mapSize;;
      base.being=true;
      base.typePanzerCreate=typePanz;
      base.count=0;
      base.maxCount=/*option[numOption].maxCountBase[typePanz];*/300+typePanz*80;
      base.lineArr=calcLineArr(base);
      baseImageArr.push(base);
}
function initGate(dir,xx=-1,yy=-1,color='#000000')
{
   let gate=JSON.parse(JSON.stringify(gateType));; 
   gate.direction=dir;//randomInteger(1,4);
   gate.being=true;
   if (xx==-1&&yy==-1)
   {    
        gate.x=(randomInteger(1,mapWidth/mapSize-1-1))*mapSize;
        gate.y=randomInteger(1,mapHeight/mapSize-1-1)*mapSize;
   }
   else
   {
       gate.x=xx;
       gate.y=yy;
   }
   if (gate.direction==1||gate.direction==3)
   {
       gate.width=5*mapSize;
       gate.height=2*mapSize;
       gate.squareCollision=[
           {x:gate.x,y:gate.y},
           {x:gate.x,y:gate.y+mapSize},
           {x:gate.x+mapSize*4,y:gate.y},
           {x:gate.x+mapSize*4,y:gate.y+mapSize},
       ];
       if (gate.direction==1)
       {
            gate.squareDoor=[
                {x:gate.x+mapSize,y:gate.y},
                {x:gate.x+mapSize*2,y:gate.y},
                {x:gate.x+mapSize*3,y:gate.y}, 
            ];
            
       }
       if (gate.direction==3)
       {
            gate.squareDoor=[
                {x:gate.x+mapSize,y:gate.y+mapSize},
                {x:gate.x+mapSize*2,y:gate.y+mapSize},
                {x:gate.x+mapSize*3,y:gate.y+mapSize}, 
            ];
            
       }
       
   }
   if (gate.direction==2||gate.direction==4)
   {
       gate.width=2*mapSize;
       gate.height=5*mapSize;
          gate.squareCollision=[
           {x:gate.x,y:gate.y},
           {x:gate.x+mapSize,y:gate.y},
           {x:gate.x,y:gate.y+mapSize*4},
           {x:gate.x+mapSize,y:gate.y+mapSize*4},
       ];
        if (gate.direction==2)
       {
            gate.squareDoor=[
                {x:gate.x+mapSize,y:gate.y+mapSize},
                {x:gate.x+mapSize,y:gate.y+mapSize*2},
                {x:gate.x+mapSize,y:gate.y+mapSize*3}, 
            ];
       }
       if (gate.direction==4)
       {
            gate.squareDoor=[
                {x:gate.x,y:gate.y+mapSize},
                {x:gate.x,y:gate.y+mapSize*2},
                {x:gate.x,y:gate.y+mapSize*3}, 
            ];
           
       }
      
   } 
   gate.squareCollision =gate.squareCollision.concat(gate.squareDoor);
   for (let i=0;i<gate.squareCollision.length;i++)
   {
       addWallObject(gate.squareCollision[i].x,gate.squareCollision[i].y,3,true);
       
   }
   gate.color=(color=="#000000")?(colorsForGate[randomInteger(0,7)]):color;
   gate.close=true;
   return gate;
}
function initNoMoveObject(quantity,object,type=0,xx=-1,yy=-1)
{
    let arr=[];
    for (let i=0;i<quantity;i++)
    {
        // скопируем в него все свойства 
        arr[i]=JSON.parse(JSON.stringify(object));;
        if (xx==-1||yy==-1)
        {
            let flag=false;
            let x=0;
            let y=0;
            do
            {
                flag=false;
                x=(randomInteger(1,mapWidth/mapSize-1-1))*mapSize;
                y=randomInteger(1,mapHeight/mapSize-1-1)*mapSize;
                flag=checkPointCollisionAll(x+mapSize/2,y+mapSize/2);
                for (let i=0;i<shopImageArr.length;i++)
                {
                    if (x>=shopImageArr[i].x-mapSize && x<=shopImageArr[i].x+shopImageArr[i].width+mapSize &&
                        y>=shopImageArr[i].y-mapSize && y<=shopImageArr[i].y+shopImageArr[i].height+mapSize)
                    {
                         flag=true;
                    }
                }

            }
            while(flag==true/*&&i>0*/);
            arr[i].x=x;
            arr[i].y=y;
        }
        else
        {
           arr[i].x=xx;
           arr[i].y=yy; 
        }
        arr[i].being=true;
        arr[i].type=type;
        arr[i].lineArr=calcLineArr(arr[i],i);

    }
    return arr;
}
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
                panzerArr[i].bodyNameImage='body2'+ panzerArr[i].numType;
                            
                            
                console.log(panzerArr[i].bodyNameImage);
//                panzerArr[i].HP= option[numOption].panzerRed[(i==quantityPanzerGroup0)?0:1].HP;//(i==0)?1000:100; 
//                panzerArr[i].speedReaction=option[numOption].panzerRed[(i==quantityPanzerGroup0)?0:1].speedReaction;
//                panzerArr[i].accuracy=option[numOption].panzerRed[(i==quantityPanzerGroup0)?0:1].accuracy;
// 
            }
            
            panzerArr[i].being=true;
            panzerArr[i].HP=panzerArr[i].maxHP;
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
            console.log(panzerArr);
        }   
    }
    
    //console.log(panzerArr);
}
function bonusAppearance()
{
    countNewBonus++;
    if (countNewBonus>=option[numOption].maxCountBonus)
    {
        countNewBonus=0;
        let  bonusOne=initNoMoveObject(1,bonus)[0];
        bonusOne.type=2;
        bonusArr.push(bonusOne);
    }
   // console.log(bonusArr);
}
function newBonus(x,y,type)
{
    let bonusOne=initNoMoveObject(1,bonus)[0];
    bonusOne.type=type;
    bonusOne.x=x;
    bonusOne.y=y;
    
    bonusArr.push(bonusOne);
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
        let str=onePanzer.bodyNameImage;
        console.log(str);
        onePanzer.bodyNameImage=str.replace('body1','body2');;
    }           
    onePanzer.being=true;
    onePanzer.HP=onePanzer.maxHP;
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
    onePanzer.updateState();
    let flag=false;
    for (let i=0;i<panzerArr.length;i++)
    {
        if (panzerArr[i].being==false && i!=numPanzer)
        {
            flag=true;
            panzerArr[i]=clone(onePanzer);
            break;
        }
    }
    if (flag==false)
    {
        panzerArr.push(onePanzer);
    }  
}
function initMap(data,storoge=false)
{
    mapWidth=data.width*mapSize;
    mapHeight=data.height*mapSize;
    map.width=mapWidth;
    map.height=mapHeight;
    console.log(data.mapObjArr);
    for (let i=0;i<mapWidth/mapSize;i++)
    {
        let objOne=initNoMoveObject(1,wall,0,i*mapSize,0);
        wallArr=wallArr.concat(objOne);
        objOne=initNoMoveObject(1,wall,0,i*mapSize,mapHeight-mapSize);
        wallArr=wallArr.concat(objOne);
    }
    
    for (let i=0;i<mapHeight/mapSize;i++)
    {
        let objOne=initNoMoveObject(1,wall,0,0,i*mapSize);
        wallArr=wallArr.concat(objOne);
        objOne=initNoMoveObject(1,wall,0,mapWidth-mapSize,i*mapSize);
        wallArr=wallArr.concat(objOne);
    }
    initNoMoveObject(1,wall,1,80,80);
    for (let i=0;i<data.mapObjArr.length;i++)
    {
        let numType=data.mapObjArr[i].numType;
        let x=data.mapObjArr[i].x;
        let y=data.mapObjArr[i].y;
        //console.log("iiii "+i);
        switch (data.mapObjArr[i].type)
        {
            case 'wall':
            case 'water':
            case 'brickWall':
            {
             //   alert("wall");
               let objOne=initNoMoveObject(1,wall,numType,x,y);
               if (data.mapObjArr[i].type=="water") 
               {
                    //console.log(objOne[0].lineArr);
                   while (objOne[0].lineArr.length>0)
                   {
                       objOne[0].lineArr.pop();
                   }
               }
               wallArr=wallArr.concat(objOne);
            }
            break;
            case 'gate':
            {
             //   alert("wall");
                let dir=data.mapObjArr[i].dir;
                let color=data.mapObjArr[i].color;
                let gateOne=initGate(dir,x,y,color,false);
                gateArr.push(gateOne);;
            }
            break;
            case 'barrel':
            {
               let objOne=initNoMoveObject(1,barrel,numType,x,y);
               barrelArr=barrelArr.concat(objOne); 
            }
            break;
            case 'panzer':
            {
                let GR=data.mapObjArr[i].group;
                if (numType!=6)
                {
                    initOnePanzer(x,y,GR,numType)
                }
                else
                {
                    if (storoge==true/*flagPanzerLoad==true*/)
                    {
                        initOnePanzer(x, y, GR, 0);
                        for (var attr1 in panzerArr[numPanzer])
                        {
                            for (var attr2 in panzerInGarageArr[panzerNumGarage])
                            {
                                //console.log(listProduct[this.startI].option[attr2]);
                                if (attr1==attr2) 
                                {
                                   console.log(attr1);
                                   if (attr1!='x' && attr1!='y')
                                   {
                                       panzerArr[numPanzer][attr1]=panzerInGarageArr[panzerNumGarage][attr2];
                                   }
                                }
                            }
                        }  
                        flagPanzerLoad = false;
                        panzerArr[numPanzer].HP = panzerArr[numPanzer].maxHP;
                        //flagSaveDataStoroge = false;
                    }
                }
            }
            break;
            case 'bonus':
            {
               let objOne=initNoMoveObject(1,bonus,numType,x,y);
               bonusArr=bonusArr.concat(objOne); 
            }
            break;
            case 'shop':
            {
                initShopImage(x,y);
//               let objOne=initNoMoveObject(1,bonus,numType,x,y);
//               bonusArr=bonusArr.concat(objOne); 
            }
            break;
            case 'garage':
            {
                initGarageImage(x,y);
//               let objOne=initNoMoveObject(1,bonus,numType,x,y);
//               bonusArr=bonusArr.concat(objOne); 
            }
            break;
            case "base":
            {
                initBase(x,y,numType)
            }
            break;
             case 'keyGate':
            {
               let color=data.mapObjArr[i].color;
               initKeyGate(x,y,color);
            }
            break;
//            default:
//
//                break;
        }
    }
    console.log(panzerArr);
    let waterArr=[];
    for (let i=0;i<wallArr.length;i++)
    {
        if (wallArr[i].type==1)
        {
            waterArr.push(wallArr[i]);
        }
    }
    console.log (waterArr);
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
    for (let i=0;i<bonusArr.length;i++)
    {
        bonusArr[i].being=true;
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
    clearPressKey();
    initPanzers();
    countIterationGameLoop=0;
    countBeforeUpload=0;
    playerGun=nextGun(1);
}
function uploadLevelOrRestart(restart=1,loadBrowser=false)// функция обновления уровня после того как бой закончен
{
    if (restart==1||loadBrowser==true)
    {
        while (panzerArr.length>0)
        {
            panzerArr.splice(0,1);
        }
    }
    else
    {
        let flag=false;
        let x=null;
        let y=null;
        if (restart==false && levelGame<levelMap.length) levelGame++;
        for (let i=0;i<levelMap[levelGame-1].mapObjArr.length;i++)
        {
            if (levelMap[levelGame-1].mapObjArr[i].type=="panzer" && 
                    levelMap[levelGame-1].mapObjArr[i].numType==6)
            {
                if (restart==0)
                {
                    flag=true;
                    // alert("panz6");
                    x=levelMap[levelGame-1].mapObjArr[i].x;
                    y=levelMap[levelGame-1].mapObjArr[i].y;
                    break;
                }
                
            }
        }
        while (panzerArr.length>0 /*&& (panzerArr.length!=1 && flag==false)*/ )
        {
            let len=panzerArr.length-1;
            //alert("panz");
            if (flag==true)
            {
                if (panzerArr[len].group==1)
                {    
                    panzerArr.splice(len,1);
                }
                else
                {
                    if (flag==true)
                    {
                        panzerArr[0].x=x;
                        panzerArr[0].y=y;
                        panzerArr[0].updateState();
                    
                        //panzerArr[0].numType = 3//panzerNumGarage;
                        panzerArr[numPanzer].HP = panzerArr[numPanzer].maxHP;
                        //panzerArr[0].being = true;
                    }
                    break;
                }
            }
            else
            {
                panzerArr.splice(0,1);  
            }
        } 
    }
    while (bonusArr.length>0)
    {
        bonusArr.splice(0,1);
    }
    while (wallArr.length>0)
    {
        wallArr.splice(0,1);
    }
    while (barrelArr.length>0)
    {
        barrelArr.splice(0,1);
    }
    while (gateArr.length>0)
    {
        gateArr.splice(0,1);
    }
    while (keyGateArr.length>0)
    {
        keyGateArr.splice(0,1);
    }
    while (keyInStokArr.length>0)
    {
        keyInStokArr.splice(0,1);
    }
    while (shopImageArr.length>0)
    {
        shopImageArr.splice(0,1);
    }
    while (garageImageArr.length>0)
    {
        garageImageArr.splice(0,1);
    }
    if (restart==1||levelGame==2)
    {
        while (panzerInGarageArr.length>0)
        {
            panzerInGarageArr.splice(0,1);
        }
    }
    while (baseImageArr.length>0)
    {
       baseImageArr.splice(0,1);
    }
    clearPressKey();
    calcQuantityPanzer();
    if (loadBrowser==true)
    {
        initMap(JSON.parse(localStorage.getItem('gameMap')),true);
        playerGun=nextGun(1);
    }
    else
    {
        if (restart==1) levelGame=1;
        initMap(levelMap[levelGame-1],restart==2?true:false);
        if (levelGame==1) money=option[numOption].startMoney;
    }
    numPanzer=0;
    if (restart==1||levelGame==2)
    {
        let panz=copyPanz(panzerArr[numPanzer]);
        panzerInGarageArr.push(panz);
    }
    calcBalance(false,true);
    
    countIterationGameLoop=0;
    countBeforeUpload=0;
    playerGun=nextGun(1);
    levelUpdates = false;
    console.log(panzerArr);
//    //console.log('USPEH');
//    //console.log(panzerArr.length);
//    //console.log(bulletArr.length);
//    //console.log(bonusArr.length);
//    //console.log(wallArr.length);
//    //console.log(barrelArr.length);
//    //console.log(lineWallArr.length);
//    //console.log(lineBarrelArr.length);
//    //console.log('USPEH');
}

function VectMult( ax,  ay,  bx, by)
{
       
}

function   IsCrossing( x1,  y1,  x2,  y2,  x3,  y3,  x4,  y4)
{
    var a_dx = x2 - x1;
    var a_dy = y2 - y1;
    var b_dx = x4 - x3;
    var b_dy = y4 - y3;
    var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
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
        if (arr[i].lineArr.length==0 )continue; 
        if ( arr[i].being==true )
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
        for (let i=0;i<shopImageArr.length;i++)
        {
            if (shopImageArr[i].being==true )
            {        
                ////console.log('true');
                for (let j=0;j<4;j++)
                {
                    if (IsCrossing( pPanz.x, pPanz.y,  point.x,point.y,
                        shopImageArr[i].linePerimetrArr[j].x,shopImageArr[i].linePerimetrArr[j].y,
                        shopImageArr[i].linePerimetrArr[j].x1, shopImageArr[i].linePerimetrArr[j].y1)) 
                        {
                            return true;
                        }
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
copyPanz=function(panz)
{
    let onePanz=clone(panzer);
    for (var attr1 in onePanz)
    {
        for (var attr2 in panz)
        {
            //console.log(listProduct[this.startI].option[attr2]);
            if (attr1==attr2) 
            {
                onePanz[attr1]=panz[attr2];
            }
        }
    }
    return onePanz;
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
function calcMaxParams(flag=false)
{
    let maxHP=0;
    let maxTimeAttack=34;
    let maxHit=0;
    let maxSpeed=0;
    let maxAccuracy=0;

    for (let i=0;i<panzerOption.length;i++)
    if(i<6)
    {
        let buffer=panzerOption[i].maxHP;
        for (let j=0;j<3;j++)
        {
            
            buffer*=1+panzerOption[i].mapUp.upHP.up[j]/100;
        }
        if (buffer>maxHP) maxHP=buffer;
    }
    //for (let i=0;i<panzerOption.length;i++)
    //if(i<6)
    //{
    //    //let buffer=panzerOption[i].timeAttackPatron;
    //    let buffer=panzerOption[i].attackPatron==false ?
    //                        panzerOption[i].timeAttack:
    //                        panzerOption[i].timeAttackPatron;
    //    //buffer = 100 / buffer;
    //    //for (let j=0;j<3;j++)
    //    //{
            
    //    //    buffer*=1+panzerOption[i].mapUp.upTimeAttack.up[j]/100;
    //    //}
    //    if (buffer>maxTimeAttack) maxTimeAttack=buffer;
    //}
    for (let i=0;i<panzerOption.length;i++)
    if(i<6)
    {
        let buffer=panzerOption[i].attackPatron==false ?
                            panzerOption[i].hitAttack:
                            panzerOption[i].hitAttackPatron;
        for (let j=0;j<3;j++)
        {
            buffer*=1+panzerOption[i].mapUp.upHit.up[j]/100;
        }
        if (buffer>maxHit) maxHit=buffer;
    }
    for (let i=0;i<panzerOption.length;i++)
    if(i<6)
    {
        let buffer=panzerOption[i].speed;
        for (let j=0;j<3;j++)
        {
            buffer*=1+panzerOption[i].mapUp.upSpeed.up[j]/100;
        }
        if (buffer>maxSpeed) maxSpeed=buffer;
    }
    for (let i=0;i<panzerOption.length;i++)
    if(i<6)
    {
        let buffer=panzerOption[i].accuracy;
        for (let j=0;j<3;j++)
        {
            let value=panzerOption[i].mapUp.upAccuracy.up[j]/100;
            buffer/=100;
            buffer=(buffer+value)-buffer*value;
            buffer*=100;
        }
        if (buffer>maxAccuracy) maxAccuracy=buffer;
    }
    if (flag==false)
    {
        return [maxHP,maxTimeAttack,maxHit,maxSpeed,maxAccuracy];
    }
    else
    {
        return [maxHP,maxHit,maxSpeed,maxAccuracy];
    }
}
function drawListProgressBar(valuesParam,arrMaxValuesParam,x,y,ofsX,ofsY,dy)
{
    let width=150;
    for (let i=0;i<valuesParam.length;i++)
    {
        context.fillStyle="#AAAAAA";
        context.fillRect(x+ofsX,y+ofsY+dy*i,width,15);
        context.fillStyle="#FF0000";
        context.fillRect(x+ofsX,y+ofsY+dy*i,valuesParam[i]/arrMaxValuesParam[i]*width,15);

    }    
}
function checkKillBaseAll()
{
    for (let i=0;i<baseImageArr.length;i++)
    {
        if(baseImageArr[i].being==true) return false;
    }
   // if (baseImageArr.length==0) return true;
    return true;
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
    memoryGameObj+=memorySizeOf(bonusArr,);
    memoryGameObj+=memorySizeOf(wallArr);
    memoryGameObj+=memorySizeOf(barrelArr);
    return formatByteSize(memoryGameObj);
    //return memoryGameObj;

}