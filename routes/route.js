var express = require('express');
var router = express.Router();
var user = require('../model/user');
var restaurant = require('../model/restaurant');
var menu = require('../model/menu');
var cart = require('../model/cart');
var history = require('../model/history');
var vendor = require('../model/vendor');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var authenticate = require('../middleware/auth');

var sess;


router.get('/', function (req, res, next) {
	return res.redirect('index');
});

router.get('/index', function (req, res, next) {    
	return res.render('index',{user:sess});
});

router.get('/faq', function (req, res, next) {
	return res.render('faq',{user:sess});
});

router.get('/contact_us', function (req, res, next) {
	return res.render('contact_us',{user:sess});
});

router.get('/about_us', function (req, res, next) {
	return res.render('about_us',{user:sess});
});

router.get('/sign_up', function (req, res, next) {
    var warning="";
	return res.render('sign_up',{warn:warning});
});

router.post("/sign_up",(req,res)=>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;
    var username = req.body.username;
    var password = req.body.password;

    bcrypt.hash(password, 10 , function(err, hashedpass){
        if(err)
        {
            res.json({
                error:err
            })
        }

        var data = new user({
            fname: fname,
            lname: lname,
            address: address,
            email: email,
            phone: phone,
            username: username,
            password : hashedpass
        });
    
        data.save(function(err, Person){
            if(err){
                console.log(err);
                var warning = "Username already Exist";
                res.render('sign_up',{warn:warning})
            }
            else
            {
                console.log('Successfully inserted');
                return res.redirect('/reg_success')
            }
        });
    });


    

});

router.get('/reg_success', function (req, res, next) {
	return res.render('registered_success');
});

router.post('/reg_success', function (req, res, next) {
	return res.redirect('/sign_in');
});


router.get('/sign_in', function (req, res, next) {
	return res.render('sign_in');
});

router.post('/sign_in', function (req, res, next) {
    try {
        var username = req.body.username;
        var password = req.body.password;

        user.findOne({username:username},function(err,data){
            if(data==null)
                {
                    res.send("invalid Credentials");
                }    
            else
            {
                bcrypt.compare(password, data.password, function(err,result){
                    if(err)
                    {
                        res.json({
                            error:err
                        })
                    }
                    if(result)
                    {
                        let token=jwt.sign({username:data.username},"Qsd4A587(-",{expiresIn: '0.1h'})
                        sess=req.session;
                        sess.userid=req.body.username;
                        console.log(req.session);
                        res.redirect("/index");
                        console.log(token);
                    }
                    else{
                        res.send("invalid credentials");
                    }
                })
            }        
            
        
            
        });
        
    } catch (error) {
        res.status(404).send("Invalid credentials");
    }

});

router.get('/home', authenticate, function(req, res, next){
    res.render("home");
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    sess=null;
    req.session = null;
    console.log(req.session);
    res.redirect('/index');
});

router.get('/profile', function (req, res, next) {
    var fname;
    var lname;
    var email;
    var phone;
    var address;
    user.findOne({username:sess.userid},function(err,data){
        if(err)
        {
            res.send("Something Wrong");
        }
        else
        {
            fname=data.fname;
            lname=data.lname;
            email=data.email;
            phone=data.phone;
            address=data.address;
            return res.render('profile',{fname:fname,lname:lname,email:email,phone:phone,address:address});

        }

    });
    
	//return res.render('profile',{fname:fname,lname:lname,email:email,phone:phone,address:address});
});


router.get('/profile_update', function (req, res, next) {
	return res.render('profile_update');
});

router.post('/profile_update', function (req, res, next) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;

    var updatedData = {
        fname: fname,
        lname: lname,
        address: address,
        email: email,
        phone: phone
    }

    user.findOne({username:sess.userid},function(err,data){
        if(err)
        {
            res.send("Something Wrong");
        }
        else
        {
            var id=data._id;
            user.findByIdAndUpdate(id,{$set: updatedData},function(err,docs){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("Profile Updated");
                }
            })

        }

    });

	return res.redirect('/profile');
});

router.post('/result', function (req, res, next) {
    var city=req.body.area;

    restaurant.find({restcity:city},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            return res.render('result',{user:sess, data:result});
        }
    })
	
});

router.post('/menupage', function (req, res, next) {
	var restname=req.body.Menu;

    menu.find({restname:restname},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            return res.render('menupage',{user:sess, data:result});
        }
    })

});
router.get('/cart', function (req, res, next) {
	var username=sess.userid;

    cart.find({username:username},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            return res.render('cart',{data:result});
        }
    })

});
router.post('/cart', function (req, res, next) {
    if(sess)
    {
        var username=sess.userid;
        var restname1;
        var item1=req.body.tocart;
        var price1;
        var quantity1=req.body.quantity;
        menu.find({item:item1},function(err,result){
            if(err)
            {
                console.log(err);
            }
            else
            {
                restname1=result[0].restname;
                price1=result[0].price;

                var data = new cart({
                    username: username,
                    restname: restname1,
                    item: item1,
                    price: price1,
                    quantity: quantity1
                });
            
                data.save(function(err, Person){
                    if(err)
                        console.log(err);
                    else
                        console.log('Successfully added to cart');
                });

                
            }

        })

    }
    else
    {
        res.redirect("/please_login");
    }
	//return res.redirect('/cart');
});

router.get('/please_login', function (req, res, next) {
	return res.render('please_login');
});


router.post('/remove', function (req, res, next) {
    var id=req.body.rem;
    cart.findOneAndRemove({_id:id},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Removed item from Cart successfully");
            return res.redirect('/cart');
        }
    })
	
});

router.get('/payment', function (req, res, next) {
	return res.render('payment');
});

router.get('/success', function (req, res, next) {
    if(sess)
    {
        cart.find({username:sess.userid},function(err,result){
            if(err)
            {
                console.log(err);
            }
            else
            {
                var i=0;
                var j=result.length;
                while(i<j)
                {
                    var data = new history({
                        username: sess.userid,
                        restname: result[i].restname,
                        item: result[i].item,
                        price: result[i].price,
                        quantity: result[i].quantity,
                        delivered:"No"
                    });
                
                    data.save(function(err, Person){
                        if(err)
                            console.log(err);
                        else
                            console.log('Successfully added to Order History');
                    });
                    i++;
                }   

                
            }

        })


        cart.deleteMany({username:sess.userid},function(err,result){
            if(err)
            {
                console.log(err);
            }
            else
            {
                return res.render('success');
            }
        })
	   
    }
});

router.get('/order_history', function (req, res, next) {
	var username=sess.userid;

    history.find({username:username},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            return res.render('order_history',{data:result});
        }
    })

});


router.get('/vendor_login', function (req, res, next) {
	return res.render('vendor_login');
});

router.post('/vendor_login', function (req, res, next) {
	try {
        var restname = req.body.username;
        var password = req.body.password;

        vendor.findOne({restname:restname},function(err,data){
            if(data==null)
                {
                    res.send("invalid Credentials");
                }    
            else
            {
                
                    if(password==data.password)
                    {
                        sess=req.session;
                        sess.userid=req.body.username;
                        console.log(req.session);
                        res.redirect("/vendor_order");
                    }
                    else{
                        res.send("invalid credentials");
                    }
                
            }        
            
        
            
        });
        
    } catch (error) {
        res.status(404).send("Invalid credentials");
    }
});

router.get('/vendor_order', function (req, res, next) {
	var username=sess.userid;

    history.find({restname:username},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            return res.render('vendor_order',{data:result,restid:sess.userid});
        }
    })
});

router.post('/deliver', function (req, res, next) {
    var id=req.body.del;
    history.findOneAndUpdate({_id:id},{delivered:"Yes"}, null, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            return res.redirect('/vendor_order');
        }
    });
	
});


router.post('/usercheck', function (req, res, next) {
    if(sess)
    {
        var username=req.body.tocheck;
        var fname;
        var lname;
        var email;
        var phone;
        var address;
        user.findOne({username:username},function(err,data){
            if(err)
            {
                console.log(err);
            }
            else
            {
                fname=data.fname;
                lname=data.lname;
                email=data.email;
                phone=data.phone;
                address=data.address;
                return res.render('usercheck',{user:username,fname:fname,lname:lname,email:email,phone:phone,address:address,restid:sess.userid});

            }

        })

    }
    else
    {
        res.redirect("/please_login");
    }
});


module.exports = router;