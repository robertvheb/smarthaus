import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../../devices/device.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnDestroy {
  @Input() registeredDevices;
  isLoading = true;
  isSyncing = false;
  isConnected;
  temperature;
  humidity;
  light;

  syncInterval = setInterval(() => {
    if (this.registeredDevices.length) {
      this.getTemperature(this.registeredDevices[0].id, 'temperature');
      this.getHumidity(this.registeredDevices[0].id, 'humidity');
      this.getLight(this.registeredDevices[0].id, 'light');
    }
  }, 10000);

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    if (this.registeredDevices.length) {
      this.getTemperature(this.registeredDevices[0].id, 'temperature');
      this.getHumidity(this.registeredDevices[0].id, 'humidity');
      this.getLight(this.registeredDevices[0].id, 'light');
    }
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
    if (this.registeredDevices.length) {
      this.getTemperature(this.registeredDevices[0].id, 'temperature');
      this.getHumidity(this.registeredDevices[0].id, 'humidity');
      this.getLight(this.registeredDevices[0].id, 'light');
    }
  }

  onRelay() {
    if (this.registeredDevices.length) {
      this.deviceService.digitalWrite(this.registeredDevices[0].id, 5, 1);
    }
  }

  offRelay() {
    if (this.registeredDevices.length) {
      this.deviceService.digitalWrite(this.registeredDevices[0].id, 5, 0);
    }
  }
  
  onOff(id, pin, value) {
    this.deviceService.digitalWrite(id, pin, value);
  }

  mode(id, pin, mode) {
    this.deviceService.pinMode(id, pin, mode);
  }
}
