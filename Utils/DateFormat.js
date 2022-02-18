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

export const findDayofWeek = (date) => {
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayOfWeek = week[new Date(date).getDay()];
    
    return dayOfWeek;
}