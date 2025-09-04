import requests

class Request:
    def __init__(self, url):
        self.url=url

    def _print_(self, response, method):
        print(f"\n{method}")
        print("Status Code: ",response.status_code)

        print("\nHeaders")
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print(f"\nBody: {response.text}")

#------------------------GET---------------------------------------

    def get(self, params=None):
        response = requests.get(self.url, params=params)
        self._print_(response, "GET")

#------------------------POST---------------------------------------

    def post(self, data=None, json=None):
        response = requests.post(self.url, data=data, json=json)
        self._print_(response, "POST")

#------------------------HEAD---------------------------------------

    def head(self):
        response = requests.head(self.url)
        self._print_(response, "HEAD")

#------------------------PUT---------------------------------------

    def put(self, data=None, json=None):
        response = requests.put(self.url, data=data)
        self._print_(response, "PUT")

#------------------------PATCH---------------------------------------

    def patch(self, data=None, json=None):
        response = requests.patch(self.url, data=data)
        self._print_(response, "PATCH")

#------------------------DELETE---------------------------------------

    def delete(self):
        response = requests.patch(self.url)
        self._print_(response, "DELETE")
