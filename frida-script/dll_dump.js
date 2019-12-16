var started = false;

var dll_name_list = [];



Interceptor.attach(Module.findExportByName("libc.so", "dlsym"), {

    onEnter: function(args) {        

        if (started) {

            return;

        }



        var name = Memory.readUtf8String(args[1]);

        if (name.indexOf("mono_image_open_from_data_with_name") == 0) {

            started = true;

        }

    },

    onLeave: function(a0) {

        if (started) { 

            console.log("mono_image_open_from_data_with_name address : " + a0);



            Interceptor.attach(a0, {

                onEnter: function(args) {

                    var message = {};                

                    var name = Memory.readUtf8String(args[5]);

                    if(dll_name_list.indexOf(name) != -1){

                        return;

                    }; 

                    

                    dll_name_list.push(name);

                    if (name.indexOf("Assembly-") == -1) {

                        return;

                    }

                    

                    message["data"] = args[0];

                    message["data_len"] = args[1].toInt32();

                    message["need_copy"] = args[2];

                    console.log("data address : " + message["data"]);

                    console.log("data length : " + message["data_len"]);

                    console.log("need copy : " + message["need_copy"]);

                },

            });

            

            started = false;

        }

    }

});