
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var imported = document.createElement("script");
var offX = 0;
var offY = 0;
var unmoving = false;
imported.src = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";
document.head.appendChild(imported);
var gameBlocks = [];

//swal("InstantJS", "Made with InstantJS", "info");

var paintbrush = {
    c: document.getElementById("c"),
    ctx: this.c.getContext("2d"),
    rect: function(color, x, y, w, h){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }
};

var shader = {
  c: document.getElementById("c"),
  ctx: this.c.getContext("2d"),
  red: function(){
    this.ctx.fillStyle = "rgba(255, 100, 100, 0.5)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  green: function(){
    this.ctx.fillStyle = "rgba(100, 255, 100, 0.5)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  blue: function(){
    this.ctx.fillStyle = "rgba(100, 100, 255, 0.5)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  yellow: function(){
    this.ctx.fillStyle = "rgba(240, 240, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  heavyred: function(){
    this.ctx.fillStyle = "rgba(255, 100, 100, 0.7)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  heavygreen: function(){
    this.ctx.fillStyle = "rgba(100, 255, 100, 0.7)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  heavyblue: function(){
    this.ctx.fillStyle = "rgba(100, 100, 255, 0.7)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  heavyyellow: function(){
    this.ctx.fillStyle = "rgba(240, 240, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  lightred: function(){
    this.ctx.fillStyle = "rgba(255, 100, 100, 0.3)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  lightgreen: function(){
    this.ctx.fillStyle = "rgba(100, 255, 100, 0.3)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  lightblue: function(){
    this.ctx.fillStyle = "rgba(100, 100, 255, 0.3)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  lightyellow: function(){
    this.ctx.fillStyle = "rgba(240, 240, 0, 0.3)";
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  },
  area: function(x, y, width, height, color){
    if(color == "yellow"){
      this.ctx.fillStyle = "rgba(240, 240, 0, 0.5)";
    }
    if(color == "hyellow"){
      this.ctx.fillStyle = "rgba(240, 240, 0, 0.7)";
    }
    if(color == "lyellow"){
      this.ctx.fillStyle = "rgba(240, 240, 0, 0.3)";
    }
    if(color == "red"){
      this.ctx.fillStyle = "rgba(255, 100, 100, 0.5)";
    }
    if(color == "hred"){
      this.ctx.fillStyle = "rgba(255, 100, 100, 0.7)";
    }
    if(color == "lred"){
      this.ctx.fillStyle = "rgba(255, 100, 100, 0.3)";
    }
    if(color == "green"){
      this.ctx.fillStyle = "rgba(100, 255, 100, 0.5)";
    }
    if(color == "hgreen"){
      this.ctx.fillStyle = "rgba(100, 255, 100, 0.7)";
    }
    if(color == "lgreen"){
      this.ctx.fillStyle = "rgba(100, 255, 100, 0.3)";
    }
    if(color == "blue"){
      this.ctx.fillStyle = "rgba(100, 100, 255, 0.5)";
    }
    if(color == "hblue"){
      this.ctx.fillStyle = "rgba(100, 100, 255, 0.7)";
    }
    if(color == "lblue"){
      this.ctx.fillStyle = "rgba(100, 100, 255, 0.3)";
    }
    this.ctx.fillRect(x, y, width, height);
  }
};

function conLog(text){
    //document.getElementById("cons").value += `\n ${text}`;
}

function condition(con, code){
    if(con){
        code();
        conLog(con);
    }
}

function loadMultiplayer(url){
    let mPlayer = document.createElement("script");
    mPlayer.src = url;
    document.body.appendChild(mPlayer);
    //return mPlayer;
}

function sendMultiplayer(data, where, back){
    let wehere = where;
    let what = data;
    let bk = back;
    window.location = "write.php?where=" + where + "&what=" + what + "back=" + back;
}

function Text(x, y, size, font, text, color){
    this.x = x;
    this.y = y;
    this.font = size + font;
    this.text = text;
    this.color = color;
    this.render = function(){
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
    conLog("Text");
}

function Tool(init, operations, tick){
    this.init = init;
    this.calculations = operations;
    this.tick = tick;
}

function render(sprite, xe, ye, w, h){
    let y = ye;
    let x = xe;
    let ones = [];
    ctx.fillStyle = sprite[0];
    for(i = 1; i < sprite.length; i++){
        if(i == 8 || i == 16 || i == 24|| i == 32 || i == 40 || i == 48 || i == 56){
                x = xe;
                y += (h/8)
        }
        if(sprite[i] == 1){
            ones.push(i);
            //console.log(y);
            //console.log("x" + x);
            //console.log(ones);
            
            /*if(ones[ones.length-1] - ones[ones.length-2] >= 2){
                x = xe;
                y += (h/8)
                console.log(`first ${ones[ones.length-2]}, second ${ones[ones.length-1]}`);
            }*/
            if(i <= 8){
                //x = 0;
                x += w/8;
                ctx.fillRect(x, y, w/8, h/8);
            }
            if(i > 8 && i <= 16){
                //x = 0;
                x += w/8;
                ctx.fillRect(x, y, w/8, h/8);
            }
            if(i > 16 && i <= 24){
                //x = 0;
                x += w/8;
                ctx.fillRect(x, y, w/8, h/8);
            }
            if(i > 24 && i <= 32){
                //x = 0;
                x += w/8;
                ctx.fillRect(x, y, w/8, h/8);
            }
            if(i > 32 && i <= 40){
                //x = 0;
                x += w/8;
                ctx.fillRect(x, y, w/8, h/8);
            }
            if(i > 40 && i <= 48){
                //x = 0;
                x += w/8;
                ctx.fillRect(x, y, w/8, h/8);
            }
            if(i > 48 && i <= 56){
                //x = 0;
                x += w/8;
                ctx.fillRect(x, y, w/8, h/8);
            }
            if(i > 56 && i <= 64){
                //x = 0;
                x += w/8;
                ctx.fillRect(x, y, w/8, h/8);
            }
        } else{
            x += w/8;
        }
    }
    conLog("render");
}

function pixelPerfect(color, numberx, numbery){
    ctx.fillStyle = color;
    ctx.fillRect(numberx * 10, numbery * 10, 10, 10);
    conLog("Pixel");
}

function handleInputDown(input, result){
    window.addEventListener(`keydown`, function(e){
        if(e.key.toLowerCase() == input){
            result();
            conLog("Key input!");
        }
    });
}

function handleThree(input, result, inp, res, inpu, resu){
    window.addEventListener(`keypress`, function(e){
        if(e.key.toLowerCase() == input){
            result();
            conLog("Key input!");
        }
    });
    window.addEventListener(`keydown`, function(ev){
        if(ev.key.toLowerCase() == inp){
            res();
            conLog("Key input!");
        }
    });
    window.addEventListener(`keydown`, function(eve){
        if(eve.key.toLowerCase() == inpu){
            resu();
            conLog("Key input!");
        }
    });
}

function handleTwo(input, result, inp, res){
    window.addEventListener(`keydown`, function(e){
        if(e.key.toLowerCase() == input){
            result();
            conLog("Key input!");
        }
    });
    window.addEventListener(`keypress`, function(e){
        if(e.key.toLowerCase() == inp){
            res();
            conLog("Key input!");
        }
    });
}

function handleInputTap(input, result){
    window.addEventListener(`keypress`, function(e){
        if(e.key.toLowerCase() == input){
            result();
            conLog("Key input!");
        }
    });
}

function Tilemap(map){
    this.map = map;
    this.result = [];
    this.init = function(){
        for(i = 0; i < this.map.length; i++){
            this.result.push(this.map[i]);
            this.result[this.result.length - 1].render();
        }
    }
    this.render = function(){
        for(i = 0; i < this.result.length; i++){
            this.result[i].render();
            this.result[i].collidesWith(player);
        }
    }
}

function TilemapUnstable(map, key, sprites, w, h){
    this.map = map;
    this.key = key;
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.sprites = sprites;
    this.generatedMap = [];
    this.init = function(){
        for(i = 0; i < this.map.length; i++){
            for(e = 0; e < this.map[i].length; e++){
                this.generatedMap.push(this.key[this.map[i][e]]);
                this.generatedMap[this.generatedMap.length - 1].sprite = this.sprites[this.map[i][e]];
                this.generatedMap[this.generatedMap.length - 1].x = this.x;
                this.generatedMap[this.generatedMap.length - 1].y = this.y;
                this.generatedMap[this.generatedMap.length - 1].w = this.w;
                this.generatedMap[this.generatedMap.length - 1].h = this.h;
                this.x += this.w;
            }
            this.y += this.h;
        }
        for(a = 0; a < this.generatedMap.length; a++){
            this.generatedMap[a].render();
        }
    }
    this.render = function(){
        for(a = 0; a < this.generatedMap.length; a++){
            this.generatedMap[a].render();
        }
    }
}

function Particles(num, x, y, playing, size, xv, yv, color, lf){
    this.num = num;
    //this.type = type;
    this.x = x;
    //this.fr = fr;
    this.y = y;
    this.playing = playing;
    this.size = size;
    //this.xr = xr;
    //this.yr = yr;
    this.xv = xv;
    this.yv = yv;
    //this.xvc = xvc;
    //this.yvc = yvc;
    //this.sc = sc;
    this.color = color;
    this.lf = lf;
    this.nlf = lf;
    var xn = this.x;
    var yn = this.y;
    var sn = this.size;
    var vx = this.xv;
    var vy = this.yv;
    var xvn = vx;
    var yvn = vy;
    this.init = function(){
        if(this.playing && lf >= 0){
            //var timnim = 0;
            for(i = 0; i < this.num; i++){
                //timnim++;
                ctx.fillStyle = this.color;
                this.draw(xn, yn, sn, sn);
            }
            this.lf--;
        } else{
            this.lf = this.nlf;
        }
    };
    this.draw = function(x, y, w, h){
        ctx.fillRect(x, y, w, h);
    }
    this.update = function(){
        if(this.lf > 0){
            xn += xvn/10;
            yn += yvn/10;
            vy += this.yvc/10;
            vx += this.xvc/10;
            sn += this.sc/10;
            ctx.fillStyle = this.color;
            ctx.fillRect(xn, yn, sn, sn);
            this.lf--;
        }
    }
}

function Scene(config){
    this.config = config;
    this.init = function(){
        this.config();
    }
    conLog("Scene created!");
}

function SaveFile(name, data, visibility){
    this.name = name;
    this.data = data;
    this.log = null;
    this.incognito = visibility;
    this.save = function(){
        localStorage.setItem(this.name, this.data);
        if(!this.incognito){
            if(localStorage.getItem(this.name) != this.data){
                swal("Error!", "Save unsuccessful!", "error");
            } else{
                swal("Saved!", "Save successful!", "success");
            }
        }
    }
    this.load = function(variable){
        this.data = localStorage.getItem(this.name);
        variable = this.data;
        this.log = new StorageNode([this.data], {log: this.data}, this.data);
    };
    this.recover = function(v1, v2, v3){
        v1 = this.log.array;
        v2 = this.log.object;
        v3 = this.log.additional;
    }
    conLog("Created savefile!");
}

function StorageNode(dataArray, dataObject, additional){
    this.array = dataArray;
    this.object = dataObject;
    this.additional = additional;
    conLog("Storage");
}

function Node(config, data){
    this.data = data;
    this.run = config;
    conLog("Node");
}

function Block(sprite, x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = true;
    this.sprite = sprite;
    if(this.img){
        this.sprite = new Image();
    }
    this.sprite.src = sprite;
    //this.sprite = sprite;
    this.render = function(){
        if(!this.img){
            render(this.sprite, this.x, this.y, this.w, this.h);
        } else{
            ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        }
    }
    this.collidesWith = function(body){
    	if(this.x + this.w >= body.x && this.x + this.w <= body.x + body.w && this.y + this.h >= body.y && this.y + this.h <= body.y + body.h){
    		body.x = this.x + this.w;
    		body.onPlat = true;
    		//body.y = this.y + this.h;
    		body.onPlat = true;
    		return true;
    	} else if(this.x + this.w >= body.x && this.x + this.w <= body.x + body.w && this.y >= body.y && this.y <= body.y + body.h){
            //body.x = this.x + this.w;
    		body.onPlat = true;
    		body.y = this.y - body.h;
    		body.onPlat = true;
    		return true;
        } else if(this.x >= body.x && this.x <= body.x + body.w && this.y >= body.y && this.y <= body.y + body.h){
    		//body.x = this.x - (body.w);
    		body.onPlat = true;
    		body.y = this.y - (body.h);
    		return true;
    	} else if(this.x >= body.x && this.x <= body.x + body.w && this.y + this.h >= body.y && this.y + this.h <= body.y + body.h){
            body.x = this.x - (body.w);
    		body.onPlat = true;
    		//body.y = this.y + (this.h);
    		return true;
        } else if(body.x > this.x && body.x + body.w < this.x + this.w && body.y > this.y && body.y + body.h < this.y + this.h){
    	    //body.x = this.x + (this.w);
    		body.onPlat = true;
    		//body.y = this.y - body.h;
    		return true;
    	} else if(body.x< this.x + this.w && body.x + body.w > this.x + this.w && body.y > this.y && body.y + body.h <= this.y + this.h){
            body.x = this.x - (body.w);
    		body.onPlat = true;
            //body.y = this.y - body.h;
    		return true;
    	} else if(body.x > this.x && body.x + body.w < this.x + this.w && body.y < this.y && body.y + body.h > this.y){
    		//body.x = this.x - (body.w);
    		body.onPlat = true;
            body.y = this.y - body.h;
    		return true;
    	} else if(this.x < body.x && this.x + this.w > body.x + body.w && this.y + this.h > body.y && this.y + this.h < body.y + body.h){
    	    //body.y = this.y + this.h;
    		body.onPlat = true;
            body.y = this.y + this.h;
    		return true;
    	} else{
    	    body.onPlat = false;
    		return false;
    	}
    }
    conLog("Block object!");
    gameBlocks.push(this);
}

function Character(sprite, x, y, w, h, camx, camy){
    this.x = x;
    this.sx = x;
    this.sy = y;
    this.camx = camx;
    this.camy = camy;
    if(camx == null){
        camx = false;
    }
    if(camy == null){
        camy = false;
    }
    this.y = y;
    this.lx = x;
    this.ly = y;
    this.w = w;
    this.h = h;
    this.onPlat = false;
    this.img = true;
    this.sprite = sprite;
    if(this.img){
        this.sprite = new Image();
    }
    this.sprite.src = sprite;
    this.render = function(){
        if(!this.img){
            render(this.sprite, this.x, this.y, this.w, this.h);
        } else{
            ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        }
    }
    this.move = function(x, y){
        let s1 = this.x;
        let s2 = this.y;
        this.x += x;
        this.y += y;
        if(x > 0){
            this.lx = 0;
            unmoving = false;
        } else if(x < 0){
            this.lx = 600;
            unmoving = false;
        }
        if(y > 0){
            this.ly = 0;
            unmoving = false;
        } else if(y < 0){
            this.ly = 600;
            unmoving = false;
        }
        if(s1 != this.x && !this.onPlat){
            if(this.camx){
                ctx.translate(-x, 0);
                offX += x;
                if(offX != this.x - this.sx && !unmoving){
                    offX = this.x - this.sx;
                    ctx.translate(x, 0);
                    unmoving = true;
                    //return;
                } else{
                    unmoving = false;
                }
                if(unmoving){
                    unmoving = false;
                }
            }
        }
        if(s2 != this.y && !this.onPlat){
            if(this.camy){
                ctx.translate(0, -y);
                offY += y;
                if(offY != this.y - this.sy && !unmoving){
                    offY = this.y - this.sy;
                    ctx.translate(0, y);
                    unmoving = true;
                    //return;
                } else{
                    unmoving = false;
                }
                if(unmoving){
                    unmoving = false;
                }
            }
        }
    }
    this.collidesWith = function(body){
    	if(this.x + this.w >= body.x && this.x + this.w <= body.x + body.w && this.y + this.h >= body.y && this.y + this.h <= body.y + body.h || this.x + this.w >= body.x && this.x + this.w <= body.x + body.w && this.y >= body.y && this.y <= body.y + body.h){
    		return true;
    	} else if(this.x >= body.x && this.x <= body.x + body.w && this.y >= body.y && this.y <= body.y + body.h || this.x >= body.x && this.x <= body.x + body.w && this.y + this.h >= body.y && this.y + this.h <= body.y + body.h){
    		return true;
    	} else if(body.x > this.x && body.x + body.w < this.x + this.w && body.y > this.y && body.y + body.h < this.y + this.h){
    		return true;
    	} else if(body.x < this.x + this.w && body.x + body.w > this.x + this.w && body.y > this.y && body.y + body.h < this.y + this.h){
    		return true;
    	} else if(body.x > this.x && body.x + body.w < this.x + this.w && body.y < this.y && body.y + body.h > this.y){
    		return true;
    	} else if(this.x < body.x && this.x + this.w > body.x + body.w && this.y + this.h > body.y && this.y + this.h < body.y + body.h){
    		return true;
    	} else{
    		return false;
    	}
    }
    conLog("Character class!");
}

function raycast(x, y, tx, ty, obs){
    let cast = new Character("https://future-games.site/tj2cover.png", x, y, 1, 1);
    let collided = false;
    let cx;
    let cy;
    for(i = 0; i > -1; i++){
        cast.move(x - tx / 20, y - ty / 20);
        for(e = 0; i < obs.length; e++){
            if(cast.collidesWith(obs[e])){
               collided = true
               cx = cast.x;
               cy = cast.y;
               let ret = [collided, cx, cy];
               return ret;
            }
        }
    }
}

function Sprite(src, x, y, w, h){
    this.img = new Image();
    this.img.src = src;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.draw = function(){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}




