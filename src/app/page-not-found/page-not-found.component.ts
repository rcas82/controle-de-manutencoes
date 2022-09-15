import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  imageURL: string = './assets/resources/page-not-found.png';
  isHidePalnel = true;
  constructor() { }

  ngOnInit(): void {
  }

  getBackgroundImage() {
    return {
      'position': 'absolute',
      'left': '0',
      'top': '0',
      'width': '100%',
      'height': '100vh',
      'background-repeat': 'no-repeat',
      'background-attachment': 'fixed',
      'background-position': 'center',
      'background-image': 'url(' + this.imageURL + ')',
      'background-size': 'contain',
      'padding-top': 'calc(100vh - 180px)'
    };
  }
}
