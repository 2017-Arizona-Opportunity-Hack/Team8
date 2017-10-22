from flask import Flask, session, redirect, url_for, escape, request, render_template
from pymongo import MongoClient
import datetime
app = Flask(__name__)
 
 

def connect_to_db():
    # CreatePyMongoConnection
    client = MongoClient("ds227865.mlab.com", 27865)
    db = client['sunshinedb']
    db.authenticate('admin', 'sunshine123')
    return db,client



@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    db,client = connect_to_db()
    datelist = db.users.find_one({'username': username}, {'timestamp':1})['timestamp']
    datelist = reversed(datelist)
    print datelist
    client.close()
    return render_template('userprofile.html', name=username, datelist = datelist)


@app.route('/', methods = ["GET","POST"])
@app.route('/login', methods = ['GET', 'POST'])
def login():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']
		db,client = connect_to_db()
		dict = db.admin.find_one({'username': username}, {'username':1, 'password': 1})
		if dict:
			if dict['password'] == password:
				#session['username'] = request.form['username']
				update_dict = {}
				timestamp= datetime.datetime.now()
				#db.users.update_many({},{'$set':{'logged_in': False}})
				#db.users.find_one_and_update({'username': username},{'$push':{'timestamp': timestamp}, '$set':{'logged_in': True}})
				client.close()
				return redirect(url_for('show_user_profile', username=username))			
		else:
			client.close()
			return "No such username registered with the website"
	else:
		return render_template('index.html') 


@app.route('/parentlogin', methods = ['POST'])
def parentlogin():
	if request.method == 'POST':
		username = request.form['username']
		password = request.form['password']
		db,client = connect_to_db()
		dict = db.Parents.find_one({'username': username}, {'username':1, 'password': 1})
		if dict:
			if dict['password'] == password:
				#session['username'] = request.form['username']
				update_dict = {}
				timestamp= datetime.datetime.now()
				db.Parents.update_many({},{'$set':{'logged_in': False}})
				db.Parents.find_one_and_update({'username': username},{'$push':{'timestamp': timestamp}, '$set':{'logged_in': True}})
				client.close()
				return redirect(url_for('show_user_profile', username=username))
		else:
			client.close()
			return "No such House Parent registered with the website"
	else:
		return "Only POST request allowed"

		
@app.route('/logout', methods = ["POST"])
def logout():
   # remove the username from the session if it is there
   if request.method == 'POST':
		db,client = connect_to_db()
		#session.pop('username', None)
		print request.form['username']
		db.admin.find_one_and_update({'username': request.form['username']},{'$set':{'logged_in': False}})
		client.close()
		return "logged out"

#mobile app function
@app.route('/parentlogout', methods=["POST"])
def parentlogout():
   # remove the username from the session if it is there

   if request.method == 'POST':
	   db, client = connect_to_db()
	   # session.pop('username', None)
	   print request.form['username']
	   db.Parent.find_one_and_update({'username': request.form['username']}, {'$set': {'logged_in': False}})
	   client.close()
	   return "logged out"


#mobileapp api
@app.route('/getallhouses', methods = ["POST"])
def getAllHouses():
	if request.method == 'POST':
		username = request.form["username"]
		db,client = connect_to_db()
		house_ids = db.Parents.find({"username":username},{'house_id'})
		all_houses = []
		for house_id in house_ids:
			all_houses.extend(db.houses.find({'house_id'},{'name', 'house_id'}))
		client.close()
		return all_houses
	return None

#mobileapp api
@app.route('/getchildren', methods = ["POST"])
def getAllChildren():
	if request.method == 'POST':
		house_id = request.form['house_id']
		db,client = connect_to_db()
		all_children = db.children.find({'house_id': house_id})
		client.close()
		return all_children
	return None

@app.route('/getMedicationDetails', methods = ["POST"])
def getMedicationDetails():
	if request.method == 'POST':
		child_id = request.form['child_id']
		db,client = connect_to_db()
		med_details = db.MedicineSchedule.find({'child_id': child_id,'AdministrationTime':{'$gte': datetime.datetime.now().replace(hour=0,minute =0, second = 0,  microsecond =0), '$lte':(datetime.datetime.now()+datetime.timedelta(days=1)).replace(hour=0, second=0, minute = 0,  microsecond=0)}})
		client.close()
		return med_details
	return None
@app.route('/logMedicineGiven', methods = ["POST"])
def logMedicineGiven():
	if request.method == 'POST':
		sched_id = request.form['schedule_id']
		db, client = connect_to_db()
		med_details = db.MedicineSchedule.findAndModify({'_id': sched_id},{'$set':{'done':True}})
		client.close()
		return True
	return False


def createChildren():
	if request.method == 'POST':
		if all(k in request.form for k in [first_name, last_name]):
			fname = request.form['first_name']
			lname = request.form['first_name']
			if request.form['house_id']:
				house_id = request.form['house_id']
			if request.form['medications']:
				for medications in medications:
				medications = request.form['house_id']
		db,client = connect_to_db()
		all_children = db.children.find({'house_id': house_id})
		client.close()
		return all_children
	return None


@app.route('/visualizations', methods = ["GET"])
def getVisualizations():
	print "Inside visualizations"
	return render_template('visualizations.html')



if __name__ == '__main__':
	app.run(debug=True)
