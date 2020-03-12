const makeRoomValues = (id, cap, bedtype) => {
    return `(${id}, ${cap}, ${bedtype})`
}

const makeResvValues = (id, startDate, endDate, price, pCount) => {
    return `(${id}, ${startDate.format('YYYY-MM-DD')} , ${endDate.formatformat('YYYY-MM-DD')}, ${price}, ${pCount})`;
}