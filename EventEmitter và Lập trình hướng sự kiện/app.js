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

console.log(myEmitter);
