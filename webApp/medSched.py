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
    children = db.Children.find()

    for child in children:
        medications = db.Medicines.find({'child_id':child["_id"],'scheduled':'True'})
        for medication in medications:
            if datetime.date.today() - medication['start_date']< medication["total_no_of_days"]:
                if datetime.date.today().isoweekday() in medication["days_of_week"]:
                    schedule_row_object = {}
                    schedule_row_object['date'] = datetime.date.today().strftime('%Y-%m-%d')
                    schedule_row_object['child_name'] = child['child_name']
                    schedule_row_object['house_id'] = child['house_id']
                    schedule_row_object['child_id'] = child['_id']
                    schedule_row_object['toggle_inhouse'] = child['toggle_inhouse']
                    schedule_row_object['medicine_name'] = medication['medicine_name']
                    schedule_row_object['reason'] = medication['reason']
                    schedule_row_object['physician_phone'] = medication['physician_phone']
                    schedule_row_object['special_instructions'] = medication['special_instructions']
                    schedule_row_object['dosage'] = medication['dosage']
                    schedule_row_object['prescribed_date'] = medication['prescribed_date']
                    schedule_row_object['physician_name'] = medication['physician_name']
                    if child['toggle_inhouse'] == False:
                        schedule_row_object['done'] = "N/A"
                    else:
                        schedule_row_object['done'] = False

                    for t in medication['administration_time']:
                        schedule_row_object['administration_time'] = t
                        db.MedicineSchedule.find_one_and_replace({"child_id": schedule_row_object['child_id'],
                                                                  "medicine_name": schedule_row_object['medicine_name'],
                                                                  "administration_time": schedule_row_object[
                                                                      "administration_time"]},
                                                                 schedule_row_object, upsert=True)

    client.close()



createMedSchedule()