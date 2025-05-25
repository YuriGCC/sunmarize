import { DashboardComponent } from '../dashboard/dashboard.component';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { PanelComponent } from "../panel/panel.component";
import { solarPanel } from '../../models/solarPanel.model';

@Component({
  selector: 'app-solar-panel-menu',
  templateUrl: './solar-panel-menu.component.html',
  styleUrl: './solar-panel-menu.component.css',
  standalone: true,
  imports: [PanelComponent, NgFor, DashboardComponent]
})
export class SolarPanelMenuComponent {

  panels: solarPanel[] = [
    {
      id: 1,
      watt: 430,
      efficiency: 0.21,
      cost: 860,
    },
    {
      id: 2,
      watt: 228,
      efficiency: 0.228,
      cost: 456,
    },
    {
      id: 3,
      watt: 460,
      efficiency: 0.2132,
      cost: 1012,
    },
    {
      id: 4,
      watt: 555,
      efficiency: 0.2148,
      cost: 1221,
    },
    {
      id: 5,
      watt: 590,
      efficiency: 0.2111,
      cost: 1298,
    }
  ];
}
