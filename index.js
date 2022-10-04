import {AppRegistry} from 'react-native';
import App from './App';
import EduApp from './EducationApp/EduApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => EduApp);
