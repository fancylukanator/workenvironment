import webbrowser
import psutil

#webbrowser.open_new("https://docs.python.org/3/library/webbrowser.html")

for proc in psutil.process_iter():
    print(proc.open_files())
