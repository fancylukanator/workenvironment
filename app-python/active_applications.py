import subprocess
active_applications = []
cmd = 'powershell "gps | where {$_.MainWindowTitle } | select Name'
proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
for line in proc.stdout:
    if not line.decode()[0].isspace():
        active_applications.append(line.decode().rstrip())

active_applications = active_applications[2:]
print(active_applications)

#https://stackoverflow.com/questions/54827918/get-list-of-running-windows-applications-using-python
