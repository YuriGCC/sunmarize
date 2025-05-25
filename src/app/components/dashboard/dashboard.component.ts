import { ChartBuildService } from '../../services/chart-build/chart-build-service.service';
import { SolarPanelProfitService } from '../../services/solar-panel-profit/solar-panel-profit.service';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { solarPanel } from '../../models/solarPanel.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() panelData!: solarPanel[];
  @ViewChild('profitPerDayCanvas') profitPerDayCanvas: ElementRef<HTMLCanvasElement> | null = null;
  @ViewChild('profitPerMonthCanvas') profitPerMonthCanvas: ElementRef<HTMLCanvasElement> | null = null;
  @ViewChild('profitPerYearCanvas') profitPerYearCanvas: ElementRef<HTMLCanvasElement> | null = null;

  @ViewChild('profitPerDayContainer') profitPerDayContainer: ElementRef<HTMLElement> | null = null;
  @ViewChild('profitPerMonthContainer') profitPerMonthContainer: ElementRef<HTMLElement> | null = null;
  @ViewChild('profitPerYearContainer') profitPerYearContainer: ElementRef<HTMLElement> | null = null;
  private chartContainers: any[] = [];

  private profitPerDayCanvasContext!: CanvasRenderingContext2D;
  private profitPerMonthCanvasContext!: CanvasRenderingContext2D;
  private profitPerYearCanvasContext!: CanvasRenderingContext2D;
  private charts: any[] = [];

  constructor(private chartBuildService: ChartBuildService) {}

  ngAfterViewInit() {
    this.updateCharts();
    this.updateContainers();
    if (this.charts?.length > 0 && this.chartContainers?.length > 0) {
      const profitPerDayCanvas = this.profitPerDayCanvas!.nativeElement;
      const profitPerMonthCanvas = this.profitPerMonthCanvas!.nativeElement;
      const profitPerYearCanvas = this.profitPerYearCanvas!.nativeElement;

      this.profitPerDayCanvasContext = profitPerDayCanvas.getContext('2d')!;
      this.profitPerMonthCanvasContext = profitPerMonthCanvas.getContext('2d')!;
      this.profitPerYearCanvasContext = profitPerYearCanvas.getContext('2d')!;
      if (!this.profitPerDayCanvasContext || !this.profitPerMonthCanvasContext ||
          !this.profitPerYearCanvasContext) return;

      const profitPerDayContainer = this.profitPerDayContainer!.nativeElement;
      const profitPerMonthContainer = this.profitPerMonthContainer!.nativeElement;
      const profitPerYearContainer = this.profitPerYearContainer!.nativeElement;

      this.chartBuildService.profitPerDayCanvas(this.profitPerDayCanvasContext, profitPerDayContainer, this.panelData);
      this.chartBuildService.profitPerMonthCanvas(this.profitPerMonthCanvasContext, profitPerMonthContainer, this.panelData)
      this.chartBuildService.profitPerYearCanvas(this.profitPerYearCanvasContext, profitPerYearContainer, this.panelData)

    }
    return;
  }

  ngOnDestroy(): void {
    this.chartBuildService.destroyAllCharts();
  }

  updateCharts() {
    this.charts = [
      this.profitPerDayCanvas,
      this.profitPerMonthCanvas,
      this.profitPerYearCanvas
    ].filter(chart => this.chartBuildService.isValidChart(chart)) as ElementRef<HTMLCanvasElement>[];
  }

  updateContainers() {
    this.chartContainers = [
      this.profitPerDayContainer,
      this.profitPerMonthContainer,
      this.profitPerYearContainer
    ].filter(container =>
      this.isValidContainer(container)
    ) as ElementRef<HTMLDivElement>[];
  }

  isValidContainer(container: any): container is ElementRef<HTMLDivElement> {
    return container !== null &&
      container !== undefined &&
      container.nativeElement instanceof HTMLElement &&
      container.nativeElement.tagName == 'DIV';
  }
}
