//Vardump similar al de PHP
exports.vardump = (obj) => JSON.stringify(obj, null, 2);


//Formatear fecha en formato dd/mm/aaaa
exports.formatearFecha = (fecha) => {
    let date = new Date(fecha);
    let month = null;
    let day = null;

    day = date.getDate() < 10 ? ("0" + (date.getDate() + 1)) : (date.getDate() + 1);    
    month = date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);

    return day + "/" + month + "/" + date.getFullYear();
}

//Validar si existe elemento en un array
arrayCompare = (a1, a2) => {
    if (a1.length != a2.length) return false;
    var length = a2.length;
    for (var i = 0; i < length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
}

exports.in_array = (needle, haystack) => {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return true;
        }
    }
    return false;
}