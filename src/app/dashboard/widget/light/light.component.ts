import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../../../devices/device.service';

@Component({
  selector: 'app-widget-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit, OnDestroy {
  @Input() lightDevice;
  isLoading = true;
  isSyncing = false;
  isConnected;
  light;

  syncInterval = setInterval(() => {
    this.getLight(this.lightDevice.id, 'light');
  }, 10000);
  
  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.getLight(this.lightDevice.id, 'light');
  }

  ngOnDestroy() {
    clearInterval(this.syncInterval);
  }

  getLight(id, variable) {
    this.deviceService.getVariable(id, variable).subscribe((data) => {
      if (data) {
        this.isConnected = true;
        this.light = data['light'];
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
    this.getLight(this.lightDevice.id, 'light');
  }
}