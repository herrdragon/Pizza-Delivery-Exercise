#!/usr/bin/env node

const fs = require('fs');
const args = process.argv;
const commands = ['read'];

const getHelp = function() {
    const helpText = `
    Simple node program to handle files using streams.
    usage:
        node index.js <command> <path_to_file>

        <command> can be:
        read: Parse file's pizza order for delivery

        <path_to_file> is the path to the file you want to work with.
    `;
    console.log(helpText);
}
const read = (filePath) => {
    const readableStream = fs.createReadStream(filePath, 'utf8');
    let map = new Map();
    let myturn = true;
    let x = y = s = t = 0;
    // House at 00 get two pizzas from the start
    map.set(`${x}${y}`, 2)

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })
    
    readableStream.on('data', (steps) => {
        for(let step of steps) {
            if(step == '>')
                if(myturn) x++;
                else s++;
            if(step == '<')
                if(myturn) x--;
                else s--;
            if(step == '^')
                if(myturn) y++;
                else t++;
            if(step == 'v')
                if(myturn) y--;
                else t--;
            if(myturn) {
                person.deliver(map, x, y);
                myturn = !myturn;
            }
            if(!myturn) {
                goat.deliver(map, s, t);
                myturn = !myturn;
            }
            // console.log(step, x, y);
        }
    })

    readableStream.on('end', () => {
        // for (const [key, value] of map) {
        //     console.log(key + ' = ' + value)
        // }
        console.log('Houses received at least one pizza', map.size)
        let uno = dos = more = 0;
        for (const value of map.values()) {
            if(value == 1)
                uno++;
            if(value == 2)
                dos++;
            if(value > 2)
                more++;
        }
        console.log('Houses received one pizza', uno)
        console.log('Houses received two pizzas', dos)
        console.log('Houses received more than two pizzas', more)
    })
}
class Delivery {
    deliver (map, x, y) {
        if(map.get(`${x}${y}`) == undefined)
            map.set(`${x}${y}`, 1);
        else
            map.set(`${x}${y}`, map.get(`${x}${y}`)+1);
    }
}
const person = new Delivery();
const goat = new Delivery();

let command = '';

if(args.length < 3) {
    getHelp();
    return;
}
else if(args.length > 4) {
    console.log('More arguments provided than expected');
    getHelp();
    return;
}
else {
    command = args[2]
    if(!args[3]) {
        console.log('This tool requires at least one path to a file');
        getHelp();
        return;
    }
}

switch(commands.indexOf(command)) {
    case 0:
        read(args[3]);
        break;
    default:
        console.log('You entered a wrong command. See help text below for supported functions');
        getHelp();
        return;
}


