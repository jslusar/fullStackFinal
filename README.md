# fullStackFinal
Parker Watson and Jenna Slusar's final project for the Full Web Stack Course at Bucknell Univeristy.

##Application Architecture

Frontend- We created this app using creat-react-app from the node.js package installer.
Thus, our code is written in jsx format, and uses packages such as 'reactstrap' and 'bootstrap' to format our website.

Backend- In this app we used the University's MongoDB server to host our data. We connected to this server by using Express and communicated with it through Mongoose commands.

##Data Model

Below is our data structure that we used in our Mongo Database.  As you can see we made everything except the file upload required because there needs to be enough information in each post for it to be helpful to our users.
```
{
 name: {type: String,
    required: true},
  organization: {type: String,
    required: true},
  title: {type: String,
    required: true},
  description: {type: String,
    required: true},
  tags: {type: String,
    required: true},
  progress: {type: String,
    required: true},
  file: String
}
```
Thus, every post will have an author (name), the organization they are posting about (from a dropdown menu), the title of their post (so that users can glance and know what the post is about), 
a description of what they want to post about, some tags that the user will be able to ctrl + f to easily find the post by, the progress of their idea that they are posting about (from a dropdown menu of Just an Idea, In Progress, Finished),
and/or the path of a file upload (if they have information they would like to upload). -- The files are being hosted on an s3 bucket in AWS.

##How to Deploy to AWS:

1. Create EC2 instances for the react app and the server: https://drive.google.com/drive/my-drive 
2. Create a database instance as well
3. Go to the link on your react app instance! It's deployed

