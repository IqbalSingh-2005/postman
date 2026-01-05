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
        # Check specific exceptions first (most specific to least specific)
        if isinstance(e, requests.ConnectTimeout):
            print("The request timed out while trying to connect to the remote server.\nTry Again")
        elif isinstance(e, requests.ReadTimeout):
            print("The server did not send any data in the allotted amount of time.")
        elif isinstance(e, requests.Timeout):
            print("The request timed out.")
        elif isinstance(e, requests.ConnectionError):
            print("A Connection error occurred.")
        elif isinstance(e, requests.HTTPError):
            print("An HTTP error occurred.")
        elif isinstance(e, requests.TooManyRedirects):
            print("Too many redirects.")
        elif isinstance(e, requests.JSONDecodeError):
            print("Couldn't decode the text into json")
        elif isinstance(e, requests.RequestException):
            print("An ambiguous exception occurred while handling your request.")
        else:
            print("Unknown Error Occurred\nSEE LOGS")
        
        
#------------------------GET---------------------------------------

    def get(self, params=None, timeout=10):
        try:
            response = requests.get(self.url, params=params, timeout=timeout)
            self._print_(response, "GET")
        except requests.RequestException as e:
            self._exception_(e)
        
#------------------------POST---------------------------------------

    def post(self, data=None, json=None, timeout=10):
        try:
            response = requests.post(self.url, data=data, json=json, timeout=timeout)
            self._print_(response, "POST")
        except requests.RequestException as e:
            self._exception_(e)

#------------------------HEAD---------------------------------------

    def head(self, timeout=10):
        try:
            response = requests.head(self.url, timeout=timeout)
            self._print_(response, "HEAD")
        except requests.RequestException as e:
            self._exception_(e)
#------------------------PUT---------------------------------------

    def put(self, data=None, json=None, timeout=10):
        try:
            response = requests.put(self.url, data=data, json=json, timeout=timeout)
            self._print_(response, "PUT")
        except requests.RequestException as e:
            self._exception_(e)
#------------------------PATCH---------------------------------------

    def patch(self, data=None, json=None, timeout=10):
        try:
            response = requests.patch(self.url, data=data, json=json, timeout=timeout)
            self._print_(response, "PATCH")
        except requests.RequestException as e:
            self._exception_(e)
#------------------------DELETE---------------------------------------

    def delete(self, timeout=10):
        try:
            response = requests.delete(self.url, timeout=timeout)
            self._print_(response, "DELETE")
        except requests.RequestException as e:
            self._exception_(e)