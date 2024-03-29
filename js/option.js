// option.js
"use strict"
 let panzerOption=[
    {
        numType:0,
        bodyNameImage:"body10",
        towerNameImage:"tower1",
        width:21,
        height:21,
        mixTowerX:3.5,// смешение башни что бы она поворачивалась вокруг опреденлленой точки
        mixTowerY:7.5,
        mixTowerPosX:11,// координаты куда должна встать башня у корпуса
        mixTowerPosY:11,
        speed:3,
        maxHP:100,
        DMG:1,
        attackPatron:true,
        timeAttack:1000/500,// время перезарядки
        timeAttackPatron:1000/250,// время перезарядки пулемята
        hitAttack:10,
        hitAttackPatron:2,
        maskGun:[0,1,0,0],
        speedReaction:70,// скорость реакции при виде врага
        timeReaction:1000/this.speedReaction,// время реакции
        accuracy:84,// точность//точность
        mapUp:{
            upHP:{up:[5,10,15],price:[25,80,165],levelOpen:[2,3,4],levelUp:0},
            upTimeAttack:{up:[5,10,15],price:[25,80,165],levelOpen:[2,3,4],levelUp:0},
            upHit:{up:[5,10,15],price:[25,80,165],levelOpen:[2,3,4],levelUp:0},
            upSpeed:{up:[5,10,15],price:[25,80,165],levelOpen:[2,3,4],levelUp:0},
            upAccuracy:{up:[10,20,30],price:[25,80,165],levelOpen:[2,3,4],levelUp:0},
        },
    },
    {
        numType:1,
        bodyNameImage:"body11",
        towerNameImage:"tower1",
        width:21,
        height:21,
        mixTowerX:3.5,// смешение башни что бы она поворачивалась вокруг опреденлленой точки
        mixTowerY:7.5,
        mixTowerPosX:11,// координаты куда должна встать башня у корпуса
        mixTowerPosY:11,
        speed:3,
        maxHP:100,
        DMG:1,
        attackPatron:false,
        timeAttack:1000/30,// время перезарядки
        timeAttackPatron:1000/580,// время перезарядки пулемята
        hitAttack:25,
        hitAttackPatron:1,
        maskGun:[1,0,0,0],
        speedReaction:60,// скорость реакции при виде врага
        timeReaction:1000/this.speedReaction,// время реакции
        accuracy:85,// точность//точность
        mapUp:{
            upHP:{up:[5,10,15],price:[40,120,250],levelOpen:[3,4,5],levelUp:0},
            upTimeAttack:{up:[5,10,15],price:[40,120,250],levelOpen:[3,4,5],levelUp:0},
            upHit:{up:[5,10,15],price:[40,120,250],levelOpen:[3,4,5],levelUp:0},
            upSpeed:{up:[5,10,15],price:[40,120,250],levelOpen:[3,4,5],levelUp:0},
            upAccuracy:{up:[10,20,30],price:[40,120,250],levelOpen:[3,4,5],levelUp:0},
        },
    },
    {
        numType:2,
        bodyNameImage:"body12",
        towerNameImage:"tower1",
        width:25,
        height:25,
        mixTowerX:3.5,// смешение башни что бы она поворачивалась вокруг опреденлленой точки
        mixTowerY:7.5,
        mixTowerPosX:13,// координаты куда должна встать башня у корпуса
        mixTowerPosY:13,
        speed:5,
        maxHP:140,
        DMG:1,
        attackPatron:true,
        timeAttack:1000/50,// время перезарядки
        timeAttackPatron:1000/333,// время перезарядки пулемята
        hitAttack:10,
        hitAttackPatron:3,
        maskGun:[0,1,0,0],
        speedReaction:100,// скорость реакции при виде врага
        timeReaction:1000/this.speedReaction,// время реакции
        accuracy:80,// точность//точность
        mapUp:{
            upHP:{up:[5,10,15],price:[60,200,400],levelOpen:[4,5,6],levelUp:0},
            upTimeAttack:{up:[5,10,15],price:[60,200,400],levelOpen:[4,5,6],levelUp:0},
            upHit:{up:[5,10,15],price:[60,200,400],levelOpen:[4,5,6],levelUp:0},
            upSpeed:{up:[5,10,15],price:[60,200,400],levelOpen:[4,5,6],levelUp:0},
            upAccuracy:{up:[10,20,30],price:[60,200,400],levelOpen:[4,5,6],levelUp:0},
        },
    },
    {
        numType:3,
        bodyNameImage:"body13",
        towerNameImage:"tower2",
        width:29,
        height:29,
        mixTowerX:6.5,// смешение башни что бы она поворачивалась вокруг опреденлленой точки
        mixTowerY:18.5,
        mixTowerPosX:14.5,// координаты куда должна встать башня у корпуса
        mixTowerPosY:14.5,
        speed:2,
        maxHP:200,
        DMG:1,
        attackPatron:false,
        timeAttack:1000/30,// время перезарядки
        timeAttackPatron:1000/250,/// время перезарядки пулемята
        hitAttack:35,
        hitAttackPatron:2,
        maskGun:[1,1,0,0],
        speedReaction:100,// скорость реакции при виде врага
        timeReaction:1000/this.speedReaction,// время реакции
        accuracy:90,// точность//точность
        mapUp:{
            upHP:{up:[5,10,15],price:[100,300,650],levelOpen:[5,6,7],levelUp:0},
            upTimeAttack:{up:[5,10,15],price:[100,300,650],levelOpen:[5,6,7],levelUp:0},
            upHit:{up:[5,10,15],price:[100,300,650],levelOpen:[5,6,7],levelUp:0},
            upSpeed:{up:[5,10,15],price:[100,300,650],levelOpen:[5,6,7],levelUp:0},
            upAccuracy:{up:[10,20,30],price:[100,300,650],levelOpen:[5,6,7],levelUp:0},
        },
    },
    {
        numType:4,
        bodyNameImage:"body14",
        towerNameImage:"tower3",
        width:35,
        height:35,
        mixTowerX:8.5,// смешение башни что бы она поворачивалась вокруг опреденлленой точки
        mixTowerY:18.5,
        mixTowerPosX:17,// координаты куда должна встать башня у корпуса
        mixTowerPosY:17,
        speed:2,
        maxHP:250,
        DMG:1,
        attackPatron:false,
        timeAttack:1000/60,// время перезарядки
        timeAttackPatron:1000/250,// время перезарядки пулемята
        hitAttack:35,
        hitAttackPatron:1,
        maskGun:[1,0,0,0],
        speedReaction:100,// скорость реакции при виде врага
        timeReaction:1000/this.speedReaction,// время реакции
        accuracy:82,// точность//точность
        mapUp:{
            upHP:{up:[5,10,15],price:[150,460,1000],levelOpen:[6,7,8],levelUp:0},
            upTimeAttack:{up:[5,10,15],price:[150,460,1000],levelOpen:[6,7,8],levelUp:0},
            upHit:{up:[5,10,15],price:[150,460,1000],levelOpen:[6,7,8],levelUp:0},
            upSpeed:{up:[5,10,15],price:[150,460,1000],levelOpen:[6,7,8],levelUp:0},
            upAccuracy:{up:[10,20,30],price:[150,460,1000],levelOpen:[6,7,8],levelUp:0},
        },
    },
    {
        numType:5,
        bodyNameImage:"body15",
        towerNameImage:"tower4",
        width:35,
        height:35,
        mixTowerX:8.5,// смешение башни что бы она поворачивалась вокруг опреденлленой точки
        mixTowerY:18.5,
        mixTowerPosX:17,// координаты куда должна встать башня у корпуса
        mixTowerPosY:17,
        speed:2,
        maxHP:350,
        DMG:1,
        attackPatron:false,
        timeAttack:1000/30,// время перезарядки
        timeAttackPatron:1000/250,// время перезарядки пулемята
        hitAttack:100,
        hitAttackPatron:2,
        maskGun:[1,1,1,1],
        speedReaction:100,// скорость реакции при виде врага
        timeReaction:1000/this.speedReaction,// время реакции
        accuracy:85,// точность//точность
        mapUp:{
            upHP:{up:[5,10,15],price:[250,775,1500],levelOpen:[7,8,9],levelUp:0},
            upTimeAttack:{up:[5,10,15],price:[250,775,1500],levelOpen:[7,8,9],levelUp:0},
            upHit:{up:[5,10,15],price:[250,775,1500],levelOpen:[7,8,9],levelUp:0},
            upSpeed:{up:[5,10,15],price:[250,775,1500],levelOpen:[7,8,9],levelUp:0},
            upAccuracy:{up:[10,20,30],price:[250,775,1500],levelOpen:[7,8,9],levelUp:0},
        },
    },
    {
        numType:6,
        bodyNameImage:"body16",
        towerNameImage:"tower4",
        width:40,
        height:40,
        mixTowerX:8.5,// смешение башни что бы она поворачивалась вокруг опреденлленой точки
        mixTowerY:18.5,
        mixTowerPosX:20,// координаты куда должна встать башня у корпуса
        mixTowerPosY:20,
//        speed:2,
//        maxHP:1000,
//        DMG:1,
//        attackPatron:false,
//        timeAttack:1000/50,// время перезарядки
//        timeAttackPatron:1000/580,// время перезарядки пулемята
//        hitAttack:15,
//        hitAttackPatron:1,
//        maskGun:[1,1,1,1],
//        speedReaction:100,// скорость реакции при виде врага
//        timeReaction:1000/this.speedReaction,// время реакции
//        accuracy:70,// точность//точность
//        mapUp:{
//            upHP:{up:[10,20,25],price:[35,50,100],levelUp:0},
//            upTimeAttack:{up:[10,15,20],price:[50,75,120],levelUp:0},
//            upHit:{up:[10,15,15],price:[30,50,75],levelUp:0},
//            upSpeed:{up:[10,20,30],price:[40,80,130],levelUp:0},
//            upAccuracy:{up:[10,20,25],price:[50,80,110],levelUp:0},
//        },
    },
 ];
 
var option=[
     
    {
        mapSize:40,
        widthScreenBlock:18,
        heightScreenBlock:14,
        mapWidthBlock:26,
        mapHeightBlock:26,
        quantityBullet:100,
        quantityBonus:10,
        quantityBarrel:1,
        quantityWall:1,
        quantityWater:1,
        quantityBrickWall:1,
        maxDistBullet:5250,
        typePanzerArrGR0:[0,0,0,0,0,1],
        typePanzerArrGR1:[0,0,0,1,0,0],
        quantityPanzerGroup0:0,
        quantityPanzerGroup1:0,
        speedGame:1,
        delayBeforeAttack:50,
        numPanzer:0,
        visibleGame:true,       
        gamePlayer:true,
        startXP:0,
        startMoney:0,
        
        addBonusXP:100,
        addBonusMoney:50,
        maxCountBase:[250,375,625,1000,1500,2250],
        maxCountBonus:300,
        calcShotTime:false,
    },
    {
        mapSize:40,
        widthScreenBlock:18,
        heightScreenBlock:14,
        mapWidthBlock:18,
        mapHeightBlock:2,
        quantityBullet:100,
        quantityBonus:0,
        quantityBarrel:0,
        quantityWall:0,
        maxDistBullet:350,
        typePanzerArrGR0:[3,0,0,0,0,1],
        typePanzerArrGR1:[3,0,0,0,1,0],
        quantityPanzerGroup0:0,
        quantityPanzerGroup1:0,
        speedGame:1,
        delayBeforeAttack:0,
        numPanzer:0,
        visibleGame:true,       
        gamePlayer:false,
    },
//    {
//        mapSize:40,
//        widthScreenBlock:20,
//        heightScreenBlock:14,
//        mapWidthBlock:20,
//        mapHeightBlock:14,
//        quantityBurst:100,
//        quantityBarrel:10,
//        quantityBullet:100,
//        maxDistBullet:350,
//        quantityWall:20,
//        quantityPanzerGroup0:5,
//        quantityPanzerGroup1:5,
//        playerGun:0,
//        visibleGame:true,
//        gamePlayer:true,
//    }
 ];
