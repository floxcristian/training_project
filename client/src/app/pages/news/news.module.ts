// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, NewsRoutingModule, SharedModule],
})
export class NewsModule {}
