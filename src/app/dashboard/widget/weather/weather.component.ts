import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../../../devices/device.service';

@Component({
  selector: 'app-widget-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  @Input() weatherDevice;
  isLoading = true;
  isSyncing = false;
  isConnected;
  temperature;
  humidity;

  syncInterval = setInterval(() => {
    this.getTemperature(this.weatherDevice.id, 'temperature');
    this.getHumidity(this.weatherDevice.id, 'humidity');
  }, 10000);
  
  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.getTemperature(this.weatherDevice.id, 'temperature');
    this.getHumidity(this.weatherDevice.id, 'humidity');
  }

  ngOnDestroy() {
    clearInterval(this.syncInterval);
  }

  getTemperature(id, variable) {
    this.deviceService.getVariable(id, variable).subscribe((data) => {
      if (data) {
        this.isConnected = true;
        this.temperature = data['temperature'];
        this.isLoading = false;
        setTimeout(() => {
          this.isSyncing = false;
        }, 3500);
      } else {
        this.isConnected = false;
        this.isSyncing = false;
        this.isLoading = false;
      }
    }, (error) => {
      console.log('Device sync error', error);
    });
  }

  getHumidity(id, variable) {
    this.deviceService.getVariable(id, variable).subscribe((data) => {
      if (data) {
        this.isConnected = true;
        this.humidity = data['humidity'];
        this.isLoading = false;
        setTimeout(() => {
          this.isSyncing = false;
        }, 3500);
      } else {
        this.isConnected = false;
        this.isSyncing = false;
        this.isLoading = false;
      }
    }, (error) => {
      console.log('Device sync error', error);
    });
  }

  sync() {
    this.isSyncing = true;
    this.isLoading = true;
    this.getTemperature(this.weatherDevice.id, 'temperature');
    this.getHumidity(this.weatherDevice.id, 'humidity');
  }
}
