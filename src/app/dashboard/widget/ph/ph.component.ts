import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../../../devices/device.service';

@Component({
  selector: 'app-widget-ph',
  templateUrl: './ph.component.html',
  styleUrls: ['./ph.component.scss']
})
export class PhComponent implements OnInit, OnDestroy {
  @Input() phDevice;
  isLoading = true;
  isSyncing = false;
  isConnected;
  ph;

  syncInterval = setInterval(() => {
    this.getPh(this.phDevice.id, 'ph');
  }, 10000);
  
  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.getPh(this.phDevice.id, 'ph');
  }

  ngOnDestroy() {
    clearInterval(this.syncInterval);
  }

  getPh(id, variable) {
    this.deviceService.getVariable(id, variable).subscribe((data) => {
      if (data) {
        this.isConnected = true;
        this.ph = data['ph'];
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
    this.getPh(this.phDevice.id, 'ph');
  }
}
