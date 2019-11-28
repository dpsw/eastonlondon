import Logger from '@/helpers/logger';

class RequestHelper {
  /**
   * Request Help function
   */
  static async request(callback, requestData, itWillBeEmptyResponse = false) {
    const response = await callback(requestData);

    if (itWillBeEmptyResponse) {
      return null;
    }

    const { data } = response;

    Logger.debug('response:');
    Logger.debug(data);
    Logger.debug('\n');

    if ('errNo' in data && data.errNo !== 0) {
      let errMsg = 'errMsg' in data ? data.errMsg : 'Service is unavailable';
      if (data.Errors && data.Errors.length) {
        const [firstError] = data.Errors;
        ({ errMsg } = firstError);
      }
      Logger.error(errMsg);
      throw new Error(errMsg);
    }

    return data;
  }
}

export default RequestHelper;
