#!/usr/bin/env node

const program = require('commander');
const action = require('./module/action/new/index');

program
    .command('new <project-name>')
    .action(action.new);

program
    .version('0.0.1', '-v, --version');

program.parse(process.argv);