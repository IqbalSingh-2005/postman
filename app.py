from getRequests import Request

URL = str(input("Enter URL: "))
requestType = str.lower(input("Select Your Request Type \n GET, " \
"OPTIONS, HEAD, POST, PUT, PATCH, or DELETE: "))
seprator=("RESPONSE")

req = Request(URL)
if requestType == "head":
    print("RESPONSE".center(50,"="))
    req.head()

elif requestType == "post":
    data = str(input("Enter data for GET Request: "))
    json = str(input("Enter json for GET Request: "))
    print("RESPONSE".center(50,"="))
    req.post(data, json)

elif requestType == "get":
    params = str(input("Enter parameter for GET Request: "))
    print("RESPONSE".center(50,"="))
    req.get(params)

elif requestType == "put":
    data = str(input("Enter data for GET Request: "))
    json = str(input("Enter json for GET Request: "))
    print("RESPONSE".center(50,"="))
    req.put(data, json)

elif requestType == "patch":
    data = str(input("Enter data for GET Request: "))
    json = str(input("Enter json for GET Request: "))
    print("RESPONSE".center(50,"="))
    req.patch(data, json)

elif requestType == "delete":
    print("RESPONSE".center(50,"="))
    req.delete()

else :
    print("Check Your Input Again")
