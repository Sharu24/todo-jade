let config = {};

config.mongoUser = "sharu24";
config.mongoPassword = "Dominar@24";
config.mongoDb = "todo";

config.mongoUri = `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@bootcamp.i5p6q.gcp.mongodb.net/${config.mongoDb}?retryWrites=true&w=majority`;

config.options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = config;
