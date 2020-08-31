const arr = ['lp-008789', 'lp-007557', 'tuot-007545', 'tu-09876', 'lp-0989782'];

const test = (val, prefix) => {
    if ((String(val).length - String(prefix).length) - 1 !== 6) return false;
    let regex = new RegExp('^' + prefix + '-0{0,5}[1-9]{1,5}\d?$');
    console.log(regex);
    return regex.test(val);
};

arr.forEach(val => console.log(test(val, 'lp')));



