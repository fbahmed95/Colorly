DATA:

users : {
  user_uid : {
    collections : {
      all : {
        object_id : {
          colors : [],
          title: "string",
          tags: [],
          collection_orign: collection_id,
          user_origin: user_uid         
        },
      },
      collection_id : {
        collection_name: "string",
        object_id : {
          colors : [],
          title: "string",
          tags: [],
          collection_orign: collection_id,
          user_origin: user_uid          
        },
        isOwner: true or false
      }
    }
  }
}





color_stories : {
  object_id: {
    colors : [],
    title: "string",
    tags: [],
    collection_orign: collection_id,
    user_origin: user_uid              
  }
}

COMPONENTS:

- header  
  - changes on authentication
- create template
- edit template
- collections template
- dashboard
- card template
- card focused template

ACTIONS:
ADD_COLLECTION
ADD_COLOR_STORY
  - if collection name provided, save to that collection
  - if no collection name provided, save to general
EDIT_COLLECTION
EDIT_COLOR_STORY
FILTER
  - by tag
  - by title
