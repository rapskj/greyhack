clear_screen

hc=get_shell.host_computer
mx = include_lib("/lib/metaxploit.so")
crypto = include_lib("/lib/crypto.so")
line=("--------------------------------------------------------------------------")


if not mx then
	mx = include_lib(hc.current_path+"/metaxploit.so")
	if not mx then
		exit("Please install metaxploit.so in /lib or in installation directory.")
	end if
end if


if not crypto then
	crypto = include_lib(hc.current_path+"/crypto.so")
	if not crypto then
		exit("Please install crypto.so in /lib or in installation directory.")
	end if
end if



sys_msg = function(text)
print("<#841dea>              ___ </color>")
print("<#841dea>             / _ \</color>")
print("<#841dea>   __ _ _ __| | | |</color>")
print("<#841dea>  / _` | '__| | | |</color>")
print("<#841dea> | (_| | |  | |_| |</color>")
print("<#841dea>  \__,_|_|   \___/ </color>")
print("<#6fa8dc>-------------------------------------<#c90076><b>[Main]</b></color>-------------------------------------</color>")

print("<#741b47>[Info]> </color><color=white><b>Version v1.0</b></color>")
print("<#741b47>[Info]> </color><color=white><b>Made by ar0/<#fc0cf4>Ren</color></color>")
print("<#741b47>[Info]> </color><color=white><b>Type 'help' to see commands.</b></color>")

end function //end sys_msg

sysshell_msg = function(text)

print("<#841dea>              ___ </color>")
print("<#841dea>             / _ \</color>")
print("<#841dea>   __ _ _ __| | | |</color>")
print("<#841dea>  / _` | '__| | | |</color>")
print("<#841dea> | (_| | |  | |_| |</color>")
print("<#841dea>  \__,_|_|   \___/ </color>")
		

print("<#6fa8dc>-------------------------------------<#c90076><b>[System]</b></color>-------------------------------------</color>")
print("<#c90076>[Notification]</color><color=white><b> Type 'help' to show command info.</b></color>")
print("<#c90076>[Notification]</color><color=white><b> Type 'return' if you want to go to Main</b></color>")

	
end function //end sysshell_msg


remote_msg = function(text)
print("<#841dea>              ___ </color>")
print("<#841dea>             / _ \</color>")
print("<#841dea>   __ _ _ __| | | |</color>")
print("<#841dea>  / _` | '__| | | |</color>")
print("<#841dea> | (_| | |  | |_| |</color>")
print("<#841dea>  \__,_|_|   \___/ </color>")
		

print("<#6fa8dc>-------------------------------------<#c90076><b>[Remote]</b></color>-------------------------------------</color>")
print("<#c90076>[Notification]</color><color=white><b> Type 'help' to show command info.</b></color>")
print("<#c90076>[Notification]</color><color=white><b> Type 'return' if you want to go to Main.</b></color>")
print("<#c90076>[Notification]</color><color=white><b> Command 'nmap' cannot be executed without rhost.</b></color>")
	
end function

 shell_command_root = function(shell)
	print("<#c90076>[Notification]</color><color=white><b> Type 'help' to show command info.</b></color>")
	print("<#c90076>[Notification]</color><color=white><b> Type 'exit' / 'back' to scan another ip.</b></color>")
	message = user_input("<#3d85c6>[<#3d85c6>S»</color><color=red>root</color><#ff0698>@ar0</color>]:</color>")
	args = message.split(" ")

	if args[0] == "help" then
		print("<color=white><b><u>Commands</u>			<u>Information</u></b></color>")
		print("<color=white><b>sys</b></color>			-> <#5b5b5b>Show all file system</color>")
		print("<color=white><b>dump</b></color>			-> <#5b5b5b>Dump credentials.</color>")
		print("<color=white><b>hash -h [user:hash or hash]</color>		-> <#5b5b5b>Cracks the password hash.</color>")
		print("<color=white><b>hash -f [pathfile]</color>		-> <#5b5b5b>Cracks all the password hashes inside a file.</color>")
		print("<color=white><b>ps</b></color>				-> <#5b5b5b>Show processes.</color>")
		print("<color=white><b>kill [PID]</b></color>			-><#5b5b5b>Closes process <color=white>[ex. kill 1919]</color></color>")
		print("<color=white><b>cat [filepath]</b></color>		-><#5b5b5b>Show the content of specified file.</color>")
		print("<color=white><b>rename [filepath] [new name]</b></color>		-><#5b5b5b>Rename the specified file.</color>")
		print("<color=white><b>useradd [user] [passwd]</b></color>		-><#5b5b5b>Add another user.</color>")
		print("<color=white><b>userdel [user]</b></color>		-><#5b5b5b>Delete specified user.</color>")
		print("<color=white><b>chmod [filepath] [permission]</b></color>		-><#5b5b5b>Change permissions of the file path.</color>")
		print("<color=white><b>download [remote filepath] [home path]</b></color>		-><#5b5b5b>Download a file to home pc.</color>")
		print("<color=white><b>upload [home filepath] [remote filepath]</b></color>		-><#5b5b5b>Upload a file to remote pc.</color>")
		print("<color=white><b>delete [filepath]</b></color>		-><#5b5b5b>Delete the specified file</color>")
		print("<color=white><b>term</b></color>		-> <#5b5b5b>Start standart terminal</color>")
		print("<color=white><b>results</b></color>	-><#5b5b5b>Show results from recent exploit.</color>")	
	end if
	shell_command
end function


hack = function(ip,port)
r=get_router(ip)
netsess = mx.net_use(ip,port)
lib = netsess.dump_lib
addrs = mx.scan(lib)

	exhandler = function(addr,unsec)
		objects = []
		ex = lib.overflow(addr,unsec)
		info = "# Object Perm"

		print_objects = function(objects)
		for ex in objects

		object_info = lib.overflow
		
			
		end for
			
		end function
		
		if typeof(ex) == "computer" then

			pwd = ex.File("/etc/passwd")
			if not pwd == null then
				if pwd.has_permission("r") then
					print(pwd.get_content)
				else
					print("<color=red>no perm permission to read /etc/passwd</color>")
				end if
			else
				print("<color=red>The password file seems to have been deleted...</color>")
			end if
			
		end if
		
		if typeof(ex) == "shell" then
			print("test")
			said = user_input("Answer:")
			if said == "y" then ex.start_terminal end if
		end if
		
		
		
	end function
	objects = []
	for addr in addrs
		
		info = mx.scan_address(lib,addr)
		info = info.remove("decompiling source...").remove("searching unsecure values...")
		info = info[2:]
		
		while info.indexOf("Unsafe check: ") != null or info.indexOf("<b>") != null or info.indexOf("</b>") != null
			info = info.remove("Unsafe check: ").remove("<b>").remove("</b>")
		end while
		
		while info.indexOf("loop in array ") != null
			info = info.replace("loop in array ", "<tag>")
		end while
		
		while info.indexOf("string copy in ") != null
			info = info.replace("string copy in ", "<tag>")
		end while
		
		while info.indexOf("<tag>") != null
			a = info.indexOf("<tag>") + 5
			info = info.remove(info[:a])
			str = info[:info.indexOf(".")]
			exhandler(addr,str)
		end while
		
		//print(info)
		
	end for
end function
objects = []



	hackrouter = function(ip,lan)
	r = get_router(ip)

	netsess = mx.net_use(ip)

	lib = netsess.dump_lib
	addrs = mx.scan(lib)

	exhandler = function(addr,unsec)
	ex = lib.overflow(addr,unsec,lan)

	if typeof(ex) == "computer" then
		pwd = ex.File("/etc/passwd")
		if pwd != null then
			print(pwd.get_content)
		end if
	end if

	if typeof(ex) == "shell" then
						print("<#c90076>[Notification]</color><color=white><b> Shell has been found. Do you want to use it? y/n</b></color>")
						said = user_input("Answer:")

						if said == "y"  then
							ex.start_terminal
						end if
					end if
					
		
	end function

	for addr in addrs
		
		info = mx.scan_address(lib,addr)
		info = info.remove("decompiling source...").remove("searching unsecure values...")
		info = info[2:]
		
		while info.indexOf("Unsafe check: ") != null or info.indexOf("<b>") != null or info.indexOf("</b>") != null
			info = info.remove("Unsafe check: ").remove("<b>").remove("</b>")
		end while
		
		while info.indexOf("loop in array ") != null
			info = info.replace("loop in array ", "<tag>")
		end while
		
		while info.indexOf("string copy in ") != null
			info = info.replace("string copy in ", "<tag>")
		end while
		
		while info.indexOf("<tag>") != null
			a = info.indexOf("<tag>") + 5
			info = info.remove(info[:a])
			str = info[:info.indexOf(".")]
			exhandler(addr,str)
		end while
		
		//print(info)
		
	end for
	

		
	end function



menu = function()
sys_msg
	
	usr_shell = function()
	message = user_input("\n<#ff0698><b>ar0</b></color>@<#741b47><b>Main</b></color>> ")
	args = message.split(" ")

	if args[0] == "help" then
		print(line)
		print("<color=white><b><u>Commands</u>			<u>Information</u></b></color>")
		print("<color=white><b>help</b></color>			-> <#5b5b5b>Shows this info</color>")
		print("<color=white><b>system</b></color>			-> <#5b5b5b>Securing pc/autocracking wifi/pc destruction</color>")
		print("<color=white><b>remote</b></color>			-> <#5b5b5b>Remote hacking</color>")
		print("<color=white><b>local</b></color>			-> <#5b5b5b>Local hacking</color>")
		print("<color=white><b>exit</b></color>			-> <#5b5b5b>Close program</color>")
		print(line)

	end if

	if args[0] == "system" then
		clear_screen
		sys_shell_menu
	end if

	if args[0] == "remote" then
		clear_screen
		remote_shell_menu
	end if

	if args[0] == "exit" then
		exit
	end if



	usr_shell
	end function //end usr_shell

	sys_shell_menu = function()
		sysshell_msg
		
		sys_shell = function()
			message = user_input("\n<#ff0698><b>ar0</b></color>@<#741b47><b>System</b></color>> ")
		args = message.split(" ")

		if args[0] == "help" then
		print(line)
		print("<color=white><b><u>Commands</u>		<u>Information</u></b></color>")
		print("<color=white><b>help</b></color>			-> <#5b5b5b>Shows this info</color>")
		print("<color=white><b>faith</b></color>			-> <#5b5b5b>PC destruction</color>")
		print("<color=white><b>secure</b></color>			-> <#5b5b5b>Securing PC</color>")
		print("<color=white><b>return</b></color>			-> <#5b5b5b>Return to main</color>")
		print(line)
		end if


		if args[0] == "return" then
			clear_screen
			sys_msg
			usr_shell
		end if

		sys_shell

		end function //end sys_shell
		sys_shell
	end function //end sys_shell_menu


	remote_shell_menu = function()

	remote_msg

	remote_shell = function(selection)
		message = user_input("\n<#ff0698><b>ar0</b></color>@<#741b47><b>Remote</b></color>>")
		args = message.split(" ")



		if args[0] == "help" then
			
			print(line)
			print("<color=white><b><u>Commands</u>							  <u>Information</u></b></color>")
			print("<color=white><b>rhost</b></color>									-><#5b5b5b> Set target ip/domain</color>")
			print("<color=white><b>nmap</b></color>									-><#5b5b5b> Show nmap</color>")
			print("<color=white><b>hack [port]</b></color>							-> <#5b5b5b>Hack selected port</color>")
			print("<color=white><b>routerhack [lan]</b></color>					-> <#5b5b5b>Hack router</color>")
			print(line)	

		end if

		if args[0] == "rhost" then
			add = args[1].to_int
			print("<#6a329f><b>RHOST:</b></color> "+ add)
		end if


		if args[0] == "nmap" then

			target_router = get_router(add)

			isLanIp = is_lan_ip(add)
			if isLanIp then
				target_router
			else
				target_router(add)
			end if


			print("\n")
			print("<#3d85c6>Target IP:</color> "+add)
			print("\n")

			print_ports = function(ports)
			info = "PORT STATE SERVICE VERSION HOST"
			if typeof(ports) == "string" then return print(ports) 
			
			if ports.len == 0 then return print("<#6a329f>Scan finished. No open ports.</color>"+"\n")

			for port in ports
				service_info = target_router.port_info(port)
				lan_ips = port.get_lan_ip
				port_status = "open"

				if(port.is_closed and not isLanIp) then
					port_status = "closed"
				end if
			info = info + "\n" + port.port_number + " " + port_status + " " + service_info + " " + lan_ips
			end for
			print(format_columns(info) + "\n")
				
			end function

			ports = []
			for lan in target_router.devices_lan_ip

			ports = ports+target_router.device_ports(lan)
				
			end for
			print_ports(ports)

			print("\n<#6a329f>WHOIS information</color>")
			print(whois(target_router.public_ip)+ "\n")

			print("\n<#6a329f>Other information</color>\n")
			kernel = mx.net_use(target_router.public_ip).dump_lib.version
			print("kernel_router: "+kernel+"\n")


		end if

		if args[0] == "hack" then
			target_router = get_router(add)
			port = args[1].to_int
			hack(target_router.public_ip,port)
			
		end if

		if args[0] == "routerhack" then
			lan = args[1]
			hackrouter(target_router.public_ip,lan)
		end if




		if args[0] == "return" then
			clear_screen
			sys_msg
			usr_shell
		end if
		remote_shell

	end function //end remote shell
	remote_shell
	end function //end remote_shell_menu




usr_shell
menu

end function //end menu
menu