const {
    APP_PORT,
    MONGO_URI,
    JWT_SECRET,
    QUEUE_URI,
    QUEUE_NAME
} = process.env
module.exports = {
    port: APP_PORT || 4000,
    mongoUri: MONGO_URI || "mongodb://localhost:27017/cv",
    jwtSecret: JWT_SECRET || "+Y9FYqpJxJGeRy9aj1NOCbmAPZt/IKqPuDBJNf+gbuuK7nXuC82UA1kKSQju+TiqxhQwYCJgPcBn",
    rabbitmqUri: QUEUE_URI || "ampq://",
    queueName: QUEUE_NAME || "buk"


}