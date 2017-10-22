$(document).ready(function () {
    //dynamic childs

    $('#house').hide();
    $('#child').hide();
    $('#parent').hide();
    $('#parentTab').hide();
    $('#houseTab').hide();
    $('#aboutTab').hide();
     toggleHouse();
     toggleChild();
     toggleParent();

     navHouse();
     navChild();
     navParent();
     navAbout();

    var next = 0;
    $("#add-more").click(function(e){
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = ' <div id="field'+ next +'" name="field'+ next +'"><!-- Text input--><div class="form-group"> <label class="control-label" for="medicineName">Medicine Name</label> <div class=""> <input id="medicineName" name="medicineName" type="text" placeholder="" class="form-control input-md"> </div></div> <!-- Text input--><div class="form-group"> <label class="control-label" for="medicineDosage">Medicine Dosage</label> <div class=""> <input id="medicineDosage" name="medicineDosage" type="text" placeholder="" class="form-control input-md"> </div></div><div class="form-group"><label class=" control-label" for="medicinePhysician">Physician</label><div class=""><input id="medicinePhysician" name="medicinePhysician" type="text" placeholder="" class="form-control input-md"></div></div><!-- Text input--><div class="form-group"><label class=" control-label" for="medicineReason">Reason</label><div class=""><input id="medicineReason" name="medicineReason" type="text" placeholder="" class="form-control input-md"></div></div><!-- Text input--><div class="form-group"><label class=" control-label" for="medicineDateofPrescription">Date of Prescription</label><div class=""><input id="medicineDateofPrescription" name="medicineDateofPrescription" type="text" placeholder="" class="form-control input-md"></div></div><!-- Text input--><div class="form-group"><label class=" control-label" for="medicinePhone">Physician\'s Phone Number</label><div class=""><input id="medicinePhone" name="medicinePhone" type="text" placeholder="" class="form-control input-md"></div></div><!-- Text input--><div class="form-group"><label class=" control-label" for="medicineTime">When to take</label><div class=""><input id="medicineTime" name="medicineTime" type="text" placeholder="" class="form-control input-md"><small id="medicineTimeHelp"class="form-text text-muted">Enter "0900+1500+2200" for 9 a.m, 3 p.m and 8 p.m</small></div></div></div></div>';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >Remove</button></div></div><div id="field"><br>';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);

        $('.remove-me').click(function(e){
            e.preventDefault();
            var fieldNum = this.id.charAt(this.id.length-1);
            var fieldID = "#field" + fieldNum;
            $(this).remove();
            $(fieldID).remove();
        });
    });

});


function toggleHouse(){
    $('#addNewHouse').click(function(e){
       $('#house').show();
       $('#child').hide();
       $('#parent').hide();
       $('#houseTab').hide();

        // alert('show house');
    });
}
function toggleChild(){
    $('#addNewChild').click(function(e){
        $('#child').show();
        $('#house').hide();
        $('#parent').hide();
        $('#childTab').hide();

        //alert('show child');
    });
}
function toggleParent(){
    $('#addNewParent').click(function(e){
        $('#parent').show();
        $('#house').hide();
        $('#child').hide();
        $('#parentTab').hide();
        //alert('show parent');
    });
}

function  navChild() {

    $('.navChild').click(function(e){

        $('#childTab').show();
        $('#parentTab').hide();
        $('#houseTab').hide();
        $('#aboutTab').hide();

        $('#parent').hide();
        $('#house').hide();
        $('#child').hide();

    });

}

function  navParent() {
    $('.navParent').click(function(e){
        $('#childTab').hide();
        $('#parentTab').show();
        $('#houseTab').hide();
        $('#aboutTab').hide();

        $('#parent').hide();
        $('#house').hide();
        $('#child').hide();


    });

}

function  navHouse() {
    $('.navHouse').click(function(e){
        $('#childTab').hide();
        $('#parentTab').hide();
        $('#houseTab').show();
        $('#aboutTab').hide();

        $('#parent').hide();
        $('#house').hide();
        $('#child').hide();



    });

}

function  navAbout() {
    $('.navAbout').click(function(e){
        $('#childTab').hide();
        $('#parentTab').hide();
        $('#houseTab').hide();
        $('#aboutTab').show();

        $('#parent').hide();
        $('#house').hide();
        $('#child').hide();



    });

}

function  validateHouse() {
    $('#houseNumberWarning').remove();
    $('#houseNameWarning').remove();
    var nameFlag = 1;
    var numberFlag = 1;
    var name = document.forms["houseForm"]["houseName"].value;
    var number = document.forms["houseForm"]["houseNumber"].value;
    if (name == "") {
        $('#houseName').after('<small id="houseNameWarning" class="form-text warning">Should not be empty</small>');
        nameFlag=0;
    }
    if (number == "") {
        $('#houseNumber').after('<small id="houseNumberWarning" class="form-text warning">Should not be empty</small>');
        numberFlag=0;
    }

    if(numberFlag==0 | nameFlag==0){
        return false;
    }

}

function  validateParent() {
    alert('parent');
    $('#parentFNameWarning').remove();
    $('#parentLNameWarning').remove();
    $('#parentEmailWarning').remove();
    $('#parentPhoneWarning').remove();
    $('#parentHouseWarning').remove();

    var fnameFlag = 1;
    var lnameFlag = 1;
    var phoneFlag = 1;
    var emailFlag = 1;
    var houseFlag = 1;

    var firstname = document.forms["parentForm"]["parentFirstName"].value;
    var lastname = document.forms["parentForm"]["parentLastName"].value;
    var email = document.forms["parentForm"]["parentEmail"].value;
    var phone = document.forms["parentForm"]["parentPhone"].value;
    var house = document.forms["parentForm"]["parentHouseName"].value;


    if (firstname == "") {
        $('#parentFirstName').after('<small id="parentFNameWarning" class="form-text warning">Should not be empty</small>');
        fnameFlag=0;
    }

    if (lastname == "") {
        $('#parentLastName').after('<small id="parentLNameWarning" class="form-text warning">Should not be empty</small>');
        lnameFlag=0;
    }

    if (email == "") {
        $('#parentEmail').after('<small id="parentEmailWarning" class="form-text warning">Should not be empty</small>');
        emailFlag=0;
    }

    if (phone == "") {
        $('#parentPhone').after('<small id="parentPhoneWarning" class="form-text warning">Should not be empty</small>');
        phoneFlag=0;
    }

    if (house == "") {
        $('#parentHouseName').after('<small id="parentHouseWarning" class="form-text warning">Should not be empty</small>');
        houseFlag=0;
    }


    if(fnameFlag==0 | lnameFlag==0 | emailFlag==0 | phoneFlag==0 | houseFlag==0){
        return false;
    }

}