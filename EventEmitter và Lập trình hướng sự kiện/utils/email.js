const eventEmitter = require("./event");
eventEmitter.on("newOrder", (orderId) => {
    console.log(`[Email] đang gửi thư xác nhận cho đơn hàng ${orderId} .......`);
});