import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../../../devices/device.service';

@Component({
  selector: 'app-widget-relay',
  templateUrl: './relay.component.html',
  styleUrls: ['./relay.component.scss']
})
export class RelayComponent implements OnInit, OnDestroy {
  @Input() relayDevice;
  @Input() pin;
  isLoading = true;
  isSyncing = false;
  isConnected;
  
  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
  
  onRelay() {
    this.deviceService.digitalWrite(this.relayDevice.id, this.pin, 1);
  }

  offRelay() {
    this.deviceService.digitalWrite(this.relayDevice.id, this.pin, 0);
  }
}

