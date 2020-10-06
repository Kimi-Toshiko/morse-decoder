const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let n8th = new Array; //array, which helds the value splitted in 10 binary numbers
    let morseStr = ''; //string with morse code
    let morseArr = new Array; //array with morse chars
    let res = ''; //final result string

    for (let i = 0; i < expr.length; i += 10) {
        n8th.push([`${expr.slice(i, i + 10)}`]);        
    } //divide by 10 digits

    for (let el = 0; el < n8th.length; el++) {
        if (n8th[el][0] !== '**********') {
            for (let i = 0; i < n8th[el][0].length; i += 2) {
                n8th[el].push(`${n8th[el][0].slice(i, i + 2)}`);
            } //divide into two-digits elements each element if it is not a 'space' and push it into the subarray
        }
    } //take each element of the array with elements divided

    n8th.map(el => {
        if (el[0] !== '**********')
            el.shift();
    }); //if it is not a 'space' remove the first element out of each subarray

    n8th.map(el => {
        for (let i = 0; i < el.length; i++) {
            if (el[i] === '10')
                el[i] = '.';
            else if (el[i] === '11')
                el[i] = '-';
            else if (el[i] === '**********')
                el[i] = '**********';
            else
                el[i] = '';               
        }
    }); //change each pair to morse dots and dashes

    for (let el = 0; el < n8th.length; el++) {
        for (let i = 0; i < n8th[el].length; i++) {
            morseStr += `${n8th[el][i]}`;
        }
        morseStr += ' ';
    } //create a string with morse code needed to be encoded

    morseArr = morseStr.split(' '); //create an array of each morse character

    morseArr.pop(); //delete the last empty element

    morseArr.map(el => {
        if (el === '**********')
            res += ' ';
        else
            res += `${MORSE_TABLE[`${el}`]}`;
    }); //add to the result string words depending on the morse table

    // console.log(morseArr);
    // console.log(res);
    return res;
}

module.exports = {
    decode
}

// decode("00101010100000000010001011101000101110100000111111**********00001011110000111111000010111000101110100000111010");