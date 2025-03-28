import { Component, inject, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Removed unused components
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { AvatarComponent } from './avatar/avatar.component';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryComponent } from "./category/category.component";
import { ToastService } from '../toast.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    AvatarComponent,
    FontAwesomeModule,
    CategoryComponent
],
  providers: [
    DialogService
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  location: string = "Anywhere";
  guests: string = "Add guests";
  dates: string = "Any week";
  currentMenuItems: MenuItem[] | undefined = [];
  toastService: ToastService = inject(ToastService);

  // login() => this.authService.login();

  // logout() => this.authService.logout();

  ngOnInit(): void {
    this.currentMenuItems = this.fetchMenu();
    this.toastService.send({severity: "info", summary:"Welcome", detail: "Welcome to Airbnb clone"});
  }

  private fetchMenu(): {label:string, styleClass:any}[] {
    return [
      {
        label: "Sign up",
        styleClass: "font-bold"
      },
      {
        label: "Log in",
        styleClass: "font-bold"

      }

    ]

  }

}
