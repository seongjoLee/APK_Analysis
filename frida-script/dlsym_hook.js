var find_target_function = false;

Interceptor.attach(Module.findExportByName("libc.so", "dlsym"), {

    onEnter: function(args) {

        console.log(Memory.readUtf8String(args[1]));

    },

});