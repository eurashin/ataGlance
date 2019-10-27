from google.cloud import datastore
import google.cloud.exceptions

def createSID(tags):
    client = datastore.Client()

    storyID = ""

    for tag in tags:
        # query the tag table for all the tag IDs
        query = client.query(kind='Tag')
        query.add_filter('tagName', '=', tag)
        tagID = query.fetch()

        # concat the tag IDs together to create the SID
        storyID = storyID + "-" + tagID
        
    return storyID
