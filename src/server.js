const express = require('express');
const exphbs = require('express-handlebars');
const portfolio = require('./portfolio');

const app = express();

let myShares = '';
portfolio.getPortfolioUpdate()
                .then(allShares => myShares = allShares)
                .catch(error =>console.log(error)); 

let hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        tableBody: function () { 
            let output = '';
            Object.keys(myShares).forEach(symbol => {
                let initialTotalAmount = myShares[symbol].initialValue * myShares[symbol].quantity;
                let currentTotalAmount = myShares[symbol].regularMarketPrice * myShares[symbol].quantity;
                let difference = (currentTotalAmount - initialTotalAmount).toFixed(2);
                let percentage = (difference * 100 / initialTotalAmount).toFixed(1);
                output += `
                    <tr>
                        <td style="text-align:left">${myShares[symbol].shortName}</td>
                        <td>${initialTotalAmount.toFixed(2)}</td>
                        <td>${(difference < 0 ? '' : '+') + difference} (${(percentage < 0 ? '' : '+') + percentage}%)</td>
                    </tr>`
            })
            return output;
        },
        bar: function () { return 'BAR!'; }
    }
});

{/*
<tr>
  <td>Jill</td>
  <td>Smith</td>
  <td>50</td>
</tr>
<tr>
  <td>Eve</td>
  <td>Jackson</td>
  <td>94</td>
</tr> */}


app.use(express.static('public'));
app.set('port', process.env.PORT || 8081);

// Register handlebars view engine
app.engine('handlebars', hbs.engine);
// app.engine('handlebars', hbs({defaultLayout: 'main'}));
// Use handlebars view engine
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
    res.render('index');
});

// app.use(function(req,res){
// 	res.type('text/plain');
// 	res.status(404);
// 	res.send('404 - not found');
// });



app.listen(app.get('port'), function(){
	console.log( 'Express Server Started on http://localhost:8081');
});

// app.listen(8081, () => console.log('Listening on port 8081 ...'));
