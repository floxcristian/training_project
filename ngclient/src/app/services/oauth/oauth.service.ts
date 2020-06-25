import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

enum UXType {
  POPUP,
  REDIRECTION
}

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  private API_URL = 'http://localhost:8080';

  constructor(public http: HttpClient) {}

  /*
  public determineOAuthUXType() {
    return isMobileDevice() ? UXType.REDIRECTION : UXType.POPUP;
  }*/

  /*
  async authenticate() {
    const uxType = this.determineOAuthUXType();
    try {
      const response = await this.authenticateUsingOAuth({ uxType });
      if (!response) {
        throw "No message received";
      }
      return { response };
    } catch (e) {
      return { error: { message: e } };
    }
  }*/

  loginWithGoogle() {
    return this.http.get(`${this.API_URL}/api/v1/authorize`);
  }

  getGmailLabels(tokens) {
    return this.http.post(`${this.API_URL}/api/v1/gmail/labels`, { tokens });
  }

  async getExistingStoredCredentials() {
    try {
      const response = await navigator.credentials.get({
        //federated: { providers: [AZURE_PROVIDER] },
        //mediation: "required"
      });
      return { response };
    } catch (e) {
      console.error('Error while retrieving credentials', e);
      return { error: e };
    }
  }

  storeCredentials(tokens) {
    localStorage.setItem('tokens', tokens);
  }

  getCredentials() {
    return localStorage.getItem('tokens');
  }
}
