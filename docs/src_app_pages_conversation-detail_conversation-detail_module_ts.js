"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_conversation-detail_conversation-detail_module_ts"],{

/***/ 6414:
/*!*************************************************************************!*\
  !*** ./src/app/pages/conversation-detail/conversation-detail.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConversationDetailPageModule": () => (/* binding */ ConversationDetailPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 4466);
/* harmony import */ var _conversation_detail_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversation-detail.page */ 9469);







let ConversationDetailPageModule = class ConversationDetailPageModule {
};
ConversationDetailPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild([
                {
                    path: '',
                    component: _conversation_detail_page__WEBPACK_IMPORTED_MODULE_1__.ConversationDetailPage
                }
            ]),
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule
        ],
        declarations: [
            _conversation_detail_page__WEBPACK_IMPORTED_MODULE_1__.ConversationDetailPage
        ]
    })
], ConversationDetailPageModule);



/***/ }),

/***/ 9469:
/*!***********************************************************************!*\
  !*** ./src/app/pages/conversation-detail/conversation-detail.page.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConversationDetailPage": () => (/* binding */ ConversationDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _conversation_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversation-detail.page.html?ngResource */ 6056);
/* harmony import */ var _conversation_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversation-detail.page.scss?ngResource */ 1465);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 8759);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_core/services/conversation.service */ 9278);
/* harmony import */ var _core_services_key_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_core/services/key.service */ 8115);
/* harmony import */ var _core_services_contact_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_core/services/contact.service */ 8790);
/* harmony import */ var _shared_modals_message_add_message_add_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/modals/message-add/message-add.modal */ 9762);
/* harmony import */ var _shared_modals_message_share_message_share_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/modals/message-share/message-share.modal */ 4229);
/* harmony import */ var _shared_modals_message_import_message_import_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/modals/message-import/message-import.modal */ 7663);
/* harmony import */ var _core_utils_crypto_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_core/utils/crypto.utils */ 7714);
/* harmony import */ var _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_core/utils/image.utils */ 3988);















let ConversationDetailPage = class ConversationDetailPage {
    constructor(route, keyService, conversationService, contactService, modalController, routerOutlet) {
        this.route = route;
        this.keyService = keyService;
        this.conversationService = conversationService;
        this.contactService = contactService;
        this.modalController = modalController;
        this.routerOutlet = routerOutlet;
        this.name = '';
    }
    get MessageType() {
        return _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.MessageType;
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.conversation$ = this.conversationService
            .getConversation(this.id)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(c => {
            if (!c) {
                return;
            }
            this.name = c.name,
                this.loadContact(c.toKeyId);
            this.loadKey(c.fromKeyId);
        }));
    }
    ngOnDestroy() {
    }
    loadContact(id) {
        this.contact$ = this.contactService
            .getContact(id)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(c => this.contact = c));
    }
    loadKey(id) {
        this.key$ = this.keyService
            .getkey(id)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(k => this.key = k));
    }
    createMessage() {
        var _a, _b, _c, _d, _e, _f, _g;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _shared_modals_message_add_message_add_modal__WEBPACK_IMPORTED_MODULE_5__.MessageAddModal,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl,
                componentProps: {
                    fromName: (_a = this.key) === null || _a === void 0 ? void 0 : _a.name,
                    toName: (_b = this.contact) === null || _b === void 0 ? void 0 : _b.name,
                    toKey: (_c = this.contact) === null || _c === void 0 ? void 0 : _c.publicKeyImported
                }
            });
            yield modal.present();
            const result = yield modal.onDidDismiss();
            if ((_d = result === null || result === void 0 ? void 0 : result.data) === null || _d === void 0 ? void 0 : _d.image) {
                this.conversationService
                    .addMessage(this.id, {
                    type: _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.MessageType.Outgoing,
                    imageData: result.data.image,
                    emoji: (_e = result.data) === null || _e === void 0 ? void 0 : _e.emoji,
                    backgroundColor: (_f = result.data) === null || _f === void 0 ? void 0 : _f.backgroundColor,
                    dataRaw: (_g = result.data) === null || _g === void 0 ? void 0 : _g.encrypted
                });
            }
        });
    }
    importMessage() {
        var _a, _b, _c;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _shared_modals_message_import_message_import_modal__WEBPACK_IMPORTED_MODULE_7__.MessageImportModal,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl,
                componentProps: {
                    fromName: (_a = this.contact) === null || _a === void 0 ? void 0 : _a.name,
                    toName: (_b = this.key) === null || _b === void 0 ? void 0 : _b.name
                }
            });
            yield modal.present();
            const result = yield modal.onDidDismiss();
            if ((_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.image) {
                this.conversationService
                    .addMessage(this.id, {
                    type: _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.MessageType.Incoming,
                    imageData: result.data.image
                });
            }
        });
    }
    decodeMessage(message) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.contact || !this.key) {
                return;
            }
            if (message.type === _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.MessageType.Outgoing) {
                const modal = yield this.modalController
                    .create({
                    component: _shared_modals_message_share_message_share_modal__WEBPACK_IMPORTED_MODULE_6__.MessageShareModal,
                    swipeToClose: true,
                    presentingElement: this.routerOutlet.nativeEl,
                    componentProps: {
                        message,
                        conversationId: this.id
                    }
                });
                yield modal.present();
                yield modal.onDidDismiss();
                return;
            }
            const blob = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_9__.ImageUtils.read(message.imageData)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (this.key.passwordProtected && !this.key.unlocked) {
                const password = window.prompt('Enter the password for this key.');
                let result = yield this.keyService
                    .unlockKey(this.key.id, password)
                    .catch(err => {
                    console.log(err);
                    return null;
                });
                if (!result) {
                    alert(`Couldn't unlock key with the given password.`);
                    return;
                }
                this.key = result;
            }
            let result = yield this.decrypt(blob, this.key.keyPair.privateKey)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (result) {
                alert(result);
            }
            // let result = await this.decrypt(message.data, this.key.keyPair.privateKey, blob)
            // 	.catch(err => {
            // 		console.log(err);
            // 		return null;
            // 	});
            // if(result) {
            // 	alert(result);
            // }
        });
    }
    decrypt(image, privateKey) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            let unpadded = [];
            const minPx = 512;
            const nextPow = Math.max(1 << (32 - Math.clz32(Math.ceil(Math.sqrt(minPx)))), 128);
            //const density = Math.floor((minPx / (nextPow * nextPow)) * 100);
            const density = Math.floor((nextPow * nextPow) / minPx);
            for (let i = 0; i < minPx; i++) {
                unpadded.push(image[((i * density) * 4) + 3]);
            }
            // console.log('-------UNPADDED--------');
            // console.log(unpadded);
            // console.log('-------/UNPADDED--------');
            const decoded = yield _core_utils_crypto_utils__WEBPACK_IMPORTED_MODULE_8__.Crypto.decrypt(new Uint8Array(unpadded).buffer, privateKey)
                .catch(err => {
                console.log(err);
                return undefined;
            });
            return decoded;
        });
    }
    deleteMessage(id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.conversationService
                .deleteConversation(id);
        });
    }
};
ConversationDetailPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute },
    { type: _core_services_key_service__WEBPACK_IMPORTED_MODULE_3__.KeyService },
    { type: _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.ConversationService },
    { type: _core_services_contact_service__WEBPACK_IMPORTED_MODULE_4__.ContactService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonRouterOutlet }
];
ConversationDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.Component)({
        selector: 'app-conversation-detail',
        template: _conversation_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_conversation_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__metadata)("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute,
        _core_services_key_service__WEBPACK_IMPORTED_MODULE_3__.KeyService,
        _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.ConversationService,
        _core_services_contact_service__WEBPACK_IMPORTED_MODULE_4__.ContactService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.ModalController,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonRouterOutlet])
], ConversationDetailPage);



/***/ }),

/***/ 1465:
/*!************************************************************************************!*\
  !*** ./src/app/pages/conversation-detail/conversation-detail.page.scss?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = ".keys {\n  width: 100%;\n}\n\ncanvas {\n  width: 100%;\n  height: 100%;\n  border: 1px solid green;\n  image-rendering: -moz-crisp-edges;\n  image-rendering: pixelated;\n}\n\n.message-list {\n  display: flex;\n  flex-direction: column;\n}\n\n.message-list .message {\n  padding: 5px 15px;\n  flex: 1;\n  cursor: pointer;\n}\n\n.message-list .message.right {\n  align-self: flex-end;\n}\n\n.message-list .message .message-inner {\n  position: relative;\n  display: inline-block;\n}\n\n.message-list .message .message-inner img {\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.message-list .message .message-inner .icon {\n  position: absolute;\n  padding: 3px;\n  bottom: 3px;\n  right: 0px;\n  border-radius: 6px 3px 3px 6px;\n  border-top-right-radius: 0px;\n  border-bottom-left-radius: 0px;\n  overflow: hidden;\n  background: rgba(0, 0, 0, 0.65);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnZlcnNhdGlvbi1kZXRhaWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MsV0FBQTtBQUNEOztBQUVBO0VBQ0MsV0FBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGlDQUFBO0VBQUEsMEJBQUE7QUFDRDs7QUFFQTtFQUNDLGFBQUE7RUFDQSxzQkFBQTtBQUNEOztBQUFDO0VBQ0MsaUJBQUE7RUFDQSxPQUFBO0VBQ0EsZUFBQTtBQUVGOztBQURFO0VBQ0Msb0JBQUE7QUFHSDs7QUFERTtFQUNDLGtCQUFBO0VBQ0EscUJBQUE7QUFHSDs7QUFGRztFQUNDLGtCQUFBO0VBQ0EsZ0JBQUE7QUFJSjs7QUFGRztFQUNDLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsOEJBQUE7RUFDQSw0QkFBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtBQUlKIiwiZmlsZSI6ImNvbnZlcnNhdGlvbi1kZXRhaWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmtleXMge1xuXHR3aWR0aDogMTAwJTtcbn1cblxuY2FudmFzIHtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogMTAwJTtcblx0Ym9yZGVyOiAxcHggc29saWQgZ3JlZW47XG5cdGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xufVxuXG4ubWVzc2FnZS1saXN0IHtcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0Lm1lc3NhZ2Uge1xuXHRcdHBhZGRpbmc6IDVweCAxNXB4O1xuXHRcdGZsZXg6IDE7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdCYucmlnaHQge1xuXHRcdFx0YWxpZ24tc2VsZjogZmxleC1lbmQ7XG5cdFx0fVxuXHRcdC5tZXNzYWdlLWlubmVyIHtcblx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdGltZyB7XG5cdFx0XHRcdGJvcmRlci1yYWRpdXM6IDNweDtcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRcdH1cblx0XHRcdC5pY29uIHtcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdFx0XHRwYWRkaW5nOiAzcHg7XG5cdFx0XHRcdGJvdHRvbTogM3B4O1xuXHRcdFx0XHRyaWdodDogMHB4O1xuXHRcdFx0XHRib3JkZXItcmFkaXVzOiA2cHggM3B4IDNweCA2cHg7XG5cdFx0XHRcdGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwcHg7XG5cdFx0XHRcdGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDBweDtcblx0XHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRcdFx0YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuNjUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fVxufSJdfQ== */";

/***/ }),

/***/ 6056:
/*!************************************************************************************!*\
  !*** ./src/app/pages/conversation-detail/conversation-detail.page.html?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = "<ng-container *ngIf=\"{\n\tconversation: conversation$ | async,\n\tcontact: contact$ | async,\n\tkey: key$ | async\n} as data\">\n\t<ion-header translucent=\"true\">\n\t\t<ion-toolbar color=\"primary\">\n\t\t\t<ion-buttons slot=\"start\">\n\t\t\t\t<ion-back-button></ion-back-button>\n\t\t\t</ion-buttons>\n\t\t\t<!-- <ion-buttons slot=\"start\">\n\t\t\t\t<ion-menu-button color=\"dark\"></ion-menu-button>\n\t\t\t</ion-buttons> -->\n\t\t\t<ion-title>\n\t\t\t\t{{name}}\n\t\t\t</ion-title>\n\t\t</ion-toolbar>\n\t</ion-header>\n\t<ion-content>\n\t\t<div class=\"message-list\">\n\t\t\t<div \n\t\t\t\t*ngFor=\"let message of data.conversation.messages\"\n\t\t\t\t[class.right]=\"message.type === MessageType.Outgoing\"\n\t\t\t\tclass=\"message\"\n\t\t\t\t(click)=\"decodeMessage(message)\"\n\t\t\t>\n\t\t\t\t<div class=\"message-inner\">\n\t\t\t\t\t<img [src]=\"message.imageData\" *ngIf=\"!message.dataRaw\">\n\t\t\t\t\t<app-encoded-image\n\t\t\t\t\t\t*ngIf=\"message.dataRaw\"\n\t\t\t\t\t\t[emoji]=\"message.emoji\"\n\t\t\t\t\t\t[backgroundColor]=\"message.backgroundColor\"\n\t\t\t\t\t\t[dataRaw]=\"message.dataRaw\"\n\t\t\t\t\t></app-encoded-image>\n\t\t\t\t\t<div class=\"icon\">\n\t\t\t\t\t\t<ion-icon name=\"share-outline\" *ngIf=\"message.type === MessageType.Outgoing\"></ion-icon>\n\t\t\t\t\t\t<ion-icon name=\"expand-outline\" *ngIf=\"message.type === MessageType.Incoming\"></ion-icon>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"!data.conversation.messages?.length\">\n\t\t\t\tNo messages in this conversation yet.\n\t\t\t</div>\n\t\t</div>\n\t</ion-content>\n\t<ion-footer>\n\t\t<ion-toolbar>\n\t\t\t<ion-button (click)=\"importMessage()\" expand=\"block\" [disabled]=\"!key || !contact\">\n\t\t\t\t<ion-icon name=\"add-circle-outline\" slot=\"start\"></ion-icon>\n\t\t\t\t<ion-label>Import Message</ion-label>\n\t\t\t</ion-button>\n\t\t\t<ion-button (click)=\"createMessage()\" expand=\"block\" [disabled]=\"!key || !contact\">\n\t\t\t\t<ion-icon name=\"add-circle-outline\" slot=\"start\"></ion-icon>\n\t\t\t\t<ion-label>Create New Message</ion-label>\n\t\t\t</ion-button>\n\t\t</ion-toolbar>\n\t</ion-footer>\n</ng-container>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_conversation-detail_conversation-detail_module_ts.js.map