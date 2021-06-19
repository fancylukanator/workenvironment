import pyautogui
import pyperclip
import subprocess


def get_urls():
    urls = []
    url = []
    pyperclip.copy('')
    print(pyperclip.paste())
    pyautogui.click(0, 200) # a random click for focusing the browser

    ## loop until duplicate
    a = 1
    while a==1:
        pyautogui.press('f6')  #access url
        pyautogui.hotkey('ctrl', 'c') # for copying the selected url
        url = pyperclip.paste()
        if url in urls:
            break
        urls.append(url)
        pyautogui.hotkey('ctrl', 'tab')

    return urls

def get_programs():      #https://stackoverflow.com/questions/54827918/get-list-of-running-windows-applications-using-python
    active_applications = []
    cmd = 'powershell "gps | where {$_.MainWindowTitle } | select Name'
    proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    for line in proc.stdout:
        if not line.decode()[0].isspace():
            active_applications.append(line.decode().rstrip())

    active_applications = active_applications[2:]

    return active_applications

def create_batch():        #https://datatofish.com/create-batch-file-python/
    active_applications = get_programs()
    urls = get_urls()
    myBat = open(r'C:\Users\user\Documents\Projects\workenvironment\app-python\test.bat','w+')
    myBat.write('@echo off\n')


    for x in urls:
        myBat.write(f'start chrome.exe {x}\n')

    for x in active_applications:
        myBat.write(f'start {x}\n')

    myBat.write('exit')

    myBat.close()