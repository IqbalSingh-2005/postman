import requests

class Request:
    def __init__(self, url):
        self.url=url
#------------------------GET---------------------------------------

    def get(self, params=None):
        response = requests.get(self.url, params=params)

        print("\nGET")
        print("Status Code: ",response.status_code)

        print("\nHeaders")
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print(f"\nBody: {response.text}")

#------------------------POST---------------------------------------

    def post(self, data=None, json=None):
        response = requests.post(self.url, data=data, json=json)
        print("\nPOST")
        
        print("Status Code: ",response.status_code)

        print("\nHeaders")
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print(f"\nBody: {response.text}")

#------------------------HEAD---------------------------------------

    def head(self):
        response = requests.head(self.url)
        print("\nHEAD")

        
        print("Status Code: ",response.status_code)
        
        print("\nHeaders")
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print(f"\nBody: {response.text}")

#------------------------PUT---------------------------------------

    def put(self, data=None):
        response = requests.put(self.url, data=data)
        print("\nPUT")
        
        print("Status Code: ",response.status_code)
        
        print("\nHeaders")
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print(f"\nBody: {response.text}")

#------------------------PATCH---------------------------------------

    def patch(self, data=None):
        response = requests.patch(self.url, data=data)
        print("\nPATCH")
        
        print("Status Code: ",response.status_code)
        
        print("\nHeaders")
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print(f"\nBody: {response.text}")

#------------------------DELETE---------------------------------------

    def delete(self, data=None):
        response = requests.delete(self.url, data=data)
        print("\nDELETE")
        
        print("Status Code: ",response.status_code)
        
        print("\nHeaders")
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print(f"\nBody: {response.text}")
