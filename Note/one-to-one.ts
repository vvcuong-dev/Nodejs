/**
 * Quan hệ one-to-one (một-một) là một loại quan hệ giữa hai thực thể trong đó mỗi thực thể chỉ có thể liên kết với một thực thể khác. 
 * Điều này có nghĩa là mỗi bản ghi trong một bảng chỉ có thể liên kết với một bản ghi duy nhất trong bảng khác, 
 * và ngược lại. Quan hệ one-to-one thường được sử dụng để chia sẻ thông tin giữa hai bảng mà không cần phải lặp lại dữ liệu.
 * 
 * Ví dụ, trong một hệ thống quản lý nhân viên, bạn có thể có một bảng "Nhân viên" và một bảng "Hồ sơ cá nhân".
 * Mỗi nhân viên chỉ có một hồ sơ cá nhân duy nhất, và mỗi hồ sơ cá nhân chỉ liên kết với một nhân viên duy nhất. 
 * Trong trường hợp này, quan hệ giữa bảng "Nhân viên" và bảng "Hồ sơ cá nhân" là một quan hệ one-to-one.
 * 
 * Để thiết lập quan hệ one-to-one trong cơ sở dữ liệu, bạn thường sử dụng khóa chính (primary key) của một bảng làm khóa ngoại (foreign key) trong bảng kia. 
 * Điều này đảm bảo rằng mỗi bản ghi trong một bảng chỉ có thể liên kết với một bản ghi duy nhất trong bảng kia.
 * 
 * Quan hệ one-to-one có thể được sử dụng để tối ưu hóa hiệu suất và giảm sự trùng lặp dữ liệu, 
 * nhưng cũng cần được sử dụng cẩn thận để tránh tạo ra các mối quan hệ phức tạp và khó quản lý.
 * 
 * Trong TypeScript, bạn có thể mô hình hóa quan hệ one-to-one bằng cách sử dụng các lớp (classes) và thuộc tính (properties) để đại diện cho các thực thể và mối quan hệ giữa chúng.
 */

/**
 * Thường dùng để tách bảng "thông tin cơ bản" và "thông tin nhạy cảm/mở rộng" ra thành 2 bảng khác nhau, tránh việc phải join nhiều bảng khi truy vấn thông tin cơ bản,
 * nhưng vẫn có thể truy vấn thông tin mở rộng khi cần thiết.
 * 
 * - Yêu cầu: trường khóa ngoại (userId) phải có @unique để đảm bảo rằng mỗi bản ghi trong bảng UserProfile chỉ liên kết với một bản ghi duy nhất trong bảng User.
 * - Khi truy vấn thông tin cơ bản của người dùng, bạn có thể truy vấn trực tiếp từ bảng User mà không cần phải join với bảng UserProfile, giúp tăng hiệu suất.
 * - Khi cần truy vấn thông tin mở rộng của người dùng, bạn có thể thực hiện join giữa bảng User và bảng UserProfile để lấy thông tin chi tiết.
 * 
 * Ví dụ:
 * 
 * Bảng User:
 * - id (primary key)
 * - name
 * - email
 * 
 * Bảng UserProfile:
 * - id (primary key)
 * - userId (foreign key, unique)
 * - address
 * - phoneNumber
 * 
 * Trong ví dụ này, mỗi người dùng trong bảng User chỉ có một hồ sơ cá nhân duy nhất trong bảng UserProfile, và mỗi hồ sơ cá nhân chỉ liên kết với một người dùng duy nhất.
 */