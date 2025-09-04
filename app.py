from getRequests import Request

URL = str(input("Enter URL: "))
requestType = str.lower(input("Select Your Request Type \n GET, " \
"OPTIONS, HEAD, POST, PUT, PATCH, or DELETE: "))

req = Request(URL)
if requestType == "head":
    req.head()

elif requestType == "post":
    data = str(input("Enter data for GET Request: "))
    json = str(input("Enter json for GET Request: "))
    req.post()

elif requestType == "get":
    params = str(input("Enter parameter for GET Request: "))
    req.get(params)

elif requestType == "put":
    data = str(input("Enter data for GET Request: "))
    json = str(input("Enter json for GET Request: "))
    req.put()

elif requestType == "patch":
    data = str(input("Enter data for GET Request: "))
    json = str(input("Enter json for GET Request: "))
    req.patch()

elif requestType == "delete":
    req.delete()
