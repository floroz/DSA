var Logger = function () {
  this.messages = {};
};

/**
 * @param {number} timestamp
 * @param {string} message
 * @return {boolean}
 */
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
  if (this.messages[message]) {
    if (timestamp >= this.messages[message]) {
      // print and update
      this.messages[message] = timestamp + 10;
      return true;
    } else {
      return false;
    }
  } else {
    this.messages[message] = +timestamp + 10;
    return true;
  }
};

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */
