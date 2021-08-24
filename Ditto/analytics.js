const ua = require('universal-analytics');
const uuid = require('uuid/v4');
const { app } = require('electron')
const { JSONStorage } = require('node-localstorage');
const nodeStorage = new JSONStorage(app.getPath('userData'));

// Retrieve the userid value, and if it's not there, assign it a new uuid.
const userId = nodeStorage.getItem('userid') || uuid();

// (re)save the userid, so it persists for the next app session.
nodeStorage.setItem('userid', userId);

// Initialize with google analytics
const usr = ua('UA-205647332-1', userId);

function trackEvent(category, action, label, value) {
  usr
    .event({
      ec: category,
      ea: action,
      el: label,
      ev: value,
    })
    .send();
}

module.exports = { trackEvent };