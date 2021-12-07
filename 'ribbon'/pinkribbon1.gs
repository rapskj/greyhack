clear_screen

hc=get_shell.host_computer
mx = include_lib("/lib/metaxploit.so")
crypto = include_lib("/lib/crypto.so")
line=("-----------------------------")

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

hackrouter = function(ip,lan)


	r=get_router(ip)
	
	netsess = mx.net_use(ip)
	
	lib = netsess.dump_lib
	addrs = mx.scan(lib)
	
	exhandler = function(addr,unsec)
		ex = lib.overflow(addr,unsec,lan)


		if ask == 0 then
			return
		end if
		
		if typeof(ex) == "computer" then

		pwd = ex.File("/etc/passwd")
		if pwd != null then
			print(pwd.get_content)
		end if

		end if

		if typeof(ex) == "shell" then
			print("Pink Ribbon has found a shell\nwould you like too use it? y/n")
			said = user_input("Answer:")

			if said == "y" then ex.start_terminal end if

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






hack = function(ip,port)
	
	r=get_router(ip)
	
	netsess = mx.net_use(ip,port)
	
	lib = netsess.dump_lib
	addrs = mx.scan(lib)
	
	exhandler = function(addr,unsec)
		ex = lib.overflow(addr,unsec)
		
		if typeof(ex) == "computer" then

			pwd = ex.File("/etc/passwd")
			if not pwd == null then
				if pwd.has_permission("r") then
					print(pwd.get_content)
				else
					print("<color=red>Pink Ribbon doesn't have permission too read /etc/passwd</color>")
				end if
			else
				print("<color=red>The password file seems too have been deleted...</color>")
			end if
			
		end if
		
		if typeof(ex) == "shell" then
			print("Pink Ribbon has found a shell\nwould you like too use it? y/n")
			said = user_input("Answer:")
			if said == "y" then ex.start_terminal end if
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




//funciton

system_message = function(text)
	print("<#741b47>[Info]></color> <color=white><b>Pink Ribbon v1.0</b></color>")
	print("<#741b47>[Info]></color> Advanced hacking tool made by <color=white><b>ar0/Ren</b></color>")
	print("<#741b47>[Info]></color> This script is not fully functional, updates will be made.")


	print("\n<#c90076>[Notification]></color> This can be also launched by using 'PinkRibbon remote' or 'PinkRibbon remote [ip]'")
	print("\n<#c90076>[Notification]></color> 'PinkRibbon local' and 'PinkRibbon rshell'")

	print("<#c90076>[Notification]></color> Type 'help' to show command info.")
end function



menu = function()
system_message
	
usr_shell = function()
		message = user_input("\n<color=#ff0698>Pink Ribbon:<#741b47>[Main]</color> > </color>")
		args = message.split(" ")


		if args[0] == "help" then
		print(line)
		print("<color=white><b><u>Commands</u>		<u>Information</u></b></color>")
		print("<color=white><b>help</b></color>			-> <#5b5b5b>Shows this info</color>")
		print("<color=white><b>system</b></color>			-> <#5b5b5b>Securing pc/autocracking wifi/pc destruction</color>")
		print("<color=white><b>remote</b></color>			-> <#5b5b5b>Remote hacking</color>")
		print("<color=white><b>local</b></color>			-> <#5b5b5b>Local hacking</color>")
		print("<color=white><b>exit</b></color>			-> <#5b5b5b>Close PinkRibbon</color>")
		print(line)
		end if


		if args[0] == "system"then
			clear_screen
			system_shell
		end if


		if args[0] == "remote" then
			clear_screen
			remote_shell
		end if






		if args[0] == "exit" then
			exit
			
		end if




		usr_shell
	
end function


remote_shell = function()
	print("<#c90076>[Notification]</color> Type 'help' to show command info")
	print("<#c90076>[Notification]</color> Type 'return' if you want to go to Main")
	message = user_input("\n<color=#ff0698>Pink Ribbon:<#741b47>[Remote]</color> > </color>")

	args = message.split(" ")

	if args[0] == "help" then
	print(line)
	print("\n<color=white><b><u>Commands</u>							  <u>Information</u></b></color>")
	print("<color=white><b>help</b>									-> <#5b5b5b>Shows this info</color>")
	print("<color=white><b>nmap</b>									-> <#5b5b5b>Activate nmap")
	print("<color=white><b>hack</b>									-> <#5b5b5b>Hack selected port")
	print("<color=white><b>hackrouter [lan ip]</b>				-> <#5b5b5b>Hacks this lan through the router")
	print("<color=white><b>smtp [port]</b>							-> <#5b5b5b>Shows smtp info")
	print(line)	
	end if


	if args[0] == "return" then
	usr_shell
	end if 

	if args[0] == "nmap" then

		target = user_input("\n<#c90076>[Notification] Target Ip/Domain> </color>")

		if target == "shell" then system_shell end if 

		target_router = get_router(target)

		target_domain = nslookup(target)

		if not target_domain then
			print("\n<#c90076>[Notification] Valid domain detected, using IP instead..</color")
			target_router = target_domain
		end if

		if target_router == null then

			menu
		end if

		if not target_domain == "Not found" then

		target_router = get_router(target_router)
			
		end if

		usedports = target_router.used_ports

		print("\n<color=green>			Port information</color>\n")
			
			for port in usedports
				service = target_router.port_info(port)
				
				if port.is_closed then
					print(service+" "+port.port_number+" "+port.get_lan_ip+" <color=green>[CLOSED]</color>")
				else
					print(service+" "+port.port_number+" "+port.get_lan_ip+" <color=green>[OPEN]</color>")
				end if
				
			end for
			
			print("\n<color=green>			WHOIS information</color>")
			print(whois(target_router.public_ip)+"\n")
			
			print("\n<color=green>			Other information</color>\n")
			kernel = mx.net_use(target_router.public_ip).dump_lib.version
			print("kernel_router: "+kernel+"\n")

		
	end if



	if args[0] == "hack" then

	port = args[1].to_int
	hack(target_router.public_ip,port)
		
	end if

	if args[0] == "hackrouter" then
		lan = args[1]
		hackrouter(target_router.public_ip, lan)
	end if





	

	remote_shell

end function



	system_shell = function()
	//print("<#741b47>[Info]></color> <color=white><b>Pink Ribbon v1.0</b></color>")
	//print("<#741b47>[Info]></color> <#5b5b5b>Access various Pink Ribbon sys commands</color>")
	print("<#c90076>[Notification]</color> Type 'help' to show command info")
	print("<#c90076>[Notification]</color> Type 'return' if you want to go to Main")

	message = user_input("\n<color=#ff0698>Pink Ribbon:<color=green>[System]</color> > </color>")
	args = message.split(" ")

	if args[0] == "help" then
		print(line)
		print("\n<color=white><b><u>Commands</u>		<u>Information</u></b></color>")
		print("<color=white><b>help</b></color>			-> <#5b5b5b>Shows this info</color>")
		print("<color=white><b>faith</b></color>			-> <#5b5b5b>PC destruction</color>")
		print("<color=white><b>secure</b></color>			-> <#5b5b5b>Securing PC</color>")
		print(line)
	end if

	

	if args[0] == "secure" then
		if not active_user == "root" then
			print("<color=red>Pink Ribbon cannot be sure that this command worked due to no root access</color>")	
		end if

		if active_user != "root" then exit("Sorry, non-root users cannot use this.")
		computer = get_shell.host_computer
		file = computer.File("/sys/revelation")
		if file then exit("<color=red>Revelation already installed.</color>")
		computer.touch("/sys", "revelation")
		exit("<color=red>Revelation installed and <color=white><b>faith</b></color> is safe to use.</color>")
		
	

		
	get_shell.host_computer.File("/").chmod("o-wrx",1)
	get_shell.host_computer.File("/").chmod("u-wr",1)
	get_shell.host_computer.File("/").chmod("g-wr",1)

	pwd = get_shell.host_computer.File("/etc/passwd")

	if not pwd == null then
		pwd.delete()
		
	end if
		print("<color=green>Machine secured.")
		print("<color=red>You have to run sudo an get root before you can do anything or your machine</color>")

	end if

	if args[0] == "faith" then
		shell = get_shell
		computer = shell.host_computer
		safety = computer.File("/sys/revelation")
		if safety then exit("<color=red><b>Safety mode engaged.</b></color>")
		if active_user != "root" then exit("<color=red><b>Error: Non-root user</b></color>")
		file1 = computer.File("/boot/system.map")
		file2 = computer.File("/boot/initrd.img")
		file3 = computer.File("/boot/kernel.img")
		file4 = computer.File("/boot")
		if file1 then file1.delete
		if file2 then file2.delete
		if file3 then file3.delete
		if file4 then file4.delete
		exit("Type: reboot")
	end if

	if args[0] == "return" then
		clear_screen
		usr_shell
	end if

	system_shell

end function












usr_shell
menu

	
end function
menu

