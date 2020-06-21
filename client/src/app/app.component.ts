// Angular
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Noticias',
      url: '/news',
      icon: 'newspaper',
    },
    {
      title: 'Notificaciones',
      url: '/folder/Favorites',
      icon: 'notifications',
    },
    {
      title: 'Mensajes',
      url: 'messages',
      icon: 'mail',
    },
    {
      title: 'Asignaturas',
      url: '/folder/Spam',
      icon: 'library',
    },
    {
      title: 'Horario',
      url: '/folder/Outbox',
      icon: 'today',
    },
    {
      title: 'Beneficios',
      url: '/folder/Outbox',
      icon: 'gift',
    },
    {
      title: 'Configuración',
      url: '/folder/Trash',
      icon: 'settings',
    },
  ];

  labels = ['Beca Fotocopia', 'Beca Alimenticia'];

  constructor() {}

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
