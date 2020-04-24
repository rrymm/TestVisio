import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import frTranslation from './i18n/fr.json';
import enTranslation from './i18n/en.json';
import {IntlProvider} from 'react-intl';
import { Platform, NativeModules } from 'react-native'
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';

const translations = {
	fr: frTranslation,
	en: enTranslation
};

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

const locale = deviceLanguage.includes('fr') ? 'fr' : 'en';

const AppWithI18n = () => (
  <IntlProvider locale={locale} messages={translations[locale]}>
    <App/>
	</IntlProvider>
)

AppRegistry.registerComponent(appName, () => AppWithI18n);
