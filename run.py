import os

i = input("npm install? Y/N")
if i.lower() == "y":
    os.system("npm install")
    quit()

os.system("npm run dev")