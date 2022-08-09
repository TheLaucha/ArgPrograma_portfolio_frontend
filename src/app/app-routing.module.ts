import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { ProjectsComponent } from './components/projects/projects.component';

const userExist = sessionStorage.getItem("AuthUsername")

const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: userExist ? HomeComponent : IniciarSesionComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
