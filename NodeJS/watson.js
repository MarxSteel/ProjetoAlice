var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: 'd90eca3c-7221-44de-a69c-1e724ae0cacf',
  password: 'T4tcixULhLEH',
  version: 'v1',
  version_date: '2016-09-20'
});

// Replace with the context obtained from the initial request
var context = {};

conversation.message({
  workspace_id: '08d7b1fd-f14a-4d97-a3f7-c907610d8014',
  input: {'text': 'sintomas dor de barriga caganeira febre'},
  context: context
},  function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});