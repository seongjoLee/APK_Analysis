import frida, sys

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)

jscode = """
Java.perform(function () {
  // Function to hook is defined here
  var MainActivity = Java.use('com.unity3d.player.UnityPlayerActivity');

  // Whenever button is clicked
  var onTouchEvent = MainActivity.onTouchEvent;
  onTouchEvent.implementation = function (v) {
    // Show a message to know that the function got called
    send('onTouchEvent');

    // Call the original onTouchEvent handler
    onTouchEvent.call(this, v);

    // Set our values after running the original onClick handler
    this.m.value = 0;
    this.n.value = 1;
    this.cnt.value = 999;

    // Log to the console that it's done, and we should have the flag!
    console.log('Done:' + JSON.stringify(this.cnt));
  };
});
"""
