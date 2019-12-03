#!/usr/bin/env node

const ora = require('ora');
const download = require('download-git-repo');
const commander = require('commander');

const { version } = require('./package.json');

commander
  .version(version)
  .parse(process.argv);

const [projectType, dirName] = commander.args;

let tempName;

switch(projectType) {
  case 'vde':
    if(!dirName) {
      console.log('  vde [project-name]');
      process.exit(-1);
    } else tempName = 'mobtech-vde';
    break;
  case 'rde':
    if(!dirName) {
      console.log('  rde [project-name]');
      process.exit(-1);
    } else tempName = 'mobtech-rde';
    break;
  default:
    console.log('Usage: mobtech <command> [options]');
    console.log('Options:');
    console.log('  -V, --version  output the version number');  
    console.log('  vde            Initialize the Vue project');  
    console.log('  rde            Initialize the React project');
    process.exit(-1);
}

const loading = ora(`正在从 https://github.com/weijiaa/${tempName}.git 下载模板`).start();
download(`weijiaa/${tempName}`, dirName, function (err) {
  if(err) {
    loading.fail('创建项目失败！');
    throw err;
  } else {
    loading.succeed('创建项目成功！');
  }
});
