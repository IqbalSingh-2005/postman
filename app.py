import requests
import sys

rawURL=str(input("Enter URL to make your operation: "))
print("Select one of the below operation \n get \n options \n head \n post \n put \n patch \n delete")
requestType=str.lower(input("Request Type: "))

req = requests.request(requestType,rawURL,params=None, )

print("Status Code: ",req.status_code)

print("\nHeaders: ")

header=req.headers.items()
for key,value in header:
    print(f"{key}:{value}")

print("\nResponse Body: ")
print(req.text)