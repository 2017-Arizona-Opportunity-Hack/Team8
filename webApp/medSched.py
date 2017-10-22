from pymongo import MongoClient
import datetime




def connect_to_db():
    # CreatePyMongoConnection
    client = MongoClient("ds227865.mlab.com", 27865)
    db = client['sunshinedb']
    db.authenticate('admin', 'sunshine123')
    return db,client



def createMedSchedule():
    db, client = connect_to_db()
    children = db.Children.find({"medications":{'$exists': True}})
    for child in children:
        for medication in child['medications']:
            schedule_row_object = {}
            schedule_row_object['first_name'] = child['first_name']
            schedule_row_object['last_name'] = child['last_name']
            schedule_row_object['house_id'] = child['house_id']
            for key,value in medication.items():
                if key == "dosage_time":
                    schedule_row_object["AdministrationTime"],schedule_row_object["Dosage"] = value.items()[0]
                    schedule_row_object["AdministrationTime"] = datetime.datetime.now().replace(hour = int(schedule_row_object["AdministrationTime"][:2]), minute =int(schedule_row_object["AdministrationTime"][2:4]), second = 0 )
                else:
                    schedule_row_object[key] = value
            schedule_row_object['done'] = False
            db.MedicineSchedule.insert_one(schedule_row_object)
    client.close()



createMedSchedule()