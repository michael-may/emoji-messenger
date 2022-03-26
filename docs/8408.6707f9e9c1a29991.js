"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8408],{8408:(q,y,a)=>{a.r(y),a.d(y,{SettingsPageModule:()=>d});var Z=a(9808),k=a(4030),A=a(4182),w=a(4466),p=a(655),_=a(8790),I=a(9278),P=a(8115),S=a(7714),t=a(9863),n=a(5362);function C(l,o){1&l&&t._UZ(0,"ion-spinner",9)}function F(l,o){1&l&&t._UZ(0,"ion-icon",10)}function U(l,o){if(1&l){const e=t.EpF();t.TgZ(0,"ion-button",11),t.NdJ("click",function(){return t.CHM(e),t.MAs(5).click()}),t._UZ(1,"ion-icon",12),t.TgZ(2,"ion-label"),t._uU(3,"Select File"),t.qZA(),t.TgZ(4,"input",13,14),t.NdJ("change",function(s){return t.CHM(e),t.oxw().import(s)}),t.qZA(),t.qZA()}}function B(l,o){1&l&&t._UZ(0,"ion-spinner",15)}class u{constructor(o,e,i,s){this.keyService=o,this.contactService=e,this.conversationService=i,this.toastController=s,this.processingBackup=!1,this.processingFile=!1}ngOnDestroy(){}export(){var o,e,i;return(0,p.mG)(this,void 0,void 0,function*(){this.processingBackup=!0;const s=window.prompt("Enter a password for this backup (or leave blank).");let g=null!==(o=localStorage.getItem("encryptionKeys"))&&void 0!==o?o:"",f=null!==(e=localStorage.getItem("contacts"))&&void 0!==e?e:"",v=null!==(i=localStorage.getItem("conversations"))&&void 0!==i?i:"";const h=JSON.stringify({encryptionKeys:g,contacts:f,conversations:v}),c=yield S.w.passwordEncrypt(h,s).catch(b=>(console.log(b),null));if(!c)return(yield this.toastController.create({message:"Error encrypting backup.",duration:2e3})).present(),void(this.processingBackup=!1);const T=new Blob([c],{type:"application/messengerbackup"}),r=URL.createObjectURL(T);this.processingBackup=!1;var m=document.createElement("a");m.href=r,m.download=`${Date.now()}.messengerbackup`,m.click()})}import(o){var e,i,s;return(0,p.mG)(this,void 0,void 0,function*(){if(!(null===(e=o.target.files)||void 0===e?void 0:e.length))return;this.processingFile=!0;let g=null===(s=null===(i=null==o?void 0:o.target)||void 0===i?void 0:i.files)||void 0===s?void 0:s[0];if(!g)return(yield this.toastController.create({message:"Error loading file.",duration:2e3})).present(),void(this.processingFile=!1);const f=yield this.loadFile(g).catch(r=>(console.log(r),null));if(!f)return(yield this.toastController.create({message:"Error parsing file.",duration:2e3})).present(),void(this.processingFile=!1);const v=window.prompt("Enter the password for this backup (or leave blank if none)."),h=yield S.w.passwordDecrypt(f,v).catch(r=>(console.log(r),null));if(!h)return(yield this.toastController.create({message:"Error decrypting backup. Maybe wrong password?",duration:2e3})).present(),void(this.processingFile=!1);let c;try{c=JSON.parse(h)}catch(r){return(yield this.toastController.create({message:"Error parsing backup. Probably corrupted.",duration:2e3})).present(),void(this.processingFile=!1)}c.encryptionKeys&&(localStorage.setItem("encryptionKeys",c.encryptionKeys),yield this.keyService.loadKeys().catch(r=>{console.log(r)})),c.contacts&&(localStorage.setItem("contacts",c.contacts),yield this.contactService.loadContacts().catch(r=>{console.log(r)})),c.conversations&&(localStorage.setItem("conversations",c.conversations),yield this.conversationService.loadConversations().catch(r=>{console.log(r)})),this.processingFile=!1,(yield this.toastController.create({message:"Import complete!",duration:2e3})).present()})}deleteData(){return(0,p.mG)(this,void 0,void 0,function*(){window.confirm("Are you absolutely sure? This is unrecoverable without a backup.")&&(localStorage.clear(),yield this.keyService.loadKeys().catch(e=>{console.log(e)}),yield this.contactService.loadContacts().catch(e=>{console.log(e)}),yield this.conversationService.loadConversations().catch(e=>{console.log(e)}))})}loadFile(o){return(0,p.mG)(this,void 0,void 0,function*(){return new Promise((e,i)=>{const s=new FileReader;s.onloadend=()=>e(s.result),s.onerror=g=>i(g),s.readAsText(o)})})}}u.\u0275fac=function(o){return new(o||u)(t.Y36(P.BA),t.Y36(_.yq),t.Y36(I.EA),t.Y36(n.yF))},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-settings"]],decls:33,vars:5,consts:[["translucent","true"],["color","primary"],[3,"disabled","click"],["slot","start",4,"ngIf"],["name","download-outline","slot","start",4,"ngIf"],[3,"click",4,"ngIf"],["slot","end",4,"ngIf"],["color","danger",3,"click"],["name","trash-outline","slot","start"],["slot","start"],["name","download-outline","slot","start"],[3,"click"],["slot","start","name","folder-outline"],["type","file","accept",".messengerbackup","slot","end",1,"ion-hide",3,"change"],["input",""],["slot","end"]],template:function(o,e){1&o&&(t.TgZ(0,"ion-header",0),t.TgZ(1,"ion-toolbar",1),t.TgZ(2,"ion-title"),t._uU(3," Settings "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(4,"ion-content"),t.TgZ(5,"ion-list"),t.TgZ(6,"ion-list-header"),t._uU(7," Your Data "),t.qZA(),t.TgZ(8,"ion-item"),t.TgZ(9,"ion-label"),t._uU(10," Export: "),t.qZA(),t.TgZ(11,"ion-button",2),t.NdJ("click",function(){return e.export()}),t.YNc(12,C,1,0,"ion-spinner",3),t.YNc(13,F,1,0,"ion-icon",4),t.TgZ(14,"ion-label"),t._uU(15,"Download"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(16,"ion-item"),t.TgZ(17,"ion-label"),t._uU(18," Import Backup: "),t.qZA(),t.YNc(19,U,6,0,"ion-button",5),t.YNc(20,B,1,0,"ion-spinner",6),t.qZA(),t.TgZ(21,"ion-item"),t.TgZ(22,"ion-label"),t._uU(23," Delete: "),t.qZA(),t.TgZ(24,"ion-button",7),t.NdJ("click",function(){return e.deleteData()}),t._UZ(25,"ion-icon",8),t.TgZ(26,"ion-label"),t._uU(27,"Delete All Data"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(28,"ion-footer"),t.TgZ(29,"ion-toolbar"),t.TgZ(30,"ion-grid"),t.TgZ(31,"ion-row"),t._UZ(32,"ion-col"),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&o&&(t.xp6(11),t.Q6J("disabled",e.processingBackup),t.xp6(1),t.Q6J("ngIf",e.processingBackup),t.xp6(1),t.Q6J("ngIf",!e.processingBackup),t.xp6(6),t.Q6J("ngIf",!e.processingFile),t.xp6(1),t.Q6J("ngIf",e.processingFile))},directives:[n.Gu,n.sr,n.wd,n.W2,n.q_,n.yh,n.Ie,n.Q$,n.YG,Z.O5,n.gu,n.fr,n.jY,n.Nd,n.wI,n.PQ],styles:[".full-width[_ngcontent-%COMP%]{width:100%}"]});class d{}d.\u0275fac=function(o){return new(o||d)},d.\u0275mod=t.oAB({type:d}),d.\u0275inj=t.cJS({imports:[[Z.ez,k.Bz.forChild([{path:"",component:u}]),A.UX,w.m]]})}}]);