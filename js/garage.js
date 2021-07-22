garage={
    open:false,
    x:100,
    y:100,
    width:400,
    height:200,
    init:function()
    {
       this.x=screenWidth/2-this.width/2;
       this.y=screenHeight/2-this.height/2; 
    },
    start:function()
    {
        this.init();
        console.log('GARAGE');
        pause=true;
        this.open=true;
        if (this.open==true)  timerId=setInterval(function(){
            garage.update()
        },50);
    },
    draw:function()
    {
        context.fillStyle="#000000";
        context.fillRect(this.x,this.y,this.width,this.height);
    },
    close:function()
    {
        pause=false;
        this.open=false;
    },
    update: function()
    {
        if (keyUpDuration("Escape",100))
        {
            this.close();
        }
    }
    
}
