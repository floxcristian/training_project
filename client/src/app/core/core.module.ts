// Angular
import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// Interceptors
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
// Services
import { GlobalErrorService } from './services/error/global-error/global-error.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
