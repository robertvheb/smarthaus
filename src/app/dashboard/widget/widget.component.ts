import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../../devices/device.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnDestroy {
  @Input() registeredDevice;
  @Input() type;
  
  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
    
  }
  
  onOff(id, pin, value) {
    this.deviceService.digitalWrite(id, pin, value);
  }

  mode(id, pin, mode) {
    this.deviceService.pinMode(id, pin, mode);
  }
}
