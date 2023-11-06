
from flask import Flask

class Project3:
    def __init__(self):
        self.app = Flask(__name__)

    def welcome(self):
        return "Hola mundo Flask"

if __name__ == '__main__':
    project = Project3()
    project.app.run(debug=True)

miProyect=Project3()


        
