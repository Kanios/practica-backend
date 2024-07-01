const axios = require('axios');

const notifySlack = async (message) => {
  try {
    await axios.post(process.env.SLACK_WEBHOOK_URL, { text: message });
  } catch (error) {
    console.error('Error notifying Slack:', error);
  }
};

module.exports = notifySlack;