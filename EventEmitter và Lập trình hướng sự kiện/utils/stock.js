const eventEmitter = require("./event");
eventEmitter.on("newOrder", (orderId) => {
    console.log(`[KHO] đã nhận đơn hàng ${orderId}, đang đóng gói.......`);
});