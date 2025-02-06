import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-ui",
  templateUrl: "./ui.component.html",
  styleUrls: ["./ui.component.css"]
})
export class UiComponent {
  arr: any = [];
  checked: boolean = false;

  constructor(private http: HttpClient, private _router: Router) {
    // Here i get the session item user to be sure that a user is logged in, if it's not logged in it will be redirected to the login page
    const user = sessionStorage.getItem("user");
    if (user != null) {
      this.getEmail();
      this.checked = false;
    } else {
      this._router.navigateByUrl("/login");
    }
  }
  // This function will be called in the constructor to reach the most important info
  getEmail() {
    const user = sessionStorage.getItem("user");
    console.log("La esegue:" + user);
    this.http.post("http://localhost:8080/email", [user]).subscribe(res => {
      if (res != null) {
        this.arr = res;
      } else {
        alert(
          "Se sei sicuro di essere iscritto controlla l'e-mail e la password perchè potrebbero non essere corretti"
        );
      }
    });
  }
  // This function will be called if the user want to delete a reservation
  updateReservation(apartment: string) {
    this.http
      .post("http://localhost:8080/updateR", [
        sessionStorage.getItem("user"),
        apartment
      ])
      .subscribe(res => {
        if (res === true) {
          this.arr = res;
        } else {
          console.log("Update doesn't applied");
        }
      });
  }
  // This function will be called if the user would want to see the his/her reservations
  getReservations() {
    console.log("L'esegue");
    const reservations = document.getElementById("yourReservations");
    const itinerary = document.getElementById("itineraries");
    const activities = document.getElementById("bookActivities");
    const contact = document.getElementById("contacts");
    const home = document.getElementById("first");

    if (
      reservations != null &&
      itinerary != null &&
      activities != null &&
      contact != null &&
      home != null
    ) {
      console.log("Entra qua");
      if (itinerary.style.display != "none") {
        console.log("Entra nel primo if");
        itinerary.style.display = "none";
      }
      if (activities.style.display != "none") {
        console.log("Entra nel secondo if");
        activities.style.display = "none";
      }
      if (contact.style.display != "none") {
        console.log("Entra nel terzo if");
        contact.style.display = "none";
      }
      if (home.style.display != "none") {
        home.style.display = "none";
      }
      reservations.style.display = "block";

      if (this.checked == false) {
        if (this.arr.length == undefined) {
          console.log("Entra nell'else");
          reservations.innerHTML += `<div style="display: block; text-align: center;">
                                          <p style="font-family: 'Raleway Thin'; font-size: 19px; margin-top: 250px;">
                                          Non ci sono appartamenti prenotati con la mail con il quale si è registrato/a</p>
                                          
                                      </div>`;
        }
        // Apartment divs will be inserted in the ui.component.html by this cycle
        for (var i = 0; i < this.arr.length; i++) {
          if (this.arr[i][0] == "Portico") {
            reservations.innerHTML +=
              `<div style="display: flex;
                                                  margin-top: 50px;
                                                  width: 100%;
                                                  margin-left: 50px;
                                                  height: 150px;">
                                          <img src="../assets/portico.jpg" style="border-radius: 10px;
                                                                                  " >
                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 16px;
                                                    margin-left: 100px;
                                                    margin-top: 40px;">
                                            Appartamento: <br>
                                            
                                          </p>
                                          <p style="font-family: 'Anthony Hunters';
                                                      font-size: 30px;
                                                      margin-left: 120px;
                                                      margin-top:  20px;">
                                              Portico
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 16px;
                                                    margin-left: 100px;
                                                    margin-top: 40px;">
                                            Persone: <br>
                                            
                                          </p>
                                          <p style="font-family: 'Anthony Hunters';
                                                      font-size: 30px;
                                                      margin-left: 120px;
                                                      margin-top:  20px;">
                                                      ` +
              this.arr[i][3] +
              `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 16px;
                                                    margin-left: 100px;
                                                    margin-top: 40px;">
                                            Check-in: <br>
                                            
                                          </p>
                                          <p style="font-family: 'Anthony Hunters';
                                                      font-size: 25px;
                                                      margin-left: 80px;
                                                      margin-top:  20px;">
                                                      ` +
              this.arr[i][1] +
              `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 16px;
                                                    margin-left: 100px;
                                                    margin-top: 40px;">
                                            Check-out: <br>
                                            
                                          </p>
                                          <p style="font-family: 'Anthony Hunters';
                                                      font-size: 25px;
                                                      margin-left: 85px;
                                                      margin-top:  20px;">
                                                      ` +
              this.arr[i][2] +
              `
                                            </p>
                                          </div>
                                          <div style="display:block;">
                                          <button id="deletePorchReservation"  style="margin-top: 55px; margin-left:100px;
                                                         background-color: green;
                                                         border: none;
                                                         color: white;
                                                         padding: 15px 32px;
                                                         text-align: center;
                                                         text-decoration: none;
                                                         display: inline-block;
                                                         font-size: 16px;
                                                         border-radius: 5px;
                                                         cursor: pointer;">Cancella prenotazione</button>
                                          </div>
                                        </div>`;
          } else if (this.arr[i][0] == "Stalla") {
            reservations.innerHTML +=
              `<div style="display: flex;
                                              margin-top: 50px;
                                              width: 100%;
                                              margin-left: 50px;
                                              height: 150px;">
                                        <img src="../assets/stalla.jpg" style="border-radius: 10px;
                                                                                " >
                                        <div style="display:block;">
                                        <p style="font-family: 'Raleway Thin';
                                                  font-size: 16px;
                                                  margin-left: 100px;
                                                  margin-top: 40px;">
                                          Appartamento: <br>
                                          
                                        </p>
                                        <p style="font-family: 'Anthony Hunters';
                                                    font-size: 30px;
                                                    margin-left: 120px;
                                                    margin-top:  20px;">
                                            Stalla
                                          </p>
                                        </div>

                                        <div style="display:block;">
                                        <p style="font-family: 'Raleway Thin';
                                                  font-size: 16px;
                                                  margin-left: 100px;
                                                  margin-top: 40px;">
                                          Persone: <br>
                                          
                                        </p>
                                        <p style="font-family: 'Anthony Hunters';
                                                    font-size: 30px;
                                                    margin-left: 120px;
                                                    margin-top:  20px;">
                                                    ` +
              this.arr[i][3] +
              `
                                          </p>
                                        </div>

                                        <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 16px;
                                                    margin-left: 100px;
                                                    margin-top: 40px;">
                                            Check-in: <br>
                                            
                                          </p>
                                          <p style="font-family: 'Anthony Hunters';
                                                      font-size: 25px;
                                                      margin-left: 80px;
                                                      margin-top:  20px;">
                                                      ` +
              this.arr[i][1] +
              `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 16px;
                                                    margin-left: 100px;
                                                    margin-top: 40px;">
                                            Check-out: <br>
                                            
                                          </p>
                                          <p style="font-family: 'Anthony Hunters';
                                                      font-size: 25px;
                                                      margin-left: 85px;
                                                      margin-top:  20px;">
                                                      ` +
              this.arr[i][2] +
              `
                                            </p>
                                          </div>
                                          <div style="display:block;">
                                          <button id="deleteStableReservation" style="margin-top: 55px; margin-left:100px;
                                                         background-color: green;
                                                         border: none;
                                                         color: white;
                                                         padding: 15px 32px;
                                                         text-align: center;
                                                         text-decoration: none;
                                                         display: inline-block;
                                                         font-size: 16px;
                                                         border-radius: 5px;
                                                         cursor: pointer;">Cancella prenotazione</button>
                                          </div>
                                      </div>`;
          } else if (this.arr[i][0] == "Portichetto") {
            reservations.innerHTML +=
              `<div style="display: flex;
                                                    margin-top: 50px;
                                                    width: 100%;
                                                    margin-left: 50px;
                                                    height: 150px;">
                                          <img src="../assets/portichetto.jpg" style="border-radius: 10px;" >
                                          <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 16px;
                                                      margin-left: 100px;
                                                      margin-top: 40px;">
                                              Appartamento: <br>
                                                      
                                            </p>
                                            <p style="font-family: 'Anthony Hunters';
                                                    font-size: 30px;
                                                    margin-left: 105px;
                                                    margin-top:  20px;">
                                              Portichetto
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                            <p style="font-family: 'Raleway Thin';
                                                      font-size: 16px;
                                                      margin-left: 100px;
                                                      margin-top: 40px;">
                                              Persone: <br>
                                                      
                                            </p>
                                            <p style="font-family: 'Anthony Hunters';
                                                      font-size: 30px;
                                                      margin-left: 120px;
                                                      margin-top:  20px;">` +
              this.arr[i][3] +
              `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 16px;
                                                    margin-left: 100px;
                                                    margin-top: 40px;">
                                            Check-in: <br>
                                            
                                          </p>
                                          <p style="font-family: 'Anthony Hunters';
                                                      font-size: 25px;
                                                      margin-left: 80px;
                                                      margin-top:  20px;">
                                                      ` +
              this.arr[i][1] +
              `
                                            </p>
                                          </div>

                                          <div style="display:block;">
                                          <p style="font-family: 'Raleway Thin';
                                                    font-size: 16px;
                                                    margin-left: 100px;
                                                    margin-top: 40px;">
                                            Check-out: <br>
                                            
                                          </p>
                                          <p style="font-family: 'Anthony Hunters';
                                                      font-size: 25px;
                                                      margin-left: 85px;
                                                      margin-top:  20px;">
                                                      ` +
              this.arr[i][2] +
              `
                                            </p>
                                          </div>
                                          <div style="display:block;">
                                          <button id="deleteLPorchReservation" style="margin-top: 55px; margin-left:100px;
                                                         background-color: green;
                                                         border: none;
                                                         color: white;
                                                         padding: 15px 32px;
                                                         text-align: center;
                                                         text-decoration: none;
                                                         display: inline-block;
                                                         font-size: 16px;
                                                         border-radius: 5px;
                                                         cursor: pointer;">Cancella prenotazione</button>
                                          </div>
                                        </div>`;
          }
        }
      }
    }
    // Here will be listened the button event
    const delete1 = document.getElementById("deleteLPorchReservation");
    const delete2 = document.getElementById("deletePorchReservation");
    const delete3 = document.getElementById("deleteStableReservation");
    var el: boolean = false;
    if (delete1) {
      delete1.onclick = () => {
        const res = window.confirm(
          "Sei sicuro di voler cancellare questea prenotazione?"
        );
        if (res == true) {
          console.log("You'r sure to delete");
          this.updateReservation("Portichetto");
          window.location.reload();
        }
      };
    }
    if (delete2) {
      delete2.onclick = () => {
        const res = window.confirm(
          "Sei sicuro di voler cancellare questea prenotazione?"
        );
        if (res == true) {
          console.log("You'r sure to delete");
          this.updateReservation("Portico");
          window.location.reload();
        }
      };
    }
    if (delete3) {
      delete3.onclick = () => {
        const res = window.confirm(
          "Sei sicuro di voler cancellare questea prenotazione?"
        );
        if (res == true) {
          console.log("You'r sure to delete");
          this.updateReservation("Stalla");
          window.location.reload();
        }
      };
    }
    this.checked = true;
  }
  // This function will be called when the user wants to show up the itinerary section
  getItineraries() {
    const reservations = document.getElementById("yourReservations");
    const itinerary = document.getElementById("itineraries");
    const activities = document.getElementById("bookActivities");
    const contact = document.getElementById("contacts");
    const home = document.getElementById("first");

    if (
      reservations != null &&
      itinerary != null &&
      activities != null &&
      contact != null
    ) {
      console.log("Entra qua");
      if (reservations.style.display != "none") {
        console.log("Entra nel primo if");

        reservations.style.display = "none";
      }
      if (activities.style.display != "none") {
        console.log("Entra nel secondo if");

        activities.style.display = "none";
      }
      if (contact.style.display != "none") {
        console.log("Entra nel terzo if");
        contact.style.display = "none";
      }

      itinerary.style.display = "block";
    }
  }
  // This function will be called when the user wants to show up the booking activities section
  getActivities() {
    const reservations = document.getElementById("yourReservations");
    const itinerary = document.getElementById("itineraries");
    const activities = document.getElementById("bookActivities");
    const contact = document.getElementById("contacts");
    if (
      reservations != null &&
      itinerary != null &&
      activities != null &&
      contact != null
    ) {
      console.log("Entra qua");
      if (reservations.style.display != "none") {
        console.log("Entra nel primo if");
        reservations.style.display = "none";
      }
      if (itinerary.style.display != "none") {
        console.log("Entra nel secondo if");
        itinerary.style.display = "none";
      }
      if (contact.style.display != "none") {
        console.log("Entra nel terzo if");

        contact.style.display = "none";
      }
      activities.style.display = "block";
    }
  }
  // This function will be called when the user wants to show up the contacts
  getContacts() {
    const reservations = document.getElementById("yourReservations");
    const itinerary = document.getElementById("itineraries");
    const activities = document.getElementById("bookActivities");
    const contact = document.getElementById("contacts");
    if (
      reservations != null &&
      itinerary != null &&
      activities != null &&
      contact != null
    ) {
      if (reservations.style.display != "none") {
        reservations.style.display = "none";
      }
      if (activities.style.display != "none") {
        activities.style.display = "none";
      }
      if (itinerary.style.display != "none") {
        itinerary.style.display = "none";
      }
      contact.style.display = "block";
    }
  }
}
