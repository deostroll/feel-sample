const feel = require('js-feel')();

// console.log(feel);

const { decisionService : { createDecisionGraphAST, executeDecisionService }} = feel;

const fs = require('fs');

const readJson = function(file) {
	return JSON.parse(fs.readFileSync(file, { encoding: 'utf8'}));
};

const feelJson = readJson('feel_program.json');

ast = createDecisionGraphAST(feelJson);

executeDecisionService(ast, "main", { name: "Ajay", age: 23, height: 6 , customerId: 'abc12'}).then(answers => {
	console.log('answers:', answers);
})
.catch(err => {
	console.error(err);
})