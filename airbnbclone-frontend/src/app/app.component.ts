import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button'; // Replace with the correct library if different
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from './layout/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { ToastService } from './layout/toast.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      RouterModule,
      ButtonModule,
      FontAwesomeModule,
      NavbarComponent,
      FooterComponent,
      ToastModule
    ],

    providers: [
        MessageService
      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  faIconLibrary: FaIconLibrary = inject(FaIconLibrary);
  isListingView: boolean = true;
  toastService: ToastService = inject(ToastService);
  messageService: MessageService = inject(MessageService);

  constructor(private library: FaIconLibrary) { }

  ngOnInit() {
    this.initFontAwesomeIcons();
    this.listenToastService();
  }

  private initFontAwesomeIcons() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  private listenToastService():void {
    this.toastService.sendSub.subscribe({
      next: (newMessage: Message) => {
        if(newMessage && newMessage.summary !== this.toastService.INIT_STATE) {
          this.messageService.add(newMessage);
        }
      }
    })
  }
}
