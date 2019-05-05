## To run:


1. Git clone the repository.
2. cd /frontend from terminal and run **npm install**
3. cd ..
4. cd /backend from terminal and run **npm install**.
5. create a file config.js in /backend directory
6. copy paste : 
	```
	module.exports = {
	    DB_info : {
	        username:"",
	        password:""
	    },
	    secretKey:""
	}
	```
7. create a DB in mysql with name expense_split
8. update username,password with your db information and update secretKey with any random string.
9. npm run dev
10. open localhost:4200
