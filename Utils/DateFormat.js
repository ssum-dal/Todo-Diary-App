export const isToday = (date) => {
    const today = new Date();
    
    if(date.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
        return true;
    } else {
        return false;
    }
}

export const dateToString = (date) => {
    return new Date(date.getTime()-(date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
}