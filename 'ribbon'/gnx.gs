// GNX Program - (Author: Genex)

// Global Variables
hostComputer = get_shell.host_computer
scriptName = program_path.split("/")[-1]
scriptVersion = "v2.0"
isScriptRunning = true
isFirstRun = true
lastFolder = null
lastSeperator = null
fetchUserInput = null

// Command Initialization
mainCommands = ["help", "exit", "clear", "flist", "cfolder", "cfile", "dfolder", "dfile", "crackwifi"]

// Colour Initialization - Hex Codes
color = {}
color.white = "<color=#FFFFFF>"
color.red = "<color=#FF0000>"
color.blue = "<color=#2F9E90>"
color.orange = "<color=#F3441E>"
color.yellow = "<color=#C5C816>"
color.purple = "<color=#9B2AE9>"

PrintText = function(tColor, text)
    print(tColor + text + "</color>")
end function

ErrorText = function(text, ex) // text = Message String. ex = Boolean (True: Exit Program)
    print(color.red + "<b>Error</b>" + color.white + ": " + text + "</color>")
    if ex == true then
        ExitProgram()
    end if
end function

SyntaxText = function(text, ex) // text = Message String. ex = Boolean (True: Exit Program)
    print(color.blue + "<b>Syntax</b>" + color.white + ": " + text + "</color>")
    if ex == true then
        ExitProgram()
    end if
end function

Capitalise = function(varName) // Capitalises First Letter Of A String Variable
    return slice(varName, 0, 1).upper + slice(varName, 1)
end function

ScriptDetails = function() // Script Name, Version, & Author Name
    PrintText(color.orange, "<b>" + scriptName.upper + " Tool " + scriptVersion + " (" + color.white + "Author: Genex" + color.orange + ")</b>")
end function

ExitProgram = function() // Self-Explanatory
    isScriptRunning = false
    exit(color.red + "Exiting program...</color>")
end function

if params.len > 0 then // Script Starts With Only The Name Of The Script. Example: 'gnx' (No Further Parameters)
    SyntaxText(scriptName, true)
end if

CommandInput = function() // Check Commands. If First Run Then Display Script Details And A Help Message
    globals.fetchUserInput = user_input(color.white + "[$" + current_path + "] (User: " + active_user + ") > ").split(" ")
end function

CommandUnknown = function() // Check Commands. If Non-Existent, Print Message
    ErrorText("You have entered an unknown command.", false)
end function

GetFiles = function(fPath, parentPath) // Check Through Path To Print All Folders And Files Within
    listFolders = fPath.get_folders
    fileSeperator = " "
    seperatorCount = null
    for folder in listFolders
        isParentFolder = parent_path(folder.path)
        listFiles = folder.get_files
        if parentPath == isParentFolder then
            parentIterate = folder.path.replace("/", " ").split(" ")
            folderNames = PrintText(color.yellow, "|[" + folder.name + "] (" + folder.permissions + ")")
        else
            if folder.parent.path == lastFolder.parent.path then
                folderNames = PrintText(color.yellow, lastSeperator + "|[" + folder.name + "] (" + folder.permissions + ")")
            else
                childIterate = folder.path.replace("/", " ").split(" ")
                seperatorCount = childIterate.len - parentIterate.len
                fileSeperator = (fileSeperator * seperatorCount) * 2
                globals.lastSeperator = fileSeperator
                folderNames = PrintText(color.yellow, fileSeperator + "|[" + folder.name + "] (" + folder.permissions + ")")
            end if
        end if
        for file in listFiles
            if folder.parent.path == parentPath then
                PrintText(color.white, file.name + " (" + file.permissions + ")")
            else
                PrintText(color.white, lastSeperator + file.name + " (" + file.permissions + ")")
            end if
        end for
        fileSeperator = " "
        globals.lastFolder = folder
        GetFiles(hostComputer.File(folder.path))
    end for
end function

CreateFile = function(fPath, fName, isFolderOrFile) // Creates A New Folder Or File
    if isFolderOrFile == "file" then
        fName = fName + ".txt"
    end if
    getParentFile = hostComputer.File(fPath)
    getFile = hostComputer.File(fPath + "/" + fName)
    if getParentFile == null then
        ErrorText("The directory path you have entered does not exist.", false)
    else
        if not getParentFile.has_permission("w") then
            ErrorText("You do not have write permission to create a " + isFolderOrFile + " at this location.", false)
        else if getFile != null then
            ErrorText("A " + isFolderOrFile + " with the provided name already exists at this location.", false)
        else
            if isFolderOrFile == "folder" then
                createFile = hostComputer.create_folder(fPath, fName)
            else
                createFile = hostComputer.touch(fPath, fName)
            end if
            if createFile == 1 then
                PrintText(color.orange, Capitalise(isFolderOrFile) + " '" + fName + "' has been created at location " + fPath)
            else
                ErrorText(Capitalise(isFolderOrFile) + " has not been created. Check the provided name and try again.", false)
            end if
        end if
    end if
end function

DeleteFile = function(fPath, fName, isFolderOrFile) // Deletes A Folder Or File
    if isFolderOrFile == "file" then
        fName = fName + ".txt"
    end if
    getParentFile = hostComputer.File(fPath)
    getFile = hostComputer.File(fPath + "/" + fName)
    if getParentFile == null then
        ErrorText("The directory path you have entered does not exist.", false)
    else
        if not getParentFile.has_permission("w") then
            ErrorText("You do not have write permission to delete a " + isFolderOrFile + " from this location.", false)
        else if getFile == null then
            ErrorText("The " + isFolderOrFile + " name you provided does not exist at this location.", false)
        else
            if isFolderOrFile == "folder" and not getFile.is_folder then
                ErrorText("You are trying to delete a file. Use 'dfile' instead.", false)
            else if isFolderOrFile == "file" and getFile.is_folder then
                ErrorText("You are trying to delete a folder. Use 'dfolder' instead.", false)
            else
                getFile.delete
            end if
            if getFile then
                PrintText(color.orange, Capitalise(isFolderOrFile) + " '" + fName + "' has been deleted from location " + fPath)
            else
                ErrorText(Capitalise(isFolderOrFile) + " has not been deleted. Check the provided name and try again.", false)
            end if
        end if
    end if
end function

RenameFile = function(fPath, fName, nName, isFolderOrFile) // Renames A Folder Or File
    if isFolderOrFile == "file" then
        fName = fName + ".txt"
        nName = nName + ".txt"
    end if
    getParentFile = hostComputer.File(fPath)
    getFile = hostComputer.File(fPath + "/" + fName)
    if getParentFile == null then
        ErrorText("The directory path you have entered does not exist.", false)
    else
        if not getParentFile.has_permission("w") then
            ErrorText("You do not have write permission to rename a " + isFolderOrFile + " at this location.", false)
        else if getFile == null then
            ErrorText("The " + isFolderOrFile + " name you provided does not exist at this location.", false)
        else
            if isFolderOrFile == "folder" and not getFile.is_folder then
                ErrorText("You are trying to rename a file. Use 'rfile' instead.", false)
            else if isFolderOrFile == "file" and getFile.is_folder then
                ErrorText("You are trying to rename a folder. Use 'rfolder' instead.", false)
            else
                renamedFile = getFile.rename(nName)
            end if
            if getFile then
                PrintText(color.orange, Capitalise(isFolderOrFile) + " '" + fName + "' at " + fPath + " has been renamed to '" + nName + "'")
            else
                ErrorText(Capitalise(isFolderOrFile) + " has not been renamed. Check the provided name and try again.", false)
            end if
        end if
    end if
end function

GetContent = function(fPath, fName) // Fetches Content Of Specified File
    getParentFile = hostComputer.File(fPath)
    if hostComputer.File(fPath + "/" + fName + ".txt") then
        fName = fName + ".txt"
    end if
    getFile = hostComputer.File(fPath + "/" + fName)
    if getParentFile == null then
        ErrorText("The directory path you have entered does not exist.", false)
    else
        if not getParentFile.has_permission("r") then
            ErrorText("You do not have read permission to check the contents of files at this location.", false)
        else
            if not getFile.is_folder then
                if getFile then
                    if not getFile.has_permission("r") then
                        ErrorText("You do not have read permission to check the contents of file '" + fName + "'", false)
                    else
                        checkFile = getFile.get_content
                        if checkFile == "" then
                            ErrorText("The contents of file '" + fName + "' contains no data.", false)
                        else
                            PrintText(color.blue, "[File Content (" + fName + ")]")
                            print(checkFile)
                        end if
                    end if
                else
                    ErrorText("The file name you provided does not exist at this location.", false)
                end if
            else
                ErrorText("You are trying to read the content of a folder. Use 'flist' instead.", false)
            end if
        end if
    end if
end function

SetContent = function(fName, fContent, addOrReplace, isNewLine) // Sets Content Of Specified File (Only In Current Path)
    fPath = current_path
    if hostComputer.File(fPath + "/" + fName + ".txt") then
        fName = fName + ".txt"
    end if
    getFile = hostComputer.File(fPath + "/" + fName)
    if getFile then
        if not getFile.has_permission("w") then
            ErrorText("You do not have write permission to set the contents of file '" + fName + "'", false)
        else
            if not getFile.is_folder then
                if addOrReplace == "add" then
                    checkFile = getFile.get_content
                    if isNewLine == "true" then
                        setFile = getFile.set_content(checkFile + "\n" + fContent)
                    else
                        if checkFile == "" then
                            setFile = getFile.set_content(checkFile + fContent)
                        else
                            setFile = getFile.set_content(checkFile + " " + fContent)
                        end if
                    end if
                else
                    setFile = getFile.set_content(fContent)
                end if
                PrintText(color.orange, "File '" + fName + "' at location " + fPath + " has been updated.")
            else
                ErrorText("You are trying to set the content for a folder.", false)
            end if
        end if
    else
        ErrorText("The file name you provided does not exist at this location.", false)
    end if
end function

WifiCracker = function() // Scan, Print, Crack, And Connect To Wifi Networks
    cryptoLib = include_lib("/lib/crypto.so")
    if not cryptoLib then
        cryptoLib = include_lib(current_path + "crypto.so")
    else
        cryptoLib.airmon("start", "wlan0")
        networkList = hostComputer.wifi_networks("wlan0")
        networkNumber = 0
        for network in networkList
            networkNumber = networkNumber + 1
            network = network.split(" ")
            bssIdentifier = network[0]
            networkPower = network[1]
            essIdentifier = network[2]
            wifiNetworks = networkNumber + ") " + bssIdentifier + " " + networkPower + " " + essIdentifier
            PrintText(color.white, wifiNetworks)
        end for
        networkInput = user_input(color.white + "Selection (1 to " + networkNumber + "): ")
        if networkInput.len > 0 and networkInput.len <= networkNumber then
            networkInput = networkInput.to_int
            networkNumber = networkInput - 1
            networkInput = networkList[networkNumber]
            networkInput = networkInput.split(" ")
            bssIdentifier = networkInput[0]
            networkPower = networkInput[1].remove("%").to_int
            essIdentifier = networkInput[2]
            acksAmount = ceil(300000/networkPower)
            PrintText(color.orange, "Getting " + acksAmount + " acks...")
            cryptoLib.aireplay(bssIdentifier, essIdentifier, acksAmount)
            wifiPassword = cryptoLib.aircrack(current_path + "/file.cap")
            checkConnection = hostComputer.connect_wifi("wlan0", bssIdentifier, essIdentifier, wifiPassword)
            getFile = hostComputer.File(current_path + "/file.cap")
            getFile.delete
            if checkConnection == 1 then
                PrintText(color.orange, "Successfully connected to " + essIdentifier + ".")
            else if checkConnection then
                ErrorText("Error connecting to " + essIdentifier + ". Run 'crackwifi' again and select a different network.", false)
            else if checkConnection == null then
                ErrorText("Network cannot be found. [" + essIdentifier + "]", false)
            end if
        end if
    end if
end function

IpScanner = function(targetAddress) // IP Scanning
isLanIp = is_lan_ip(targetAddress)
    if isLanIp then
        targetRouter = get_router
    else
        targetRouter = get_router(targetAddress)
    end if
    if targetRouter == null then
        ErrorText("IP address is not found. Check again or try a different one.", false)
    else
        targetPorts = null
        if not isLanIp then
            targetPorts = targetRouter.used_ports
        else
            targetPorts = targetRouter.device_ports
        end if
        if targetPorts == null then
            ErrorText("IP address is not found. Check again or try a different one", false)
        else
            if typeof(targetPorts) == "string" then
                ErrorText("String: " + targetPorts)
            else
                info = "PORT STATE SERVICE VERSION LAN"
                PrintText(color.orange, "- Starting IP Scanner Tool (" + current_date + ") -")
                PrintText(color.orange, "Checking ports on target " + targetAddress + "...")
                if targetPorts.len == 0 then
                    PrintText(color.white, "No open ports have been found.")
                else
                    for port in targetPorts
                        serviceInfo = targetRouter.port_info(port)
                        lanAddresses = port.get_lan_ip
                        portStatus = "open"
                        if port.is_closed and not isLaniP then
                            portStatus = "closed"
                        end if
                        info = info + "\n" + port.port_number + " " + portStatus + " " + serviceInfo + " " + lanAddresses
                    end for
                    PrintText(color.white, format_columns(info) + "\n")
                end if
            end if
        end if
    end if
end function

while isScriptRunning // Infinite Loop To Listen For User Input (Unless Loop Is Broken Through Setting 'isScriptRunning' To False)
    if isFirstRun == true then
        ScriptDetails()
        PrintText(color.white, "Enter 'help' for a list of commands.")
        isFirstRun = false
    end if
    CommandInput()
    if fetchUserInput[0] == "help" then // Help Command
        if fetchUserInput.len > 1 then
            SyntaxText(fetchUserInput[0], false)
        else
            listCommands = mainCommands.join(", ")
            PrintText(color.purple, "Commands List" + color.white + " - " + listCommands)
        end if
    else if fetchUserInput[0] == "exit" then // Exit Command
        if fetchUserInput.len > 1 then
            SyntaxText(fetchUserInput[0], false)
        else
            ExitProgram()
        end if
    else if fetchUserInput[0] == "flist" or fetchUserInput[0] == "fl" then // Folder & File Listing Command
        if fetchUserInput.len == 1 then
            SyntaxText("flist/fl <opt: directory path>", false)
            currentPath = hostComputer.File(current_path)
            GetFiles(currentPath, currentPath.path)
        else if fetchUserInput.len == 2 then
            currentPath = hostComputer.File(fetchUserInput[1])
            if currentPath then
                GetFiles(currentPath, fetchUserInput[1])
            else
                ErrorText("The destination path does not exist.", false)
            end if
        else if fetchUserInput.len > 2 then
            SyntaxText("flist/fl <opt: directory path>", false)
        end if
    else if fetchUserInput[0] == "clear" then // Clears Terminal Screen
        if fetchUserInput.len > 1 then
            SyntaxText(fetchUserInput[0], false)
        else
            clear_screen
        end if
    else if fetchUserInput[0] == "cfolder" or fetchUserInput[0] == "cfile" then // Create New Folder Or File
        if fetchUserInput[0] == "cfolder" then
            isFolderOrFile = "folder"
        else
            isFolderOrFile = "file"
        end if
        if fetchUserInput.len == 1 or fetchUserInput.len > 3 then
            SyntaxText(fetchUserInput[0] + " <" + isFolderOrFile + " name> <opt: directory path>", false)
        else
            if fetchUserInput.len == 2 then
                filePath = current_path
            else if fetchUserInput.len == 3 then
                filePath = fetchUserInput[2]
            end if
            if fetchUserInput[1].indexOf(".") then
                ErrorText("That " + isFolderOrFile + " name contains an invalid character.")
            else
                CreateFile(filePath, fetchUserInput[1], isFolderOrFile)
            end if
        end if
    else if fetchUserInput[0] == "dfolder" or fetchUserInput[0] == "dfile" then // Delete Specified Folder Or File
        if fetchUserInput[0] == "dfolder" then
            isFolderOrFile = "folder"
        else
            isFolderOrFile = "file"
        end if
        if fetchUserInput.len == 1 or fetchUserInput.len > 3 then
            SyntaxText(fetchUserInput[0] + " <" + isFolderOrFile + " name> <opt: directory path>", false)
        else
            if fetchUserInput.len == 2 then
                filePath = current_path
            else if fetchUserInput.len == 3 then
                filePath = fetchUserInput[2]
            end if
            if fetchUserInput[1].indexOf(".") then
                ErrorText("That " + isFolderOrFile + " name contains an invalid character.")
            else
                DeleteFile(filePath, fetchUserInput[1], isFolderOrFile)
            end if
        end if
    else if fetchUserInput[0] == "rfolder" or fetchUserInput[0] == "rfile" then // Rename Specified Folder Or File
        if fetchUserInput[0] == "rfolder" then
            isFolderOrFile = "folder"
        else
            isFolderOrFile = "file"
        end if
        if fetchUserInput.len < 3 or fetchUserInput.len > 4 then
            SyntaxText(fetchUserInput[0] + " <" + isFolderOrFile + " name> <new name> <opt: directory path>", false)
        else
            if fetchUserInput.len == 3 then
                filePath = current_path
            else if fetchUserInput.len == 4 then
                filePath = fetchUserInput[3]
            end if
            if fetchUserInput[1].indexOf(".") or fetchUserInput[2].indexOf(".") then
                ErrorText("That " + isFolderOrFile + " name contains an invalid character.")
            else
                RenameFile(filePath, fetchUserInput[1], fetchUserInput[2], isFolderOrFile)
            end if
        end if
    else if fetchUserInput[0] == "get" then // Get Content Of Specified File
        if fetchUserInput.len == 1 or fetchUserInput.len > 3 then
            SyntaxText(fetchUserInput[0] + " <file name> <opt: directory path>", false)
        else
            if fetchUserInput.len == 2 then
                filePath = current_path
            else if fetchUserInput.len == 3 then
                filePath = fetchUserInput[2]
            end if
            GetContent(filePath, fetchUserInput[1])
        end if
    else if fetchUserInput[0] == "set" then // Set Content Of Specified File
        if fetchUserInput.len < 4 then
            SyntaxText(fetchUserInput[0] + " <file name> <add/replace> <opt: new line = false> <content>", false)
        else
            if fetchUserInput[2] != "add" and fetchUserInput[2] != "replace" then
                SyntaxText(fetchUserInput[0] + " <file name> <add/replace> <opt: new line = false> <content>", false)
                ErrorText("You must select either 'add' or 'replace'.", false)
            else
                if fetchUserInput.len == 4 then
                    splitInput = fetchUserInput[3:]
                    textContent = splitInput.join(" ")
                    SetContent(fetchUserInput[1], textContent, fetchUserInput[2], false)
                else
                    if fetchUserInput[3] == "true" or fetchUserInput[3] == "false" then
                        splitInput = fetchUserInput[4:]
                    else
                        splitInput = fetchUserInput[3:]
                    end if
                    textContent = splitInput.join(" ")
                    SetContent(fetchUserInput[1], textContent, fetchUserInput[2], fetchUserInput[3])
                end if
            end if
        end if
    else if fetchUserInput[0] == "crackwifi" then // Crack Wifi Password
        if fetchUserInput.len > 1 then
            SyntaxText(fetchUserInput[0])
        else
            WifiCracker()
        end if
    else if fetchUserInput[0] == "scanip" then // Scan IP Address For Ports And Additional Information
        if fetchUserInput.len != 2 then
            SyntaxText(fetchUserInput[0] + " <ip address>")
        else
            if not is_valid_ip(fetchUserInput[1]) then
                ErrorText("You have entered an invalid IP address.", false)
            else
                if hostComputer.is_network_active == 0 then
                    ErrorText("No internet connection. Use 'crackwifi' to gain access.", false)
                else
                    IpScanner(fetchUserInput[1])
                end if
            end if
        end if
    else
        CommandUnknown()
    end if
end while