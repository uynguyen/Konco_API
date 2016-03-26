import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: '<h1>Konco</h1><form action="/api/uploads"  id ="uploadForm" enctype="multipart/form-data" method="post"><input type="file" name="userPhoto"><input type="submit" value="Upload Image" name="submit"></form>'
})
export class AppComponent { }