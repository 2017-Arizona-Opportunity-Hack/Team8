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

    });

}

function  navParent() {
    $('.navParent').click(function(e){
        $('#childTab').hide();
        $('#parentTab').show();
        $('#houseTab').hide();
        $('#aboutTab').hide();

    });

}

function  navHouse() {
    $('.navHouse').click(function(e){
        $('#childTab').hide();
        $('#parentTab').hide();
        $('#houseTab').show();
        $('#aboutTab').hide();


    });

}

function  navAbout() {
    $('.navAbout').click(function(e){
        $('#childTab').hide();
        $('#parentTab').hide();
        $('#houseTab').hide();
        $('#aboutTab').show();


    });

}