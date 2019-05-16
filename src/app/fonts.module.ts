import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSignal,
  faPlus,
  faSpinner,
  faMicrochip,
  faUser,
  faLightbulb,
  faThermometerHalf,
  faSyncAlt,
  faAddressCard,
  faInfoCircle,
  faSignOutAlt,
  faSignInAlt,
  faEnvelope,
  faSun,
  faCloud,
  faFlask
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faSignal,
  faPlus,
  faSpinner,
  faMicrochip,
  faUser,
  faLightbulb,
  faThermometerHalf,
  faSyncAlt,
  faAddressCard,
  faInfoCircle,
  faSignOutAlt,
  faSignInAlt,
  faEnvelope,
  faSun,
  faCloud,
  faFlask
);

@NgModule({
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FontsModule {
}
