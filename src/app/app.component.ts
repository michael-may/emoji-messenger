import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MenuController, Platform } from '@ionic/angular';
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
	public routes: Route[] = [];
	private routeSubscription$?: Subscription;
	
	constructor(
		private readonly platform: Platform,
		//private readonly splashScreen: SplashScreen,
		//private readonly statusBar: StatusBar,
		private readonly router: Router,
		private readonly menuController: MenuController
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

	ngOnInit() {
		this.routeSubscription$ = this.router.events
			.pipe(
				filter(ev => ev instanceof NavigationEnd)
			)
			.subscribe(
				this.routeWatcher.bind(this)
			);
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
