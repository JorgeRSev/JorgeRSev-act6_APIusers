import { Component } from '@angular/core';
import { HomeNavComponent } from '../../shared/home-nav/home-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HomeNavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
