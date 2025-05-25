import { solarPanel } from '../../models/solarPanel.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolarPanelProfitService {

  private panel!: solarPanel;
  private kwatts = this.panel?.watt/1000;
  // R$0.59 per kw
  private energyCost =  0.59;
  private hoursOfSun = 5;

  setPanel(newPanel: solarPanel): void {
    this.panel = newPanel;
    this.kwatts = this.panel.watt/1000;

  }

  getPanel(): solarPanel | void {
    return this.panel;
  }

  profitPerDay(): number {
    return (this.hoursOfSun * this.kwatts) * this.energyCost;
  }

  profitPerMonth(): number {
    let energyPerDay = this.hoursOfSun * this.kwatts;
    return (energyPerDay * 30) * this.energyCost;
  }

  anualProfit(): number {
    return (this.hoursOfSun * this.kwatts * 365) * this.energyCost;
  }

  yearsToPayback(): number {
    return this.panel.cost / this.anualProfit();
  }
}
