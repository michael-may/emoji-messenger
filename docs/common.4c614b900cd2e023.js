"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{4560:(w,v,r)=>{r.r(v),r.d(v,{startFocusVisible:()=>o});const f="ion-focused",a=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],o=n=>{let u=[],d=!0;const t=n?n.shadowRoot:document,l=n||document.body,c=g=>{u.forEach(h=>h.classList.remove(f)),g.forEach(h=>h.classList.add(f)),u=g},m=()=>{d=!1,c([])},s=g=>{d=a.includes(g.key),d||c([])},i=g=>{if(d&&g.composedPath){const h=g.composedPath().filter(y=>!!y.classList&&y.classList.contains("ion-focusable"));c(h)}},p=()=>{t.activeElement===l&&c([])};return t.addEventListener("keydown",s),t.addEventListener("focusin",i),t.addEventListener("focusout",p),t.addEventListener("touchstart",m),t.addEventListener("mousedown",m),{destroy:()=>{t.removeEventListener("keydown",s),t.removeEventListener("focusin",i),t.removeEventListener("focusout",p),t.removeEventListener("touchstart",m),t.removeEventListener("mousedown",m)},setFocus:c}}},4474:(w,v,r)=>{r.d(v,{a:()=>a,b:()=>n,c:()=>u,d:()=>o,e:()=>d,f:()=>e,g:()=>f});const f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Down</title><path d='M64 144l192 224 192-224H64z'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Up</title><path d='M448 368L256 144 64 368h384z'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Back</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipsis Horizontal</title><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>"},9955:(w,v,r)=>{r.d(v,{S:()=>e});const e={bubbles:{dur:1e3,circles:9,fn:(a,o,n)=>{const u=a*o/n-a+"ms",d=2*Math.PI*o/n;return{r:5,style:{top:9*Math.sin(d)+"px",left:9*Math.cos(d)+"px","animation-delay":u}}}},circles:{dur:1e3,circles:8,fn:(a,o,n)=>{const u=o/n,d=a*u-a+"ms",t=2*Math.PI*u;return{r:5,style:{top:9*Math.sin(t)+"px",left:9*Math.cos(t)+"px","animation-delay":d}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(a,o)=>({r:6,style:{left:9-9*o+"px","animation-delay":-110*o+"ms"}})},lines:{dur:1e3,lines:8,fn:(a,o,n)=>({y1:14,y2:26,style:{transform:`rotate(${360/n*o+(o<n/2?180:-180)}deg)`,"animation-delay":a*o/n-a+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(a,o,n)=>({y1:12,y2:20,style:{transform:`rotate(${360/n*o+(o<n/2?180:-180)}deg)`,"animation-delay":a*o/n-a+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(a,o,n)=>({y1:17,y2:29,style:{transform:`rotate(${30*o+(o<6?180:-180)}deg)`,"animation-delay":a*o/n-a+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(a,o,n)=>({y1:12,y2:20,style:{transform:`rotate(${30*o+(o<6?180:-180)}deg)`,"animation-delay":a*o/n-a+"ms"}})}}},6817:(w,v,r)=>{r.d(v,{S:()=>c});var f=r(655),e=r(4182),a=r(872),o=r.n(a),n=r(8790),u=r(3988),d=r(4984),t=r(9863),l=r(5362);class c{constructor(s,i,p,_){this.contactService=s,this.modalController=i,this.toastController=p,this.elementRef=_,this.newContactForm=new e.cw({name:new e.NI("",[e.kI.required,e.kI.minLength(1)]),publicKey:new e.NI("",e.kI.required),file:new e.NI("")}),this.saving=!1}parseFileQR(s){var i;return(0,f.mG)(this,void 0,void 0,function*(){if(!(null===(i=s.target.files)||void 0===i?void 0:i.length))return;const p=yield u.Pp.fileToBase64(s.target.files[0]).catch(g=>(console.log(g),null));if(!p)return void(yield this.toastController.create({message:"Couldn't load file.",duration:2e3})).present();const _=yield u.Pp.base64ToImageData(p).catch(g=>(console.log(g),null));_?this.processQR(o()(_.data,_.width,_.height)):(yield this.toastController.create({message:"Couldn't load file.",duration:2e3})).present()})}processQR(s){return(0,f.mG)(this,void 0,void 0,function*(){if(null==s?void 0:s.data){const i=null==s?void 0:s.data;if(!i)return void(yield this.toastController.create({message:"Error importing QR code.",duration:2e3})).present();console.log(i),this.newContactForm.patchValue({publicKey:i})}else(yield this.toastController.create({message:"Invalid QR data.",duration:2e3})).present()})}scanQR(){return(0,f.mG)(this,void 0,void 0,function*(){const s=yield this.modalController.create({component:d.n,swipeToClose:!0,presentingElement:this.elementRef.nativeElement});yield s.present();const i=yield s.onDidDismiss();console.log(i),(null==i?void 0:i.data)&&this.processQR(i.data)})}saveContact(){return(0,f.mG)(this,void 0,void 0,function*(){if(this.saving)return;this.saving=!0;const s=this.newContactForm.get("name").value,i=this.newContactForm.get("publicKey").value,p=yield this.contactService.addContact(s,i).catch(_=>(console.log(_),null));if(this.saving=!1,!p)throw new Error("Couldn't import contact.");this.dismiss()})}dismiss(){this.modalController.dismiss()}}c.\u0275fac=function(s){return new(s||c)(t.Y36(n.yq),t.Y36(l.IN),t.Y36(l.yF),t.Y36(t.SBq))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-contact-add"]],decls:44,vars:2,consts:[["translucent","true"],["color","primary"],["slot","primary"],[3,"click"],["slot","icon-only","name","close"],[3,"formGroup"],["position","floating"],["ngDefaultControl","","formControlName","name","placeholder","Name","type","text","required",""],["ngDefaultControl","","formControlName","publicKey","type","text","required",""],["name","qr-code-outline","slot","start"],["name","folder-outline","slot","start"],["type","file","formControlName","file",1,"ion-hide",3,"change"],["input",""],["name","camera-outline","slot","start"],["expand","block",3,"disabled","click"],["name","save-outline","slot","start"]],template:function(s,i){if(1&s){const p=t.EpF();t.TgZ(0,"ion-header",0),t.TgZ(1,"ion-toolbar",1),t.TgZ(2,"ion-title"),t._uU(3," Add new Contact "),t.qZA(),t.TgZ(4,"ion-buttons",2),t.TgZ(5,"ion-button",3),t.NdJ("click",function(){return i.dismiss()}),t._UZ(6,"ion-icon",4),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(7,"ion-content"),t.TgZ(8,"form",5),t.TgZ(9,"ion-item"),t.TgZ(10,"ion-label",6),t._uU(11," Contact Name "),t.qZA(),t._UZ(12,"ion-input",7),t.qZA(),t.TgZ(13,"ion-item"),t.TgZ(14,"ion-label",6),t._uU(15,"Public Key"),t.qZA(),t._UZ(16,"ion-textarea",8),t.qZA(),t.TgZ(17,"ion-item"),t._UZ(18,"ion-icon",9),t.TgZ(19,"ion-label"),t._uU(20," QR File: "),t.qZA(),t.TgZ(21,"ion-button",3),t.NdJ("click",function(){return t.CHM(p),t.MAs(26).click()}),t._UZ(22,"ion-icon",10),t.TgZ(23,"ion-label"),t._uU(24,"Select File"),t.qZA(),t.TgZ(25,"input",11,12),t.NdJ("change",function(g){return i.parseFileQR(g)}),t.qZA(),t.qZA(),t.qZA(),t.TgZ(27,"ion-item"),t._UZ(28,"ion-icon",9),t.TgZ(29,"ion-label"),t._uU(30," Scan QR Code "),t.qZA(),t.TgZ(31,"ion-button",3),t.NdJ("click",function(){return i.scanQR()}),t._UZ(32,"ion-icon",13),t.TgZ(33,"ion-label"),t._uU(34,"Open Camera"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(35,"ion-footer"),t.TgZ(36,"ion-toolbar"),t.TgZ(37,"ion-grid"),t.TgZ(38,"ion-row"),t.TgZ(39,"ion-col"),t.TgZ(40,"ion-button",14),t.NdJ("click",function(){return i.saveContact()}),t._UZ(41,"ion-icon",15),t.TgZ(42,"ion-label"),t._uU(43,"Save"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}2&s&&(t.xp6(8),t.Q6J("formGroup",i.newContactForm),t.xp6(32),t.Q6J("disabled",!i.newContactForm.valid))},directives:[l.Gu,l.sr,l.wd,l.Sm,l.YG,l.gu,l.W2,e._Y,e.JL,e.sg,l.Ie,l.Q$,l.pK,l.j9,e.Fj,e.JJ,e.u,e.Q7,l.g2,l.fr,l.jY,l.Nd,l.wI],styles:[""]})},5340:(w,v,r)=>{r.d(v,{K:()=>t});var f=r(655),e=r(4182),a=r(8115),o=r(9863),n=r(5362),u=r(9808);function d(l,c){1&l&&(o.TgZ(0,"ion-item"),o.TgZ(1,"ion-label",6),o._uU(2,"Confirm Password"),o.qZA(),o._UZ(3,"ion-input",12),o.qZA())}class t{constructor(c,m){this.keyService=c,this.modalController=m,this.newKeyForm=new e.cw({name:new e.NI("",[e.kI.required,e.kI.minLength(1)]),password:new e.NI("",e.kI.minLength(6)),passwordConfirm:new e.NI("",e.kI.minLength(6))},{validators:this.passwordsMatch.bind(this)}),this.generating=!1}saveEncryptionKey(){return(0,f.mG)(this,void 0,void 0,function*(){if(this.generating)return;this.generating=!0;const c=this.newKeyForm.get("name").value,m=this.newKeyForm.get("password").value,s=yield this.keyService.generateKey(c,m).catch(i=>(console.log(i),null));if(this.generating=!1,!s)throw new Error("Couldn't generate key pair.");this.newKeyForm.setValue({name:"",password:"",passwordConfirm:""}),this.dismiss()})}dismiss(){this.modalController.dismiss()}passwordsMatch(c){const m=c.get("password"),s=c.get("passwordConfirm");return m.valid&&m.value===s.value?null:{NotEqual:!0}}}t.\u0275fac=function(c){return new(c||t)(o.Y36(a.BA),o.Y36(n.IN))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-key-add"]],decls:27,vars:3,consts:[["translucent","true"],["color","primary"],["slot","primary"],[3,"click"],["slot","icon-only","name","close"],[3,"formGroup"],["position","floating"],["ngDefaultControl","","formControlName","name","type","text","required",""],["ngDefaultControl","","formControlName","password","type","password"],[4,"ngIf"],["expand","block",3,"disabled","click"],["name","save-outline","slot","start"],["ngDefaultControl","","formControlName","passwordConfirm","type","password"]],template:function(c,m){1&c&&(o.TgZ(0,"ion-header",0),o.TgZ(1,"ion-toolbar",1),o.TgZ(2,"ion-title"),o._uU(3," Add new Encryption Key "),o.qZA(),o.TgZ(4,"ion-buttons",2),o.TgZ(5,"ion-button",3),o.NdJ("click",function(){return m.dismiss()}),o._UZ(6,"ion-icon",4),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(7,"ion-content"),o.TgZ(8,"form",5),o.TgZ(9,"ion-item"),o.TgZ(10,"ion-label",6),o._uU(11,"Name"),o.qZA(),o._UZ(12,"ion-input",7),o.qZA(),o.TgZ(13,"ion-item"),o.TgZ(14,"ion-label",6),o._uU(15,"Password"),o.qZA(),o._UZ(16,"ion-input",8),o.qZA(),o.YNc(17,d,4,0,"ion-item",9),o.qZA(),o.qZA(),o.TgZ(18,"ion-footer"),o.TgZ(19,"ion-toolbar"),o.TgZ(20,"ion-grid"),o.TgZ(21,"ion-row"),o.TgZ(22,"ion-col"),o.TgZ(23,"ion-button",10),o.NdJ("click",function(){return m.saveEncryptionKey()}),o._UZ(24,"ion-icon",11),o.TgZ(25,"ion-label"),o._uU(26,"Save"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&c&&(o.xp6(8),o.Q6J("formGroup",m.newKeyForm),o.xp6(9),o.Q6J("ngIf",(null==m.newKeyForm.get("password").value?null:m.newKeyForm.get("password").value.length)&&m.newKeyForm.get("password").valid),o.xp6(6),o.Q6J("disabled",!m.newKeyForm.valid))},directives:[n.Gu,n.sr,n.wd,n.Sm,n.YG,n.gu,n.W2,e._Y,e.JL,e.sg,n.Ie,n.Q$,n.pK,n.j9,e.Fj,e.JJ,e.u,e.Q7,u.O5,n.fr,n.jY,n.Nd,n.wI],styles:[""]})}}]);