#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const { program } = require("commander");
const inquirer = require("inquirer");

program
  .arguments("<dir>") // <>必填项  []可填项
  .description("this is a directory!")
  .action((dir) => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "framework",
          message: "which framework do you like?",
          choices: ["react", "vue"],
        },
      ])
      .then((res) => {
        console.log("result", dir, res);
        const fullDir = path.resolve(process.cwd(), dir);
        console.log("-----fullDir", fullDir);
        const command = `git clone https://bitbucket.safetytaxfree.net/scm/mid/front-template.git ${fullDir}`;
        console.log("-----command", command);
        childProcess.execSync(command);
        // fs.writeFileSync(path.resolve(__dirname, './'))
      });
    // console.log("--dir", dir);
  });
// 可打印process.argv查看link地址源
// console.log(process.argv);
program.parse(process.argv);
