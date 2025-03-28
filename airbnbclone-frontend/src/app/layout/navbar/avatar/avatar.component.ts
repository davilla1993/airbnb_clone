import { CommonModule, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FontAwesomeModule
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {

  imageUrl = input<string>();
  avatarSize = input<"avatar-sm" | "avatar-xl">();
}
