//colorsForGate=["rgb(255,0,0)","rgb(0,0,255)","rgb(255,153,51)",
//               "rgb(255,0,255)","rgb(0,255,255)","rgb(255,255,0)",
//               "rgb(128,255,0)","rgb(255,255,255)",];
var redactOption=[
    [
        {
           type:"wall",
           numType:0,
           nameImage:'wall',
           tabMenu:0,
           x:20,
           y:40,
           width:40,
           height:40,
        }  ,
        {
           type:"water",
           numType:1,
           nameImage:'water',
           tabMenu:0,
           x:100,
           y:40, 
           width:40,
           height:40,
        }  ,
        {
           type:"brickWall",
           numType:2,
           nameImage:'brickwall',
           tabMenu:0,
           x:180,
           y:40,
           width:40,
           height:40,
        }  ,
    ],
    [    
        {
            type:"gate",
            dir:1,
            numType:0,
            tabMenu:1,
            y:40,
            x:20,
            width:200,
            height:80,
        },
        {
            type:"gate",
            dir:3,
            numType:1,
            tabMenu:1,
            y:40,
            x:120,
            width:200,
            height:80,
        },
        {
            type:"gate",
            dir:2,
            numType:2,
            tabMenu:1,
            y:40,
            x:220,
            width:80,
            height:200,
        },
        {
            type:"gate",
            dir:4,
            numType:3,
            tabMenu:1,
            y:40,
            x:270,
            width:80,
            height:200,
        },
        
    ],   
    [
        {
           type:"barrel",
           nameImage:'barrel',
           numType:0,
           tabMenu:2,
           x:20,
           y:40,  
           width:40,
           height:40,
        }  ,
    ],
    [
        {
            type:"panzer",
            enabled:true,
            numType:0,
            group:0,
            nameImage:"body10",
            tabMenu:3,
            y:40,
            x:40,
            width:panzerOption[0].width,
            height:panzerOption[0].height,
        },
        {
            type:"panzer",
            enabled:true,
            numType:1,
            group:0,
            nameImage:"body11",
            tabMenu:3,
            y:40,
            x:100,
            width:panzerOption[1].width,
            height:panzerOption[1].height,

        },
        {
            type:"panzer",
            enabled:true,
            numType:2,
            group:0,
            nameImage:"body12",
            tabMenu:3,
            y:40,
            x:180,
            width:panzerOption[2].width,
            height:panzerOption[2].height,
        },
        {
            type:"panzer",
            enabled:true,
            numType:3,
            group:0,
            nameImage:"body13",
            tabMenu:3,
            y:40,
            x:260,
            width:panzerOption[3].width,
            height:panzerOption[3].height,

        },
        {
            type:"panzer",
            enabled:true,
            numType:4,
            group:0,
            nameImage:"body14",
            tabMenu:3,
            y:40,
            x:340,
            width:panzerOption[4].width,
            height:panzerOption[4].height,

        },
        {
            type:"panzer",
            enabled:true,
            numType:5,
            group:0,
            nameImage:"body15",
            tabMenu:3,
            y:40,
            x:420,
            width:panzerOption[5].width,
            height:panzerOption[5].height,
        },
        {
            type:"panzer",
            enabled:true,
            numType:6,
            group:0,
            nameImage:"body16",
            tabMenu:3,
            y:40,
            x:500,
            width:40,
            height:40,
        },
        
        {
            type:"panzer",
            enabled:true,
            numType:0,
            group:1,
            nameImage:"body20",
            tabMenu:3,
            y:100,
            x:40,
            width:panzerOption[0].width,
            height:panzerOption[0].height,
        },
        {
            type:"panzer",
            enabled:true,
            numType:1,
            group:1,
            nameImage:"body21",
            tabMenu:3,
            y:100,
            x:100,
            width:panzerOption[1].width,
            height:panzerOption[1].height,
        },
        {
            type:"panzer",
            enabled:true,
            numType:2,
            group:1,
            nameImage:"body22",
            tabMenu:3,
            y:100,
            x:180,
            width:panzerOption[2].width,
            height:panzerOption[2].height,
        },
        {
            type:"panzer",
            enabled:true,
            numType:3,
            group:1,
            nameImage:"body23",
            tabMenu:3,
            y:100,
            x:260,
            width:panzerOption[3].width,
            height:panzerOption[3].height,
        },
        {
            type:"panzer",
            enabled:true,
            numType:4,
            group:1,
            nameImage:"body24",
            tabMenu:3,
            y:100,
            x:340,
            width:panzerOption[4].width,
            height:panzerOption[4].height,

        },
        {
            type:"panzer",
            enabled:true,
            numType:5,
            group:1,
            nameImage:"body25",
            tabMenu:3,
            y:100,
            x:420,
            width:panzerOption[5].width,
            height:panzerOption[5].height,
        },
    ],
    [
        {
            type:"bonus",
            numType:0,
           // group:1,
            nameImage:"box",
            tabMenu:4,
            y:40,
            x:20,
            width:40,
            height:40,
        },
        {
            type:"bonus",
            numType:1,
           // group:1,
            nameImage:"bonusXP",
            tabMenu:4,
            y:40,
            x:100,
            width:40,
            height:40,
        },
            {
            type:"bonus",
            numType:2,
           // group:1,
            nameImage:"bonusMoney",
            tabMenu:4,
            y:40,
            x:180,
            width:40,
            height:40,
        },  
        {
            type:"bonus",
            numType:3,
           // group:1,
            nameImage:"bonusPatron",
            tabMenu:4,
            y:40,
            x:260,
            width:40,
            height:40,
        },  
        {
            type:"bonus",
            numType:4,
           // group:1,
            nameImage:"bonusBullet",
            tabMenu:4,
            y:40,
            x:340,
            width:40,
            height:40,
        },  
    ],
    [
        {
            type:"shop",
            numType:3,
           // group:1,
            nameImage:"shop",
            tabMenu:5,
            y:40,
            x:20,
            width:5*40,
            height:5*40,
        }, 
        {
            type:"garage",
            numType:3,
           // group:1,
            nameImage:"garage",
            tabMenu:5,
            y:40,
            x:150,
            width:3*40,
            height:2*40,
        }, 
        {
          type:'base',
          numType:0,
          tabMenu:5,
          y:40,
          x:250,
          width:80,
          height:80,
        },
        
    ],
    [
        {
            type:"keyGate",
            numType:0,
           // group:1,
            color:colorsForGate[0],
            tabMenu:6,
            y:40,
            x:20,
            width:40,
            height:40,
        }, 
    ],
    [
        {
            type:"delete",
            numType:0,
           // group:1,
            nameImage:"deleteBig",
            tabMenu:7,
            y:40,
            x:20,  
        },
        {
            type:"button",
            numType:0,
            text:"Сохранить в файл",
           // group:1,
            tabMenu:7,
            y:40,
            x:120,  
            width:200,
            height:40,
        },
              {
            type:"button",
            numType:1,
            text:"Сохранить в браузер",
           // group:1,
            tabMenu:7,
            y:40,
            x:340,  
            width:250,
            height:40,
        },
                {
            type:"button",
            numType:2,
            text:"Загрузить из файла",
           // group:1,
            tabMenu:7,
            y:100,
            x:120,  
            width:200,
            height:40,
        },
              {
            type:"button",
            numType:3,
            text:"Загрузить из браузера",
           // group:1,
            tabMenu:7,
            y:100,
            x:340,  
            width:250,
            height:40,
        },
    ],
    
    
];
colorsObj=[
    {
        color:colorsForGate[0],
        x:340,
        y:40,
    },
];
function initColors()
{
    let x=colorsObj[0].x;
    for (let i=1;i<8;i++)
    {
        let oneColor=clone(colorsObj[0]);
        oneColor.color=colorsForGate[i];
        oneColor.x=x+i*50;
        colorsObj.push(oneColor);
    }
}
function initKeyGate ()
{
    
    for (let i=1;i<8;i++)
    {
       let oneKey=clone(redactOption[6][0]); 
       oneKey.x=i*80;
       oneKey.numType=i;
       oneKey.color=colorsForGate[i];
       redactOption[6].push(oneKey);
    }
}
function initBase ()
{
    
    for (let i=3;i<8;i++)
    {
       let oneBase=clone(redactOption[5][2]); 
       oneBase.x=oneBase.x+(i-2)*(7+80);
       oneBase.numType=i-2;
       redactOption[5].push(oneBase);
    }
}



