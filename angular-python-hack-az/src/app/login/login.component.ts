import { Component, OnInit } from '@angular/core';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {
    msalApp,
    requiresInteraction,
    fetchMsGraph,
    isIE,
    GRAPH_ENDPOINTS,
    GRAPH_SCOPES,
    GRAPH_REQUESTS
} from "./auth-utils"; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}
    imgsrc = "./kpmg-logo.png"
    listIcon = faAppleAlt;
    usernameVal  = ''
    account = ''
    error = '';
    async acquireToken(request : any) {
        return msalApp.acquireTokenSilent(request).catch(error => {
            // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
            // due to consent or interaction required ONLY
            if (requiresInteraction(error.errorCode)) {
                msalApp.acquireTokenPopup(request);
            } else {
                console.error('Non-interactive error:', error.errorCode)
            }
        });
    }
    async onSubmit(){
        // evt.preventDefault();
        console.log('onsubmit',this.usernameVal);
        const LoginObj = {
            ...GRAPH_REQUESTS.LOGIN,
            loginHint: this.usernameVal
        }
        console.log(GRAPH_REQUESTS.LOGIN, LoginObj)
        
        const loginResponse = await msalApp
            .loginPopup(LoginObj)
            .then(() => {
                console.log('Login Successful');
                this.router.navigate(['/dashboard']);
            })
            .catch(error => {
                console.log(error.message)
            });

        if (loginResponse) {
            this.account = loginResponse.account,
            this.error =  null
            const tokenResponse = await this.acquireToken(
                GRAPH_REQUESTS.LOGIN
            ).catch(error => {
                console.log(error.message)
            });

            if (tokenResponse) {
                this.router.navigate(['/dashboard']);
            }
        }
    }
    onKey(event: any){
        this.usernameVal = event.target.value
        console.log(event.target.value)
    }

}
