from flask import Flask, session, redirect, url_for, escape, request, render_template, jsonify
from pymongo import MongoClient
import datetime
import json
from bson import ObjectId
from bson.json_util import dumps
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
 

def connect_to_db():
    # CreatePyMongoConnection
    client = MongoClient("ds227865.mlab.com", 27865)
    db = client['sunshinedb']
    db.authenticate('admin', 'sunshine123')
    return db, client


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

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
                # update_dict = {}
                timestamp= datetime.datetime.now()
                db.users.update_many({},{'$set':{'logged_in': False}})
                db.users.find_one_and_update({'username': username},{'$push':{'timestamp': timestamp}, '$set':{'logged_in': True}})
                client.close()
                return redirect(url_for('show_user_profile', username=username))
        else:
            client.close()
            return "No such admin registered with the website"
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
                #timestamp= datetime.datetime.now()
                db.Parents.update_many({},{'$set':{'logged_in': False}})
                db.Parents.find_one_and_update({'username': username},{'$set':{'logged_in': True}})
                client.close()
                return "true"
            else:
                return "false"
        else:
            client.close()
            return "false"
    else:
        return "false"

		
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
        house_ids = db.Parents.find({"username":username},{'_id':0,'house_id':1})
        all_houses = []
        house_ids = house_ids[0]['house_id']
        for hid in house_ids:
            all_houses.extend(db.Houses.find({'house_id': hid},{'_id':0,'name':1, 'house_id':1}))
        client.close()
        print all_houses
        return jsonify(all_houses)
    return None

#mobileapp api
@app.route('/getchildren', methods = ["POST"])
def getAllChildren():
    if request.method == 'POST':
        house_id = int(request.form['house_id'])
        print type(house_id)
        db,client = connect_to_db()
        all_children = db.Children.find({'house_id': house_id},{'_id':0,"child_id":1, "first_name":1, "last_name":1, "toggle_inhouse":1})
        list1=[]
        for c in all_children:
            list1.append(c)
        print list1
        client.close()
        return jsonify(list1)
    return None

@app.route('/getMedicationDetails', methods = ["POST"])
def getMedicationDetails():
    if request.method == 'POST':
        child_id = int(request.form['child_id'])
        db,client = connect_to_db()
        med_details = db.MedicineSchedule.find({'child_id': child_id,'AdministrationTime':{'$gte': datetime.datetime.now().replace(hour=0,minute =0, second = 0,  microsecond =0), '$lte':(datetime.datetime.now()+datetime.timedelta(days=1)).replace(hour=0, second=0, minute = 0,  microsecond=0)}})
        list1 = []
        for c in med_details:
            list1.append(c)
        client.close()
        print list1
        return dumps(list1)
    return None

@app.route('/logMedicineGiven', methods = ["POST"])
def logMedicineGiven():
    if request.method == 'POST':
        sched_id = request.form['schedule_id']
        print sched_id
        print type(sched_id)
        db, client = connect_to_db()
        med_details = db.MedicineSchedule.find_and_modify({'_id': ObjectId(sched_id)},{'$set':{'done':True}})
        client.close()
        return "True"
    return "False"

@app.route('/addachild', methods = ["POST"])
@cross_origin()
def createChildren():
    if request.method == 'POST':
        child_obj = {}
        if all(k in request.form for k in ['first_name', 'last_name']):
            child_obj['first_name'] = request.form['first_name']
            child_obj['last_name'] = request.form['last_name']
            if request.form['house_id']:
                child_obj['house_id'] = request.form['house_id']
            all_medications = []
            if request.form['medications']:
                for medications in request.form['medications']:
                    all_medications.append(medications)
        child_obj['medications'] = all_medications
        db,client = connect_to_db()
        db.Children.insert_one(child_obj)
        client.close()
        return "true"
    return None

@app.route('/updatechild', methods = ["POST"])
@cross_origin()
def updateChild():
    if request.method == 'POST':
        db, client = connect_to_db()
        dbChildObj = db.Children.find({"first_name":request.form['first_name'],"last_name": request.form['last_name']})[0]
        for key,value in request.form:
            if key not in dbChildObj:
                dbChildObj[key] = value
        if request.form['medications']:
            for med in request.form['medications']:
                if med in dbChildObj['medications']:
                    dbChildObj['medications'] = med

        db.Children.find_one_and_replace({"first_name":request.form['first_name'],"last_name": request.form['last_name']},dbChildObj)
        client.close()
        return "true"
    return False

@app.route('/deletechild', methods = ["POST"])
@cross_origin()
def deleteChild():
    try:
        if request.method == 'POST':
            db, client = connect_to_db()
            db.Children.deleteOne({"first_name":request.form['first_name'],"last_name": request.form['last_name']})
            return "true"
        else:
            return "false"
    except:
        pass

@app.route('/displayallchildren', methods = ["GET"])
@cross_origin()
def displayAllChildren():
    if request.method == 'GET':
        db,client = connect_to_db()
        all_children = db.Children.find({},{'_id':0,"first_name":1, "last_name":1, "house_id":1})
        list1=[]
        for c in all_children:
            house_name = db.Houses.find({"house_id":c["house_id"]},{"_id":0,"name":1})[0]['name']
            c['house_name'] = house_name
            list1.append(c)
        print list1
        client.close()
        return jsonify(list1)
    return None


@app.route('/displayallparents', methods = ["GET"])
@cross_origin()
def displayAllParents():
    if request.method == 'GET':
        db,client = connect_to_db()
        all_parents = db.Parents.find({},{'_id':0,"first_name":1, "last_name":1, "house_id":1})
        list1=[]
        for c in all_parents:
            for hid in c['house_id']:
                house_name = db.Houses.find({"house_id":hid},{"_id":0,"name":1})[0]['name']
                if 'house_name' in c:
                    c['house_name'].append(house_name)
                else:
                    c['house_name']=[house_name]
            list1.append(c)
        print list1
        client.close()
        return jsonify(list1)
    return None

#parent crud
@app.route('/addParent', methods = ["POST"])
@cross_origin()
def addParent():
    if request.method == 'POST':
        firstname = request.form['parentFirstName']
        lastname = request.form['parentLastName']
        username = request.form['parentUsername']
        password = request.form['parentPassword']
        email = request.form['parentEmail']
        phone = request.form['parentPhone']
        house = request.form['parentHouse']

        db, client = connect_to_db()

        db.parent.insert({"first_name":firstname,"last_name": lastname,"username": username,"password": password,"email": email,"house_id": house,"phone": phone})
        client.close()
        return "True"
    return "False"

@app.route('/editParent', methods = ["POST"])
@cross_origin()
def editParent():
    if request.method == 'POST':
        firstname = request.form['parentFirstName']
        lastname = request.form['parentLastName']
        username = request.form['parentUsername']
        password = request.form['parentPassword']
        email = request.form['parentEmail']
        phone = request.form['parentPhone']
        house = request.form['parentHouse']
        db, client = connect_to_db()

        db.parent.remove({"username":username})
        db.parent.insert(
            {"first_name": firstname, "last_name": lastname, "username": username, "password": password, "email": email,
             "house_id": house, "phone": phone})
        client.close()
        return "True"
    return "False"


@app.route('/deleteParent', methods = ["POST"])
@cross_origin()
def deleteParent():
    if request.method == 'POST':
        username = request.form['parentUserName']
        db, client = connect_to_db()

        db.parent.remove({"username": username})
        db.close()
        return "True"
    return "False"

#mobileapp toggle
@app.route('/togglechild', methods = ["POST"])
def togglechild():
    if request.method == 'POST':
        child_id = int(request.form['child_id'])
        db, client = connect_to_db()

        toggle_child = db.Children.find({"child_id":child_id },{"_id":0,"toggle_inhouse":1})[0]

        toggle_child['toggle_inhouse'] = not(toggle_child['toggle_inhouse'])
        db.Children.find_one_and_update({"child_id":child_id },{'$set':{'toggle_inhouse':toggle_child['toggle_inhouse'] }})
        client.close()
        return "True"
    return "False"

@app.route('/addHouse', methods = ["POST"])
@cross_origin()
def addHouse():
    if request.method == 'POST':
        name = request.form['house_name']
        address = request.form['address']
        db, client = connect_to_db()
        max_id = db.Houses.find().sort([('house_id', -1)]).limit(1)[0]["house_id"]
        print max_id
        db.Houses.insert({"name":name,"address": address,"house_id":max_id+1})
        client.close()
        return "True"
    return "False"

@app.route('/displayallhouses', methods = ["GET"])
@cross_origin()
def displayallHouses():
    if request.method == 'GET':
        db, client = connect_to_db()
        houses = db.Houses.find({},{'house_id':1,"name":1, "_id":0})
        list1 = []
        for c in houses:
            list1.append(c)
        print list1
        client.close()
        return jsonify(list1)
    return None

if __name__ == '__main__':
    app.run(debug=True)
