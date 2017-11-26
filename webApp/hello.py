from flask import Flask, session, redirect, url_for, escape, request, render_template, jsonify
from pymongo import MongoClient, ReturnDocument
import datetime
import json
from bson import ObjectId
from bson.json_util import dumps
from flask_cors import CORS, cross_origin
# from medSched import createMedSchedule
import pytz
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


@app.route('/', methods = ["GET","POST"])
def index():
    return render_template("index.html")

@app.route('/login', methods = ['GET', 'POST'])
def login():
    db,client = connect_to_db()
    try:
        email = request.form['email']
        password = request.form['password']
        admin = db.Admin.find_one({'email': email}, {'username':1, 'password': 1})
        if admin:
            if str(admin['password']) == str(password):
                client.close()
                return jsonify({'success':1,'errorMessage':''})
            else:
                client.close()
                return jsonify({'success':0,'errorMessage':'wrong password'})

        else:
            client.close()
            return jsonify({'success':0,'errorMessage':'no admin'})
    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/parentLogin', methods = ['POST'])
def parentlogin():
    db,client = connect_to_db()
    try:
        email = request.form['email']
        password = request.form['password']
        parent = db.Parents.find_one({'email': email})
        if parent:
            if str(parent['password']) == str(password):
                
                client.close()
                parent['_id']=str(parent['_id'])
                return jsonify({'success':1,'errorMessage':'','parent':parent})
            else:
                return jsonify({'success':0,'errorMessage':'wrong password'})
        else:
            client.close()
            return jsonify({'success':0,'errorMessage':'no user'})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

		
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

@app.route('/getMedScheduleForChild', methods = ["POST"])
def getMedScheduleForChild():
    try:
        child_id = request.form['child_id']
        db,client = connect_to_db()
        med_details = db.MedicineSchedule.find({'child_id': child_id,'date': datetime.datetime.now(pytz.timezone("America/Phoenix")).date().strftime('%Y-%m-%d'),'done':'False'})
        list1 = []
        for c in med_details:
            c['_id'] = str(c['_id'])
            list1.append(c)
        client.close()
        print list1
        return jsonify(list1)
    except Exception as e:
        print e
        client.close()
        return jsonify({'success': 0, 'errorMessage': 'error'})

@app.route('/getPrescriptionForChild', methods = ["POST"])
def getPrescriptionForChild():
    try:
        child_id = request.form['child_id']
        db,client = connect_to_db()
        med_details = db.Medicines.find({'child_id': child_id})
        list1 = []
        for c in med_details:
            c['_id'] = str(c['_id'])
            list1.append(c)
        client.close()
        print list1
        return jsonify({'success': 1, 'errorMessage': '', 'all_medicines':list1})
    except Exception as e:
        print e
        client.close()
        return jsonify({'success': 0, 'errorMessage': 'error'})

@app.route('/logMedicineGiven', methods = ["POST"])
def logMedicineGiven():
    try:
        sched_id = request.form['schedule_id']
        db, client = connect_to_db()
        med_details = db.MedicineSchedule.find_and_modify({'_id': ObjectId(sched_id)},{'$set':{'done':'True', 'actual_time':datetime.datetime.now(pytz.timezone("America/Phoenix"))}})
        client.close()
        return jsonify({'success': 1, 'errorMessage': '','_id':sched_id})
    except Exception as e:
        print e
        client.close()
        return jsonify({'success': 0, 'errorMessage': 'error'})

@app.route('/logMedicineCustom', methods = ["POST"])
def logMedicineCustom():
    try:
        med_id = request.form['medicine_id']
        db, client = connect_to_db()
        medication = db.Medicines.find_one({'_id': ObjectId(med_id)})
        child = db.Children.find_one({'_id':ObjectId(medication['child_id'])})
        todays_date = datetime.datetime.now(pytz.timezone("America/Phoenix")).date()
        schedule_row_object = {}
        schedule_row_object['date'] = todays_date.strftime('%Y-%m-%d')
        schedule_row_object['actual_time'] = datetime.datetime.now(pytz.timezone("America/Phoenix"))
        schedule_row_object['child_name'] = child['firstname'] + child['lastname']
        schedule_row_object['house_id'] = child['house_id']
        schedule_row_object['child_id'] = str(child['_id'])
        schedule_row_object['medicine_name'] = medication['medicine_name']
        schedule_row_object['reason'] = medication['reason']
        schedule_row_object['physician_phone'] = medication['physician_phone']
        schedule_row_object['special_instructions'] = medication['special_instructions']
        schedule_row_object['dosage'] = medication['dosage']
        schedule_row_object['prescribed_date'] = medication['prescribed_date']
        schedule_row_object['physician_name'] = medication['physician_name']
        schedule_row_object['done'] = 'True'
        #doesnt have an administration time, differentiating factor from normal logged medicines
        db.MedicineSchedule.insert_one(schedule_row_object)
        client.close()
        return jsonify({'success': 1, 'errorMessage': ''})
    except Exception as e:
        print e
        client.close()
        return jsonify({'success': 0, 'errorMessage': 'error'})


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
        dob = request.form['dob']
        house_id = request.form['house_id']

        child = db.Children.find_one({'firstname':firstname,'lastname':lastname,'dob':dob,'house_id':house_id})
        if not child:
            _id = db.Children.insert({'firstname':firstname,'lastname':lastname,'dob':dob,'house_id':house_id, 'toggle_inhouse':'True'})
            client.close()
            house = db.Houses.find_one({'_id':ObjectId(house_id)})
            house['_id'] = str(house['_id'])
            print house
            return jsonify({'success':1,'errorMessage':'','child':{'firstname':firstname,'lastname':lastname,'dob':dob,'house':house,'_id':str(_id)}})
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
        dob = request.form['dob']
        house_id = request.form['house_id']

        house = db.Houses.find_one({'_id':ObjectId(house_id)})
        house['_id'] = str(house['_id'])


        db.Children.find_one_and_update({'_id': ObjectId(_id)}, {"$set":{'firstname':firstname,'lastname':lastname,'dob':dob,'house_id':house_id}}, upsert=False)
        client.close()
        return jsonify({'success':1,'errorMessage':'','child':{'firstname':firstname,'lastname':lastname,'dob':dob,'house':house,'_id':str(_id)}})
    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})
    

@app.route('/deleteChild', methods = ["POST"])
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
            house = db.Houses.find_one({'_id':ObjectId(child['house_id'])})
            house['_id'] = str(house['_id'])
            child_object={
            "_id":str(child['_id']),
            "firstname":child['firstname'],
            "lastname":child['lastname'],
            "dob":child['dob'],
            "house":house
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
            "firstname":child['firstname'],
            "lastname":child['lastname'],
            "dob":child['dob'],
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
        '''
        Purpose: Add medicine for a particular child into db in the Medicine collection
        Inputs: medicine details and child_id
        '''
        print "anadar aaya main"
        update_obj = {}
        update_obj['medicine_name']=request.form['medicine_name']
        update_obj['reason'] = request.form['reason']
        update_obj['special_instructions'] = request.form['special_instructions']
        update_obj['prescribed_date'] = request.form['prescribed_date']
        update_obj['physician_name'] = request.form['physician_name']
        update_obj['physician_phone'] = request.form['physician_phone']
        update_obj['scheduled'] = request.form['scheduled']
        update_obj['child_id'] = request.form['child_id']
        update_obj['dosage'] = request.form['dosage']

        if update_obj['scheduled'] == 'True':
            update_obj['days_of_week'] = list(map(lambda x: int(x), request.form['days_of_week'].split(',')))
            update_obj['start_date'] = request.form['start_date']
            update_obj['administration_time'] = request.form['administration_time'].split(',')
            update_obj['total_no_of_days'] = request.form['total_no_of_days']

        #print update_obj

        if db.Medicines.find({'child_id':update_obj['child_id'], 'medicine_name':update_obj['medicine_name']}).count() >0:
            return jsonify({'success': 0, 'errorMessage': 'A prescription with this medicine name for the following child already exists.Please delete it or edit the same'})
        else:
            _id = db.Medicines.insert(update_obj)
        print _id
        update_obj['_id'] = str(_id)

        client.close()
        return jsonify({'success':1,'errorMessage':'','medicine':update_obj})

    except Exception as e:
        print e

    client.close()
    return jsonify({'success':0,'errorMessage':'error'})

@app.route('/updateMedicine',methods=["POST"])
@cross_origin()
def updateMedicine():
    db,client = connect_to_db()
    try:
        update_obj = {}
        _id = request.form['_id']
        update_obj['medicine_name']=request.form['medicine_name']
        update_obj['reason'] = request.form['reason']
        update_obj['special_instructions'] = request.form['special_instructions']
        update_obj['prescribed_date'] = request.form['prescribed_date']
        update_obj['physician_name'] = request.form['physician_name']
        update_obj['physician_phone'] = request.form['physician_phone']
        update_obj['child_id']=request.form['child_id']
        update_obj['scheduled'] = request.form['scheduled']
        update_obj['dosage'] = request.form['dosage']
        if update_obj['scheduled'] == 'True':
            update_obj['days_of_week'] = list(map(lambda x: int(x), request.form['days_of_week'].split(',')))
            update_obj['start_date'] = request.form['start_date']
            update_obj['administration_time'] = request.form['administration_time'].split(',')
            update_obj['total_no_of_days'] = request.form['total_no_of_days']

        print update_obj
        try:
            return_obj = db.Medicines.find_one_and_replace({'_id':ObjectId(_id)},update_obj,upsert=False, return_document=ReturnDocument.AFTER)
            return_obj['_id'] = str(return_obj['_id'])
        except Exception as e:
            print e
            client.close()
            return jsonify({'success': 0, 'errorMessage': "Couldn't find medication to update"})
        client.close()
        return jsonify({'success':1,'errorMessage':'', 'medicine':return_obj})

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
'''
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
'''

@app.route('/getAllParents', methods = ["GET"])
@cross_origin()
def displayAllParents():
    db, client = connect_to_db()
    try:
        parents = db.Parents.find()
        all_parents = []
        

        for parent in parents:
            house_ids = parent['house_ids']
            houses=[]
            for i in range(len(house_ids)):
                house = db.Houses.find_one({'_id':ObjectId(house_ids[i])})
                house['_id'] = str(house['_id'])
                houses.append(house)

            parent_object={
            "_id":str(parent['_id']),
            "firstname":parent['firstname'],
            "lastname":parent['lastname'],
            "phone":parent['phone'],
            "email":parent['email'],
            #"userid":parent['userid'],
            'password':str(parent['password']),
            "houses":houses
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
        #userid = request.form['userid']
        password = request.form['password']
        email = request.form['email']
        phone = request.form['phone']
        house_ids = request.form['house_ids'].split(",")
        print type(house_ids)
        houses=[]
        for i in range(len(house_ids)):
            house = db.Houses.find_one({"_id":ObjectId(house_ids[i])})
            house['_id']=str(house['_id'])
            houses.append(house)

        parent = db.Parents.find_one({"email":email})
        if not parent:
            _id = db.Parents.insert({"firstname":firstname,"lastname": lastname,"password": password,"email": email,"house_ids": house_ids,"phone": phone})
            client.close()
            return jsonify({'success':1,'errorMessage':'','parent':{"firstname":firstname,"lastname": lastname,"password": password,"email": email,"houses": houses,"phone": phone,'_id':str(_id)}})

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
        #userid = request.form['userid']
        email = request.form['email']
        phone = request.form['phone']
        house_ids = request.form['house_ids'].split(",")
        houses=[]
        for i in range(len(house_ids)):
            house = db.Houses.find_one({"_id":ObjectId(house_ids[i])})
            house['_id']=str(house['_id'])
            houses.append(house)

        db.Parents.find_one_and_update({'_id': ObjectId(_id)}, {"$set":{"firstname":firstname,"lastname": lastname,"password": str(password),"email": email,"house_ids": house_ids,"phone": phone}}, upsert=False)
        client.close()
        return jsonify({'success':1,'errorMessage':'','parent':{"_id":_id,"firstname":firstname,"lastname": lastname,"password": str(password),"email": email,"houses": houses,"phone": phone}})
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
        _id = request.form['parent_id']
        parent = db.Parents.find_one({'_id':ObjectId(_id)})
        parent_houses_id = parent['house_ids']   
        all_houses = [] 
        for i in range(len(parent_houses_id)):
            house = db.Houses.find_one({'_id':ObjectId(parent_houses_id[i])})
            house_object={
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
    db, client = connect_to_db()

    try:
        if request.method == 'POST':
            child_id = request.form['child_id']
            print child_id
            todays_date = datetime.datetime.now(pytz.timezone("America/Phoenix")).date()
            toggle_child = db.Children.find_one({"_id":ObjectId(child_id) })
            print toggle_child
            if toggle_child['toggle_inhouse'] =='True':
                new_state = 'False'
            elif toggle_child['toggle_inhouse'] =='False':
                new_state = 'True'

            print "hi"
            db.Children.find_one_and_update({"_id":ObjectId(child_id) },{'$set':{'toggle_inhouse': new_state }})

            print "hi";
            if new_state == 'True':
                db.ChildStatus.find_one_and_update({'child_id': child_id}, {'$set':{'in_dt': datetime.datetime.now(pytz.timezone("America/Phoenix"))}} ,sort=[('_id',-1)])

                if datetime.datetime.now(pytz.timezone("America/Phoenix")).time() < datetime.time(6,0,0,0):
                    db.MedicineSchedule.update_many(
                        {'child_id': child_id, 'date': todays_date.strftime('%Y-%m-%d'), 'done': 'N/A'},
                        {'$set': {'done': 'False'}})
                elif datetime.datetime.now(pytz.timezone("America/Phoenix")).time() > datetime.time(18,0,0,0):
                    db.MedicineSchedule.update_many(
                        {'child_id': child_id, 'date': todays_date.strftime('%Y-%m-%d'), 'done': 'N/A', 'administration_time':{'$in':['Evening','Night']}},
                        {'$set': {'done': 'False'}})
                else:
                    #behaviour currently same as first if but scope of change present in thr future
                    db.MedicineSchedule.update_many(
                        {'child_id': child_id, 'date': todays_date.strftime('%Y-%m-%d'), 'done': 'N/A'},
                        {'$set': {'done': 'False'}})

            elif new_state == 'False':
                #went out of house
                db.ChildStatus.insert({'child_id': child_id, 'out_dt': datetime.datetime.now(pytz.timezone("America/Phoenix"))})
                db.MedicineSchedule.update_many(
                    {'child_id': child_id, 'date': todays_date.strftime('%Y-%m-%d'), 'done': 'False'},
                    {'$set': {'done': 'N/A'}})

            client.close()
            return jsonify({"success":1,"errorMessage":"",'toggle_inhouse':new_state})
    except Exception as e:
        print e
        client.close()
        return jsonify({"success":0,"errorMessage":"error"})

@app.route('/addHouse', methods = ["POST"])
@cross_origin()
def addHouse():

    db, client = connect_to_db()
    try:
        name = request.form['house_name']
        address = request.form['address']

        house = db.Houses.find_one({"name":name})       
        if not house:
            _id = db.Houses.insert({"name":name,"address": address})
            returnObject = {"success":1,"errorMessage":"",'house':{"name":name,"address": address,'_id':str(_id)}}
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
        parent = db.Parents.find_one({"house_ids":_id})
        if not child and not parent:
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
        parent = db.Parents.find_one({"house_ids":_id})

        if child:
            print "Yes"
            db.Children.update_many({"house_id":_id},{'$set':{'house_id':''}})
        if parent:
            print "No"
            parents =   db.Parents.find({"house_ids":_id})
            for parent in parents:
                list_house = parent['house_ids']
                list_house.remove(_id)
                db.Parents.find_one_and_update({'_id':parent['_id']},{'$set':{'house_ids':list_house}})

       
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
        print name
        address = request.form['address']
        _id = request.form['_id']
        db.Houses.find_one_and_update({'_id': ObjectId(_id)}, {"$set":{"name":name,"address":address}}, upsert=False)
        client.close()
        return jsonify({"success":1,"errorMessage":"",'house':{"name":name,"address": address,'_id':str(_id)}})
    except Exception as e:
        print e

    client.close()
    return jsonify({"success":0,"errorMessage":"need post request"})

'''
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
'''
if __name__ == '__main__':
    app.run(debug=True)
