import { Component } from "@angular/core";
import {
  HttpClient /* ,
  HttpClientModule,
  HttpErrorResponse */
} from "@angular/common/http";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
@Component({
  selector: "app-adminui",
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: "./adminui.component.html",
  styleUrl: "./adminui.component.css"
})
export class AdminuiComponent {
  arrReservations: any = [];
  arrUsers: any = [];
  constructor(private http: HttpClient, private _router: Router) {
    // After making sure that the logged user is the admin show all the reservations and all the registered users
    const user = sessionStorage.getItem("user");
    if (user == "AdMiNiStRaToRfKj0!") {
      this.http.get("http://localhost:8080/allusers").subscribe(res => {
        if (res != null) {
          this.arrUsers = res;
          const users = document.getElementById("users");
          if (users != null) {
            users.innerHTML += `<div style="display: block;width: 100%; text-align:center;">
                                <p style="font-family: 'Raleway Thin';
                                          font-size: 20px;
                                          margin-top: 20px;">Tutti gli utenti registrati</p>
                              </div>`;
            for (var i = 0; i < this.arrUsers.length; i++) {
              users.innerHTML +=
                `
                              <div style="display: flex;
                                          margin-top: 50px;
                                          width: 100%;
                                          height: 80px;">
                              
                              <div style="display:block;">
                                <p style="font-family: 'Raleway Thin';
                                          font-size: 14px;
                                          margin-left: 50px;
                                          margin-top: 25px;">
                                 ID: <br>
                                </p>
                                <p style="
                                          font-size: 19px;
                                          margin-left: 50px;
                                          margin-top:  20px;">
                                  ` +
                this.arrUsers[i].id +
                `
                                </p>
                                </div>    

                                <div style="display:block;">
                                <p style="font-family: 'Raleway Thin';
                                          font-size: 14px;
                                          margin-left: 100px;
                                          margin-top: 25px;">
                                 Nome e Cognome: <br>
                                </p>
                                <p style="
                                          font-size: 19px;
                                          margin-left: 100px;
                                          margin-top:  20px;">
                                  ` +
                this.arrUsers[i].name +
                ` ` +
                this.arrUsers[i].surname +
                `
                                </p>
                                </div>  

                                <div style="display:block;">
                                <p style="font-family: 'Raleway Thin';
                                          font-size: 14px;
                                          margin-left: 100px;
                                          margin-top: 25px;">
                                  Email: <br>
                                </p>
                                <p style="
                                          font-size: 19px;
                                          margin-left: 100px;
                                          margin-top:  20px;">
                                  ` +
                this.arrUsers[i].email +
                `
                                </p>
                                </div>  

                                <div style="display:block;">
                                <p style="font-family: 'Raleway Thin';
                                          font-size: 14px;
                                          margin-left: 100px;
                                          margin-top: 25px;">
                                  Nazione di provenienza: <br>
                                </p>
                                <p style="
                                          font-size: 19px;
                                          margin-left: 100px;
                                          margin-top:  20px;">
                                  ` +
                this.arrUsers[i].region +
                `
                                </p>
                                </div>  

                              </div>

                              `;
            }
          }
        }
      });

      this.http.get("http://localhost:8080/allreservations").subscribe(res => {
        if (res != null) {
          this.arrReservations = res;
          const reservations = document.getElementById("reservations");
          const users = document.getElementById("users");
          const main = document.getElementById("main");

          if (reservations != null) {
            reservations.innerHTML += `
                                     <div style="display: block;width: 100%; text-align:center;">
                                        <p style="font-family: 'Raleway Thin';
                                            font-size: 20px;
                                            margin-top: 80px;">Tutte le prenotazioni</p>
                                    </div>`;
            for (var i = 0; i < this.arrReservations.length; i++) {
              /* TO DO: Date format */
              var checkin = new Date(this.arrReservations[i].checkin);
              var checkout = new Date(this.arrReservations[i].checkout);

              console.log(checkin, checkout);
              if (this.arrReservations[i].apartment == "Portico") {
                reservations.innerHTML +=
                  `
                                          <div style="display: flex;
                                                      margin-top: 50px;
                                                      width: 100%;
                                                      margin-left: 50px;
                                                      height: 180px;">
                                            <img src="../assets/portico.jpg" style="border-radius: 10px; width: 230px; height: 130px;" >
                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Appartamento: <br
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 55px;
                                                        margin-top:  20px;">
                                                Portico
                                              </p>
                                            </div>

                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Prenotato da: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].name +
                  ` ` +
                  this.arrReservations[i].surname +
                  `
                                              </p>
                                            </div>
                                            
                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Persone: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].people +
                  `
                                              </p>
                                            </div>
                                            
                                            <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 14px;
                                                    margin-left: 50px;
                                                    margin-top: 25px;">
                                            Check-in: <br>
                                            
                                          </p>
                                          <p style="
                                                      font-size: 19px;
                                                      margin-left: 50px;
                                                      margin-top:  20px;">
                                                      ` +
                  checkin.toLocaleDateString("it-IT") +
                  `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 14px;
                                                    margin-left: 50px;
                                                    margin-top: 25px;">
                                            Check-out: <br>
                                            
                                          </p>
                                          <p style="
                                                      font-size: 19px;
                                                      margin-left: 50px;
                                                      margin-top:  20px;">
                                                      ` +
                  checkout.toLocaleDateString("it-IT") +
                  `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Contatto: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].phone +
                  `
                                              </p>
                                            </div>

                                            <div style="display: block; text-align: center; margin-left: 100px;max-width: 30%">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-top: 25px;">
                                              Richieste: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-top:  20px;max-width: 100%;">
                                                        ` +
                  this.arrReservations[i].additionalRequests +
                  `
                                              </p>
                                            </div>

                                          </div>
                            `;
              } else if (this.arrReservations[i].apartment == "Stalla") {
                reservations.innerHTML +=
                  `
                                          <div style="display: flex;
                                                      margin-top: 50px;
                                                      width: 100%;
                                                      margin-left: 50px;
                                                      height: 180px;">
                                            <img src="../assets/stalla.jpg" style="border-radius: 10px; width: 230px; height: 130px;" >
                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Appartamento: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 55px;
                                                        margin-top:  20px;">
                                                Stalla
                                              </p>
                                            </div>

                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Prenotato da: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].name +
                  ` ` +
                  this.arrReservations[i].surname +
                  `
                                              </p>
                                            </div>
                                            
                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Persone: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].people +
                  `
                                              </p>
                                            </div>
                                            
                                            <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 14px;
                                                    margin-left: 50px;
                                                    margin-top: 25px;">
                                            Check-in: <br>
                                            
                                          </p>
                                          <p style="
                                                      font-size: 19px;
                                                      margin-left: 50px;
                                                      margin-top:  20px;">
                                                      ` +
                  checkin.toLocaleDateString("it-IT") +
                  `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 14px;
                                                    margin-left: 50px;
                                                    margin-top: 25px;">
                                            Check-out: <br>
                                            
                                          </p>
                                          <p style="
                                                      font-size: 19px;
                                                      margin-left: 50px;
                                                      margin-top:  20px;">
                                                      ` +
                  checkout.toLocaleDateString("it-IT") +
                  `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Contatto: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].phone +
                  `
                                              </p>
                                            </div>

                                            <div style="display: block; text-align: center; margin-left: 100px;max-width: 30%">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-top: 25px;">
                                              Richieste: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-top:  20px;max-width: 100%;">
                                                        ` +
                  this.arrReservations[i].additionalRequests +
                  `
                                              </p>
                                            </div>

                                          </div>
                            `;
              } else if (this.arrReservations[i].apartment == "Portichetto") {
                reservations.innerHTML +=
                  `
                                          <div style="display: flex;
                                                      margin-top: 50px;
                                                      width: 100%;
                                                      margin-left: 50px;
                                                      height: 180px;">
                                            <img src="../assets/portichetto.jpg" style="border-radius: 10px; width: 230px; height: 130px;" >
                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Appartamento: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 55px;
                                                        margin-top:  20px;">
                                                Portichetto
                                              </p>
                                            </div>

                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Prenotato da: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].name +
                  ` ` +
                  this.arrReservations[i].surname +
                  `
                                              </p>
                                            </div>
                                            
                                            <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Persone: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].people +
                  `
                                              </p>
                                            </div>
                                            
                                            <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 14px;
                                                    margin-left: 50px;
                                                    margin-top: 25px;">
                                            Check-in: <br>
                                            
                                          </p>
                                          <p style="
                                                      font-size: 19px;
                                                      margin-left: 50px;
                                                      margin-top:  20px;">
                                                      ` +
                  checkin.toLocaleDateString("it-IT") +
                  `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 14px;
                                                    margin-left: 50px;
                                                    margin-top: 25px;">
                                            Check-out: <br>
                                            
                                          </p>
                                          <p style="
                                                      font-size: 19px;
                                                      margin-left: 50px;
                                                      margin-top:  20px;">
                                                      ` +
                  checkout.toLocaleDateString("it-IT") +
                  `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-left: 50px;
                                                      margin-top: 25px;">
                                              Contatto: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-left: 50px;
                                                        margin-top:  20px;">
                                                        ` +
                  this.arrReservations[i].phone +
                  `
                                              </p>
                                            </div>

                                            <div style="display: block; text-align: center; margin-left: 100px;max-width: 30%">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 14px;
                                                      margin-top: 25px;">
                                              Richieste: <br>
                                              
                                            </p>
                                            <p style="
                                                        font-size: 19px;
                                                        margin-top:  20px;max-width: 100%;">
                                                        ` +
                  this.arrReservations[i].additionalRequests +
                  `
                                              </p>
                                            </div>

                                          </div>
                            `;
              }
            }
          }
        } else {
          alert("Non ci sono prenotazioni");
        }
      });
    } else {
      this._router.navigateByUrl("/login");
    }
  }
}
