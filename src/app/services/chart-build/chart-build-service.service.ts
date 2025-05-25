import { SolarPanelProfitService } from '../solar-panel-profit/solar-panel-profit.service';
import { Injectable, NgZone, ElementRef } from '@angular/core';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend, LineElement, LineController, PointElement, DoughnutController, ArcElement } from 'chart.js';
import { solarPanel } from '../../models/solarPanel.model';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend, LineController, PointElement,
  LineElement, DoughnutController, ArcElement);

@Injectable({
  providedIn: 'root'
})
export class ChartBuildService {
  private existingCharts: Map<CanvasRenderingContext2D, Chart> = new Map();
  private resizeObservers: Map<CanvasRenderingContext2D, ResizeObserver> = new Map();

  constructor(private solarPanelProfitService: SolarPanelProfitService, private ngZone: NgZone) { }

  profitPerDayCanvas(ctx: CanvasRenderingContext2D, container: HTMLElement, solarPanelList: solarPanel[]): Chart {
    this.destroyChart(ctx);
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: solarPanelList.map(panel => panel.id),
        datasets: [{
          label: 'Lucro por dia',
          data: solarPanelList.map(panel => {
            this.solarPanelProfitService.setPanel(panel);
            return this.solarPanelProfitService.profitPerDay();
          }),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: 'rgb(255,255,255)'
            },
            grid: {
              color: 'rgb(255,255,255)'
            }
          },
          y: {
            ticks: {
              color: 'rgb(255,255,255)'
            },
            grid: {
              color: 'rgb(255,255,255)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgb(255,255,255)'
            }
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                return `Painel: ${context[0].label}`;
              },
              label: (context) => {
                const panel = solarPanelList[context.dataIndex];
                this.solarPanelProfitService.setPanel(panel);
                return `Potência: ${panel.watt}
                        Ganhos: R$${this.solarPanelProfitService.profitPerDay().toFixed(2)}`
              }
            }
          }
        }
      }
    });

    this.setupResizeObserver(container, chart);
    return chart;
  }

  profitPerMonthCanvas(ctx: CanvasRenderingContext2D, container: HTMLElement, solarPanelList: solarPanel[]): Chart {
    this.destroyChart(ctx);

    return new Chart(
      ctx,
      {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: solarPanelList.map(panel => {
            this.solarPanelProfitService.setPanel(panel);
            const baseProfit = this.solarPanelProfitService.profitPerMonth();
            const currentMonth = new Date().getMonth();

            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);

            const monthlyData = Array(12).fill(null).map((_, monthIndex) => {
              if (monthIndex === currentMonth) {
                return baseProfit;
              }
              const variation = 1 + (Math.random() * 0.4 - 0.2);
              return baseProfit * variation;
            });

            return {
              label: `Painel ${panel.id} (R$ ${baseProfit.toFixed(2)})`,
              data: monthlyData,
              borderColor: `rgb(${r}, ${g}, ${b})`,
              backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
              tension: 0.1,
              fill: false,
              pointBackgroundColor: monthlyData.map((_, i) =>
                i === currentMonth ? `rgb(${r}, ${g}, ${b})` : 'rgba(150, 150, 150, 0.5)'
              ),
              pointRadius: monthlyData.map((_, i) => i === currentMonth ? 5 : 3)
            };
          })
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: 'rgb(255,255,255)'
              },
              grid: {
                color: 'rgb(255,255,255)'
              }
            },
            y: {
              ticks: {
                color: 'rgb(255,255,255)'
              },
              grid: {
                color: 'rgb(255,255,255)'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'rgb(255,255,255)'
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  if (!context.dataset?.label || context.parsed.y === null || context.parsed.y === undefined) {
                    return '';
                  }

                  const isCurrentMonth = context.dataIndex === new Date().getMonth();
                  const baseLabel = context.dataset.label.replace(/\(.*\)/, '').trim();
                  const value = context.parsed.y.toFixed(2);

                  return [
                    `${baseLabel}: R$ ${value}`,
                    isCurrentMonth ? '(Dado real)' : '(Projeção simulada)'
                  ];
                }
              }
            }
          }
        }
      }
    );
  }

  profitPerYearCanvas(ctx: CanvasRenderingContext2D, container: HTMLElement, solarPanelList: solarPanel[]): Chart {
    this.destroyChart(ctx);
    return new Chart(
      ctx,
      {
        type: 'doughnut',
        data: {
          labels: solarPanelList.map(panel => panel.id),
          datasets: [{
            label: 'Lucro por ano',
            data: solarPanelList.map(panel => {
              this.solarPanelProfitService.setPanel(panel);
              return this.solarPanelProfitService.anualProfit();
            }),
            backgroundColor: solarPanelList.map(() => {
              const r = Math.floor(Math.random() * 255);
              const g = Math.floor(Math.random() * 255);
              const b = Math.floor(Math.random() * 255);

              return `rgb(${r}, ${g}, ${b})`;
            }),
            hoverOffset: 50
          }],

        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: 'rgb(255, 255, 255)'
              },
              display: true,
              title: {
                color: 'rgb(255, 255, 255)',
                display: true,
                text:'Lucro por ano'
              }
            }
          }
        }
      }
    );

  }

  isValidChart(chart: any): chart is ElementRef<HTMLCanvasElement> {
    return chart !== null &&
           chart !== undefined &&
           chart.nativeElement instanceof HTMLCanvasElement;
  }

  destroyChart(ctx: CanvasRenderingContext2D): void {
    if (this.existingCharts.has(ctx)) {
      const chart = this.existingCharts.get(ctx);
      chart?.destroy();
      this.existingCharts.delete(ctx);

      const observer = this.resizeObservers.get(ctx);
      if (observer) {
        observer.disconnect();
        this.resizeObservers.delete(ctx);
      }
    }
  }

  destroyAllCharts(): void {
    this.existingCharts.forEach((chart, ctx) => {
      chart.destroy();
      const observer = this.resizeObservers.get(ctx);
      observer?.disconnect();
    });

    this.existingCharts.clear();
    this.resizeObservers.clear();
  }

  private setupResizeObserver(container: HTMLElement, chart: Chart) {
    const observer = new ResizeObserver(() => {
      this.ngZone.run(() => {
        chart.resize();
        chart.update();
      });
    });

    observer.observe(container);
    this.resizeObservers.set(chart.ctx, observer);
  }
}


