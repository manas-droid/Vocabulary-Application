# Vocabulary-Application

## Who is it made for
  People who are learning a new language and wish to learn new words or improve their understanding of particular words. 


## Description of the Project 
1. People on this app should be able to share a new word they learned with an example to show the usage of the word
2. People should be able to save a word they like
3. People should be able to comment on the word posted
4. People should be able to see their own posts
5. People should be able to delete their own posts
6. People should be able to update their own posts
7. People should be able to find post according to a language or a word
8. People should be able to see the posts regardless of authentication/authorisation

## Database Information
 1. Schema Information :
    1. Person  : personId,name
    2. Language: langId,langName
    3. LanguageOfInterest : langId,personId
    4. Post : personId,postId,langId,word,likeCount,commentCount,issueDate,description, partofSpeech
    5. Comment : commentId,postId,personId,comment
    6. Like : postId,personId
    7. PartsOfSpeech : partOfSpeechId,partOfSpeech
    
    partOfSpeech : Noun,Pronoun,Verb,Adjective,Adverb,Preposition,Conjunction,Interjection,Article

## Relationship in the Database
1. A Person can like to many posts and a post can be liked by many people
2. A Person can comment on many post and a post can have many comments 
3. A Person can have many posts and a post belongs to only one Person
4. A Person can have many Language of Interest and A Language can be of many people's Interest
5. A PartOfSpeech can belong to many posts but a single post can have only one part of speech
