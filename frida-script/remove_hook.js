var removePtr = Module.findExportByName("libc.so", "remove");

var remove = new NativeFunction(removePtr, 'int', ['pointer']);

Interceptor.replace(removePtr, new NativeCallback(function (v) {

    var path = Memory.readCString(v);

    if(path.indexOf("decrypt.data") != -1) {

        console.log(path);

        return 1;

    } else {

        return remove(v);

    }

}, 'int', ['pointer']));