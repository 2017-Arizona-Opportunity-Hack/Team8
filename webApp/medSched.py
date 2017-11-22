from pymongo import MongoClient
import datetime
import pytz
from bson.objectid import ObjectId
import time



def connect_to_db():
    # CreatePyMongoConnection
    client = MongoClient("ds227865.mlab.com", 27865)
    db = client['sunshinedb']
    db.authenticate('admin', 'sunshine123')
    return db,client



def createMedSchedule():
    try:
        db, client = connect_to_db()
        children = db.Children.find()
        todays_date = datetime.datetime.now(pytz.timezone("America/Phoenix")).date()
        for child in children:
            medications = db.Medicines.find({'child_id':str(child["_id"]),'scheduled':'True'})
            for medication in medications:
                if (todays_date - datetime.datetime.strptime(medication['start_date'],"%Y-%m-%d").date()).days< medication["total_no_of_days"]:
                    if todays_date.isoweekday() in medication["days_of_week"]:
                        schedule_row_object = {}
                        schedule_row_object['date'] = todays_date.strftime('%Y-%m-%d')
                        schedule_row_object['child_name'] = child['firstname']+child['lastname']
                        schedule_row_object['house_id'] = child['house_id']
                        schedule_row_object['child_id'] = str(child['_id'])
                        #schedule_row_object['toggle_inhouse'] = child['toggle_inhouse']
                        schedule_row_object['medicine_name'] = medication['medicine_name']
                        schedule_row_object['reason'] = medication['reason']
                        schedule_row_object['physician_phone'] = medication['physician_phone']
                        schedule_row_object['special_instructions'] = medication['special_instructions']
                        schedule_row_object['dosage'] = medication['dosage']
                        schedule_row_object['prescribed_date'] = medication['prescribed_date']
                        schedule_row_object['physician_name'] = medication['physician_name']
                        if child['toggle_inhouse'] == 'False':
                            schedule_row_object['done'] = "N/A"
                        else:
                            schedule_row_object['done'] = 'False'

                        doc_list = []
                        for t in medication['administration_time']:
                            schedule_row_object['administration_time'] = t
                            doc_list.append(schedule_row_object.copy())

                        for i in doc_list:
                            print i

                        db.MedicineSchedule.insert_many(doc_list, ordered=True)

        client.close()
    except Exception as e:
        print e
        client.close()
        #need to find a way to inform us if this doesn't work



createMedSchedule()