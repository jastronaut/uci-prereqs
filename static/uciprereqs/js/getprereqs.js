delete window.localStorage;
var dept = '';
var num = '';
var maxHist = 4;

function showPrereqs(prereqs) {
    let prerequl = $('#prereqs');
    $('.prereqs').css('visibility', 'visible');
    for (var p in prereqs) {
        prerequl.append('<tr><td class="prereqitem">' + prereqs[p] + '</td></tr>');
    }
}

function showNext(next) {
    let nextul = $('#next');
    $('.next').css('visibility', 'visible');
    for (var n in next) {
        nextul.append('<tr><td class="nextitem">' + next[n] + '</td></tr>');
    }
}


function showListing(listing) {
    $('#listing-area').css('display', 'block');
    if (listing === "No scheduled courses" || listing === "No listing available") {
        let nolisting = $('#no-listing');
        nolisting.css('display', 'block');
        nolisting.html(listing);
        return;
    }
    for (var quarter in listing) {
        $('#' + quarter).css('display', 'block');
        let qcontent  = $('#' + quarter  + 'qcontent');
        qcontent.empty();
        for (var prof in listing[quarter]) {
            qcontent.append('<div class="professor-listing">' + listing[quarter][prof] + '</div>');
        }
    }
}

function showClasses(classlist) {
    $('.classList').css('visibility', 'visible');
    let classSelect = $('#classList');
    classSelect.empty();
    classSelect.append('<option value="">Courses</option>');
    for (var i in classlist) {
        classSelect.append('<option value="' + classlist[i] + '">' + classlist[i] + '</option>');
    }
}

function showMajorReqs(majorreqs) {
    $('.major-reqs').css('display', 'block');
    let eachMajor = $('.each-major');
    for (var major in majorreqs) {
        if (majorreqs[major].length > 0){ 
            eachMajor.append('<h4 class="title is-4">' + major + '</h3>');
            let addMajorCats = '<table class="table">';
            for (var cat in majorreqs[major]) {
                addMajorCats = addMajorCats + '<tr><td>' + majorreqs[major][cat] + '</td></tr>';
            }
            addMajorCats += '</table>';
            eachMajor.append(addMajorCats);
        }
    }
}

function addHistory() {
    let prevclasses = $('.checked-class');
    try {
        for(var i in prevclasses) {
            console.log(prevclasses[i].children.html())
            if (prevclasses[i].children.html() == (dept + ' ' + num))
                return;
        }
    } catch(e) {}
    let temp = $('.temp').clone();
    temp.removeClass('temp');
    let lenprev =  prevclasses.length + 1;
    temp.children().html(dept + ' ' + num);

    temp.click(function() {
        let course = temp.children().html().split(' ');
        if (course[0] != dept) {
            dept = course[0];
            $('#selectDept').val(dept).change();
            resetAreas();
        }
        if (course[1] != num) {
            num = course[1];
            $('#classList').val(num).change();
        }
    });

    $('.history').prepend(temp);
    if (lenprev > maxHist) {
        $('.checked-class')[lenprev - 2].remove();
    }

}

function resetAreas() {
    $('#listing-area').css('display', 'none');
    $('#prereqs').empty();
    $('.prereqs').css('visibility', 'hidden');
    $('#next').empty();
    $('.next').css('visibility', 'hidden');
    $('.major-reqs').css('display', 'none');
    $('.each-major').empty();
    $('.desc').css('display', 'none');
    $('#title').css('display', 'none');
    $('.quarterbox').css('display', 'none');
    $('.no-listing').css('display', 'none');
}

$('#selectDept').change(function() {
    resetAreas();
	let d = $(this).val();
	if (d != "") {
        dept = d;
        $.ajax({
            url: 'ajax/show_courses/',
            data: {
                'selectedDept': dept
            },
            dataType: 'json',
            success: function(data) {
                showClasses(data['courses']);
                $('#selectedDept').html(dept);
                $('#coursebadge').css('display', 'inline');
                $('#selectedNum').html('');
            }
	});
}
});

$('#classList').change(function() {
    let n = $(this).val();
    if (n != "") {
        num = n;
        $.ajax({
            url: 'ajax/show_course_info/',
            data: {
                'selectedDept': dept,
                'selectedNum': num
            },
            dataType: 'json',
            success: function(data) {
                resetAreas();
                $('#selectedNum').html(num);
                $('#title').html(data['title']);
                if (data['desc'] != null)
                    $('#desc').html('<br>' + data['desc']);
                $('#title').css('display', 'inline')
                $('.desc').css('display', 'block');
                showPrereqs(data['prereqs']);
                showListing(data['listing']);
                showNext(data['next']);
                if (data['requirements'] != null)
                    showMajorReqs(data['requirements']);
                else
                    console.log("Sorry can't print!");
                addHistory();
            }
        });
    }
});