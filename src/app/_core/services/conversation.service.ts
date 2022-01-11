import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Crypto } from '../utils/crypto.utils';

import { map } from 'rxjs/operators';

export enum MessageType {
	Outgoing = 'outgoing',
	Incoming = 'incoming'
}

export class Message {
	id: string;
	type: MessageType;
	imageData?: string;
	emoji?: string;
	backgroundColor?: string;
	dataRaw?: string;
	// TODO: Local copy
	created: number;
}

export class Conversation {
	id: string;
	name: string;
	toKeyId: string;
	fromKeyId: string;
	messages: Message[];
	created: number;
}

@Injectable({
	providedIn: 'root'
})
export class ConversationService {
	public conversations: Conversation[] = [];

	private conversationSubject: BehaviorSubject<Conversation[]> = new BehaviorSubject<Conversation[]>(this.conversations);
	public get conversations$(): Observable<Conversation[]> {
		return this.conversationSubject.asObservable();
	}
	
	constructor() {
		this.loadConversations()
			.catch(err => {
				console.log(err);
			});
	}

	public async loadConversations() {
		let conversations: Conversation[];
		try {
			conversations = JSON.parse(localStorage.getItem('conversations')) ?? [];
		} catch(err) {
			conversations = [];
		}

		this.conversations = conversations;
		this.conversationSubject.next(this.conversations);
	}

	public async addConversation(name: string, toKeyId: string, fromKeyId: string) {
		let conversation: Conversation = {
			id: `${new Date().getTime()}-${Crypto.generateRandomHex(6)}`,
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
	}

	public getConversation(id: string): Observable<Conversation> {
		return this.conversationSubject
			.asObservable()
			.pipe(
				map((conversations: Conversation[]) => conversations.find(c => c.id === id))
			);
	}

	public deleteConversation(id: string) {
		this.conversations = this.conversations.filter(c => c.id !== id);
		this.conversationSubject.next(this.conversations);
		this.storeConversations();
	}

	public addMessage(conversationId: string, message: Partial<Message>) {
		message = {
			...message,
			id: `${new Date().getTime()}-${Crypto.generateRandomHex(6)}`,
			created: new Date().getTime()
		};

		this.conversations = this.conversations.map(c => {
			if(c.id === conversationId) {
				c.messages.push(message as Message);
			}
			return c;
		});

		this.conversationSubject.next(this.conversations);
		this.storeConversations();
	}

	public deleteMessage(conversationId: string, messageId: string) {
		for(const c of this.conversations) {
			if(c.id !== conversationId) {
				continue;
			}
			c.messages = c.messages.filter(m => m.id !== messageId);
		}

		this.conversationSubject.next(this.conversations);
		this.storeConversations();
	}

	public storeConversations() {
		localStorage.setItem('conversations', JSON.stringify(this.conversations));
	}
}