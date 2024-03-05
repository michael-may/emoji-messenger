import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'conversations', data: { name: 'Conversations', icon: 'mail-outline', iconActive: 'mail' }, loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
	{ path: 'conversations/:id', data: { display: false }, loadChildren: () => import('./pages/conversation-detail/conversation-detail.module').then(m => m.ConversationDetailPageModule ) },
	{ path: 'keys', data: { name: 'Keys', icon: 'key-outline', iconActive: 'key' }, loadChildren: () => import('./pages/keys/keys.module').then(m => m.KeysPageModule) },
	{ path: 'contacts', data: { name: 'Contacts', icon: 'people-outline', iconActive: 'people' }, loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule) },
	{ path: 'settings', data: { name: 'Settings', icon: 'settings-outline', iconActive: 'settings' }, loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule) },
	{ path: '', redirectTo: 'conversations', pathMatch: 'full' },
	{ path: '*', redirectTo: 'conversations', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
