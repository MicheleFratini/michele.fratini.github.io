import { Component, ElementRef } from "@angular/core";
import { Fancybox } from "@fancyapps/ui";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = "none";
  }
  constructor(private elRef: ElementRef, private _router: Router) {}
  index = 0;
  path3: string = "../assets/firstR.PNG";
  titles: string[] = [
    `Un grande grazie a Gianluca e Stefania, proprierari di casa Trastullo, arrivederci a presto.`,
    `Soggiorno rilassante.`,
    `Un piccolo paradiso in terra, gestito in modo incantevole e perfetto in ogni dettaglio`,
    `Pane, vino e amore.`,
    `Tranquility in south umbria`,
    `Soggiorno rilassante e posizione ottimale per visitare i dintorni`
  ];
  reviews: string[] = [
    "L'accoglienza e la gentilezza dei proprietari, la piscina, la tranquillità del posto, la facilità di raggiungere i posti e le città più belle...",
    "Calma e silenzio. In mezzo alla natura con visite di fauna selvatica. Buona posizione per viste culturali di grande valore.",
    "Tutto bene. La tranquillità, la gentilezza dei proprietari, la dimensione perfetta della camera, la piscina accessibilissima, il paesaggio incantevole circostante",
    "Praticamente tutto bene",
    "Everything good, especially the location. Much better than on the photos",
    "Tranquillità, panorama, piscina, ospitalità, tutto perfetto!"
  ];
  text: string = this.reviews[0];
  names: string[] = [];
  photos: string[] = [
    "../assets/firstR.PNG",
    "../assets/secondR.PNG",
    "../assets/thirdR.PNG",
    "../assets/fourthR.PNG",
    "../assets/fifthR.PNG",
    "../assets/sixthR.PNG"
  ];
  title: string = this.titles[0];

  ngOnInit() {
    Fancybox.bind(
      this.elRef.nativeElement,
      "[data-fancybox]",
      {
        // Custom options
      }
    );
  }

  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }

  login() {
    console.log(sessionStorage.getItem("user"));
    if (sessionStorage.getItem("user") == "AdMiNiStRaToRfKj0!") {
      this._router.navigateByUrl("/admin");
    } else if (sessionStorage.getItem("user") != null) {
      this._router.navigateByUrl("/youraccount");
    } else {
      this._router.navigateByUrl("/login");
    }
  }
  changeImage(direction: string) {
    if (this.index >= 0 && direction == "Right") {
      if (this.index < this.photos.length - 1) {
        this.index++;
        this.path3 = this.photos[this.index];
        this.text = this.reviews[this.index];
        this.title = this.titles[this.index];
      }
    }
    if (this.index > 0 && direction == "Left") {
      this.index--;
      this.path3 = this.photos[this.index];
      this.text = this.reviews[this.index];
      this.title = this.titles[this.index];
    }
  }
}
