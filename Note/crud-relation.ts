// CRUD vowis Relation Prisma

/**
 * trong Prisma, CRUD với Relation (quan hệ) là kỹ thuật thực hiện các thao tác trên nhiều bảng cùng một lúc thông qua một câu lệnh duy nhất
 * được gọi là Nested Writes (ghi lồng nhau) và Relations Queries (truy vấn quan hệ). 
 * Điều này giúp bạn dễ dàng quản lý dữ liệu liên quan mà không cần phải thực hiện nhiều truy vấn riêng biệt.
 * 
 * Dưới đây là các thao tác CRUD tập trung hoàn toàn vào mối quan hệ giữa các dữ liệu
 */

// 1. CREATE với Relation (Nested Writes)

/**
 * thay vì phải tạo thủ công id ở bảng A rồi gán vào bản B, Prisma cho phép bạn thực hiện tất cả trong một khối data
 */

// a. Create và connect (tạo mới và kết nối) nghĩa là bạn tạo một bản ghi mới ở bảng A và tự động kết nối nó với một bản ghi đã tồn tại ở bảng B thông qua một trường khóa ngoại (foreign key). 
// Ví dụ: const newPost = await prisma.post.create({
//     data: {
//         title: "New Post",
//         content: "This is a new post.",
//         author: {
//             connect: { id: 1 } // Kết nối với user có id = 1
//         }
//     }
// });

// b. Create và create (tạo mới và tạo mới) nghĩa là bạn tạo một bản ghi mới ở bảng A và đồng thời tạo một bản ghi mới ở bảng B, sau đó tự động kết nối chúng với nhau.
// Ví dụ: const newPost = await prisma.post.create({
//     data: {
//         title: "New Post",
//         content: "This is a new post.",
//         author: {
//             create: { name: "John Doe", email: "john@gmail.com" } // Tạo mới user và kết nối
//         }
//     }
// });

// 2. UPDATE với Relation (Nested Writes)

/**
 * tương tự như create, bạn có thể cập nhật một bản ghi ở bảng A và đồng thời cập nhật hoặc kết nối bản ghi liên quan ở bảng B trong cùng một câu lệnh.
 */

// a. Update và connect (cập nhật và kết nối) nghĩa là bạn cập nhật một bản ghi ở bảng A và tự động kết nối nó với một bản ghi đã tồn tại ở bảng B thông qua một trường khóa ngoại (foreign key).
// Ví dụ: const updatedPost = await prisma.post.update({
//     where: { id: 1 },
//     data: {
//         title: "Updated Post",
//         author: {
//             connect: { id: 2 } // Kết nối với user có id = 2
//         }
//     }
// });

// b. Update và update (cập nhật và cập nhật) nghĩa là bạn cập nhật một bản ghi ở bảng A và đồng thời cập nhật một bản ghi liên quan ở bảng B trong cùng một câu lệnh.
// Ví dụ: const updatedPost = await prisma.post.update({
//     where: { id: 1 },
//     data: {
//         title: "Updated Post",
//         author: {
//             update: { name: "Jane Doe" } // Cập nhật tên user liên quan
//         }
//     }
// });