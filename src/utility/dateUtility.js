const moment = require("moment");

const customDate = {
    integerToDate: function(val) {
        return val ? new Date(val) : null;
    },
    dateToInteger: function(val){
        return val ? new Date(val).getTime():null; 
    },
    extractTimeFromDate: function(val) {
        return val ? moment(val).format('MMM D YYYY'):null; 
    },
    compareDates: function(d1 ,d2) {
        const dateParams1 = this.dateParams(d1);
        const dateParams2 = this.dateParams(d2);
        return dateParams1['d'] == dateParams2['d'] && 
               dateParams1['m'] == dateParams2['m'] &&
               dateParams1['Y'] == dateParams2['Y']
    },
    dateParams: function(date) {
        return date ? {'d': moment(date).format('D'),
                       'm': moment(date).format('MMM'),
                       'Y': moment(date).format('YYYY')
                    } : {};
    },
    dateDifferenceInTermsOfDays : function(startDate ,endDate) {
        return (startDate && endDate) ? moment.duration(moment(endDate).diff(moment(startDate))).asDays() : null; 
    }

}

function getCurrentDate(){
    return moment().format("MMM D YYYY");
}

module.exports={
    customDate,getCurrentDate
}