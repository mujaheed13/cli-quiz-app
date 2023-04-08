#!/usr/bin/env node

import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let player_name = "";
let score = 0;

const welcome = () => {
  console.log(`
    Welcome to CLI based Quiz app
    Instructions:-
    You will have five questions.
    You will be provided with 4 options for each question.
    you will win if you select all the correct options.
    `);
};


async function name() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  player_name = answer.player_name;
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();

  if (isCorrect) {
    score += 1;
    spinner.success({
      text: `Well Played ${player_name}!. That was a correct answer`,
    });
  } else {
    spinner.error({ text: `Game over, you lost ${player_name}!` });
    console.log(`Your final score is ${score}`);
    process.exit(1);
  }
}

async function question1() {
  const answer = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Which of the following is a markup language?\n",
    choices: ["JavaScript", "HTML", "Python", "C++"],
  });

  return handleAnswer(answer.question_1 === "HTML");
}

async function question2() {
  const answer = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Which of the following is most used in web development?\n",
    choices: ["JavaScript", "Java", "Python", "C++"],
  });

  return handleAnswer(answer.question_2 === "JavaScript");
}

async function question3() {
  const answer = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "Which of the following is not a primitive datatype in JS?\n",
    choices: ["String", "Number", "Array", "Boolean"],
  });

  return handleAnswer(answer.question_3 === "Array");
}

async function question4() {
  const answer = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which of the following is used for styling in websites?\n",
    choices: ["Java", "Go", "Python", "CSS"],
  });

  return handleAnswer(answer.question_4 === "CSS");
}

async function question5() {
  const answer = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "What is 1+1?\n",
    choices: ["1", "2", "3", "4"],
  });

  return handleAnswer(answer.question_5 === "2");
}

function onWin(){
    console.clear();
    console.log(`Congrats ${player_name}, you won! and your score is ${score}`);
    process.exit(1);
}

welcome();
await name();
await question1();
await question2();
await question3();
await question4();
await question5();
onWin();