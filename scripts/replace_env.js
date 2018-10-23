#!/usr/bin/env node
const {render} = require("mustache");
const fs = require("fs");

const file = process.argv[2];
const output = render(fs.readFileSync(file, "utf-8"), process.env);
fs.writeFileSync(file, output);
