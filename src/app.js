const express = require('express');
const app = express();
var cors = require('cors')
app.use(express.json());

app.use(cors());

let jsonData = require('../TestJSON.json');
const {getPastCampaignsData ,getUpcomingCampaignsData,getLiveCampaignsData,updateDateForCampaign } = require('./utility/commonUtils');

app.use('/get-past-campaigns-info', (req, res,err) => {
    const data  = getPastCampaignsData(jsonData.data);
    data ? res.status(200).send(data) : err.status(500).send("Internal Server error");
})

app.use('/get-upcoming-campaigns-info', (req, res,err) => {
    const data  = getUpcomingCampaignsData(jsonData.data);
    data ? res.status(200).send(data) : err.status(500).send("Internal Server error");
   
})

app.use('/get-live-campaigns-info', (req, res,err) => {
    const data  = getLiveCampaignsData(jsonData.data);
    data ? res.status(200).send(data) : err.status(500).send("Internal Server error");
  
})

app.use('/update-list',(req,res,err)=>{
    const id = req.headers.id;
    const dateval = req.headers.dateval;
    console.log("date",dateval);
    updateDateForCampaign(id,dateval,jsonData.data);
    res.status(200).send({});
})



app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



module.exports = {
    app
};