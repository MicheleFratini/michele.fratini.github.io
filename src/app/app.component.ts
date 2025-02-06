import { Component, ElementRef } from "@angular/core";
import { BookingComponent } from "./booking/booking.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatCardImage } from "@angular/material/card";
import { Fancybox } from '@fancyapps/ui';




/* export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
} */
  
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  


  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = "none";
  }
 

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {
      // Custom options
    });
  }

  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }

  

  /* fullImgBox = document.getElementById("fullImgBox");
  fullImg = document.getElementById("fullImg") as HTMLImageElement; 


  async showImage(imageSrc: any) {
    

    if (this.fullImgBox != null) {
      this.fullImgBox!.style.display = "flex";
      this.fullImg!.src = imageSrc.src;
      console.log("Ha cliccato sulla prima immagine")
      
    }
    console.log("è null")
  }
  
  
  // function to hide the image when we click on cross button
  async closeImage() {
    this.fullImgBox!.style.display = "none";
    }
   */
}
