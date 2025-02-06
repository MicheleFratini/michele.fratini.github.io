import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "it-IT" }]
})
export class BookingComponent {
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}
  porchLowSeasonPrice = 90;
  stableLowSeasonPrice = 110;
  littlePorchLowSeasonPrice = 130;
  porchAverageSeasonPrice = 100;
  stableAverageSeasonPrice = 130;
  littlePorchAverageSeasonPrice = 150;
  porchHighSeasonPrice = 130;
  stableHighSeasonPrice = 150;
  littlePorchHighSeasonPrice = 160;
  porchPrise = 0;
  stablePrise = 0;
  littlePorchPrise = 0;
  mounth = 0;
  it = 1;
  maxPeople: Number[] = [1, 2, 3, 4, 5, 6, 7];
  p = 0;
  todayDate = new Date();
  lists: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  countryList: String[] = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
  ];
  // This function will be called to show up the available apartments after the user research in the dedicated section
  avaiability(info: { people: number; handicap: boolean }) {
    const item = document.getElementById("result1");
    const item1 = document.getElementById("result2");
    const item2 = document.getElementById("result3");
    const item3 = document.getElementById("results");
    const message = document.getElementById("message");
    const porch = document.getElementById("porchReservation");
    const stable = document.getElementById("stableReservation");
    const littlePorch = document.getElementById("littlePorchReservation");
    const separator = document.getElementById("separator");
    const separator1 = document.getElementById("separator");
    const btn1 = document.getElementById("porchBookingButton");
    const btn2 = document.getElementById("stableBookingButton");
    const btn3 = document.getElementById("littlePorchBookingButton");
    const report = document.getElementById("report");
    const backarrow = document.getElementById("arrow");
    this.p = info.people;
    // Here will be done all the input related controls to ensure a correct result
    if (
      this.range.value.start != undefined &&
      this.range.value.end != undefined
    ) {
      if (this.range.value.end - this.range.value.start > 0) {
        var checkInDate = new Date(this.range.value.start);
        var checkOutDate = new Date(this.range.value.end);
        var counts = Math.abs(checkInDate.getTime() - checkOutDate.getTime());
        var nights = Math.ceil(counts / (1000 * 3600 * 24));
        console.log("Nights: " + nights);
        this.mounth = checkInDate.getMonth() + 1;

        if (info.people != 0) {
          if (info.handicap === true) {
            this.http
              .post("http://localhost:8080/availability", [
                info.people,
                info.handicap,
                this.range.value.start,
                this.range.value.end
              ])
              .subscribe(res => {
                this.lists = res;

                if (
                  item != null &&
                  item1 != null &&
                  item2 != null &&
                  item3 != null &&
                  message != null &&
                  porch != null &&
                  stable != null &&
                  littlePorch != null &&
                  separator != null &&
                  separator1 != null &&
                  btn1 != null &&
                  btn2 != null &&
                  report != null &&
                  backarrow != null
                ) {
                  item.setAttribute("class", "notextended");
                  item1.setAttribute("class", "notextended");
                  item2.setAttribute("class", "notextended");
                  item3.setAttribute("class", "notextended");
                  message.setAttribute("class", "notextended");
                  porch.setAttribute("class", "notextended");
                  stable.setAttribute("class", "notextended");
                  littlePorch.setAttribute("class", "notextended");
                  backarrow.setAttribute("class", "notextended");
                  separator.style.display = "none";
                  separator1.style.display = "none";
                  report.style.display = "none";
                  message.setAttribute("class", "extension_style");
                
                  if (this.lists.length == 0) {
                    message.innerHTML = `<p>Non ci sono appartamenti disponibili per il periodo richiesto tenendo conto della disabilità dichiarata</p>`;
                  } else if (
                    this.lists.length == 1 &&
                    this.lists[0] == "Portichetto"
                  ) {
                    message.innerHTML = `<p>Non ci sono appartamenti disponibili per il periodo richiesto tenendo conto della disabilità dichiarata</p>`;
                  } else {
                    item3.setAttribute("class", "extension_style2");
                    message.innerHTML = `<p>Risultati della ricerca...</p>`;
                    for (var i = 0; i < this.lists.length; i++) {
                      if (this.lists[i] == "Portico") {
                        if (this.mounth > 2 && this.mounth < 6) {
                          this.porchPrise =
                            nights * this.porchAverageSeasonPrice;
                        } else if (this.mounth < 3 || this.mounth > 11) {
                          this.porchPrise = nights * this.porchLowSeasonPrice;
                        } else if (this.mounth > 8 && this.mounth < 12) {
                          this.porchPrise =
                            nights * this.porchAverageSeasonPrice;
                        } else if (this.mounth > 5 && this.mounth < 9) {
                          this.porchPrise = nights * this.porchHighSeasonPrice;
                        }
                        item.setAttribute("class", "extension_style1");
                        item.style.borderRight = "2px solid";
                        btn1.style.visibility = "visible";
                      } else if (this.lists[i] == "Stalla") {
                        if (this.mounth > 2 && this.mounth < 6) {
                          this.stablePrise =
                            nights * this.stableAverageSeasonPrice;
                        } else if (this.mounth < 3 || this.mounth > 11) {
                          this.stablePrise = nights * this.stableLowSeasonPrice;
                        } else if (this.mounth > 8 && this.mounth < 12) {
                          this.stablePrise =
                            nights * this.stableAverageSeasonPrice;
                        } else if (this.mounth > 5 && this.mounth < 9) {
                          this.stablePrise =
                            nights * this.stableHighSeasonPrice;
                        }

                        item1.setAttribute("class", "extension_style1");
                        item1.style.borderRight = "2px solid";
                        btn2.style.visibility = "visible";
                      }
                    }
                  }

                  console.log("Entra qua 3");
                } else {
                  console.log("Qualche id non viene riconosciuto");
                }
              });
          } else {
            info.handicap = false;
            this.http
              .post("http://localhost:8080/availability", [
                info.people,
                info.handicap,
                this.range.value.start,
                this.range.value.end
              ])
              .subscribe(res => {
                this.lists = res;
                console.log(this.lists.length);

                if (
                  item != null &&
                  item1 != null &&
                  item2 != null &&
                  item3 != null &&
                  message != null &&
                  porch != null &&
                  stable != null &&
                  littlePorch != null &&
                  separator != null &&
                  separator1 != null &&
                  btn1 != null &&
                  btn2 != null &&
                  btn3 != null &&
                  report != null &&
                  backarrow != null
                ) {
                  item.setAttribute("class", "notextended");
                  item1.setAttribute("class", "notextended");
                  item2.setAttribute("class", "notextended");
                  item3.setAttribute("class", "notextended");
                  message.setAttribute("class", "notextended");
                  porch.setAttribute("class", "notextended");
                  stable.setAttribute("class", "notextended");
                  littlePorch.setAttribute("class", "notextended");
                  backarrow.setAttribute("class", "notextended");
                  separator.style.display = "none";
                  separator1.style.display = "none";
                  report.style.display = "none";
                  message.setAttribute("class", "extension_style");
                  message.innerHTML = `<p>Risultati della ricerca...</p>`;
                  if (this.lists.length == 0) {
                    message.innerHTML = `<p>Non ci sono appartamenti disponibili per il periodo richiesto tenendo conto della disabilità dichiarata</p>`;
                  } else {
                    item3.setAttribute("class", "extension_style2");
                    console.log("Lunghezza lista" + this.lists.length);

                    for (var i = 0; i < this.lists.length; i++) {
                      if (this.lists[i] == "Portico") {
                        if (this.mounth > 2 && this.mounth < 6) {
                          this.porchPrise =
                            nights * this.porchAverageSeasonPrice;
                        } else if (this.mounth < 3 || this.mounth > 11) {
                          this.porchPrise = nights * this.porchLowSeasonPrice;
                        } else if (this.mounth > 8 && this.mounth < 12) {
                          this.porchPrise =
                            nights * this.porchAverageSeasonPrice;
                        } else if (this.mounth > 5 && this.mounth < 9) {
                          this.porchPrise = nights * this.porchHighSeasonPrice;
                        }

                        item.setAttribute("class", "extension_style1");
                        item.style.borderRight = "2px solid";
                        btn1.style.visibility = "visible";
                      } else if (this.lists[i] == "Stalla") {
                        if (this.mounth > 2 && this.mounth < 6) {
                          this.stablePrise =
                            nights * this.stableAverageSeasonPrice;
                        } else if (this.mounth < 3 || this.mounth > 11) {
                          this.stablePrise = nights * this.stableLowSeasonPrice;
                        } else if (this.mounth > 8 && this.mounth < 12) {
                          this.stablePrise =
                            nights * this.stableAverageSeasonPrice;
                        } else if (this.mounth > 5 && this.mounth < 9) {
                          this.stablePrise =
                            nights * this.stableHighSeasonPrice;
                        }
                        item1.setAttribute("class", "extension_style1");
                        item1.style.borderRight = "2px solid";
                        btn2.style.visibility = "visible";
                      } else if (this.lists[i] == "Portichetto") {
                        if (this.mounth > 2 && this.mounth < 6) {
                          this.littlePorchPrise =
                            nights * this.littlePorchAverageSeasonPrice;
                        } else if (this.mounth < 3 || this.mounth > 11) {
                          this.littlePorchPrise =
                            nights * this.littlePorchLowSeasonPrice;
                        } else if (this.mounth > 8 && this.mounth < 12) {
                          this.littlePorchPrise =
                            nights * this.littlePorchAverageSeasonPrice;
                        } else if (this.mounth > 5 && this.mounth < 9) {
                          this.littlePorchPrise =
                            nights * this.littlePorchHighSeasonPrice;
                        }
                        item2.setAttribute(
                          "class",
                          "extension_style1withoutborder"
                        );
                        btn3.style.visibility = "visible";
                      }
                    }
                  }

                  console.log("Entra qua 3");
                } else {
                  console.log("Qualche id non viene riconosciuto");
                }
              });
          }
        } else {
          alert("Inserisci il numero delle persone");
        }
      } else {
        alert("Il limite minimo di notti è: 1");
      }
    } else {
      alert(
        "Controlla se hai inserito date nella casella dell'intervallo di tempo di permanenza in struttura"
      );
    }
  }
  // This function set the layout to book the selected apartment inserting a booking module
  booking(apartment: string) {
    const porchBookingInfoModule = document.getElementById("porchReservation");
    const stableBookingInfoModule = document.getElementById(
      "stableReservation"
    );
    const littlePorchBookingInfoModule = document.getElementById(
      "littlePorchReservation"
    );
    const backarrow = document.getElementById("arrow");
    const item1 = document.getElementById("result2");
    const item2 = document.getElementById("result3");
    const item = document.getElementById("result1");
    const separator = document.getElementById("separator");
    const separator1 = document.getElementById("separator");
    const btn1 = document.getElementById("porchBookingButton");
    const btn2 = document.getElementById("stableBookingButton");
    const btn3 = document.getElementById("littlePorchBookingButton");

    if (apartment == "Portico") {
      if (
        porchBookingInfoModule != null &&
        backarrow != null &&
        item1 != null &&
        item2 != null &&
        item != null &&
        separator != null &&
        separator1 != null &&
        btn1 != null
      ) {
        porchBookingInfoModule.setAttribute(
          "class",
          "extension_style1withoutborder"
        );
        backarrow.setAttribute("class", "backimage");
        backarrow.setAttribute("class", "backimage");
        item1.setAttribute("class", "notextended");
        item2.setAttribute("class", "notextended");
        item.style.border = "0px solid";
        separator.style.display = "block";
        separator1.style.display = "block";
        btn1.style.visibility = "hidden";
      }
    } else if (apartment == "Stalla") {
      if (
        stableBookingInfoModule != null &&
        backarrow != null &&
        item1 != null &&
        item2 != null &&
        item != null &&
        separator != null &&
        separator1 != null &&
        btn2 != null
      ) {
        stableBookingInfoModule.setAttribute(
          "class",
          "extension_style1withoutborder"
        );
        backarrow.setAttribute("class", "backimage");
        item.setAttribute("class", "notextended");
        item2.setAttribute("class", "notextended");
        item1.style.border = "0px solid";
        separator.style.display = "block";
        separator1.style.display = "block";
        btn2.style.visibility = "hidden";
      }
    } else if (apartment == "Portichetto") {
      if (
        littlePorchBookingInfoModule != null &&
        backarrow != null &&
        item1 != null &&
        item2 != null &&
        item != null &&
        separator != null &&
        separator1 != null &&
        btn3 != null
      ) {
        littlePorchBookingInfoModule.setAttribute(
          "class",
          "extension_style1withoutborder"
        );
        backarrow.setAttribute("class", "backimage");
        item.setAttribute("class", "notextended");
        item1.setAttribute("class", "notextended");
        item2.style.border = "0px solid";
        separator.style.display = "block";
        separator1.style.display = "block";
        btn3.style.visibility = "hidden";
      }
    }
  }
  // Assemble the reservation and send it to the server to store it
  createReservation(
    data: {
      name: string;
      region: string;
      email: string;
      phone: string;
      additionalRequests: string;
    },
    apartment: string,
    checkin: Date = this.range.value.start,
    checkout: Date = this.range.value.end
  ) {
    if (data.name != "") {
      if (data.name.match(" ")) {
        if (data.email.match("@")) {
          if (data.region != null) {
            if (data.phone != null) {
              if (data.phone.length == 10) {
                var char = false;
                for (let i = 0; i < data.phone.length; i++) {
                  if (data.phone[i] >= "0" && data.phone[i] <= "9") {
                  } else {
                    char = true;
                    break;
                  }
                }
                if (char) {
                  alert("Il numero di telefono contiene caratteri");
                } else {
                  this.http
                    .post("http://localhost:4200/booking", [
                      data,
                      apartment,
                      checkin,
                      checkout,
                      this.p
                    ])
                    .subscribe(res => {
                      if (res === true) {
                        if (apartment == "Portico") {
                          const userBookingInfoModule = document.getElementById(
                            "porchReservation"
                          );
                          const report = document.getElementById("report");

                          if (userBookingInfoModule && report) {
                            userBookingInfoModule.setAttribute(
                              "class",
                              "notextended"
                            );
                            report.style.display = "block";
                          }
                        } else if (apartment == "Stalla") {
                          const userBookingInfoModule = document.getElementById(
                            "stableReservation"
                          );
                          const report = document.getElementById("report");

                          if (userBookingInfoModule && report) {
                            userBookingInfoModule.setAttribute(
                              "class",
                              "notextended"
                            );
                            report.style.display = "block";
                          }
                        } else if (apartment == "Portichetto") {
                          const userBookingInfoModule = document.getElementById(
                            "littlePorchReservation"
                          );
                          const report = document.getElementById("report");

                          if (userBookingInfoModule && report) {
                            userBookingInfoModule.setAttribute(
                              "class",
                              "notextended"
                            );
                            report.style.display = "block";
                          }
                        }
                      } else {
                        /*                         alert("Qualcosa è andato storto");
 */
                      }
                    });
                }
              } else {
                alert("Il numero di telefono dev'essere di 9 cifre");
              }
            } else {
              alert("Inserisci il numero di telefono");
            }
          } else {
            alert("La password non è sufficientemente lunga");
          }
        } else {
          alert("L'e-mail inserita non è corretta");
        }
      } else {
        alert("Tra nome e cognome dev'esserci uno spazio");
      }
    } else {
      alert("Inserisci Nome e Cognome prima di proseguire");
    }
  }
}
