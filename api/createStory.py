from createSID import createSID

def createStory(tags):
    # create new topic with tags
    storyID = createSID(tags)

    # create new entity
    storyEntity = Story(SID = storyID)
    storyKey = storyEntity.put()

    
