const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { MONGO_CONNECTION_URL } = require('./config');

const client = new MongoClient(MONGO_CONNECTION_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("database").command({ ping: 1 });
    console.log("Успешное соединение с MongoDB!");
  } catch (e) {
    console.error(e);
    process.exit(1); // Exit the process if connection fails
  }
}

async function findUserByLogin(login) {
  try {
    const database = client.db('database');
    const users = database.collection('users');
    const user = await users.findOne({ login });
    return user;
  } catch (e) {
    console.error(e);
  }
}

async function createUser(user) {
  try {
    const database = client.db('database');
    const users = database.collection('users');
    const result = await users.insertOne(user);
    console.log(`New user created with the following id: ${result.insertedId}`);
    const insertedUser = await users.findOne({ _id: result.insertedId });
    return insertedUser;
  } catch (e) {
    console.error(e);
  }
}

async function getAllPosts() {
  try {
    const database = client.db('database');
    const posts = database.collection('posts');
    const result = await posts.find().toArray();
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function createPost(post) {
  try {
    const database = client.db('database');
    const posts = database.collection('posts');
    const result = await posts.insertOne(post);
    const resultPost = await posts.findOne({_id: result.insertedId});
    await createAuthor(resultPost.author);
    return resultPost;
  } catch (e) {
    console.error(e);
  }
}

async function createAuthor(name){
  try{
    const database = client.db('database');
    const authors = database.collection('authors');
    const existingAuthor = await authors.findOne({ name });
    if (existingAuthor) {
      console.log('Author already exists');
    } else {
      await authors.insertOne({ name });
      console.log(`New author ${name} added to database`);
    }
    
  } catch (e) {
    console.error(e);
  }
}

async function deleteAuthor(name){
  try{
    const database = client.db('database');
    const authors = database.collection('authors');
    const existingAuthor = await authors.findOne( name );
    if (existingAuthor) {
      await authors.deleteOne(name);
      console.log(`Author ${name} deleted from database`);
    } else {
      console.log(`This author ${name} is not exist`);
      console.log(name);
    }
  }catch(e){
    console.log(e);
  }
}

async function getAllAuthors(){
  try{
    const database = client.db('database');
    const authors = database.collection('authors');
    const result = await authors.find().toArray()
    return result
  } catch(e){
    console.log(e);
  }
}

async function deletePost(postId) {
  try {
    const database = client.db('database');
    const posts = database.collection('posts');
    const result = await posts.findOne({_id: new ObjectId(postId)})
    await posts.deleteOne({_id: new ObjectId(postId)});
    
    const checkAuthor = await posts.findOne({author : result.author})
    if(checkAuthor === null){
      await deleteAuthor({name: result.author})
    }else{
      console.log('Author have more posts')
    }
    return result
  } catch (e) {
    console.error(e);
  }
}

async function findOnePost(title) {
  try {
    const database = client.db('database');
    const posts = database.collection('posts');
    const Post = await posts.findOne({title});
    return Post;
  } catch (e) {
    console.error(e);
  }
}

async function close() {
  try {
    await client.close();
    console.log('MongoDB connection closed.');
  } catch (e) {
    console.error(e);
  }
}

module.exports = { run, findUserByLogin, createUser, getAllPosts, findOnePost, deletePost, close, createAuthor, createPost, getAllAuthors, deleteAuthor}
