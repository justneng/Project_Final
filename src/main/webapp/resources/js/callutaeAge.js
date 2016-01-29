/**
 * Created by Pongpipat on 8/2/2558.
 */
function _calculateAge(dateinput) { // birthday is a date
//    alert(dateinput);
//    var birthday = new Date(dateinput);
//    var ageDifMs = Date.now() - birthday.getTime();
//    var ageDate = new Date(ageDifMs); // miliseconds from epoch
//    return Math.abs(ageDate.getUTCFullYear() - 1970);

    var dob = new Date(dateinput);
    var today = new Date();
    var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
    return age;
}