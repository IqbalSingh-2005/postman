import requests

class Request:
    def __init__(self, url):
        self.url=url

    def _print_(self, response, method):
        print(f"\n{method}")
        print("Status Code: ",response.status_code)

        print("Headers".center(50,"="))
        for key,values in response.headers.items():
            print(f"{key} : {values}")

        print("Body".center(50,"="))
        print(response.text)

#------------------------Exception---------------------------------------

    def _exception_(self, e):
        if isinstance(e, requests.RequestException):
            print("An ambiguous exception occurred while handling your request.")

        elif isinstance(e, requests.ConnectionError):
            print("A Connection error occurred.")

        elif isinstance(e, requests.HTTPError):
            print("An HTTP error occurred.")

        elif isinstance(e, requests.TooManyRedirects):
            print("Too many redirects.")

        elif isinstance(e, requests.ConnectTimeout):
            print("The request timed out while trying to connect to the remote server.\nTry Again")

        elif isinstance(e, requests.ReadTimeout):
            print("The server did not send any data in the allotted amount of time.")

        elif isinstance(e, requests.Timeout):
            print("The request timed out.")

        elif isinstance(e, requests.JSONDecodeError):
            print("Couldn’t decode the text into json")

        else:
            print("Unknown Error Ocuured\nSEE LOGS")
        
#------------------------GET---------------------------------------

    def get(self, params=None, timeout=10):
        try:
            response = requests.get(self.url, params=params)
            self._print_(response, "GET")
        except requests.RequestException:
            self._exception_()
        
#------------------------POST---------------------------------------

    def post(self, data=None, json=None):
        try:
            response = requests.post(self.url, data=data, json=json)
            self._print_(response, "POST")
        except requests.RequestException:
            self._exception_()

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
