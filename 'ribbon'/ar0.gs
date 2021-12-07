clear_screen
globals.hc = get_shell.host_computer
globals.hs = get_shell
globals.home_folder = hc.File("/root/a0")
globals.objects = []
globals.lsCheck = true 
folder = null 
isFile = false 

if params.len > 0 then i1 = params[0] else i1 = null 
if params.len > 1 then i2 = params[1] else i2 = null 
if params.len > 2 then i3 = params[2] else i3 = null

while lsCheck = true
	globals.userList = []
	subFolderFiles = null
	subOutput = ""
	mult = 0.001
	files = null
	folderList = []
	fileList = ""
	fileMap = {}
	userSel = null
	fileCount = 0
	count = 0
	action = null
	subCheck = true 
	stop = false 
	noCheck = false 
	fileCheck = false 
	compCheck = false 
	shellCheck = false 
	remoteCheck = false 
	printCheck = false
end while



passwdprompt = user_input("<#E62377FF>Authentication: </color>", true)
password = "test"
version = "1.0"

if passwdprompt != password then exit("Authentication failed.")

line=("<#6fa8dc>--------------------------------------------------------------------------</color>")

if params.len == 0 or params[0] == "" then
	
end if


if home_folder == null then
	hc.create_folder("/root", "a0")
end if




sys_msg = function(text)
print("<#841dea>              ___ </color>")
print("<#841dea>             / _ \</color>")
print("<#841dea>   __ _ _ __| | | |</color>")
print("<#841dea>  / _` | '__| | | |</color>")
print("<#841dea> | (_| | |  | |_| |</color>")
print("<#841dea>  \__,_|_|   \___/ </color>")
print("<#6fa8dc>-------------------------------------<#c90076><b>[Main]</b></color>-------------------------------------</color>")
print("<#741b47>[Info]> </color><color=white><b>Current version: "+version+"</b></color>")
print("<#741b47>[Info]> </color><color=white><b>Welcome "+active_user+"</b></color>")
print("<#741b47>[Info]> </color><color=white><b>Made by ar0/<#fc0cf4>Ren</color></color>")

globals.mx = include_lib("/root/a0/metaxploit.so")
if not mx then
	globals.mx = include_lib("/lib/metaxploit.so")

	if not mx then
		print("<#c90076>[Notification]</color><color=white><b> Couldn't find metaxploit.so in /lib or /root/a0")
	end if
end if

globals.crypto = include_lib("/root/a0/crypto.so")
if not crypto then
	globals.crypto = include_lib("/lib/crypto.so")
	if not crypto then
		print("<#c90076>[Notification]</color><color=white><b> Couldn't find crypto.so in /lib or /root/a0")
	end if
end if


end function //end sys_msg


fwddisable = function(ip)
	r = get_router(ip)
	net_session = mx.net_use(ip)
	metalib = net_session.dump_lib
	addrs = mx.scan(metalib)

	exhandler = function(addr,unsec)
	ex = metalib.overflow(addr,unsec)

	if typeof(ex) == "number" then
		print("<color=white>Firewall disabled</color>")
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
	password = "hi"
	r=get_router(ip)
	vulnMap = {}
	
	net_session = mx.net_use(ip,port)
	metalib = net_session.dump_lib
	addrs = mx.scan(metalib)
	
	
	exhandler = function(addr,unsec)
		
		ex = metalib.overflow(addr,unsec,password)


		objects.push(ex)

		

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
			said = user_input("Answer:")
			if said == "y" then ex.start_terminal end if
		end if
		
		
		
	end function


	
	for addr in addrs
		
		info = mx.scan_address(metalib,addr)
		info = info.remove("decompiling source...").remove("searching unsecure values...")
		info = info[2:]
		
		
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
	
	
end function //end hack

menu = function()
sys_msg
	
	usr_shell = function()
	
	message = user_input("\n<#3d85c6>{<#3d85c6>------[C»</color><color=red>"+active_user+"</color>]------[<#f1c232>Public@"+hc.public_ip+"</color>--<#f1c232>Local@"+hc.local_ip+"</color>]------[<#93c47d>"+home_dir+"</color>]------}: </color>")
	args = message.split(" ")
	
	
	

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

	if args[0] == "fwdd" then
		fwddisable(target_router.public_ip)
	end if

	if args[0] == "ls" then
			folderPath = current_path
			folder = hc.File(folderPath)

			if folder == null then
				print("ls: No such file or directory")
				else
					if not folder.has_permission("r") then
						print("ls: permission denied")
					end if
			end if


			showDetails = 1

			subFiles = folder.get_folders + folder.get_files
			output = ""
			for subFile in subFiles
				nameFile = subFile.name 
				permission = subFile.permissions
				owner = subFile.owner
				size = subFile.size
				group = subFile.group

				if output.len > 0 then
					output = output + "\n"
				end if

				if showDetails then
					output = output + permission + " " + owner  + " " + group + " " + size + " " + nameFile
					else
						output = output + nameFile
				end if
			end for
			print(format_columns(output))
		end if

		if args[0] == "ps" then
			output = hc.show_procs
         print(format_columns(output))
		end if

		if args[0] == "wifi" then
			print("<#c90076>[Notification]</color> WIFI cracking menu.")
			print("<color=green><b>1. Crack all available WIFI</b></color>")
			print("<color=green><b>2. Crack specific WIFI</b></color>")

			pick = user_input("#:")
			pick = pick.to_int

			if pick == 1 then
				netwrks = get_shell.host_computer.wifi_networks("wlan0")
				c = 0
				l = {}

				for network in netwrks
					bssid = network.split(" ")[0]
					pwr = network.split(" ")[1].replace("%","")
					pwr = pwr.to_int
					essid = network.split(" ")[2]
					l[c] = [essid,pwr,bssid]
					print(c+". "+essid+" "+pwr)
					c=c+1
				end for
				p = user_input("#:").to_int
				opt = l[p]

				crypto.airmon("start","wlan0")
				crypto.aireplay(opt[2],opt[0],300000/pwr)

				if active_user == "root" then
					pass = crypto.aircrack("/root/file.cap")
					print("Password: "+pass)
					return
				end if

				pass = crypto.aircrack("/home/"+active_user+"/file.cap")
				print(pass)

			end if

			if pick == 2 then

            essid = user_input("ESSID:")
            pwr = user_input("PWR% ").to_int
            bssid = user_input("BSSID:")
            crypto.airmon("start","wlan0")

            crypto.aireplay(bssid,essid,300000/pwr)

            if active_user == "root" then
                pass = crypto.aircrack("/root/file.cap")
                print(pass)
            end if

            pass = crypto.aircrack("/home/"+active_user+"/file.cap")
            print(pass)

        end if



		end if

		if args[0] == "secure" then
			if not active_user == "root" then
				print("<color=red><b>No root.</b></color>")
			end if

			computer = get_shell.host_computer
			file = computer.File("/sys/def")
			if file then
				print("<color=red><b>Def exists.</b></color>")
			end if
			computer.touch("/sys","def")
		     get_shell.host_computer.File("/").chmod("o-wrx",1)
		     get_shell.host_computer.File("/").chmod("u-wr",1)
		     get_shell.host_computer.File("/").chmod("g-wr",1)
		
		     pwd = get_shell.host_computer.File("/etc/passwd")
		    if not pwd == null then
			 pwd.delete()	
		    end if
		
		print("<color=green>Machine secured</color>")
		end if

	if args[0] == "target" then
			add = args[1].to_int
			target_router = get_router(add)
			

			kernel = mx.net_use(target_router.public_ip).dump_lib.version

			isLanIp = is_lan_ip(add)
			if isLanIp then
				target_router
			else
				target_router(add)
			end if

			print("\n")
			print("<#3d85c6>Target IP:</color> <#3d85c6>[<b>"+add+"</b>]</color>")
			print("<#3d85c6>Local IP:</color> <#3d85c6>[<b>"+target_router.local_ip+"</b>]</color>")
			print("<#3d85c6>Kernel:</color> <#3d85c6>[<b>"+kernel+"</b>]</color>")
			print("<#3d85c6>WIFI:</color> <#3d85c6>[<b>"+target_router.essid_name+"</b>]</color>")

			
			
			print_ports = function(ports)
			
			info = "PORT STATE SERVICE VERSION HOST"
			if typeof(ports) == "string" then return print(ports) 
			
			if ports.len == 0 then return print("<#6a329f>Scan finished. No open ports.</color>"+"\n")

			for port in ports
				service_info = target_router.port_info(port)
				lan_ips = "<#6a329f>"+port.get_lan_ip+"</color>"
				port_status = "<color=green><b>open</b></color>"

				if(port.is_closed and not isLanIp) then
					port_status = "<color=red><b>closed</b></color>"
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

		end if

		if args[0] == "sc" then
			print("\n<#6a329f>WHOIS information</color>")
			print(whois(target_router.public_ip)+ "\n")
		end if

		if args[0] == "lmap" then
			

			target_router = get_router(add)
			firewall_rules = target_router.firewall_rules

			if typeof(firewall_rules) == "string" then return print(firewall_rules)
			print("\nScanning firewall rules...")
			if firewall_rules.len == 0 then return print("No rules found.")

			info = "ACTION PORT SOURCE_IP DESTINATION_IP"
			for rules in firewall_rules

				info = info + "\n" + rules
			end for
			print(format_columns(info) + "\n")
		end if

		if args[0] == "hack" then
			target_router = get_router(add)
			port = args[1].to_int
			hack(target_router.public_ip,port)
			
		end if

		if args[0] == "hash" then
			hash = args[1]
			print("\n<#fc0cf4>Cracking hash</color>\n")
			decrypt = crypto.decipher(hash)
			print("\n<#fc0cf4>Password: </color><color=white><color=white>"+decrypt+"</color>")
		end if



	usr_shell
	end function //end usr_shell


usr_shell
menu

end function //end menu
menu
