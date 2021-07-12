import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  @ViewChild("navbar")
  public navbar!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    window.onscroll = () => {
      this.fixedNavbar();
    };
  }

  public fixedNavbar(): void {
    this.navbar.nativeElement.style.position = 'fixed';
    this.navbar.nativeElement.style.top = '0';
    this.navbar.nativeElement.style.width = window.innerWidth + 'px';
    this.navbar.nativeElement.style.bottom = '0px';
    console.log(document.body.scrollTop);
  }

}
