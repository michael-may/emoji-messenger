(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 5393:
/*!************************************!*\
  !*** ./src/app/_core/constants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IMAGE_SIZE": () => (/* binding */ IMAGE_SIZE)
/* harmony export */ });
const IMAGE_SIZE = 128;


/***/ }),

/***/ 8889:
/*!**************************************!*\
  !*** ./src/app/_core/core.module.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoreModule": () => (/* binding */ CoreModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _services_key_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/key.service */ 8115);
/* harmony import */ var _services_contact_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/contact.service */ 8790);
/* harmony import */ var _services_conversation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/conversation.service */ 9278);







let CoreModule = class CoreModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(`Core Module has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
};
CoreModule.ctorParameters = () => [
    { type: CoreModule, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Optional }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.SkipSelf }] }
];
CoreModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule
        ],
        exports: [],
        declarations: [],
        providers: [
            _services_key_service__WEBPACK_IMPORTED_MODULE_0__.KeyService,
            _services_contact_service__WEBPACK_IMPORTED_MODULE_1__.ContactService,
            _services_conversation_service__WEBPACK_IMPORTED_MODULE_2__.ConversationService
        ]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [CoreModule])
], CoreModule);



/***/ }),

/***/ 8790:
/*!***************************************************!*\
  !*** ./src/app/_core/services/contact.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StoredContact": () => (/* binding */ StoredContact),
/* harmony export */   "Contact": () => (/* binding */ Contact),
/* harmony export */   "ContactService": () => (/* binding */ ContactService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/crypto.utils */ 7714);





class StoredContact {
}
class Contact extends StoredContact {
}
let ContactService = class ContactService {
    constructor() {
        this.contacts = [];
        this.contactSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(this.contacts);
        this.loadContacts()
            .catch(err => {
            console.log(err);
        });
    }
    get contacts$() {
        return this.contactSubject.asObservable();
    }
    addContact(name, publicKeyString) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            let contact = {
                id: `${new Date().getTime()}-${_utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.generateRandomHex(6)}`,
                name,
                publicKey: publicKeyString,
                created: new Date().getTime()
            };
            const pubKey = yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.importPublicKey(publicKeyString)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!pubKey) {
                throw new Error(`Couldn't decode public key.`);
            }
            contact.publicKeyImported = pubKey;
            this.contacts.push(contact);
            this.contactSubject.next(this.contacts);
            this.storeContacts();
            return contact.id;
        });
    }
    getContact(id) {
        return this.contactSubject
            .asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)((contacts) => contacts.find(c => c.id === id)));
    }
    updateContact() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
        });
    }
    removeContact(id) {
        this.contacts = this.contacts.filter(k => k.id !== id);
        this.contactSubject.next(this.contacts);
        this.storeContacts();
    }
    loadContacts() {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            let contacts;
            try {
                contacts = (_a = JSON.parse(localStorage.getItem('contacts'))) !== null && _a !== void 0 ? _a : [];
            }
            catch (err) {
                contacts = [];
            }
            for (let k of contacts) {
                let parsed = Object.assign(Object.assign({}, k), { publicKeyImported: yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.importPublicKey(k.publicKey)
                        .catch(err => {
                        console.log(err);
                        return null;
                    }) });
                this.contacts.push(parsed);
            }
            this.contactSubject.next(this.contacts);
        });
    }
    storeContacts() {
        let contacts = this.contacts
            .map((k) => {
            return {
                id: k.id,
                name: k.name,
                publicKey: k.publicKey,
                created: k.created,
            };
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
};
ContactService.ctorParameters = () => [];
ContactService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], ContactService);



/***/ }),

/***/ 9278:
/*!********************************************************!*\
  !*** ./src/app/_core/services/conversation.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageType": () => (/* binding */ MessageType),
/* harmony export */   "Message": () => (/* binding */ Message),
/* harmony export */   "Conversation": () => (/* binding */ Conversation),
/* harmony export */   "ConversationService": () => (/* binding */ ConversationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4505);
/* harmony import */ var _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/crypto.utils */ 7714);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 6942);





var MessageType;
(function (MessageType) {
    MessageType["Outgoing"] = "outgoing";
    MessageType["Incoming"] = "incoming";
})(MessageType || (MessageType = {}));
class Message {
}
class Conversation {
}
let ConversationService = class ConversationService {
    constructor() {
        this.conversations = [];
        this.conversationSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(this.conversations);
        this.loadConversations()
            .catch(err => {
            console.log(err);
        });
    }
    get conversations$() {
        return this.conversationSubject.asObservable();
    }
    loadConversations() {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            let conversations;
            try {
                conversations = (_a = JSON.parse(localStorage.getItem('conversations'))) !== null && _a !== void 0 ? _a : [];
            }
            catch (err) {
                conversations = [];
            }
            this.conversations = conversations;
            this.conversationSubject.next(this.conversations);
        });
    }
    addConversation(name, toKeyId, fromKeyId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            let conversation = {
                id: `${new Date().getTime()}-${_utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.generateRandomHex(6)}`,
                name,
                toKeyId,
                fromKeyId,
                messages: [],
                created: new Date().getTime()
            };
            this.conversations.push(conversation);
            this.conversationSubject.next(this.conversations);
            this.storeConversations();
            return conversation.id;
        });
    }
    getConversation(id) {
        return this.conversationSubject
            .asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)((conversations) => conversations.find(c => c.id === id)));
    }
    deleteConversation(id) {
        this.conversations = this.conversations.filter(c => c.id !== id);
        this.conversationSubject.next(this.conversations);
        this.storeConversations();
    }
    addMessage(conversationId, message) {
        message = Object.assign(Object.assign({}, message), { id: `${new Date().getTime()}-${_utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.generateRandomHex(6)}`, created: new Date().getTime() });
        this.conversations = this.conversations.map(c => {
            if (c.id === conversationId) {
                c.messages.push(message);
            }
            return c;
        });
        this.conversationSubject.next(this.conversations);
        this.storeConversations();
    }
    deleteMessage(conversationId, messageId) {
        for (const c of this.conversations) {
            if (c.id !== conversationId) {
                continue;
            }
            c.messages = c.messages.filter(m => m.id !== messageId);
        }
        this.conversationSubject.next(this.conversations);
        this.storeConversations();
    }
    storeConversations() {
        localStorage.setItem('conversations', JSON.stringify(this.conversations));
    }
};
ConversationService.ctorParameters = () => [];
ConversationService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], ConversationService);



/***/ }),

/***/ 8115:
/*!***********************************************!*\
  !*** ./src/app/_core/services/key.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StoredEncryptionKey": () => (/* binding */ StoredEncryptionKey),
/* harmony export */   "EncryptionKey": () => (/* binding */ EncryptionKey),
/* harmony export */   "KeyService": () => (/* binding */ KeyService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/crypto.utils */ 7714);





class StoredEncryptionKey {
}
class EncryptionKey extends StoredEncryptionKey {
    constructor() {
        super(...arguments);
        this.unlocked = false;
    }
}
let KeyService = class KeyService {
    constructor() {
        this.keys = [];
        this.keySubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(this.keys);
        this.loadKeys()
            .catch(err => {
            console.log(err);
        });
    }
    get keys$() {
        return this.keySubject.asObservable();
    }
    generateKey(name, password) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            let encryptionKey = {
                id: `${new Date().getTime()}-${_utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.generateRandomHex(6)}`,
                name,
                passwordProtected: (password === null || password === void 0 ? void 0 : password.length) ? true : false,
                publicKey: null,
                privateKey: null,
                created: new Date().getTime(),
                unlocked: true,
                keyPair: null
            };
            const keyPair = yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.generateKeyPair()
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!keyPair) {
                throw new Error(`Couldn't create key pair.`);
            }
            const pubKeyString = yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.cryptoKeyToPub(keyPair.publicKey)
                .catch(err => {
                console.log(err);
                return null;
            });
            let prvKeyString = yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.cryptoKeyToPem(keyPair.privateKey)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!pubKeyString || !prvKeyString) {
                throw new Error(`Couldn't export keys.`);
            }
            if (password === null || password === void 0 ? void 0 : password.length) {
                const encryptedPrvKey = yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.passwordEncrypt(prvKeyString, password)
                    .catch(err => {
                    console.log(err);
                    return null;
                });
                if (!encryptedPrvKey) {
                    throw new Error(`Couldn't password protect private key.`);
                }
                prvKeyString = encryptedPrvKey;
            }
            encryptionKey.publicKey = pubKeyString;
            encryptionKey.privateKey = prvKeyString;
            encryptionKey.keyPair = keyPair;
            this.keys.push(encryptionKey);
            this.keySubject.next(this.keys);
            this.storeKeys();
            return encryptionKey.id;
        });
    }
    getkey(id) {
        return this.keySubject
            .asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)((keys) => keys.find(k => k.id === id)));
    }
    updateKey() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
        });
    }
    removeKey(id) {
        this.keys = this.keys.filter(k => k.id !== id);
        this.keySubject.next(this.keys);
        this.storeKeys();
    }
    unlockKey(id, password) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            const key = this.keys.find(k => k.id === id);
            if (!key) {
                throw new Error(`Couldn't find a key with that id.`);
            }
            const decryptedKey = yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.passwordDecrypt(key.privateKey, password)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!decryptedKey) {
                throw new Error(`Couldn't decrypt key. Check password.`);
            }
            const prvKey = yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.importPrivateKey(decryptedKey)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!prvKey) {
                throw new Error(`Couldn't import private key.`);
            }
            key.keyPair.privateKey = prvKey;
            key.unlocked = true;
            this.keySubject.next(this.keys);
            return key;
        });
    }
    loadKeys() {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            let keys;
            try {
                keys = (_a = JSON.parse(localStorage.getItem('encryptionKeys'))) !== null && _a !== void 0 ? _a : [];
            }
            catch (err) {
                keys = [];
            }
            for (let k of keys) {
                let parsed = Object.assign(Object.assign({}, k), { keyPair: {
                        publicKey: yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.importPublicKey(k.publicKey)
                            .catch(err => {
                            console.log(err);
                            return null;
                        }),
                        privateKey: null
                    } });
                if (k.passwordProtected) {
                    parsed.unlocked = false;
                }
                else {
                    parsed.unlocked = true;
                    parsed.keyPair.privateKey = yield _utils_crypto_utils__WEBPACK_IMPORTED_MODULE_0__.Crypto.importPrivateKey(k.privateKey)
                        .catch(err => {
                        console.log(err);
                        return null;
                    });
                }
                this.keys.push(parsed);
            }
            this.keySubject.next(this.keys);
        });
    }
    storeKeys() {
        let keys = this.keys
            .map((k) => {
            return {
                id: k.id,
                name: k.name,
                passwordProtected: k.passwordProtected,
                publicKey: k.publicKey,
                privateKey: k.privateKey,
                created: k.created,
            };
        });
        localStorage.setItem('encryptionKeys', JSON.stringify(keys));
    }
};
KeyService.ctorParameters = () => [];
KeyService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], KeyService);



/***/ }),

/***/ 7714:
/*!*********************************************!*\
  !*** ./src/app/_core/utils/crypto.utils.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Crypto": () => (/* binding */ Crypto)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4929);

class Crypto {
    static generateKeyPair() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return window.crypto.subtle.generateKey({
                name: 'RSA-OAEP',
                modulusLength: 4096,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: 'SHA-512',
            }, true, ['encrypt', 'decrypt']);
        });
    }
    static encrypt(input, key, encodeAsBase64 = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const message = new TextEncoder().encode(input);
            const encrypted = yield window.crypto.subtle
                .encrypt({
                name: 'RSA-OAEP'
            }, key, message)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!encrypted) {
                throw new Error(`Couldn't encrypt message.`);
            }
            if (!encodeAsBase64) {
                return encrypted;
            }
            else {
                return btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)));
            }
        });
    }
    static decrypt(input, privateKey) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const encoded = yield window.crypto.subtle
                .decrypt({
                name: 'RSA-OAEP'
            }, privateKey, input)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!encoded) {
                throw new Error(`Couldn't decrypt message.`);
            }
            return new TextDecoder().decode(encoded);
        });
    }
    static exportKey(key) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return window.crypto.subtle.exportKey('jwk', key);
        });
    }
    static passwordEncrypt(input, password) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const salt = this.generateRandomValue(16);
            const iv = this.generateRandomValue(12);
            const passwordKey = yield this.getPasswordKey(password)
                .catch(err => {
                console.log(err);
                return null;
            });
            const aesKey = yield this.getPasswordAESKey(passwordKey, salt, ['encrypt'])
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!passwordKey || !aesKey) {
                throw new Error(`Couldn't get password key or AES.`);
            }
            const encryptedContent = yield window.crypto.subtle
                .encrypt({
                name: 'AES-GCM',
                iv: iv,
            }, aesKey, new TextEncoder().encode(input))
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!encryptedContent) {
                throw new Error(`Error encrypting data.`);
            }
            const encryptedContentArr = new Uint8Array(encryptedContent);
            let buffer = new Uint8Array(salt.byteLength + iv.byteLength + encryptedContentArr.byteLength);
            buffer.set(salt, 0);
            buffer.set(iv, salt.byteLength);
            buffer.set(encryptedContentArr, salt.byteLength + iv.byteLength);
            return btoa(String.fromCharCode.apply(null, buffer));
        });
    }
    static passwordDecrypt(encryptedInput, password) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const encryptedData = Uint8Array.from(atob(encryptedInput), c => c.charCodeAt(0));
            const salt = encryptedData.slice(0, 16);
            const iv = encryptedData.slice(16, 16 + 12);
            const data = encryptedData.slice(16 + 12);
            const passwordKey = yield this.getPasswordKey(password)
                .catch(err => {
                console.log(err);
                return null;
            });
            const aesKey = yield this.getPasswordAESKey(passwordKey, salt, ['decrypt'])
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!passwordKey || !aesKey) {
                throw new Error(`Couldn't get password key or AES.`);
            }
            const decryptedContent = yield window.crypto.subtle
                .decrypt({
                name: 'AES-GCM',
                iv: iv,
            }, aesKey, data);
            return new TextDecoder().decode(decryptedContent);
        });
    }
    static getPasswordKey(password) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return window.crypto.subtle
                .importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
        });
    }
    static getPasswordAESKey(passwordKey, salt, usage = ['encrypt', 'decrypt']) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return window.crypto.subtle
                .deriveKey({
                name: 'PBKDF2',
                salt: salt,
                iterations: 25000,
                hash: 'SHA-256',
            }, passwordKey, { name: 'AES-GCM', length: 256 }, false, usage);
        });
    }
    static importPrivateKey(pem) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return window.crypto.subtle.importKey('pkcs8', this.pemToArrayBuffer(pem), {
                name: 'RSA-OAEP',
                hash: 'SHA-512'
            }, true, ['decrypt']);
        });
    }
    static importPublicKey(pub) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return window.crypto.subtle.importKey('spki', this.pubToArrayBuffer(pub), {
                name: 'RSA-OAEP',
                hash: 'SHA-512'
            }, true, ['encrypt']);
        });
    }
    static cryptoKeyToPub(publicKey) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            let pub = this.SPKI_HEADER + '\n';
            const pKey = yield window.crypto.subtle
                .exportKey('spki', publicKey)
                .catch(err => {
                console.log(err);
                return undefined;
            });
            if (!pKey) {
                throw new Error('Error exporting public key.');
            }
            const base64String = btoa(String.fromCharCode(...new Uint8Array(pKey)));
            for (let i = 0; i < Math.ceil(base64String.length / 64); i++) {
                pub += base64String.slice(i * 64, (i + 1) * 64) + '\n';
            }
            pub += this.SPKI_FOOTER;
            return pub.trim();
        });
    }
    static cryptoKeyToPem(privateKey) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            let pem = this.PKCS8_HEADER + '\n';
            const pKey = yield window.crypto.subtle
                .exportKey('pkcs8', privateKey)
                .catch(err => {
                console.log(err);
                return undefined;
            });
            if (!pKey) {
                throw new Error('Error exporting private key.');
            }
            const base64String = btoa(String.fromCharCode(...new Uint8Array(pKey)));
            for (let i = 0; i < Math.ceil(base64String.length / 64); i++) {
                pem += base64String.slice(i * 64, (i + 1) * 64) + '\n';
            }
            pem += this.PKCS8_FOOTER;
            return pem.trim();
        });
    }
    static pemToArrayBuffer(pem) {
        pem = pem
            .replace(this.PKCS8_HEADER, '')
            .replace(this.PKCS8_FOOTER, '')
            .replace(/\n/g, '');
        return Uint8Array.from(atob(pem), c => c.charCodeAt(0));
    }
    static pubToArrayBuffer(pub) {
        pub = pub
            .replace(this.SPKI_HEADER, '')
            .replace(this.SPKI_FOOTER, '')
            .replace(/\n/g, '');
        return Uint8Array.from(atob(pub), c => c.charCodeAt(0));
    }
    static generateRandomValue(length = 16) {
        return window.crypto.getRandomValues(new Uint8Array(length));
    }
    static generateRandomHex(length = 16) {
        return this.uint8ArrayToHex(this.generateRandomValue(length));
    }
    ;
    static uint8ArrayToHex(arr) {
        return [...arr]
            .map(v => v.toString(16).padStart(2, '0'))
            .join('');
    }
}
Crypto.PKCS8_HEADER = '-----BEGIN PRIVATE KEY-----';
Crypto.PKCS8_FOOTER = '-----END PRIVATE KEY-----';
Crypto.SPKI_HEADER = '-----BEGIN PUBLIC KEY-----';
Crypto.SPKI_FOOTER = '-----END PUBLIC KEY-----';


/***/ }),

/***/ 3988:
/*!********************************************!*\
  !*** ./src/app/_core/utils/image.utils.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChunkInfo": () => (/* binding */ ChunkInfo),
/* harmony export */   "IHDRData": () => (/* binding */ IHDRData),
/* harmony export */   "ColorPixel": () => (/* binding */ ColorPixel),
/* harmony export */   "ImageUtils": () => (/* binding */ ImageUtils)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _third_party_pako_js_pako_inflate_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../third-party/pako.js/pako_inflate.min */ 2152);
/* harmony import */ var _third_party_pako_js_pako_inflate_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_third_party_pako_js_pako_inflate_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _third_party_pako_js_pako_deflate_min__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../third-party/pako.js/pako_deflate.min */ 5084);
/* harmony import */ var _third_party_pako_js_pako_deflate_min__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_third_party_pako_js_pako_deflate_min__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ 5393);
/*
    PNG Format
    File Header:	0x00 - 0x08
    Chunks:
        LEN:		0x00 - 0x03 (Uint32)
        Type: 		0x04 - 0x07 (Uint32)
        Data?:		0x08 - ????
        CRC:		???? - ???? (After Data) (UInt32)
*/




class ChunkInfo {
}
class IHDRData {
}
class ColorPixel {
}
class ImageUtils {
    static create(imageData, width, height) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const headerValues = [137, 80, 78, 71, 13, 10, 26, 10];
            const scanLines = [];
            for (const line of this.writePixels(imageData, width, height)) {
                scanLines.push(...line);
            }
            const deflated = yield this.getDeflatedData(new Uint8Array(scanLines))
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!deflated) {
                throw new Error(`Couldn't deflate data.`);
            }
            let file = new Uint8Array(8 + // PNG Header
                8 + // IHDR Len + FourCC
                13 + // IHDR Data
                4 + // IHDR CRC
                // 8 +					// sRGB Len + FourCC
                // 1 +					// sRGB Data
                // 4 +					// sRGB CRC
                8 + // IDAT Len + FourCC
                deflated.length + // IDAT Data
                4 + // IDAT CRC
                8 + // IEND Len + FourCC
                4 // IEND CRC
            );
            const dv = new DataView(file.buffer);
            let pos = 0x0;
            // Write PNG Header
            for (const h of headerValues) {
                dv.setUint8(pos, h);
                pos++;
            }
            // Write IHDR
            // Data size
            dv.setUint32(pos, 13);
            // FourCC
            dv.setUint32(pos += 4, this.makeFourCC('IHDR'));
            // Data
            let dataStart = pos + 4;
            dv.setUint32(pos += 4, width);
            dv.setUint32(pos += 4, height);
            // Bit depth (8 bpp)
            dv.setUint8(pos += 4, 8);
            // Color type (6, True color + alpha)
            dv.setUint8(pos += 1, 6);
            // Compression method (0)
            dv.setUint8(pos += 1, 0);
            // Filter method (0)
            dv.setUint8(pos += 1, 0);
            // Interlace method (0)
            dv.setUint8(pos += 1, 0);
            // CRC
            dv.setUint32(pos += 1, this.calcCRC(new Uint8Array(dv.buffer, dataStart - 4, 13 + 4)));
            // // Write sRGB
            // // Data size
            // dv.setUint32(pos += 4, 1);
            // // FourCC
            // dv.setUint32(pos += 4, this.makeFourCC('sRGB'));
            // dataStart = pos + 4;
            // // Data (3, sRGB Absolute)
            // dv.setUint8(pos += 4, 3);
            // // CRC
            // dv.setUint32(pos += 1, this.calcCRC(new Uint8Array(dv.buffer, dataStart - 4, 1 + 4)));
            // Write IDAT
            // Data size
            dv.setUint32(pos += 4, deflated.length);
            // FourCC
            dv.setUint32(pos += 4, this.makeFourCC('IDAT'));
            // Data
            dataStart = pos += 4;
            for (const d of deflated) {
                dv.setUint8(pos, d);
                pos++;
            }
            // CRC
            dv.setUint32(pos, this.calcCRC(new Uint8Array(dv.buffer, dataStart - 4, deflated.length + 4)));
            // Write IEND
            // Data size
            dv.setUint32(pos += 4, 0);
            // FourCC
            dv.setUint32(pos += 4, this.makeFourCC('IEND'));
            // CRC
            dv.setUint32(pos + 4, this.calcCRC(new Uint8Array(dv.buffer, pos, 4)));
            return new Blob([dv.buffer], { type: 'image/png' });
        });
    }
    static *writePixels(data, width, height) {
        let writing = true;
        let line = 0;
        let dataPos = 0;
        let lineLength = (width * 4) + 1;
        while (writing) {
            //let offset = line * lineLength;
            let pixels = [];
            for (let c = 0; c < lineLength; c++) {
                if (c === 0) {
                    pixels.push(0x0);
                }
                else {
                    pixels.push(data[dataPos]);
                    dataPos++;
                }
            }
            yield pixels;
            line++;
            if (line === height) {
                writing = false;
            }
        }
    }
    static read(imageString) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const arr = Uint8Array.from(atob(imageString.split('base64,')[1]), c => c.charCodeAt(0));
            const chunks = [];
            const dv = new DataView(arr.buffer);
            // Start at the end of the PNG header
            for (let chunk of this.getChunks(dv)) {
                chunks.push(chunk);
            }
            // console.log(chunks);
            let ihdr = yield this.getIHDRData(dv, chunks.find(c => c.type === 'IHDR'));
            //console.log(ihdr);
            let inflated = yield this.getInflatedData(dv, chunks.filter(c => c.type === 'IDAT'))
                .catch(err => {
                console.log(err);
                return null;
            });
            let pixels = [];
            for (const row of this.getPixels(inflated, ihdr.width, ihdr.height)) {
                pixels.push(...row);
            }
            return pixels;
        });
    }
    static getIHDRData(dv, chunk) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            /*
                Width:				4 bytes
                Height:				4 bytes
                Bit depth:			1 byte
                Color type:			1 byte
                Compression method:	1 byte
                Filter method:		1 byte
                Interlace method:	1 byte
            */
            let pos = chunk.pos + 8;
            const width = dv.getUint32(pos);
            const height = dv.getUint32(pos + 4);
            const bitDepth = dv.getUint8(pos + 8);
            const colorType = dv.getUint8(pos + 9);
            const compressionMethod = dv.getUint8(pos + 10);
            const filterMethod = dv.getUint8(pos + 11);
            const interlaceMethod = dv.getUint8(pos + 12);
            return {
                width,
                height,
                bitDepth,
                colorType,
                compressionMethod,
                filterMethod,
                interlaceMethod
            };
        });
    }
    static getDeflatedData(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const deflator = new _third_party_pako_js_pako_deflate_min__WEBPACK_IMPORTED_MODULE_1__.Deflate();
            deflator.push(data, true);
            if (deflator.error) {
                throw deflator.error;
            }
            return deflator.result;
        });
    }
    static getInflatedData(dv, chunks) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const inflator = new _third_party_pako_js_pako_inflate_min__WEBPACK_IMPORTED_MODULE_0__.Inflate();
            for (const c of chunks) {
                inflator.push(new Uint8Array(dv.buffer, c.pos + 8, c.len));
            }
            if (inflator.error) {
                throw inflator.error;
            }
            return inflator.result;
        });
    }
    static *getPixels(data, width, height) {
        let parsing = true;
        let line = 0;
        let lineLength = (width * 4) + 1;
        let currentFilter = 0;
        while (parsing) {
            let offset = line * lineLength;
            let pixels = [];
            let previousPixel = new Uint8ClampedArray([0, 0, 0, 0]);
            let currentSubPixel = 0;
            for (let c = 0; c < lineLength; c++) {
                if (c === 0) {
                    currentFilter = data[c + offset];
                    previousPixel = new Uint8ClampedArray([0, 0, 0, 0]);
                    currentSubPixel = 0;
                }
                else {
                    if (currentSubPixel > 3) {
                        currentSubPixel = 0;
                    }
                    switch (currentFilter) {
                        case 0:
                            pixels.push(data[c + offset]);
                            break;
                        case 1:
                            let newSubPixel = (data[c + offset] + previousPixel[currentSubPixel]) % 256;
                            pixels.push(newSubPixel);
                            previousPixel[currentSubPixel] = newSubPixel;
                            break;
                    }
                    currentSubPixel++;
                }
            }
            yield pixels;
            line++;
            if (line === height) {
                parsing = false;
            }
        }
    }
    static *getChunks(dv) {
        let seeking = true;
        // Skip PNG file header.
        let pos = 0x08;
        while (seeking) {
            let len = dv.getUint32(pos);
            let typePos = pos + 4;
            let type = String.fromCharCode(dv.getUint8(typePos)) +
                String.fromCharCode(dv.getUint8(typePos + 1)) +
                String.fromCharCode(dv.getUint8(typePos + 2)) +
                String.fromCharCode(dv.getUint8(typePos + 3));
            yield {
                pos,
                len,
                type
            };
            if (type === 'IEND') {
                seeking = false;
            }
            else {
                pos += len + 12;
            }
        }
    }
    static createImageData(inputData, emoji = '', backgroundColor = '#ffffff') {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const data = new Uint8Array(inputData);
            const minPx = Math.ceil(data.length);
            const remainder = 3 - data.length % 3;
            const density = Math.floor((_constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE * _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE) / minPx);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE;
            canvas.height = _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE;
            ctx.clearRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE);
            ctx.fillStyle = `rgba(
				${parseInt(backgroundColor[1] + backgroundColor[2], 16)},
				${parseInt(backgroundColor[3] + backgroundColor[4], 16)},
				${parseInt(backgroundColor[5] + backgroundColor[6], 16)},
				255
			)
		`;
            ctx.fillRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE);
            if (emoji) {
                let fontSize = _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE;
                ctx.font = `${fontSize}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                let measure = ctx.measureText(emoji);
                if (measure.width > _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE) {
                    fontSize /= measure.width / _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE;
                    ctx.font = `${fontSize}px sans-serif`;
                }
                ctx.fillText(emoji, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE / 2, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE / 2);
            }
            let img = ctx.getImageData(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE);
            for (let i = 0; i < (data.length + remainder); i++) {
                const imgIdx = (i * density) * 4;
                img.data[imgIdx + 3] = data[i];
            }
            const blob = yield ImageUtils
                .create([...img.data], _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_2__.IMAGE_SIZE)
                .catch(err => {
                console.log(err);
                return null;
            });
            return yield ImageUtils.blobToBase64(blob)
                .catch(err => {
                console.log(err);
                return null;
            });
        });
    }
    static makeFourCC(n) {
        const c = n.charCodeAt.bind(n);
        return (c(0) & 0x7f) << 24 | (c(1) & 0x7f) << 16 | (c(2) & 0x7f) << 8 | c(3) & 0x7f;
    }
    static calcCRC(chunk) {
        let crc = (-1 >>> 0);
        const len = chunk.length;
        for (let i = 0; i < len; i++) {
            crc = (crc >>> 8) ^ ImageUtils.CRC32_Table[(crc ^ chunk[i]) & 0xff];
        }
        return (crc ^ -1) >>> 0;
    }
    static createCRC32Table() {
        let c;
        const table = [];
        for (let n = 0; n < 256; n++) {
            c = n;
            for (let k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            table[n] = c;
        }
        return table;
    }
    static base64ToBlob(input) {
        let data = Uint8Array.from(atob(input.split('base64,')[1]), c => c.charCodeAt(0));
        return new Blob([data.buffer], { type: 'image/png' });
    }
    static base64ToUint8Array(input) {
        return Uint8Array.from(atob(input.split('base64,')[1]), c => c.charCodeAt(0));
        ;
    }
    static fileToBase64(file) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            return this.blobToBase64(file);
        });
    }
    static blobToBase64(blob) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.toString());
                reader.onerror = error => reject(error);
                reader.readAsDataURL(blob);
            });
        });
    }
    static base64ToImageData(input) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let fileData = this.base64ToBlob(input);
            const i = new Image();
            i.src = URL.createObjectURL(fileData);
            let decodeErr;
            yield i.decode()
                .catch(err => {
                decodeErr = err;
            });
            if (decodeErr || !i.width) {
                throw new Error(`Couldn't decode image.`);
            }
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            c.width = i.width;
            c.height = i.height;
            ctx.drawImage(i, 0, 0);
            return ctx.getImageData(0, 0, i.width, i.height);
        });
    }
}
ImageUtils.CRC32_Table = ImageUtils.createCRC32Table();


/***/ }),

/***/ 8166:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);



const routes = [
    { path: 'conversations', data: { name: 'Conversations', icon: 'mail-outline', iconActive: 'mail' }, loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/home/home.module */ 7994)).then(m => m.HomePageModule) },
    { path: 'conversations/:id', data: { display: false }, loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_conversation-detail_conversation-detail_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/conversation-detail/conversation-detail.module */ 6414)).then(m => m.ConversationDetailPageModule) },
    { path: 'keys', data: { name: 'Keys', icon: 'key-outline', iconActive: 'key' }, loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_keys_keys_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/keys/keys.module */ 1391)).then(m => m.KeysPageModule) },
    { path: 'contacts', data: { name: 'Contacts', icon: 'people-outline', iconActive: 'people' }, loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_contacts_contacts_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/contacts/contacts.module */ 464)).then(m => m.ContactsPageModule) },
    { path: '', redirectTo: 'conversations', pathMatch: 'full' },
    { path: '*', redirectTo: 'conversations', pathMatch: 'full' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__.PreloadAllModules, relativeLinkResolution: 'corrected' })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    })
], AppRoutingModule);



/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Route": () => (/* binding */ Route),
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.html?ngResource */ 3383);
/* harmony import */ var _app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss?ngResource */ 9259);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 9151);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/splash-screen/ngx */ 6618);
/* harmony import */ var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/status-bar/ngx */ 68);









class Route {
}
let AppComponent = class AppComponent {
    constructor(platform, splashScreen, statusBar, router, menuController) {
        var _a, _b, _c, _d;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.router = router;
        this.menuController = menuController;
        this.routes = [];
        this.initializeApp();
        for (const r of this.router.config) {
            if (r.path === '*' || !r.data || ((_a = r.data) === null || _a === void 0 ? void 0 : _a.display) === false) {
                continue;
            }
            this.routes.push({
                name: (_b = r.data) === null || _b === void 0 ? void 0 : _b.name,
                path: '/' + r.path,
                active: false,
                icon: (_c = r.data) === null || _c === void 0 ? void 0 : _c.icon,
                iconActive: (_d = r.data) === null || _d === void 0 ? void 0 : _d.iconActive
            });
        }
    }
    initializeApp() {
        this.platform.ready().then(() => {
            // Status bar and splash screen
            // features should be removed for web-only projects.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    ngOnInit() {
        this.routeSubscription$ = this.router.events
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.filter)(ev => ev instanceof _angular_router__WEBPACK_IMPORTED_MODULE_5__.NavigationEnd))
            .subscribe(this.routeWatcher.bind(this));
    }
    ngOnDestroy() {
        if (this.routeSubscription$) {
            this.routeSubscription$.unsubscribe();
        }
    }
    menuClose() {
        this.menuController.close();
    }
    routeWatcher(ev) {
        const path = this.router.routerState.snapshot.url;
        for (const r of this.routes) {
            if (r.path === path) {
                r.active = true;
            }
            else {
                r.active = false;
            }
        }
    }
};
AppComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.Platform },
    { type: _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_2__.SplashScreen },
    { type: _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_3__.StatusBar },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.MenuController }
];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-root',
        template: _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__metadata)("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.Platform,
        _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_2__.SplashScreen,
        _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_3__.StatusBar,
        _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.MenuController])
], AppComponent);



/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/splash-screen/ngx */ 6618);
/* harmony import */ var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic-native/status-bar/ngx */ 68);
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_core/core.module */ 8889);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/shared.module */ 4466);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ 8166);












let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__.AppComponent],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule.forRoot(),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_5__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule,
            _core_core_module__WEBPACK_IMPORTED_MODULE_2__.CoreModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule,
        ],
        providers: [
            _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_1__.StatusBar,
            _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_0__.SplashScreen,
            { provide: _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouteReuseStrategy, useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicRouteStrategy }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__.AppComponent]
    })
], AppModule);



/***/ }),

/***/ 3154:
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/emoji-picker/emoji-picker.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmojiPickerComponent": () => (/* binding */ EmojiPickerComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _emoji_picker_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emoji-picker.component.html?ngResource */ 7177);
/* harmony import */ var _emoji_picker_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emoji-picker.component.scss?ngResource */ 8154);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _emoji_picker_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emoji-picker.data */ 5418);





let EmojiPickerComponent = class EmojiPickerComponent {
    constructor() {
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.selectedEmojis = '';
        this.emojiLists = _emoji_picker_data__WEBPACK_IMPORTED_MODULE_2__.Emojis;
    }
    addEmoji(value) {
        this.selected.emit(value);
    }
};
EmojiPickerComponent.ctorParameters = () => [];
EmojiPickerComponent.propDecorators = {
    selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output, args: ['selected',] }]
};
EmojiPickerComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-emoji-picker',
        template: _emoji_picker_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_emoji_picker_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [])
], EmojiPickerComponent);



/***/ }),

/***/ 5418:
/*!*********************************************************************!*\
  !*** ./src/app/shared/components/emoji-picker/emoji-picker.data.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmojiList": () => (/* binding */ EmojiList),
/* harmony export */   "Emojis": () => (/* binding */ Emojis)
/* harmony export */ });
// This file was auto-generated by emoji-parser.ts
class Emoji {
}
class EmojiList {
}
const Emojis = [
    {
        'name': 'Smileys & Emotion',
        'emojis': [
            '😀',
            '😃',
            '😄',
            '😁',
            '😆',
            '😅',
            '🤣',
            '😂',
            '🙂',
            '🙃',
            '🫠',
            '😉',
            '😊',
            '😇',
            '🥰',
            '😍',
            '🤩',
            '😘',
            '😗',
            '☺️',
            '😚',
            '😙',
            '🥲',
            '😋',
            '😛',
            '😜',
            '🤪',
            '😝',
            '🤑',
            '🤗',
            '🤭',
            '🫢',
            '🫣',
            '🤫',
            '🤔',
            '🫡',
            '🤐',
            '🤨',
            '😐',
            '😑',
            '😶',
            '🫥',
            {
                'primary': '😶‍🌫️',
                'variants': [
                    '😶‍🌫'
                ]
            },
            '😏',
            '😒',
            '🙄',
            '😬',
            '😮‍💨',
            '🤥',
            '😌',
            '😔',
            '😪',
            '🤤',
            '😴',
            '😷',
            '🤒',
            '🤕',
            '🤢',
            '🤮',
            '🤧',
            '🥵',
            '🥶',
            '🥴',
            '😵',
            '😵‍💫',
            '🤯',
            '🤠',
            '🥳',
            '🥸',
            '😎',
            '🤓',
            '🧐',
            '😕',
            '🫤',
            '😟',
            '🙁',
            '☹️',
            '😮',
            '😯',
            '😲',
            '😳',
            '🥺',
            '🥹',
            '😦',
            '😧',
            '😨',
            '😰',
            '😥',
            '😢',
            '😭',
            '😱',
            '😖',
            '😣',
            '😞',
            '😓',
            '😩',
            '😫',
            '🥱',
            '😤',
            '😡',
            '😠',
            '🤬',
            '😈',
            '👿',
            '💀',
            '☠️',
            '💩',
            '🤡',
            '👹',
            '👺',
            '👻',
            '👽',
            '👾',
            '🤖',
            '😺',
            '😸',
            '😹',
            '😻',
            '😼',
            '😽',
            '🙀',
            '😿',
            '😾',
            '🙈',
            '🙉',
            '🙊',
            '💋',
            '💌',
            '💘',
            '💝',
            '💖',
            '💗',
            '💓',
            '💞',
            '💕',
            '💟',
            '❣️',
            '💔',
            '❤️‍🔥',
            '❤️‍🩹',
            '❤️',
            '🧡',
            '💛',
            '💚',
            '💙',
            '💜',
            '🤎',
            '🖤',
            '🤍',
            '💯',
            '💢',
            '💥',
            '💫',
            '💦',
            '💨',
            '🕳️',
            '💣',
            '💬',
            '👁️‍🗨️',
            '🗨️',
            '🗯️',
            '💭',
            '💤'
        ]
    },
    {
        'name': 'People & Body',
        'emojis': [
            {
                'primary': '👋',
                'variants': [
                    '👋🏻',
                    '👋🏼',
                    '👋🏽',
                    '👋🏾',
                    '👋🏿'
                ]
            },
            {
                'primary': '🤚',
                'variants': [
                    '🤚🏻',
                    '🤚🏼',
                    '🤚🏽',
                    '🤚🏾',
                    '🤚🏿'
                ]
            },
            {
                'primary': '🖐️',
                'variants': [
                    '🖐🏻',
                    '🖐🏼',
                    '🖐🏽',
                    '🖐🏾',
                    '🖐🏿'
                ]
            },
            {
                'primary': '✋',
                'variants': [
                    '✋🏻',
                    '✋🏼',
                    '✋🏽',
                    '✋🏾',
                    '✋🏿'
                ]
            },
            {
                'primary': '🖖',
                'variants': [
                    '🖖🏻',
                    '🖖🏼',
                    '🖖🏽',
                    '🖖🏾',
                    '🖖🏿'
                ]
            },
            {
                'primary': '🫱',
                'variants': [
                    '🫱🏻',
                    '🫱🏼',
                    '🫱🏽',
                    '🫱🏾',
                    '🫱🏿'
                ]
            },
            {
                'primary': '🫲',
                'variants': [
                    '🫲🏻',
                    '🫲🏼',
                    '🫲🏽',
                    '🫲🏾',
                    '🫲🏿'
                ]
            },
            {
                'primary': '🫳',
                'variants': [
                    '🫳🏻',
                    '🫳🏼',
                    '🫳🏽',
                    '🫳🏾',
                    '🫳🏿'
                ]
            },
            {
                'primary': '🫴',
                'variants': [
                    '🫴🏻',
                    '🫴🏼',
                    '🫴🏽',
                    '🫴🏾',
                    '🫴🏿'
                ]
            },
            {
                'primary': '👌',
                'variants': [
                    '👌🏻',
                    '👌🏼',
                    '👌🏽',
                    '👌🏾',
                    '👌🏿'
                ]
            },
            {
                'primary': '🤌',
                'variants': [
                    '🤌🏻',
                    '🤌🏼',
                    '🤌🏽',
                    '🤌🏾',
                    '🤌🏿'
                ]
            },
            {
                'primary': '🤏',
                'variants': [
                    '🤏🏻',
                    '🤏🏼',
                    '🤏🏽',
                    '🤏🏾',
                    '🤏🏿'
                ]
            },
            {
                'primary': '✌️',
                'variants': [
                    '✌🏻',
                    '✌🏼',
                    '✌🏽',
                    '✌🏾',
                    '✌🏿'
                ]
            },
            {
                'primary': '🤞',
                'variants': [
                    '🤞🏻',
                    '🤞🏼',
                    '🤞🏽',
                    '🤞🏾',
                    '🤞🏿'
                ]
            },
            {
                'primary': '🫰',
                'variants': [
                    '🫰🏻',
                    '🫰🏼',
                    '🫰🏽',
                    '🫰🏾',
                    '🫰🏿'
                ]
            },
            {
                'primary': '🤟',
                'variants': [
                    '🤟🏻',
                    '🤟🏼',
                    '🤟🏽',
                    '🤟🏾',
                    '🤟🏿'
                ]
            },
            {
                'primary': '🤘',
                'variants': [
                    '🤘🏻',
                    '🤘🏼',
                    '🤘🏽',
                    '🤘🏾',
                    '🤘🏿'
                ]
            },
            {
                'primary': '🤙',
                'variants': [
                    '🤙🏻',
                    '🤙🏼',
                    '🤙🏽',
                    '🤙🏾',
                    '🤙🏿'
                ]
            },
            {
                'primary': '👈',
                'variants': [
                    '👈🏻',
                    '👈🏼',
                    '👈🏽',
                    '👈🏾',
                    '👈🏿'
                ]
            },
            {
                'primary': '👉',
                'variants': [
                    '👉🏻',
                    '👉🏼',
                    '👉🏽',
                    '👉🏾',
                    '👉🏿'
                ]
            },
            {
                'primary': '👆',
                'variants': [
                    '👆🏻',
                    '👆🏼',
                    '👆🏽',
                    '👆🏾',
                    '👆🏿'
                ]
            },
            {
                'primary': '🖕',
                'variants': [
                    '🖕🏻',
                    '🖕🏼',
                    '🖕🏽',
                    '🖕🏾',
                    '🖕🏿'
                ]
            },
            {
                'primary': '👇',
                'variants': [
                    '👇🏻',
                    '👇🏼',
                    '👇🏽',
                    '👇🏾',
                    '👇🏿'
                ]
            },
            {
                'primary': '☝️',
                'variants': [
                    '☝🏻',
                    '☝🏼',
                    '☝🏽',
                    '☝🏾',
                    '☝🏿'
                ]
            },
            {
                'primary': '🫵',
                'variants': [
                    '🫵🏻',
                    '🫵🏼',
                    '🫵🏽',
                    '🫵🏾',
                    '🫵🏿'
                ]
            },
            {
                'primary': '👍',
                'variants': [
                    '👍🏻',
                    '👍🏼',
                    '👍🏽',
                    '👍🏾',
                    '👍🏿'
                ]
            },
            {
                'primary': '👎',
                'variants': [
                    '👎🏻',
                    '👎🏼',
                    '👎🏽',
                    '👎🏾',
                    '👎🏿'
                ]
            },
            {
                'primary': '✊',
                'variants': [
                    '✊🏻',
                    '✊🏼',
                    '✊🏽',
                    '✊🏾',
                    '✊🏿'
                ]
            },
            {
                'primary': '👊',
                'variants': [
                    '👊🏻',
                    '👊🏼',
                    '👊🏽',
                    '👊🏾',
                    '👊🏿'
                ]
            },
            {
                'primary': '🤛',
                'variants': [
                    '🤛🏻',
                    '🤛🏼',
                    '🤛🏽',
                    '🤛🏾',
                    '🤛🏿'
                ]
            },
            {
                'primary': '🤜',
                'variants': [
                    '🤜🏻',
                    '🤜🏼',
                    '🤜🏽',
                    '🤜🏾',
                    '🤜🏿'
                ]
            },
            {
                'primary': '👏',
                'variants': [
                    '👏🏻',
                    '👏🏼',
                    '👏🏽',
                    '👏🏾',
                    '👏🏿'
                ]
            },
            {
                'primary': '🙌',
                'variants': [
                    '🙌🏻',
                    '🙌🏼',
                    '🙌🏽',
                    '🙌🏾',
                    '🙌🏿'
                ]
            },
            {
                'primary': '🫶',
                'variants': [
                    '🫶🏻',
                    '🫶🏼',
                    '🫶🏽',
                    '🫶🏾',
                    '🫶🏿'
                ]
            },
            {
                'primary': '👐',
                'variants': [
                    '👐🏻',
                    '👐🏼',
                    '👐🏽',
                    '👐🏾',
                    '👐🏿'
                ]
            },
            {
                'primary': '🤲',
                'variants': [
                    '🤲🏻',
                    '🤲🏼',
                    '🤲🏽',
                    '🤲🏾',
                    '🤲🏿'
                ]
            },
            {
                'primary': '🤝',
                'variants': [
                    '🤝🏻',
                    '🤝🏼',
                    '🤝🏽',
                    '🤝🏾',
                    '🤝🏿',
                    '🫱🏻‍🫲🏼',
                    '🫱🏻‍🫲🏽',
                    '🫱🏻‍🫲🏾',
                    '🫱🏻‍🫲🏿',
                    '🫱🏼‍🫲🏻',
                    '🫱🏼‍🫲🏽',
                    '🫱🏼‍🫲🏾',
                    '🫱🏼‍🫲🏿',
                    '🫱🏽‍🫲🏻',
                    '🫱🏽‍🫲🏼',
                    '🫱🏽‍🫲🏾',
                    '🫱🏽‍🫲🏿',
                    '🫱🏾‍🫲🏻',
                    '🫱🏾‍🫲🏼',
                    '🫱🏾‍🫲🏽',
                    '🫱🏾‍🫲🏿',
                    '🫱🏿‍🫲🏻',
                    '🫱🏿‍🫲🏼',
                    '🫱🏿‍🫲🏽',
                    '🫱🏿‍🫲🏾'
                ]
            },
            {
                'primary': '🙏',
                'variants': [
                    '🙏🏻',
                    '🙏🏼',
                    '🙏🏽',
                    '🙏🏾',
                    '🙏🏿'
                ]
            },
            {
                'primary': '✍️',
                'variants': [
                    '✍🏻',
                    '✍🏼',
                    '✍🏽',
                    '✍🏾',
                    '✍🏿'
                ]
            },
            {
                'primary': '💅',
                'variants': [
                    '💅🏻',
                    '💅🏼',
                    '💅🏽',
                    '💅🏾',
                    '💅🏿'
                ]
            },
            {
                'primary': '🤳',
                'variants': [
                    '🤳🏻',
                    '🤳🏼',
                    '🤳🏽',
                    '🤳🏾',
                    '🤳🏿'
                ]
            },
            {
                'primary': '💪',
                'variants': [
                    '💪🏻',
                    '💪🏼',
                    '💪🏽',
                    '💪🏾',
                    '💪🏿'
                ]
            },
            '🦾',
            '🦿',
            {
                'primary': '🦵',
                'variants': [
                    '🦵🏻',
                    '🦵🏼',
                    '🦵🏽',
                    '🦵🏾',
                    '🦵🏿'
                ]
            },
            {
                'primary': '🦶',
                'variants': [
                    '🦶🏻',
                    '🦶🏼',
                    '🦶🏽',
                    '🦶🏾',
                    '🦶🏿'
                ]
            },
            {
                'primary': '👂',
                'variants': [
                    '👂🏻',
                    '👂🏼',
                    '👂🏽',
                    '👂🏾',
                    '👂🏿'
                ]
            },
            {
                'primary': '🦻',
                'variants': [
                    '🦻🏻',
                    '🦻🏼',
                    '🦻🏽',
                    '🦻🏾',
                    '🦻🏿'
                ]
            },
            {
                'primary': '👃',
                'variants': [
                    '👃🏻',
                    '👃🏼',
                    '👃🏽',
                    '👃🏾',
                    '👃🏿'
                ]
            },
            '🧠',
            '🫀',
            '🫁',
            '🦷',
            '🦴',
            '👀',
            '👁️',
            '👅',
            '👄',
            '🫦',
            {
                'primary': '👶',
                'variants': [
                    '👶🏻',
                    '👶🏼',
                    '👶🏽',
                    '👶🏾',
                    '👶🏿'
                ]
            },
            {
                'primary': '🧒',
                'variants': [
                    '🧒🏻',
                    '🧒🏼',
                    '🧒🏽',
                    '🧒🏾',
                    '🧒🏿'
                ]
            },
            {
                'primary': '👦',
                'variants': [
                    '👦🏻',
                    '👦🏼',
                    '👦🏽',
                    '👦🏾',
                    '👦🏿'
                ]
            },
            {
                'primary': '👧',
                'variants': [
                    '👧🏻',
                    '👧🏼',
                    '👧🏽',
                    '👧🏾',
                    '👧🏿'
                ]
            },
            {
                'primary': '🧑',
                'variants': [
                    '🧑🏻',
                    '🧑🏼',
                    '🧑🏽',
                    '🧑🏾',
                    '🧑🏿',
                    '👱',
                    '👱🏻',
                    '👱🏼',
                    '👱🏽',
                    '👱🏾',
                    '👱🏿'
                ]
            },
            {
                'primary': '👨',
                'variants': [
                    '👨🏻',
                    '👨🏼',
                    '👨🏽',
                    '👨🏾',
                    '👨🏿'
                ]
            },
            {
                'primary': '🧔',
                'variants': [
                    '🧔🏻',
                    '🧔🏼',
                    '🧔🏽',
                    '🧔🏾',
                    '🧔🏿'
                ]
            },
            {
                'primary': '🧔‍♂️',
                'variants': [
                    '🧔‍♂',
                    '🧔🏻‍♂️',
                    '🧔🏻‍♂',
                    '🧔🏼‍♂️',
                    '🧔🏼‍♂',
                    '🧔🏽‍♂️',
                    '🧔🏽‍♂',
                    '🧔🏾‍♂️',
                    '🧔🏾‍♂',
                    '🧔🏿‍♂️',
                    '🧔🏿‍♂'
                ]
            },
            {
                'primary': '🧔‍♀️',
                'variants': [
                    '🧔‍♀',
                    '🧔🏻‍♀️',
                    '🧔🏻‍♀',
                    '🧔🏼‍♀️',
                    '🧔🏼‍♀',
                    '🧔🏽‍♀️',
                    '🧔🏽‍♀',
                    '🧔🏾‍♀️',
                    '🧔🏾‍♀',
                    '🧔🏿‍♀️',
                    '🧔🏿‍♀'
                ]
            },
            {
                'primary': '👨‍🦰',
                'variants': [
                    '👨🏻‍🦰',
                    '👨🏼‍🦰',
                    '👨🏽‍🦰',
                    '👨🏾‍🦰',
                    '👨🏿‍🦰',
                    '👨‍🦱',
                    '👨🏻‍🦱',
                    '👨🏼‍🦱',
                    '👨🏽‍🦱',
                    '👨🏾‍🦱',
                    '👨🏿‍🦱',
                    '👨‍🦳',
                    '👨🏻‍🦳',
                    '👨🏼‍🦳',
                    '👨🏽‍🦳',
                    '👨🏾‍🦳',
                    '👨🏿‍🦳',
                    '👨‍🦲',
                    '👨🏻‍🦲',
                    '👨🏼‍🦲',
                    '👨🏽‍🦲',
                    '👨🏾‍🦲',
                    '👨🏿‍🦲'
                ]
            },
            {
                'primary': '👩',
                'variants': [
                    '👩🏻',
                    '👩🏼',
                    '👩🏽',
                    '👩🏾',
                    '👩🏿',
                    '👩‍🦰',
                    '👩🏻‍🦰',
                    '👩🏼‍🦰',
                    '👩🏽‍🦰',
                    '👩🏾‍🦰',
                    '👩🏿‍🦰'
                ]
            },
            {
                'primary': '🧑‍🦰',
                'variants': [
                    '🧑🏻‍🦰',
                    '🧑🏼‍🦰',
                    '🧑🏽‍🦰',
                    '🧑🏾‍🦰',
                    '🧑🏿‍🦰'
                ]
            },
            {
                'primary': '👩‍🦱',
                'variants': [
                    '👩🏻‍🦱',
                    '👩🏼‍🦱',
                    '👩🏽‍🦱',
                    '👩🏾‍🦱',
                    '👩🏿‍🦱'
                ]
            },
            {
                'primary': '🧑‍🦱',
                'variants': [
                    '🧑🏻‍🦱',
                    '🧑🏼‍🦱',
                    '🧑🏽‍🦱',
                    '🧑🏾‍🦱',
                    '🧑🏿‍🦱'
                ]
            },
            {
                'primary': '👩‍🦳',
                'variants': [
                    '👩🏻‍🦳',
                    '👩🏼‍🦳',
                    '👩🏽‍🦳',
                    '👩🏾‍🦳',
                    '👩🏿‍🦳'
                ]
            },
            {
                'primary': '🧑‍🦳',
                'variants': [
                    '🧑🏻‍🦳',
                    '🧑🏼‍🦳',
                    '🧑🏽‍🦳',
                    '🧑🏾‍🦳',
                    '🧑🏿‍🦳'
                ]
            },
            {
                'primary': '👩‍🦲',
                'variants': [
                    '👩🏻‍🦲',
                    '👩🏼‍🦲',
                    '👩🏽‍🦲',
                    '👩🏾‍🦲',
                    '👩🏿‍🦲'
                ]
            },
            {
                'primary': '🧑‍🦲',
                'variants': [
                    '🧑🏻‍🦲',
                    '🧑🏼‍🦲',
                    '🧑🏽‍🦲',
                    '🧑🏾‍🦲',
                    '🧑🏿‍🦲'
                ]
            },
            {
                'primary': '👱‍♀️',
                'variants': [
                    '👱‍♀',
                    '👱🏻‍♀️',
                    '👱🏻‍♀',
                    '👱🏼‍♀️',
                    '👱🏼‍♀',
                    '👱🏽‍♀️',
                    '👱🏽‍♀',
                    '👱🏾‍♀️',
                    '👱🏾‍♀',
                    '👱🏿‍♀️',
                    '👱🏿‍♀'
                ]
            },
            {
                'primary': '👱‍♂️',
                'variants': [
                    '👱‍♂',
                    '👱🏻‍♂️',
                    '👱🏻‍♂',
                    '👱🏼‍♂️',
                    '👱🏼‍♂',
                    '👱🏽‍♂️',
                    '👱🏽‍♂',
                    '👱🏾‍♂️',
                    '👱🏾‍♂',
                    '👱🏿‍♂️',
                    '👱🏿‍♂'
                ]
            },
            {
                'primary': '🧓',
                'variants': [
                    '🧓🏻',
                    '🧓🏼',
                    '🧓🏽',
                    '🧓🏾',
                    '🧓🏿'
                ]
            },
            {
                'primary': '👴',
                'variants': [
                    '👴🏻',
                    '👴🏼',
                    '👴🏽',
                    '👴🏾',
                    '👴🏿'
                ]
            },
            {
                'primary': '👵',
                'variants': [
                    '👵🏻',
                    '👵🏼',
                    '👵🏽',
                    '👵🏾',
                    '👵🏿'
                ]
            },
            {
                'primary': '🙍',
                'variants': [
                    '🙍🏻',
                    '🙍🏼',
                    '🙍🏽',
                    '🙍🏾',
                    '🙍🏿'
                ]
            },
            {
                'primary': '🙍‍♂️',
                'variants': [
                    '🙍‍♂',
                    '🙍🏻‍♂️',
                    '🙍🏻‍♂',
                    '🙍🏼‍♂️',
                    '🙍🏼‍♂',
                    '🙍🏽‍♂️',
                    '🙍🏽‍♂',
                    '🙍🏾‍♂️',
                    '🙍🏾‍♂',
                    '🙍🏿‍♂️',
                    '🙍🏿‍♂'
                ]
            },
            {
                'primary': '🙍‍♀️',
                'variants': [
                    '🙍‍♀',
                    '🙍🏻‍♀️',
                    '🙍🏻‍♀',
                    '🙍🏼‍♀️',
                    '🙍🏼‍♀',
                    '🙍🏽‍♀️',
                    '🙍🏽‍♀',
                    '🙍🏾‍♀️',
                    '🙍🏾‍♀',
                    '🙍🏿‍♀️',
                    '🙍🏿‍♀'
                ]
            },
            {
                'primary': '🙎',
                'variants': [
                    '🙎🏻',
                    '🙎🏼',
                    '🙎🏽',
                    '🙎🏾',
                    '🙎🏿'
                ]
            },
            {
                'primary': '🙎‍♂️',
                'variants': [
                    '🙎‍♂',
                    '🙎🏻‍♂️',
                    '🙎🏻‍♂',
                    '🙎🏼‍♂️',
                    '🙎🏼‍♂',
                    '🙎🏽‍♂️',
                    '🙎🏽‍♂',
                    '🙎🏾‍♂️',
                    '🙎🏾‍♂',
                    '🙎🏿‍♂️',
                    '🙎🏿‍♂'
                ]
            },
            {
                'primary': '🙎‍♀️',
                'variants': [
                    '🙎‍♀',
                    '🙎🏻‍♀️',
                    '🙎🏻‍♀',
                    '🙎🏼‍♀️',
                    '🙎🏼‍♀',
                    '🙎🏽‍♀️',
                    '🙎🏽‍♀',
                    '🙎🏾‍♀️',
                    '🙎🏾‍♀',
                    '🙎🏿‍♀️',
                    '🙎🏿‍♀'
                ]
            },
            {
                'primary': '🙅',
                'variants': [
                    '🙅🏻',
                    '🙅🏼',
                    '🙅🏽',
                    '🙅🏾',
                    '🙅🏿'
                ]
            },
            {
                'primary': '🙅‍♂️',
                'variants': [
                    '🙅‍♂',
                    '🙅🏻‍♂️',
                    '🙅🏻‍♂',
                    '🙅🏼‍♂️',
                    '🙅🏼‍♂',
                    '🙅🏽‍♂️',
                    '🙅🏽‍♂',
                    '🙅🏾‍♂️',
                    '🙅🏾‍♂',
                    '🙅🏿‍♂️',
                    '🙅🏿‍♂'
                ]
            },
            {
                'primary': '🙅‍♀️',
                'variants': [
                    '🙅‍♀',
                    '🙅🏻‍♀️',
                    '🙅🏻‍♀',
                    '🙅🏼‍♀️',
                    '🙅🏼‍♀',
                    '🙅🏽‍♀️',
                    '🙅🏽‍♀',
                    '🙅🏾‍♀️',
                    '🙅🏾‍♀',
                    '🙅🏿‍♀️',
                    '🙅🏿‍♀'
                ]
            },
            {
                'primary': '🙆',
                'variants': [
                    '🙆🏻',
                    '🙆🏼',
                    '🙆🏽',
                    '🙆🏾',
                    '🙆🏿'
                ]
            },
            {
                'primary': '🙆‍♂️',
                'variants': [
                    '🙆‍♂',
                    '🙆🏻‍♂️',
                    '🙆🏻‍♂',
                    '🙆🏼‍♂️',
                    '🙆🏼‍♂',
                    '🙆🏽‍♂️',
                    '🙆🏽‍♂',
                    '🙆🏾‍♂️',
                    '🙆🏾‍♂',
                    '🙆🏿‍♂️',
                    '🙆🏿‍♂'
                ]
            },
            {
                'primary': '🙆‍♀️',
                'variants': [
                    '🙆‍♀',
                    '🙆🏻‍♀️',
                    '🙆🏻‍♀',
                    '🙆🏼‍♀️',
                    '🙆🏼‍♀',
                    '🙆🏽‍♀️',
                    '🙆🏽‍♀',
                    '🙆🏾‍♀️',
                    '🙆🏾‍♀',
                    '🙆🏿‍♀️',
                    '🙆🏿‍♀'
                ]
            },
            {
                'primary': '💁',
                'variants': [
                    '💁🏻',
                    '💁🏼',
                    '💁🏽',
                    '💁🏾',
                    '💁🏿'
                ]
            },
            {
                'primary': '💁‍♂️',
                'variants': [
                    '💁‍♂',
                    '💁🏻‍♂️',
                    '💁🏻‍♂',
                    '💁🏼‍♂️',
                    '💁🏼‍♂',
                    '💁🏽‍♂️',
                    '💁🏽‍♂',
                    '💁🏾‍♂️',
                    '💁🏾‍♂',
                    '💁🏿‍♂️',
                    '💁🏿‍♂'
                ]
            },
            {
                'primary': '💁‍♀️',
                'variants': [
                    '💁‍♀',
                    '💁🏻‍♀️',
                    '💁🏻‍♀',
                    '💁🏼‍♀️',
                    '💁🏼‍♀',
                    '💁🏽‍♀️',
                    '💁🏽‍♀',
                    '💁🏾‍♀️',
                    '💁🏾‍♀',
                    '💁🏿‍♀️',
                    '💁🏿‍♀'
                ]
            },
            {
                'primary': '🙋',
                'variants': [
                    '🙋🏻',
                    '🙋🏼',
                    '🙋🏽',
                    '🙋🏾',
                    '🙋🏿'
                ]
            },
            {
                'primary': '🙋‍♂️',
                'variants': [
                    '🙋‍♂',
                    '🙋🏻‍♂️',
                    '🙋🏻‍♂',
                    '🙋🏼‍♂️',
                    '🙋🏼‍♂',
                    '🙋🏽‍♂️',
                    '🙋🏽‍♂',
                    '🙋🏾‍♂️',
                    '🙋🏾‍♂',
                    '🙋🏿‍♂️',
                    '🙋🏿‍♂'
                ]
            },
            {
                'primary': '🙋‍♀️',
                'variants': [
                    '🙋‍♀',
                    '🙋🏻‍♀️',
                    '🙋🏻‍♀',
                    '🙋🏼‍♀️',
                    '🙋🏼‍♀',
                    '🙋🏽‍♀️',
                    '🙋🏽‍♀',
                    '🙋🏾‍♀️',
                    '🙋🏾‍♀',
                    '🙋🏿‍♀️',
                    '🙋🏿‍♀'
                ]
            },
            {
                'primary': '🧏',
                'variants': [
                    '🧏🏻',
                    '🧏🏼',
                    '🧏🏽',
                    '🧏🏾',
                    '🧏🏿'
                ]
            },
            {
                'primary': '🧏‍♂️',
                'variants': [
                    '🧏‍♂',
                    '🧏🏻‍♂️',
                    '🧏🏻‍♂',
                    '🧏🏼‍♂️',
                    '🧏🏼‍♂',
                    '🧏🏽‍♂️',
                    '🧏🏽‍♂',
                    '🧏🏾‍♂️',
                    '🧏🏾‍♂',
                    '🧏🏿‍♂️',
                    '🧏🏿‍♂'
                ]
            },
            {
                'primary': '🧏‍♀️',
                'variants': [
                    '🧏‍♀',
                    '🧏🏻‍♀️',
                    '🧏🏻‍♀',
                    '🧏🏼‍♀️',
                    '🧏🏼‍♀',
                    '🧏🏽‍♀️',
                    '🧏🏽‍♀',
                    '🧏🏾‍♀️',
                    '🧏🏾‍♀',
                    '🧏🏿‍♀️',
                    '🧏🏿‍♀'
                ]
            },
            {
                'primary': '🙇',
                'variants': [
                    '🙇🏻',
                    '🙇🏼',
                    '🙇🏽',
                    '🙇🏾',
                    '🙇🏿'
                ]
            },
            {
                'primary': '🙇‍♂️',
                'variants': [
                    '🙇‍♂',
                    '🙇🏻‍♂️',
                    '🙇🏻‍♂',
                    '🙇🏼‍♂️',
                    '🙇🏼‍♂',
                    '🙇🏽‍♂️',
                    '🙇🏽‍♂',
                    '🙇🏾‍♂️',
                    '🙇🏾‍♂',
                    '🙇🏿‍♂️',
                    '🙇🏿‍♂'
                ]
            },
            {
                'primary': '🙇‍♀️',
                'variants': [
                    '🙇‍♀',
                    '🙇🏻‍♀️',
                    '🙇🏻‍♀',
                    '🙇🏼‍♀️',
                    '🙇🏼‍♀',
                    '🙇🏽‍♀️',
                    '🙇🏽‍♀',
                    '🙇🏾‍♀️',
                    '🙇🏾‍♀',
                    '🙇🏿‍♀️',
                    '🙇🏿‍♀'
                ]
            },
            {
                'primary': '🤦',
                'variants': [
                    '🤦🏻',
                    '🤦🏼',
                    '🤦🏽',
                    '🤦🏾',
                    '🤦🏿'
                ]
            },
            {
                'primary': '🤦‍♂️',
                'variants': [
                    '🤦‍♂',
                    '🤦🏻‍♂️',
                    '🤦🏻‍♂',
                    '🤦🏼‍♂️',
                    '🤦🏼‍♂',
                    '🤦🏽‍♂️',
                    '🤦🏽‍♂',
                    '🤦🏾‍♂️',
                    '🤦🏾‍♂',
                    '🤦🏿‍♂️',
                    '🤦🏿‍♂'
                ]
            },
            {
                'primary': '🤦‍♀️',
                'variants': [
                    '🤦‍♀',
                    '🤦🏻‍♀️',
                    '🤦🏻‍♀',
                    '🤦🏼‍♀️',
                    '🤦🏼‍♀',
                    '🤦🏽‍♀️',
                    '🤦🏽‍♀',
                    '🤦🏾‍♀️',
                    '🤦🏾‍♀',
                    '🤦🏿‍♀️',
                    '🤦🏿‍♀'
                ]
            },
            {
                'primary': '🤷',
                'variants': [
                    '🤷🏻',
                    '🤷🏼',
                    '🤷🏽',
                    '🤷🏾',
                    '🤷🏿'
                ]
            },
            {
                'primary': '🤷‍♂️',
                'variants': [
                    '🤷‍♂',
                    '🤷🏻‍♂️',
                    '🤷🏻‍♂',
                    '🤷🏼‍♂️',
                    '🤷🏼‍♂',
                    '🤷🏽‍♂️',
                    '🤷🏽‍♂',
                    '🤷🏾‍♂️',
                    '🤷🏾‍♂',
                    '🤷🏿‍♂️',
                    '🤷🏿‍♂'
                ]
            },
            {
                'primary': '🤷‍♀️',
                'variants': [
                    '🤷‍♀',
                    '🤷🏻‍♀️',
                    '🤷🏻‍♀',
                    '🤷🏼‍♀️',
                    '🤷🏼‍♀',
                    '🤷🏽‍♀️',
                    '🤷🏽‍♀',
                    '🤷🏾‍♀️',
                    '🤷🏾‍♀',
                    '🤷🏿‍♀️',
                    '🤷🏿‍♀'
                ]
            },
            {
                'primary': '🧑‍⚕️',
                'variants': [
                    '🧑‍⚕',
                    '🧑🏻‍⚕️',
                    '🧑🏻‍⚕',
                    '🧑🏼‍⚕️',
                    '🧑🏼‍⚕',
                    '🧑🏽‍⚕️',
                    '🧑🏽‍⚕',
                    '🧑🏾‍⚕️',
                    '🧑🏾‍⚕',
                    '🧑🏿‍⚕️',
                    '🧑🏿‍⚕'
                ]
            },
            {
                'primary': '👨‍⚕️',
                'variants': [
                    '👨‍⚕',
                    '👨🏻‍⚕️',
                    '👨🏻‍⚕',
                    '👨🏼‍⚕️',
                    '👨🏼‍⚕',
                    '👨🏽‍⚕️',
                    '👨🏽‍⚕',
                    '👨🏾‍⚕️',
                    '👨🏾‍⚕',
                    '👨🏿‍⚕️',
                    '👨🏿‍⚕'
                ]
            },
            {
                'primary': '👩‍⚕️',
                'variants': [
                    '👩‍⚕',
                    '👩🏻‍⚕️',
                    '👩🏻‍⚕',
                    '👩🏼‍⚕️',
                    '👩🏼‍⚕',
                    '👩🏽‍⚕️',
                    '👩🏽‍⚕',
                    '👩🏾‍⚕️',
                    '👩🏾‍⚕',
                    '👩🏿‍⚕️',
                    '👩🏿‍⚕'
                ]
            },
            {
                'primary': '🧑‍🎓',
                'variants': [
                    '🧑🏻‍🎓',
                    '🧑🏼‍🎓',
                    '🧑🏽‍🎓',
                    '🧑🏾‍🎓',
                    '🧑🏿‍🎓'
                ]
            },
            {
                'primary': '👨‍🎓',
                'variants': [
                    '👨🏻‍🎓',
                    '👨🏼‍🎓',
                    '👨🏽‍🎓',
                    '👨🏾‍🎓',
                    '👨🏿‍🎓'
                ]
            },
            {
                'primary': '👩‍🎓',
                'variants': [
                    '👩🏻‍🎓',
                    '👩🏼‍🎓',
                    '👩🏽‍🎓',
                    '👩🏾‍🎓',
                    '👩🏿‍🎓'
                ]
            },
            {
                'primary': '🧑‍🏫',
                'variants': [
                    '🧑🏻‍🏫',
                    '🧑🏼‍🏫',
                    '🧑🏽‍🏫',
                    '🧑🏾‍🏫',
                    '🧑🏿‍🏫'
                ]
            },
            {
                'primary': '👨‍🏫',
                'variants': [
                    '👨🏻‍🏫',
                    '👨🏼‍🏫',
                    '👨🏽‍🏫',
                    '👨🏾‍🏫',
                    '👨🏿‍🏫'
                ]
            },
            {
                'primary': '👩‍🏫',
                'variants': [
                    '👩🏻‍🏫',
                    '👩🏼‍🏫',
                    '👩🏽‍🏫',
                    '👩🏾‍🏫',
                    '👩🏿‍🏫'
                ]
            },
            {
                'primary': '🧑‍⚖️',
                'variants': [
                    '🧑‍⚖',
                    '🧑🏻‍⚖️',
                    '🧑🏻‍⚖',
                    '🧑🏼‍⚖️',
                    '🧑🏼‍⚖',
                    '🧑🏽‍⚖️',
                    '🧑🏽‍⚖',
                    '🧑🏾‍⚖️',
                    '🧑🏾‍⚖',
                    '🧑🏿‍⚖️',
                    '🧑🏿‍⚖'
                ]
            },
            {
                'primary': '👨‍⚖️',
                'variants': [
                    '👨‍⚖',
                    '👨🏻‍⚖️',
                    '👨🏻‍⚖',
                    '👨🏼‍⚖️',
                    '👨🏼‍⚖',
                    '👨🏽‍⚖️',
                    '👨🏽‍⚖',
                    '👨🏾‍⚖️',
                    '👨🏾‍⚖',
                    '👨🏿‍⚖️',
                    '👨🏿‍⚖'
                ]
            },
            {
                'primary': '👩‍⚖️',
                'variants': [
                    '👩‍⚖',
                    '👩🏻‍⚖️',
                    '👩🏻‍⚖',
                    '👩🏼‍⚖️',
                    '👩🏼‍⚖',
                    '👩🏽‍⚖️',
                    '👩🏽‍⚖',
                    '👩🏾‍⚖️',
                    '👩🏾‍⚖',
                    '👩🏿‍⚖️',
                    '👩🏿‍⚖'
                ]
            },
            {
                'primary': '🧑‍🌾',
                'variants': [
                    '🧑🏻‍🌾',
                    '🧑🏼‍🌾',
                    '🧑🏽‍🌾',
                    '🧑🏾‍🌾',
                    '🧑🏿‍🌾'
                ]
            },
            {
                'primary': '👨‍🌾',
                'variants': [
                    '👨🏻‍🌾',
                    '👨🏼‍🌾',
                    '👨🏽‍🌾',
                    '👨🏾‍🌾',
                    '👨🏿‍🌾'
                ]
            },
            {
                'primary': '👩‍🌾',
                'variants': [
                    '👩🏻‍🌾',
                    '👩🏼‍🌾',
                    '👩🏽‍🌾',
                    '👩🏾‍🌾',
                    '👩🏿‍🌾'
                ]
            },
            {
                'primary': '🧑‍🍳',
                'variants': [
                    '🧑🏻‍🍳',
                    '🧑🏼‍🍳',
                    '🧑🏽‍🍳',
                    '🧑🏾‍🍳',
                    '🧑🏿‍🍳'
                ]
            },
            {
                'primary': '👨‍🍳',
                'variants': [
                    '👨🏻‍🍳',
                    '👨🏼‍🍳',
                    '👨🏽‍🍳',
                    '👨🏾‍🍳',
                    '👨🏿‍🍳'
                ]
            },
            {
                'primary': '👩‍🍳',
                'variants': [
                    '👩🏻‍🍳',
                    '👩🏼‍🍳',
                    '👩🏽‍🍳',
                    '👩🏾‍🍳',
                    '👩🏿‍🍳'
                ]
            },
            {
                'primary': '🧑‍🔧',
                'variants': [
                    '🧑🏻‍🔧',
                    '🧑🏼‍🔧',
                    '🧑🏽‍🔧',
                    '🧑🏾‍🔧',
                    '🧑🏿‍🔧'
                ]
            },
            {
                'primary': '👨‍🔧',
                'variants': [
                    '👨🏻‍🔧',
                    '👨🏼‍🔧',
                    '👨🏽‍🔧',
                    '👨🏾‍🔧',
                    '👨🏿‍🔧'
                ]
            },
            {
                'primary': '👩‍🔧',
                'variants': [
                    '👩🏻‍🔧',
                    '👩🏼‍🔧',
                    '👩🏽‍🔧',
                    '👩🏾‍🔧',
                    '👩🏿‍🔧'
                ]
            },
            {
                'primary': '🧑‍🏭',
                'variants': [
                    '🧑🏻‍🏭',
                    '🧑🏼‍🏭',
                    '🧑🏽‍🏭',
                    '🧑🏾‍🏭',
                    '🧑🏿‍🏭'
                ]
            },
            {
                'primary': '👨‍🏭',
                'variants': [
                    '👨🏻‍🏭',
                    '👨🏼‍🏭',
                    '👨🏽‍🏭',
                    '👨🏾‍🏭',
                    '👨🏿‍🏭'
                ]
            },
            {
                'primary': '👩‍🏭',
                'variants': [
                    '👩🏻‍🏭',
                    '👩🏼‍🏭',
                    '👩🏽‍🏭',
                    '👩🏾‍🏭',
                    '👩🏿‍🏭'
                ]
            },
            {
                'primary': '🧑‍💼',
                'variants': [
                    '🧑🏻‍💼',
                    '🧑🏼‍💼',
                    '🧑🏽‍💼',
                    '🧑🏾‍💼',
                    '🧑🏿‍💼'
                ]
            },
            {
                'primary': '👨‍💼',
                'variants': [
                    '👨🏻‍💼',
                    '👨🏼‍💼',
                    '👨🏽‍💼',
                    '👨🏾‍💼',
                    '👨🏿‍💼'
                ]
            },
            {
                'primary': '👩‍💼',
                'variants': [
                    '👩🏻‍💼',
                    '👩🏼‍💼',
                    '👩🏽‍💼',
                    '👩🏾‍💼',
                    '👩🏿‍💼'
                ]
            },
            {
                'primary': '🧑‍🔬',
                'variants': [
                    '🧑🏻‍🔬',
                    '🧑🏼‍🔬',
                    '🧑🏽‍🔬',
                    '🧑🏾‍🔬',
                    '🧑🏿‍🔬'
                ]
            },
            {
                'primary': '👨‍🔬',
                'variants': [
                    '👨🏻‍🔬',
                    '👨🏼‍🔬',
                    '👨🏽‍🔬',
                    '👨🏾‍🔬',
                    '👨🏿‍🔬'
                ]
            },
            {
                'primary': '👩‍🔬',
                'variants': [
                    '👩🏻‍🔬',
                    '👩🏼‍🔬',
                    '👩🏽‍🔬',
                    '👩🏾‍🔬',
                    '👩🏿‍🔬'
                ]
            },
            {
                'primary': '🧑‍💻',
                'variants': [
                    '🧑🏻‍💻',
                    '🧑🏼‍💻',
                    '🧑🏽‍💻',
                    '🧑🏾‍💻',
                    '🧑🏿‍💻'
                ]
            },
            {
                'primary': '👨‍💻',
                'variants': [
                    '👨🏻‍💻',
                    '👨🏼‍💻',
                    '👨🏽‍💻',
                    '👨🏾‍💻',
                    '👨🏿‍💻'
                ]
            },
            {
                'primary': '👩‍💻',
                'variants': [
                    '👩🏻‍💻',
                    '👩🏼‍💻',
                    '👩🏽‍💻',
                    '👩🏾‍💻',
                    '👩🏿‍💻'
                ]
            },
            {
                'primary': '🧑‍🎤',
                'variants': [
                    '🧑🏻‍🎤',
                    '🧑🏼‍🎤',
                    '🧑🏽‍🎤',
                    '🧑🏾‍🎤',
                    '🧑🏿‍🎤'
                ]
            },
            {
                'primary': '👨‍🎤',
                'variants': [
                    '👨🏻‍🎤',
                    '👨🏼‍🎤',
                    '👨🏽‍🎤',
                    '👨🏾‍🎤',
                    '👨🏿‍🎤'
                ]
            },
            {
                'primary': '👩‍🎤',
                'variants': [
                    '👩🏻‍🎤',
                    '👩🏼‍🎤',
                    '👩🏽‍🎤',
                    '👩🏾‍🎤',
                    '👩🏿‍🎤'
                ]
            },
            {
                'primary': '🧑‍🎨',
                'variants': [
                    '🧑🏻‍🎨',
                    '🧑🏼‍🎨',
                    '🧑🏽‍🎨',
                    '🧑🏾‍🎨',
                    '🧑🏿‍🎨'
                ]
            },
            {
                'primary': '👨‍🎨',
                'variants': [
                    '👨🏻‍🎨',
                    '👨🏼‍🎨',
                    '👨🏽‍🎨',
                    '👨🏾‍🎨',
                    '👨🏿‍🎨'
                ]
            },
            {
                'primary': '👩‍🎨',
                'variants': [
                    '👩🏻‍🎨',
                    '👩🏼‍🎨',
                    '👩🏽‍🎨',
                    '👩🏾‍🎨',
                    '👩🏿‍🎨'
                ]
            },
            {
                'primary': '🧑‍✈️',
                'variants': [
                    '🧑‍✈',
                    '🧑🏻‍✈️',
                    '🧑🏻‍✈',
                    '🧑🏼‍✈️',
                    '🧑🏼‍✈',
                    '🧑🏽‍✈️',
                    '🧑🏽‍✈',
                    '🧑🏾‍✈️',
                    '🧑🏾‍✈',
                    '🧑🏿‍✈️',
                    '🧑🏿‍✈'
                ]
            },
            {
                'primary': '👨‍✈️',
                'variants': [
                    '👨‍✈',
                    '👨🏻‍✈️',
                    '👨🏻‍✈',
                    '👨🏼‍✈️',
                    '👨🏼‍✈',
                    '👨🏽‍✈️',
                    '👨🏽‍✈',
                    '👨🏾‍✈️',
                    '👨🏾‍✈',
                    '👨🏿‍✈️',
                    '👨🏿‍✈'
                ]
            },
            {
                'primary': '👩‍✈️',
                'variants': [
                    '👩‍✈',
                    '👩🏻‍✈️',
                    '👩🏻‍✈',
                    '👩🏼‍✈️',
                    '👩🏼‍✈',
                    '👩🏽‍✈️',
                    '👩🏽‍✈',
                    '👩🏾‍✈️',
                    '👩🏾‍✈',
                    '👩🏿‍✈️',
                    '👩🏿‍✈'
                ]
            },
            {
                'primary': '🧑‍🚀',
                'variants': [
                    '🧑🏻‍🚀',
                    '🧑🏼‍🚀',
                    '🧑🏽‍🚀',
                    '🧑🏾‍🚀',
                    '🧑🏿‍🚀'
                ]
            },
            {
                'primary': '👨‍🚀',
                'variants': [
                    '👨🏻‍🚀',
                    '👨🏼‍🚀',
                    '👨🏽‍🚀',
                    '👨🏾‍🚀',
                    '👨🏿‍🚀'
                ]
            },
            {
                'primary': '👩‍🚀',
                'variants': [
                    '👩🏻‍🚀',
                    '👩🏼‍🚀',
                    '👩🏽‍🚀',
                    '👩🏾‍🚀',
                    '👩🏿‍🚀'
                ]
            },
            {
                'primary': '🧑‍🚒',
                'variants': [
                    '🧑🏻‍🚒',
                    '🧑🏼‍🚒',
                    '🧑🏽‍🚒',
                    '🧑🏾‍🚒',
                    '🧑🏿‍🚒'
                ]
            },
            {
                'primary': '👨‍🚒',
                'variants': [
                    '👨🏻‍🚒',
                    '👨🏼‍🚒',
                    '👨🏽‍🚒',
                    '👨🏾‍🚒',
                    '👨🏿‍🚒'
                ]
            },
            {
                'primary': '👩‍🚒',
                'variants': [
                    '👩🏻‍🚒',
                    '👩🏼‍🚒',
                    '👩🏽‍🚒',
                    '👩🏾‍🚒',
                    '👩🏿‍🚒'
                ]
            },
            {
                'primary': '👮',
                'variants': [
                    '👮🏻',
                    '👮🏼',
                    '👮🏽',
                    '👮🏾',
                    '👮🏿'
                ]
            },
            {
                'primary': '👮‍♂️',
                'variants': [
                    '👮‍♂',
                    '👮🏻‍♂️',
                    '👮🏻‍♂',
                    '👮🏼‍♂️',
                    '👮🏼‍♂',
                    '👮🏽‍♂️',
                    '👮🏽‍♂',
                    '👮🏾‍♂️',
                    '👮🏾‍♂',
                    '👮🏿‍♂️',
                    '👮🏿‍♂'
                ]
            },
            {
                'primary': '👮‍♀️',
                'variants': [
                    '👮‍♀',
                    '👮🏻‍♀️',
                    '👮🏻‍♀',
                    '👮🏼‍♀️',
                    '👮🏼‍♀',
                    '👮🏽‍♀️',
                    '👮🏽‍♀',
                    '👮🏾‍♀️',
                    '👮🏾‍♀',
                    '👮🏿‍♀️',
                    '👮🏿‍♀'
                ]
            },
            {
                'primary': '🕵️',
                'variants': [
                    '🕵🏻',
                    '🕵🏼',
                    '🕵🏽',
                    '🕵🏾',
                    '🕵🏿'
                ]
            },
            {
                'primary': '🕵️‍♂️',
                'variants': [
                    '🕵🏻‍♂️',
                    '🕵🏻‍♂',
                    '🕵🏼‍♂️',
                    '🕵🏼‍♂',
                    '🕵🏽‍♂️',
                    '🕵🏽‍♂',
                    '🕵🏾‍♂️',
                    '🕵🏾‍♂',
                    '🕵🏿‍♂️',
                    '🕵🏿‍♂'
                ]
            },
            {
                'primary': '🕵️‍♀️',
                'variants': [
                    '🕵🏻‍♀️',
                    '🕵🏻‍♀',
                    '🕵🏼‍♀️',
                    '🕵🏼‍♀',
                    '🕵🏽‍♀️',
                    '🕵🏽‍♀',
                    '🕵🏾‍♀️',
                    '🕵🏾‍♀',
                    '🕵🏿‍♀️',
                    '🕵🏿‍♀'
                ]
            },
            {
                'primary': '💂',
                'variants': [
                    '💂🏻',
                    '💂🏼',
                    '💂🏽',
                    '💂🏾',
                    '💂🏿'
                ]
            },
            {
                'primary': '💂‍♂️',
                'variants': [
                    '💂‍♂',
                    '💂🏻‍♂️',
                    '💂🏻‍♂',
                    '💂🏼‍♂️',
                    '💂🏼‍♂',
                    '💂🏽‍♂️',
                    '💂🏽‍♂',
                    '💂🏾‍♂️',
                    '💂🏾‍♂',
                    '💂🏿‍♂️',
                    '💂🏿‍♂'
                ]
            },
            {
                'primary': '💂‍♀️',
                'variants': [
                    '💂‍♀',
                    '💂🏻‍♀️',
                    '💂🏻‍♀',
                    '💂🏼‍♀️',
                    '💂🏼‍♀',
                    '💂🏽‍♀️',
                    '💂🏽‍♀',
                    '💂🏾‍♀️',
                    '💂🏾‍♀',
                    '💂🏿‍♀️',
                    '💂🏿‍♀'
                ]
            },
            {
                'primary': '🥷',
                'variants': [
                    '🥷🏻',
                    '🥷🏼',
                    '🥷🏽',
                    '🥷🏾',
                    '🥷🏿'
                ]
            },
            {
                'primary': '👷',
                'variants': [
                    '👷🏻',
                    '👷🏼',
                    '👷🏽',
                    '👷🏾',
                    '👷🏿'
                ]
            },
            {
                'primary': '👷‍♂️',
                'variants': [
                    '👷‍♂',
                    '👷🏻‍♂️',
                    '👷🏻‍♂',
                    '👷🏼‍♂️',
                    '👷🏼‍♂',
                    '👷🏽‍♂️',
                    '👷🏽‍♂',
                    '👷🏾‍♂️',
                    '👷🏾‍♂',
                    '👷🏿‍♂️',
                    '👷🏿‍♂'
                ]
            },
            {
                'primary': '👷‍♀️',
                'variants': [
                    '👷‍♀',
                    '👷🏻‍♀️',
                    '👷🏻‍♀',
                    '👷🏼‍♀️',
                    '👷🏼‍♀',
                    '👷🏽‍♀️',
                    '👷🏽‍♀',
                    '👷🏾‍♀️',
                    '👷🏾‍♀',
                    '👷🏿‍♀️',
                    '👷🏿‍♀'
                ]
            },
            {
                'primary': '🫅',
                'variants': [
                    '🫅🏻',
                    '🫅🏼',
                    '🫅🏽',
                    '🫅🏾',
                    '🫅🏿'
                ]
            },
            {
                'primary': '🤴',
                'variants': [
                    '🤴🏻',
                    '🤴🏼',
                    '🤴🏽',
                    '🤴🏾',
                    '🤴🏿'
                ]
            },
            {
                'primary': '👸',
                'variants': [
                    '👸🏻',
                    '👸🏼',
                    '👸🏽',
                    '👸🏾',
                    '👸🏿'
                ]
            },
            {
                'primary': '👳',
                'variants': [
                    '👳🏻',
                    '👳🏼',
                    '👳🏽',
                    '👳🏾',
                    '👳🏿'
                ]
            },
            {
                'primary': '👳‍♂️',
                'variants': [
                    '👳‍♂',
                    '👳🏻‍♂️',
                    '👳🏻‍♂',
                    '👳🏼‍♂️',
                    '👳🏼‍♂',
                    '👳🏽‍♂️',
                    '👳🏽‍♂',
                    '👳🏾‍♂️',
                    '👳🏾‍♂',
                    '👳🏿‍♂️',
                    '👳🏿‍♂'
                ]
            },
            {
                'primary': '👳‍♀️',
                'variants': [
                    '👳‍♀',
                    '👳🏻‍♀️',
                    '👳🏻‍♀',
                    '👳🏼‍♀️',
                    '👳🏼‍♀',
                    '👳🏽‍♀️',
                    '👳🏽‍♀',
                    '👳🏾‍♀️',
                    '👳🏾‍♀',
                    '👳🏿‍♀️',
                    '👳🏿‍♀'
                ]
            },
            {
                'primary': '👲',
                'variants': [
                    '👲🏻',
                    '👲🏼',
                    '👲🏽',
                    '👲🏾',
                    '👲🏿'
                ]
            },
            {
                'primary': '🧕',
                'variants': [
                    '🧕🏻',
                    '🧕🏼',
                    '🧕🏽',
                    '🧕🏾',
                    '🧕🏿'
                ]
            },
            {
                'primary': '🤵',
                'variants': [
                    '🤵🏻',
                    '🤵🏼',
                    '🤵🏽',
                    '🤵🏾',
                    '🤵🏿'
                ]
            },
            {
                'primary': '🤵‍♂️',
                'variants': [
                    '🤵‍♂',
                    '🤵🏻‍♂️',
                    '🤵🏻‍♂',
                    '🤵🏼‍♂️',
                    '🤵🏼‍♂',
                    '🤵🏽‍♂️',
                    '🤵🏽‍♂',
                    '🤵🏾‍♂️',
                    '🤵🏾‍♂',
                    '🤵🏿‍♂️',
                    '🤵🏿‍♂'
                ]
            },
            {
                'primary': '🤵‍♀️',
                'variants': [
                    '🤵‍♀',
                    '🤵🏻‍♀️',
                    '🤵🏻‍♀',
                    '🤵🏼‍♀️',
                    '🤵🏼‍♀',
                    '🤵🏽‍♀️',
                    '🤵🏽‍♀',
                    '🤵🏾‍♀️',
                    '🤵🏾‍♀',
                    '🤵🏿‍♀️',
                    '🤵🏿‍♀'
                ]
            },
            {
                'primary': '👰',
                'variants': [
                    '👰🏻',
                    '👰🏼',
                    '👰🏽',
                    '👰🏾',
                    '👰🏿'
                ]
            },
            {
                'primary': '👰‍♂️',
                'variants': [
                    '👰‍♂',
                    '👰🏻‍♂️',
                    '👰🏻‍♂',
                    '👰🏼‍♂️',
                    '👰🏼‍♂',
                    '👰🏽‍♂️',
                    '👰🏽‍♂',
                    '👰🏾‍♂️',
                    '👰🏾‍♂',
                    '👰🏿‍♂️',
                    '👰🏿‍♂'
                ]
            },
            {
                'primary': '👰‍♀️',
                'variants': [
                    '👰‍♀',
                    '👰🏻‍♀️',
                    '👰🏻‍♀',
                    '👰🏼‍♀️',
                    '👰🏼‍♀',
                    '👰🏽‍♀️',
                    '👰🏽‍♀',
                    '👰🏾‍♀️',
                    '👰🏾‍♀',
                    '👰🏿‍♀️',
                    '👰🏿‍♀'
                ]
            },
            {
                'primary': '🤰',
                'variants': [
                    '🤰🏻',
                    '🤰🏼',
                    '🤰🏽',
                    '🤰🏾',
                    '🤰🏿'
                ]
            },
            {
                'primary': '🫃',
                'variants': [
                    '🫃🏻',
                    '🫃🏼',
                    '🫃🏽',
                    '🫃🏾',
                    '🫃🏿'
                ]
            },
            {
                'primary': '🫄',
                'variants': [
                    '🫄🏻',
                    '🫄🏼',
                    '🫄🏽',
                    '🫄🏾',
                    '🫄🏿'
                ]
            },
            {
                'primary': '🤱',
                'variants': [
                    '🤱🏻',
                    '🤱🏼',
                    '🤱🏽',
                    '🤱🏾',
                    '🤱🏿'
                ]
            },
            {
                'primary': '👩‍🍼',
                'variants': [
                    '👩🏻‍🍼',
                    '👩🏼‍🍼',
                    '👩🏽‍🍼',
                    '👩🏾‍🍼',
                    '👩🏿‍🍼'
                ]
            },
            {
                'primary': '👨‍🍼',
                'variants': [
                    '👨🏻‍🍼',
                    '👨🏼‍🍼',
                    '👨🏽‍🍼',
                    '👨🏾‍🍼',
                    '👨🏿‍🍼'
                ]
            },
            {
                'primary': '🧑‍🍼',
                'variants': [
                    '🧑🏻‍🍼',
                    '🧑🏼‍🍼',
                    '🧑🏽‍🍼',
                    '🧑🏾‍🍼',
                    '🧑🏿‍🍼'
                ]
            },
            {
                'primary': '👼',
                'variants': [
                    '👼🏻',
                    '👼🏼',
                    '👼🏽',
                    '👼🏾',
                    '👼🏿'
                ]
            },
            {
                'primary': '🎅',
                'variants': [
                    '🎅🏻',
                    '🎅🏼',
                    '🎅🏽',
                    '🎅🏾',
                    '🎅🏿'
                ]
            },
            {
                'primary': '🤶',
                'variants': [
                    '🤶🏻',
                    '🤶🏼',
                    '🤶🏽',
                    '🤶🏾',
                    '🤶🏿'
                ]
            },
            {
                'primary': '🧑‍🎄',
                'variants': [
                    '🧑🏻‍🎄',
                    '🧑🏼‍🎄',
                    '🧑🏽‍🎄',
                    '🧑🏾‍🎄',
                    '🧑🏿‍🎄'
                ]
            },
            {
                'primary': '🦸',
                'variants': [
                    '🦸🏻',
                    '🦸🏼',
                    '🦸🏽',
                    '🦸🏾',
                    '🦸🏿'
                ]
            },
            {
                'primary': '🦸‍♂️',
                'variants': [
                    '🦸‍♂',
                    '🦸🏻‍♂️',
                    '🦸🏻‍♂',
                    '🦸🏼‍♂️',
                    '🦸🏼‍♂',
                    '🦸🏽‍♂️',
                    '🦸🏽‍♂',
                    '🦸🏾‍♂️',
                    '🦸🏾‍♂',
                    '🦸🏿‍♂️',
                    '🦸🏿‍♂'
                ]
            },
            {
                'primary': '🦸‍♀️',
                'variants': [
                    '🦸‍♀',
                    '🦸🏻‍♀️',
                    '🦸🏻‍♀',
                    '🦸🏼‍♀️',
                    '🦸🏼‍♀',
                    '🦸🏽‍♀️',
                    '🦸🏽‍♀',
                    '🦸🏾‍♀️',
                    '🦸🏾‍♀',
                    '🦸🏿‍♀️',
                    '🦸🏿‍♀'
                ]
            },
            {
                'primary': '🦹',
                'variants': [
                    '🦹🏻',
                    '🦹🏼',
                    '🦹🏽',
                    '🦹🏾',
                    '🦹🏿'
                ]
            },
            {
                'primary': '🦹‍♂️',
                'variants': [
                    '🦹‍♂',
                    '🦹🏻‍♂️',
                    '🦹🏻‍♂',
                    '🦹🏼‍♂️',
                    '🦹🏼‍♂',
                    '🦹🏽‍♂️',
                    '🦹🏽‍♂',
                    '🦹🏾‍♂️',
                    '🦹🏾‍♂',
                    '🦹🏿‍♂️',
                    '🦹🏿‍♂'
                ]
            },
            {
                'primary': '🦹‍♀️',
                'variants': [
                    '🦹‍♀',
                    '🦹🏻‍♀️',
                    '🦹🏻‍♀',
                    '🦹🏼‍♀️',
                    '🦹🏼‍♀',
                    '🦹🏽‍♀️',
                    '🦹🏽‍♀',
                    '🦹🏾‍♀️',
                    '🦹🏾‍♀',
                    '🦹🏿‍♀️',
                    '🦹🏿‍♀'
                ]
            },
            {
                'primary': '🧙',
                'variants': [
                    '🧙🏻',
                    '🧙🏼',
                    '🧙🏽',
                    '🧙🏾',
                    '🧙🏿'
                ]
            },
            {
                'primary': '🧙‍♂️',
                'variants': [
                    '🧙‍♂',
                    '🧙🏻‍♂️',
                    '🧙🏻‍♂',
                    '🧙🏼‍♂️',
                    '🧙🏼‍♂',
                    '🧙🏽‍♂️',
                    '🧙🏽‍♂',
                    '🧙🏾‍♂️',
                    '🧙🏾‍♂',
                    '🧙🏿‍♂️',
                    '🧙🏿‍♂'
                ]
            },
            {
                'primary': '🧙‍♀️',
                'variants': [
                    '🧙‍♀',
                    '🧙🏻‍♀️',
                    '🧙🏻‍♀',
                    '🧙🏼‍♀️',
                    '🧙🏼‍♀',
                    '🧙🏽‍♀️',
                    '🧙🏽‍♀',
                    '🧙🏾‍♀️',
                    '🧙🏾‍♀',
                    '🧙🏿‍♀️',
                    '🧙🏿‍♀'
                ]
            },
            {
                'primary': '🧚',
                'variants': [
                    '🧚🏻',
                    '🧚🏼',
                    '🧚🏽',
                    '🧚🏾',
                    '🧚🏿'
                ]
            },
            {
                'primary': '🧚‍♂️',
                'variants': [
                    '🧚‍♂',
                    '🧚🏻‍♂️',
                    '🧚🏻‍♂',
                    '🧚🏼‍♂️',
                    '🧚🏼‍♂',
                    '🧚🏽‍♂️',
                    '🧚🏽‍♂',
                    '🧚🏾‍♂️',
                    '🧚🏾‍♂',
                    '🧚🏿‍♂️',
                    '🧚🏿‍♂'
                ]
            },
            {
                'primary': '🧚‍♀️',
                'variants': [
                    '🧚‍♀',
                    '🧚🏻‍♀️',
                    '🧚🏻‍♀',
                    '🧚🏼‍♀️',
                    '🧚🏼‍♀',
                    '🧚🏽‍♀️',
                    '🧚🏽‍♀',
                    '🧚🏾‍♀️',
                    '🧚🏾‍♀',
                    '🧚🏿‍♀️',
                    '🧚🏿‍♀'
                ]
            },
            {
                'primary': '🧛',
                'variants': [
                    '🧛🏻',
                    '🧛🏼',
                    '🧛🏽',
                    '🧛🏾',
                    '🧛🏿'
                ]
            },
            {
                'primary': '🧛‍♂️',
                'variants': [
                    '🧛‍♂',
                    '🧛🏻‍♂️',
                    '🧛🏻‍♂',
                    '🧛🏼‍♂️',
                    '🧛🏼‍♂',
                    '🧛🏽‍♂️',
                    '🧛🏽‍♂',
                    '🧛🏾‍♂️',
                    '🧛🏾‍♂',
                    '🧛🏿‍♂️',
                    '🧛🏿‍♂'
                ]
            },
            {
                'primary': '🧛‍♀️',
                'variants': [
                    '🧛‍♀',
                    '🧛🏻‍♀️',
                    '🧛🏻‍♀',
                    '🧛🏼‍♀️',
                    '🧛🏼‍♀',
                    '🧛🏽‍♀️',
                    '🧛🏽‍♀',
                    '🧛🏾‍♀️',
                    '🧛🏾‍♀',
                    '🧛🏿‍♀️',
                    '🧛🏿‍♀'
                ]
            },
            {
                'primary': '🧜',
                'variants': [
                    '🧜🏻',
                    '🧜🏼',
                    '🧜🏽',
                    '🧜🏾',
                    '🧜🏿'
                ]
            },
            {
                'primary': '🧜‍♂️',
                'variants': [
                    '🧜‍♂',
                    '🧜🏻‍♂️',
                    '🧜🏻‍♂',
                    '🧜🏼‍♂️',
                    '🧜🏼‍♂',
                    '🧜🏽‍♂️',
                    '🧜🏽‍♂',
                    '🧜🏾‍♂️',
                    '🧜🏾‍♂',
                    '🧜🏿‍♂️',
                    '🧜🏿‍♂'
                ]
            },
            {
                'primary': '🧜‍♀️',
                'variants': [
                    '🧜‍♀',
                    '🧜🏻‍♀️',
                    '🧜🏻‍♀',
                    '🧜🏼‍♀️',
                    '🧜🏼‍♀',
                    '🧜🏽‍♀️',
                    '🧜🏽‍♀',
                    '🧜🏾‍♀️',
                    '🧜🏾‍♀',
                    '🧜🏿‍♀️',
                    '🧜🏿‍♀'
                ]
            },
            {
                'primary': '🧝',
                'variants': [
                    '🧝🏻',
                    '🧝🏼',
                    '🧝🏽',
                    '🧝🏾',
                    '🧝🏿'
                ]
            },
            {
                'primary': '🧝‍♂️',
                'variants': [
                    '🧝‍♂',
                    '🧝🏻‍♂️',
                    '🧝🏻‍♂',
                    '🧝🏼‍♂️',
                    '🧝🏼‍♂',
                    '🧝🏽‍♂️',
                    '🧝🏽‍♂',
                    '🧝🏾‍♂️',
                    '🧝🏾‍♂',
                    '🧝🏿‍♂️',
                    '🧝🏿‍♂'
                ]
            },
            {
                'primary': '🧝‍♀️',
                'variants': [
                    '🧝‍♀',
                    '🧝🏻‍♀️',
                    '🧝🏻‍♀',
                    '🧝🏼‍♀️',
                    '🧝🏼‍♀',
                    '🧝🏽‍♀️',
                    '🧝🏽‍♀',
                    '🧝🏾‍♀️',
                    '🧝🏾‍♀',
                    '🧝🏿‍♀️',
                    '🧝🏿‍♀'
                ]
            },
            '🧞',
            {
                'primary': '🧞‍♂️',
                'variants': [
                    '🧞‍♂'
                ]
            },
            {
                'primary': '🧞‍♀️',
                'variants': [
                    '🧞‍♀'
                ]
            },
            '🧟',
            {
                'primary': '🧟‍♂️',
                'variants': [
                    '🧟‍♂'
                ]
            },
            {
                'primary': '🧟‍♀️',
                'variants': [
                    '🧟‍♀'
                ]
            },
            '🧌',
            {
                'primary': '💆',
                'variants': [
                    '💆🏻',
                    '💆🏼',
                    '💆🏽',
                    '💆🏾',
                    '💆🏿'
                ]
            },
            {
                'primary': '💆‍♂️',
                'variants': [
                    '💆‍♂',
                    '💆🏻‍♂️',
                    '💆🏻‍♂',
                    '💆🏼‍♂️',
                    '💆🏼‍♂',
                    '💆🏽‍♂️',
                    '💆🏽‍♂',
                    '💆🏾‍♂️',
                    '💆🏾‍♂',
                    '💆🏿‍♂️',
                    '💆🏿‍♂'
                ]
            },
            {
                'primary': '💆‍♀️',
                'variants': [
                    '💆‍♀',
                    '💆🏻‍♀️',
                    '💆🏻‍♀',
                    '💆🏼‍♀️',
                    '💆🏼‍♀',
                    '💆🏽‍♀️',
                    '💆🏽‍♀',
                    '💆🏾‍♀️',
                    '💆🏾‍♀',
                    '💆🏿‍♀️',
                    '💆🏿‍♀'
                ]
            },
            {
                'primary': '💇',
                'variants': [
                    '💇🏻',
                    '💇🏼',
                    '💇🏽',
                    '💇🏾',
                    '💇🏿'
                ]
            },
            {
                'primary': '💇‍♂️',
                'variants': [
                    '💇‍♂',
                    '💇🏻‍♂️',
                    '💇🏻‍♂',
                    '💇🏼‍♂️',
                    '💇🏼‍♂',
                    '💇🏽‍♂️',
                    '💇🏽‍♂',
                    '💇🏾‍♂️',
                    '💇🏾‍♂',
                    '💇🏿‍♂️',
                    '💇🏿‍♂'
                ]
            },
            {
                'primary': '💇‍♀️',
                'variants': [
                    '💇‍♀',
                    '💇🏻‍♀️',
                    '💇🏻‍♀',
                    '💇🏼‍♀️',
                    '💇🏼‍♀',
                    '💇🏽‍♀️',
                    '💇🏽‍♀',
                    '💇🏾‍♀️',
                    '💇🏾‍♀',
                    '💇🏿‍♀️',
                    '💇🏿‍♀'
                ]
            },
            {
                'primary': '🚶',
                'variants': [
                    '🚶🏻',
                    '🚶🏼',
                    '🚶🏽',
                    '🚶🏾',
                    '🚶🏿'
                ]
            },
            {
                'primary': '🚶‍♂️',
                'variants': [
                    '🚶‍♂',
                    '🚶🏻‍♂️',
                    '🚶🏻‍♂',
                    '🚶🏼‍♂️',
                    '🚶🏼‍♂',
                    '🚶🏽‍♂️',
                    '🚶🏽‍♂',
                    '🚶🏾‍♂️',
                    '🚶🏾‍♂',
                    '🚶🏿‍♂️',
                    '🚶🏿‍♂'
                ]
            },
            {
                'primary': '🚶‍♀️',
                'variants': [
                    '🚶‍♀',
                    '🚶🏻‍♀️',
                    '🚶🏻‍♀',
                    '🚶🏼‍♀️',
                    '🚶🏼‍♀',
                    '🚶🏽‍♀️',
                    '🚶🏽‍♀',
                    '🚶🏾‍♀️',
                    '🚶🏾‍♀',
                    '🚶🏿‍♀️',
                    '🚶🏿‍♀'
                ]
            },
            {
                'primary': '🧍',
                'variants': [
                    '🧍🏻',
                    '🧍🏼',
                    '🧍🏽',
                    '🧍🏾',
                    '🧍🏿'
                ]
            },
            {
                'primary': '🧍‍♂️',
                'variants': [
                    '🧍‍♂',
                    '🧍🏻‍♂️',
                    '🧍🏻‍♂',
                    '🧍🏼‍♂️',
                    '🧍🏼‍♂',
                    '🧍🏽‍♂️',
                    '🧍🏽‍♂',
                    '🧍🏾‍♂️',
                    '🧍🏾‍♂',
                    '🧍🏿‍♂️',
                    '🧍🏿‍♂'
                ]
            },
            {
                'primary': '🧍‍♀️',
                'variants': [
                    '🧍‍♀',
                    '🧍🏻‍♀️',
                    '🧍🏻‍♀',
                    '🧍🏼‍♀️',
                    '🧍🏼‍♀',
                    '🧍🏽‍♀️',
                    '🧍🏽‍♀',
                    '🧍🏾‍♀️',
                    '🧍🏾‍♀',
                    '🧍🏿‍♀️',
                    '🧍🏿‍♀'
                ]
            },
            {
                'primary': '🧎',
                'variants': [
                    '🧎🏻',
                    '🧎🏼',
                    '🧎🏽',
                    '🧎🏾',
                    '🧎🏿'
                ]
            },
            {
                'primary': '🧎‍♂️',
                'variants': [
                    '🧎‍♂',
                    '🧎🏻‍♂️',
                    '🧎🏻‍♂',
                    '🧎🏼‍♂️',
                    '🧎🏼‍♂',
                    '🧎🏽‍♂️',
                    '🧎🏽‍♂',
                    '🧎🏾‍♂️',
                    '🧎🏾‍♂',
                    '🧎🏿‍♂️',
                    '🧎🏿‍♂'
                ]
            },
            {
                'primary': '🧎‍♀️',
                'variants': [
                    '🧎‍♀',
                    '🧎🏻‍♀️',
                    '🧎🏻‍♀',
                    '🧎🏼‍♀️',
                    '🧎🏼‍♀',
                    '🧎🏽‍♀️',
                    '🧎🏽‍♀',
                    '🧎🏾‍♀️',
                    '🧎🏾‍♀',
                    '🧎🏿‍♀️',
                    '🧎🏿‍♀'
                ]
            },
            {
                'primary': '🧑‍🦯',
                'variants': [
                    '🧑🏻‍🦯',
                    '🧑🏼‍🦯',
                    '🧑🏽‍🦯',
                    '🧑🏾‍🦯',
                    '🧑🏿‍🦯'
                ]
            },
            {
                'primary': '👨‍🦯',
                'variants': [
                    '👨🏻‍🦯',
                    '👨🏼‍🦯',
                    '👨🏽‍🦯',
                    '👨🏾‍🦯',
                    '👨🏿‍🦯'
                ]
            },
            {
                'primary': '👩‍🦯',
                'variants': [
                    '👩🏻‍🦯',
                    '👩🏼‍🦯',
                    '👩🏽‍🦯',
                    '👩🏾‍🦯',
                    '👩🏿‍🦯'
                ]
            },
            {
                'primary': '🧑‍🦼',
                'variants': [
                    '🧑🏻‍🦼',
                    '🧑🏼‍🦼',
                    '🧑🏽‍🦼',
                    '🧑🏾‍🦼',
                    '🧑🏿‍🦼'
                ]
            },
            {
                'primary': '👨‍🦼',
                'variants': [
                    '👨🏻‍🦼',
                    '👨🏼‍🦼',
                    '👨🏽‍🦼',
                    '👨🏾‍🦼',
                    '👨🏿‍🦼'
                ]
            },
            {
                'primary': '👩‍🦼',
                'variants': [
                    '👩🏻‍🦼',
                    '👩🏼‍🦼',
                    '👩🏽‍🦼',
                    '👩🏾‍🦼',
                    '👩🏿‍🦼'
                ]
            },
            {
                'primary': '🧑‍🦽',
                'variants': [
                    '🧑🏻‍🦽',
                    '🧑🏼‍🦽',
                    '🧑🏽‍🦽',
                    '🧑🏾‍🦽',
                    '🧑🏿‍🦽'
                ]
            },
            {
                'primary': '👨‍🦽',
                'variants': [
                    '👨🏻‍🦽',
                    '👨🏼‍🦽',
                    '👨🏽‍🦽',
                    '👨🏾‍🦽',
                    '👨🏿‍🦽'
                ]
            },
            {
                'primary': '👩‍🦽',
                'variants': [
                    '👩🏻‍🦽',
                    '👩🏼‍🦽',
                    '👩🏽‍🦽',
                    '👩🏾‍🦽',
                    '👩🏿‍🦽'
                ]
            },
            {
                'primary': '🏃',
                'variants': [
                    '🏃🏻',
                    '🏃🏼',
                    '🏃🏽',
                    '🏃🏾',
                    '🏃🏿'
                ]
            },
            {
                'primary': '🏃‍♂️',
                'variants': [
                    '🏃‍♂',
                    '🏃🏻‍♂️',
                    '🏃🏻‍♂',
                    '🏃🏼‍♂️',
                    '🏃🏼‍♂',
                    '🏃🏽‍♂️',
                    '🏃🏽‍♂',
                    '🏃🏾‍♂️',
                    '🏃🏾‍♂',
                    '🏃🏿‍♂️',
                    '🏃🏿‍♂'
                ]
            },
            {
                'primary': '🏃‍♀️',
                'variants': [
                    '🏃‍♀',
                    '🏃🏻‍♀️',
                    '🏃🏻‍♀',
                    '🏃🏼‍♀️',
                    '🏃🏼‍♀',
                    '🏃🏽‍♀️',
                    '🏃🏽‍♀',
                    '🏃🏾‍♀️',
                    '🏃🏾‍♀',
                    '🏃🏿‍♀️',
                    '🏃🏿‍♀'
                ]
            },
            {
                'primary': '💃',
                'variants': [
                    '💃🏻',
                    '💃🏼',
                    '💃🏽',
                    '💃🏾',
                    '💃🏿'
                ]
            },
            {
                'primary': '🕺',
                'variants': [
                    '🕺🏻',
                    '🕺🏼',
                    '🕺🏽',
                    '🕺🏾',
                    '🕺🏿'
                ]
            },
            {
                'primary': '🕴️',
                'variants': [
                    '🕴🏻',
                    '🕴🏼',
                    '🕴🏽',
                    '🕴🏾',
                    '🕴🏿'
                ]
            },
            '👯',
            {
                'primary': '👯‍♂️',
                'variants': [
                    '👯‍♂'
                ]
            },
            {
                'primary': '👯‍♀️',
                'variants': [
                    '👯‍♀'
                ]
            },
            {
                'primary': '🧖',
                'variants': [
                    '🧖🏻',
                    '🧖🏼',
                    '🧖🏽',
                    '🧖🏾',
                    '🧖🏿'
                ]
            },
            {
                'primary': '🧖‍♂️',
                'variants': [
                    '🧖‍♂',
                    '🧖🏻‍♂️',
                    '🧖🏻‍♂',
                    '🧖🏼‍♂️',
                    '🧖🏼‍♂',
                    '🧖🏽‍♂️',
                    '🧖🏽‍♂',
                    '🧖🏾‍♂️',
                    '🧖🏾‍♂',
                    '🧖🏿‍♂️',
                    '🧖🏿‍♂'
                ]
            },
            {
                'primary': '🧖‍♀️',
                'variants': [
                    '🧖‍♀',
                    '🧖🏻‍♀️',
                    '🧖🏻‍♀',
                    '🧖🏼‍♀️',
                    '🧖🏼‍♀',
                    '🧖🏽‍♀️',
                    '🧖🏽‍♀',
                    '🧖🏾‍♀️',
                    '🧖🏾‍♀',
                    '🧖🏿‍♀️',
                    '🧖🏿‍♀'
                ]
            },
            {
                'primary': '🧗',
                'variants': [
                    '🧗🏻',
                    '🧗🏼',
                    '🧗🏽',
                    '🧗🏾',
                    '🧗🏿'
                ]
            },
            {
                'primary': '🧗‍♂️',
                'variants': [
                    '🧗‍♂',
                    '🧗🏻‍♂️',
                    '🧗🏻‍♂',
                    '🧗🏼‍♂️',
                    '🧗🏼‍♂',
                    '🧗🏽‍♂️',
                    '🧗🏽‍♂',
                    '🧗🏾‍♂️',
                    '🧗🏾‍♂',
                    '🧗🏿‍♂️',
                    '🧗🏿‍♂'
                ]
            },
            {
                'primary': '🧗‍♀️',
                'variants': [
                    '🧗‍♀',
                    '🧗🏻‍♀️',
                    '🧗🏻‍♀',
                    '🧗🏼‍♀️',
                    '🧗🏼‍♀',
                    '🧗🏽‍♀️',
                    '🧗🏽‍♀',
                    '🧗🏾‍♀️',
                    '🧗🏾‍♀',
                    '🧗🏿‍♀️',
                    '🧗🏿‍♀'
                ]
            },
            '🤺',
            {
                'primary': '🏇',
                'variants': [
                    '🏇🏻',
                    '🏇🏼',
                    '🏇🏽',
                    '🏇🏾',
                    '🏇🏿'
                ]
            },
            '⛷️',
            {
                'primary': '🏂',
                'variants': [
                    '🏂🏻',
                    '🏂🏼',
                    '🏂🏽',
                    '🏂🏾',
                    '🏂🏿'
                ]
            },
            {
                'primary': '🏌️',
                'variants': [
                    '🏌🏻',
                    '🏌🏼',
                    '🏌🏽',
                    '🏌🏾',
                    '🏌🏿'
                ]
            },
            {
                'primary': '🏌️‍♂️',
                'variants': [
                    '🏌🏻‍♂️',
                    '🏌🏻‍♂',
                    '🏌🏼‍♂️',
                    '🏌🏼‍♂',
                    '🏌🏽‍♂️',
                    '🏌🏽‍♂',
                    '🏌🏾‍♂️',
                    '🏌🏾‍♂',
                    '🏌🏿‍♂️',
                    '🏌🏿‍♂'
                ]
            },
            {
                'primary': '🏌️‍♀️',
                'variants': [
                    '🏌🏻‍♀️',
                    '🏌🏻‍♀',
                    '🏌🏼‍♀️',
                    '🏌🏼‍♀',
                    '🏌🏽‍♀️',
                    '🏌🏽‍♀',
                    '🏌🏾‍♀️',
                    '🏌🏾‍♀',
                    '🏌🏿‍♀️',
                    '🏌🏿‍♀'
                ]
            },
            {
                'primary': '🏄',
                'variants': [
                    '🏄🏻',
                    '🏄🏼',
                    '🏄🏽',
                    '🏄🏾',
                    '🏄🏿'
                ]
            },
            {
                'primary': '🏄‍♂️',
                'variants': [
                    '🏄‍♂',
                    '🏄🏻‍♂️',
                    '🏄🏻‍♂',
                    '🏄🏼‍♂️',
                    '🏄🏼‍♂',
                    '🏄🏽‍♂️',
                    '🏄🏽‍♂',
                    '🏄🏾‍♂️',
                    '🏄🏾‍♂',
                    '🏄🏿‍♂️',
                    '🏄🏿‍♂'
                ]
            },
            {
                'primary': '🏄‍♀️',
                'variants': [
                    '🏄‍♀',
                    '🏄🏻‍♀️',
                    '🏄🏻‍♀',
                    '🏄🏼‍♀️',
                    '🏄🏼‍♀',
                    '🏄🏽‍♀️',
                    '🏄🏽‍♀',
                    '🏄🏾‍♀️',
                    '🏄🏾‍♀',
                    '🏄🏿‍♀️',
                    '🏄🏿‍♀'
                ]
            },
            {
                'primary': '🚣',
                'variants': [
                    '🚣🏻',
                    '🚣🏼',
                    '🚣🏽',
                    '🚣🏾',
                    '🚣🏿'
                ]
            },
            {
                'primary': '🚣‍♂️',
                'variants': [
                    '🚣‍♂',
                    '🚣🏻‍♂️',
                    '🚣🏻‍♂',
                    '🚣🏼‍♂️',
                    '🚣🏼‍♂',
                    '🚣🏽‍♂️',
                    '🚣🏽‍♂',
                    '🚣🏾‍♂️',
                    '🚣🏾‍♂',
                    '🚣🏿‍♂️',
                    '🚣🏿‍♂'
                ]
            },
            {
                'primary': '🚣‍♀️',
                'variants': [
                    '🚣‍♀',
                    '🚣🏻‍♀️',
                    '🚣🏻‍♀',
                    '🚣🏼‍♀️',
                    '🚣🏼‍♀',
                    '🚣🏽‍♀️',
                    '🚣🏽‍♀',
                    '🚣🏾‍♀️',
                    '🚣🏾‍♀',
                    '🚣🏿‍♀️',
                    '🚣🏿‍♀'
                ]
            },
            {
                'primary': '🏊',
                'variants': [
                    '🏊🏻',
                    '🏊🏼',
                    '🏊🏽',
                    '🏊🏾',
                    '🏊🏿'
                ]
            },
            {
                'primary': '🏊‍♂️',
                'variants': [
                    '🏊‍♂',
                    '🏊🏻‍♂️',
                    '🏊🏻‍♂',
                    '🏊🏼‍♂️',
                    '🏊🏼‍♂',
                    '🏊🏽‍♂️',
                    '🏊🏽‍♂',
                    '🏊🏾‍♂️',
                    '🏊🏾‍♂',
                    '🏊🏿‍♂️',
                    '🏊🏿‍♂'
                ]
            },
            {
                'primary': '🏊‍♀️',
                'variants': [
                    '🏊‍♀',
                    '🏊🏻‍♀️',
                    '🏊🏻‍♀',
                    '🏊🏼‍♀️',
                    '🏊🏼‍♀',
                    '🏊🏽‍♀️',
                    '🏊🏽‍♀',
                    '🏊🏾‍♀️',
                    '🏊🏾‍♀',
                    '🏊🏿‍♀️',
                    '🏊🏿‍♀'
                ]
            },
            {
                'primary': '⛹️',
                'variants': [
                    '⛹🏻',
                    '⛹🏼',
                    '⛹🏽',
                    '⛹🏾',
                    '⛹🏿'
                ]
            },
            {
                'primary': '⛹️‍♂️',
                'variants': [
                    '⛹🏻‍♂️',
                    '⛹🏻‍♂',
                    '⛹🏼‍♂️',
                    '⛹🏼‍♂',
                    '⛹🏽‍♂️',
                    '⛹🏽‍♂',
                    '⛹🏾‍♂️',
                    '⛹🏾‍♂',
                    '⛹🏿‍♂️',
                    '⛹🏿‍♂'
                ]
            },
            {
                'primary': '⛹️‍♀️',
                'variants': [
                    '⛹🏻‍♀️',
                    '⛹🏻‍♀',
                    '⛹🏼‍♀️',
                    '⛹🏼‍♀',
                    '⛹🏽‍♀️',
                    '⛹🏽‍♀',
                    '⛹🏾‍♀️',
                    '⛹🏾‍♀',
                    '⛹🏿‍♀️',
                    '⛹🏿‍♀'
                ]
            },
            {
                'primary': '🏋️',
                'variants': [
                    '🏋🏻',
                    '🏋🏼',
                    '🏋🏽',
                    '🏋🏾',
                    '🏋🏿'
                ]
            },
            {
                'primary': '🏋️‍♂️',
                'variants': [
                    '🏋🏻‍♂️',
                    '🏋🏻‍♂',
                    '🏋🏼‍♂️',
                    '🏋🏼‍♂',
                    '🏋🏽‍♂️',
                    '🏋🏽‍♂',
                    '🏋🏾‍♂️',
                    '🏋🏾‍♂',
                    '🏋🏿‍♂️',
                    '🏋🏿‍♂'
                ]
            },
            {
                'primary': '🏋️‍♀️',
                'variants': [
                    '🏋🏻‍♀️',
                    '🏋🏻‍♀',
                    '🏋🏼‍♀️',
                    '🏋🏼‍♀',
                    '🏋🏽‍♀️',
                    '🏋🏽‍♀',
                    '🏋🏾‍♀️',
                    '🏋🏾‍♀',
                    '🏋🏿‍♀️',
                    '🏋🏿‍♀'
                ]
            },
            {
                'primary': '🚴',
                'variants': [
                    '🚴🏻',
                    '🚴🏼',
                    '🚴🏽',
                    '🚴🏾',
                    '🚴🏿'
                ]
            },
            {
                'primary': '🚴‍♂️',
                'variants': [
                    '🚴‍♂',
                    '🚴🏻‍♂️',
                    '🚴🏻‍♂',
                    '🚴🏼‍♂️',
                    '🚴🏼‍♂',
                    '🚴🏽‍♂️',
                    '🚴🏽‍♂',
                    '🚴🏾‍♂️',
                    '🚴🏾‍♂',
                    '🚴🏿‍♂️',
                    '🚴🏿‍♂'
                ]
            },
            {
                'primary': '🚴‍♀️',
                'variants': [
                    '🚴‍♀',
                    '🚴🏻‍♀️',
                    '🚴🏻‍♀',
                    '🚴🏼‍♀️',
                    '🚴🏼‍♀',
                    '🚴🏽‍♀️',
                    '🚴🏽‍♀',
                    '🚴🏾‍♀️',
                    '🚴🏾‍♀',
                    '🚴🏿‍♀️',
                    '🚴🏿‍♀'
                ]
            },
            {
                'primary': '🚵',
                'variants': [
                    '🚵🏻',
                    '🚵🏼',
                    '🚵🏽',
                    '🚵🏾',
                    '🚵🏿'
                ]
            },
            {
                'primary': '🚵‍♂️',
                'variants': [
                    '🚵‍♂',
                    '🚵🏻‍♂️',
                    '🚵🏻‍♂',
                    '🚵🏼‍♂️',
                    '🚵🏼‍♂',
                    '🚵🏽‍♂️',
                    '🚵🏽‍♂',
                    '🚵🏾‍♂️',
                    '🚵🏾‍♂',
                    '🚵🏿‍♂️',
                    '🚵🏿‍♂'
                ]
            },
            {
                'primary': '🚵‍♀️',
                'variants': [
                    '🚵‍♀',
                    '🚵🏻‍♀️',
                    '🚵🏻‍♀',
                    '🚵🏼‍♀️',
                    '🚵🏼‍♀',
                    '🚵🏽‍♀️',
                    '🚵🏽‍♀',
                    '🚵🏾‍♀️',
                    '🚵🏾‍♀',
                    '🚵🏿‍♀️',
                    '🚵🏿‍♀'
                ]
            },
            {
                'primary': '🤸',
                'variants': [
                    '🤸🏻',
                    '🤸🏼',
                    '🤸🏽',
                    '🤸🏾',
                    '🤸🏿'
                ]
            },
            {
                'primary': '🤸‍♂️',
                'variants': [
                    '🤸‍♂',
                    '🤸🏻‍♂️',
                    '🤸🏻‍♂',
                    '🤸🏼‍♂️',
                    '🤸🏼‍♂',
                    '🤸🏽‍♂️',
                    '🤸🏽‍♂',
                    '🤸🏾‍♂️',
                    '🤸🏾‍♂',
                    '🤸🏿‍♂️',
                    '🤸🏿‍♂'
                ]
            },
            {
                'primary': '🤸‍♀️',
                'variants': [
                    '🤸‍♀',
                    '🤸🏻‍♀️',
                    '🤸🏻‍♀',
                    '🤸🏼‍♀️',
                    '🤸🏼‍♀',
                    '🤸🏽‍♀️',
                    '🤸🏽‍♀',
                    '🤸🏾‍♀️',
                    '🤸🏾‍♀',
                    '🤸🏿‍♀️',
                    '🤸🏿‍♀'
                ]
            },
            '🤼',
            {
                'primary': '🤼‍♂️',
                'variants': [
                    '🤼‍♂'
                ]
            },
            {
                'primary': '🤼‍♀️',
                'variants': [
                    '🤼‍♀'
                ]
            },
            {
                'primary': '🤽',
                'variants': [
                    '🤽🏻',
                    '🤽🏼',
                    '🤽🏽',
                    '🤽🏾',
                    '🤽🏿'
                ]
            },
            {
                'primary': '🤽‍♂️',
                'variants': [
                    '🤽‍♂',
                    '🤽🏻‍♂️',
                    '🤽🏻‍♂',
                    '🤽🏼‍♂️',
                    '🤽🏼‍♂',
                    '🤽🏽‍♂️',
                    '🤽🏽‍♂',
                    '🤽🏾‍♂️',
                    '🤽🏾‍♂',
                    '🤽🏿‍♂️',
                    '🤽🏿‍♂'
                ]
            },
            {
                'primary': '🤽‍♀️',
                'variants': [
                    '🤽‍♀',
                    '🤽🏻‍♀️',
                    '🤽🏻‍♀',
                    '🤽🏼‍♀️',
                    '🤽🏼‍♀',
                    '🤽🏽‍♀️',
                    '🤽🏽‍♀',
                    '🤽🏾‍♀️',
                    '🤽🏾‍♀',
                    '🤽🏿‍♀️',
                    '🤽🏿‍♀'
                ]
            },
            {
                'primary': '🤾',
                'variants': [
                    '🤾🏻',
                    '🤾🏼',
                    '🤾🏽',
                    '🤾🏾',
                    '🤾🏿'
                ]
            },
            {
                'primary': '🤾‍♂️',
                'variants': [
                    '🤾‍♂',
                    '🤾🏻‍♂️',
                    '🤾🏻‍♂',
                    '🤾🏼‍♂️',
                    '🤾🏼‍♂',
                    '🤾🏽‍♂️',
                    '🤾🏽‍♂',
                    '🤾🏾‍♂️',
                    '🤾🏾‍♂',
                    '🤾🏿‍♂️',
                    '🤾🏿‍♂'
                ]
            },
            {
                'primary': '🤾‍♀️',
                'variants': [
                    '🤾‍♀',
                    '🤾🏻‍♀️',
                    '🤾🏻‍♀',
                    '🤾🏼‍♀️',
                    '🤾🏼‍♀',
                    '🤾🏽‍♀️',
                    '🤾🏽‍♀',
                    '🤾🏾‍♀️',
                    '🤾🏾‍♀',
                    '🤾🏿‍♀️',
                    '🤾🏿‍♀'
                ]
            },
            {
                'primary': '🤹',
                'variants': [
                    '🤹🏻',
                    '🤹🏼',
                    '🤹🏽',
                    '🤹🏾',
                    '🤹🏿'
                ]
            },
            {
                'primary': '🤹‍♂️',
                'variants': [
                    '🤹‍♂',
                    '🤹🏻‍♂️',
                    '🤹🏻‍♂',
                    '🤹🏼‍♂️',
                    '🤹🏼‍♂',
                    '🤹🏽‍♂️',
                    '🤹🏽‍♂',
                    '🤹🏾‍♂️',
                    '🤹🏾‍♂',
                    '🤹🏿‍♂️',
                    '🤹🏿‍♂'
                ]
            },
            {
                'primary': '🤹‍♀️',
                'variants': [
                    '🤹‍♀',
                    '🤹🏻‍♀️',
                    '🤹🏻‍♀',
                    '🤹🏼‍♀️',
                    '🤹🏼‍♀',
                    '🤹🏽‍♀️',
                    '🤹🏽‍♀',
                    '🤹🏾‍♀️',
                    '🤹🏾‍♀',
                    '🤹🏿‍♀️',
                    '🤹🏿‍♀'
                ]
            },
            {
                'primary': '🧘',
                'variants': [
                    '🧘🏻',
                    '🧘🏼',
                    '🧘🏽',
                    '🧘🏾',
                    '🧘🏿'
                ]
            },
            {
                'primary': '🧘‍♂️',
                'variants': [
                    '🧘‍♂',
                    '🧘🏻‍♂️',
                    '🧘🏻‍♂',
                    '🧘🏼‍♂️',
                    '🧘🏼‍♂',
                    '🧘🏽‍♂️',
                    '🧘🏽‍♂',
                    '🧘🏾‍♂️',
                    '🧘🏾‍♂',
                    '🧘🏿‍♂️',
                    '🧘🏿‍♂'
                ]
            },
            {
                'primary': '🧘‍♀️',
                'variants': [
                    '🧘‍♀',
                    '🧘🏻‍♀️',
                    '🧘🏻‍♀',
                    '🧘🏼‍♀️',
                    '🧘🏼‍♀',
                    '🧘🏽‍♀️',
                    '🧘🏽‍♀',
                    '🧘🏾‍♀️',
                    '🧘🏾‍♀',
                    '🧘🏿‍♀️',
                    '🧘🏿‍♀'
                ]
            },
            {
                'primary': '🛀',
                'variants': [
                    '🛀🏻',
                    '🛀🏼',
                    '🛀🏽',
                    '🛀🏾',
                    '🛀🏿'
                ]
            },
            {
                'primary': '🛌',
                'variants': [
                    '🛌🏻',
                    '🛌🏼',
                    '🛌🏽',
                    '🛌🏾',
                    '🛌🏿'
                ]
            },
            {
                'primary': '🧑‍🤝‍🧑',
                'variants': [
                    '🧑🏻‍🤝‍🧑🏻',
                    '🧑🏻‍🤝‍🧑🏼',
                    '🧑🏻‍🤝‍🧑🏽',
                    '🧑🏻‍🤝‍🧑🏾',
                    '🧑🏻‍🤝‍🧑🏿',
                    '🧑🏼‍🤝‍🧑🏻',
                    '🧑🏼‍🤝‍🧑🏼',
                    '🧑🏼‍🤝‍🧑🏽',
                    '🧑🏼‍🤝‍🧑🏾',
                    '🧑🏼‍🤝‍🧑🏿',
                    '🧑🏽‍🤝‍🧑🏻',
                    '🧑🏽‍🤝‍🧑🏼',
                    '🧑🏽‍🤝‍🧑🏽',
                    '🧑🏽‍🤝‍🧑🏾',
                    '🧑🏽‍🤝‍🧑🏿',
                    '🧑🏾‍🤝‍🧑🏻',
                    '🧑🏾‍🤝‍🧑🏼',
                    '🧑🏾‍🤝‍🧑🏽',
                    '🧑🏾‍🤝‍🧑🏾',
                    '🧑🏾‍🤝‍🧑🏿',
                    '🧑🏿‍🤝‍🧑🏻',
                    '🧑🏿‍🤝‍🧑🏼',
                    '🧑🏿‍🤝‍🧑🏽',
                    '🧑🏿‍🤝‍🧑🏾',
                    '🧑🏿‍🤝‍🧑🏿'
                ]
            },
            {
                'primary': '👭',
                'variants': [
                    '👭🏻',
                    '👩🏻‍🤝‍👩🏼',
                    '👩🏻‍🤝‍👩🏽',
                    '👩🏻‍🤝‍👩🏾',
                    '👩🏻‍🤝‍👩🏿',
                    '👩🏼‍🤝‍👩🏻',
                    '👭🏼',
                    '👩🏼‍🤝‍👩🏽',
                    '👩🏼‍🤝‍👩🏾',
                    '👩🏼‍🤝‍👩🏿',
                    '👩🏽‍🤝‍👩🏻',
                    '👩🏽‍🤝‍👩🏼',
                    '👭🏽',
                    '👩🏽‍🤝‍👩🏾',
                    '👩🏽‍🤝‍👩🏿',
                    '👩🏾‍🤝‍👩🏻',
                    '👩🏾‍🤝‍👩🏼',
                    '👩🏾‍🤝‍👩🏽',
                    '👭🏾',
                    '👩🏾‍🤝‍👩🏿',
                    '👩🏿‍🤝‍👩🏻',
                    '👩🏿‍🤝‍👩🏼',
                    '👩🏿‍🤝‍👩🏽',
                    '👩🏿‍🤝‍👩🏾',
                    '👭🏿'
                ]
            },
            {
                'primary': '👫',
                'variants': [
                    '👫🏻',
                    '👩🏻‍🤝‍👨🏼',
                    '👩🏻‍🤝‍👨🏽',
                    '👩🏻‍🤝‍👨🏾',
                    '👩🏻‍🤝‍👨🏿',
                    '👩🏼‍🤝‍👨🏻',
                    '👫🏼',
                    '👩🏼‍🤝‍👨🏽',
                    '👩🏼‍🤝‍👨🏾',
                    '👩🏼‍🤝‍👨🏿',
                    '👩🏽‍🤝‍👨🏻',
                    '👩🏽‍🤝‍👨🏼',
                    '👫🏽',
                    '👩🏽‍🤝‍👨🏾',
                    '👩🏽‍🤝‍👨🏿',
                    '👩🏾‍🤝‍👨🏻',
                    '👩🏾‍🤝‍👨🏼',
                    '👩🏾‍🤝‍👨🏽',
                    '👫🏾',
                    '👩🏾‍🤝‍👨🏿',
                    '👩🏿‍🤝‍👨🏻',
                    '👩🏿‍🤝‍👨🏼',
                    '👩🏿‍🤝‍👨🏽',
                    '👩🏿‍🤝‍👨🏾',
                    '👫🏿'
                ]
            },
            {
                'primary': '👬',
                'variants': [
                    '👬🏻',
                    '👨🏻‍🤝‍👨🏼',
                    '👨🏻‍🤝‍👨🏽',
                    '👨🏻‍🤝‍👨🏾',
                    '👨🏻‍🤝‍👨🏿',
                    '👨🏼‍🤝‍👨🏻',
                    '👬🏼',
                    '👨🏼‍🤝‍👨🏽',
                    '👨🏼‍🤝‍👨🏾',
                    '👨🏼‍🤝‍👨🏿',
                    '👨🏽‍🤝‍👨🏻',
                    '👨🏽‍🤝‍👨🏼',
                    '👬🏽',
                    '👨🏽‍🤝‍👨🏾',
                    '👨🏽‍🤝‍👨🏿',
                    '👨🏾‍🤝‍👨🏻',
                    '👨🏾‍🤝‍👨🏼',
                    '👨🏾‍🤝‍👨🏽',
                    '👬🏾',
                    '👨🏾‍🤝‍👨🏿',
                    '👨🏿‍🤝‍👨🏻',
                    '👨🏿‍🤝‍👨🏼',
                    '👨🏿‍🤝‍👨🏽',
                    '👨🏿‍🤝‍👨🏾',
                    '👬🏿'
                ]
            },
            {
                'primary': '💏',
                'variants': [
                    '💏🏻',
                    '💏🏼',
                    '💏🏽',
                    '💏🏾',
                    '💏🏿',
                    '🧑🏻‍❤️‍💋‍🧑🏼',
                    '🧑🏻‍❤‍💋‍🧑🏼',
                    '🧑🏻‍❤️‍💋‍🧑🏽',
                    '🧑🏻‍❤‍💋‍🧑🏽',
                    '🧑🏻‍❤️‍💋‍🧑🏾',
                    '🧑🏻‍❤‍💋‍🧑🏾',
                    '🧑🏻‍❤️‍💋‍🧑🏿',
                    '🧑🏻‍❤‍💋‍🧑🏿',
                    '🧑🏼‍❤️‍💋‍🧑🏻',
                    '🧑🏼‍❤‍💋‍🧑🏻',
                    '🧑🏼‍❤️‍💋‍🧑🏽',
                    '🧑🏼‍❤‍💋‍🧑🏽',
                    '🧑🏼‍❤️‍💋‍🧑🏾',
                    '🧑🏼‍❤‍💋‍🧑🏾',
                    '🧑🏼‍❤️‍💋‍🧑🏿',
                    '🧑🏼‍❤‍💋‍🧑🏿',
                    '🧑🏽‍❤️‍💋‍🧑🏻',
                    '🧑🏽‍❤‍💋‍🧑🏻',
                    '🧑🏽‍❤️‍💋‍🧑🏼',
                    '🧑🏽‍❤‍💋‍🧑🏼',
                    '🧑🏽‍❤️‍💋‍🧑🏾',
                    '🧑🏽‍❤‍💋‍🧑🏾',
                    '🧑🏽‍❤️‍💋‍🧑🏿',
                    '🧑🏽‍❤‍💋‍🧑🏿',
                    '🧑🏾‍❤️‍💋‍🧑🏻',
                    '🧑🏾‍❤‍💋‍🧑🏻',
                    '🧑🏾‍❤️‍💋‍🧑🏼',
                    '🧑🏾‍❤‍💋‍🧑🏼',
                    '🧑🏾‍❤️‍💋‍🧑🏽',
                    '🧑🏾‍❤‍💋‍🧑🏽',
                    '🧑🏾‍❤️‍💋‍🧑🏿',
                    '🧑🏾‍❤‍💋‍🧑🏿',
                    '🧑🏿‍❤️‍💋‍🧑🏻',
                    '🧑🏿‍❤‍💋‍🧑🏻',
                    '🧑🏿‍❤️‍💋‍🧑🏼',
                    '🧑🏿‍❤‍💋‍🧑🏼',
                    '🧑🏿‍❤️‍💋‍🧑🏽',
                    '🧑🏿‍❤‍💋‍🧑🏽',
                    '🧑🏿‍❤️‍💋‍🧑🏾',
                    '🧑🏿‍❤‍💋‍🧑🏾',
                    '👩‍❤️‍💋‍👨',
                    '👩‍❤‍💋‍👨',
                    '👩🏻‍❤️‍💋‍👨🏻',
                    '👩🏻‍❤‍💋‍👨🏻',
                    '👩🏻‍❤️‍💋‍👨🏼',
                    '👩🏻‍❤‍💋‍👨🏼',
                    '👩🏻‍❤️‍💋‍👨🏽',
                    '👩🏻‍❤‍💋‍👨🏽',
                    '👩🏻‍❤️‍💋‍👨🏾',
                    '👩🏻‍❤‍💋‍👨🏾',
                    '👩🏻‍❤️‍💋‍👨🏿',
                    '👩🏻‍❤‍💋‍👨🏿',
                    '👩🏼‍❤️‍💋‍👨🏻',
                    '👩🏼‍❤‍💋‍👨🏻',
                    '👩🏼‍❤️‍💋‍👨🏼',
                    '👩🏼‍❤‍💋‍👨🏼',
                    '👩🏼‍❤️‍💋‍👨🏽',
                    '👩🏼‍❤‍💋‍👨🏽',
                    '👩🏼‍❤️‍💋‍👨🏾',
                    '👩🏼‍❤‍💋‍👨🏾',
                    '👩🏼‍❤️‍💋‍👨🏿',
                    '👩🏼‍❤‍💋‍👨🏿',
                    '👩🏽‍❤️‍💋‍👨🏻',
                    '👩🏽‍❤‍💋‍👨🏻',
                    '👩🏽‍❤️‍💋‍👨🏼',
                    '👩🏽‍❤‍💋‍👨🏼',
                    '👩🏽‍❤️‍💋‍👨🏽',
                    '👩🏽‍❤‍💋‍👨🏽',
                    '👩🏽‍❤️‍💋‍👨🏾',
                    '👩🏽‍❤‍💋‍👨🏾',
                    '👩🏽‍❤️‍💋‍👨🏿',
                    '👩🏽‍❤‍💋‍👨🏿',
                    '👩🏾‍❤️‍💋‍👨🏻',
                    '👩🏾‍❤‍💋‍👨🏻',
                    '👩🏾‍❤️‍💋‍👨🏼',
                    '👩🏾‍❤‍💋‍👨🏼',
                    '👩🏾‍❤️‍💋‍👨🏽',
                    '👩🏾‍❤‍💋‍👨🏽',
                    '👩🏾‍❤️‍💋‍👨🏾',
                    '👩🏾‍❤‍💋‍👨🏾',
                    '👩🏾‍❤️‍💋‍👨🏿',
                    '👩🏾‍❤‍💋‍👨🏿',
                    '👩🏿‍❤️‍💋‍👨🏻',
                    '👩🏿‍❤‍💋‍👨🏻',
                    '👩🏿‍❤️‍💋‍👨🏼',
                    '👩🏿‍❤‍💋‍👨🏼',
                    '👩🏿‍❤️‍💋‍👨🏽',
                    '👩🏿‍❤‍💋‍👨🏽',
                    '👩🏿‍❤️‍💋‍👨🏾',
                    '👩🏿‍❤‍💋‍👨🏾',
                    '👩🏿‍❤️‍💋‍👨🏿',
                    '👩🏿‍❤‍💋‍👨🏿',
                    '👨‍❤️‍💋‍👨',
                    '👨‍❤‍💋‍👨',
                    '👨🏻‍❤️‍💋‍👨🏻',
                    '👨🏻‍❤‍💋‍👨🏻',
                    '👨🏻‍❤️‍💋‍👨🏼',
                    '👨🏻‍❤‍💋‍👨🏼',
                    '👨🏻‍❤️‍💋‍👨🏽',
                    '👨🏻‍❤‍💋‍👨🏽',
                    '👨🏻‍❤️‍💋‍👨🏾',
                    '👨🏻‍❤‍💋‍👨🏾',
                    '👨🏻‍❤️‍💋‍👨🏿',
                    '👨🏻‍❤‍💋‍👨🏿',
                    '👨🏼‍❤️‍💋‍👨🏻',
                    '👨🏼‍❤‍💋‍👨🏻',
                    '👨🏼‍❤️‍💋‍👨🏼',
                    '👨🏼‍❤‍💋‍👨🏼',
                    '👨🏼‍❤️‍💋‍👨🏽',
                    '👨🏼‍❤‍💋‍👨🏽',
                    '👨🏼‍❤️‍💋‍👨🏾',
                    '👨🏼‍❤‍💋‍👨🏾',
                    '👨🏼‍❤️‍💋‍👨🏿',
                    '👨🏼‍❤‍💋‍👨🏿',
                    '👨🏽‍❤️‍💋‍👨🏻',
                    '👨🏽‍❤‍💋‍👨🏻',
                    '👨🏽‍❤️‍💋‍👨🏼',
                    '👨🏽‍❤‍💋‍👨🏼',
                    '👨🏽‍❤️‍💋‍👨🏽',
                    '👨🏽‍❤‍💋‍👨🏽',
                    '👨🏽‍❤️‍💋‍👨🏾',
                    '👨🏽‍❤‍💋‍👨🏾',
                    '👨🏽‍❤️‍💋‍👨🏿',
                    '👨🏽‍❤‍💋‍👨🏿',
                    '👨🏾‍❤️‍💋‍👨🏻',
                    '👨🏾‍❤‍💋‍👨🏻',
                    '👨🏾‍❤️‍💋‍👨🏼',
                    '👨🏾‍❤‍💋‍👨🏼',
                    '👨🏾‍❤️‍💋‍👨🏽',
                    '👨🏾‍❤‍💋‍👨🏽',
                    '👨🏾‍❤️‍💋‍👨🏾',
                    '👨🏾‍❤‍💋‍👨🏾',
                    '👨🏾‍❤️‍💋‍👨🏿',
                    '👨🏾‍❤‍💋‍👨🏿',
                    '👨🏿‍❤️‍💋‍👨🏻',
                    '👨🏿‍❤‍💋‍👨🏻',
                    '👨🏿‍❤️‍💋‍👨🏼',
                    '👨🏿‍❤‍💋‍👨🏼',
                    '👨🏿‍❤️‍💋‍👨🏽',
                    '👨🏿‍❤‍💋‍👨🏽',
                    '👨🏿‍❤️‍💋‍👨🏾',
                    '👨🏿‍❤‍💋‍👨🏾',
                    '👨🏿‍❤️‍💋‍👨🏿',
                    '👨🏿‍❤‍💋‍👨🏿',
                    '👩‍❤️‍💋‍👩',
                    '👩‍❤‍💋‍👩',
                    '👩🏻‍❤️‍💋‍👩🏻',
                    '👩🏻‍❤‍💋‍👩🏻',
                    '👩🏻‍❤️‍💋‍👩🏼',
                    '👩🏻‍❤‍💋‍👩🏼',
                    '👩🏻‍❤️‍💋‍👩🏽',
                    '👩🏻‍❤‍💋‍👩🏽',
                    '👩🏻‍❤️‍💋‍👩🏾',
                    '👩🏻‍❤‍💋‍👩🏾',
                    '👩🏻‍❤️‍💋‍👩🏿',
                    '👩🏻‍❤‍💋‍👩🏿',
                    '👩🏼‍❤️‍💋‍👩🏻',
                    '👩🏼‍❤‍💋‍👩🏻',
                    '👩🏼‍❤️‍💋‍👩🏼',
                    '👩🏼‍❤‍💋‍👩🏼',
                    '👩🏼‍❤️‍💋‍👩🏽',
                    '👩🏼‍❤‍💋‍👩🏽',
                    '👩🏼‍❤️‍💋‍👩🏾',
                    '👩🏼‍❤‍💋‍👩🏾',
                    '👩🏼‍❤️‍💋‍👩🏿',
                    '👩🏼‍❤‍💋‍👩🏿',
                    '👩🏽‍❤️‍💋‍👩🏻',
                    '👩🏽‍❤‍💋‍👩🏻',
                    '👩🏽‍❤️‍💋‍👩🏼',
                    '👩🏽‍❤‍💋‍👩🏼',
                    '👩🏽‍❤️‍💋‍👩🏽',
                    '👩🏽‍❤‍💋‍👩🏽',
                    '👩🏽‍❤️‍💋‍👩🏾',
                    '👩🏽‍❤‍💋‍👩🏾',
                    '👩🏽‍❤️‍💋‍👩🏿',
                    '👩🏽‍❤‍💋‍👩🏿',
                    '👩🏾‍❤️‍💋‍👩🏻',
                    '👩🏾‍❤‍💋‍👩🏻',
                    '👩🏾‍❤️‍💋‍👩🏼',
                    '👩🏾‍❤‍💋‍👩🏼',
                    '👩🏾‍❤️‍💋‍👩🏽',
                    '👩🏾‍❤‍💋‍👩🏽',
                    '👩🏾‍❤️‍💋‍👩🏾',
                    '👩🏾‍❤‍💋‍👩🏾',
                    '👩🏾‍❤️‍💋‍👩🏿',
                    '👩🏾‍❤‍💋‍👩🏿',
                    '👩🏿‍❤️‍💋‍👩🏻',
                    '👩🏿‍❤‍💋‍👩🏻',
                    '👩🏿‍❤️‍💋‍👩🏼',
                    '👩🏿‍❤‍💋‍👩🏼',
                    '👩🏿‍❤️‍💋‍👩🏽',
                    '👩🏿‍❤‍💋‍👩🏽',
                    '👩🏿‍❤️‍💋‍👩🏾',
                    '👩🏿‍❤‍💋‍👩🏾',
                    '👩🏿‍❤️‍💋‍👩🏿',
                    '👩🏿‍❤‍💋‍👩🏿'
                ]
            },
            {
                'primary': '💑',
                'variants': [
                    '💑🏻',
                    '💑🏼',
                    '💑🏽',
                    '💑🏾',
                    '💑🏿',
                    '🧑🏻‍❤️‍🧑🏼',
                    '🧑🏻‍❤‍🧑🏼',
                    '🧑🏻‍❤️‍🧑🏽',
                    '🧑🏻‍❤‍🧑🏽',
                    '🧑🏻‍❤️‍🧑🏾',
                    '🧑🏻‍❤‍🧑🏾',
                    '🧑🏻‍❤️‍🧑🏿',
                    '🧑🏻‍❤‍🧑🏿',
                    '🧑🏼‍❤️‍🧑🏻',
                    '🧑🏼‍❤‍🧑🏻',
                    '🧑🏼‍❤️‍🧑🏽',
                    '🧑🏼‍❤‍🧑🏽',
                    '🧑🏼‍❤️‍🧑🏾',
                    '🧑🏼‍❤‍🧑🏾',
                    '🧑🏼‍❤️‍🧑🏿',
                    '🧑🏼‍❤‍🧑🏿',
                    '🧑🏽‍❤️‍🧑🏻',
                    '🧑🏽‍❤‍🧑🏻',
                    '🧑🏽‍❤️‍🧑🏼',
                    '🧑🏽‍❤‍🧑🏼',
                    '🧑🏽‍❤️‍🧑🏾',
                    '🧑🏽‍❤‍🧑🏾',
                    '🧑🏽‍❤️‍🧑🏿',
                    '🧑🏽‍❤‍🧑🏿',
                    '🧑🏾‍❤️‍🧑🏻',
                    '🧑🏾‍❤‍🧑🏻',
                    '🧑🏾‍❤️‍🧑🏼',
                    '🧑🏾‍❤‍🧑🏼',
                    '🧑🏾‍❤️‍🧑🏽',
                    '🧑🏾‍❤‍🧑🏽',
                    '🧑🏾‍❤️‍🧑🏿',
                    '🧑🏾‍❤‍🧑🏿',
                    '🧑🏿‍❤️‍🧑🏻',
                    '🧑🏿‍❤‍🧑🏻',
                    '🧑🏿‍❤️‍🧑🏼',
                    '🧑🏿‍❤‍🧑🏼',
                    '🧑🏿‍❤️‍🧑🏽',
                    '🧑🏿‍❤‍🧑🏽',
                    '🧑🏿‍❤️‍🧑🏾',
                    '🧑🏿‍❤‍🧑🏾',
                    '👩‍❤️‍👨',
                    '👩‍❤‍👨',
                    '👩🏻‍❤️‍👨🏻',
                    '👩🏻‍❤‍👨🏻',
                    '👩🏻‍❤️‍👨🏼',
                    '👩🏻‍❤‍👨🏼',
                    '👩🏻‍❤️‍👨🏽',
                    '👩🏻‍❤‍👨🏽',
                    '👩🏻‍❤️‍👨🏾',
                    '👩🏻‍❤‍👨🏾',
                    '👩🏻‍❤️‍👨🏿',
                    '👩🏻‍❤‍👨🏿',
                    '👩🏼‍❤️‍👨🏻',
                    '👩🏼‍❤‍👨🏻',
                    '👩🏼‍❤️‍👨🏼',
                    '👩🏼‍❤‍👨🏼',
                    '👩🏼‍❤️‍👨🏽',
                    '👩🏼‍❤‍👨🏽',
                    '👩🏼‍❤️‍👨🏾',
                    '👩🏼‍❤‍👨🏾',
                    '👩🏼‍❤️‍👨🏿',
                    '👩🏼‍❤‍👨🏿',
                    '👩🏽‍❤️‍👨🏻',
                    '👩🏽‍❤‍👨🏻',
                    '👩🏽‍❤️‍👨🏼',
                    '👩🏽‍❤‍👨🏼',
                    '👩🏽‍❤️‍👨🏽',
                    '👩🏽‍❤‍👨🏽',
                    '👩🏽‍❤️‍👨🏾',
                    '👩🏽‍❤‍👨🏾',
                    '👩🏽‍❤️‍👨🏿',
                    '👩🏽‍❤‍👨🏿',
                    '👩🏾‍❤️‍👨🏻',
                    '👩🏾‍❤‍👨🏻',
                    '👩🏾‍❤️‍👨🏼',
                    '👩🏾‍❤‍👨🏼',
                    '👩🏾‍❤️‍👨🏽',
                    '👩🏾‍❤‍👨🏽',
                    '👩🏾‍❤️‍👨🏾',
                    '👩🏾‍❤‍👨🏾',
                    '👩🏾‍❤️‍👨🏿',
                    '👩🏾‍❤‍👨🏿',
                    '👩🏿‍❤️‍👨🏻',
                    '👩🏿‍❤‍👨🏻',
                    '👩🏿‍❤️‍👨🏼',
                    '👩🏿‍❤‍👨🏼',
                    '👩🏿‍❤️‍👨🏽',
                    '👩🏿‍❤‍👨🏽',
                    '👩🏿‍❤️‍👨🏾',
                    '👩🏿‍❤‍👨🏾',
                    '👩🏿‍❤️‍👨🏿',
                    '👩🏿‍❤‍👨🏿',
                    '👨‍❤️‍👨',
                    '👨‍❤‍👨',
                    '👨🏻‍❤️‍👨🏻',
                    '👨🏻‍❤‍👨🏻',
                    '👨🏻‍❤️‍👨🏼',
                    '👨🏻‍❤‍👨🏼',
                    '👨🏻‍❤️‍👨🏽',
                    '👨🏻‍❤‍👨🏽',
                    '👨🏻‍❤️‍👨🏾',
                    '👨🏻‍❤‍👨🏾',
                    '👨🏻‍❤️‍👨🏿',
                    '👨🏻‍❤‍👨🏿',
                    '👨🏼‍❤️‍👨🏻',
                    '👨🏼‍❤‍👨🏻',
                    '👨🏼‍❤️‍👨🏼',
                    '👨🏼‍❤‍👨🏼',
                    '👨🏼‍❤️‍👨🏽',
                    '👨🏼‍❤‍👨🏽',
                    '👨🏼‍❤️‍👨🏾',
                    '👨🏼‍❤‍👨🏾',
                    '👨🏼‍❤️‍👨🏿',
                    '👨🏼‍❤‍👨🏿',
                    '👨🏽‍❤️‍👨🏻',
                    '👨🏽‍❤‍👨🏻',
                    '👨🏽‍❤️‍👨🏼',
                    '👨🏽‍❤‍👨🏼',
                    '👨🏽‍❤️‍👨🏽',
                    '👨🏽‍❤‍👨🏽',
                    '👨🏽‍❤️‍👨🏾',
                    '👨🏽‍❤‍👨🏾',
                    '👨🏽‍❤️‍👨🏿',
                    '👨🏽‍❤‍👨🏿',
                    '👨🏾‍❤️‍👨🏻',
                    '👨🏾‍❤‍👨🏻',
                    '👨🏾‍❤️‍👨🏼',
                    '👨🏾‍❤‍👨🏼',
                    '👨🏾‍❤️‍👨🏽',
                    '👨🏾‍❤‍👨🏽',
                    '👨🏾‍❤️‍👨🏾',
                    '👨🏾‍❤‍👨🏾',
                    '👨🏾‍❤️‍👨🏿',
                    '👨🏾‍❤‍👨🏿',
                    '👨🏿‍❤️‍👨🏻',
                    '👨🏿‍❤‍👨🏻',
                    '👨🏿‍❤️‍👨🏼',
                    '👨🏿‍❤‍👨🏼',
                    '👨🏿‍❤️‍👨🏽',
                    '👨🏿‍❤‍👨🏽',
                    '👨🏿‍❤️‍👨🏾',
                    '👨🏿‍❤‍👨🏾',
                    '👨🏿‍❤️‍👨🏿',
                    '👨🏿‍❤‍👨🏿',
                    '👩‍❤️‍👩',
                    '👩‍❤‍👩',
                    '👩🏻‍❤️‍👩🏻',
                    '👩🏻‍❤‍👩🏻',
                    '👩🏻‍❤️‍👩🏼',
                    '👩🏻‍❤‍👩🏼',
                    '👩🏻‍❤️‍👩🏽',
                    '👩🏻‍❤‍👩🏽',
                    '👩🏻‍❤️‍👩🏾',
                    '👩🏻‍❤‍👩🏾',
                    '👩🏻‍❤️‍👩🏿',
                    '👩🏻‍❤‍👩🏿',
                    '👩🏼‍❤️‍👩🏻',
                    '👩🏼‍❤‍👩🏻',
                    '👩🏼‍❤️‍👩🏼',
                    '👩🏼‍❤‍👩🏼',
                    '👩🏼‍❤️‍👩🏽',
                    '👩🏼‍❤‍👩🏽',
                    '👩🏼‍❤️‍👩🏾',
                    '👩🏼‍❤‍👩🏾',
                    '👩🏼‍❤️‍👩🏿',
                    '👩🏼‍❤‍👩🏿',
                    '👩🏽‍❤️‍👩🏻',
                    '👩🏽‍❤‍👩🏻',
                    '👩🏽‍❤️‍👩🏼',
                    '👩🏽‍❤‍👩🏼',
                    '👩🏽‍❤️‍👩🏽',
                    '👩🏽‍❤‍👩🏽',
                    '👩🏽‍❤️‍👩🏾',
                    '👩🏽‍❤‍👩🏾',
                    '👩🏽‍❤️‍👩🏿',
                    '👩🏽‍❤‍👩🏿',
                    '👩🏾‍❤️‍👩🏻',
                    '👩🏾‍❤‍👩🏻',
                    '👩🏾‍❤️‍👩🏼',
                    '👩🏾‍❤‍👩🏼',
                    '👩🏾‍❤️‍👩🏽',
                    '👩🏾‍❤‍👩🏽',
                    '👩🏾‍❤️‍👩🏾',
                    '👩🏾‍❤‍👩🏾',
                    '👩🏾‍❤️‍👩🏿',
                    '👩🏾‍❤‍👩🏿',
                    '👩🏿‍❤️‍👩🏻',
                    '👩🏿‍❤‍👩🏻',
                    '👩🏿‍❤️‍👩🏼',
                    '👩🏿‍❤‍👩🏼',
                    '👩🏿‍❤️‍👩🏽',
                    '👩🏿‍❤‍👩🏽',
                    '👩🏿‍❤️‍👩🏾',
                    '👩🏿‍❤‍👩🏾',
                    '👩🏿‍❤️‍👩🏿',
                    '👩🏿‍❤‍👩🏿'
                ]
            },
            {
                'primary': '👪',
                'variants': [
                    '👨‍👩‍👦',
                    '👨‍👩‍👧',
                    '👨‍👩‍👧‍👦',
                    '👨‍👩‍👦‍👦',
                    '👨‍👩‍👧‍👧',
                    '👨‍👨‍👦',
                    '👨‍👨‍👧',
                    '👨‍👨‍👧‍👦',
                    '👨‍👨‍👦‍👦',
                    '👨‍👨‍👧‍👧',
                    '👩‍👩‍👦',
                    '👩‍👩‍👧',
                    '👩‍👩‍👧‍👦',
                    '👩‍👩‍👦‍👦',
                    '👩‍👩‍👧‍👧',
                    '👨‍👦',
                    '👨‍👦‍👦',
                    '👨‍👧',
                    '👨‍👧‍👦',
                    '👨‍👧‍👧',
                    '👩‍👦',
                    '👩‍👦‍👦',
                    '👩‍👧',
                    '👩‍👧‍👦',
                    '👩‍👧‍👧'
                ]
            },
            '🗣️',
            '👤',
            '👥',
            '🫂',
            '👣',
            '🏻',
            '🏼',
            '🏽',
            '🏾',
            '🏿',
            '🦰',
            '🦱',
            '🦳',
            '🦲'
        ]
    },
    {
        'name': 'Animals & Nature',
        'emojis': [
            '🐵',
            '🐒',
            '🦍',
            '🦧',
            '🐶',
            '🐕',
            '🦮',
            '🐕‍🦺',
            '🐩',
            '🐺',
            '🦊',
            '🦝',
            '🐱',
            '🐈',
            '🐈‍⬛',
            '🦁',
            '🐯',
            '🐅',
            '🐆',
            '🐴',
            '🐎',
            '🦄',
            '🦓',
            '🦌',
            '🦬',
            '🐮',
            '🐂',
            '🐃',
            '🐄',
            '🐷',
            '🐖',
            '🐗',
            '🐽',
            '🐏',
            '🐑',
            '🐐',
            '🐪',
            '🐫',
            '🦙',
            '🦒',
            '🐘',
            '🦣',
            '🦏',
            '🦛',
            '🐭',
            '🐁',
            '🐀',
            '🐹',
            '🐰',
            '🐇',
            '🐿️',
            '🦫',
            '🦔',
            '🦇',
            '🐻',
            {
                'primary': '🐻‍❄️',
                'variants': [
                    '🐻‍❄'
                ]
            },
            '🐨',
            '🐼',
            '🦥',
            '🦦',
            '🦨',
            '🦘',
            '🦡',
            '🐾',
            '🦃',
            '🐔',
            '🐓',
            '🐣',
            '🐤',
            '🐥',
            '🐦',
            '🐧',
            '🕊️',
            '🦅',
            '🦆',
            '🦢',
            '🦉',
            '🦤',
            '🪶',
            '🦩',
            '🦚',
            '🦜',
            '🐸',
            '🐊',
            '🐢',
            '🦎',
            '🐍',
            '🐲',
            '🐉',
            '🦕',
            '🦖',
            '🐳',
            '🐋',
            '🐬',
            '🦭',
            '🐟',
            '🐠',
            '🐡',
            '🦈',
            '🐙',
            '🐚',
            '🪸',
            '🐌',
            '🦋',
            '🐛',
            '🐜',
            '🐝',
            '🪲',
            '🐞',
            '🦗',
            '🪳',
            '🕷️',
            '🕸️',
            '🦂',
            '🦟',
            '🪰',
            '🪱',
            '🦠',
            '💐',
            '🌸',
            '💮',
            '🪷',
            '🏵️',
            '🌹',
            '🥀',
            '🌺',
            '🌻',
            '🌼',
            '🌷',
            '🌱',
            '🪴',
            '🌲',
            '🌳',
            '🌴',
            '🌵',
            '🌾',
            '🌿',
            '☘️',
            '🍀',
            '🍁',
            '🍂',
            '🍃',
            '🪹',
            '🪺'
        ]
    },
    {
        'name': 'Food & Drink',
        'emojis': [
            '🍇',
            '🍈',
            '🍉',
            '🍊',
            '🍋',
            '🍌',
            '🍍',
            '🥭',
            '🍎',
            '🍏',
            '🍐',
            '🍑',
            '🍒',
            '🍓',
            '🫐',
            '🥝',
            '🍅',
            '🫒',
            '🥥',
            '🥑',
            '🍆',
            '🥔',
            '🥕',
            '🌽',
            '🌶️',
            '🫑',
            '🥒',
            '🥬',
            '🥦',
            '🧄',
            '🧅',
            '🍄',
            '🥜',
            '🫘',
            '🌰',
            '🍞',
            '🥐',
            '🥖',
            '🫓',
            '🥨',
            '🥯',
            '🥞',
            '🧇',
            '🧀',
            '🍖',
            '🍗',
            '🥩',
            '🥓',
            '🍔',
            '🍟',
            '🍕',
            '🌭',
            '🥪',
            '🌮',
            '🌯',
            '🫔',
            '🥙',
            '🧆',
            '🥚',
            '🍳',
            '🥘',
            '🍲',
            '🫕',
            '🥣',
            '🥗',
            '🍿',
            '🧈',
            '🧂',
            '🥫',
            '🍱',
            '🍘',
            '🍙',
            '🍚',
            '🍛',
            '🍜',
            '🍝',
            '🍠',
            '🍢',
            '🍣',
            '🍤',
            '🍥',
            '🥮',
            '🍡',
            '🥟',
            '🥠',
            '🥡',
            '🦀',
            '🦞',
            '🦐',
            '🦑',
            '🦪',
            '🍦',
            '🍧',
            '🍨',
            '🍩',
            '🍪',
            '🎂',
            '🍰',
            '🧁',
            '🥧',
            '🍫',
            '🍬',
            '🍭',
            '🍮',
            '🍯',
            '🍼',
            '🥛',
            '☕',
            '🫖',
            '🍵',
            '🍶',
            '🍾',
            '🍷',
            '🍸',
            '🍹',
            '🍺',
            '🍻',
            '🥂',
            '🥃',
            '🫗',
            '🥤',
            '🧋',
            '🧃',
            '🧉',
            '🧊',
            '🥢',
            '🍽️',
            '🍴',
            '🥄',
            '🔪',
            '🫙',
            '🏺'
        ]
    },
    {
        'name': 'Travel & Places',
        'emojis': [
            '🌍',
            '🌎',
            '🌏',
            '🌐',
            '🗺️',
            '🗾',
            '🧭',
            '🏔️',
            '⛰️',
            '🌋',
            '🗻',
            '🏕️',
            '🏖️',
            '🏜️',
            '🏝️',
            '🏞️',
            '🏟️',
            '🏛️',
            '🏗️',
            '🧱',
            '🪨',
            '🪵',
            '🛖',
            '🏘️',
            '🏚️',
            '🏠',
            '🏡',
            '🏢',
            '🏣',
            '🏤',
            '🏥',
            '🏦',
            '🏨',
            '🏩',
            '🏪',
            '🏫',
            '🏬',
            '🏭',
            '🏯',
            '🏰',
            '💒',
            '🗼',
            '🗽',
            '⛪',
            '🕌',
            '🛕',
            '🕍',
            '⛩️',
            '🕋',
            '⛲',
            '⛺',
            '🌁',
            '🌃',
            '🏙️',
            '🌄',
            '🌅',
            '🌆',
            '🌇',
            '🌉',
            '♨️',
            '🎠',
            '🛝',
            '🎡',
            '🎢',
            '💈',
            '🎪',
            '🚂',
            '🚃',
            '🚄',
            '🚅',
            '🚆',
            '🚇',
            '🚈',
            '🚉',
            '🚊',
            '🚝',
            '🚞',
            '🚋',
            '🚌',
            '🚍',
            '🚎',
            '🚐',
            '🚑',
            '🚒',
            '🚓',
            '🚔',
            '🚕',
            '🚖',
            '🚗',
            '🚘',
            '🚙',
            '🛻',
            '🚚',
            '🚛',
            '🚜',
            '🏎️',
            '🏍️',
            '🛵',
            '🦽',
            '🦼',
            '🛺',
            '🚲',
            '🛴',
            '🛹',
            '🛼',
            '🚏',
            '🛣️',
            '🛤️',
            '🛢️',
            '⛽',
            '🛞',
            '🚨',
            '🚥',
            '🚦',
            '🛑',
            '🚧',
            '⚓',
            '🛟',
            '⛵',
            '🛶',
            '🚤',
            '🛳️',
            '⛴️',
            '🛥️',
            '🚢',
            '✈️',
            '🛩️',
            '🛫',
            '🛬',
            '🪂',
            '💺',
            '🚁',
            '🚟',
            '🚠',
            '🚡',
            '🛰️',
            '🚀',
            '🛸',
            '🛎️',
            '🧳',
            '⌛',
            '⏳',
            '⌚',
            '⏰',
            '⏱️',
            '⏲️',
            '🕰️',
            '🕛',
            '🕧',
            '🕐',
            '🕜',
            '🕑',
            '🕝',
            '🕒',
            '🕞',
            '🕓',
            '🕟',
            '🕔',
            '🕠',
            '🕕',
            '🕡',
            '🕖',
            '🕢',
            '🕗',
            '🕣',
            '🕘',
            '🕤',
            '🕙',
            '🕥',
            '🕚',
            '🕦',
            '🌑',
            '🌒',
            '🌓',
            '🌔',
            '🌕',
            '🌖',
            '🌗',
            '🌘',
            '🌙',
            '🌚',
            '🌛',
            '🌜',
            '🌡️',
            '☀️',
            '🌝',
            '🌞',
            '🪐',
            '⭐',
            '🌟',
            '🌠',
            '🌌',
            '☁️',
            '⛅',
            '⛈️',
            '🌤️',
            '🌥️',
            '🌦️',
            '🌧️',
            '🌨️',
            '🌩️',
            '🌪️',
            '🌫️',
            '🌬️',
            '🌀',
            '🌈',
            '🌂',
            '☂️',
            '☔',
            '⛱️',
            '⚡',
            '❄️',
            '☃️',
            '⛄',
            '☄️',
            '🔥',
            '💧',
            '🌊'
        ]
    },
    {
        'name': 'Activities',
        'emojis': [
            '🎃',
            '🎄',
            '🎆',
            '🎇',
            '🧨',
            '✨',
            '🎈',
            '🎉',
            '🎊',
            '🎋',
            '🎍',
            '🎎',
            '🎏',
            '🎐',
            '🎑',
            '🧧',
            '🎀',
            '🎁',
            '🎗️',
            '🎟️',
            '🎫',
            '🎖️',
            '🏆',
            '🏅',
            '🥇',
            '🥈',
            '🥉',
            '⚽',
            '⚾',
            '🥎',
            '🏀',
            '🏐',
            '🏈',
            '🏉',
            '🎾',
            '🥏',
            '🎳',
            '🏏',
            '🏑',
            '🏒',
            '🥍',
            '🏓',
            '🏸',
            '🥊',
            '🥋',
            '🥅',
            '⛳',
            '⛸️',
            '🎣',
            '🤿',
            '🎽',
            '🎿',
            '🛷',
            '🥌',
            '🎯',
            '🪀',
            '🪁',
            '🎱',
            '🔮',
            '🪄',
            '🧿',
            '🪬',
            '🎮',
            '🕹️',
            '🎰',
            '🎲',
            '🧩',
            '🧸',
            '🪅',
            '🪩',
            '🪆',
            '♠️',
            '♥️',
            '♦️',
            '♣️',
            '♟️',
            '🃏',
            '🀄',
            '🎴',
            '🎭',
            '🖼️',
            '🎨',
            '🧵',
            '🪡',
            '🧶',
            '🪢'
        ]
    },
    {
        'name': 'Objects',
        'emojis': [
            '👓',
            '🕶️',
            '🥽',
            '🥼',
            '🦺',
            '👔',
            '👕',
            '👖',
            '🧣',
            '🧤',
            '🧥',
            '🧦',
            '👗',
            '👘',
            '🥻',
            '🩱',
            '🩲',
            '🩳',
            '👙',
            '👚',
            '👛',
            '👜',
            '👝',
            '🛍️',
            '🎒',
            '🩴',
            '👞',
            '👟',
            '🥾',
            '🥿',
            '👠',
            '👡',
            '🩰',
            '👢',
            '👑',
            '👒',
            '🎩',
            '🎓',
            '🧢',
            '🪖',
            '⛑️',
            '📿',
            '💄',
            '💍',
            '💎',
            '🔇',
            '🔈',
            '🔉',
            '🔊',
            '📢',
            '📣',
            '📯',
            '🔔',
            '🔕',
            '🎼',
            '🎵',
            '🎶',
            '🎙️',
            '🎚️',
            '🎛️',
            '🎤',
            '🎧',
            '📻',
            '🎷',
            '🪗',
            '🎸',
            '🎹',
            '🎺',
            '🎻',
            '🪕',
            '🥁',
            '🪘',
            '📱',
            '📲',
            '☎️',
            '📞',
            '📟',
            '📠',
            '🔋',
            '🪫',
            '🔌',
            '💻',
            '🖥️',
            '🖨️',
            '⌨️',
            '🖱️',
            '🖲️',
            '💽',
            '💾',
            '💿',
            '📀',
            '🧮',
            '🎥',
            '🎞️',
            '📽️',
            '🎬',
            '📺',
            '📷',
            '📸',
            '📹',
            '📼',
            '🔍',
            '🔎',
            '🕯️',
            '💡',
            '🔦',
            '🏮',
            '🪔',
            '📔',
            '📕',
            '📖',
            '📗',
            '📘',
            '📙',
            '📚',
            '📓',
            '📒',
            '📃',
            '📜',
            '📄',
            '📰',
            '🗞️',
            '📑',
            '🔖',
            '🏷️',
            '💰',
            '🪙',
            '💴',
            '💵',
            '💶',
            '💷',
            '💸',
            '💳',
            '🧾',
            '💹',
            '✉️',
            '📧',
            '📨',
            '📩',
            '📤',
            '📥',
            '📦',
            '📫',
            '📪',
            '📬',
            '📭',
            '📮',
            '🗳️',
            '✏️',
            '✒️',
            '🖋️',
            '🖊️',
            '🖌️',
            '🖍️',
            '📝',
            '💼',
            '📁',
            '📂',
            '🗂️',
            '📅',
            '📆',
            '🗒️',
            '🗓️',
            '📇',
            '📈',
            '📉',
            '📊',
            '📋',
            '📌',
            '📍',
            '📎',
            '🖇️',
            '📏',
            '📐',
            '✂️',
            '🗃️',
            '🗄️',
            '🗑️',
            '🔒',
            '🔓',
            '🔏',
            '🔐',
            '🔑',
            '🗝️',
            '🔨',
            '🪓',
            '⛏️',
            '⚒️',
            '🛠️',
            '🗡️',
            '⚔️',
            '🔫',
            '🪃',
            '🏹',
            '🛡️',
            '🪚',
            '🔧',
            '🪛',
            '🔩',
            '⚙️',
            '🗜️',
            '⚖️',
            '🦯',
            '🔗',
            '⛓️',
            '🪝',
            '🧰',
            '🧲',
            '🪜',
            '⚗️',
            '🧪',
            '🧫',
            '🧬',
            '🔬',
            '🔭',
            '📡',
            '💉',
            '🩸',
            '💊',
            '🩹',
            '🩼',
            '🩺',
            '🩻',
            '🚪',
            '🛗',
            '🪞',
            '🪟',
            '🛏️',
            '🛋️',
            '🪑',
            '🚽',
            '🪠',
            '🚿',
            '🛁',
            '🪤',
            '🪒',
            '🧴',
            '🧷',
            '🧹',
            '🧺',
            '🧻',
            '🪣',
            '🧼',
            '🫧',
            '🪥',
            '🧽',
            '🧯',
            '🛒',
            '🚬',
            '⚰️',
            '🪦',
            '⚱️',
            '🗿',
            '🪧',
            '🪪'
        ]
    },
    {
        'name': 'Symbols',
        'emojis': [
            '🏧',
            '🚮',
            '🚰',
            '♿',
            '🚹',
            '🚺',
            '🚻',
            '🚼',
            '🚾',
            '🛂',
            '🛃',
            '🛄',
            '🛅',
            '⚠️',
            '🚸',
            '⛔',
            '🚫',
            '🚳',
            '🚭',
            '🚯',
            '🚱',
            '🚷',
            '📵',
            '🔞',
            '☢️',
            '☣️',
            '⬆️',
            '↗️',
            '➡️',
            '↘️',
            '⬇️',
            '↙️',
            '⬅️',
            '↖️',
            '↕️',
            '↔️',
            '↩️',
            '↪️',
            '⤴️',
            '⤵️',
            '🔃',
            '🔄',
            '🔙',
            '🔚',
            '🔛',
            '🔜',
            '🔝',
            '🛐',
            '⚛️',
            '🕉️',
            '✡️',
            '☸️',
            '☯️',
            '✝️',
            '☦️',
            '☪️',
            '☮️',
            '🕎',
            '🔯',
            '♈',
            '♉',
            '♊',
            '♋',
            '♌',
            '♍',
            '♎',
            '♏',
            '♐',
            '♑',
            '♒',
            '♓',
            '⛎',
            '🔀',
            '🔁',
            '🔂',
            '▶️',
            '⏩',
            '⏭️',
            '⏯️',
            '◀️',
            '⏪',
            '⏮️',
            '🔼',
            '⏫',
            '🔽',
            '⏬',
            '⏸️',
            '⏹️',
            '⏺️',
            '⏏️',
            '🎦',
            '🔅',
            '🔆',
            '📶',
            '📳',
            '📴',
            '♀️',
            '♂️',
            '⚧️',
            '✖️',
            '➕',
            '➖',
            '➗',
            '🟰',
            '♾️',
            '‼️',
            '⁉️',
            '❓',
            '❔',
            '❕',
            '❗',
            '〰️',
            '💱',
            '💲',
            '⚕️',
            '♻️',
            '⚜️',
            '🔱',
            '📛',
            '🔰',
            '⭕',
            '✅',
            '☑️',
            '✔️',
            '❌',
            '❎',
            '➰',
            '➿',
            '〽️',
            '✳️',
            '✴️',
            '❇️',
            '©️',
            '®️',
            '™️',
            '#️⃣',
            '*️⃣',
            '0️⃣',
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣',
            '🔟',
            '🔠',
            '🔡',
            '🔢',
            '🔣',
            '🔤',
            '🅰️',
            '🆎',
            '🅱️',
            '🆑',
            '🆒',
            '🆓',
            'ℹ️',
            '🆔',
            'Ⓜ️',
            '🆕',
            '🆖',
            '🅾️',
            '🆗',
            '🅿️',
            '🆘',
            '🆙',
            '🆚',
            '🈁',
            '🈂️',
            '🈷️',
            '🈶',
            '🈯',
            '🉐',
            '🈹',
            '🈚',
            '🈲',
            '🉑',
            '🈸',
            '🈴',
            '🈳',
            '㊗️',
            '㊙️',
            '🈺',
            '🈵',
            '🔴',
            '🟠',
            '🟡',
            '🟢',
            '🔵',
            '🟣',
            '🟤',
            '⚫',
            '⚪',
            '🟥',
            '🟧',
            '🟨',
            '🟩',
            '🟦',
            '🟪',
            '🟫',
            '⬛',
            '⬜',
            '◼️',
            '◻️',
            '◾',
            '◽',
            '▪️',
            '▫️',
            '🔶',
            '🔷',
            '🔸',
            '🔹',
            '🔺',
            '🔻',
            '💠',
            '🔘',
            '🔳',
            '🔲'
        ]
    },
    {
        'name': 'Flags',
        'emojis': [
            '🏁',
            '🚩',
            '🎌',
            '🏴',
            '🏳️',
            '🏳️‍🌈',
            '🏳️‍⚧️',
            {
                'primary': '🏴‍☠️',
                'variants': [
                    '🏴‍☠'
                ]
            },
            '🇦🇨',
            '🇦🇩',
            '🇦🇪',
            '🇦🇫',
            '🇦🇬',
            '🇦🇮',
            '🇦🇱',
            '🇦🇲',
            '🇦🇴',
            '🇦🇶',
            '🇦🇷',
            '🇦🇸',
            '🇦🇹',
            '🇦🇺',
            '🇦🇼',
            '🇦🇽',
            '🇦🇿',
            '🇧🇦',
            '🇧🇧',
            '🇧🇩',
            '🇧🇪',
            '🇧🇫',
            '🇧🇬',
            '🇧🇭',
            '🇧🇮',
            '🇧🇯',
            '🇧🇱',
            '🇧🇲',
            '🇧🇳',
            '🇧🇴',
            '🇧🇶',
            '🇧🇷',
            '🇧🇸',
            '🇧🇹',
            '🇧🇻',
            '🇧🇼',
            '🇧🇾',
            '🇧🇿',
            '🇨🇦',
            '🇨🇨',
            '🇨🇩',
            '🇨🇫',
            '🇨🇬',
            '🇨🇭',
            '🇨🇮',
            '🇨🇰',
            '🇨🇱',
            '🇨🇲',
            '🇨🇳',
            '🇨🇴',
            '🇨🇵',
            '🇨🇷',
            '🇨🇺',
            '🇨🇻',
            '🇨🇼',
            '🇨🇽',
            '🇨🇾',
            '🇨🇿',
            '🇩🇪',
            '🇩🇬',
            '🇩🇯',
            '🇩🇰',
            '🇩🇲',
            '🇩🇴',
            '🇩🇿',
            '🇪🇦',
            '🇪🇨',
            '🇪🇪',
            '🇪🇬',
            '🇪🇭',
            '🇪🇷',
            '🇪🇸',
            '🇪🇹',
            '🇪🇺',
            '🇫🇮',
            '🇫🇯',
            '🇫🇰',
            '🇫🇲',
            '🇫🇴',
            '🇫🇷',
            '🇬🇦',
            '🇬🇧',
            '🇬🇩',
            '🇬🇪',
            '🇬🇫',
            '🇬🇬',
            '🇬🇭',
            '🇬🇮',
            '🇬🇱',
            '🇬🇲',
            '🇬🇳',
            '🇬🇵',
            '🇬🇶',
            '🇬🇷',
            '🇬🇸',
            '🇬🇹',
            '🇬🇺',
            '🇬🇼',
            '🇬🇾',
            '🇭🇰',
            '🇭🇲',
            '🇭🇳',
            '🇭🇷',
            '🇭🇹',
            '🇭🇺',
            '🇮🇨',
            '🇮🇩',
            '🇮🇪',
            '🇮🇱',
            '🇮🇲',
            '🇮🇳',
            '🇮🇴',
            '🇮🇶',
            '🇮🇷',
            '🇮🇸',
            '🇮🇹',
            '🇯🇪',
            '🇯🇲',
            '🇯🇴',
            '🇯🇵',
            '🇰🇪',
            '🇰🇬',
            '🇰🇭',
            '🇰🇮',
            '🇰🇲',
            '🇰🇳',
            '🇰🇵',
            '🇰🇷',
            '🇰🇼',
            '🇰🇾',
            '🇰🇿',
            '🇱🇦',
            '🇱🇧',
            '🇱🇨',
            '🇱🇮',
            '🇱🇰',
            '🇱🇷',
            '🇱🇸',
            '🇱🇹',
            '🇱🇺',
            '🇱🇻',
            '🇱🇾',
            '🇲🇦',
            '🇲🇨',
            '🇲🇩',
            '🇲🇪',
            '🇲🇫',
            '🇲🇬',
            '🇲🇭',
            '🇲🇰',
            '🇲🇱',
            '🇲🇲',
            '🇲🇳',
            '🇲🇴',
            '🇲🇵',
            '🇲🇶',
            '🇲🇷',
            '🇲🇸',
            '🇲🇹',
            '🇲🇺',
            '🇲🇻',
            '🇲🇼',
            '🇲🇽',
            '🇲🇾',
            '🇲🇿',
            '🇳🇦',
            '🇳🇨',
            '🇳🇪',
            '🇳🇫',
            '🇳🇬',
            '🇳🇮',
            '🇳🇱',
            '🇳🇴',
            '🇳🇵',
            '🇳🇷',
            '🇳🇺',
            '🇳🇿',
            '🇴🇲',
            '🇵🇦',
            '🇵🇪',
            '🇵🇫',
            '🇵🇬',
            '🇵🇭',
            '🇵🇰',
            '🇵🇱',
            '🇵🇲',
            '🇵🇳',
            '🇵🇷',
            '🇵🇸',
            '🇵🇹',
            '🇵🇼',
            '🇵🇾',
            '🇶🇦',
            '🇷🇪',
            '🇷🇴',
            '🇷🇸',
            '🇷🇺',
            '🇷🇼',
            '🇸🇦',
            '🇸🇧',
            '🇸🇨',
            '🇸🇩',
            '🇸🇪',
            '🇸🇬',
            '🇸🇭',
            '🇸🇮',
            '🇸🇯',
            '🇸🇰',
            '🇸🇱',
            '🇸🇲',
            '🇸🇳',
            '🇸🇴',
            '🇸🇷',
            '🇸🇸',
            '🇸🇹',
            '🇸🇻',
            '🇸🇽',
            '🇸🇾',
            '🇸🇿',
            '🇹🇦',
            '🇹🇨',
            '🇹🇩',
            '🇹🇫',
            '🇹🇬',
            '🇹🇭',
            '🇹🇯',
            '🇹🇰',
            '🇹🇱',
            '🇹🇲',
            '🇹🇳',
            '🇹🇴',
            '🇹🇷',
            '🇹🇹',
            '🇹🇻',
            '🇹🇼',
            '🇹🇿',
            '🇺🇦',
            '🇺🇬',
            '🇺🇲',
            '🇺🇳',
            '🇺🇸',
            '🇺🇾',
            '🇺🇿',
            '🇻🇦',
            '🇻🇨',
            '🇻🇪',
            '🇻🇬',
            '🇻🇮',
            '🇻🇳',
            '🇻🇺',
            '🇼🇫',
            '🇼🇸',
            '🇽🇰',
            '🇾🇪',
            '🇾🇹',
            '🇿🇦',
            '🇿🇲',
            '🇿🇼',
            '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
            '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
        ]
    }
];


/***/ }),

/***/ 1849:
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/encoded-image/encoded-image.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EncodedImageComponent": () => (/* binding */ EncodedImageComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _encoded_image_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encoded-image.component.html?ngResource */ 5151);
/* harmony import */ var _encoded_image_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./encoded-image.component.scss?ngResource */ 5363);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_core/utils/image.utils */ 3988);





let EncodedImageComponent = class EncodedImageComponent {
    constructor() { }
    ngAfterViewInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            this.renderedImage = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__.ImageUtils.createImageData(this.dataRaw, this.emoji, this.backgroundColor).catch(err => {
                console.log(err);
            });
        });
    }
};
EncodedImageComponent.ctorParameters = () => [];
EncodedImageComponent.propDecorators = {
    emoji: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input, args: ['emoji',] }],
    backgroundColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input, args: ['backgroundColor',] }],
    dataRaw: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input, args: ['dataRaw',] }]
};
EncodedImageComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-encoded-image',
        template: _encoded_image_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_encoded_image_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:paramtypes", [])
], EncodedImageComponent);



/***/ }),

/***/ 2304:
/*!**********************************************************************!*\
  !*** ./src/app/shared/components/qr-scanner/qr-scanner.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QRScannerComponent": () => (/* binding */ QRScannerComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _qr_scanner_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qr-scanner.component.html?ngResource */ 9638);
/* harmony import */ var _qr_scanner_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./qr-scanner.component.scss?ngResource */ 2911);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsqr */ 1038);
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsqr__WEBPACK_IMPORTED_MODULE_2__);





let QRScannerComponent = class QRScannerComponent {
    constructor() {
        this.data = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scanning = false;
    }
    ngAfterViewInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            yield this.getCamera()
                .catch(err => {
                console.log(err);
            });
        });
    }
    ngOnDestroy() {
        this.scanning = false;
        this.cam.nativeElement.pause();
        this.mediaStream
            .getTracks()
            .forEach(track => {
            track.stop();
        });
    }
    ngOnChanges(changes) {
        if (changes.done.currentValue) {
            this.scanning = false;
            this.ngOnDestroy();
        }
    }
    getCamera() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const constraints = {
                video: { facingMode: 'environment' },
            };
            const stream = yield navigator.mediaDevices
                .getUserMedia(constraints)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!stream) {
                return;
            }
            this.mediaStream = stream;
            this.cam.nativeElement.srcObject = this.mediaStream;
            this.cam.nativeElement.addEventListener('loadeddata', this.startLoop.bind(this));
        });
    }
    startLoop() {
        this.scanning = true;
        this.canvas.width = this.cam.nativeElement.videoWidth;
        this.canvas.height = this.cam.nativeElement.videoHeight;
        this.animationLoop();
    }
    animationLoop() {
        if (!this.scanning) {
            return;
        }
        this.ctx.drawImage(this.cam.nativeElement, 0, 0);
        const im = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let qr = jsqr__WEBPACK_IMPORTED_MODULE_2___default()(im.data, im.width, im.height);
        if (qr) {
            this.data.emit(qr);
        }
        if (this.scanningTimeout) {
            clearTimeout(this.scanningTimeout);
        }
        this.scanningTimeout = setTimeout(() => {
            this.animationLoop();
        }, 500);
    }
};
QRScannerComponent.ctorParameters = () => [];
QRScannerComponent.propDecorators = {
    done: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input, args: ['done',] }],
    data: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output, args: ['data',] }],
    cam: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild, args: ['cam',] }]
};
QRScannerComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-qr-scanner',
        template: _qr_scanner_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_qr_scanner_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [])
], QRScannerComponent);



/***/ }),

/***/ 1881:
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/version-number/version-number.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VersionNumberComponent": () => (/* binding */ VersionNumberComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _version_number_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version-number.component.html?ngResource */ 4855);
/* harmony import */ var _version_number_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./version-number.component.scss?ngResource */ 9915);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);




let VersionNumberComponent = class VersionNumberComponent {
    constructor() {
        // tslint:disable-next-line: no-string-literal
        this.version = window['appVersion'];
    }
};
VersionNumberComponent.ctorParameters = () => [];
VersionNumberComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-version',
        template: _version_number_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_version_number_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], VersionNumberComponent);



/***/ }),

/***/ 6817:
/*!****************************************************************!*\
  !*** ./src/app/shared/modals/contact-add/contact-add.modal.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactAddModal": () => (/* binding */ ContactAddModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _contact_add_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contact-add.modal.html?ngResource */ 2069);
/* harmony import */ var _contact_add_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact-add.modal.scss?ngResource */ 1416);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsqr */ 1038);
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsqr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_services_contact_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_core/services/contact.service */ 8790);
/* harmony import */ var _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_core/utils/image.utils */ 3988);
/* harmony import */ var _qr_scan_qr_scan_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../qr-scan/qr-scan.modal */ 3754);










let ContactAddModal = class ContactAddModal {
    constructor(contactService, modalController, toastController, elementRef) {
        this.contactService = contactService;
        this.modalController = modalController;
        this.toastController = toastController;
        this.elementRef = elementRef;
        this.newContactForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroup({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.minLength(1)]),
            publicKey: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required),
            file: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('')
        });
        this.saving = false;
    }
    parseFileQR(event) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (!((_a = event.target.files) === null || _a === void 0 ? void 0 : _a.length)) {
                return;
            }
            const fileData = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_4__.ImageUtils.fileToBase64(event.target.files[0])
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!fileData) {
                const toast = yield this.toastController
                    .create({
                    message: `Couldn't load file.`,
                    duration: 2000
                });
                toast.present();
                return;
            }
            const im = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_4__.ImageUtils.base64ToImageData(fileData)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!im) {
                const toast = yield this.toastController
                    .create({
                    message: `Couldn't load file.`,
                    duration: 2000
                });
                toast.present();
                return;
            }
            this.processQR(jsqr__WEBPACK_IMPORTED_MODULE_2___default()(im.data, im.width, im.height));
        });
    }
    processQR(qr) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (qr === null || qr === void 0 ? void 0 : qr.data) {
                const data = qr === null || qr === void 0 ? void 0 : qr.data;
                if (!data) {
                    const toast = yield this.toastController
                        .create({
                        message: 'Error importing QR code.',
                        duration: 2000
                    });
                    toast.present();
                    return;
                }
                console.log(data);
                this.newContactForm.patchValue({
                    publicKey: data
                });
            }
            else {
                const toast = yield this.toastController
                    .create({
                    message: 'Invalid QR data.',
                    duration: 2000
                });
                toast.present();
                return;
            }
        });
    }
    scanQR() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _qr_scan_qr_scan_modal__WEBPACK_IMPORTED_MODULE_5__.QRScanModal,
                swipeToClose: true,
                presentingElement: this.elementRef.nativeElement
            });
            yield modal.present();
            const result = yield modal.onDidDismiss();
            console.log(result);
            if (result === null || result === void 0 ? void 0 : result.data) {
                this.processQR(result.data);
            }
        });
    }
    saveContact() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (this.saving) {
                return;
            }
            this.saving = true;
            const name = this.newContactForm.get('name').value;
            const publicKey = this.newContactForm.get('publicKey').value;
            const contactId = yield this.contactService
                .addContact(name, publicKey)
                .catch(err => {
                console.log(err);
                return null;
            });
            this.saving = false;
            if (!contactId) {
                throw new Error(`Couldn't import contact.`);
            }
            this.dismiss();
        });
    }
    dismiss() {
        this.modalController.dismiss();
    }
};
ContactAddModal.ctorParameters = () => [
    { type: _core_services_contact_service__WEBPACK_IMPORTED_MODULE_3__.ContactService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ToastController },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ElementRef }
];
ContactAddModal = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-contact-add',
        template: _contact_add_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_contact_add_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__metadata)("design:paramtypes", [_core_services_contact_service__WEBPACK_IMPORTED_MODULE_3__.ContactService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ToastController,
        _angular_core__WEBPACK_IMPORTED_MODULE_9__.ElementRef])
], ContactAddModal);



/***/ }),

/***/ 7855:
/*!**************************************************************************!*\
  !*** ./src/app/shared/modals/conversation-add/conversation-add.modal.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConversationAddModal": () => (/* binding */ ConversationAddModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _conversation_add_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversation-add.modal.html?ngResource */ 2751);
/* harmony import */ var _conversation_add_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversation-add.modal.scss?ngResource */ 1472);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var _core_services_contact_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_core/services/contact.service */ 8790);
/* harmony import */ var _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_core/services/conversation.service */ 9278);
/* harmony import */ var _core_services_key_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_core/services/key.service */ 8115);
/* harmony import */ var _contact_add_contact_add_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../contact-add/contact-add.modal */ 6817);
/* harmony import */ var _key_add_key_add_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../key-add/key-add.modal */ 5340);












let ConversationAddModal = class ConversationAddModal {
    constructor(conversationService, keyService, contactService, modalController, elementRef) {
        this.conversationService = conversationService;
        this.keyService = keyService;
        this.contactService = contactService;
        this.modalController = modalController;
        this.elementRef = elementRef;
        this.contacts$ = this.contactService
            .contacts$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(arr => arr.sort((a, b) => a.created - b.created)));
        this.keys$ = this.keyService
            .keys$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(arr => arr.sort((a, b) => a.created - b.created)));
        this.newConversationForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required),
            to: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required),
            from: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required)
        });
        this.saving = false;
    }
    addContact() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _contact_add_contact_add_modal__WEBPACK_IMPORTED_MODULE_5__.ContactAddModal,
                swipeToClose: true,
                presentingElement: this.elementRef.nativeElement
            });
            yield modal.present();
        });
    }
    createKey() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _key_add_key_add_modal__WEBPACK_IMPORTED_MODULE_6__.KeyAddModal,
                swipeToClose: true,
                presentingElement: this.elementRef.nativeElement
            });
            yield modal.present();
        });
    }
    saveConversation() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            if (this.saving) {
                return;
            }
            this.saving = true;
            const name = this.newConversationForm.get('name').value;
            const to = this.newConversationForm.get('to').value;
            const from = this.newConversationForm.get('from').value;
            const conversationId = yield this.conversationService
                .addConversation(name, to, from)
                .catch(err => {
                console.log(err);
                return null;
            });
            this.saving = false;
            if (!conversationId) {
                throw new Error(`Couldn't create conversation.`);
            }
            this.dismiss();
        });
    }
    updateTo(event) {
        var _a;
        this.newConversationForm
            .patchValue({
            to: (_a = event.detail) === null || _a === void 0 ? void 0 : _a.value
        });
    }
    updateFrom(event) {
        var _a;
        this.newConversationForm
            .patchValue({
            from: (_a = event.detail) === null || _a === void 0 ? void 0 : _a.value
        });
    }
    dismiss() {
        this.modalController.dismiss();
    }
};
ConversationAddModal.ctorParameters = () => [
    { type: _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__.ConversationService },
    { type: _core_services_key_service__WEBPACK_IMPORTED_MODULE_4__.KeyService },
    { type: _core_services_contact_service__WEBPACK_IMPORTED_MODULE_2__.ContactService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ElementRef }
];
ConversationAddModal = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-conversation-add',
        template: _conversation_add_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_conversation_add_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__metadata)("design:paramtypes", [_core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__.ConversationService,
        _core_services_key_service__WEBPACK_IMPORTED_MODULE_4__.KeyService,
        _core_services_contact_service__WEBPACK_IMPORTED_MODULE_2__.ContactService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController,
        _angular_core__WEBPACK_IMPORTED_MODULE_11__.ElementRef])
], ConversationAddModal);



/***/ }),

/***/ 5340:
/*!********************************************************!*\
  !*** ./src/app/shared/modals/key-add/key-add.modal.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyAddModal": () => (/* binding */ KeyAddModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _key_add_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./key-add.modal.html?ngResource */ 3872);
/* harmony import */ var _key_add_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./key-add.modal.scss?ngResource */ 8287);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _core_services_key_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_core/services/key.service */ 8115);







let KeyAddModal = class KeyAddModal {
    constructor(keyService, modalController) {
        this.keyService = keyService;
        this.modalController = modalController;
        this.newKeyForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(1)]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6)),
            passwordConfirm: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6))
        }, { validators: this.passwordsMatch.bind(this) });
        this.generating = false;
    }
    saveEncryptionKey() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            if (this.generating) {
                return;
            }
            this.generating = true;
            const name = this.newKeyForm.get('name').value;
            const password = this.newKeyForm.get('password').value;
            const keyId = yield this.keyService
                .generateKey(name, password)
                .catch(err => {
                console.log(err);
                return null;
            });
            this.generating = false;
            if (!keyId) {
                throw new Error(`Couldn't generate key pair.`);
            }
            this.newKeyForm.setValue({
                name: '',
                password: '',
                passwordConfirm: ''
            });
            this.dismiss();
        });
    }
    dismiss() {
        this.modalController.dismiss();
    }
    passwordsMatch(group) {
        const password = group.get('password');
        const confirm = group.get('passwordConfirm');
        if (!password.valid || (password.value !== confirm.value)) {
            return {
                NotEqual: true
            };
        }
        return null;
    }
};
KeyAddModal.ctorParameters = () => [
    { type: _core_services_key_service__WEBPACK_IMPORTED_MODULE_2__.KeyService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController }
];
KeyAddModal = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-key-add',
        template: _key_add_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_key_add_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [_core_services_key_service__WEBPACK_IMPORTED_MODULE_2__.KeyService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController])
], KeyAddModal);



/***/ }),

/***/ 2844:
/*!************************************************************!*\
  !*** ./src/app/shared/modals/key-share/key-share.modal.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyShareModal": () => (/* binding */ KeyShareModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _key_share_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./key-share.modal.html?ngResource */ 5621);
/* harmony import */ var _key_share_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./key-share.modal.scss?ngResource */ 7032);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_core/utils/image.utils */ 3988);
/* harmony import */ var _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_core/services/conversation.service */ 9278);
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! qrcode */ 5646);








let KeyShareModal = class KeyShareModal {
    constructor(modalController, conversationService, toastController) {
        this.modalController = modalController;
        this.conversationService = conversationService;
        this.toastController = toastController;
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            let qr = yield qrcode__WEBPACK_IMPORTED_MODULE_4__.toDataURL([
                {
                    data: this.key
                }
            ], {
                errorCorrectionLevel: 'H'
            })
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!qr) {
                const toast = yield this.toastController
                    .create({
                    message: 'Error generating QR code.',
                    duration: 2000
                });
                toast.present();
                return;
            }
            this.imageData = qr;
        });
    }
    copy() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            let clipboardErr;
            yield navigator.clipboard
                .writeText(this.key)
                .catch(err => {
                console.log(err);
                clipboardErr = err;
                return null;
            });
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
    shareQR() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            if (!navigator.share) {
                window.open(this.imageData, '_blank');
                return;
            }
            navigator.share({
                files: [
                    new File([_core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__.ImageUtils.base64ToBlob(this.imageData)], `encrypted-message-${Date.now()}.png`, {
                        type: 'image/png'
                    }),
                ]
            });
        });
    }
    dismiss() {
        this.modalController.dismiss();
    }
};
KeyShareModal.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController },
    { type: _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__.ConversationService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ToastController }
];
KeyShareModal.propDecorators = {
    key: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input }]
};
KeyShareModal = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-key-share',
        template: _key_share_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_key_share_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__metadata)("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController,
        _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__.ConversationService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ToastController])
], KeyShareModal);



/***/ }),

/***/ 9762:
/*!****************************************************************!*\
  !*** ./src/app/shared/modals/message-add/message-add.modal.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageAddModal": () => (/* binding */ MessageAddModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _message_add_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message-add.modal.html?ngResource */ 220);
/* harmony import */ var _message_add_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message-add.modal.scss?ngResource */ 7027);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_core/utils/image.utils */ 3988);
/* harmony import */ var _core_utils_crypto_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_core/utils/crypto.utils */ 7714);
/* harmony import */ var _core_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_core/constants */ 5393);









let MessageAddModal = class MessageAddModal {
    constructor(modalController) {
        this.modalController = modalController;
        this.image = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.showEmojiPicker = false;
        this.pickedEmoji = '';
        this.MAX_ENCODED_BYTES = 382;
        this.encodedBytes = 0;
        this.newMessageForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroup({
            //saveLocal: new FormControl(false),
            backgroundColor: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('#ffffff'),
            message: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, this.checkMessageLength.bind(this)])
        });
    }
    clearBackgroundColor() {
        this.newMessageForm
            .patchValue({
            backgroundColor: '#ffffff'
        });
        if (this.newMessageForm.valid) {
            this.encrypt().catch(err => console.log(err));
        }
    }
    setBackgroundColor() {
        if (this.newMessageForm.valid) {
            this.encrypt().catch(err => console.log(err));
        }
    }
    setBackground(value) {
        this.pickedEmoji = value;
        this.showEmojiPicker = false;
        if (this.newMessageForm.valid) {
            this.encrypt().catch(err => console.log(err));
        }
    }
    encrypt() {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            this.renderedImage = null;
            if (!this.toKey) {
                throw new Error('Public key not found.');
            }
            const value = (_a = this.newMessageForm.get('message')) === null || _a === void 0 ? void 0 : _a.value;
            if (!value || !this.newMessageForm.valid) {
                throw new Error(`Nothing to encode.`);
            }
            this.encrypted = yield _core_utils_crypto_utils__WEBPACK_IMPORTED_MODULE_3__.Crypto.encrypt(value, this.toKey)
                .catch(err => {
                console.log(err);
                return undefined;
            });
            if (!this.encrypted) {
                return;
            }
            const data = new Uint8Array(this.encrypted);
            const minPx = Math.ceil(data.length);
            const remainder = 3 - data.length % 3;
            const nextPow = Math.max(1 << (32 - Math.clz32(Math.ceil(Math.sqrt(minPx)))), _core_constants__WEBPACK_IMPORTED_MODULE_4__.IMAGE_SIZE);
            const density = Math.floor((nextPow * nextPow) / minPx);
            this.canvas.nativeElement.width = nextPow;
            this.canvas.nativeElement.height = nextPow;
            const ctx = this.canvas.nativeElement.getContext('2d');
            ctx.clearRect(0, 0, nextPow, nextPow);
            const backgroundColor = this.newMessageForm.get('backgroundColor').value;
            ctx.fillStyle = `rgba(
				${parseInt(backgroundColor[1] + backgroundColor[2], 16)},
				${parseInt(backgroundColor[3] + backgroundColor[4], 16)},
				${parseInt(backgroundColor[5] + backgroundColor[6], 16)},
				255
			)
		`;
            ctx.fillRect(0, 0, nextPow, nextPow);
            if (this.pickedEmoji) {
                let fontSize = nextPow;
                ctx.font = `${fontSize}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                let measure = ctx.measureText(this.pickedEmoji);
                if (measure.width > nextPow) {
                    fontSize /= measure.width / nextPow;
                    ctx.font = `${fontSize}px sans-serif`;
                }
                ctx.fillText(this.pickedEmoji, nextPow / 2, nextPow / 2);
            }
            let img = ctx.getImageData(0, 0, nextPow, nextPow);
            for (let i = 0; i < (data.length + remainder); i++) {
                const imgIdx = (i * density) * 4;
                img.data[imgIdx + 3] = data[i];
            }
            const blob = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__.ImageUtils.create([...img.data], nextPow, nextPow)
                .catch(err => {
                console.log(err);
                return null;
            });
            this.renderedImage = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__.ImageUtils.blobToBase64(blob)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!this.renderedImage) {
                throw new Error(`Error rendering image.`);
            }
            ctx.putImageData(img, 0, 0);
        });
    }
    saveMessage() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            this.dismiss(this.renderedImage);
        });
    }
    countBytes(value) {
        var _a;
        if (!(value === null || value === void 0 ? void 0 : value.length)) {
            value = ((_a = this.newMessageForm) === null || _a === void 0 ? void 0 : _a.get('message').value) || '';
        }
        this.encodedBytes = new TextEncoder().encode(value).byteLength;
    }
    checkMessageLength(group) {
        var _a;
        const message = ((_a = group === null || group === void 0 ? void 0 : group.get('message')) === null || _a === void 0 ? void 0 : _a.value) || '';
        this.countBytes(message);
        if (this.encodedBytes > this.MAX_ENCODED_BYTES) {
            return {
                TooLong: true
            };
        }
        return null;
    }
    dismiss(image) {
        this.modalController.dismiss({
            image,
            encrypted: Array.from(new Uint8Array(this.encrypted)),
            emoji: this.pickedEmoji,
            backgroundColor: this.newMessageForm.get('backgroundColor').value
        });
    }
};
MessageAddModal.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController }
];
MessageAddModal.propDecorators = {
    fromName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    toName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    toKey: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    image: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Output, args: ['image',] }],
    canvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild, args: ['canvas',] }]
};
MessageAddModal = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-message-add',
        template: _message_add_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_message_add_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__metadata)("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController])
], MessageAddModal);



/***/ }),

/***/ 7663:
/*!**********************************************************************!*\
  !*** ./src/app/shared/modals/message-import/message-import.modal.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageImportModal": () => (/* binding */ MessageImportModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _message_import_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message-import.modal.html?ngResource */ 4285);
/* harmony import */ var _message_import_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message-import.modal.scss?ngResource */ 5939);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsqr */ 1038);
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsqr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_core/utils/image.utils */ 3988);
/* harmony import */ var _qr_scan_qr_scan_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../qr-scan/qr-scan.modal */ 3754);









let MessageImportModal = class MessageImportModal {
    constructor(modalController, toastController, elementRef) {
        this.modalController = modalController;
        this.toastController = toastController;
        this.elementRef = elementRef;
        this.image = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.newMessageForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroup({
            file: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl(''),
        });
    }
    parseFile(event) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (!((_a = event.target.files) === null || _a === void 0 ? void 0 : _a.length)) {
                return;
            }
            const fileData = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_3__.ImageUtils.fileToBase64(event.target.files[0])
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!fileData) {
                const toast = yield this.toastController
                    .create({
                    message: `Couldn't parse file.`,
                    duration: 2000
                });
                toast.present();
                return;
            }
            this.importedFile = fileData;
        });
    }
    parseFileQR(event) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (!((_a = event.target.files) === null || _a === void 0 ? void 0 : _a.length)) {
                return;
            }
            const fileData = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_3__.ImageUtils.fileToBase64(event.target.files[0])
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!fileData) {
                const toast = yield this.toastController
                    .create({
                    message: `Couldn't load file.`,
                    duration: 2000
                });
                toast.present();
                return;
            }
            const im = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_3__.ImageUtils.base64ToImageData(fileData)
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!im) {
                const toast = yield this.toastController
                    .create({
                    message: `Couldn't load file.`,
                    duration: 2000
                });
                toast.present();
                return;
            }
            this.processQR(jsqr__WEBPACK_IMPORTED_MODULE_2___default()(im.data, im.width, im.height));
        });
    }
    scanQR() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController
                .create({
                component: _qr_scan_qr_scan_modal__WEBPACK_IMPORTED_MODULE_4__.QRScanModal,
                swipeToClose: true,
                presentingElement: this.elementRef.nativeElement
            });
            yield modal.present();
            const result = yield modal.onDidDismiss();
            console.log(result);
            if (result === null || result === void 0 ? void 0 : result.data) {
                this.processQR(result.data);
            }
        });
    }
    processQR(qr) {
        var _a, _b, _c, _d;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (((_a = qr === null || qr === void 0 ? void 0 : qr.chunks) === null || _a === void 0 ? void 0 : _a.length) && (qr === null || qr === void 0 ? void 0 : qr.binaryData)) {
                let dataRaw = (_b = qr.chunks[0]) === null || _b === void 0 ? void 0 : _b.bytes;
                let emoji = (_c = qr.chunks[1]) === null || _c === void 0 ? void 0 : _c.text;
                let backgroundColor = (_d = qr.chunks[2]) === null || _d === void 0 ? void 0 : _d.text;
                if (!dataRaw) {
                    const toast = yield this.toastController
                        .create({
                        message: 'Error importing QR code.',
                        duration: 2000
                    });
                    toast.present();
                    return;
                }
                this.importedFile = yield _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_3__.ImageUtils.createImageData(dataRaw, emoji, backgroundColor)
                    .catch(err => {
                    console.log(err);
                });
            }
            else {
                const toast = yield this.toastController
                    .create({
                    message: 'Invalid QR data.',
                    duration: 2000
                });
                toast.present();
                return;
            }
        });
    }
    saveMessage() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            this.dismiss(this.importedFile);
        });
    }
    dismiss(image) {
        this.modalController.dismiss({
            image
        });
    }
};
MessageImportModal.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ToastController },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ElementRef }
];
MessageImportModal.propDecorators = {
    fromName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    toName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    image: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Output, args: ['image',] }]
};
MessageImportModal = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-message-import',
        template: _message_import_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_message_import_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__metadata)("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ToastController,
        _angular_core__WEBPACK_IMPORTED_MODULE_5__.ElementRef])
], MessageImportModal);



/***/ }),

/***/ 4229:
/*!********************************************************************!*\
  !*** ./src/app/shared/modals/message-share/message-share.modal.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageShareModal": () => (/* binding */ MessageShareModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _message_share_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message-share.modal.html?ngResource */ 9377);
/* harmony import */ var _message_share_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message-share.modal.scss?ngResource */ 9987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_core/utils/image.utils */ 3988);
/* harmony import */ var _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_core/services/conversation.service */ 9278);
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! qrcode */ 5646);








let MessageShareModal = class MessageShareModal {
    constructor(modalController, conversationService, toastController) {
        this.modalController = modalController;
        this.conversationService = conversationService;
        this.toastController = toastController;
    }
    share(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            if (!data) {
                data = this.message.imageData;
            }
            if (!navigator.share) {
                window.open(data, '_blank');
                return;
            }
            navigator.share({
                files: [
                    new File([_core_utils_image_utils__WEBPACK_IMPORTED_MODULE_2__.ImageUtils.base64ToBlob(data)], `encrypted-message-${Date.now()}.png`, {
                        type: 'image/png'
                    }),
                ]
            });
        });
    }
    shareQR() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const qr = yield qrcode__WEBPACK_IMPORTED_MODULE_4__.toDataURL([
                {
                    data: this.message.dataRaw
                },
                {
                    data: this.message.emoji
                },
                {
                    data: this.message.backgroundColor
                }
            ], {
                errorCorrectionLevel: 'H'
            })
                .catch(err => {
                console.log(err);
                return null;
            });
            if (!qr) {
                const toast = yield this.toastController
                    .create({
                    message: 'Error generating QR code.',
                    duration: 2000
                });
                toast.present();
                return;
            }
            yield this.share(qr)
                .catch(err => {
                console.log(err);
            });
        });
    }
    delete() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable.`);
            if (confirmed) {
                this.conversationService
                    .deleteMessage(this.conversationId, this.message.id);
                this.dismiss();
            }
        });
    }
    dismiss() {
        this.modalController.dismiss();
    }
};
MessageShareModal.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController },
    { type: _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__.ConversationService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ToastController }
];
MessageShareModal.propDecorators = {
    conversationId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input }],
    message: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input }],
    canvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild, args: ['canvas',] }]
};
MessageShareModal = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-message-share',
        template: _message_share_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_message_share_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__metadata)("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController,
        _core_services_conversation_service__WEBPACK_IMPORTED_MODULE_3__.ConversationService,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ToastController])
], MessageShareModal);



/***/ }),

/***/ 3754:
/*!********************************************************!*\
  !*** ./src/app/shared/modals/qr-scan/qr-scan.modal.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QRScanModal": () => (/* binding */ QRScanModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _qr_scan_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qr-scan.modal.html?ngResource */ 5476);
/* harmony import */ var _qr_scan_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./qr-scan.modal.scss?ngResource */ 7710);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 3819);





let QRScanModal = class QRScanModal {
    constructor(modalController) {
        this.modalController = modalController;
        this.doneScanning = false;
    }
    onData(event) {
        this.dismiss(event);
    }
    dismiss(data) {
        this.doneScanning = true;
        this.modalController.dismiss(data);
    }
};
QRScanModal.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController }
];
QRScanModal = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-qr-scan-modal',
        template: _qr_scan_modal_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_qr_scan_modal_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController])
], QRScanModal);



/***/ }),

/***/ 978:
/*!***************************************************!*\
  !*** ./src/app/shared/pipes/colon-to-dot.pipe.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColonToDotPipe": () => (/* binding */ ColonToDotPipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


let ColonToDotPipe = class ColonToDotPipe {
    transform(value) {
        return value.replace(/:/g, '.');
    }
};
ColonToDotPipe = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Pipe)({
        name: 'colontodot'
    })
], ColonToDotPipe);



/***/ }),

/***/ 2129:
/*!***********************************************!*\
  !*** ./src/app/shared/pipes/safe-url.pipe.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SafeUrlPipe": () => (/* binding */ SafeUrlPipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 318);



/**
 * Safe URL Pipe
 * This pipe will sanitize any url that is going to load content in the DOM
 * Commonly used for iframe content.
 */
let SafeUrlPipe = class SafeUrlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(url) {
        // commented return throws error, both with URL and with RESOURCE_URL. idk why
        // return this.sanitizer.sanitize(SecurityContext.URL, url);
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__.SecurityContext.URL, url));
    }
};
SafeUrlPipe.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer }
];
SafeUrlPipe = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Pipe)({
        name: 'safeUrl'
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer])
], SafeUrlPipe);



/***/ }),

/***/ 4466:
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _modals_conversation_add_conversation_add_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals/conversation-add/conversation-add.modal */ 7855);
/* harmony import */ var _modals_contact_add_contact_add_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modals/contact-add/contact-add.modal */ 6817);
/* harmony import */ var _modals_key_add_key_add_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modals/key-add/key-add.modal */ 5340);
/* harmony import */ var _modals_message_add_message_add_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modals/message-add/message-add.modal */ 9762);
/* harmony import */ var _modals_message_share_message_share_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals/message-share/message-share.modal */ 4229);
/* harmony import */ var _modals_message_import_message_import_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modals/message-import/message-import.modal */ 7663);
/* harmony import */ var _modals_key_share_key_share_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modals/key-share/key-share.modal */ 2844);
/* harmony import */ var _modals_qr_scan_qr_scan_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modals/qr-scan/qr-scan.modal */ 3754);
/* harmony import */ var _components_emoji_picker_emoji_picker_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/emoji-picker/emoji-picker.component */ 3154);
/* harmony import */ var _components_encoded_image_encoded_image_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/encoded-image/encoded-image.component */ 1849);
/* harmony import */ var _components_qr_scanner_qr_scanner_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/qr-scanner/qr-scanner.component */ 2304);
/* harmony import */ var _components_version_number_version_number_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/version-number/version-number.component */ 1881);
/* harmony import */ var _pipes_colon_to_dot_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pipes/colon-to-dot.pipe */ 978);
/* harmony import */ var _pipes_safe_url_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pipes/safe-url.pipe */ 2129);




















let SharedModule = class SharedModule {
};
SharedModule = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_16__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_18__.ReactiveFormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonicModule
        ],
        declarations: [
            _modals_conversation_add_conversation_add_modal__WEBPACK_IMPORTED_MODULE_0__.ConversationAddModal,
            _modals_contact_add_contact_add_modal__WEBPACK_IMPORTED_MODULE_1__.ContactAddModal,
            _modals_key_add_key_add_modal__WEBPACK_IMPORTED_MODULE_2__.KeyAddModal,
            _modals_message_add_message_add_modal__WEBPACK_IMPORTED_MODULE_3__.MessageAddModal,
            _modals_message_share_message_share_modal__WEBPACK_IMPORTED_MODULE_4__.MessageShareModal,
            _modals_message_import_message_import_modal__WEBPACK_IMPORTED_MODULE_5__.MessageImportModal,
            _modals_key_share_key_share_modal__WEBPACK_IMPORTED_MODULE_6__.KeyShareModal,
            _modals_qr_scan_qr_scan_modal__WEBPACK_IMPORTED_MODULE_7__.QRScanModal,
            _components_emoji_picker_emoji_picker_component__WEBPACK_IMPORTED_MODULE_8__.EmojiPickerComponent,
            _components_encoded_image_encoded_image_component__WEBPACK_IMPORTED_MODULE_9__.EncodedImageComponent,
            _components_qr_scanner_qr_scanner_component__WEBPACK_IMPORTED_MODULE_10__.QRScannerComponent,
            _components_version_number_version_number_component__WEBPACK_IMPORTED_MODULE_11__.VersionNumberComponent,
            _pipes_colon_to_dot_pipe__WEBPACK_IMPORTED_MODULE_12__.ColonToDotPipe,
            _pipes_safe_url_pipe__WEBPACK_IMPORTED_MODULE_13__.SafeUrlPipe
        ],
        providers: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonicModule
        ],
        exports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonicModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_16__.CommonModule,
            _modals_conversation_add_conversation_add_modal__WEBPACK_IMPORTED_MODULE_0__.ConversationAddModal,
            _modals_contact_add_contact_add_modal__WEBPACK_IMPORTED_MODULE_1__.ContactAddModal,
            _modals_key_add_key_add_modal__WEBPACK_IMPORTED_MODULE_2__.KeyAddModal,
            _modals_message_add_message_add_modal__WEBPACK_IMPORTED_MODULE_3__.MessageAddModal,
            _modals_message_share_message_share_modal__WEBPACK_IMPORTED_MODULE_4__.MessageShareModal,
            _modals_message_import_message_import_modal__WEBPACK_IMPORTED_MODULE_5__.MessageImportModal,
            _modals_key_share_key_share_modal__WEBPACK_IMPORTED_MODULE_6__.KeyShareModal,
            _modals_qr_scan_qr_scan_modal__WEBPACK_IMPORTED_MODULE_7__.QRScanModal,
            _components_emoji_picker_emoji_picker_component__WEBPACK_IMPORTED_MODULE_8__.EmojiPickerComponent,
            _components_encoded_image_encoded_image_component__WEBPACK_IMPORTED_MODULE_9__.EncodedImageComponent,
            _components_qr_scanner_qr_scanner_component__WEBPACK_IMPORTED_MODULE_10__.QRScannerComponent,
            _components_version_number_version_number_component__WEBPACK_IMPORTED_MODULE_11__.VersionNumberComponent,
            _pipes_colon_to_dot_pipe__WEBPACK_IMPORTED_MODULE_12__.ColonToDotPipe,
            _pipes_safe_url_pipe__WEBPACK_IMPORTED_MODULE_13__.SafeUrlPipe
        ]
    })
], SharedModule);



/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file is auto-generated by 'set-env.ts'.  Adjust any new variables there or configure variables with a .env file.
const environment = {
    production: true
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as 'zone.run', 'zoneDelegate.invokeTask'.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_compiler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/compiler */ 8305);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 8150);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ 2340);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_4__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__.AppModule)
    .catch(err => console.log(err));


/***/ }),

/***/ 5084:
/*!***************************************************************!*\
  !*** ./src/app/_core/third-party/pako.js/pako_deflate.min.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
!function(t,e){ true?e(exports):0}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,n=286,r=30,i=15,s=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),_=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),o=new Array(576);e(o);const d=new Array(60);e(d);const u=new Array(512);e(u);const f=new Array(256);e(f);const c=new Array(29);e(c);const p=new Array(r);function g(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t&&t.length}let w,b,m;function v(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(p);const y=t=>t<256?u[t]:u[256+(t>>>7)],z=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},k=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,z(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},x=(t,e,a)=>{k(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const n=new Array(16);let r,s,_=0;for(r=1;r<=i;r++)n[r]=_=_+a[r-1]<<1;for(s=0;s<=e;s++){let e=t[2*s+1];0!==e&&(t[2*s]=A(n[e]++,e))}},Z=t=>{let e;for(e=0;e<n;e++)t.dyn_ltree[2*e]=0;for(e=0;e<r;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},R=t=>{t.bi_valid>8?z(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,n)=>{const r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]},S=(t,e,a)=>{const n=t.heap[a];let r=a<<1;for(;r<=t.heap_len&&(r<t.heap_len&&U(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!U(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n},T=(t,e,n)=>{let r,i,l,h,o=0;if(0!==t.last_lit)do{r=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],i=t.pending_buf[t.l_buf+o],o++,0===r?x(t,i,e):(l=f[i],x(t,l+a+1,e),h=s[l],0!==h&&(i-=c[l],k(t,i,h)),r--,l=y(r),x(t,l,n),h=_[l],0!==h&&(r-=p[l],k(t,r,h)))}while(o<t.last_lit);x(t,256,e)},L=(t,e)=>{const a=e.dyn_tree,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,s=e.stat_desc.elems;let _,l,h,o=-1;for(t.heap_len=0,t.heap_max=573,_=0;_<s;_++)0!==a[2*_]?(t.heap[++t.heap_len]=o=_,t.depth[_]=0):a[2*_+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=o<2?++o:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,r&&(t.static_len-=n[2*h+1]);for(e.max_code=o,_=t.heap_len>>1;_>=1;_--)S(t,a,_);h=s;do{_=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),l=t.heap[1],t.heap[--t.heap_max]=_,t.heap[--t.heap_max]=l,a[2*h]=a[2*_]+a[2*l],t.depth[h]=(t.depth[_]>=t.depth[l]?t.depth[_]:t.depth[l])+1,a[2*_+1]=a[2*l+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,n=e.max_code,r=e.stat_desc.static_tree,s=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,h=e.stat_desc.max_length;let o,d,u,f,c,p,g=0;for(f=0;f<=i;f++)t.bl_count[f]=0;for(a[2*t.heap[t.heap_max]+1]=0,o=t.heap_max+1;o<573;o++)d=t.heap[o],f=a[2*a[2*d+1]+1]+1,f>h&&(f=h,g++),a[2*d+1]=f,d>n||(t.bl_count[f]++,c=0,d>=l&&(c=_[d-l]),p=a[2*d],t.opt_len+=p*(f+c),s&&(t.static_len+=p*(r[2*d+1]+c)));if(0!==g){do{for(f=h-1;0===t.bl_count[f];)f--;t.bl_count[f]--,t.bl_count[f+1]+=2,t.bl_count[h]--,g-=2}while(g>0);for(f=h;0!==f;f--)for(d=t.bl_count[f];0!==d;)u=t.heap[--o],u>n||(a[2*u+1]!==f&&(t.opt_len+=(f-a[2*u+1])*a[2*u],a[2*u+1]=f),d--)}})(t,e),E(a,o,t.bl_count)},F=(t,e,a)=>{let n,r,i=-1,s=e[1],_=0,l=7,h=4;for(0===s&&(l=138,h=3),e[2*(a+1)+1]=65535,n=0;n<=a;n++)r=s,s=e[2*(n+1)+1],++_<l&&r===s||(_<h?t.bl_tree[2*r]+=_:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[32]++):_<=10?t.bl_tree[34]++:t.bl_tree[36]++,_=0,i=r,0===s?(l=138,h=3):r===s?(l=6,h=3):(l=7,h=4))},O=(t,e,a)=>{let n,r,i=-1,s=e[1],_=0,l=7,h=4;for(0===s&&(l=138,h=3),n=0;n<=a;n++)if(r=s,s=e[2*(n+1)+1],!(++_<l&&r===s)){if(_<h)do{x(t,r,t.bl_tree)}while(0!=--_);else 0!==r?(r!==i&&(x(t,r,t.bl_tree),_--),x(t,16,t.bl_tree),k(t,_-3,2)):_<=10?(x(t,17,t.bl_tree),k(t,_-3,3)):(x(t,18,t.bl_tree),k(t,_-11,7));_=0,i=r,0===s?(l=138,h=3):r===s?(l=6,h=3):(l=7,h=4)}};let D=!1;const N=(t,e,a,n)=>{k(t,0+(n?1:0),3),((t,e,a,n)=>{R(t),n&&(z(t,a),z(t,~a)),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a})(t,e,a,!0)};var I={_tr_init:t=>{D||((()=>{let t,e,a,h,v;const y=new Array(16);for(a=0,h=0;h<28;h++)for(c[h]=a,t=0;t<1<<s[h];t++)f[a++]=h;for(f[a-1]=h,v=0,h=0;h<16;h++)for(p[h]=v,t=0;t<1<<_[h];t++)u[v++]=h;for(v>>=7;h<r;h++)for(p[h]=v<<7,t=0;t<1<<_[h]-7;t++)u[256+v++]=h;for(e=0;e<=i;e++)y[e]=0;for(t=0;t<=143;)o[2*t+1]=8,t++,y[8]++;for(;t<=255;)o[2*t+1]=9,t++,y[9]++;for(;t<=279;)o[2*t+1]=7,t++,y[7]++;for(;t<=287;)o[2*t+1]=8,t++,y[8]++;for(E(o,287,y),t=0;t<r;t++)d[2*t+1]=5,d[2*t]=A(t,5);w=new g(o,s,257,n,i),b=new g(d,_,0,r,i),m=new g(new Array(0),l,0,19,7)})(),D=!0),t.l_desc=new v(t.dyn_ltree,w),t.d_desc=new v(t.dyn_dtree,b),t.bl_desc=new v(t.bl_tree,m),t.bi_buf=0,t.bi_valid=0,Z(t)},_tr_stored_block:N,_tr_flush_block:(t,e,n,r)=>{let i,s,_=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,n=4093624447;for(e=0;e<=31;e++,n>>>=1)if(1&n&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),L(t,t.l_desc),L(t,t.d_desc),_=(t=>{let e;for(F(t,t.dyn_ltree,t.l_desc.max_code),F(t,t.dyn_dtree,t.d_desc.max_code),L(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),i=t.opt_len+3+7>>>3,s=t.static_len+3+7>>>3,s<=i&&(i=s)):i=s=n+5,n+4<=i&&-1!==e?N(t,e,n,r):4===t.strategy||s===i?(k(t,2+(r?1:0),3),T(t,o,d)):(k(t,4+(r?1:0),3),((t,e,a,n)=>{let r;for(k(t,e-257,5),k(t,a-1,5),k(t,n-4,4),r=0;r<n;r++)k(t,t.bl_tree[2*h[r]+1],3);O(t,t.dyn_ltree,e-1),O(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,_+1),T(t,t.dyn_ltree,t.dyn_dtree)),Z(t),r&&R(t)},_tr_tally:(t,e,n)=>(t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&n,t.last_lit++,0===e?t.dyn_ltree[2*n]++:(t.matches++,e--,t.dyn_ltree[2*(f[n]+a+1)]++,t.dyn_dtree[2*y(e)]++),t.last_lit===t.lit_bufsize-1),_tr_align:t=>{k(t,2,3),x(t,256,o),(t=>{16===t.bi_valid?(z(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var C=(t,e,a,n)=>{let r=65535&t|0,i=t>>>16&65535|0,s=0;for(;0!==a;){s=a>2e3?2e3:a,a-=s;do{r=r+e[n++]|0,i=i+r|0}while(--s);r%=65521,i%=65521}return r|i<<16|0};const B=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var H=(t,e,a,n)=>{const r=B,i=n+a;t^=-1;for(let a=n;a<i;a++)t=t>>>8^r[255&(t^e[a])];return-1^t},M={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},P={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:j,_tr_stored_block:K,_tr_flush_block:Y,_tr_tally:G,_tr_align:X}=I,{Z_NO_FLUSH:W,Z_PARTIAL_FLUSH:q,Z_FULL_FLUSH:J,Z_FINISH:Q,Z_BLOCK:V,Z_OK:$,Z_STREAM_END:tt,Z_STREAM_ERROR:et,Z_DATA_ERROR:at,Z_BUF_ERROR:nt,Z_DEFAULT_COMPRESSION:rt,Z_FILTERED:it,Z_HUFFMAN_ONLY:st,Z_RLE:_t,Z_FIXED:lt,Z_DEFAULT_STRATEGY:ht,Z_UNKNOWN:ot,Z_DEFLATED:dt}=P,ut=258,ft=262,ct=103,pt=113,gt=666,wt=(t,e)=>(t.msg=M[e],e),bt=t=>(t<<1)-(t>4?9:0),mt=t=>{let e=t.length;for(;--e>=0;)t[e]=0};let vt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const yt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},zt=(t,e)=>{Y(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,yt(t.strm)},kt=(t,e)=>{t.pending_buf[t.pending++]=e},xt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},At=(t,e,a,n)=>{let r=t.avail_in;return r>n&&(r=n),0===r?0:(t.avail_in-=r,e.set(t.input.subarray(t.next_in,t.next_in+r),a),1===t.state.wrap?t.adler=C(t.adler,e,r,a):2===t.state.wrap&&(t.adler=H(t.adler,e,r,a)),t.next_in+=r,t.total_in+=r,r)},Et=(t,e)=>{let a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,_=t.nice_match;const l=t.strstart>t.w_size-ft?t.strstart-(t.w_size-ft):0,h=t.window,o=t.w_mask,d=t.prev,u=t.strstart+ut;let f=h[i+s-1],c=h[i+s];t.prev_length>=t.good_match&&(r>>=2),_>t.lookahead&&(_=t.lookahead);do{if(a=e,h[a+s]===c&&h[a+s-1]===f&&h[a]===h[i]&&h[++a]===h[i+1]){i+=2,a++;do{}while(h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&i<u);if(n=ut-(u-i),i=u-ut,n>s){if(t.match_start=e,s=n,n>=_)break;f=h[i+s-1],c=h[i+s]}}}while((e=d[e&o])>l&&0!=--r);return s<=t.lookahead?s:t.lookahead},Zt=t=>{const e=t.w_size;let a,n,r,i,s;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ft)){t.window.set(t.window.subarray(e,e+e),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,n=t.hash_size,a=n;do{r=t.head[--a],t.head[a]=r>=e?r-e:0}while(--n);n=e,a=n;do{r=t.prev[--a],t.prev[a]=r>=e?r-e:0}while(--n);i+=e}if(0===t.strm.avail_in)break;if(n=At(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=n,t.lookahead+t.insert>=3)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=vt(t,t.ins_h,t.window[s+1]);t.insert&&(t.ins_h=vt(t,t.ins_h,t.window[s+3-1]),t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ft&&0!==t.strm.avail_in)},Rt=(t,e)=>{let a,n;for(;;){if(t.lookahead<ft){if(Zt(t),t.lookahead<ft&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=vt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ft&&(t.match_length=Et(t,a)),t.match_length>=3)if(n=G(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=vt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=vt(t,t.ins_h,t.window[t.strstart+1]);else n=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(zt(t,!1),0===t.strm.avail_out)?1:2},Ut=(t,e)=>{let a,n,r;for(;;){if(t.lookahead<ft){if(Zt(t),t.lookahead<ft&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=vt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ft&&(t.match_length=Et(t,a),t.match_length<=5&&(t.strategy===it||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-3,n=G(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=r&&(t.ins_h=vt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,n&&(zt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(n=G(t,0,t.window[t.strstart-1]),n&&zt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=G(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(zt(t,!1),0===t.strm.avail_out)?1:2};function St(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r}const Tt=[new St(0,0,0,0,((t,e)=>{let a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Zt(t),0===t.lookahead&&e===W)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;const n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,zt(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-ft&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(zt(t,!1),t.strm.avail_out),1)})),new St(4,4,8,4,Rt),new St(4,5,16,8,Rt),new St(4,6,32,32,Rt),new St(4,4,16,16,Ut),new St(8,16,32,32,Ut),new St(8,16,128,128,Ut),new St(8,32,128,256,Ut),new St(32,128,258,1024,Ut),new St(32,258,258,4096,Ut)];function Lt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=dt,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),mt(this.dyn_ltree),mt(this.dyn_dtree),mt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),mt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),mt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Ft=t=>{if(!t||!t.state)return wt(t,et);t.total_in=t.total_out=0,t.data_type=ot;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:pt,t.adler=2===e.wrap?0:1,e.last_flush=W,j(e),$},Ot=t=>{const e=Ft(t);var a;return e===$&&((a=t.state).window_size=2*a.w_size,mt(a.head),a.max_lazy_match=Tt[a.level].max_lazy,a.good_match=Tt[a.level].good_length,a.nice_match=Tt[a.level].nice_length,a.max_chain_length=Tt[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Dt=(t,e,a,n,r,i)=>{if(!t)return et;let s=1;if(e===rt&&(e=6),n<0?(s=0,n=-n):n>15&&(s=2,n-=16),r<1||r>9||a!==dt||n<8||n>15||e<0||e>9||i<0||i>lt)return wt(t,et);8===n&&(n=9);const _=new Lt;return t.state=_,_.strm=t,_.wrap=s,_.gzhead=null,_.w_bits=n,_.w_size=1<<_.w_bits,_.w_mask=_.w_size-1,_.hash_bits=r+7,_.hash_size=1<<_.hash_bits,_.hash_mask=_.hash_size-1,_.hash_shift=~~((_.hash_bits+3-1)/3),_.window=new Uint8Array(2*_.w_size),_.head=new Uint16Array(_.hash_size),_.prev=new Uint16Array(_.w_size),_.lit_bufsize=1<<r+6,_.pending_buf_size=4*_.lit_bufsize,_.pending_buf=new Uint8Array(_.pending_buf_size),_.d_buf=1*_.lit_bufsize,_.l_buf=3*_.lit_bufsize,_.level=e,_.strategy=i,_.method=a,Ot(t)};var Nt={deflateInit:(t,e)=>Dt(t,e,dt,15,8,ht),deflateInit2:Dt,deflateReset:Ot,deflateResetKeep:Ft,deflateSetHeader:(t,e)=>t&&t.state?2!==t.state.wrap?et:(t.state.gzhead=e,$):et,deflate:(t,e)=>{let a,n;if(!t||!t.state||e>V||e<0)return t?wt(t,et):et;const r=t.state;if(!t.output||!t.input&&0!==t.avail_in||r.status===gt&&e!==Q)return wt(t,0===t.avail_out?nt:et);r.strm=t;const i=r.last_flush;if(r.last_flush=e,42===r.status)if(2===r.wrap)t.adler=0,kt(r,31),kt(r,139),kt(r,8),r.gzhead?(kt(r,(r.gzhead.text?1:0)+(r.gzhead.hcrc?2:0)+(r.gzhead.extra?4:0)+(r.gzhead.name?8:0)+(r.gzhead.comment?16:0)),kt(r,255&r.gzhead.time),kt(r,r.gzhead.time>>8&255),kt(r,r.gzhead.time>>16&255),kt(r,r.gzhead.time>>24&255),kt(r,9===r.level?2:r.strategy>=st||r.level<2?4:0),kt(r,255&r.gzhead.os),r.gzhead.extra&&r.gzhead.extra.length&&(kt(r,255&r.gzhead.extra.length),kt(r,r.gzhead.extra.length>>8&255)),r.gzhead.hcrc&&(t.adler=H(t.adler,r.pending_buf,r.pending,0)),r.gzindex=0,r.status=69):(kt(r,0),kt(r,0),kt(r,0),kt(r,0),kt(r,0),kt(r,9===r.level?2:r.strategy>=st||r.level<2?4:0),kt(r,3),r.status=pt);else{let e=dt+(r.w_bits-8<<4)<<8,a=-1;a=r.strategy>=st||r.level<2?0:r.level<6?1:6===r.level?2:3,e|=a<<6,0!==r.strstart&&(e|=32),e+=31-e%31,r.status=pt,xt(r,e),0!==r.strstart&&(xt(r,t.adler>>>16),xt(r,65535&t.adler)),t.adler=1}if(69===r.status)if(r.gzhead.extra){for(a=r.pending;r.gzindex<(65535&r.gzhead.extra.length)&&(r.pending!==r.pending_buf_size||(r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),yt(t),a=r.pending,r.pending!==r.pending_buf_size));)kt(r,255&r.gzhead.extra[r.gzindex]),r.gzindex++;r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),r.gzindex===r.gzhead.extra.length&&(r.gzindex=0,r.status=73)}else r.status=73;if(73===r.status)if(r.gzhead.name){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),yt(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.name.length?255&r.gzhead.name.charCodeAt(r.gzindex++):0,kt(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.gzindex=0,r.status=91)}else r.status=91;if(91===r.status)if(r.gzhead.comment){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),yt(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.comment.length?255&r.gzhead.comment.charCodeAt(r.gzindex++):0,kt(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.status=ct)}else r.status=ct;if(r.status===ct&&(r.gzhead.hcrc?(r.pending+2>r.pending_buf_size&&yt(t),r.pending+2<=r.pending_buf_size&&(kt(r,255&t.adler),kt(r,t.adler>>8&255),t.adler=0,r.status=pt)):r.status=pt),0!==r.pending){if(yt(t),0===t.avail_out)return r.last_flush=-1,$}else if(0===t.avail_in&&bt(e)<=bt(i)&&e!==Q)return wt(t,nt);if(r.status===gt&&0!==t.avail_in)return wt(t,nt);if(0!==t.avail_in||0!==r.lookahead||e!==W&&r.status!==gt){let a=r.strategy===st?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Zt(t),0===t.lookahead)){if(e===W)return 1;break}if(t.match_length=0,a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(zt(t,!1),0===t.strm.avail_out)?1:2})(r,e):r.strategy===_t?((t,e)=>{let a,n,r,i;const s=t.window;for(;;){if(t.lookahead<=ut){if(Zt(t),t.lookahead<=ut&&e===W)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(r=t.strstart-1,n=s[r],n===s[++r]&&n===s[++r]&&n===s[++r])){i=t.strstart+ut;do{}while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&r<i);t.match_length=ut-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=G(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(zt(t,!1),0===t.strm.avail_out)?1:2})(r,e):Tt[r.level].func(r,e);if(3!==a&&4!==a||(r.status=gt),1===a||3===a)return 0===t.avail_out&&(r.last_flush=-1),$;if(2===a&&(e===q?X(r):e!==V&&(K(r,0,0,!1),e===J&&(mt(r.head),0===r.lookahead&&(r.strstart=0,r.block_start=0,r.insert=0))),yt(t),0===t.avail_out))return r.last_flush=-1,$}return e!==Q?$:r.wrap<=0?tt:(2===r.wrap?(kt(r,255&t.adler),kt(r,t.adler>>8&255),kt(r,t.adler>>16&255),kt(r,t.adler>>24&255),kt(r,255&t.total_in),kt(r,t.total_in>>8&255),kt(r,t.total_in>>16&255),kt(r,t.total_in>>24&255)):(xt(r,t.adler>>>16),xt(r,65535&t.adler)),yt(t),r.wrap>0&&(r.wrap=-r.wrap),0!==r.pending?$:tt)},deflateEnd:t=>{if(!t||!t.state)return et;const e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==ct&&e!==pt&&e!==gt?wt(t,et):(t.state=null,e===pt?wt(t,at):$)},deflateSetDictionary:(t,e)=>{let a=e.length;if(!t||!t.state)return et;const n=t.state,r=n.wrap;if(2===r||1===r&&42!==n.status||n.lookahead)return et;if(1===r&&(t.adler=C(t.adler,e,a,0)),n.wrap=0,a>=n.w_size){0===r&&(mt(n.head),n.strstart=0,n.block_start=0,n.insert=0);let t=new Uint8Array(n.w_size);t.set(e.subarray(a-n.w_size,a),0),e=t,a=n.w_size}const i=t.avail_in,s=t.next_in,_=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Zt(n);n.lookahead>=3;){let t=n.strstart,e=n.lookahead-2;do{n.ins_h=vt(n,n.ins_h,n.window[t+3-1]),n.prev[t&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=t,t++}while(--e);n.strstart=t,n.lookahead=2,Zt(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=2,n.match_available=0,t.next_in=s,t.input=_,t.avail_in=i,n.wrap=r,$},deflateInfo:"pako deflate (from Nodeca project)"};const It=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Ct=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)It(a,e)&&(t[e]=a[e])}}return t},Bt=t=>{let e=0;for(let a=0,n=t.length;a<n;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,n=0,r=t.length;e<r;e++){let r=t[e];a.set(r,n),n+=r.length}return a};let Ht=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Ht=!1}const Mt=new Uint8Array(256);for(let t=0;t<256;t++)Mt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Mt[254]=Mt[254]=1;var Pt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,n,r,i,s=t.length,_=0;for(r=0;r<s;r++)a=t.charCodeAt(r),55296==(64512&a)&&r+1<s&&(n=t.charCodeAt(r+1),56320==(64512&n)&&(a=65536+(a-55296<<10)+(n-56320),r++)),_+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(_),i=0,r=0;i<_;r++)a=t.charCodeAt(r),55296==(64512&a)&&r+1<s&&(n=t.charCodeAt(r+1),56320==(64512&n)&&(a=65536+(a-55296<<10)+(n-56320),r++)),a<128?e[i++]=a:a<2048?(e[i++]=192|a>>>6,e[i++]=128|63&a):a<65536?(e[i++]=224|a>>>12,e[i++]=128|a>>>6&63,e[i++]=128|63&a):(e[i++]=240|a>>>18,e[i++]=128|a>>>12&63,e[i++]=128|a>>>6&63,e[i++]=128|63&a);return e};var jt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Kt=Object.prototype.toString,{Z_NO_FLUSH:Yt,Z_SYNC_FLUSH:Gt,Z_FULL_FLUSH:Xt,Z_FINISH:Wt,Z_OK:qt,Z_STREAM_END:Jt,Z_DEFAULT_COMPRESSION:Qt,Z_DEFAULT_STRATEGY:Vt,Z_DEFLATED:$t}=P;function te(t){this.options=Ct({level:Qt,method:$t,chunkSize:16384,windowBits:15,memLevel:8,strategy:Vt},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new jt,this.strm.avail_out=0;let a=Nt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==qt)throw new Error(M[a]);if(e.header&&Nt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Pt(e.dictionary):"[object ArrayBuffer]"===Kt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Nt.deflateSetDictionary(this.strm,t),a!==qt)throw new Error(M[a]);this._dict_set=!0}}function ee(t,e){const a=new te(e);if(a.push(t,!0),a.err)throw a.msg||M[a.err];return a.result}te.prototype.push=function(t,e){const a=this.strm,n=this.options.chunkSize;let r,i;if(this.ended)return!1;for(i=e===~~e?e:!0===e?Wt:Yt,"string"==typeof t?a.input=Pt(t):"[object ArrayBuffer]"===Kt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(n),a.next_out=0,a.avail_out=n),(i===Gt||i===Xt)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(r=Nt.deflate(a,i),r===Jt)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),r=Nt.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===qt;if(0!==a.avail_out){if(i>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},te.prototype.onData=function(t){this.chunks.push(t)},te.prototype.onEnd=function(t){t===qt&&(this.result=Bt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var ae=te,ne=ee,re=function(t,e){return(e=e||{}).raw=!0,ee(t,e)},ie=function(t,e){return(e=e||{}).gzip=!0,ee(t,e)},se=P,_e={Deflate:ae,deflate:ne,deflateRaw:re,gzip:ie,constants:se};t.Deflate=ae,t.constants=se,t.default=_e,t.deflate=ne,t.deflateRaw=re,t.gzip=ie,Object.defineProperty(t,"__esModule",{value:!0})}));


/***/ }),

/***/ 2152:
/*!***************************************************************!*\
  !*** ./src/app/_core/third-party/pako.js/pako_inflate.min.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
!function(e,t){ true?t(exports):0}(this,(function(e){"use strict";var t=(e,t,i,n)=>{let a=65535&e|0,r=e>>>16&65535|0,o=0;for(;0!==i;){o=i>2e3?2e3:i,i-=o;do{a=a+t[n++]|0,r=r+a|0}while(--o);a%=65521,r%=65521}return a|r<<16|0};const i=new Uint32Array((()=>{let e,t=[];for(var i=0;i<256;i++){e=i;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[i]=e}return t})());var n=(e,t,n,a)=>{const r=i,o=a+n;e^=-1;for(let i=a;i<o;i++)e=e>>>8^r[255&(e^t[i])];return-1^e};var a=function(e,t){let i,n,a,r,o,s,l,d,f,c,h,u,w,b,k,m,_,g,p,v,x,y,E,R;const A=e.state;i=e.next_in,E=e.input,n=i+(e.avail_in-5),a=e.next_out,R=e.output,r=a-(t-e.avail_out),o=a+(e.avail_out-257),s=A.dmax,l=A.wsize,d=A.whave,f=A.wnext,c=A.window,h=A.hold,u=A.bits,w=A.lencode,b=A.distcode,k=(1<<A.lenbits)-1,m=(1<<A.distbits)-1;e:do{u<15&&(h+=E[i++]<<u,u+=8,h+=E[i++]<<u,u+=8),_=w[h&k];t:for(;;){if(g=_>>>24,h>>>=g,u-=g,g=_>>>16&255,0===g)R[a++]=65535&_;else{if(!(16&g)){if(0==(64&g)){_=w[(65535&_)+(h&(1<<g)-1)];continue t}if(32&g){A.mode=12;break e}e.msg="invalid literal/length code",A.mode=30;break e}p=65535&_,g&=15,g&&(u<g&&(h+=E[i++]<<u,u+=8),p+=h&(1<<g)-1,h>>>=g,u-=g),u<15&&(h+=E[i++]<<u,u+=8,h+=E[i++]<<u,u+=8),_=b[h&m];i:for(;;){if(g=_>>>24,h>>>=g,u-=g,g=_>>>16&255,!(16&g)){if(0==(64&g)){_=b[(65535&_)+(h&(1<<g)-1)];continue i}e.msg="invalid distance code",A.mode=30;break e}if(v=65535&_,g&=15,u<g&&(h+=E[i++]<<u,u+=8,u<g&&(h+=E[i++]<<u,u+=8)),v+=h&(1<<g)-1,v>s){e.msg="invalid distance too far back",A.mode=30;break e}if(h>>>=g,u-=g,g=a-r,v>g){if(g=v-g,g>d&&A.sane){e.msg="invalid distance too far back",A.mode=30;break e}if(x=0,y=c,0===f){if(x+=l-g,g<p){p-=g;do{R[a++]=c[x++]}while(--g);x=a-v,y=R}}else if(f<g){if(x+=l+f-g,g-=f,g<p){p-=g;do{R[a++]=c[x++]}while(--g);if(x=0,f<p){g=f,p-=g;do{R[a++]=c[x++]}while(--g);x=a-v,y=R}}}else if(x+=f-g,g<p){p-=g;do{R[a++]=c[x++]}while(--g);x=a-v,y=R}for(;p>2;)R[a++]=y[x++],R[a++]=y[x++],R[a++]=y[x++],p-=3;p&&(R[a++]=y[x++],p>1&&(R[a++]=y[x++]))}else{x=a-v;do{R[a++]=R[x++],R[a++]=R[x++],R[a++]=R[x++],p-=3}while(p>2);p&&(R[a++]=R[x++],p>1&&(R[a++]=R[x++]))}break}}break}}while(i<n&&a<o);p=u>>3,i-=p,u-=p<<3,h&=(1<<u)-1,e.next_in=i,e.next_out=a,e.avail_in=i<n?n-i+5:5-(i-n),e.avail_out=a<o?o-a+257:257-(a-o),A.hold=h,A.bits=u};const r=15,o=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),s=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),l=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),d=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var f=(e,t,i,n,a,f,c,h)=>{const u=h.bits;let w,b,k,m,_,g,p=0,v=0,x=0,y=0,E=0,R=0,A=0,Z=0,S=0,T=0,O=null,U=0;const D=new Uint16Array(16),I=new Uint16Array(16);let B,N,C,z=null,F=0;for(p=0;p<=r;p++)D[p]=0;for(v=0;v<n;v++)D[t[i+v]]++;for(E=u,y=r;y>=1&&0===D[y];y--);if(E>y&&(E=y),0===y)return a[f++]=20971520,a[f++]=20971520,h.bits=1,0;for(x=1;x<y&&0===D[x];x++);for(E<x&&(E=x),Z=1,p=1;p<=r;p++)if(Z<<=1,Z-=D[p],Z<0)return-1;if(Z>0&&(0===e||1!==y))return-1;for(I[1]=0,p=1;p<r;p++)I[p+1]=I[p]+D[p];for(v=0;v<n;v++)0!==t[i+v]&&(c[I[t[i+v]]++]=v);if(0===e?(O=z=c,g=19):1===e?(O=o,U-=257,z=s,F-=257,g=256):(O=l,z=d,g=-1),T=0,v=0,p=x,_=f,R=E,A=0,k=-1,S=1<<E,m=S-1,1===e&&S>852||2===e&&S>592)return 1;for(;;){B=p-A,c[v]<g?(N=0,C=c[v]):c[v]>g?(N=z[F+c[v]],C=O[U+c[v]]):(N=96,C=0),w=1<<p-A,b=1<<R,x=b;do{b-=w,a[_+(T>>A)+b]=B<<24|N<<16|C|0}while(0!==b);for(w=1<<p-1;T&w;)w>>=1;if(0!==w?(T&=w-1,T+=w):T=0,v++,0==--D[p]){if(p===y)break;p=t[i+c[v]]}if(p>E&&(T&m)!==k){for(0===A&&(A=E),_+=x,R=p-A,Z=1<<R;R+A<y&&(Z-=D[R+A],!(Z<=0));)R++,Z<<=1;if(S+=1<<R,1===e&&S>852||2===e&&S>592)return 1;k=T&m,a[k]=E<<24|R<<16|_-f|0}}return 0!==T&&(a[_+T]=p-A<<24|64<<16|0),h.bits=E,0},c={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{Z_FINISH:h,Z_BLOCK:u,Z_TREES:w,Z_OK:b,Z_STREAM_END:k,Z_NEED_DICT:m,Z_STREAM_ERROR:_,Z_DATA_ERROR:g,Z_MEM_ERROR:p,Z_BUF_ERROR:v,Z_DEFLATED:x}=c,y=12,E=30,R=e=>(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24);function A(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Z=e=>{if(!e||!e.state)return _;const t=e.state;return e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=1,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new Int32Array(852),t.distcode=t.distdyn=new Int32Array(592),t.sane=1,t.back=-1,b},S=e=>{if(!e||!e.state)return _;const t=e.state;return t.wsize=0,t.whave=0,t.wnext=0,Z(e)},T=(e,t)=>{let i;if(!e||!e.state)return _;const n=e.state;return t<0?(i=0,t=-t):(i=1+(t>>4),t<48&&(t&=15)),t&&(t<8||t>15)?_:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=i,n.wbits=t,S(e))},O=(e,t)=>{if(!e)return _;const i=new A;e.state=i,i.window=null;const n=T(e,t);return n!==b&&(e.state=null),n};let U,D,I=!0;const B=e=>{if(I){U=new Int32Array(512),D=new Int32Array(32);let t=0;for(;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(f(1,e.lens,0,288,U,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;f(2,e.lens,0,32,D,0,e.work,{bits:5}),I=!1}e.lencode=U,e.lenbits=9,e.distcode=D,e.distbits=5},N=(e,t,i,n)=>{let a;const r=e.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new Uint8Array(r.wsize)),n>=r.wsize?(r.window.set(t.subarray(i-r.wsize,i),0),r.wnext=0,r.whave=r.wsize):(a=r.wsize-r.wnext,a>n&&(a=n),r.window.set(t.subarray(i-n,i-n+a),r.wnext),(n-=a)?(r.window.set(t.subarray(i-n,i),0),r.wnext=n,r.whave=r.wsize):(r.wnext+=a,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=a))),0};var C={inflateReset:S,inflateReset2:T,inflateResetKeep:Z,inflateInit:e=>O(e,15),inflateInit2:O,inflate:(e,i)=>{let r,o,s,l,d,c,A,Z,S,T,O,U,D,I,C,z,F,L,M,H,j,K,P=0;const Y=new Uint8Array(4);let G,X;const W=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return _;r=e.state,r.mode===y&&(r.mode=13),d=e.next_out,s=e.output,A=e.avail_out,l=e.next_in,o=e.input,c=e.avail_in,Z=r.hold,S=r.bits,T=c,O=A,K=b;e:for(;;)switch(r.mode){case 1:if(0===r.wrap){r.mode=13;break}for(;S<16;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(2&r.wrap&&35615===Z){r.check=0,Y[0]=255&Z,Y[1]=Z>>>8&255,r.check=n(r.check,Y,2,0),Z=0,S=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&Z)<<8)+(Z>>8))%31){e.msg="incorrect header check",r.mode=E;break}if((15&Z)!==x){e.msg="unknown compression method",r.mode=E;break}if(Z>>>=4,S-=4,j=8+(15&Z),0===r.wbits)r.wbits=j;else if(j>r.wbits){e.msg="invalid window size",r.mode=E;break}r.dmax=1<<r.wbits,e.adler=r.check=1,r.mode=512&Z?10:y,Z=0,S=0;break;case 2:for(;S<16;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(r.flags=Z,(255&r.flags)!==x){e.msg="unknown compression method",r.mode=E;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=E;break}r.head&&(r.head.text=Z>>8&1),512&r.flags&&(Y[0]=255&Z,Y[1]=Z>>>8&255,r.check=n(r.check,Y,2,0)),Z=0,S=0,r.mode=3;case 3:for(;S<32;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}r.head&&(r.head.time=Z),512&r.flags&&(Y[0]=255&Z,Y[1]=Z>>>8&255,Y[2]=Z>>>16&255,Y[3]=Z>>>24&255,r.check=n(r.check,Y,4,0)),Z=0,S=0,r.mode=4;case 4:for(;S<16;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}r.head&&(r.head.xflags=255&Z,r.head.os=Z>>8),512&r.flags&&(Y[0]=255&Z,Y[1]=Z>>>8&255,r.check=n(r.check,Y,2,0)),Z=0,S=0,r.mode=5;case 5:if(1024&r.flags){for(;S<16;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}r.length=Z,r.head&&(r.head.extra_len=Z),512&r.flags&&(Y[0]=255&Z,Y[1]=Z>>>8&255,r.check=n(r.check,Y,2,0)),Z=0,S=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(U=r.length,U>c&&(U=c),U&&(r.head&&(j=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Uint8Array(r.head.extra_len)),r.head.extra.set(o.subarray(l,l+U),j)),512&r.flags&&(r.check=n(r.check,o,U,l)),c-=U,l+=U,r.length-=U),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===c)break e;U=0;do{j=o[l+U++],r.head&&j&&r.length<65536&&(r.head.name+=String.fromCharCode(j))}while(j&&U<c);if(512&r.flags&&(r.check=n(r.check,o,U,l)),c-=U,l+=U,j)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===c)break e;U=0;do{j=o[l+U++],r.head&&j&&r.length<65536&&(r.head.comment+=String.fromCharCode(j))}while(j&&U<c);if(512&r.flags&&(r.check=n(r.check,o,U,l)),c-=U,l+=U,j)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;S<16;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(Z!==(65535&r.check)){e.msg="header crc mismatch",r.mode=E;break}Z=0,S=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=y;break;case 10:for(;S<32;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}e.adler=r.check=R(Z),Z=0,S=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=d,e.avail_out=A,e.next_in=l,e.avail_in=c,r.hold=Z,r.bits=S,m;e.adler=r.check=1,r.mode=y;case y:if(i===u||i===w)break e;case 13:if(r.last){Z>>>=7&S,S-=7&S,r.mode=27;break}for(;S<3;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}switch(r.last=1&Z,Z>>>=1,S-=1,3&Z){case 0:r.mode=14;break;case 1:if(B(r),r.mode=20,i===w){Z>>>=2,S-=2;break e}break;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=E}Z>>>=2,S-=2;break;case 14:for(Z>>>=7&S,S-=7&S;S<32;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if((65535&Z)!=(Z>>>16^65535)){e.msg="invalid stored block lengths",r.mode=E;break}if(r.length=65535&Z,Z=0,S=0,r.mode=15,i===w)break e;case 15:r.mode=16;case 16:if(U=r.length,U){if(U>c&&(U=c),U>A&&(U=A),0===U)break e;s.set(o.subarray(l,l+U),d),c-=U,l+=U,A-=U,d+=U,r.length-=U;break}r.mode=y;break;case 17:for(;S<14;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(r.nlen=257+(31&Z),Z>>>=5,S-=5,r.ndist=1+(31&Z),Z>>>=5,S-=5,r.ncode=4+(15&Z),Z>>>=4,S-=4,r.nlen>286||r.ndist>30){e.msg="too many length or distance symbols",r.mode=E;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;S<3;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}r.lens[W[r.have++]]=7&Z,Z>>>=3,S-=3}for(;r.have<19;)r.lens[W[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,G={bits:r.lenbits},K=f(0,r.lens,0,19,r.lencode,0,r.work,G),r.lenbits=G.bits,K){e.msg="invalid code lengths set",r.mode=E;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;P=r.lencode[Z&(1<<r.lenbits)-1],C=P>>>24,z=P>>>16&255,F=65535&P,!(C<=S);){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(F<16)Z>>>=C,S-=C,r.lens[r.have++]=F;else{if(16===F){for(X=C+2;S<X;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(Z>>>=C,S-=C,0===r.have){e.msg="invalid bit length repeat",r.mode=E;break}j=r.lens[r.have-1],U=3+(3&Z),Z>>>=2,S-=2}else if(17===F){for(X=C+3;S<X;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}Z>>>=C,S-=C,j=0,U=3+(7&Z),Z>>>=3,S-=3}else{for(X=C+7;S<X;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}Z>>>=C,S-=C,j=0,U=11+(127&Z),Z>>>=7,S-=7}if(r.have+U>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=E;break}for(;U--;)r.lens[r.have++]=j}}if(r.mode===E)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=E;break}if(r.lenbits=9,G={bits:r.lenbits},K=f(1,r.lens,0,r.nlen,r.lencode,0,r.work,G),r.lenbits=G.bits,K){e.msg="invalid literal/lengths set",r.mode=E;break}if(r.distbits=6,r.distcode=r.distdyn,G={bits:r.distbits},K=f(2,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,G),r.distbits=G.bits,K){e.msg="invalid distances set",r.mode=E;break}if(r.mode=20,i===w)break e;case 20:r.mode=21;case 21:if(c>=6&&A>=258){e.next_out=d,e.avail_out=A,e.next_in=l,e.avail_in=c,r.hold=Z,r.bits=S,a(e,O),d=e.next_out,s=e.output,A=e.avail_out,l=e.next_in,o=e.input,c=e.avail_in,Z=r.hold,S=r.bits,r.mode===y&&(r.back=-1);break}for(r.back=0;P=r.lencode[Z&(1<<r.lenbits)-1],C=P>>>24,z=P>>>16&255,F=65535&P,!(C<=S);){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(z&&0==(240&z)){for(L=C,M=z,H=F;P=r.lencode[H+((Z&(1<<L+M)-1)>>L)],C=P>>>24,z=P>>>16&255,F=65535&P,!(L+C<=S);){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}Z>>>=L,S-=L,r.back+=L}if(Z>>>=C,S-=C,r.back+=C,r.length=F,0===z){r.mode=26;break}if(32&z){r.back=-1,r.mode=y;break}if(64&z){e.msg="invalid literal/length code",r.mode=E;break}r.extra=15&z,r.mode=22;case 22:if(r.extra){for(X=r.extra;S<X;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}r.length+=Z&(1<<r.extra)-1,Z>>>=r.extra,S-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;P=r.distcode[Z&(1<<r.distbits)-1],C=P>>>24,z=P>>>16&255,F=65535&P,!(C<=S);){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(0==(240&z)){for(L=C,M=z,H=F;P=r.distcode[H+((Z&(1<<L+M)-1)>>L)],C=P>>>24,z=P>>>16&255,F=65535&P,!(L+C<=S);){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}Z>>>=L,S-=L,r.back+=L}if(Z>>>=C,S-=C,r.back+=C,64&z){e.msg="invalid distance code",r.mode=E;break}r.offset=F,r.extra=15&z,r.mode=24;case 24:if(r.extra){for(X=r.extra;S<X;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}r.offset+=Z&(1<<r.extra)-1,Z>>>=r.extra,S-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=E;break}r.mode=25;case 25:if(0===A)break e;if(U=O-A,r.offset>U){if(U=r.offset-U,U>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=E;break}U>r.wnext?(U-=r.wnext,D=r.wsize-U):D=r.wnext-U,U>r.length&&(U=r.length),I=r.window}else I=s,D=d-r.offset,U=r.length;U>A&&(U=A),A-=U,r.length-=U;do{s[d++]=I[D++]}while(--U);0===r.length&&(r.mode=21);break;case 26:if(0===A)break e;s[d++]=r.length,A--,r.mode=21;break;case 27:if(r.wrap){for(;S<32;){if(0===c)break e;c--,Z|=o[l++]<<S,S+=8}if(O-=A,e.total_out+=O,r.total+=O,O&&(e.adler=r.check=r.flags?n(r.check,s,O,d-O):t(r.check,s,O,d-O)),O=A,(r.flags?Z:R(Z))!==r.check){e.msg="incorrect data check",r.mode=E;break}Z=0,S=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;S<32;){if(0===c)break e;c--,Z+=o[l++]<<S,S+=8}if(Z!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=E;break}Z=0,S=0}r.mode=29;case 29:K=k;break e;case E:K=g;break e;case 31:return p;case 32:default:return _}return e.next_out=d,e.avail_out=A,e.next_in=l,e.avail_in=c,r.hold=Z,r.bits=S,(r.wsize||O!==e.avail_out&&r.mode<E&&(r.mode<27||i!==h))&&N(e,e.output,e.next_out,O-e.avail_out),T-=e.avail_in,O-=e.avail_out,e.total_in+=T,e.total_out+=O,r.total+=O,r.wrap&&O&&(e.adler=r.check=r.flags?n(r.check,s,O,e.next_out-O):t(r.check,s,O,e.next_out-O)),e.data_type=r.bits+(r.last?64:0)+(r.mode===y?128:0)+(20===r.mode||15===r.mode?256:0),(0===T&&0===O||i===h)&&K===b&&(K=v),K},inflateEnd:e=>{if(!e||!e.state)return _;let t=e.state;return t.window&&(t.window=null),e.state=null,b},inflateGetHeader:(e,t)=>{if(!e||!e.state)return _;const i=e.state;return 0==(2&i.wrap)?_:(i.head=t,t.done=!1,b)},inflateSetDictionary:(e,i)=>{const n=i.length;let a,r,o;return e&&e.state?(a=e.state,0!==a.wrap&&11!==a.mode?_:11===a.mode&&(r=1,r=t(r,i,n,0),r!==a.check)?g:(o=N(e,i,n,n),o?(a.mode=31,p):(a.havedict=1,b))):_},inflateInfo:"pako inflate (from Nodeca project)"};const z=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var F=function(e){const t=Array.prototype.slice.call(arguments,1);for(;t.length;){const i=t.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(const t in i)z(i,t)&&(e[t]=i[t])}}return e},L=e=>{let t=0;for(let i=0,n=e.length;i<n;i++)t+=e[i].length;const i=new Uint8Array(t);for(let t=0,n=0,a=e.length;t<a;t++){let a=e[t];i.set(a,n),n+=a.length}return i};let M=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){M=!1}const H=new Uint8Array(256);for(let e=0;e<256;e++)H[e]=e>=252?6:e>=248?5:e>=240?4:e>=224?3:e>=192?2:1;H[254]=H[254]=1;var j=e=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(e);let t,i,n,a,r,o=e.length,s=0;for(a=0;a<o;a++)i=e.charCodeAt(a),55296==(64512&i)&&a+1<o&&(n=e.charCodeAt(a+1),56320==(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),a++)),s+=i<128?1:i<2048?2:i<65536?3:4;for(t=new Uint8Array(s),r=0,a=0;r<s;a++)i=e.charCodeAt(a),55296==(64512&i)&&a+1<o&&(n=e.charCodeAt(a+1),56320==(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),a++)),i<128?t[r++]=i:i<2048?(t[r++]=192|i>>>6,t[r++]=128|63&i):i<65536?(t[r++]=224|i>>>12,t[r++]=128|i>>>6&63,t[r++]=128|63&i):(t[r++]=240|i>>>18,t[r++]=128|i>>>12&63,t[r++]=128|i>>>6&63,t[r++]=128|63&i);return t},K=(e,t)=>{const i=t||e.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(e.subarray(0,t));let n,a;const r=new Array(2*i);for(a=0,n=0;n<i;){let t=e[n++];if(t<128){r[a++]=t;continue}let o=H[t];if(o>4)r[a++]=65533,n+=o-1;else{for(t&=2===o?31:3===o?15:7;o>1&&n<i;)t=t<<6|63&e[n++],o--;o>1?r[a++]=65533:t<65536?r[a++]=t:(t-=65536,r[a++]=55296|t>>10&1023,r[a++]=56320|1023&t)}}return((e,t)=>{if(t<65534&&e.subarray&&M)return String.fromCharCode.apply(null,e.length===t?e:e.subarray(0,t));let i="";for(let n=0;n<t;n++)i+=String.fromCharCode(e[n]);return i})(r,a)},P=(e,t)=>{(t=t||e.length)>e.length&&(t=e.length);let i=t-1;for(;i>=0&&128==(192&e[i]);)i--;return i<0||0===i?t:i+H[e[i]]>t?i:t},Y={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};var G=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};var X=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const W=Object.prototype.toString,{Z_NO_FLUSH:q,Z_FINISH:J,Z_OK:Q,Z_STREAM_END:V,Z_NEED_DICT:$,Z_STREAM_ERROR:ee,Z_DATA_ERROR:te,Z_MEM_ERROR:ie}=c;function ne(e){this.options=F({chunkSize:65536,windowBits:15,to:""},e||{});const t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new G,this.strm.avail_out=0;let i=C.inflateInit2(this.strm,t.windowBits);if(i!==Q)throw new Error(Y[i]);if(this.header=new X,C.inflateGetHeader(this.strm,this.header),t.dictionary&&("string"==typeof t.dictionary?t.dictionary=j(t.dictionary):"[object ArrayBuffer]"===W.call(t.dictionary)&&(t.dictionary=new Uint8Array(t.dictionary)),t.raw&&(i=C.inflateSetDictionary(this.strm,t.dictionary),i!==Q)))throw new Error(Y[i])}function ae(e,t){const i=new ne(t);if(i.push(e),i.err)throw i.msg||Y[i.err];return i.result}ne.prototype.push=function(e,t){const i=this.strm,n=this.options.chunkSize,a=this.options.dictionary;let r,o,s;if(this.ended)return!1;for(o=t===~~t?t:!0===t?J:q,"[object ArrayBuffer]"===W.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;;){for(0===i.avail_out&&(i.output=new Uint8Array(n),i.next_out=0,i.avail_out=n),r=C.inflate(i,o),r===$&&a&&(r=C.inflateSetDictionary(i,a),r===Q?r=C.inflate(i,o):r===te&&(r=$));i.avail_in>0&&r===V&&i.state.wrap>0&&0!==e[i.next_in];)C.inflateReset(i),r=C.inflate(i,o);switch(r){case ee:case te:case $:case ie:return this.onEnd(r),this.ended=!0,!1}if(s=i.avail_out,i.next_out&&(0===i.avail_out||r===V))if("string"===this.options.to){let e=P(i.output,i.next_out),t=i.next_out-e,a=K(i.output,e);i.next_out=t,i.avail_out=n-t,t&&i.output.set(i.output.subarray(e,e+t),0),this.onData(a)}else this.onData(i.output.length===i.next_out?i.output:i.output.subarray(0,i.next_out));if(r!==Q||0!==s){if(r===V)return r=C.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,!0;if(0===i.avail_in)break}}return!0},ne.prototype.onData=function(e){this.chunks.push(e)},ne.prototype.onEnd=function(e){e===Q&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=L(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg};var re=ne,oe=ae,se=function(e,t){return(t=t||{}).raw=!0,ae(e,t)},le=ae,de=c,fe={Inflate:re,inflate:oe,inflateRaw:se,ungzip:le,constants:de};e.Inflate=re,e.constants=de,e.default=fe,e.inflate=oe,e.inflateRaw=se,e.ungzip=le,Object.defineProperty(e,"__esModule",{value:!0})}));


/***/ }),

/***/ 863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-accordion_2.entry.js": [
		79,
		"node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js"
	],
	"./ion-action-sheet.entry.js": [
		5593,
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		3225,
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		4812,
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		6655,
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		4856,
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		3059,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-breadcrumb_2.entry.js": [
		8648,
		"common",
		"node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js"
	],
	"./ion-button_2.entry.js": [
		8308,
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		4690,
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		4090,
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		6214,
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		9447,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		9689,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		8840,
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		749,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		9667,
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		3288,
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		5473,
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		3634,
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		2855,
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		495,
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		8737,
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		9632,
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-picker-column-internal.entry.js": [
		4446,
		"node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js"
	],
	"./ion-picker-internal.entry.js": [
		2275,
		"node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js"
	],
	"./ion-popover.entry.js": [
		8050,
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		8994,
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		3592,
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		5454,
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		290,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		2666,
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		4816,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		5534,
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		4902,
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		1938,
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		8179,
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		668,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		1624,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		9989,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		8902,
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		199,
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		8395,
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		6357,
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		8268,
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		5269,
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		2875,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 9259:
/*!***********************************************!*\
  !*** ./src/app/app.component.scss?ngResource ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "ion-list ion-item ion-label {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNDLGlCQUFBO0FBREgiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWxpc3Qge1xyXG5cdGlvbi1pdGVtIHtcclxuXHRcdGlvbi1sYWJlbCB7XHJcblx0XHRcdG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ== */";

/***/ }),

/***/ 8154:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/emoji-picker/emoji-picker.component.scss?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = ".emojis {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n.emojis .emoji {\n  font-size: 1.75rem;\n  padding: 0px 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtb2ppLXBpY2tlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLGFBQUE7RUFDQSxlQUFBO0VBQ0EsOEJBQUE7QUFDRDtBQUFDO0VBQ0Msa0JBQUE7RUFDQSxnQkFBQTtBQUVGIiwiZmlsZSI6ImVtb2ppLXBpY2tlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lbW9qaXMge1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LXdyYXA6IHdyYXA7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0LmVtb2ppIHtcblx0XHRmb250LXNpemU6IDEuNzVyZW07XG5cdFx0cGFkZGluZzogMHB4IDJweDtcblx0fVxufSJdfQ== */";

/***/ }),

/***/ 5363:
/*!*****************************************************************************************!*\
  !*** ./src/app/shared/components/encoded-image/encoded-image.component.scss?ngResource ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "img {\n  border-radius: 3px;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuY29kZWQtaW1hZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxrQkFBQTtFQUNBLGdCQUFBO0FBQ0QiLCJmaWxlIjoiZW5jb2RlZC1pbWFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImltZyB7XG5cdGJvcmRlci1yYWRpdXM6IDNweDtcblx0b3ZlcmZsb3c6IGhpZGRlbjtcbn0iXX0= */";

/***/ }),

/***/ 2911:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/qr-scanner/qr-scanner.component.scss?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "video {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFyLXNjYW5uZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxXQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUFDRCIsImZpbGUiOiJxci1zY2FubmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidmlkZW8ge1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OiAxMDAlO1xuXHRvYmplY3QtZml0OiBjb3Zlcjtcbn0iXX0= */";

/***/ }),

/***/ 9915:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/version-number/version-number.component.scss?ngResource ***!
  \*******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "span {\n  font-style: italic;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24tbnVtYmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Msa0JBQUE7QUFDRCIsImZpbGUiOiJ2ZXJzaW9uLW51bWJlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInNwYW4ge1xuXHRmb250LXN0eWxlOiBpdGFsaWM7XG59Il19 */";

/***/ }),

/***/ 1416:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/modals/contact-add/contact-add.modal.scss?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb250YWN0LWFkZC5tb2RhbC5zY3NzIn0= */";

/***/ }),

/***/ 1472:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/modals/conversation-add/conversation-add.modal.scss?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb252ZXJzYXRpb24tYWRkLm1vZGFsLnNjc3MifQ== */";

/***/ }),

/***/ 8287:
/*!*********************************************************************!*\
  !*** ./src/app/shared/modals/key-add/key-add.modal.scss?ngResource ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJrZXktYWRkLm1vZGFsLnNjc3MifQ== */";

/***/ }),

/***/ 7032:
/*!*************************************************************************!*\
  !*** ./src/app/shared/modals/key-share/key-share.modal.scss?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJrZXktc2hhcmUubW9kYWwuc2NzcyJ9 */";

/***/ }),

/***/ 7027:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/modals/message-add/message-add.modal.scss?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "ion-item.collapsible {\n  height: 0;\n  overflow: hidden;\n  transition: height 250ms ease-in-out;\n}\nion-item.collapsible.active {\n  height: 200px;\n  overflow-y: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2UtYWRkLm1vZGFsLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0M7RUFDQyxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtBQUFGO0FBQ0U7RUFDQyxhQUFBO0VBQ0Esa0JBQUE7QUFDSCIsImZpbGUiOiJtZXNzYWdlLWFkZC5tb2RhbC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWl0ZW0ge1xyXG5cdCYuY29sbGFwc2libGUge1xyXG5cdFx0aGVpZ2h0OiAwO1xyXG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdHRyYW5zaXRpb246IGhlaWdodCAyNTBtcyBlYXNlLWluLW91dDtcclxuXHRcdCYuYWN0aXZlIHtcclxuXHRcdFx0aGVpZ2h0OiAyMDBweDtcclxuXHRcdFx0b3ZlcmZsb3cteTogc2Nyb2xsO1xyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ== */";

/***/ }),

/***/ 5939:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/modals/message-import/message-import.modal.scss?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "ion-item.collapsible {\n  height: 0;\n  overflow: hidden;\n  transition: height 250ms ease-in-out;\n}\nion-item.collapsible.active {\n  height: 200px;\n  overflow-y: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2UtaW1wb3J0Lm1vZGFsLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0M7RUFDQyxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtBQUFGO0FBQ0U7RUFDQyxhQUFBO0VBQ0Esa0JBQUE7QUFDSCIsImZpbGUiOiJtZXNzYWdlLWltcG9ydC5tb2RhbC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWl0ZW0ge1xyXG5cdCYuY29sbGFwc2libGUge1xyXG5cdFx0aGVpZ2h0OiAwO1xyXG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdHRyYW5zaXRpb246IGhlaWdodCAyNTBtcyBlYXNlLWluLW91dDtcclxuXHRcdCYuYWN0aXZlIHtcclxuXHRcdFx0aGVpZ2h0OiAyMDBweDtcclxuXHRcdFx0b3ZlcmZsb3cteTogc2Nyb2xsO1xyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ== */";

/***/ }),

/***/ 9987:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/modals/message-share/message-share.modal.scss?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtZXNzYWdlLXNoYXJlLm1vZGFsLnNjc3MifQ== */";

/***/ }),

/***/ 7710:
/*!*********************************************************************!*\
  !*** ./src/app/shared/modals/qr-scan/qr-scan.modal.scss?ngResource ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJxci1zY2FuLm1vZGFsLnNjc3MifQ== */";

/***/ }),

/***/ 3383:
/*!***********************************************!*\
  !*** ./src/app/app.component.html?ngResource ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-app>\n\t<!-- <ion-menu side=\"start\" menuId=\"first\" contentId=\"main\">\n\t\t<ion-header translucent=\"true\">\n\t\t\t<ion-toolbar color=\"primary\">\n\t\t\t\t<ion-title>Menu</ion-title>\n\t\t\t</ion-toolbar>\n\t\t</ion-header>\n\t\t<ion-content>\n\t\t\t<ion-list>\n\t\t\t\t<ion-item \n\t\t\t\t\t*ngFor=\"let route of routes\"\n\t\t\t\t\t[class.active]=\"route.active\"\n\t\t\t\t\t[routerLink]=\"route.path\"\n\t\t\t\t\t(click)=\"menuClose()\"\n\t\t\t\t>\n\t\t\t\t\t<ion-icon name=\"{{(route.active) ? route.iconActive : route.icon}}\"></ion-icon>\n\t\t\t\t\t<ion-label>\n\t\t\t\t\t\t{{route.name}}\n\t\t\t\t\t</ion-label>\n\t\t\t\t</ion-item>\n\t\t\t</ion-list>\n\t\t</ion-content>\n\t</ion-menu> -->\n\t<ion-router-outlet id=\"main\"></ion-router-outlet>\n\t<ion-tabs>\n\t\t<ion-tab-bar slot=\"bottom\">\n\t\t\t<ion-tab-button\n\t\t\t\t*ngFor=\"let route of routes\"\n\t\t\t\t[class.selected]=\"route.active\"\n\t\t\t\t[class.tab-selected]=\"route.active\"\n\t\t\t\t[routerLink]=\"route.path\"\n\t\t\t\tcolor=\"primary\"\n\t\t\t>\n\t\t\t\t<ion-icon name=\"{{(route.active) ? route.iconActive : route.icon}}\"></ion-icon>\n\t\t\t\t<ion-label>\n\t\t\t\t\t{{route.name}}\n\t\t\t\t</ion-label>\n\t\t\t</ion-tab-button>\n\t\t</ion-tab-bar>\n\t</ion-tabs>\n</ion-app>\n";

/***/ }),

/***/ 7177:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/emoji-picker/emoji-picker.component.html?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ng-container *ngIf=\"emojiLists\">\r\n\t<div class=\"category\" *ngFor=\"let cat of emojiLists\">\r\n\t\t<h1>\r\n\t\t\t{{cat.name}}\r\n\t\t</h1>\r\n\t\t<div class=\"emojis\">\r\n\t\t\t<ng-container *ngFor=\"let e of cat.emojis\">\r\n\t\t\t\t<div *ngIf=\"!e?.primary\" class=\"emoji\" (click)=\"addEmoji(e)\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</div>\r\n\t\t\t\t<div *ngIf=\"e.primary\" class=\"emoji emoji-picker\" (click)=\"addEmoji(e.primary)\">\r\n\t\t\t\t\t{{e.primary}}\r\n\t\t\t\t</div>\r\n\t\t\t</ng-container>\r\n\t\t</div>\r\n\t</div>\r\n</ng-container>";

/***/ }),

/***/ 5151:
/*!*****************************************************************************************!*\
  !*** ./src/app/shared/components/encoded-image/encoded-image.component.html?ngResource ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<img [src]=\"renderedImage\">";

/***/ }),

/***/ 9638:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/qr-scanner/qr-scanner.component.html?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<video\r\n\t#cam\r\n\tautoplay\r\n\tplaysinline\r\n\tmuted\r\n></video>";

/***/ }),

/***/ 4855:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/version-number/version-number.component.html?ngResource ***!
  \*******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<span>{{version}}</span>";

/***/ }),

/***/ 2069:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/modals/contact-add/contact-add.modal.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header translucent=\"true\">\r\n\t<ion-toolbar color=\"primary\">\r\n\t\t<ion-title>\r\n\t\t\tAdd new Contact\r\n\t\t</ion-title>\r\n\t\t<ion-buttons slot=\"primary\">\r\n\t\t\t<ion-button (click)=\"dismiss()\">\r\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t</ion-toolbar> \r\n</ion-header>\r\n<ion-content>\r\n\t<form [formGroup]=\"newContactForm\">\r\n\t\t<ion-item>\r\n\t\t\t<ion-label position=\"floating\">\r\n\t\t\t\tContact Name\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-input ngDefaultControl formControlName=\"name\" placeholder=\"Name\" type=\"text\" required></ion-input>\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-label position=\"floating\">Public Key</ion-label>\r\n\t\t\t<ion-textarea ngDefaultControl formControlName=\"publicKey\" type=\"text\" required></ion-textarea>\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-icon name=\"qr-code-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>\r\n\t\t\t\tQR File:\r\n\t\t\t</ion-label>\r\n\t\t\t<input type=\"file\" formControlName=\"file\" (change)=\"parseFileQR($event)\">\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-icon name=\"qr-code-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>\r\n\t\t\t\tScan QR Code\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-button (click)=\"scanQR()\">\r\n\t\t\t\t<ion-icon name=\"camera-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t\t<ion-label>Open Camera</ion-label>\r\n\t\t\t</ion-button>\r\n\t\t</ion-item>\r\n\t</form>\r\n</ion-content>\r\n<ion-footer>\r\n\t<ion-toolbar>\r\n\t\t<ion-button expand=\"block\" [disabled]=\"!newContactForm.valid\" (click)=\"saveContact()\">Save</ion-button>\r\n\t</ion-toolbar>\r\n</ion-footer>\r\n";

/***/ }),

/***/ 2751:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/modals/conversation-add/conversation-add.modal.html?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header translucent=\"true\">\r\n\t<ion-toolbar color=\"primary\">\r\n\t\t<ion-title>\r\n\t\t\tCreate new Conversation\r\n\t\t</ion-title>\r\n\t\t<ion-buttons slot=\"primary\">\r\n\t\t\t<ion-button (click)=\"dismiss()\">\r\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t</ion-toolbar> \r\n</ion-header>\r\n<ion-content>\r\n\t<form [formGroup]=\"newConversationForm\">\r\n\t\t<ion-item>\r\n\t\t\t<ion-label position=\"floating\">\r\n\t\t\t\tConversation Name\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-input formControlName=\"name\" ngDefaultControl placeholder=\"Name\" type=\"text\"></ion-input>\r\n\t\t</ion-item>\r\n\t\t<ion-item *ngIf=\"(contacts$ | async) as contacts\">\r\n\t\t\t<ng-container *ngIf=\"contacts.length\">\r\n\t\t\t\t<ion-label>\r\n\t\t\t\t\tTo:\r\n\t\t\t\t</ion-label>\r\n\t\t\t\t<ion-select formControlName=\"to\" ngDefaultControl placeholder=\"Select a Contact\" (ionChange)=\"updateTo($event)\">\r\n\t\t\t\t\t<!-- <ion-select-option value=\"\">\r\n\t\t\t\t\t\tSelect a contact\r\n\t\t\t\t\t</ion-select-option> -->\r\n\t\t\t\t\t<ion-select-option *ngFor=\"let contact of contacts\" value=\"{{contact.id}}\">\r\n\t\t\t\t\t\t{{contact.name}}\r\n\t\t\t\t\t</ion-select-option>\r\n\t\t\t\t</ion-select>\r\n\t\t\t</ng-container>\r\n\t\t\t<ng-container *ngIf=\"!contacts.length\">\r\n\t\t\t\t<ion-label>\r\n\t\t\t\t\tNo saved contacts\r\n\t\t\t\t</ion-label>\r\n\t\t\t\t<ion-button (click)=\"addContact()\">Add Contact</ion-button>\r\n\t\t\t</ng-container>\r\n\t\t</ion-item>\r\n\t\t<ion-item *ngIf=\"(keys$ | async) as keys\">\r\n\t\t\t<ng-container *ngIf=\"keys.length\">\r\n\t\t\t\t<ion-label>\r\n\t\t\t\t\tFrom:\r\n\t\t\t\t</ion-label>\r\n\t\t\t\t<ion-select formControlName=\"from\" ngDefaultControl placeholder=\"Select a Key\" (ionChange)=\"updateFrom($event)\">\r\n\t\t\t\t\t<!-- <ion-select-option>\r\n\t\t\t\t\t\tSelect a Key\r\n\t\t\t\t\t</ion-select-option> -->\r\n\t\t\t\t\t<ion-select-option *ngFor=\"let key of keys\" [value]=\"key.id\">\r\n\t\t\t\t\t\t{{key.name}}\r\n\t\t\t\t\t</ion-select-option>\r\n\t\t\t\t</ion-select>\r\n\t\t\t</ng-container>\r\n\t\t\t<ng-container *ngIf=\"!keys.length\">\r\n\t\t\t\t<ion-label>\r\n\t\t\t\t\tNo saved keys\r\n\t\t\t\t</ion-label>\r\n\t\t\t\t<ion-button (click)=\"createKey()\">Create Key</ion-button>\r\n\t\t\t</ng-container>\r\n\t\t</ion-item>\r\n\t</form>\r\n</ion-content>\r\n<ion-footer>\r\n\t<ion-toolbar>\r\n\t\t<ion-button expand=\"block\" [disabled]=\"!newConversationForm.valid\" (click)=\"saveConversation()\">Save</ion-button>\r\n\t</ion-toolbar>\r\n</ion-footer>\r\n";

/***/ }),

/***/ 3872:
/*!*********************************************************************!*\
  !*** ./src/app/shared/modals/key-add/key-add.modal.html?ngResource ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header translucent=\"true\">\r\n\t<ion-toolbar color=\"primary\">\r\n\t\t<ion-title>\r\n\t\t\tAdd new Encryption Key\r\n\t\t</ion-title>\r\n\t\t<ion-buttons slot=\"primary\">\r\n\t\t\t<ion-button (click)=\"dismiss()\">\r\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t</ion-toolbar> \r\n</ion-header>\r\n<ion-content>\r\n\t<form [formGroup]=\"newKeyForm\">\r\n\t\t<ion-item>\r\n\t\t\t<ion-label position=\"floating\">Name</ion-label>\r\n\t\t\t<ion-input ngDefaultControl formControlName=\"name\" type=\"text\" required></ion-input>\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-label position=\"floating\">Password</ion-label>\r\n\t\t\t<ion-input ngDefaultControl formControlName=\"password\" type=\"password\"></ion-input>\r\n\t\t</ion-item>\r\n\t\t<ion-item *ngIf=\"newKeyForm.get('password').value?.length && newKeyForm.get('password').valid\">\r\n\t\t\t<ion-label position=\"floating\">Confirm Password</ion-label>\r\n\t\t\t<ion-input ngDefaultControl formControlName=\"passwordConfirm\" type=\"password\"></ion-input>\r\n\t\t</ion-item>\r\n\t</form>\r\n</ion-content>\r\n<ion-footer>\r\n\t<ion-toolbar>\r\n\t\t<ion-button expand=\"block\" [disabled]=\"!newKeyForm.valid\" (click)=\"saveEncryptionKey()\">Save</ion-button>\r\n\t</ion-toolbar>\r\n</ion-footer>\r\n";

/***/ }),

/***/ 5621:
/*!*************************************************************************!*\
  !*** ./src/app/shared/modals/key-share/key-share.modal.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header translucent=\"true\">\r\n\t<ion-toolbar color=\"primary\">\r\n\t\t<ion-title>\r\n\t\t\tShare Public Key\r\n\t\t</ion-title>\r\n\t\t<ion-buttons slot=\"primary\">\r\n\t\t\t<ion-button (click)=\"dismiss()\">\r\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t</ion-toolbar> \r\n</ion-header>\r\n<ion-content>\r\n\t<div class=\"key\" *ngIf=\"key\">\r\n\t\t<ion-item *ngIf=\"imageData\">\r\n\t\t\t<img [src]=\"imageData\">\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-textarea [value]=\"key\" auto-grow></ion-textarea>\r\n\t\t</ion-item>\r\n\t</div>\r\n</ion-content>\r\n<ion-footer>\r\n\t<ion-toolbar>\r\n\t\t<ion-button expand=\"block\" (click)=\"copy()\">\r\n\t\t\t<ion-icon name=\"image-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>Copy to Clipboard</ion-label>\r\n\t\t</ion-button>\r\n\t\t<ion-button expand=\"block\" (click)=\"shareQR()\" *ngIf=\"imageData\">\r\n\t\t\t<ion-icon name=\"qr-code-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>Share as QR Code</ion-label>\r\n\t\t</ion-button>\r\n\t</ion-toolbar>\r\n</ion-footer>\r\n";

/***/ }),

/***/ 220:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/modals/message-add/message-add.modal.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header translucent=\"true\">\r\n\t<ion-toolbar color=\"primary\">\r\n\t\t<ion-title>\r\n\t\t\tAdd new Message\r\n\t\t</ion-title>\r\n\t\t<ion-buttons slot=\"primary\">\r\n\t\t\t<ion-button (click)=\"dismiss()\">\r\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t</ion-toolbar> \r\n</ion-header>\r\n<ion-content>\r\n\t<form [formGroup]=\"newMessageForm\">\r\n\t\t<ion-item>\r\n\t\t\t<ion-label>\r\n\t\t\t\tFrom:\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-input disabled value=\"{{fromName}}\"></ion-input>\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-label>\r\n\t\t\t\tTo:\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-input disabled value=\"{{toName}}\"></ion-input>\r\n\t\t</ion-item>\r\n\t\t<!-- <ion-item>\r\n\t\t\t<ion-label>\r\n\t\t\t\tKeep a Decryptable Copy?\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-checkbox formControlName=\"saveLocal\"></ion-checkbox>\r\n\t\t</ion-item> -->\r\n\t\t<ion-item>\r\n\t\t\t<ion-label>\r\n\t\t\t\tBackground Color:\r\n\t\t\t</ion-label>\r\n\t\t\t<input type=\"color\" formControlName=\"backgroundColor\" (ngModelChange)=\"setBackgroundColor()\">\r\n\t\t\t<ion-button (click)=\"clearBackgroundColor()\">Clear</ion-button>\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-label>\r\n\t\t\t\tBackground:\r\n\t\t\t</ion-label>\r\n\t\t\t<div>\r\n\t\t\t\t{{pickedEmoji}}\r\n\t\t\t</div>\r\n\t\t\t<ion-button (click)=\"showEmojiPicker = !showEmojiPicker\">Select</ion-button>\r\n\t\t\t<ion-button (click)=\"setBackground(null)\">Remove</ion-button>\r\n\t\t</ion-item>\r\n\t\t<ion-item [class.active]=\"showEmojiPicker\" class=\"collapsible\">\r\n\t\t\t<app-emoji-picker (selected)=\"setBackground($event)\"></app-emoji-picker>\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-label position=\"floating\">Message</ion-label>\r\n\t\t\t<ion-textarea\r\n\t\t\t\tngDefaultControl\r\n\t\t\t\tformControlName=\"message\"\r\n\t\t\t\ttype=\"text\"\r\n\t\t\t\trequired\r\n\t\t\t\tdebounce=\"500\"\r\n\t\t\t\t(ionChange)=\"encrypt()\"\r\n\t\t\t></ion-textarea>\r\n\t\t\t<ion-note>\r\n\t\t\t\t{{encodedBytes}} / {{MAX_ENCODED_BYTES}}\r\n\t\t\t</ion-note>\r\n\t\t</ion-item>\r\n\t</form>\r\n\t<canvas #canvas></canvas>\r\n</ion-content>\r\n<ion-footer>\r\n\t<ion-toolbar>\r\n\t\t<ion-button expand=\"block\" [disabled]=\"!renderedImage\" (click)=\"saveMessage()\">Save</ion-button>\r\n\t</ion-toolbar>\r\n</ion-footer>\r\n";

/***/ }),

/***/ 4285:
/*!***********************************************************************************!*\
  !*** ./src/app/shared/modals/message-import/message-import.modal.html?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header translucent=\"true\">\r\n\t<ion-toolbar color=\"primary\">\r\n\t\t<ion-title>\r\n\t\t\tImport Message\r\n\t\t</ion-title>\r\n\t\t<ion-buttons slot=\"primary\">\r\n\t\t\t<ion-button (click)=\"dismiss()\">\r\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t</ion-toolbar> \r\n</ion-header>\r\n<ion-content>\r\n\t<form [formGroup]=\"newMessageForm\">\r\n\t\t<ion-item>\r\n\t\t\t<ion-label>\r\n\t\t\t\tFrom:\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-input disabled value=\"{{fromName}}\"></ion-input>\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-label>\r\n\t\t\t\tTo:\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-input disabled value=\"{{toName}}\"></ion-input>\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-icon name=\"image-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>\r\n\t\t\t\tImage:\r\n\t\t\t</ion-label>\r\n\t\t\t<input type=\"file\" formControlName=\"file\" (change)=\"parseFile($event)\">\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-icon name=\"qr-code-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>\r\n\t\t\t\tQR File:\r\n\t\t\t</ion-label>\r\n\t\t\t<input type=\"file\" formControlName=\"file\" (change)=\"parseFileQR($event)\">\r\n\t\t</ion-item>\r\n\t\t<ion-item>\r\n\t\t\t<ion-icon name=\"qr-code-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>\r\n\t\t\t\tScan QR Code\r\n\t\t\t</ion-label>\r\n\t\t\t<ion-button (click)=\"scanQR()\">\r\n\t\t\t\t<ion-icon name=\"camera-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t\t<ion-label>Open Camera</ion-label>\r\n\t\t\t</ion-button>\r\n\t\t</ion-item>\r\n\t</form>\r\n\t<img [src]=\"importedFile\" *ngIf=\"importedFile\">\r\n</ion-content>\r\n<ion-footer>\r\n\t<ion-toolbar>\r\n\t\t<ion-button expand=\"block\" [disabled]=\"!importedFile\" (click)=\"saveMessage()\">Save</ion-button>\r\n\t</ion-toolbar>\r\n</ion-footer>\r\n";

/***/ }),

/***/ 9377:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/modals/message-share/message-share.modal.html?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header translucent=\"true\">\r\n\t<ion-toolbar color=\"primary\">\r\n\t\t<ion-title>\r\n\t\t\tSend Message\r\n\t\t</ion-title>\r\n\t\t<ion-buttons slot=\"primary\">\r\n\t\t\t<ion-button (click)=\"dismiss()\">\r\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t</ion-toolbar> \r\n</ion-header>\r\n<ion-content>\r\n\t<div class=\"message\" *ngIf=\"message\">\r\n\t\t<img [src]=\"message.imageData\" *ngIf=\"message.imageData && !message.dataRaw\">\r\n\t\t<app-encoded-image\r\n\t\t\t*ngIf=\"message.dataRaw\"\r\n\t\t\t[emoji]=\"message.emoji\"\r\n\t\t\t[backgroundColor]=\"message.backgroundColor\"\r\n\t\t\t[dataRaw]=\"message.dataRaw\"\r\n\t\t></app-encoded-image>\r\n\t</div>\r\n</ion-content>\r\n<ion-footer>\r\n\t<ion-toolbar>\r\n\t\t<ion-button expand=\"block\" (click)=\"share()\">\r\n\t\t\t<ion-icon name=\"image-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>Share as Image</ion-label>\r\n\t\t</ion-button>\r\n\t\t<ion-button expand=\"block\" (click)=\"shareQR()\" *ngIf=\"message.dataRaw\">\r\n\t\t\t<ion-icon name=\"qr-code-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>Share as QR Code</ion-label>\r\n\t\t</ion-button>\r\n\t\t<ion-button expand=\"block\" (click)=\"delete()\">\r\n\t\t\t<ion-icon name=\"trash-outline\" slot=\"start\"></ion-icon>\r\n\t\t\t<ion-label>Delete Message</ion-label>\r\n\t\t</ion-button>\r\n\t</ion-toolbar>\r\n</ion-footer>\r\n";

/***/ }),

/***/ 5476:
/*!*********************************************************************!*\
  !*** ./src/app/shared/modals/qr-scan/qr-scan.modal.html?ngResource ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header translucent=\"true\">\r\n\t<ion-toolbar color=\"primary\">\r\n\t\t<ion-title>\r\n\t\t\tScan QR Code\r\n\t\t</ion-title>\r\n\t\t<ion-buttons slot=\"primary\">\r\n\t\t\t<ion-button (click)=\"dismiss()\">\r\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n\t\t\t</ion-button>\r\n\t\t</ion-buttons>\r\n\t</ion-toolbar> \r\n</ion-header>\r\n<ion-content>\r\n\t<app-qr-scanner (data)=\"onData($event)\" [done]=\"doneScanning\"></app-qr-scanner>\r\n</ion-content>\r\n";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map