// https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c

// Angular
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// Services
import { ErrorService } from '../error-getter/error.service';
import { NotificationService } from '../../utils/notification/notification.service';
import { LoggingErrorService } from '../logging-error/logging-error.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService implements ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingErrorService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerMessage(error); // error.message
      stackTrace = errorService.getServerStack(error); // ...
      notifier.showError(message);
    } else {
      // Client error
      message = errorService.getClientMessage(error); // error.message |
      stackTrace = errorService.getClientStack(error); // error.stack
      notifier.showError(message);
    }

    // router.navigate(['error']);
    // Always log errors
    logger.logError(message, stackTrace);
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    throw error;
  }
}
