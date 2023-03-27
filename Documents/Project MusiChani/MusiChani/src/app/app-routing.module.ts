import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAreaComponent } from './component/admin-area/admin-area.component';
import { AlbumSongsComponent } from './component/album-songs/album-songs.component';
import { AlbumsComponent } from './component/albums/albums.component';
import { LoginComponent } from './component/login/login.component';
import { ManageAlbumsComponent } from './component/manage-albums/manage-albums.component';
import { ManageSongsComponent } from './component/manage-songs/manage-songs.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';
import { RegistrationArtistComponent } from './component/registration-artist/registration-artist.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SingerPageComponent } from './component/singer-page/singer-page.component';
import { SingersComponent } from './component/singers/singers.component';
import { SongPlaysComponent } from './component/song-plays/song-plays.component';
import { SongsComponent } from './component/songs/songs.component';

const routes: Routes = [
  { path: 'albums', component:AlbumsComponent },
  { path: 'albumSongs/:albumId', component:AlbumSongsComponent },
  { path: 'songs', component:SongsComponent },
  { path: 'signUp', component:SignUpComponent },
  { path: 'login', component:LoginComponent },
  { path: 'adminArea', component:AdminAreaComponent },
  { path: 'registrationArtist', component:RegistrationArtistComponent},
  { path: 'manageSongs', component:ManageSongsComponent},
  { path: 'singers', component:SingersComponent},
  { path: 'singerPage/:singerId', component: SingerPageComponent},
  { path: 'manageAlbums', component: ManageAlbumsComponent},
  { path: 'songPlays/:songId', component: SongPlaysComponent},
  { path: 'manageUsers', component:ManageUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
