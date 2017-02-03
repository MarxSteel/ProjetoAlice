var express    = require('express'); 
var app        = express();
var bodyParser = require('body-parser');


var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: 'd90eca3c-7221-44de-a69c-1e724ae0cacf',
  password: 'T4tcixULhLEH',
  version: 'v1',
  version_date: '2016-09-20'
});

var context = {};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {

    conversation.message({
        workspace_id: '08d7b1fd-f14a-4d97-a3f7-c907610d8014',
        input: {'text': 'sintomas dor de barriga caganeira febre'},
        context: context
        },  function(err, response) {
        if (err) {
            console.log('error:', err);
        }
        else {
            console.log(JSON.stringify(response, null, 2));
            var json = JSON.parse(JSON.stringify(response, null, 2));
            //console.log(aaa);
            res.json({ message: json.output.text });   
            //res.json(aaa);
        }

    });

    //res.json({ message: 'Alice!' });   
});

router.get('/teste/:json', function(req, res) {
    var json = JSON.parse(req.params.json);
    res.json({ message: json.aaa });
});

app.use('/api', router);

app.listen(port);
console.log('Ligando a Alice na porta: ' + port);