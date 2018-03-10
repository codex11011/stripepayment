
var express = require("express");
var stripe = require("stripe")("secret key");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine","ejs");
app.set("views",__dirname+'/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


app.get("/",function(req,res){
	res.render('index',{

	});
});

app.get("/paysuccess",function(req,res){
	res.render('paysuccess',{
		
	});
});

app.post("/charge",function(req,res){

	var token = req.body.stripeToken;
	var chargeAmount = req.body.AmountCharged;
	//console.log(req);
	stripe.customers.create({
        email: req.body.stripeEmail, // customer email, which user need to enter while making payment
         // token for the given card 
    }).then(function(customer){
	var charge = stripe.charges.create({
		amount:chargeAmount,
		currency:"usd",
		source:token
	},function(err,charge){
		if(err){
			console.log("your card was declined: "+err);
		}
			
	});
	console.log('your payment was successful');
	console.log(req.body);
	res.redirect("/paysuccess");
});

});


app.listen(3000,function(){
	console.log("server started");
});