import { IS_DEBUG_MODE } from '@/config/config';

class Logger {
  static debug(data, isMethodName = false) {
    if (IS_DEBUG_MODE) {
      if (isMethodName) {
        console.log(`%c ${data}`, 'color: green');
      } else {
        console.log(data);
      }
    }
  }

  static warn(data) {
    console.warn(data);
  }

  static error(data) {
    console.error(data);
  }
}

export default Logger;
