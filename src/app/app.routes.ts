import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { SolarPanelMenuComponent } from './components/solar-panel-menu/solar-panel-menu.component';
;

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'painels', component: SolarPanelMenuComponent },
      { path: 'map', component: MapComponent },
      { path: '', redirectTo: '/painels', pathMatch: 'full' }
    ]
  }
];
