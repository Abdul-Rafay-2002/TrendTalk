import moment from 'moment';
export const formatDate = (date) =>{
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    //Current time is less than 1min find this condition
    if(diff < 60000 ){
        return 'Just now'
    }

    //Current time is less than 1hour find this condition
    if(diff < 3600000 ){
        return `${Math.round(diff / 60000)}min ago`
    }

    //Current time is less than 1day find this condition
    if(diff < 86400000 ){
        return moment(date).format("h:mm A")
    }

    //else more than one day ago display formated date accordingly
    return moment(date).format('MM/DD/YY')
}