# /usr/bin/env python
# Download the twilio-python library from twilio.com/docs/libraries/python
from twilio.rest import Client

# Find these values at https://twilio.com/user/account
account_sid = "AC9ff6a1cf050d7b0ea69e19e432375b12"
auth_token = "c74873f458b55eb1e0fa55979302f8a7"

client = Client(account_sid, auth_token)

client.api.account.messages.create(
    to="+14803811071",
    from_="+14804706215",
    body="Sutte ka time hogaya")