const express = require('express');
const app = express();
const axios = require('axios');

app.get('/proxy', async (req, res) => {
    const hawksoft = await axios.get('https://integration.hawksoft.cloud/vendor/agency/99999299/client/95949532', {
        headers: {
          Authorization: 'Basic NWYzNzkwMDMtZGZkYi00YmM0LThiNzYtNDRkNWE5OWE3ZTk1Omg4NFRsQWlaQkNCOXJzMU9uWlNrYjJSaEY3cmtpS0RnNTl5RkF1VndSTDQ9'
        }
    });
    res.json(hawksoft.data['policies']);
});

app.listen('3000', () => {
    console.log('listening on 3000');
});