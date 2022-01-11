"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_contacts_contacts_module_ts"],{

/***/ 464:
/*!***************************************************!*\
  !*** ./src/app/pages/contacts/contacts.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactsPageModule": () => (/* binding */ ContactsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 4466);
/* harmony import */ var _contacts_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contacts.page */ 7419);







let ContactsPageModule = class ContactsPageModule {
};
ContactsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild([
                {
                    path: '',
                    component: _contacts_page__WEBPACK_IMPORTED_MODULE_1__.ContactsPage,
                }
            ]),
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule
        ],
        declarations: [_contacts_page__WEBPACK_IMPORTED_MODULE_1__.ContactsPage]
    })
], ContactsPageModule);



/***/ }),

/***/ 7419:
/*!*************************************************!*\
  !*** ./src/app/pages/contacts/contacts.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactsPage": () => (/* binding */ ContactsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _contacts_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contacts.page.html?ngResource */ 8788);
/* harmony import */ var _contacts_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contacts.page.scss?ngResource */ 9884);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var src_app_shared_modals_contact_add_contact_add_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/modals/contact-add/contact-add.modal */ 6817);
/* harmony import */ var _core_services_contact_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_core/services/contact.service */ 8790);








let ContactsPage = class ContactsPage {
    constructor(contactService, modalController, routerOutlet) {
        this.contactService = contactService;
        this.modalController = modalController;
        this.routerOutlet = routerOutlet;
        this.contacts$ = this.contactService
            .contacts$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(arr => arr.sort((a, b) => a.created - b.created)));
    }
    ngOnDestroy() {
    }
    addContact() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: src_app_shared_modals_contact_add_contact_add_modal__WEBPACK_IMPORTED_MODULE_2__.ContactAddModal,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl
            });
            yield modal.present();
        });
    }
    showPublicKey(key) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            alert(key);
        });
    }
    deleteContact(id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable.`);
            if (confirmed) {
                this.contactService.removeContact(id);
            }
        });
    }
};
ContactsPage.ctorParameters = () => [
    { type: _core_services_contact_service__WEBPACK_IMPORTED_MODULE_3__.ContactService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet }
];
ContactsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-contacts',
        template: _contacts_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_contacts_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__metadata)("design:paramtypes", [_core_services_contact_service__WEBPACK_IMPORTED_MODULE_3__.ContactService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet])
], ContactsPage);



/***/ }),

/***/ 9884:
/*!**************************************************************!*\
  !*** ./src/app/pages/contacts/contacts.page.scss?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ".contact-list .contact {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.contact-fallback {\n  margin: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3RzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQztFQUNDLFdBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQUFGOztBQUdBO0VBQ0MsWUFBQTtBQUFEIiwiZmlsZSI6ImNvbnRhY3RzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWN0LWxpc3Qge1xyXG5cdC5jb250YWN0IHtcclxuXHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0ZGlzcGxheTogZmxleDtcclxuXHRcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0fVxyXG59XHJcbi5jb250YWN0LWZhbGxiYWNrIHtcclxuXHRtYXJnaW46IDEwcHg7XHJcbn0iXX0= */";

/***/ }),

/***/ 8788:
/*!**************************************************************!*\
  !*** ./src/app/pages/contacts/contacts.page.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<ion-header translucent=\"true\">\n\t<ion-toolbar color=\"primary\">\n\t\t<!-- <ion-buttons slot=\"start\">\n\t\t\t<ion-menu-button color=\"dark\"></ion-menu-button>\n\t\t</ion-buttons> -->\n\t\t<ion-title>\n\t\t\tSaved Contacts\n\t\t</ion-title>\n\t</ion-toolbar>\n</ion-header>\n<ion-content>\n\t<div class=\"contacts\" *ngIf=\"(contacts$ | async) as contacts\">\n\t\t<ion-list class=\"contact-list\">\n\t\t\t<ion-item *ngFor=\"let contact of contacts\">\n\t\t\t\t<div class=\"contact\">\n\t\t\t\t\t<div class=\"contact-name\">\n\t\t\t\t\t\t{{contact.name}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"buttons\">\n\t\t\t\t\t\t<ion-button (click)=\"showPublicKey(contact.publicKey)\">\n\t\t\t\t\t\t\t<ion-icon name=\"information-circle-outline\"></ion-icon>\n\t\t\t\t\t\t</ion-button>\n\t\t\t\t\t\t<ion-button (click)=\"deleteContact(contact.id)\">\n\t\t\t\t\t\t\t<ion-icon name=\"trash-outline\"></ion-icon>\n\t\t\t\t\t\t</ion-button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</ion-item>\n\t\t</ion-list>\n\t\t<div class=\"contact-fallback\" *ngIf=\"!contacts.length\">\n\t\t\t<h2>No Contacts</h2>\n\t\t</div>\n\t</div>\n</ion-content>\n<ion-footer>\n\t<ion-toolbar>\n\t\t<ion-button (click)=\"addContact()\" expand=\"block\">\n\t\t\t<ion-icon name=\"add-circle-outline\" slot=\"start\"></ion-icon>\n\t\t\t<ion-label>Add Contact</ion-label>\n\t\t</ion-button>\n\t</ion-toolbar>\n</ion-footer>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_contacts_contacts_module_ts.js.map