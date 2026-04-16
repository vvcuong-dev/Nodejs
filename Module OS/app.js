/**
 * Module OS: lấy thông tin hệ điều hành
 *  - Module OS (Operating System) là một module tích hợp sẵn trong Nodejs, cung cấp các phương thức để bạn có thể truy xuất thông tin về hệ điều hành
 *    của máy chủ đang chạy ứng dụng
 *  - Thông tin này cực kì hữu ích khi bạn muốn tối ưu hóa ứng dụng dựa trên phần cứng (VD: tạo số lượng bản sao ứng dụng tương ứng với số lường CPU)
 */

const os = require("os");

/**
 * 1. Các phương thức lấy thông tin phần cứng
 *  
 *  a. Thông tin CPU (os.cpus())
 *    - trả về 1 mảng các đối tượng chứa thông tin chi tiết về từng phần (core) của CPU, bao gồm model, tốc độ và thông số thời gian
 */

    // const cpu = os.cpus();
    // console.log(`Số nhân CPU: ${cpu.length}`);
    // console.log(`Thông tin nhân đầu tiên: ${cpu[0].model}`);
    
    /**
     * B. Bộ nhớ RAM (os.totalmem() và os.freemem())
     *  - giúp bạn theo dõi dung lượng RAM của hệ thống tính bằng byte
     */

    console.log(os.freemem());
    
    

