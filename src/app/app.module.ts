import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceService } from './devices/device.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceComponent } from './devices/device/device.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetComponent } from './dashboard/widget/widget.component';
import { LightComponent } from './dashboard/widget/light/light.component';
import { DioxideComponent } from './dashboard/widget/dioxide/dioxide.component';
import { PhComponent } from './dashboard/widget/ph/ph.component';
import { RelayComponent } from './dashboard/widget/relay/relay.component';
import { WeatherComponent } from './dashboard/widget/weather/weather.component';
import { TemperatureComponent } from './dashboard/widget/temperature/temperature.component';
import { FontsModule } from './fonts.module';
import { SnackbarUiService } from './shared/snackbar-ui.service';
import { AuthenticationService } from './auth/authentication.service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { HttpJWTInterceptor } from './auth/http-jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    DevicesComponent,
    DeviceComponent,
    DashboardComponent,
    WidgetComponent,
    LightComponent,
    DioxideComponent,
    PhComponent,
    RelayComponent,
    WeatherComponent,
    TemperatureComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpJWTInterceptor,
    multi: true
  }, AuthGuard, AuthenticationService, DeviceService, SnackbarUiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
