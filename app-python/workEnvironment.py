import sys
import pyautogui
import pyperclip
import subprocess

from PyQt5.QtWidgets import QMainWindow, QApplication, QWidget, QPushButton, QAction, QLineEdit, QMessageBox, QLabel
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import pyqtSlot

class App(QMainWindow):

    def __init__(self):
        super().__init__()
        self.title = 'Work Environment'
        self.left = 100
        self.top = 100
        self.width = 600
        self.height = 600
        self.initUI()
    
    def initUI(self):
        self.setWindowTitle(self.title)
        self.setGeometry(self.left, self.top, self.width, self.height)

        # Create folder label
        self.folder_label = QLabel(self)
        self.folder_label.setText("input folder path")
        self.folder_label.adjustSize()
        self.folder_label.move(20,20)
        self.folder_label.show()
    
        # Create folder textbox
        self.folder_textbox = QLineEdit(self)
        self.folder_textbox.move(20, 60)
        self.folder_textbox.resize(280,40)

        # Create file label
        self.file_label = QLabel(self)
        self.file_label.setText("input file name")
        self.file_label.adjustSize()
        self.file_label.move(20,120)
        self.file_label.show()
    
        # Create file textbox
        self.file_textbox = QLineEdit(self)
        self.file_textbox.move(20, 160)
        self.file_textbox.resize(280,40)
        

        # Create save label
        self.save_label = QLabel(self)
        self.save_label.setText("click to save current work environment")
        self.save_label.adjustSize()
        self.save_label.move(20,220)
        self.save_label.show()

        # Create save button in the window
        self.button = QPushButton('Save', self)
        self.button.move(20,260)
        
        # connect button to function on_click
        self.button.clicked.connect(self.on_click)
        self.show()
    

    @pyqtSlot()
    def on_click(self):
        folderValue = self.folder_textbox.text()
        fileValue = self.file_textbox.text()
        filePath = folderValue + '\\' + fileValue + '.bat'

        urls = []
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

        #
        #GET PROGRAMS
        #
        import subprocess
        active_applications = []
        cmd = 'powershell "gps | where {$_.MainWindowTitle } | select Name'
        proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
        for line in proc.stdout:
            if not line.decode()[0].isspace():
                active_applications.append(line.decode().rstrip())

        active_applications = active_applications[2:]

        #
        #CREATE BATCH FILE
        # https://datatofish.com/create-batch-file-python/
        myBat = open(filePath,'w+')
        myBat.write('@echo off\n')


        for x in urls:
            myBat.write(f'start chrome.exe {x}\n')

        for x in active_applications:
            myBat.write(f'start {x}\n')

        myBat.write('exit')

        myBat.close()
        

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = App()
    sys.exit(app.exec_())