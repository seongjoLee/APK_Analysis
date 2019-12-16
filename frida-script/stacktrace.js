var logContentArray = new Array();
var singlePrefix = "|-"
function uniqBy(array, key)
{
        var seen = {};
        return array.filter(function(item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
}
 
function traceClass(targetClass)
{
    var hook = Java.use(targetClass);
    var methods = hook.class.getDeclaredMethods();
    hook.$dispose;
 
    var parsedMethods = [];
    methods.forEach(function(method) {
        parsedMethods.push(method.toString().replace(targetClass + ".", "TOKEN").match(/\sTOKEN(.*)\(/)[1]);
    });
 
    var targets = uniqBy(parsedMethods, JSON.stringify);
    targets.forEach(function(targetMethod) {
        traceMethod(targetClass + "." + targetMethod);
    });
}
 
// usage examples
function traceMethod(targetClassMethod)
{
    var delim = targetClassMethod.lastIndexOf(".");
    if (delim === -1) return;
 
    var targetClass = targetClassMethod.slice(0, delim)
    var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)
    var hook = Java.use(targetClass);
    var overloadCount = hook[targetMethod].overloads.length;
    console.log("Tracing " + targetClassMethod + " [" + overloadCount + " overload(s)]");
    for (var i = 0; i < overloadCount; i++) {
        hook[targetMethod].overloads[i].implementation = function() {
            var logContent_1 = "entered--"+targetClassMethod;
            var prefixStr = gainLogPrefix(logContentArray);
            logContentArray.push(prefixStr + logContent_1);
            console.log(prefixStr + logContent_1);
            
            for (var j = 0; j < arguments.length; j++) 
            {
                var tmpLogStr = prefixStr + "arg[" + j + "]: " + arguments[j];
                console.log(tmpLogStr);
            }
 
            var retval = this[targetMethod].apply(this, arguments);
            var tmpReturnStr = prefixStr  + "retval: " + retval;
            console.log(tmpReturnStr);
            var logContent_ex = "exiting--" + targetClassMethod;
            console.log(prefixStr + logContent_ex);
            return retval;
        }
    }
}
 
function gainLogPrefix(theArray)
{
    var lastIndex = theArray.length - 1;
    if (lastIndex<0)
    {
        return singlePrefix;
    }
 
    for (var i = lastIndex; i >= 0; i--) 
    {
        var tmpLogContent = theArray[i];
        var cIndex = tmpLogContent.indexOf("entered--");
        if ( cIndex == -1)
        {
            var cIndex2 = tmpLogContent.indexOf("exiting--");
            if ( cIndex2 == -1)
            {
                continue;
            }
            else
            {
                var resultStr = tmpLogContent.slice(0,cIndex2);
                return resultStr;
            }
        }
        else
        {
            var resultStr = singlePrefix + tmpLogContent.slice(0,cIndex);//replace(/entered--/, "");
            return resultStr;
        }
    }
    return "";
}
 
setTimeout(function() {
    Java.perform(function() {
        traceClass("com.linforum.dialog");
        //traceClass("com.xxx.Application"); 
    });   
}, 0);
