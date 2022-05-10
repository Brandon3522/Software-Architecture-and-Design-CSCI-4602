const validatePassword = require('./passwordvalidation'); //import the function

const readline = require('readline');

// Your code goes here!

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// WORKING
function password_validation(){
  rl.question('Enter a password or q to quit. \n', (answer) => {
  if (answer != 'q')
  {
    if (validatePassword(answer) == true)
    {
        console.log(`${answer} is a valid password`);
    }
    else
        console.log(`${answer} is not a valid password`);
        password_validation();

  }
  else
      rl.close();
});
}

password_validation();




