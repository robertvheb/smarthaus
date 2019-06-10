import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../../../devices/device.service';

@Component({
  selector: 'app-widget-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit, OnDestroy {
  @Input() temperatureDevice;
  isLoading = true;
  isSyncing = false;
  isConnected;
  temperature;

  syncInterval = setInterval(() => {
    this.getTemperature(this.temperatureDevice.id, 'temperature');
  }, 10000);
  
  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.getTemperature(this.temperatureDevice.id, 'temperature');
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

  sync() {
    this.isSyncing = true;
    this.isLoading = true;
    this.getTemperature(this.temperatureDevice.id, 'temperature');
  }
}

