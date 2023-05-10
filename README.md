# acdc
Tool to configure debug environment for application core analysis

## Introduction
Tool is designed to automate the process of setting up an environment for application coredump analysis.
 
## How does the tool work?
One needs to collect core dump and installed-rpms file from the system, where crash happens. Providing these files to the tool along with details of system(IP & root password) to be setup for analysis, it performs the following tasks to automate the process:

 - Check the core dump for crashing binary/program
 - Figure out package providing the crashing binary/program
 - List out the dependency of crashing package
 - Compare the version of packages on the system to be setup with respective packages in the installed-rpms file.
 - Mark the packages with version mismatch and prompt the user to proceed with the installation of required package list with version details.
 - Checks for the list of debuginfo packages required and matches the version of existing ones(if any) and marks them for installation if it does not exist or in case of version mismatch and prompts the user to proceed with the installation.

## Advantages of this tool
 - It is useful to avoid the hassle of manually configuring test environment to analyze user space core.
 - Any newbie unaware of how to configure the debug environment for core can use this tool to get backtrace from the core and seek faster collaboration on case.
 - Additionally, the tool is designed to be very light weight on server deployment. It does not maintain any attachments on server but uses server side mounts of existing repositories for required file attachments.
 

## Prerequisite for test system to be setup
The test system must already be registered on RHN or Satellite and subscribed to required child channels (if any) and appropriate debuginfo channels.
 

## Web UI front end of the tool
Web interface of the tool can be hosted on any light weight web server.
Follow through the instructions and warnings on the page before you feed the data to it and consider that it's still in beta phase and fancy stuff is yet to be done.
For feeding coredump and installed-rpms file to the tool, two server side mounts are listed on the portal:

**sshfs share: (Default)**
```
sshfs USER@sshfs.url.domain.com:/DIR /home/USER/mnt/
```
(replace with appropriate details for your setup)

**nfs-share:**
If the file is not available on sshfs one can download and extract files on alternate nfs-share and then choose to select file from there.  
Make sure the files to be used are stored in a directory named as serial number of the support case.
```
nfs-share.domain.com:/share/sysreports
```

## Back end python scripts
A python binary (yet to be uploaded here) runs on the test system and set it up for debugging.

## TODO list
 - Upon completion, backtrace captured from selected core should be stored in provided test system at /root/acdc/[sfdc#]/ directory and should also be prompted on the web UI.
 - Providing only a core dump and installed-rpms file, tool should create a new virtual environment and return the IP of the system to the user.
 - UI should have an email ID field and that being provided, the tool should mail the user of completion of task with all details.
 - The tool should fix the corrupted rpmdb file on the test system being configured.
 
## Known Issues
It fails on a system with corrupted rpmdb. 

**NOTE: This is an old project (Developed in Jan 2015) for a specific usecase. This is not maintained anymore. This may need re-write to support generic use.**



