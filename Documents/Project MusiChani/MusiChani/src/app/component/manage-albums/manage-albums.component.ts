import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { albums } from 'src/app/classes/albums';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-manage-albums',
  templateUrl: './manage-albums.component.html',
  styleUrls: ['./manage-albums.component.scss']
})
export class ManageAlbumsComponent {
  album: albums = new albums();
  albums: Array<albums> = new Array<albums>();
  registerForm: any = FormGroup;
  submitted = false;

  constructor(private albumsService: AlbumsService, private formBuilder: FormBuilder) { }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.albumsService.getAlbums().subscribe(data => { this.albums = data });
    this.registerForm = this.formBuilder.group({
      publicationDate: ['', [Validators.required]],
        name: ['', [Validators.required]]
    });
  }

  // ניהול אלבומים
  // הוספת אלבום
  addAlbum() {
    this.album.status = true;
    this.albumsService.addAlbum(this.album).subscribe(data => { this.albums = data }, error => { console.log('error', error) });
  }

}
