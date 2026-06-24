import { pubSubRedis } from "../utils/redis";

const pubSubClient = pubSubRedis.getInstance();

pubSubClient.subClient?.subscribe("new-order", (message) => {
  console.log("Received message from Redis Pub/Sub:", message);
});
