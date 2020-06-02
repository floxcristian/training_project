// Angular
import { Component, OnInit } from '@angular/core';
// Ionic
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Noticias',
      url: '/news',
      icon: 'newspaper'
    },
    {
      title: 'Perfil',
      url: '/folder/Outbox',
      icon: 'person'
    },
    {
      title: 'Notificaciones',
      url: '/folder/Favorites',
      icon: 'notifications'
    },
    {
      title: 'Mensajes',
      url: 'messages',
      icon: 'mail'
    },
    {
      title: 'Inscripciones',
      url: '/folder/Trash',
      icon: 'build'
    },
    {
      title: 'Asignaturas',
      url: '/folder/Spam',
      icon: 'library'
    },
    {
      title: 'Horario',
      url: '/folder/Spam',
      icon: 'today'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then((platform) => {
      if (platform === 'cordova') {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }

  ngOnInit() {
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
