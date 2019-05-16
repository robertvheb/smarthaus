import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../../../devices/device.service';

@Component({
  selector: 'app-widget-dioxide',
  templateUrl: './dioxide.component.html',
  styleUrls: ['./dioxide.component.scss']
})
export class DioxideComponent implements OnInit, OnDestroy {
  @Input() dioxideDevice;
  isLoading = true;
  isSyncing = false;
  isConnected;
  carbondioxide;

  syncInterval = setInterval(() => {
    this.getCarbondioxide(this.dioxideDevice.id, 'carbondioxide');
  }, 10000);
  
  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.getCarbondioxide(this.dioxideDevice.id, 'carbondioxide');
  }

  ngOnDestroy() {
    clearInterval(this.syncInterval);
  }

  getCarbondioxide(id, variable) {
    this.deviceService.getVariable(id, variable).subscribe((data) => {
      if (data) {
        this.isConnected = true;
        this.carbondioxide = data['carbondioxide'];
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
    this.getCarbondioxide(this.dioxideDevice.id, 'carbondioxide');
  }
}
