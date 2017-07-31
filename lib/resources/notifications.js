'use strict';
/**
 * Notifications resource
 * @module resources/notifications
 */

var utils = require('../utils');

module.exports = function(request) {
  return {

    /**
     * Send an notification
     *
     * @param  {Object}   body     Notification body
     * @param  {Function} callback Callback function
     */
    send: send.bind(null, null),

    /**
     * Send an notification
     *
     * @param  {String}   dedupe    UUID
     * @param  {Object}   body      Notification body
     * @param  {Function} callback  Callback function
     */
    sendDedupe: send
  };

  function send(dedupe, body, callback) {
    if (dedupe !== null && !utils.toUUID(dedupe)) return callback(new Error(utils.i18n.dedupe));
    if (!body || typeof body !== 'object') return callback(new Error(utils.i18n.notifications.body));
    utils.debug('Notifications send');

    request.post({
      path: '/notifications',
      body: body,
      dedupe: dedupe
    }, callback || utils.nop);
  }
};
