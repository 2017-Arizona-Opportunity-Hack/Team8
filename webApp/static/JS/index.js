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

    //printValues();

    var next = 0;
    $("#add-more").click(function (e) {
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = ' <div id="field' + next + '" name="field' + next + '"><!-- Text input--><div class="form-group"> <label class="control-label" for="medicineName">Medicine Name</label> <div class=""> <input class="1" id="medicineName" name="medicineName" type="text" placeholder="" class="form-control input-md"> </div></div> <!-- Text input--><div class="form-group"> <label class="control-label" for="medicineDosage">Medicine Dosage</label> <div class=""> <input class="2" id="medicineDosage" name="medicineDosage" type="text" placeholder="" class="form-control input-md"> </div></div><div class="form-group"><div class=""><label for="medicineInstructions">Instructions</label><div class=""><input class="8" id="medicineInstructions" class="form-control" type="text" placeholder=""></div></div><div class="form-group"><label class=" control-label" for="medicinePhysician">Physician</label><div class=""><input class="3" id="medicinePhysician" name="medicinePhysician" type="text" placeholder="" class="form-control input-md"></div></div><!-- Text input--><div class="form-group"><label class=" control-label" for="medicineReason">Reason</label><div class=""><input class="4" id="medicineReason" name="medicineReason" type="text" placeholder="" class="form-control input-md"></div></div><!-- Text input--><div class="form-group"><label class=" control-label" for="medicineDateofPrescription">Date of Prescription</label><div class=""><input class="5" id="medicineDateofPrescription" name="medicineDateofPrescription" type="text" placeholder="" class="form-control input-md"></div></div><!-- Text input--><div class="form-group"><label class=" control-label" for="medicinePhone">Physician\'s Phone Number</label><div class=""><input class="6" id="medicinePhone" name="medicinePhone" type="text" placeholder="" class="form-control input-md"></div></div><!-- Text input--><div class="form-group"><label class=" control-label" for="medicineTime">When to take</label><div class=""><input class="7" id="medicineTime" name="medicineTime" type="text" placeholder="" class="form-control input-md"><small id="medicineTimeHelp"class="form-text text-muted">Enter "0900+1500+2200" for 9 a.m, 3 p.m and 8 p.m</small></div></div></div></div>';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >Remove</button></div></div><div id="field"><br>';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source', $(addto).attr('data-source'));
        $("#count").val(next);

        $('.remove-me').click(function (e) {
            e.preventDefault();
            var fieldNum = this.id.charAt(this.id.length - 1);
            var fieldID = "#field" + fieldNum;
            $(this).remove();
            $(fieldID).remove();
        });
    });

    // var next = 1;
    // $(".add-more-houses").click(function(e){
    //     e.preventDefault();
    //     var addto = "#field" + next;
    //     var addRemove = "#field" + (next);
    //     next = next + 1;
    //     var newIn = '<input autocomplete="off" class="input form-control" id="field' + next + '" name="field' + next + '" type="text">';
    //     var newInput = $(newIn);
    //     var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
    //     var removeButton = $(removeBtn);
    //     $(addto).after(newInput);
    //     $(addRemove).after(removeButton);
    //     $("#field" + next).attr('data-source',$(addto).attr('data-source'));
    //     $("#count").val(next);
    //
    //     $('.remove-me').click(function(e){
    //         e.preventDefault();
    //         var fieldNum = this.id.charAt(this.id.length-1);
    //         var fieldID = "#field" + fieldNum;
    //         $(this).remove();
    //         $(fieldID).remove();
    //     });
    // });

     var allparent = $.ajax({
         url: "https://sunshine-acres.herokuapp.com/displayallparents",
         dataType: "json",
         async: false
     }).responseText;
    allparent = JSON.parse(allparent);
    console.log(allparent);


    ul = $("<ul>");                    // create a new ul element
// iterate over the array and build the list
    for (var i = 0, l = allparent.length; i < l; ++i) {
        var house = 'House: ';
        for (var j = 0,k = allparent[i].house_name.length; j<k; ++j ){
            house= house+allparent[i].house_name[j]+", ";
        }
        ul.append('<div class="card card-inverse card-primary mb-3 text-left"><div class="card-block"><blockquote class="card-blockquote"><p>'+allparent[i].first_name+" "+allparent[i].last_name+'</p><p>'+ house+'</p></blockquote></div></div>');
        //console.log(allchild[i]);
    }
    $("#parentResults").append(ul);



    var allchildren = $.ajax({
        url: "https://sunshine-acres.herokuapp.com/displayallchildren",
        dataType: "json",
        async: false
    }).responseText;

    allchildren = JSON.parse(allchildren);
    console.log(allchildren);

    ul = $("<ul>");                    // create a new ul element
// iterate over the array and build the list
    for (var i = 0, l = allchildren.length; i < l; ++i) {

        ul.append('<div class="row"><div class="col-md-9"><div class="card card-inverse card-primary mb-3 text-left"><div class="card-block"><blockquote class="card-blockquote"><p>'+allchildren[i].first_name+" "+allchildren[i].last_name+'</p><p>'+allchildren[i].house_name+'</p></blockquote></div></div></div><div class="col-md-3 dp"><a href="https://placeholder.com"><img src="http://via.placeholder.com/80x80"></a></div></div>');
        //console.log(allchild[i]);
    }
    $("#childrenResults").append(ul);


});


function toggleHouse() {
    $('#addNewHouse').click(function (e) {
        $('#house').show();
        $('#child').hide();
        $('#parent').hide();
        $('#houseTab').hide();

        // alert('show house');
    });
}

function toggleChild() {
    $('#addNewChild').click(function (e) {
        $('#child').show();
        $('#house').hide();
        $('#parent').hide();
        $('#childTab').hide();

        //alert('show child');
    });
}

function toggleParent() {
    $('#addNewParent').click(function (e) {
        $('#parent').show();
        $('#house').hide();
        $('#child').hide();
        $('#parentTab').hide();
        //alert('show parent');
    });
}

function navChild() {

    $('.navChild').click(function (e) {

        $('#childTab').show();
        $('#parentTab').hide();
        $('#houseTab').hide();
        $('#aboutTab').hide();

        $('#parent').hide();
        $('#house').hide();
        $('#child').hide();

    });

}

function navParent() {
    $('.navParent').click(function (e) {
        $('#childTab').hide();
        $('#parentTab').show();
        $('#houseTab').hide();
        $('#aboutTab').hide();

        $('#parent').hide();
        $('#house').hide();
        $('#child').hide();


    });

}

function navHouse() {
    $('.navHouse').click(function (e) {
        $('#childTab').hide();
        $('#parentTab').hide();
        $('#houseTab').show();
        $('#aboutTab').hide();

        $('#parent').hide();
        $('#house').hide();
        $('#child').hide();


    });

}

function navAbout() {
    $('.navAbout').click(function (e) {
        $('#childTab').hide();
        $('#parentTab').hide();
        $('#houseTab').hide();
        $('#aboutTab').show();

        $('#parent').hide();
        $('#house').hide();
        $('#child').hide();


    });

}

function validateHouse() {
    $('#houseNumberWarning').remove();
    $('#houseNameWarning').remove();
    var nameFlag = 1;
    var numberFlag = 1;
    var name = document.forms["houseForm"]["houseName"].value;
    var number = document.forms["houseForm"]["houseNumber"].value;
    if (name == "") {
        $('#houseName').after('<small id="houseNameWarning" class="form-text warning">Should not be empty</small>');
        nameFlag = 0;
    }
    if (number == "") {
        $('#houseNumber').after('<small id="houseNumberWarning" class="form-text warning">Should not be empty</small>');
        numberFlag = 0;
    }

    if (numberFlag == 0 | nameFlag == 0) {
        return false;
    }

}

function validateParent() {
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
        fnameFlag = 0;
    }

    if (lastname == "") {
        $('#parentLastName').after('<small id="parentLNameWarning" class="form-text warning">Should not be empty</small>');
        lnameFlag = 0;
    }

    if (email == "") {
        $('#parentEmail').after('<small id="parentEmailWarning" class="form-text warning">Should not be empty</small>');
        emailFlag = 0;
    }

    if (phone == "") {
        $('#parentPhone').after('<small id="parentPhoneWarning" class="form-text warning">Should not be empty</small>');
        phoneFlag = 0;
    }

    if (house == "") {
        $('#parentHouseName').after('<small id="parentHouseWarning" class="form-text warning">Should not be empty</small>');
        houseFlag = 0;
    }


    if (fnameFlag == 0 | lnameFlag == 0 | emailFlag == 0 | phoneFlag == 0 | houseFlag == 0) {
        return false;
    }

}



function printValues(){

    var firstname = document.getElementById('childFirstName');
    var lastname = document.getElementById('childLastName');
    var house = document.getElementById('childHouseName');

    var medicinename = document.getElementsByClassName('1');
    var dosage = document.getElementsByClassName('2');
    var physician = document.getElementsByClassName('3');
    var reason = document.getElementsByClassName('4');
    var prescription = document.getElementsByClassName('5');
    var phone = document.getElementsByClassName('6');
    var time = document.getElementsByClassName('7');
    var instructions = document.getElementsByClassName('8');
    var size = medicinename.length;

    var x = [];
    for (var i=0; i<size;i++){
        var t_arr = [];
        var t=time[i].value.split('+');
        console.log("TEEE",t);
        for(j=0;j<t.length;j++){
            var temp = t[j];
            console.log('temp',temp);
            var dos = dosage[i].value;
            var ju = {};
            ju[temp]=dos;
            t_arr.push(ju);
        }
        var y = {
            med_name:medicinename[i].value,
            reason:reason[i].value,
            physician_phone_no:phone[i].value,
            prescribed_date:prescription[i].value,
            special_instructions:instructions[i].value,
            physician_name:physician[i].value,
            dosage_time:t_arr
        }
        x.push(y);
    }

    var fd = new FormData();
    fd.append("first_name",firstname.value);
    fd.append("last_name",lastname.value);
    fd.append("house_id",house.value);
    fd.append("toggle_inhouse",true);
    fd.append("medications",JSON.stringify(x));

    var objects={
        first_name:firstname.value,
        last_name:lastname.value,
        house_id:house.value,
        toggle_inhouse:true
        // medications:x
    };

    console.log(objects);

   $.ajax({
        type: "POST",
        data :fd,
       contentType: false,
       processData: false,
        url: "https://sunshine-acres.herokuapp.com/addachild"
    });

}