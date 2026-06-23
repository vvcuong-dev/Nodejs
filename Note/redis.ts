// Tổng quan về Reids

// 1. Redis là gì?

/**
 * Redis (Remote Dictionary Server) là một cơ sở dữ liệu NoSQL dạng key-value, được thiết kế để lưu trữ dữ liệu trong bộ nhớ (in-memory)
 * và hỗ trợ các cấu trúc dữ liệu phong phú như strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs và geospatial indexes.
 * Redis thường được sử dụng để tăng tốc độ truy xuất dữ liệu, caching, session management, pub/sub messaging và nhiều ứng dụng khác.
 */

// 2. In-memory Data Strucures: Ram & Disk

/**
 * Đây là lý do cốt lõi khiến Reids nhanh vượt trội so với MongoDB, MySQL, PostgreSQL, ... vì Reids lưu trữ dữ liệu trong bộ nhớ (RAM) thay vì trên đĩa cứng (Disk).
 *
 * Sự khác giữa lưu trữ dữ liệu trong RAM và trên Disk:
 * - RAM (Random Access Memory):
 *   - Tốc độ truy xuất dữ liệu rất nhanh, thường là trong khoảng nanoseconds (10^-9 giây).
 *   - Dữ liệu trong RAM sẽ bị mất khi tắt nguồn hoặc khởi động lại hệ thống (volatile).
 *   - Thường được sử dụng cho các ứng dụng yêu cầu tốc độ cao và truy xuất dữ liệu nhanh chóng.
 *
 * - Disk (Đĩa cứng):
 *   - Tốc độ truy xuất dữ liệu chậm hơn so với RAM, thường là trong khoảng milliseconds (10^-3 giây).
 *   - Dữ liệu trên Disk được lưu trữ lâu dài và không bị mất khi tắt nguồn (non-volatile).
 *   - Thường được sử dụng cho các ứng dụng yêu cầu lưu trữ dữ liệu lâu dài và dung lượng lớn.
 */

// Kiểu dữ liệu trong Redis:

// 1. Strings: Lưu trữ dữ liệu dạng chuỗi trong Redis

/**
 *  - Strings là kiểu dữ liệu cơ bản nhất trong Redis, cho phép lưu trữ các giá trị dạng chuỗi (string) với một key duy nhất.
 *  - Strings có thể lưu trữ các giá trị như văn bản, số nguyên, hoặc dữ liệu nhị phân (binary data).
 *  - Strings hỗ trợ các thao tác như thêm, xóa, cập nhật và truy xuất giá trị theo key.
 *
 *  - Ứng dụng trong Node.js:
 *   - Lưu trữ thông tin người dùng: Sử dụng Strings để lưu trữ các giá trị như tên người dùng, email, hoặc mật khẩu.
 *   - Lưu trữ dữ liệu tạm thời: Sử dụng Strings để lưu trữ các giá trị tạm thời như mã xác thực (OTP), token, hoặc session ID.
 *   - Lưu trữ dữ liệu nhị phân: Sử dụng Strings để lưu trữ các giá trị nhị phân như hình ảnh, âm thanh, hoặc video.
 *
 *  - Các câu lệnh cơ bản để thao tác với Strings trong Redis:
 *   - SET: Thêm hoặc cập nhật một giá trị cho một key.
 *   - GET: Lấy giá trị của một key cụ thể.
 *   - DEL: Xóa một key và giá trị liên kết với nó.
 *   - INCR: Tăng giá trị số nguyên của một key lên 1.
 *   - DECR: Giảm giá trị số nguyên của một key xuống 1.
 *   - APPEND: Thêm một chuỗi vào cuối giá trị hiện tại của một key.
 *   - MGET: Lấy giá trị của nhiều key cùng lúc.
 */

// 2. Hashes: Lưu trữ dữ liệu dạng key-value trong Redis (giống Object trong JavaScript)

/**
 *  - Hashes là một cấu trúc dữ liệu trong Redis, cho phép lưu trữ các cặp key-value (trường và giá trị) trong một đối tượng duy nhất.
 *  - Hashes thường được sử dụng để lưu trữ thông tin về một đối tượng, ví dụ như thông tin người dùng, sản phẩm, hoặc các thực thể khác.
 *  - Hashes hỗ trợ các thao tác như thêm, xóa, cập nhật và truy xuất các trường và giá trị trong đối tượng.
 *
 *  - Ứng dụng trong Node.js:
 *   - Lưu trữ thông tin người dùng: Sử dụng Hashes để lưu trữ các trường như tên, email, và mật khẩu của người dùng.
 *   - Lưu trữ thông tin sản phẩm: Sử dụng Hashes để lưu trữ các trường như tên sản phẩm, giá, và mô tả.
 *   - Lưu trữ thông tin cấu hình: Sử dụng Hashes để lưu trữ các cặp key-value cho các thiết lập cấu hình của ứng dụng.
 *
 *  - Ưu điểm của Hashes:
 *   - Tiết kiệm bộ nhớ: Hashes sử dụng ít bộ nhớ hơn so với lưu trữ các cặp key-value riêng lẻ.
 *   - Truy xuất nhanh: Hashes cho phép truy xuất các trường và giá trị trong đối tượng một cách nhanh chóng.
 *   - Dễ dàng quản lý: Hashes giúp tổ chức dữ liệu theo cách có cấu trúc, dễ dàng quản lý và truy xuất.
 *
 * - Các câu lệnh cơ bản để thao tác với Hashes trong Redis:
 *   - HSET: Thêm hoặc cập nhật một trường và giá trị trong Hash.
 *   - HGET: Lấy giá trị của một trường cụ thể trong Hash.
 *   - HDEL: Xóa một hoặc nhiều trường khỏi Hash.
 *   - HGETALL: Lấy tất cả các trường và giá trị trong Hash.
 *   - HEXISTS: Kiểm tra xem một trường có tồn tại trong Hash hay không.
 *   - HLEN: Lấy số lượng trường trong Hash.
 *   - HKEYS: Lấy tất cả các trường trong Hash.
 *   - HINCRBY: Tăng giá trị của một trường số trong Hash theo một giá trị cụ thể.
 */

// 3. Queue: Hàng đợi và xử lý dữ liệu theo thứ tự trong Redis

/**
 *  - Ứng dụng trong Node.js:
 *    - Hệ thống xử lý công việc (Job Queue): Sử dụng Redis để quản lý các công việc cần thực hiện theo thứ tự, ví dụ như gửi email, xử lý hình ảnh, hoặc các tác vụ nền khác.
 *    - Hệ thống thông báo (Notification System): Sử dụng Redis để lưu trữ và phân phối thông báo đến người dùng theo thứ tự.
 *    - Hệ thống xử lý dữ liệu theo luồng (Stream Processing): Sử dụng Redis để quản lý các luồng dữ liệu và xử lý chúng theo thứ tự.
 *
 *  - Các cây trích xuất dữ liệu từ Queue:
 *   - LPUSH: Thêm phần tử vào đầu danh sách (queue).
 *   - RPUSH: Thêm phần tử vào cuối danh sách (queue).
 *   - LPOP: Lấy và xóa phần tử từ đầu danh sách (queue).
 *   - RPOP: Lấy và xóa phần tử từ cuối danh sách (queue).
 *   - LRANGE: Lấy các phần tử trong một khoảng chỉ số cụ thể từ danh sách (queue).
 *   - LLEN: Lấy độ dài của danh sách (queue).
 */

// 4. Sorted Set (ZSet): Bảng xếp hạng và giới hạn

/**
 * - Sorted Set (ZSet) là một cấu trúc dữ liệu trong Redis, cho phép lưu trữ các phần tử duy nhất (unique elements) cùng với một giá trị điểm số (score) liên kết với mỗi phần tử.
 * - Các phần tử trong Sorted Set được sắp xếp theo giá trị điểm số, từ thấp đến cao.
 * - Sorted Set hỗ trợ các thao tác như thêm phần tử, xóa phần tử, truy xuất phần tử theo điểm số, và lấy các phần tử trong một khoảng điểm số cụ thể.
 * - Sorted Set thường được sử dụng để xây dựng bảng xếp hạng (leaderboards), giới hạn truy cập (rate limiting), và các ứng dụng yêu cầu sắp xếp dữ liệu theo một tiêu chí cụ thể.
 *
 * - Ứng dụng trong Node.js:
 *   - Bảng xếp hạng trong trò chơi trực tuyến: Lưu trữ điểm số của người chơi và hiển thị bảng xếp hạng theo điểm số.
 *   - Giới hạn truy cập API: Sử dụng Sorted Set để theo dõi số lượng yêu cầu từ một người dùng trong một khoảng thời gian cụ thể.
 *   - Hệ thống đề xuất: Lưu trữ các mục được đánh giá cao nhất và hiển thị chúng theo thứ tự ưu tiên.
 *
 * - Các cây trích xuất dữ liệu từ Sorted Set:
 *   - ZADD: Thêm phần tử vào Sorted Set với điểm số cụ thể.: ví dụ ZADD leaderboard 100 "player1"
 *   - ZREM: Xóa phần tử khỏi Sorted Set. : ví dụ ZREM leaderboard "player1"
 *   - ZRANGE: Lấy các phần tử trong một khoảng chỉ số cụ thể. : ví dụ ZRANGE leaderboard 0 9
 *   - ZREVRANGE: Lấy các phần tử trong một khoảng chỉ số cụ thể theo thứ tự ngược lại. : ví dụ ZREVRANGE leaderboard 0 9
 *   - ZSCORE: Lấy điểm số của một phần tử cụ thể trong Sorted Set. : ví dụ ZSCORE leaderboard "player1"
 *   - ZRANGEBYSCORE: Lấy các phần tử trong một khoảng điểm số cụ thể. : ví dụ ZRANGEBYSCORE leaderboard 50 100
 */

// Tổng kết:

/**
 * Nếu bạn cần: lưu giá trị đơn giản, token, hoặc cache toàn bộ trang web, hãy sử dụng Strings.
 * Nếu bạn cần: lưu trữ thông tin người dùng, sản phẩm, hoặc các đối tượng có nhiều thuộc tính và cần sửa lẻ từng cái, hãy sử dụng Hashes.
 * Nếu bạn cần: xử lý dữ liệu theo thứ tự, quản lý công việc, hoặc thông báo (cái nào vào trước làm trước), hãy sử dụng Queue.
 * Nếu bạn cần: xây dựng bảng xếp hạng, giới hạn truy cập, hoặc sắp xếp dữ liệu theo điểm số, hãy sử dụng Sorted Set (ZSet).
 */
