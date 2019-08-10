define(['get'], function(get) {
            function Dialog(options) {
                Object.assign(this, options);

            }


            Dialog.prototype.InitFn = function() {
                this.renderFn();
                this.DragFn();
                var close = get.$('.close', this.dialog);
                // console.log(close);
                this.DiaCloseFn(close);
                this.EventCopyFn();
            }


            Dialog.prototype.renderFn = function() {
                    if (this.isMark) {
                        this.mark = document.createElement('div');
                        this.mark.className = "mark";
                        document.body.appendChild(this.mark);
                    };
                    this.dialog = document.createElement('div');
                    this.dialog.className = "dialog";
                    this.dialog.innerHTML = `<h3>${this.title} <span class="close">&times;</span></h3>
                                        <hr>
                                        <p>${this.text}</p>
                                        <div class="btnArray">
                                        ${this.btnArray.map(function(item){
                                        return `<button>${item}</button>`
                                        }).join("")}
                                        </div>`;
                        document.body.appendChild(this.dialog);
                        // console.log(get.$s('.dialog').length)
                        if(get.$s(".dialog").length > 1){
                        document.body.removeChild(get.$('.dialog'));
                    }
                }

                
            Dialog.prototype.DragFn=function(){
                    var that=this;
                    if(this.isDrag){
                        var flag=false,
                            posObj=null;
                        this.dialog.addEventListener('mousedown',function(e){
                        var e=e||window.event;
                        var tar=e.target||e.srcElement;
                        flag=true;
                        posObj={
                            x:e.pageX-this.offsetLeft,
                            y:e.pageY-this.offsetTop
                        } 
            
                        that.dialog.style.boxShadow= '1px 1px 1px #333';
                        });
                        document.addEventListener('mousemove',function(e){
                        var e=e||window.event;
                        var tar=e.target||e.srcElement;
                        if(flag){
                            var moveX=e.pageX-posObj.x,
                                moveY=e.pageY-posObj.y;
                            that.dialog.style.left=moveX+'px';
                            that.dialog.style.top=moveY+'px';
                        }
                        });
                        document.addEventListener('mouseup',function(){
                            that.dialog.style.boxShadow= '1px 1px 5px #333';
                            flag=false
                        })
                    }
                    
            }
            Dialog.prototype.DiaCloseFn=function(closeEl){
                var timer=null;
                var that=this;
                closeEl.addEventListener('click',function(){
                    if(this.index===1){
                      typeof that.copy==='function' && that.copy();
                    }
                    var opa=1;
                    timer=setInterval(function(){
                        opa-=0.1;
                        that.dialog.style.opacity=opa;
                        if(that.isMark){
                            that.mark.style.opacity=opa;
                        }
                        if(opa<=0){
                            opa=0;
                            document.body.removeChild(that.dialog);
                            if(that.isMark){
                            document.body.removeChild(that.mark);
                            }
                            clearInterval(timer)
                        }
                    },100);
                })
            }

            Dialog.prototype.EventCopyFn=function(){
                var that=this;
                var btns=get.$s("button",this.dialog);
                // console.log(btns);
                [...btns].forEach(function(item,i){
                    item.index=i;
                    that.DiaCloseFn(item);
                })
            }

    function init(opts) {
        var defaults = {
            title: 'title',
            text: '树立健康观念的时间偶家的风格',
            btnArray: ['OK', 'NO'],
            isMark: true,
            isDrag: true,
            copy: null
        }
        opts = Object.assign({}, defaults, opts)
        return new Dialog(opts).InitFn();
    }
    return {
        init: init
    }




})