import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(cloud_name = "ataglance", api_key= "777356583495598", api_secret = "xqhd7MQmMt_qKaIq4XSN1RSFrts")

def imageUpload(filename, publicID, tags):
    tagList = ""
    for tag in tags: tagList = tagList + "," + tag
    cloudinary.uploader.upload(filename, public_id=publicID, tags=tagList)
