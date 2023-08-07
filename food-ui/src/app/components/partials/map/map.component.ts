import { Marker, LatLngExpression, LeafletMouseEvent, LatLng } from './../../../../../node_modules/@types/leaflet/index.d';
import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { LatLngTuple, Map, icon, map, tileLayer, marker } from 'leaflet'
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @Input() order!: Order;
  @Input() readonly = false;
  @ViewChild('map', {static: true})
  mapRef!: ElementRef

  private readonly MARKER_ZOOM_LEVEL = 16
  private readonly MARKER_ICON = icon({
    iconUrl: "https://cdn.pixabay.com/photo/2015/12/14/20/30/location-1093169_1280.png",
    iconSize: [24,32],
    iconAnchor: [21, 42],
  })
  private readonly DEFAULT_LATLNG: LatLngTuple  = [13.75, 21.62]
  map!: Map
  currentMarker!: Marker //by leaflet

  constructor(private locationService: LocationService) { }

  ngOnChanges(): void {
    if(!this.order) return;
    this.initializeMap()

    if(this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode()
    }
  }
  showLocationOnReadonlyMode() {
    const m = this.map
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL)

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap() {
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map)

    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng)
    })
  }

  findMyLocation(): void {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlgn) => {
        this.map.setView(latlgn, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlgn)
    }})
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng
    if(this.currentMarker) {
      this.currentMarker.setLatLng(latlng)
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map)

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng()
    })
  }

  set addressLatLng(latlng: LatLng) {
    if(!latlng.lat.toFixed) return;

    latlng.alt = parseFloat(latlng.lat.toFixed(8))
    latlng.lng = parseFloat(latlng.lng.toFixed(8))

    this.order.addressLatLng = latlng
  }

  getaddressLatLng() {
    return this.order.addressLatLng!;
  }

}
