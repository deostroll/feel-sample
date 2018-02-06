const feel = require('js-feel')();

// console.log(feel);

const { decisionService : { createDecisionGraphAST, executeDecisionService }} = feel;

const fs = require('fs');

const readJson = function(file) {
	return JSON.parse(fs.readFileSync(file, { encoding: 'utf8'}));
};

const feelJson = readJson('feel_program.json');

ast = createDecisionGraphAST(feelJson);

// executeDecisionService(ast, "main", { name: "Ajay", age: 23, height: 6 , customerId: 'abc12'}).then(answers => {
// 	console.log('answers:', answers, typeof answers);
// })
// .catch(err => {
// 	console.error(err);
// })
var payload = { name: "Ajay", customerId: 43223 };
var decisions = ["main", "checks"];
var promises = decisions.map(d => executeDecisionService(ast, d, payload));

Promise.all(promises).then(results => {
	return results.reduce((obj, ans, idx) => Object.assign(obj, {[decisions[idx]] : ans }), {});
}).then(validation => console.log('Validation Result:', validation))
.catch(err => console.error('Error:', err))