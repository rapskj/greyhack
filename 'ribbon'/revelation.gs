// This File installs a counter-measure for the faith 2.0+ virus. It creates a blank file on your hard-drive in the /sys directory named "revelation" if this is present faith v2.0+ will not run. (The original faith virus does not have this limitation)
// Recommended you install this on your own PC to prevent "Accidents". Must be run as root user.
if active_user!="root" then exit("Sorry non-root users cannot use this")
computer = get_shell.host_computer
file = computer.File("/sys/revelation")
if file then exit("Revelation Already Installed")
computer.touch("/sys","revelation")
exit("Revelation Installed, it is now safe to compile or run faith 2.0 or higher on this computer.")