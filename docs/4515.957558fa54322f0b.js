"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4515],{4515:(J,m,s)=>{s.r(m),s.d(m,{KeysPageModule:()=>l});var u=s(9808),p=s(4030),Z=s(4182),f=s(4466),r=s(655),h=s(4850),v=s(5340),k=s(3988),T=s(9278),x=s(3259),e=s(9863),n=s(5362);function A(i,o){if(1&i&&(e.TgZ(0,"ion-item"),e._UZ(1,"img",12),e.qZA()),2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("src",t.imageData,e.LSH)}}function b(i,o){if(1&i&&(e.TgZ(0,"div",9),e.YNc(1,A,2,1,"ion-item",10),e.TgZ(2,"ion-item"),e._UZ(3,"ion-textarea",11),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.imageData),e.xp6(2),e.Q6J("value",t.key)}}function K(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"ion-button",6),e.NdJ("click",function(){return e.CHM(t),e.oxw().shareQR()}),e._UZ(1,"ion-icon",13),e.TgZ(2,"ion-label"),e._uU(3,"Share QR Code"),e.qZA(),e.qZA()}}class g{constructor(o,t,a){this.modalController=o,this.conversationService=t,this.toastController=a}ngOnInit(){return(0,r.mG)(this,void 0,void 0,function*(){let o=yield x.toDataURL([{data:this.key}],{errorCorrectionLevel:"H"}).catch(t=>(console.log(t),null));o?this.imageData=o:(yield this.toastController.create({message:"Error generating QR code.",duration:2e3})).present()})}copy(){return(0,r.mG)(this,void 0,void 0,function*(){let o;yield navigator.clipboard.writeText(this.key).catch(t=>(console.log(t),o=t,null)),o||(yield this.toastController.create({message:"Public key copied to clipboard.",duration:2e3})).present()})}shareQR(){return(0,r.mG)(this,void 0,void 0,function*(){navigator.share?navigator.share({files:[new File([k.Pp.base64ToBlob(this.imageData)],`encrypted-message-${Date.now()}.png`,{type:"image/png"})]}):window.open(this.imageData,"_blank")})}dismiss(){this.modalController.dismiss()}}g.\u0275fac=function(o){return new(o||g)(e.Y36(n.IN),e.Y36(T.EA),e.Y36(n.yF))},g.\u0275cmp=e.Xpm({type:g,selectors:[["app-key-share"]],inputs:{key:"key"},decls:20,vars:2,consts:[["translucent","true"],["color","primary"],["slot","primary"],[3,"click"],["slot","icon-only","name","close"],["class","key",4,"ngIf"],["expand","block",3,"click"],["name","clipboard-outline","slot","start"],["expand","block",3,"click",4,"ngIf"],[1,"key"],[4,"ngIf"],["auto-grow","",3,"value"],[3,"src"],["name","qr-code-outline","slot","start"]],template:function(o,t){1&o&&(e.TgZ(0,"ion-header",0),e.TgZ(1,"ion-toolbar",1),e.TgZ(2,"ion-title"),e._uU(3," Share Public Key "),e.qZA(),e.TgZ(4,"ion-buttons",2),e.TgZ(5,"ion-button",3),e.NdJ("click",function(){return t.dismiss()}),e._UZ(6,"ion-icon",4),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(7,"ion-content"),e.YNc(8,b,4,2,"div",5),e.qZA(),e.TgZ(9,"ion-footer"),e.TgZ(10,"ion-toolbar"),e.TgZ(11,"ion-grid"),e.TgZ(12,"ion-row"),e.TgZ(13,"ion-col"),e.TgZ(14,"ion-button",6),e.NdJ("click",function(){return t.copy()}),e._UZ(15,"ion-icon",7),e.TgZ(16,"ion-label"),e._uU(17,"Copy Text"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(18,"ion-col"),e.YNc(19,K,4,0,"ion-button",8),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&o&&(e.xp6(8),e.Q6J("ngIf",t.key),e.xp6(11),e.Q6J("ngIf",t.imageData))},directives:[n.Gu,n.sr,n.wd,n.Sm,n.YG,n.gu,n.W2,u.O5,n.fr,n.jY,n.Nd,n.wI,n.Q$,n.Ie,n.g2,n.j9],styles:[""]});var w=s(8115);function q(i,o){1&i&&e._UZ(0,"ion-icon",20)}function C(i,o){1&i&&e._UZ(0,"ion-icon",21)}function P(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"ion-button",16),e.NdJ("click",function(){e.CHM(t);const c=e.oxw().$implicit;return e.oxw(3).unlockKey(c.id)}),e._UZ(1,"ion-icon",20),e.qZA()}}function I(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"ion-item"),e.TgZ(1,"div",10),e.TgZ(2,"div",11),e.YNc(3,q,1,0,"ion-icon",12),e.YNc(4,C,1,0,"ion-icon",13),e._uU(5),e.qZA(),e.TgZ(6,"div",14),e.YNc(7,P,2,0,"ion-button",15),e.TgZ(8,"ion-button",16),e.NdJ("click",function(){const d=e.CHM(t).$implicit;return e.oxw(3).shareKey(d.publicKey)}),e._UZ(9,"ion-icon",17),e.qZA(),e.TgZ(10,"ion-button",18),e.NdJ("click",function(){const d=e.CHM(t).$implicit;return e.oxw(3).deleteKey(d.id)}),e._UZ(11,"ion-icon",19),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&i){const t=o.$implicit;e.xp6(3),e.Q6J("ngIf",t.unlocked),e.xp6(1),e.Q6J("ngIf",!t.unlocked),e.xp6(1),e.hij(" ",t.name," "),e.xp6(2),e.Q6J("ngIf",!t.unlocked)}}function U(i,o){if(1&i&&(e.TgZ(0,"ion-list",8),e.YNc(1,I,12,4,"ion-item",9),e.qZA()),2&i){const t=e.oxw().ngIf;e.xp6(1),e.Q6J("ngForOf",t)}}function M(i,o){1&i&&(e.TgZ(0,"div",22),e.TgZ(1,"h2"),e._uU(2,"No Keys"),e.qZA(),e.TgZ(3,"p"),e._uU(4," Keys are used to encrypt and and decrypt messages. You can share any of your keys with any of your contacts. When a new key is added, two elements are created: "),e.qZA(),e.TgZ(5,"h3"),e._uU(6,"Private Key"),e.qZA(),e.TgZ(7,"p"),e._uU(8," A secret key that, as the name suggests, is never shared with anyone. Used to decrypt messages. For extra security, this can be protected with a password when a key is created. If a key is password protected, it will have to be unlocked before decrypting anything. Don't forget or lose the password, it is not recoverable. "),e.qZA(),e.TgZ(9,"h3"),e._uU(10,"Public Key"),e.qZA(),e.TgZ(11,"p"),e._uU(12," A key that is shared with anybody that needs to send you messages. This can be shared via plain text or QR code. "),e.qZA(),e.qZA())}function N(i,o){if(1&i&&(e.TgZ(0,"div",5),e.YNc(1,U,2,1,"ion-list",6),e.YNc(2,M,13,0,"div",7),e.qZA()),2&i){const t=o.ngIf;e.xp6(1),e.Q6J("ngIf",t.length),e.xp6(1),e.Q6J("ngIf",!t.length)}}class y{constructor(o,t,a,c){this.keyService=o,this.modalController=t,this.toastController=a,this.routerOutlet=c,this.keys$=this.keyService.keys$.pipe((0,h.U)(d=>d.sort((_,Y)=>_.created-Y.created)))}ngOnDestroy(){}generateKey(){return(0,r.mG)(this,void 0,void 0,function*(){yield(yield this.modalController.create({component:v.K,swipeToClose:!0,presentingElement:this.routerOutlet.nativeEl})).present()})}unlockKey(o){return(0,r.mG)(this,void 0,void 0,function*(){const t=window.prompt("Enter the password for this key.");(yield this.keyService.unlockKey(o,t).catch(c=>(console.log(c),null)))||alert("Couldn't unlock key with the given password.")})}showPublicKey(o){return(0,r.mG)(this,void 0,void 0,function*(){let t;yield navigator.clipboard.writeText(o).catch(a=>(console.log(a),t=a,null)),alert(o),t||(yield this.toastController.create({message:"Public key copied to clipboard.",duration:2e3})).present()})}shareKey(o){return(0,r.mG)(this,void 0,void 0,function*(){yield(yield this.modalController.create({component:g,swipeToClose:!0,presentingElement:this.routerOutlet.nativeEl,componentProps:{key:o}})).present()})}deleteKey(o){return(0,r.mG)(this,void 0,void 0,function*(){window.confirm("Are you absolutely sure? This is unrecoverable without a backup.")&&this.keyService.removeKey(o)})}}y.\u0275fac=function(o){return new(o||y)(e.Y36(w.BA),e.Y36(n.IN),e.Y36(n.yF),e.Y36(n.jP))},y.\u0275cmp=e.Xpm({type:y,selectors:[["app-keys"]],decls:16,vars:3,consts:[["translucent","true"],["color","primary"],["class","keys",4,"ngIf"],["expand","block",3,"click"],["name","repeat-outline","slot","start"],[1,"keys"],["class","key-list",4,"ngIf"],["class","key-fallback",4,"ngIf"],[1,"key-list"],[4,"ngFor","ngForOf"],[1,"key"],[1,"key-name"],["name","lock-open-outline",4,"ngIf"],["name","lock-closed-outline",4,"ngIf"],[1,"buttons"],[3,"click",4,"ngIf"],[3,"click"],["name","share-outline"],["color","danger",3,"click"],["name","trash-outline"],["name","lock-open-outline"],["name","lock-closed-outline"],[1,"key-fallback"]],template:function(o,t){1&o&&(e.TgZ(0,"ion-header",0),e.TgZ(1,"ion-toolbar",1),e.TgZ(2,"ion-title"),e._uU(3," Encryption Keys "),e.qZA(),e.qZA(),e.qZA(),e.TgZ(4,"ion-content"),e.YNc(5,N,3,2,"div",2),e.ALo(6,"async"),e.qZA(),e.TgZ(7,"ion-footer"),e.TgZ(8,"ion-toolbar"),e.TgZ(9,"ion-grid"),e.TgZ(10,"ion-row"),e.TgZ(11,"ion-col"),e.TgZ(12,"ion-button",3),e.NdJ("click",function(){return t.generateKey()}),e._UZ(13,"ion-icon",4),e.TgZ(14,"ion-label"),e._uU(15,"Generate New Key"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&o&&(e.xp6(5),e.Q6J("ngIf",e.lcZ(6,1,t.keys$)))},directives:[n.Gu,n.sr,n.wd,n.W2,u.O5,n.fr,n.jY,n.Nd,n.wI,n.YG,n.gu,n.Q$,n.q_,u.sg,n.Ie],pipes:[u.Ov],styles:[".keys[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;align-items:center}.keys[_ngcontent-%COMP%]   .key-list[_ngcontent-%COMP%]{width:100%}.keys[_ngcontent-%COMP%]   .key-list[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;align-items:center}.keys[_ngcontent-%COMP%]   .key-fallback[_ngcontent-%COMP%]{margin:10px;max-width:400px}"]});class l{}l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[[u.ez,p.Bz.forChild([{path:"",component:y}]),Z.UX,f.m]]})}}]);