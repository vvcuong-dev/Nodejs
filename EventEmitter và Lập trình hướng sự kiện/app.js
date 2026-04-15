/**
 * EventEmitter và Lập trình hướng sự kiện
 * 
 * 1. Lập trình hướng sự kiện (Event driven programming) là gì?
 *  Trong lập trình truyền thống, mã nguồn chạy theo thứ tự từ trên xuống dưới. Trong lập trình hướng sự kiện, luồng thực thi của chương trình
 *  được quyết định bởi các sự kiện (như việc người dùng click chuột, một file vừa được đọc xong, hoặc 1 request gửi lên server)
 * 
 *  Nodejs sử dụng mô hình:
 *  1. lắng nghe sự kiện (Listen/Subscribe)
 *  2. Phát tín hiệu khi sự kiện xảy ra (Emit/Publish)
 *  3. Thực thi một hàm phản hồi (Callback/Handler)
 * 
 *  2. Class EventEmitter
 *  
 *   Hầu hết các module cốt lõi của Nodejs (như HTTP, FS) đều được xây dựng dựa trên lớp EventEmitter. 
 *   Để sử dụng cho mục đích cá nhân, chúng ta cần nạp modules events
 *  
 *     2.1. Cách khởi tạo
 *         const EventEmitter = require('events');
 *         const myEmitter = new EventEmitter();
 * 
 * 
 */

const EventEmitter = require('events');
const myEmitter = new EventEmitter();



/**
 * 3. Các thao tác cơ bản vs EventEmiiter
 *  
 *  a. Đăng ký sự kiện (.on() hoặc .addListener())
 *  - Dùng để định nghĩa xem khi một sự kiện xảy ra thì sẽ làm gì. 
 */


// myEmitter.on("xinchao", () => {
//      console.log("Mot su kien chao hoi vua dien ra")
// })

/**
 * b. Kích hoạt sự kiện (.emit())
 * - dùng để phát tín hiệu thông báo sự kiện đã xảy ra
 */

// myEmitter.emit("xinchao");
// Kết quả: Mot su kien chao hoi vua dien ra"

/**
 * C. truyền dữ liệu kèm theo sự kiện
 */

// myEmitter.on('login', (username, time) => {
//     console.log(`${username} đã đăng nhập lúc ${time}`);
// })

// myEmitter.emit("login", "cuong vu", "10:99")

/**
 * Đăng ký sự kiện chỉ chạy 1 lần (.once())
 *  - Sự kiện này sau khi kích hoạt lần đầu sẽ tự động bị hủy bỏ
 */

myEmitter.once("gift", () => {
    console.log("Bạn đã nhận đc quà - chỉ 1 lần");
})


myEmitter.emit("gift");
myEmitter.emit("gift");

