from functions import create_batch
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QPushButton, QMessageBox



if __name__ == "__main__":
    app = QApplication(sys.argv)
    w = QWidget()
    w.resize(600,600)
    w.setWindowTitle('Work Environment')
    
    label = QLabel(w)
    label.setText("click to save current work environment")
    label.move(100,130)
    label.show()

    btn = QPushButton(w)
    btn.setText('Save')
    btn.move(110,200)
    btn.show()
    btn.clicked.connect(create_batch)

    
    w.show()
    sys.exit(app.exec_())