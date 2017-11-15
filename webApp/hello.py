from flask import Flask, session, redirect, url_for, escape, request, render_template, jsonify
from pymongo import MongoClient
import datetime
import json
from bson import ObjectId
from bson.json_util import dumps
from flask_cors import CORS, cross_origin
from medSched import createMedSchedule
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
# @app.route('/getallhouses', methods = ["POST"])
# def getAllHouses():
#     if request.method == 'POST':
#         username = request.form["username"]
#         db,client = connect_to_db()
#         house_ids = db.Parents.find({"username":username},{'_id':0,'house_id':1})
#         all_houses = []
#         house_ids = house_ids[0]['house_id']
#         for hid in house_ids:
#             all_houses.extend(db.Houses.find({'house_id': hid},{'_id':0,'name':1, 'house_id':1}))
#         client.close()
#         print all_houses
#         return jsonify(all_houses)
#     return None

#mobileapp api
# @app.route('/getchildren', methods = ["POST"])
# def getAllChildren():
#     if request.method == 'POST':
#         house_id = int(request.form['house_id'])
#         print type(house_id)
#         db,client = connect_to_db()
#         all_children = db.Children.find({'house_id': house_id},{'_id':0,"child_id":1, "first_name":1, "last_name":1, "toggle_inhouse":1})
#         list1=[]
#         for c in all_children:
#             list1.append(c)
#         print list1
#         client.close()
#         return jsonify(list1)
#     return None

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
        print request.data
        child_obj = {}
        if all(k in request.form for k in ['first_name', 'last_name']):
            child_obj['first_name'] = request.form['first_name']
            child_obj['last_name'] = request.form['last_name']
            if 'house_id' in request.form:
                child_obj['house_id'] = request.form['house_id']
            all_medications = []
            if 'medications' in request.form:
                print "IN here"
                print request.form["medications"]
                for medications in request.form['medications']:
                    dd = {}
                    print "got till 185"
                    for dicts in medications["dosage_time"]:
                        for kk,vv in dicts.items():
                            dd[kk] = vv
                            print "got till 188"
                    medications["dosage_time"] = dd
                    all_medications.append(medications)
        child_obj['medications'] = all_medications
        db,client = connect_to_db()
        max_id = db.Children.find().sort([('child_id', -1)]).limit(1)[0]["child_id"]
        child_obj["child_id"] = max_id
        db.Children.insert_one(child_obj)
        client.close()
        return "true"
    return "false"

@app.route('/addChild',methods = ["POST"])
@cross_origin()
def addChild():
    db, client = connect_to_db()
    try:
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        age = int(request.form['age'])
        house_id = request.form['house_id']

        child = db.Children.find_one({'first_name':firstname,'last_name':lastname,'age':int(age),'house_id':house_id})
        if not child:
            _id = db.Children.insert({'first_name':firstname,'last_name':lastname,'age':int(age),'house_id':house_id})
            client.close()
            return jsonify({'success':1,'errorMessage':'','child':{'first_name':firstname,'last_name':lastname,'age':int(age),'house_id':house_id,'_id':str(_id)}})
        else:
            client.close()
            return jsonify({'success':0,'errorMessage':'already exists'})    
    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})



@app.route('/updateChild', methods = ["POST"])
@cross_origin()
def updateChild():
    db, client = connect_to_db()
    try:
        _id = request.form['_id']
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        age = int(request.form['age'])
        house_id = request.form['house_id']

        db.Children.find_one_and_update({'_id': ObjectId(_id)}, {"$set":{'first_name':firstname,'last_name':lastname,'age':int(age),'house_id':house_id}}, upsert=False)
        client.close()
        return jsonify({'success':1,'errorMessage':''})    
    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})
    

@app.route('/deletechild', methods = ["POST"])
@cross_origin()
def deleteChild():
    db, client = connect_to_db()
    try:
        _id = request.form['_id']
        db.Children.delete_one({"_id": ObjectId(_id)})
        client.close()
        return jsonify({'success':1,'errorMessage':''})
    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/getAllChildren', methods = ["GET"])
@cross_origin()
def getAllChildren():
    db, client = connect_to_db()
    try:
        children = db.Children.find()
        all_children = []
        for child in children:
            child_object={
            "_id":str(child['_id']),
            "firstname":child['first_name'],
            "lastname":child['last_name'],
            "age":child['age'],
            "house_id":child['house_id']
            }

            all_children.append(child_object)

        client.close()
        return jsonify({'all_children':all_children,'success':1,'errorMessage':''})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"error"})

@app.route('/getAllChildrenForHouse', methods = ["POST"])
@cross_origin()
def getAllChildrenForHouse():
    db, client = connect_to_db()
    try:
        house_id = request.form['house_id']
        children = db.Children.find({'house_id':house_id})
        all_children = []
        for child in children:
            child_object={
            "_id":str(child['_id']),
            "firstname":child['first_name'],
            "lastname":child['last_name'],
            "age":child['age'],
            "house_id":child['house_id']
            }

            all_children.append(child_object)

        client.close()
        return jsonify({'all_children':all_children,'success':1,'errorMessage':''})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"error"})

@app.route('/addMedicine',methods=["POST"])
@cross_origin()
def addMedicine():
    db,client = connect_to_db()
    try:
        name=request.form['name']
        reason = request.form['reason']
        instructions = request.form['instructions']
        pre_date = request.form['pre_date']
        physician_name = request.form['phy_name']
        physician_num = request.form['phy_num']
        days = request.form['days'].split(',')
        child_id=request.form['child_id']
        dosage = request.form['dosage'].split(',')
        dosage_time = request.form['dosage_time'].split(',')

        dose_time_list = []

        for i in range(len(dosage)):
            dose_time_list.append({"dose":dosage[i],"time":dosage_time[i]})

        _id = db.Medicines.insert({'name':name,'reason':reason,'instructions':instructions,'pre_date':pre_date,'physician_name':physician_name,'physician_num':physician_num,'days':days,'child_id':child_id,'dose_time':dose_time_list})

        client.close()
        return jsonify({'success':1,'errorMessage':'','_id':str(_id)})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/updateMedicine',methods=["POST"])
@cross_origin()
def updateMedicine():
    db,client = connect_to_db()
    try:
        _id = request.form['_id']
        name=request.form['name']
        reason = request.form['reason']
        instructions = request.form['instructions']
        pre_date = request.form['pre_date']
        physician_name = request.form['phy_name']
        physician_num = request.form['phy_num']
        days = request.form['days'].split(',')
        child_id=request.form['child_id']
        dosage = request.form['dosage'].split(',')
        dosage_time = request.form['dosage_time'].split(',')

        dose_time_list = []

        for i in range(len(dosage)):
            dose_time_list.append({"dose":dosage[i],"time":dosage_time[i]})

        db.Medicines.find_one_and_update({'_id':ObjectId(_id)},{'$set':{'name':name,'reason':reason,'instructions':instructions,'pre_date':pre_date,'physician_name':physician_name,'physician_num':physician_num,'days':days,'child_id':child_id,'dose_time':dose_time_list}},upsert=False)

        client.close()
        return jsonify({'success':1,'errorMessage':''})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/deleteMedicine',methods=["POST"])
@cross_origin()
def deleteMedicine():
    db,client =connect_to_db()
    try:
        _id = request.form['_id']
        db.Medicines.delete_one({'_id':ObjectId(_id)})
        client.close()
        return jsonify({'success':1,'errorMessage':''})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/addSpecialMedicine',methods=["POST"])
@cross_origin()
def addSpecialMedicine():
    db,client = connect_to_db()
    try:
        name=request.form['name']
        reason = request.form['reason']
        instructions = request.form['instructions']
        pre_date = request.form['pre_date']
        physician_name = request.form['phy_name']
        physician_num = request.form['phy_num']
        child_id=request.form['child_id']
        dosage = request.form['dosage']


        _id = db.SpecialMedicines.insert({'name':name,'reason':reason,'instructions':instructions,'pre_date':pre_date,'physician_name':physician_name,'physician_num':physician_num,'child_id':child_id,'dosage':dosage})

        client.close()
        return jsonify({'success':1,'errorMessage':'','_id':str(_id)})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/updateSpecialMedicine',methods=["POST"])
@cross_origin()
def updateSpecialMedicine():
    db,client = connect_to_db()
    try:
        _id = request.form['_id']
        name=request.form['name']
        reason = request.form['reason']
        instructions = request.form['instructions']
        pre_date = request.form['pre_date']
        physician_name = request.form['phy_name']
        physician_num = request.form['phy_num']
        child_id=request.form['child_id']
        dosage = request.form['dosage']


        db.SpecialMedicines.find_one_and_update({'_id':ObjectId(_id)},{'$set':{'name':name,'reason':reason,'instructions':instructions,'pre_date':pre_date,'physician_name':physician_name,'physician_num':physician_num,'child_id':child_id,'dosage':dosage}})

        client.close()
        return jsonify({'success':1,'errorMessage':''})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/deleteSpecialMedicine',methods=["POST"])
@cross_origin()
def deleteSpecialMedicine():
    db,client =connect_to_db()
    try:
        _id = request.form['_id']
        db.SpecialMedicines.delete_one({'_id':ObjectId(_id)})
        client.close()
        return jsonify({'success':1,'errorMessage':''})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})


@app.route('/getAllParents', methods = ["GET"])
@cross_origin()
def displayAllParents():
    db, client = connect_to_db()
    try:
        parents = db.Parents.find()
        all_parents = []
        for parent in parents:
            parent_object={
            "_id":str(parent['_id']),
            "firstname":parent['first_name'],
            "lastname":parent['last_name'],
            "phone":parent['phone'],
            "email":parent['email'],
            'password':str(parent['password']),
            "house_id":parent['house_id']
            }

            all_parents.append(parent_object)

        client.close()
        return jsonify({'all_parents':all_parents,'success':1,'errorMessage':''})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"error"})

#parent crud
@app.route('/addParent', methods = ["POST"])
@cross_origin()
def addParent():
    db, client = connect_to_db()
    print len(request.form)  
    try:
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        password = request.form['password']
        email = request.form['email']
        phone = request.form['phone']
        houses = request.form['houses'].split(',')

        print firstname,lastname,password,email,phone,houses

        parent = db.Parents.find_one({"email":email})
        if not parent:
            _id = db.Parents.insert({"first_name":firstname,"last_name": lastname,"password": str(password),"email": email,"house_id": houses,"phone": phone})
            client.close()
            return jsonify({'success':1,'errorMessage':'','parent':{"first_name":firstname,"last_name": lastname,"password": str(password),"email": email,"house_id": houses,"phone": phone,'_id':str(_id)}})

        else:
            return jsonify({'success':0,'errorMessage':'already exists'})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/updateParent', methods = ["POST"])
@cross_origin()
def editParent():
    db, client = connect_to_db()
    try:
        _id = request.form["_id"]
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        password = request.form['password']
        email = request.form['email']
        phone = request.form['phone']
        houses = request.form['houses'].split(",")
        db.Parents.find_one_and_update({'_id': ObjectId(_id)}, {"$set":{"first_name":firstname,"last_name": lastname,"password": str(password),"email": email,"house_id": houses,"phone": phone}}, upsert=False)
        client.close()
        return jsonify({'success':1,'errorMessage':''})
    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})


@app.route('/deleteParent', methods = ["POST"])
@cross_origin()
def deleteParent():
    db, client = connect_to_db()
    try:
        _id = request.form['_id']
        db.Parents.delete_one({"_id": ObjectId(_id)})
        client.close()
        return jsonify({'success':1,'errorMessage':''})
    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})


@app.route('/getAllHousesForParent', methods = ["POST"])
@cross_origin()
def getAllHousesForParent():
    db, client = connect_to_db()
    try:
        _id = request.form['_id']
        parent = db.Parents.find_one({'_id':ObjectId(_id)})
        parent_houses_id = parent['house_id']   
        all_houses = [] 
        for i in range(len(parent_houses_id)):
            house = db.Houses.find_one({'_id':ObjectId(parent_houses_id[i])})
            house_object={
            "house_id":house['house_id'],
            "name":house['name'],
            "address":house['address'],
            "_id":str(house['_id'])
            }
            all_houses.append(house_object)
        client.close()
        return jsonify({'all_houses':all_houses,'success':1,'errorMessage':''})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"error"})



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
        createMedSchedule()
        return "True"
    return "False"

@app.route('/addHouse', methods = ["POST"])
@cross_origin()
def addHouse():

    db, client = connect_to_db()
    try:
        name = request.form['house_name']
        address = request.form['address']

        house = db.Houses.find_one({"name":name})       
        if not house:
            max_id = db.Houses.find().sort([('house_id', -1)]).limit(1)[0]["house_id"]
            _id = db.Houses.insert({"name":name,"address": address,"house_id":max_id+1})
            returnObject = {"success":1,"errorMessage":"",'_id':str(_id)}
            client.close()
            return jsonify(returnObject)
        else:
            returnObject = {"success":0,"errorMessage":"already exists"}
            client.close()
            return jsonify(returnObject)

    except Exception as e:
        print e


    client.close()
    return jsonify({"success":0,"errorMessage":"error"})


@app.route('/getAllHouses', methods = ["GET"])
@cross_origin()
def getAllHouses():
    db, client = connect_to_db()
    try:
        houses = db.Houses.find()
        all_houses = []
        for house in houses:
            house_object={
            "house_id":house['house_id'],
            "name":house['name'],
            "address":house['address'],
            "_id":str(house['_id'])
            }

            all_houses.append(house_object)
        client.close()
        return jsonify({'all_houses':all_houses,'success':1,'errorMessage':''})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"error"})

@app.route('/deleteHouse', methods = ["POST"])
@cross_origin()
def deleteHouse():
    db, client = connect_to_db()

    try:
        _id = request.form['_id']
        child = db.Children.find_one({"house_id":_id})
        parent = db.Parents.find_one({"house_id":_id})
        if not child or not parent:
            db.Houses.delete_one({"_id": ObjectId(_id)})
            client.close()
            return jsonify({"success":1,"errorMessage":""})
        else:
            client.close()
            return jsonify({"success":0,"errorMessage":"existing associations"})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"error"})


@app.route('/deleteHouseConfirm', methods = ["POST"])
@cross_origin()
def deleteHouseConfirm():
    db, client = connect_to_db()

    try:
        _id = request.form['_id']

        child = db.Children.find_one({"house_id":_id})
        parent = db.Parents.find_one({"house_id":_id})

        if child:
            print "Yes"
            db.Children.update_many({"house_id":_id},{'$set':{'house_id':''}})
        if parent:
            print "No"
            parents =   db.Parents.find({"house_id":_id})
            for parent in parents:
                list_house = parent['house_id']
                list_house.remove(_id)
                db.Parents.find_one_and_update({'_id':parent['_id']},{'$set':{'house_id':list_house,'password':1234}})

       
        db.Houses.delete_one({"_id": ObjectId(_id)})
        client.close()
        return jsonify({"success":1,"errorMessage":""})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"error"})




@app.route('/updateHouse', methods = ["POST"])
@cross_origin()
def updateHouse():
    db, client = connect_to_db()
    try:
        name = request.form['house_name']
        address = request.form['address']
        _id = request.form['_id']
        db.Houses.find_one_and_update({'_id': ObjectId(_id)}, {"$set":{"name":name,"address":address}}, upsert=False)
        client.close()
        return jsonify({"success":1,"errorMessage":""})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"need post request"})

@app.route('/getSchedule', methods = ["POST"])
@cross_origin()
def getMedSchedule():
    if request.method == 'POST':
        start_date = datetime.datetime(2017, 6, 9, 11, 13, 3, 57000)
        end_date = datetime.datetime.now()
        db, client = connect_to_db()
        medschedule = db.MedicineSchedule.find({'AdministrationTime':{'$gte': start_date, '$lte':end_date}},{"_id":0})
        list1 = []
        for i in medschedule:
            print i
            list1.append(i)
        client.close()
        import csv
        with open('some.csv', 'wb') as f:
            writer = csv.writer(f)
            headings = ['Child Name',
                        "Physician Name",
                        "Physician Contact No",
                        "Medicine Name",
                        "Reason for medicine",
                        "Prescribed date",
                        "Dosage",
                        "Date Given",
                        "Time Given",
                        "House Visit"
                        ]
            writer.writerow(headings)

            for dict in list1:
                name = dict['first_name']+" "+dict["last_name"]
                physician = dict["physician"]
                physician_phone_no = dict["physician_phone_no"]
                med_name = dict["med_name"]
                reason = dict["reason"]
                prescribed_date = dict["prescribed_date"]
                Dosage = dict["Dosage"]
                dategiven = str(dict["AdministrationTime"].date())
                timegiven = str(dict["AdministrationTime"].time())
                house_visit = not(dict["toggle_inhouse"])
                writer.writerow([name, physician,physician_phone_no,med_name,reason,prescribed_date,Dosage,dategiven,timegiven, house_visit])

        return "true"

if __name__ == '__main__':
    app.run(debug=True)
