import cloudinary
import cloudinary.uploader
import cloudinary.api
import string
import random 

cloudinary.config(cloud_name = "ataglance", api_key= "777356583495598", api_secret = "xqhd7MQmMt_qKaIq4XSN1RSFrts")


def random_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))

def imageUpload(filename, publicID, tags):
    tagList = ""
    for tag in tags: 
        tagList = tagList + "," + tag
        cloudinary.uploader.upload(filename, public_id=publicID, tags=tagList)
