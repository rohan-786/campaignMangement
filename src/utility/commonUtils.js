const fs = require('fs');
var path = require('path');
const updateJsonFile = require('update-json-file');
const writeJsonFile = require('write-json-file');
const {customDate,getCurrentDate} = require('./dateUtility');
const { getDaysLabel } = require('./CommonFunction');
function getPastCampaignsData(data) {
    if(!data){
        return null;
    }
    const currentDate = customDate.dateToInteger(getCurrentDate());
    //const dateVal = getCurrentDate();
    console.log(currentDate);
    let pastCampaignsData = [];
    for (let item of data) {
        if(currentDate > item.createdOn){
            const itemCreatedDate = customDate.extractTimeFromDate(customDate.integerToDate(item.createdOn));
            item = {...item , 'date':itemCreatedDate};
            pastCampaignsData.push(item);
        }
    }

    return  pastCampaignsData;

}

function getUpcomingCampaignsData(data) {
    if(!data){
        return null;
    }
    const currentDate = customDate.dateToInteger(getCurrentDate());
    const dateVal = getCurrentDate();
    let upcomingCampaignsData = [];
    for (let item of data) {
        if(currentDate < item.createdOn){
            const itemCreatedDate = customDate.extractTimeFromDate(customDate.integerToDate(item.createdOn));
            const noOfDays = customDate.dateDifferenceInTermsOfDays(dateVal,itemCreatedDate);
            item = {...item , 'noofDaysDifference':getDaysLabel(noOfDays) , 'date':itemCreatedDate};
            upcomingCampaignsData.push(item);
        }
    }
    return  upcomingCampaignsData;

}

function getLiveCampaignsData(data) {
    if(!data){
        return null;
    }
    const currentDate = customDate.dateToInteger(getCurrentDate());
    let liveCampaignsData = [];
    for (let item of data) {
        const itemCreatedDate = customDate.extractTimeFromDate(customDate.integerToDate(item.createdOn));
        if(customDate.compareDates(itemCreatedDate , currentDate)){
            item = {...item , "date":itemCreatedDate}
            liveCampaignsData.push(item);
        }
    }
    return  liveCampaignsData;

}

function updateDateForCampaign(id , newDate ,data) {
    if(!id || !newDate || !data) return null;

    let newList = [];
    for (const item of data) {
        if(id == item.id){
            item.createdOn = newDate;
        }
        newList.push(item);
    }
    let newData = {"data":newList};
    (async () => {
        await writeJsonFile('TestJSON.json', newData);
    })();
}

function getSafeProperty(fn) {
    try {
      return fn();
    } catch (e) {
      return undefined;
    }
}

  module.exports={
    getPastCampaignsData,getSafeProperty,getLiveCampaignsData,getUpcomingCampaignsData,updateDateForCampaign
}