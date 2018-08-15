import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchTerm = '';
  isCollapsed = true; //whether mobile menu is expanded or collapsed

  get token() { //return login token
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) { //to close navbar dropdown
    dropdown.close();
  }

  logout() { }

  search() { }
}
