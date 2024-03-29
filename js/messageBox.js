messageBox={
    open:false,
    x:null,
    y:null,
    width:400,
    height:150,
    font:"18px Monaco",
    message:"",
    button:{x:0,y:0,width:0,height:0,message:''},
    buttonArr:[],
    textButton:[],
    a:2,
    responseMask:[1,2,3],
    flagResponse:false,
    response:null,
    
    init: function (){
        this.x=screenWidth/2-this.width/2;
        this.y=screenHeight/2-this.height/2;
    },
    start:function(message,text1){
        this.message=message;
        pause=true;
        this.response=0;
        while (this.textButton.length>0)
        {
            this.textButton.splice(0,1);
        }
        while (this.buttonArr.length>0)
        {
            this.buttonArr.splice(0,1);
        }
        this.responseMask=[1,2,3];
        this.textButton.push(text1);
        for (let i=2;i<arguments.length;i++)
        {
            if (typeof arguments[i]==="object")
            {
                this.responseMask=[];
                for (let j=0;j<arguments[i].length;j++)
                {
                    this.responseMask.push(arguments[i][j]);
                //    alert("maskResp"+" "+this.responseMask) ;
                }
                break;
            }
            if (typeof arguments[i]==="string"&& arguments[i]!='')
            {
                this.textButton.push(arguments[i]);
            }
//               alert("maskResp"+" "+this.responseMask) ;
//              alert(arguments[i]) ; 
            
        }
//        if (text2!="")this.textButton.push(text2);
//        if (text3!="")this.textButton.push(text3);
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
            oneButton.y=120;
            oneButton.height=25;
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
        //pause=false;
        clearInterval(messageBox.timerId);
    },
    draw:function(){
        context.fillStyle="#0000FF"
        context.fillRect(this.x,this.y,this.width,this.height);
        context.font = this.font;
        context.fillStyle="#FFFFFF";
        let strLenPix=context.measureText(this.message).width;
        context.fillText(this.message, this.x+this.width/2-strLenPix/2.0,this.y+20);
        context.strokeStyle="#FF0000"
        for (let i=0;i<this.buttonArr.length;i++)
        {
            let a=this.a;
            context.strokeRect(this.x+this.buttonArr[i].x-a,
                    this.y+this.buttonArr[i].y-this.buttonArr[i].height/1.5-a,
                    this.buttonArr[i].width+a*2,this.buttonArr[i].height+a*2);
            context.fillText(this.buttonArr[i].message,this.x+this.buttonArr[i].x,
                                this.y+this.buttonArr[i].y);
        }
    },
    checkResponse: function()
    {
      if (this.flagResponse==true)
      {
          this.flagResponse=false;
          return this.response;
      }
      return 0;
    },
    update: function(){
        mX=mouseX-mouseOffsetX;
        mY=mouseY-mouseOffsetY;
        if (keyUpDuration("Escape",100))
        {
            this.close();
        } 
        if (mouseLeftClick()==true)
        {
            for (let i=0;i<this.buttonArr.length;i++)
            {
                let a=this.a;

                if (mX>this.x+this.buttonArr[i].x-a &&
                    mX<this.x+this.buttonArr[i].x-a+this.buttonArr[i].width+a*2 &&
                    mY>this.y+this.buttonArr[i].y-this.buttonArr[i].height/1.5-a &&
                    mY<this.y+this.buttonArr[i].y-this.buttonArr[i].height/1.5-a +
                                        this.buttonArr[i].height+a*2
                    )
                {
                    this.flagResponse=true;
                    this.response=this.responseMask[i];
                    this.close();
                }

            }
        }   
    }
}
