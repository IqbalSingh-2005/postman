import requests

class Request:
    def __init__(self, url):
        self.url=url

    def send_get(self):
        response = requests.get(self.url)

        print("Status Code: ",response.status_code)

        print("\nHeaders")
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print(f"\nBody: {response.text}")

req = Request("https://jsonplaceholder.typicode.com/posts/1")
req.send_get()