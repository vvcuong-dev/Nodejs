// Update với Relation (Nested Writes) trong Prisma

/**
 * Việc cập nhật quan hệ giữa các bảng trong Prisma cũng rất linh hoạt và mạnh mẽ, cho phép bạn thực hiện nhiều thao tác liên quan đến dữ liệu liên kết trong cùng một câu lệnh cập nhật.
 */

// a. Connect vs Disconnect (kết nối vs ngắt kết nối) nghĩa là bạn có thể cập nhật một bản ghi ở bảng A và tự động kết nối 
//    hoặc ngắt kết nối nó với một bản ghi đã tồn tại ở bảng B thông qua một trường khóa ngoại (foreign key).