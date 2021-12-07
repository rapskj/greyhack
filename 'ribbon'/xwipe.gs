// Self Destruct: Removes trace-able iles from a PC - starting with the most vital ones
// After Runnning this program and rebooting the system will no longer work.
if active_user != "root" then exit("Sorry only root user can run")
computer = get_shell.host_computer
configs_root = computer.File("/root/Config").get_files
// First we'll delete ANY Config Data for the Root User
for config_root in configs_root
	file = config_root
	file.delete
end for
home_folder = computer.File("/home")
folders_one = home_folder.get_folders
// Now the Other Users
for folder in folders_one
	files = computer.File(folder.path+"/Config").get_files
	for file in files
		file.delete
	end for
end for
// Now the Password File
file = computer.File("/etc/passwd")
file.delete
files = computer.File("/root").get_files
for file in files
	file.delete
end for
// My Custom Remote Scanner
file = computer.File("/bin/netscan")
if file then
	file.delete
end if
// My Anti-virus for Faith
file = computer.File("/sys/revelation")
if file then
	file.delete
end if
// If Crypto is a loaded lib delete it next
file = computer.File("/lib/crypto.so")
if file then
	file.delete
end if
// Now metaxploit.so
file = computer.File("/lib/metaxploit.so")
if file then
	file.delete
end if
// Make sure the ScanLan is unable to run.
file = computer.File("/usr/bin/ScanLan.exe")
if file then
	file.delete
end if
// Remove AdminMonitor.exe at this late stage.
file = computer.File("/usr/bin/AdminMonitor.exe")
if file then
	file.delete
end if
//  Now we remove critical connection files
file = computer.File("/bin/ifconfig")
if file then
	file.delete
end if
file = computer.File("/bin/iwconfig")
if file then
	file.delete
end if
// This is a file that is given by Nysch's Guide.
file = computer.File("/bin/supersudo")
if file then
	file.delete
end if
// If you use supersudo this shouldn't be an issue but let's remove sudo just in case.
file = computer.File("/bin/sudo")
if file then
	file.delete
end if
// Wipe the system log completely.
file = computer.File("/var/system.log")
file.delete
// Delete the Boot System
file = computer.File("/boot/system.map")
file.delete
file = computer.File("/boot/initrd.img")
file.delete
file = computer.File("/boot/kernal.img")
file.delete
file = computer.File("/boot")
file.delete
// Wipe the Log AGAIN for good measure.
file = computer.File("/var/system.log")
file.delete
// Print output to the user.
print("Important Files Destroyed, Please double check and reboot")
print("Ending Procs:"+computer.show_procs)
// Attempt to Auto-run a reboot (may fail if the file is removed)
computer.launch("/bin/reboot")