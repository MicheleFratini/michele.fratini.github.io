import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UiComponent } from "./ui/ui.component";
import { AdminuiComponent } from "./adminui/adminui.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  { path: "youraccount", component: UiComponent},
  { path: "admin", component: AdminuiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
