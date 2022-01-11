"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_keys_keys_module_ts"],{

/***/ 1391:
/*!*******************************************!*\
  !*** ./src/app/pages/keys/keys.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeysPageModule": () => (/* binding */ KeysPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 4466);
/* harmony import */ var _keys_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.page */ 6611);







let KeysPageModule = class KeysPageModule {
};
KeysPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild([
                {
                    path: '',
                    component: _keys_page__WEBPACK_IMPORTED_MODULE_1__.KeysPage,
                },
            ]),
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule
        ],
        declarations: [_keys_page__WEBPACK_IMPORTED_MODULE_1__.KeysPage]
    })
], KeysPageModule);



/***/ }),

/***/ 6611:
/*!*****************************************!*\
  !*** ./src/app/pages/keys/keys.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeysPage": () => (/* binding */ KeysPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _keys_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys.page.html?ngResource */ 1537);
/* harmony import */ var _keys_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.page.scss?ngResource */ 9201);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var _shared_modals_key_add_key_add_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/modals/key-add/key-add.modal */ 5340);
/* harmony import */ var _shared_modals_key_share_key_share_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/modals/key-share/key-share.modal */ 2844);
/* harmony import */ var _core_services_key_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_core/services/key.service */ 8115);









let KeysPage = class KeysPage {
    constructor(keyService, modalController, toastController, routerOutlet) {
        this.keyService = keyService;
        this.modalController = modalController;
        this.toastController = toastController;
        this.routerOutlet = routerOutlet;
        this.keys$ = this.keyService
            .keys$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(arr => arr.sort((a, b) => a.created - b.created)));
    }
    ngOnDestroy() {
    }
    generateKey() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _shared_modals_key_add_key_add_modal__WEBPACK_IMPORTED_MODULE_2__.KeyAddModal,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl
            });
            yield modal.present();
        });
    }
    unlockKey(id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const password = window.prompt('Enter the password for this key.');
            let result = yield this.keyService
                .unlockKey(id, password)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!result) {
                alert(`Couldn't unlock key with the given password.`);
            }
        });
    }
    showPublicKey(key) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            let clipboardErr;
            yield navigator.clipboard
                .writeText(key)
                .catch(err => {
                console.log(err);
                clipboardErr = err;
                return null;
            });
            alert(key);
            if (!clipboardErr) {
                const toast = yield this.toastController
                    .create({
                    message: 'Public key copied to clipboard.',
                    duration: 2000
                });
                toast.present();
            }
        });
    }
    shareKey(key) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _shared_modals_key_share_key_share_modal__WEBPACK_IMPORTED_MODULE_3__.KeyShareModal,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl,
                componentProps: {
                    key
                }
            });
            yield modal.present();
        });
    }
    deleteKey(id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable.`);
            if (confirmed) {
                this.keyService.removeKey(id);
            }
        });
    }
};
KeysPage.ctorParameters = () => [
    { type: _core_services_key_service__WEBPACK_IMPORTED_MODULE_4__.KeyService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ToastController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRouterOutlet }
];
KeysPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-keys',
        template: _keys_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_keys_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__metadata)("design:paramtypes", [_core_services_key_service__WEBPACK_IMPORTED_MODULE_4__.KeyService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ToastController,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRouterOutlet])
], KeysPage);



/***/ }),

/***/ 9201:
/*!******************************************************!*\
  !*** ./src/app/pages/keys/keys.page.scss?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = ".key-list .key {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.key-fallback {\n  margin: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNDO0VBQ0MsV0FBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBQUY7O0FBSUE7RUFDQyxZQUFBO0FBREQiLCJmaWxlIjoia2V5cy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIua2V5LWxpc3Qge1xyXG5cdC5rZXkge1xyXG5cdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRkaXNwbGF5OiBmbGV4O1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHR9XHJcbn1cclxuXHJcbi5rZXktZmFsbGJhY2sge1xyXG5cdG1hcmdpbjogMTBweDtcclxufSJdfQ== */";

/***/ }),

/***/ 1537:
/*!******************************************************!*\
  !*** ./src/app/pages/keys/keys.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "<ion-header translucent=\"true\">\n\t<ion-toolbar color=\"primary\">\n\t\t<!-- <ion-buttons slot=\"start\">\n\t\t\t<ion-menu-button color=\"dark\"></ion-menu-button>\n\t\t</ion-buttons> -->\n\t\t<ion-title>\n\t\t\tEncryption Keys\n\t\t</ion-title>\n\t</ion-toolbar>\n</ion-header>\n<ion-content>\n\t<div class=\"keys\" *ngIf=\"(keys$ | async) as keys\">\n\t\t<ion-list class=\"key-list\">\n\t\t\t<ion-item *ngFor=\"let key of keys\">\n\t\t\t\t<div class=\"key\">\n\t\t\t\t\t<div class=\"key-name\">\n\t\t\t\t\t\t<ion-icon *ngIf=\"key.unlocked\" name=\"lock-open-outline\"></ion-icon>\n\t\t\t\t\t\t<ion-icon *ngIf=\"!key.unlocked\" name=\"lock-closed-outline\"></ion-icon>\n\t\t\t\t\t\t{{key.name}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"buttons\">\n\t\t\t\t\t\t<ion-button (click)=\"unlockKey(key.id)\" *ngIf=\"!key.unlocked\">\n\t\t\t\t\t\t\t<ion-icon name=\"lock-open-outline\"></ion-icon>\n\t\t\t\t\t\t</ion-button>\n\t\t\t\t\t\t<ion-button (click)=\"shareKey(key.publicKey)\">\n\t\t\t\t\t\t\t<ion-icon name=\"share-outline\"></ion-icon>\n\t\t\t\t\t\t</ion-button>\n\t\t\t\t\t\t<ion-button (click)=\"deleteKey(key.id)\">\n\t\t\t\t\t\t\t<ion-icon name=\"trash-outline\"></ion-icon>\n\t\t\t\t\t\t</ion-button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</ion-item>\n\t\t</ion-list>\n\t\t<div class=\"key-fallback\" *ngIf=\"!keys.length\">\n\t\t\t<h2>No Keys</h2>\n\t\t\t<p>\n\t\t\t\tKeys are used to encrypt and and decrypt messages. <br>\n\t\t\t\tWhen a new key is added, two elements are created:\n\t\t\t</p>\n\t\t\t<h3>Private Key</h3>\n\t\t\t<p>\n\t\t\t\tA secret key that, as the name suggests, is never shared with anyone. Used to decrypt messages. <br>\n\t\t\t\tFor extra security, this can be protected with a password when a key is created. <br>\n\t\t\t\tIf a key is password protected, it will have to be unlocked before decrypting anything. <br>\n\t\t\t\tDon't forget or lose the password, it is not recoverable.\n\t\t\t</p>\n\t\t\t<h3>Public Key</h3>\n\t\t\t<p>\n\t\t\t\tA key that is shared with anybody that needs to send you messages. <br>\n\t\t\t\tThis can be shared via plain text or QR code.\n\t\t\t</p>\n\t\t</div>\n\t</div>\n</ion-content>\n<ion-footer>\n\t<ion-toolbar>\n\t\t<ion-button (click)=\"generateKey()\" expand=\"block\">\n\t\t\t<ion-icon name=\"add-circle-outline\" slot=\"start\"></ion-icon>\n\t\t\t<ion-label>Generate New Key</ion-label>\n\t\t</ion-button>\n\t</ion-toolbar>\n</ion-footer>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_keys_keys_module_ts.js.map