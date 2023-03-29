import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsComponent } from './component/songs/songs.component';
import { AlbumsComponent } from './component/albums/albums.component';
import { HttpClientModule } from '@angular/common/http';
import { AlbumSongsComponent } from './component/album-songs/album-songs.component';
import { AdminAreaComponent } from './component/admin-area/admin-area.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationArtistComponent } from './component/registration-artist/registration-artist.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { SingersComponent } from './component/singers/singers.component';
import { NewSongsComponent } from './component/new-songs/new-songs.component';
import { ManageAlbumsComponent } from './component/manage-albums/manage-albums.component';
import { ManageSongsComponent } from './component/manage-songs/manage-songs.component';
import { SingerPageComponent } from './component/singer-page/singer-page.component';
import { SongPlaysComponent } from './component/song-plays/song-plays.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';
import { UsersTableComponent } from './component/users-table/users-table.component';
import { UserAreaComponent } from './component/user-area/user-area.component';

const firebaseConfig = {
  apiKey: "AIzaSyDHclsUQ_d7pgHFstL6jU-mfYhphXVV34g",
  authDomain: "musichani-88db9.firebaseapp.com",
  projectId: "musichani-88db9",
  storageBucket: "musichani-88db9.appspot.com",
  messagingSenderId: "719769974048",
  appId: "1:719769974048:web:608e566dbcef453d66d345",
  measurementId: "G-LNLCD6ZKF8"
};

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    AlbumsComponent,
    AlbumSongsComponent,
    AdminAreaComponent,
    SignUpComponent,
    LoginComponent,
    RegistrationArtistComponent,
    NavigationComponent,
    PlaylistComponent,
    SingersComponent,
    NewSongsComponent,
    ManageAlbumsComponent,
    ManageSongsComponent,
    SingerPageComponent,
    SongPlaysComponent,
    ManageUsersComponent,
    UsersTableComponent,
    UserAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
