const emptyYn = (params) => {

    console.log(Object.keys(params));
    
    // keys의 값이 [] 해당하는 객체가 있는지 파악, () 해당하는 key의 데이터를 배열로 나타내준다.
    const empty = Object.keys(params).length === 0 ? true : false;

    return empty;
}


module.exports = {
    'emptyYn' : emptyYn
}