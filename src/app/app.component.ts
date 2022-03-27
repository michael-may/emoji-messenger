import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IonRouterOutlet, MenuController, ModalController, Platform } from '@ionic/angular';
import { IntroModal } from './shared/modals/intro/intro.modal';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

export class Route {
	name: string;
	path: string;
	active: boolean;
	icon: string;
	iconActive: string;
}

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	@ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;

	public routes: Route[] = [];
	private routeSubscription$?: Subscription;
	
	constructor(
		//private readonly platform: Platform,
		//private readonly splashScreen: SplashScreen,
		//private readonly statusBar: StatusBar,
		private readonly router: Router,
		private readonly menuController: MenuController,
		private readonly modalController: ModalController
	) {
		this.initializeApp();
		for(const r of this.router.config) {
			if(r.path === '*' || !r.data || r.data?.display === false) {
				continue;
			}
			this.routes.push({
				name: r.data?.name,
				path: '/' + r.path,
				active: false,
				icon: r.data?.icon,
				iconActive: r.data?.iconActive
			});
		}
	}

	initializeApp() {
		// this.platform.ready().then(() => {
		// 	// Status bar and splash screen
		// 	// features should be removed for web-only projects.
		// 	this.statusBar.styleDefault();
		// 	this.splashScreen.hide();
		// });
	}

	async ngOnInit() {
		this.routeSubscription$ = this.router.events
			.pipe(
				filter(ev => ev instanceof NavigationEnd)
			)
			.subscribe(
				this.routeWatcher.bind(this)
			);

		if(!localStorage.getItem('introComplete')) {
			const modal: HTMLIonModalElement = await this.modalController
				.create({
					component: IntroModal,
					swipeToClose: true,
					presentingElement: this.routerOutlet.nativeEl
				});

			await modal.present();

			await modal.onDidDismiss();

			localStorage.setItem('introComplete', 'true');
		}
	}

	ngOnDestroy() {
		if(this.routeSubscription$) {
			this.routeSubscription$.unsubscribe();
		}
	}

	public menuClose() {
		this.menuController.close();
	}

	private routeWatcher(ev: NavigationEnd) {
		const path = this.router.routerState.snapshot.url;
		for(const r of this.routes) {
			if(r.path === path) {
				r.active = true;
			} else {
				r.active = false;
			}
		}
	}
}
