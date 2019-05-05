## To run:


1. Git clone the repository.
2. cd /backend
3. create a file config.js
4. copy paste : 
	module.exports = {
	    DB_info : {
	        username:"",
	        password:""
	    },
	    secretKey:""
	}
5. create a DB in mysql with name expense_split
6. update username,password with your db information and update secretKey with any random string.
7. npm run dev
8. open localhost:4200