var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";		

		ccData = {"data":[{"item":{"name":"Flying Fish - LON-007 - Common - 1st Edition","condition":"Near Mint (2) $0.29","qty":"1","price":"0.29","discount":"0.00","sub":"0.29","productID":"https://alvarandhurriks-admin.crystalcommerce.com/products/75411/activity_log","orderID":"10003"}},{"item":{"name":"Flying \"C\" - JOTL-EN039 - Common - 1st Edition","condition":"Near Mint (2) $0.65","qty":"1","price":"0.65","discount":"0.00","sub":"0.65","productID":"https://alvarandhurriks-admin.crystalcommerce.com/products/1124383/activity_log","orderID":"10003"}},{"item":{"name":"Chimera the Flying Mythical Beast - YGLD-ENB41 - Common - 1st Edition","condition":"Near Mint (2) $0.23","qty":"1","price":"0.23","discount":"0.00","sub":"0.23","productID":"https://alvarandhurriks-admin.crystalcommerce.com/products/1134013/activity_log","orderID":"10003"}},{"order":{"orderID":"10003","cash":"","card":"$1.17","account":"","check":"","name":"Barrett Routon","email":"barrettrouton@gmail.com","phone":"3184811423","balance":"0.00","customerID":"73"}}]}
			MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var dbo = db.db("fcc");
				for (item in ccData.data){
					dbo.collection(Object.keys(ccData.data[item])[0]).insertOne({name: "Big Wave Small Wave - DR3-EN046 - Common - Unlimited Edition", condition: "Near Mint (2) $0.32", qty: "1", price: "0.32", discount: "0.00"}, function(err, res) {  
						if (err) throw err;
						console.log("1 document inserted");
					});
				}
				db.close();
			  });