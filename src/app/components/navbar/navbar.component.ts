import { Component } from '@angular/core';
import { RouterOutlet,RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
