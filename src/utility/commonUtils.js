const {customDate,getCurrentDate} = require('./dateUtility');
const { getDaysLabel } = require('./CommonFunction');
function getPastCampaignsData(data) {
    if(!data){
        return null;
    }
    const currentDate = customDate.dateToInteger(getCurrentDate());
    const dateVal = getCurrentDate();
    console.log(currentDate);
    let pastCampaignsData = [];
    for (let item of data) {
        if(currentDate > item.createdOn){
            item = {...item , 'date':dateVal};
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
            item = {...item , 'noofDaysDifference':getDaysLabel(noOfDays) , 'date':dateVal};
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
    for (const item of data) {
        const itemCreatedDate = customDate.extractTimeFromDate(customDate.integerToDate(item.createdOn));
        if(customDate.compareDates(itemCreatedDate , currentDate)){
            liveCampaignsData.push(item);
        }
    }
    return  liveCampaignsData;

}

function getSafeProperty(fn) {
    try {
      return fn();
    } catch (e) {
      return undefined;
    }
}

  module.exports={
    getPastCampaignsData,getSafeProperty,getLiveCampaignsData,getUpcomingCampaignsData
}