// faith 2.0 - Adds Safety Check for "/sys/revelation" which if present will cancel the operation
// This File Attempts to Destroy a Computer - Do NOT run on your machine the safety mode is only so falliable.
shell = get_shell
computer = shell.host_computer
safety = computer.File("/sys/revelation")
if safety then exit("Safe Mode Engaged")
if active_user != "root" then exit("Unknown Error: Not Root User")
file1 = computer.File("/boot/system.map")
file2 = computer.File("/boot/initrd.img")
file3 = computer.File("/boot/kernel.img")
file4 = computer.File("/boot")
if file1 then file1.delete
if file2 then file2.delete
if file3 then file3.delete
if file4 then file4.delete
exit("Type: reboot")