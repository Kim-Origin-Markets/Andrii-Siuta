import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

export enum NavigationAction {
  ADD = 'add',
  LIST = 'list'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  navigation = NavigationAction;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onNavigationClick(action: NavigationAction) {
    this.router.navigateByUrl(`todo-list/${action}`);
  }
}
