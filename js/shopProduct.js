let shopProduct=[
    {
        category:0,
        type:0,
        levelOpen:1,
        text:"Патроны 10 штук",
        id:"cartridges",
        pieces:10,
        price:10,
        maskGan:[0,1,0,0],
        title:"Патроны для пулемёта в количестве 10 штук. ",
    },
    {
        category:0,
        type:0,
        levelOpen:1,
        text:"Патроны 25 штук",
        id:"cartridges",
        pieces:25,
        price:20,
        maskGan:[0,1,0,0],
        title:"Патроны для пулемёта в количестве 25 штук."
    },
    {
        category:0,
        type:0,
        levelOpen:2,
        text:"Патроны 50 штук",
        id:"cartridges",
        pieces:50,
        price:35,
        maskGan:[0,1,0,0],
        title:"Патроны для пулемёта в количестве 50 штук. ",
    },
    {
        category:0,
        type:0,
        levelOpen:1,
        text:"Снаряды 5 штук",
        id:'shell',
        pieces:5,
        price:50,
        maskGan:[1,0,0,0],
        title:"Снаряды для пушки в количестве 5 штук." +
                " Они наносят приличный урон. "+
                "А также ими можно пробивать стены.",
    },
    {
        category:0,
        type:0,
        levelOpen:1,
        text:"Снаряды 10 штук",
        id:'shell',
        pieces:10,
        price:90,
        maskGan:[1,0,0,0],
        title:"Снаряды для пушки в количестве 10 штук." +
                " Они наносят приличный урон. "+
                "А также ими можно пробивать стены.",
//        title:"Снаряды для пушки в количестве 10 штук. Они наносят приличный урон. "+
//                "А также ими можно пробивать стены.",
    },
    {
        category:0,
        type:0,
        levelOpen:2,
        text:"Снаряды 25 штук",
        id:'shell',
        pieces:25,
        price:200,
        maskGan:[1,0,0,0],
        title:"Снаряды для пушки в количестве 25 штук."+
                " Они наносят приличный урон. "+
                "А также ими можно пробивать стены.",
//        title:"Снаряды для пушки в количестве 25 штук. Они наносят приличный урон. "+
//                "А также ими можно пробивать стены.",
    },
    {
        category:0,
        type:0,
        levelOpen:1,
        text:"Лазер 1 штука",
        id:"laser",
        pieces:1,
        price:100,
        maskGan:[0,0,1,0],
        title:"Лазер убивает с одного попадания. ",
    },
    {
        category:0,
        type:0,
        levelOpen:1,
        text:"Ракета 1 штука",
        id:"rocket",
        pieces:1,
        price:150,
        maskGan:[0,0,0,1],
        title:"Ракета наносит повреждения рядом с местом в котором она взорвалась. Летит сквозь любые препятствия.",
    },
    {
        category:1,
        type:0,
        levelOpen:1,
        text:"Ремонт 10 процентов",
        id:'repairs',
        pieces:10,
        price:10,
        title:"Отремонтировать танк игрока на 10% за 10$.",
        
    },
    {
        category:1,
        type:0,
        levelOpen:1,
        text:"Ремонт 25 процентов",
        id:'repairs',
        pieces:25,
        price:20,
        title:"Отремонтировать танк игрока на 25% за 20$.",
    },
    {
        category:1,
        type:0,
        levelOpen:2,
        text:"Ремонт 50 процентов",
        id:'repairs',
        pieces:50,
        price:30,
        title:"Отремонтировать танк игрока на 50% за 30$.",
    },
    {
        category:1,
        type:0,
        levelOpen:4,
        text:"Ремонт 100 процентов",
        id:'repairs',
        pieces:100,
        price:50,
        title:"Отремонтировать танк игрока на 100% за 50$.",
        
    },
    {
        category:2,
        type:0,
        levelOpen:1,
        text:"Броня",
        id:'upHP',
        pieces:1,
        price:500,
    },
    {
        category:2,
        type:0,
        levelOpen:1,
        text:"Скорострельность",
        id:'upTimeAttack',
        pieces:1,
        price:500,
    },
    {
        category:2,
        type:0,
        levelOpen:1,
        text:"Урон",
        id:'upHit',
        pieces:1,
        price:500,
    },
    {
        category:2,
        type:0,
        levelOpen:1,
        text:"Скорость",
        id:'upSpeed',
        pieces:1,
        price:500,
    },
    {
        category:2,
        type:0,
        levelOpen:1,
        text:"Точность",
        id:'upAccuracy',
        pieces:1,
        price:500,
    },
//        upHP:{up:[10,20,25],price:[35,50,100],levelUp:0},
//            upTimeAttack:{up:[10,15,20],price:[50,75,120],levelUp:0},
//            upHit:{up:[10,15,15],price:[30,50,75],levelUp:0},
//            upSpeed:{up:[10,20,30],price:[40,80,130],levelUp:0},
//            upAccuracy:{up:[10,20,25],price:[50,80,110],levelUp:0},
    {
        category:3,
        numCount:0,
        type:0,
        levelOpen:1,
        text:'БТР110',
        option:panzerOption[0],
        id:'panzer',
        pieces:1,
        price:500,
        title:"Быстрый, хрупкий, стреляет патронами. Самый слабый в игре.",
    },
    {
        category:3,
        numCount:1,
        type:0,
        levelOpen:1,
        text:'КВ1',
        option:panzerOption[1],
        id:'panzer',
        pieces:1,
        price:1000,
        title:"Медленный, хрупкий, но зато стреляет снарядами.",
    },
    {
        category:3,
        numCount:2,
        type:0,
        levelOpen:3,
        text:'БТР220',
        option:panzerOption[2],
        id:'panzer',
        pieces:1,
        price:2500,
        title:"быстрый, хрупкий, стреляет патронами.",
    },
    {
        category:3,
        numCount:3,
        type:0,
        levelOpen:3,
        text:'Т60',
        option:panzerOption[3],
        id:'panzer',
        pieces:1,
        price:5000,
        title:"Средний танк. Может стрелять патронами и снарядами.",
    },
    {
        category:3,
        numCount:4,
        type:0,
        levelOpen:3,
        text:'Т87',
        option:panzerOption[4],
        id:'panzer',
        pieces:1,
        price:7500,
        title:"Много брони, медленный, стреляет снарядами очень быстро.",
    },
    {
        category:3,
        numCount:5,
        type:0,
        levelOpen:3,
        text:'Армата',
        option:panzerOption[5],
        id:'panzer',
        pieces:1,
        price:15000,
        title:"Самый сильный танк в игре. Может пускать ракеты и уничтожать лазером с одного попадания любой танк.",
    },
    {
        category:4,
        type:0,
        levelOpen:3,
        text:"Доход 1$ в секунду",
        id:'income',
        pieces:1,
        price:500,
    },
    {
        category:4,
        type:0,
        levelOpen:5,
        text:"Доход 2$ в секунду",
        id:'income',
        pieces:2,
        price:900,
    },
    
]