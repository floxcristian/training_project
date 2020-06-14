import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  caca = [1,2,3,4,5,6,7,8,9,1,2,3,4];
  constructor() { }

  ngOnInit() {}

}
