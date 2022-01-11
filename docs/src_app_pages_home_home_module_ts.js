"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_home_home_module_ts"],{

/***/ 7994:
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 4466);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page */ 678);







let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild([
                {
                    path: '',
                    component: _home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage
                }
            ]),
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule
        ],
        declarations: [
            _home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage
        ]
    })
], HomePageModule);



/***/ }),

/***/ 678:
/*!*****************************************!*\
  !*** ./src/app/pages/home/home.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page.html?ngResource */ 8380);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss?ngResource */ 2260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 8759);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_core/services/conversation.service */ 9278);
/* harmony import */ var _core_services_key_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_core/services/key.service */ 8115);
/* harmony import */ var _core_services_contact_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_core/services/contact.service */ 8790);
/* harmony import */ var _shared_modals_conversation_add_conversation_add_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/modals/conversation-add/conversation-add.modal */ 7855);










let HomePage = class HomePage {
    constructor(keyService, conversationService, contactService, modalController, routerOutlet) {
        this.keyService = keyService;
        this.conversationService = conversationService;
        this.contactService = contactService;
        this.modalController = modalController;
        this.routerOutlet = routerOutlet;
        this.contacts$ = this.contactService
            .contacts$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(arr => arr.sort((a, b) => a.created - b.created)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(contacts => this.contacts = contacts));
        this.keys$ = this.keyService
            .keys$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(arr => arr.sort((a, b) => a.created - b.created)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(keys => this.keys = keys));
        this.conversations$ = this.conversationService
            .conversations$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(arr => arr.sort((a, b) => a.created - b.created)));
        this.keys = [];
        this.contacts = [];
    }
    addConversation() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _shared_modals_conversation_add_conversation_add_modal__WEBPACK_IMPORTED_MODULE_5__.ConversationAddModal,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl
            });
            yield modal.present();
        });
    }
    deleteConversation(id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable.`);
            if (confirmed) {
                this.conversationService
                    .deleteConversation(id);
            }
        });
    }
};
HomePage.ctorParameters = () => [
    { type: _core_services_key_service__WEBPACK_IMPORTED_MODULE_3__.KeyService },
    { type: _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.ConversationService },
    { type: _core_services_contact_service__WEBPACK_IMPORTED_MODULE_4__.ContactService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRouterOutlet }
];
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-home',
        template: _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:paramtypes", [_core_services_key_service__WEBPACK_IMPORTED_MODULE_3__.KeyService,
        _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.ConversationService,
        _core_services_contact_service__WEBPACK_IMPORTED_MODULE_4__.ContactService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRouterOutlet])
], HomePage);



/***/ }),

/***/ 2260:
/*!******************************************************!*\
  !*** ./src/app/pages/home/home.page.scss?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = ".conversation-item {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.conversation-item .conversation-name {\n  flex: 1;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  cursor: pointer;\n}\n.conversation-fallback {\n  margin: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MsV0FBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBQ0Q7QUFBQztFQUNDLE9BQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtBQUVGO0FBQ0E7RUFDQyxZQUFBO0FBRUQiLCJmaWxlIjoiaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udmVyc2F0aW9uLWl0ZW0ge1xuXHR3aWR0aDogMTAwJTtcblx0ZGlzcGxheTogZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHQuY29udmVyc2F0aW9uLW5hbWUge1xuXHRcdGZsZXg6IDE7XG5cdFx0cGFkZGluZy10b3A6IDEwcHg7XG5cdFx0cGFkZGluZy1ib3R0b206IDEwcHg7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHR9XG59XG4uY29udmVyc2F0aW9uLWZhbGxiYWNrIHtcblx0bWFyZ2luOiAxMHB4O1xufSJdfQ== */";

/***/ }),

/***/ 8380:
/*!******************************************************!*\
  !*** ./src/app/pages/home/home.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "<ion-header translucent=\"true\">\n\t<ion-toolbar color=\"primary\">\n\t\t<!-- <ion-buttons slot=\"start\">\n\t\t\t<ion-menu-button color=\"dark\"></ion-menu-button>\n\t\t</ion-buttons> -->\n\t\t<ion-title>\n\t\t\tConversations\n\t\t</ion-title>\n\t</ion-toolbar>\n</ion-header>\n<ion-content>\n\t<div class=\"conversations\" *ngIf=\"(conversations$ | async) as conversations\">\n\t\t<ion-list class=\"conversation-list\">\n\t\t\t<ion-item *ngFor=\"let conversation of conversations\">\n\t\t\t\t<div class=\"conversation-item\">\n\t\t\t\t\t<div class=\"conversation-name\" [routerLink]=\"['/conversations', conversation.id]\">\n\t\t\t\t\t\t{{ conversation.name }}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"buttons\">\n\t\t\t\t\t\t<ion-button (click)=\"deleteConversation(conversation.id)\"><ion-icon name=\"trash-outline\"></ion-icon></ion-button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</ion-item>\n\t\t</ion-list>\n\t\t<div class=\"conversation-fallback\" *ngIf=\"!conversations.length\">\n\t\t\t<h2>No Conversations</h2>\n\t\t\t<p>\n\t\t\t\tConversations store encrypted exchanges between \n\t\t\t\tyour contacts and any of your keys.\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\tTo get started, you'll want to make sure you've \n\t\t\t\tgenerated at least one key, and shared it with anyone \n\t\t\t\tyou want to exchange messages with.\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\tIf you haven't generated any keys:<br>\n\t\t\t\t<ion-button [routerLink]=\"['/keys']\">Generate Keys</ion-button>\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\tIf you haven't added any contacts:<br>\n\t\t\t\t<ion-button [routerLink]=\"['/contacts']\">Add Contacts</ion-button>\n\t\t\t</p>\n\t\t</div>\n\t</div>\n</ion-content>\n<ion-footer>\n\t<ion-toolbar>\n\t\t<ion-button (click)=\"addConversation()\" expand=\"block\">\n\t\t\t<ion-icon name=\"add-circle-outline\" slot=\"start\"></ion-icon>\n\t\t\t<ion-label>Start New Conversation</ion-label>\n\t\t</ion-button>\n\t</ion-toolbar>\n</ion-footer>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_home_home_module_ts.js.map