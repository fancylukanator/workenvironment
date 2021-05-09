from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QGridLayout, QWidget

app = QApplication([])
window = QMainWindow()
widget = QWidget(window)
layout = QGridLayout()
widget.setLayout(layout)

label = QLabel()
label.setText('Hello world!')

layout.addWidget(label, 0, 0)

window.setCentralWidget(widget)
window.show()
app.exec_()