import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';
import { formatDate, NgIf, CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Feature } from 'ol';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Circle as CircleGeometry } from 'ol/geom';
import Point from 'ol/geom/Point';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { nasapower } from '../../models/nasapower.model';
import { NasapowerService } from '../../services/nasapower-service/nasapower-service.service';
import { OpenStreetService } from './../../services/open-street/open-street-service.service';
import VectorLayer from 'ol/layer/Vector';
import { Polygon } from 'ol/geom';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private map!: Map;
  cityInput = new FormControl('');
  location: any = null;
  nasapowerResponse?: nasapower;
  private raster = new TileLayer({
    source: new OSM()
  });
  private source = new VectorSource({wrapX: false});
  private vector = new VectorLayer({
    source: this.source
  });

  constructor(private openStreetService: OpenStreetService, private nasapowerService: NasapowerService) {}

  ngAfterViewInit(): void {
    if (!this.mapContainer?.nativeElement) return;
    this.initializeMap();
    console.log('Verificando mapa após inicialização:');
    console.log('Target element:', this.mapContainer.nativeElement);
    console.log('Map size:', this.map.getSize());
    console.log('View center:', this.map.getView().getCenter());
  }

  private initializeMap(): void {
    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [this.raster, this.vector],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

  private zoomInMap(longitude: number, latitude: number): void {
    if (!isNaN(longitude) && !isNaN(latitude)) {
      const view = this.map.getView();
      view.setCenter(fromLonLat([latitude, longitude]));
      view.setZoom(10);
    }
  }

  targetCity(): void {
    let lat = '0';
    let lon = '0';
    this.openStreetService.getLatLonCity(this.cityInput.value || '').subscribe({
      next:(data) => {
        if (data && data.length > 0) {
          lat = data[0].lat;
          lon = data[0].lon;

          const lastWeek = new Date();
          const lastMonth = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);
          lastMonth.setDate(lastWeek.getDate() - 31);
          this.nasapowerService.getSolarIrradiation(data[0].lat, data[0].lon,
            formatDate(lastMonth, 'yyyyMMdd', 'en-US'),formatDate(lastWeek, 'yyyyMMdd', 'en-US')).subscribe({
              next: (response) => {
                this.nasapowerResponse = response;
              }
            })
        } else {
          console.error('Cidade não encontrada');
        }
      }
    });
    this.markInMap(Number(lat), Number(lon));
    this.zoomInMap(Number(lat), Number(lon));
  }

  markInMap(lon: number, lat: number): void {
    const center = fromLonLat([lon, lat]);
    const point = new Point(center);
    const feature = new Feature(point);

    feature.setStyle(new Style({
      image: new CircleStyle({
        radius: 10,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'black', width: 1 })
      })
    }));

    this.source.addFeature(feature);
  }
}
