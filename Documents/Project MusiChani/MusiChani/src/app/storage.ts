// העלאת תמונת פרופיל
  // uploadImage(event: any) {
  //   const file = event.target.files[0];
  //     const filePath = `image/${file.name}`;
  //     const ref = this.storage.ref(filePath);
  //     const task = ref.put(file);
  
  //     task.snapshotChanges().pipe(
  //       finalize(() => {
  //         ref.getDownloadURL().subscribe(url => {
  //           this.user.image = url;
  //           console.log('url:' , url);
  //         });
  //       })
  //     )
  //     .subscribe();
  //    } 

//   declare module '@ckeditor/ckeditor5-build-classic' {
//     const ClassicEditorBuild: any;

//     export = ClassicEditorBuild;
// }
