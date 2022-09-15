import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('mobile') sideNav? : ElementRef;

  @Input() title: any;

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sideNav?.nativeElement);
  }
}
