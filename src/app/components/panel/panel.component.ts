import { Component, Input } from '@angular/core';
import { solarPanel } from '../../models/solarPanel.model';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  @Input() panelData!: solarPanel;
}
