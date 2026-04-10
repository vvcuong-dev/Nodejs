/**
 * FLAGS trong file system
 * 
 *  - Trong lập trình Node.js khi làm việc với module fs, các Flags (cờ) được sử dụng để xác định chế độ mở file. Chúng quyết định xem bạn 
 *    muốn đọc, ghi, tạo mới hay ghi đè một tập tin
 */


/**
 * 1. Các Flag danh cho việc đọc (Reading)
 *  - 'r': mở file để đọc. Nếu file k tồn tại, một ngoại lệ (exception) sẽ xảy ra (Đây là giá trị mặc định của nhiều hàm đọc)
 *  - 'r+': mở file để cả đọc và ghi. Nếu file k tồn tại, sẽ xảy ra lỗi
 */

const fs = require('fs');

// Mở file
const file = fs.openSync("./test.txt", "r+");

// Thao tác
const buffer = Buffer.alloc(10); // Tạo ra một vùng nhớ (buffer) 10 bytes => Dùng để chứa dữ liệu đọc từ file

// Buffer là một vùng nhớ tạm (temporary memory) dùng để chứa dữ liệu nhị phân khi bạn đọc/ghi dữ liệu.

const bytesRead = fs.readSync(file, buffer, 0, buffer.length, 0)

/**
 * file: file descriptor (đã mở trước đó bằng fs.openSync)
 * buffer: nơi chứa dữ liệu đọc vào
 * 0: bắt đầu ghi vào buffer từ vị trí 0
 * buffer.length: đọc tối đa 10 bytes
 * 0: bắt đầu đọc từ vị trí byte thứ 0 trong file
 * => kết quả: bytesRead: số byte thực sự đọc được (có thể < 10)
 */
const data = buffer.toString('utf-8', 0, bytesRead);

/**
 * Convert dữ liệu trong buffer sang chuỗi
 * Chỉ lấy từ 0 → bytesRead (tránh lấy phần rác)
 * => In ra nội dung file (tối đa 10 ký tự đầu)
 */
console.log(data);

const newBuffer = Buffer.from('New Content'); // Tạo buffer chứa chuỗi "New Content"
fs.writeSync(file, newBuffer, 0, newBuffer.length, 0)

/**
 * Ghi dữ liệu từ buffer vào file
 * 0: bắt đầu đọc từ buffer từ vị trí 0
 * newBuffer.length: ghi toàn bộ nội dung
 * 0: ghi vào file từ vị trí byte 0
 */

// Đóng file
fs.closeSync(file)