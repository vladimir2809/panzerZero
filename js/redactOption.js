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
        }  ,
        {
           type:"water",
           numType:1,
           nameImage:'water',
           tabMenu:0,
           x:100,
           y:40,     
        }  ,
        {
           type:"brickWall",
           numType:2,
           nameImage:'brickwall',
           tabMenu:0,
           x:180,
           y:40,     
        }  ,
    ],
    [    
        {
            type:"gate",
            dir:1,
            tabMenu:1,
            y:40,
            x:20,
            width:80,
            height:40,
        },
        {
            type:"gate",
            dir:3,
            tabMenu:1,
            y:40,
            x:120,
            width:80,
            height:40,
        },
        {
            type:"gate",
            dir:2,
            tabMenu:1,
            y:40,
            x:220,
            width:40,
            height:80,
        },
        {
            type:"gate",
            dir:4,
            tabMenu:1,
            y:40,
            x:270,
            width:40,
            height:80,
        },
        
    ],   
    [
        {
           type:"barrel",
           nameImage:'barrel',
           tabMenu:2,
           x:20,
           y:40,     
        }  ,
    ],
    [
        {
            type:"panzer",
            numType:0,
            group:0,
            nameImage:"body10",
            tabMenu:3,
            y:40,
            x:40,
        },
        {
            type:"panzer",
            numType:1,
            group:0,
            nameImage:"body11",
            tabMenu:3,
            y:40,
            x:100,
        },
        {
            type:"panzer",
            numType:2,
            group:0,
            nameImage:"body12",
            tabMenu:3,
            y:40,
            x:180,
        },
        {
            type:"panzer",
            numType:3,
            group:0,
            nameImage:"body13",
            tabMenu:3,
            y:40,
            x:260,
        },
        {
            type:"panzer",
            numType:4,
            group:0,
            nameImage:"body14",
            tabMenu:3,
            y:40,
            x:340,
        },
        {
            type:"panzer",
            numType:5,
            group:0,
            nameImage:"body15",
            tabMenu:3,
            y:40,
            x:420,
        },
        
        {
            type:"panzer",
            numType:0,
            group:1,
            nameImage:"body20",
            tabMenu:3,
            y:100,
            x:40,
        },
        {
            type:"panzer",
            numType:1,
            group:1,
            nameImage:"body21",
            tabMenu:3,
            y:100,
            x:100,
        },
        {
            type:"panzer",
            numType:2,
            group:1,
            nameImage:"body22",
            tabMenu:3,
            y:100,
            x:180,
        },
        {
            type:"panzer",
            numType:3,
            group:1,
            nameImage:"body23",
            tabMenu:3,
            y:100,
            x:260,
        },
        {
            type:"panzer",
            numType:4,
            group:1,
            nameImage:"body24",
            tabMenu:3,
            y:100,
            x:340,
        },
        {
            type:"panzer",
            numType:5,
            group:1,
            nameImage:"body25",
            tabMenu:3,
            y:100,
            x:420,
        },
    ],
    [
        {
            type:"bonus",
            numType:0,
           // group:1,
            nameImage:"bonusMoney",
            tabMenu:4,
            y:40,
            x:20,
        },
            {
            type:"bonus",
            numType:1,
           // group:1,
            nameImage:"bonusXP",
            tabMenu:4,
            y:40,
            x:100,
        },  
        {
            type:"bonus",
            numType:2,
           // group:1,
            nameImage:"bonusPatron",
            tabMenu:4,
            y:40,
            x:180,
        },  
        {
            type:"bonus",
            numType:3,
           // group:1,
            nameImage:"bonusBullet",
            tabMenu:4,
            y:40,
            x:260,
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
        }, 
        {
            type:"garage",
            numType:3,
           // group:1,
            nameImage:"garage",
            tabMenu:5,
            y:40,
            x:220,
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
        }, 
    ],
    
    
];

function initKeyGate ()
{
    
    for (let i=1;i<8;i++)
    {
       let oneKey=clone(redactOption[6][0]); 
       oneKey.x=i*80;
       oneKey.color=colorsForGate[i];
       redactOption[6].push(oneKey);
    }
}


