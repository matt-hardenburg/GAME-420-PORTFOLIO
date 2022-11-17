// ui-macro.min.js, for SugarCube 2, by Chapel
// v1.0.0, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
;!function(){var s={update:UIBar.setStoryElements,stow:UIBar.stow,unstow:UIBar.unstow,toggle:function(){$("#ui-bar").hasClass("stowed")?UIBar.unstow():UIBar.stow()},hide:function(){$("#ui-bar").css("display","none")},show:function(){$("#ui-bar").css("display","block")},kill:function(){$("#ui-bar").css("display","none"),$("#story").css("margin-left","2.5em")},restore:function(){$("#ui-bar").css("display","block"),$("#story").css("margin-left","20em")},jump:UI.jumpto,saves:UI.saves,restart:UI.restart,settings:UI.settings,share:UI.share,aliases:{refresh:"update",reload:"update",destroy:"kill",revive:"restore",jumpto:"jump",save:"saves",load:"saves",setting:"settings",sharing:"share"}},r=Object.keys(s);function t(t){return t&&"string"==typeof t?function(s){return r.includes(s)}(t=t.toLowerCase().trim())||(t=function(r){return s.aliases[r]||null}(t))?(s[t](),!1):'Command "'+t+'" is not a valid command.':"Command is not a string."}Macro.add("ui",{handler:function(){Array.isArray(this.args)&&this.args.length||this.error("No commands passed to macro.");var s,r=function(s){if(!Array.isArray(s))return"Command list error.";var r=[];return s.forEach((function(s){r.push(t(s))})),r}(this.args.flatten());s=(r=r.filter((function(s){return"string"==typeof s}))).join(" "),r.length&&s&&this.error(s)}})}();
// end ui-macro.min.js
// operations.min.js, for SugarCube 2, by Chapel
// v1.1.0, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
;!function(){"use strict";var e=e||{},r=!0,t=!0,n=[0,100];function o(e,r){var t,n=[],o=0,i=1;if("string"==typeof e)n=e.split("d");else if("number"==typeof e&&r)n=[e,r];else{if(!(Array.isArray(e)&&e.length>=2))throw new TypeError("dice(): could not process arguments...");e.length=2,n=e}if(n[0]=Number(n[0]),"string"==typeof n[1]&&"F"===n[1].trim().toUpperCase()?(n[1]=3,i=-1):n[1]=Number(n[1]),n.some((function(e){return Number.isNaN(e)})))throw new TypeError("dice(): could not process arguments...");for(t=0;t<n[0];t++){o+=Math.floor(State.random()*n[1])+i}return o}function i(e,r){if("string"==typeof e){var t=[(n=e.trim().replace(/\s/g,"").match(/(\d+[d][\df]\d*)(.*)/i))[1],Number(n[2])];return o(t[0])+t[1]}return o(e,r);var n}e.dice={roll:i},r&&(window.dice=window.dice||i),Number.prototype.dice||Object.defineProperty(Number.prototype,"dice",{configurable:!0,writable:!0,value:function(e){if(0===this)return 0;if(this<0)throw new TypeError("Number.prototype.dice: cannot roll a negative number of dice!");if(("string"!=typeof e||"F"!==e.trim().toUpperCase())&&(null==e||"number"!=typeof e||e<=0||!Number.isInteger(e)))throw new TypeError("Number.prototype.dice: error in argument");if(!Number.isInteger(this))throw new TypeError("Number.prototype.dice: cannot roll partial dice!");return i(this,e)}}),Number.prototype.fairmath||Object.defineProperty(Number.prototype,"fairmath",{configurable:!0,writable:!0,value:function(e){var r=n;if(this<r[0]||this>r[1])throw new TypeError("Number.prototype.fairmath called on a number that is out of the defined range (the number was "+this+").");if(null==e||"number"!=typeof e||e>100||e<-100||arguments.length<1)throw new TypeError("Number.prototype.fairmath given incorrect argument or an argument that is out of the valid 0-100 range.");if(0===e)return Math.clamp(Math.trunc(this),r[0],r[1]);if(e<0)return e*=-1,Math.clamp(Math.trunc(this-(this-r[0])*(e/r[1])),r[0],r[1]);if(e>0)return Math.clamp(Math.trunc(this+(r[1]-this)*(e/r[1])),r[0],r[1]);throw new Error("Number.prototype.fairmath encountered an unspecified error.")}}),Number.prototype.between||Object.defineProperty(Number.prototype,"between",{configurable:!0,writable:!0,value:function(e,r){if("number"!=typeof e||"number"!=typeof r)throw new TypeError("Number.between() -> both values must be numbers");var t=Number(this);if(e===r)return t===e;if(r<e){var n=r;r=e,e=n}return t>=e&&t<=r}}),Math.fairmath||Object.defineProperty(Math,"fairmath",{configurable:!0,writable:!0,value:function(e,r){return e.fairmath(r)}}),Math.between||Object.defineProperty(Math,"between",{configurable:!0,writable:!0,value:function(e,r,t){return e.between(r,t)}}),t&&(Math.fm||Object.defineProperty(Math,"fm",{configurable:!0,writable:!0,value:function(e,r){return e.fairmath(r)}}),Number.prototype.fm||Object.defineProperty(Number.prototype,"fm",{configurable:!0,writable:!0,value:function(e){return this.fairmath(e)}}),Number.prototype.d||Object.defineProperty(Number.prototype,"d",{configurable:!0,writable:!0,value:function(e){return this.dice(e)}}))}();
// end operations.min.js
// meters.min.js, for SugarCube 2, by Chapel
// v1.0.1, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
;!function(){"use strict";var t=!0,e=!1,s=!1,i={full:"#2ECC40",empty:"#FF4136",back:"#DDDDDD",height:"12px",width:"180px",animate:400,easing:"swing",text:"#111111",label:"",align:"center"},n=["center","left","right"],r=["swing","linear"];function a(t,e){return t&&"string"==typeof t&&(t=t.toLowerCase().trim())?t:e||""}function o(t){return t<.5?2*t*t:(4-2*t)*t-1}function l(t,e){if(!(this instanceof l))return new l(t,e);var s=clone(i);this.settings=Object.assign(s,t),this.settings.align=a(this.settings.align),this.settings.easing=a(this.settings.easing),n.includes(this.settings.align)||(this.settings.align="center"),r.includes(this.settings.easing)||(this.settings.easing="swing"),e=Number(e),Number.isNaN(e)&&(e=1),e=Math.clamp(e,0,1),this.value=e;var h=$(document.createElement("div")).addClass("chapel-meter").attr({"data-val":e,"data-label":this.settings.label}).css({position:"relative","background-color":this.settings.back,height:this.settings.height,width:this.settings.width,overflow:"hidden"}),g=$(document.createElement("div")).addClass("meter-label").css({top:0,right:0,"font-size":this.settings.height,"font-weight":"bold","line-height":"100%",width:"100%",height:"100%","vertical-align":"middle","text-align":this.settings.align,color:this.settings.text,"z-index":1,position:"relative",bottom:"100%"}).wiki(this.settings.label).appendTo(h),u=$(document.createElement("div")).addClass("meter-top").css({"background-color":this.settings.full,opacity:o(this.value),width:"100%",height:"100%","z-index":0}),c=$(document.createElement("div")).addClass("meter-bottom").css({position:"absolute",top:0,left:0,"background-color":this.settings.empty,opacity:1,width:100*this.value+"%",height:"100%","z-index":0}).append(u).appendTo(h);this.$element=h,this.$bars={top:u,bottom:c},this.$label=g,g.css("font-size",parseInt(h.css("height"),10)<parseInt($(".passage").css("font-size"),10)?h.css("height"):$(".passage").css("font-size")),g.css("line-height",h.css("height"))}Object.assign(l,{_list:new Map,is:function(t){return t instanceof l},has:function(t){return l._list.has(t)&&l.is(l._list.get(t))},get:function(t){return l.has(t)?l._list.get(t):null},del:function(t){l.has(t)&&l._list.delete(t)},add:function(t,s,i){if(!l.has(t)||e){Object.assign(s,{id:t});var n=new l(s,i);return l._list.set(t,n),n}console.error('Meter "'+t+'" already exists.')},_emit:function(t,e){l.is(t)&&t.$element.trigger({type:":"+e,meter:t})}}),Object.assign(l.prototype,{constructor:l,_label:function(t){var e=this;function s(){e.$label.empty().wiki(e.settings.label),e.$label.css("font-size",parseInt(e.$element.css("height"),10)<parseInt(e.$element.parent().css("font-size"),10)?e.$element.css("height"):e.$element.parent().css("font-size")),e.$label.css("line-height",e.$element.css("height"))}return t?setTimeout(s,Engine.minDomActionDelay):s(),this},_width:function(){var t=this;return this.$bars.bottom.animate({width:100*this.value+"%"},this.settings.animate,this.settings.easing,(function(){l._emit(t,"meter-animation-complete")})),this},_color:function(){return this.$bars.top.animate({opacity:o(this.value)},this.settings.animate,this.settings.easing),this},animate:function(){return l._emit(this,"meter-animation-start"),this._color()._width()._label()},val:function(t){return void 0!==t&&(t=Number(t),Number.isNaN(t)&&(t=1),t=Math.clamp(t,0,1),this.value=t,this.animate()),this.value},options:function(t){return t&&"object"==typeof t&&Object.assign(this.settings,t),this.settings},unwrap:function(){return this.$element[0]},place:function(t,e){var s=$(document.createElement("span"));return t instanceof jQuery||(t=$(t)),t[0]||console.warn("meter#place() -> no valid target"),e&&"object"==typeof e&&(e.classes&&(Array.isArray(e.classes)||"string"==typeof e.classes)&&s.addClass(e.classes),e.attr&&"object"==typeof e.attr&&s.attr(e.attr)),t.append(s.append(this.$element)),this._label(!0),this},on:function(t,e){return"function"!=typeof e?this:t&&"string"==typeof t&&t.trim()?(t=t.split(" ").map((function(t){return(t=t.split(".")[0])+".userland"})).join(" "),this.$element.on(t,e),this):this},one:function(t,e){return"function"!=typeof e?this:t&&"string"==typeof t&&t.trim()?(t=t.split(" ").map((function(t){return(t=t.split(".")[0])+".userland"})).join(" "),this.$element.one(t,e),this):this},off:function(t){return t=t&&"string"==typeof t&&t.trim()?t.split(" ").map((function(t){return(t=t.split(".")[0])+".userland"})).join(" "):".userland",this.$element.off(t),this},click:function(t,e){return this.$element.ariaClick(t,e),this},clone:function(){return new l(this.settings,this.value)},toJSON:function(){return JSON.reviveWrapper("new setup.Meter("+JSON.stringify(this.settings)+", "+this.value+")")}}),setup.Meter=l,t&&(window.Meter=window.Meter||l),Macro.add("newmeter",{tags:["colors","sizing","animation","label"],handler:function(){if(State.length>0&&!s)return this.error("The `<<newmeter>>` macro must be called in your `StoryInit` special passage. Seriously. No excuses. --Love, Chapel");if(this.args.length<1)return this.error("The `<<newmeter>>` macro requires at least one argument: a meter name.");var t=this.args[0],i=null,n=null,r=null,a=null;if("string"!=typeof t)return this.error("Invalid meter name.");if(t=t.trim(),l.has(t)&&!e)return this.error('Cannot clobber the existing meter "'+t+'".');this.payload.length&&(i=this.payload.find((function(t){return"colors"===t.name})),n=this.payload.find((function(t){return"sizing"===t.name})),r=this.payload.find((function(t){return"animation"===t.name})),a=this.payload.find((function(t){return"label"===t.name})));var o={};if(i){if(!i.args.length)return this.error("No arguments passed to the `<<colors>>` tag.");switch(i.args.length){case 1:o.empty=i.args[0],o.full="transparent";break;case 2:o.full=i.args[0],o.empty=i.args[1];break;default:o.full=i.args[0],o.empty=i.args[1],o.back=i.args[2]}}if(n){if(!n.args.length)return this.error("No arguments passed to the `<<sizing>>` tag.");o.width=n.args[0],n.args[1]&&(o.height=n.args[1])}if(r){if(!r.args.length)return this.error("No arguments passed to the `<<animation>>` tag.");if("boolean"!=typeof r.args[0]||r.args[0]){if("string"!=typeof r.args[0])return this.error("The argument to the `<<animation>>` tag should be `true`, `false`, or a valid CSS time value.");o.animate=Util.fromCssTime(r.args[0])}else o.animate=0;r.args[1]&&["swing","linear"].includes(r.args[1])&&(o.easing=r.args[1])}if(a){var h=a.args[0];if(!h||"string"!=typeof h)return this.error("The labelText argument for the `<<label>>` tag is required.");o.label=h.trim(),a.args[1]&&"string"==typeof a.args[1]&&(o.text=a.args[1]),a.args[2]&&"string"==typeof a.args[2]&&(o.align=a.args[2])}l.add(t,o,this.args[1])}}),Macro.add("showmeter",{handler:function(){if(this.args.length<1)return this.error("This macro requires at least one argument: the meter's name.");var t=this.args[0];if("string"!=typeof t)return this.error("Invalid meter name.");t=t.trim();var e=l.get(t);if(!e||!l.is(e))return this.error('The meter "'+t+'" does not exist.');"number"==typeof this.args[1]&&e.val(this.args[1]),e.place(this.output,{classes:"macro-"+this.name,attr:{id:"meter-"+Util.slugify(t)}})}}),Macro.add("updatemeter",{handler:function(){if(this.args.length<2)return this.error("This macro requires two arguments: the meter's name and a value.");var t=this.args[0];if("string"!=typeof t)return this.error("Invalid meter name.");t=t.trim();var e=l.get(t);if(!e||!l.is(e))return this.error('The meter "'+t+'" does not exist.');e.val(this.args[1])}})}();
// end meters.min.js
// css-macro.min.js, for SugarCube 2, by Chapel
// v1.0.0, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
;!function(){"use strict";function t(t){if(t.length%2!=0)return"Style rules should be a list of key/value pairs; you've passed an odd number.";var r={};return t.forEach((function(e,n){n%2==0&&(r[e]=t[n+1])})),r}function r(t,r){try{return"string"==typeof r?r:(t instanceof jQuery||(t=$(t)),t.css(r))}catch(t){return t.message}}Macro.add("css",{handler:function(){var e=function(){try{var e,n=[].slice.call(arguments).flatten(),s=n.shift();return"string"==typeof n[0]?e=t(n):"object"==typeof n[0]&&(e=clone(n[0])),r(s,e)}catch(t){return t.message}}(this.args);if("string"==typeof e)return this.error(e)}})}();
// end css-macro.min.js