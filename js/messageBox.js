messageBox={
    open:false,
    x:null,
    y:null,
    width:400,
    height:150,
    font:"18px Monaco",
    message:"",
    button:{x:0,y:0,width:0,heigth:0,message:''},
    buttonArr:[],
    textButton:[],
    
    init: function (){
        this.x=screenWidth/2-this.width/2;
        this.y=screenHeight/2-this.height/2;
    },
    start:function(message,text1,text2="",text3=""){
        this.message=message;
        this.textButton.push(text1);
        if (text2!="")this.textButton.push(text2);
        if (text3!="")this.textButton.push(text3);
        this.open=true;
        this.init();
        context.font = this.font;
        let summPix=0;
        console.log(this.textButton);
        for (let i=0;i<this.textButton.length;i++)
        {
            let oneButton=JSON.parse(JSON.stringify(this.button))//clone(this.button);
            oneButton.message=this.textButton[i];;
            oneButton.width=context.measureText(this.textButton[i]).width;
            summPix+=oneButton.width;
            oneButton.y=50;
            oneButton.height=30;
            this.buttonArr.push(oneButton);
        }
        let freePix=this.width-summPix;
        let freeDist=freePix/(this.buttonArr.length+1);
        let summ=freeDist;
        for (let i=0;i<this.buttonArr.length;i++)
        {     
            this.buttonArr[i].x=summ;
            summ+=this.buttonArr[i].width+freeDist;
        }
        console.log(this.buttonArr);
        
        if (this.open==true) 
        {
            setTimeout(function(){
                 messageBox.timerId=setInterval(function(){messageBox.update()},50);
            },200);
        }
    },
    close:function (){
        this.open=false;
        clearInterval(messageBox.timerId);
    },
    draw:function(){
        context.fillStyle="#000000"
        context.fillRect(this.x,this.y,this.width,this.height);
        context.font = this.font;
        context.fillStyle="#FFFFFF";
        let strLenPix=context.measureText(this.message).width;
        context.fillText(this.message, this.x+this.width/2-strLenPix/2.0,this.y+20);
        for (let i=0;i<this.buttonArr.length;i++)
        {
            context.strokeRect(this.buttonArr[i].x,this.buttonArr[i].y,
                    this.buttonArr[i].width,this.buttonArr[i].height);
            context.fillText(this.buttonArr[i].message,this.x+this.buttonArr[i].x,
                                this.y+this.buttonArr[i].y);
        }
    },
    update: function(){
        if (keyUpDuration("Escape",100))
        {
            this.close();
        }  
    }
}
