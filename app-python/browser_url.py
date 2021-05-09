import pyautogui
import pyperclip

print(pyperclip.paste())

urls = []
url = []
pyperclip.copy('')
pyautogui.click(0, 200) # a random click for focusing the browser

print(urls)

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


print(urls)

## this script does not work for multiple windows!