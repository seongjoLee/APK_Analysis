function hook_native_GetStringUTFChars() {
    var env = Java.vm.getEnv();
    var handlePointer = Memory.readPointer(env.handle);
    console.log("\t[*] env handle: " + handlePointer);
    var GetStringUTFChars = Memory.readPointer(handlePointer.add(0x548));
    console.log("\t[*] GetStringUTFChars addr: " + GetStringUTFChars);
    Interceptor.attach(GetStringUTFChars, {
        onEnter: function (args) {
            var str = "";
            var String = Java.use("java.lang.String");
            str = Java.cast(args[1], String);
            console.log("\t\t[*] GetStringUTFChars: " + str);
        }
    });
};
 
function hook_native_NewStringUTF() {
    var env = Java.vm.getEnv();
    var handlePointer = Memory.readPointer(env.handle);
    console.log("\t[*] env handle: " + handlePointer);
    var NewStringUTF = Memory.readPointer(handlePointer.add(0x538));
    console.log("\t[*] NewStringUTF addr: " + NewStringUTF);
    Interceptor.attach(NewStringUTF, {
        onEnter: function (args) {
            var str = "";
            var String = Java.use("java.lang.String");
            str = Java.cast(args[1], String);
 
            console.log("\t\t[*] NewStringUTF: " + str);
        }
    });
};