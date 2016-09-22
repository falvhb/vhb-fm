var fs = require('fs');
var beautify_html = require('js-beautify').html;
var Freemarker = require('freemarker.js');
var express = require('express');
var app = express();

var fm = new Freemarker({
  //viewRoot: __dirname + '/template',
  viewRoot: __dirname + '/template',
  options: {
    /** for fmpp */
  }
});


var CONFIG = {
    templates: ['index', 'article'],
    folderDest: './out/'
};

function renderAllToFolder(options){

    console.log('Starting rendering...');

    options.templates.forEach(function(name){
        var template = {
            templateName: name + '.ftl',
            targetName: name + '.html',
            data: require('./template/' + name + '.json')
        };

        fm.render(template.templateName, template.data, function(err, html, output) {
            console.log(template.templateName + '> ' + html.length + 'chars');
            fs.writeFile(options.folderDest + template.targetName, beautify_html(html), function(err) {
                if (err) throw err;
                console.log('OK');
            });    
        });    
    });

    console.log('... done!');
}

//renderAllToFolder(CONFIG);


app.get('/', function (req, res) {
 

    var name = 'index';

    var template = {
        templateName: name + '.ftl',
        targetName: name + '.html',
        data: require('./template/' + name + '.json')
    };

    fm.render(template.templateName, template.data, function(err, html, output) {
        console.log(template.templateName + '> ' + html.length + 'chars');
        if (err){
            res.send(err);
        } else {
            res.send(beautify_html(html));
        }
        
    });    

});

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!');
});