Commands["scan"] = {"Name": "scan","Description": "Scans an ip/domain for vulns.","Args": "[ip/domain] [(opt) port] [(opt) local ip]","Shell":false}
    Commands["scan"]["Run"] = function(args,pipe)
        ip = args[0]
        port = null
        ipAddr = null
        localIp = null
    
        globals.H = []
    
        if not is_valid_ip(ip) then
            if is_valid_ip(nslookup(ip)) then
                ip = nslookup(ip)
            else
                return error("IP not found!")
            end if
        end if
        ipAddr = ip
    
        if args.len >= then port = args[1]
        if args.len == 3 then localIp = args[2]
        
        metaxploit = loadMetaXPloit()
    
        if is_lan_ip(ipAddr) then
            routerLib = metaxploit.net_use(globals.rout.public_ip)
            metaLibs = extractMetaLibs(ipAddr)
        else
            router = getRouter(ipAddr)
            routerLib = metaxploit.net_use(router.public_ip)
            metaLibs = extractMetaLibs(router)
        end if
    
        for metaLib in metaLibs
            if port then
                if str(metaLib.port_number) != str(port) then continue
            end if
    
            if loadExploits(metaLib.metaLib).len == 0 then
                scanTarget(metaLib.metaLib)
            end if
            exploits = loadExploits(metaLib.metaLib)
            
            localIp = metaLibs.local_ip
            if args.len == 3 then localIp = args[2]
            metaLibs.local_ip = localIp
            
            exps = []
            for exploit in exploits
                exploitObj = runExploit(exploit, metaLib.metaLib, localIp)
                exps.push(exploitObj)
            end for
    
            globals.H.push({"exploits":exps,"metaLib":metaLib})
        end for
    
        return Print("Done Scanning! Run: 'exploits' for the found vulns")
    end function