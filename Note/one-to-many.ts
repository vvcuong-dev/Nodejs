/** One-to-Many Relationship */

/**
 * - One-to-Many relationship là một mối quan hệ giữa hai bảng, trong đó một bản ghi của bảng A có thể liên kết với nhiều bản ghi của bảng B, 
 *   nhưng mỗi bản ghi của bảng B chỉ liên kết với một bản ghi của bảng A.
 * - Ví dụ: Một người dùng (User) có thể có nhiều bài viết (Post), nhưng mỗi bài viết chỉ thuộc về một người dùng.
 * - Trong Prisma, để thiết lập mối quan hệ One-to-Many, bạn cần sử dụng các trường liên kết (relation fields) và chỉ định các ràng buộc phù hợp.
 * - Ví dụ: Trong bảng User, bạn có thể có một trường posts để liên kết với bảng Post, và trong bảng Post, bạn sẽ có một trường userId để liên kết với bảng User.
 * - Khi xóa một bản ghi của bảng A (User), bạn có thể sử dụng onDelete: Cascade để tự động xóa tất cả các bản ghi liên quan trong bảng B (Post).
 * 
 * - Trong ví dụ trên, chúng ta đã thiết lập mối quan hệ One-to-Many giữa User và UserInfo. Mỗi User có thể có một UserInfo, nhưng mỗi UserInfo chỉ thuộc về một User.
 * - Khi xóa một User, thông tin UserInfo liên quan cũng sẽ bị xóa theo nhờ vào onDelete: Cascade.
 * 
 * - Lưu ý: Mối quan hệ One-to-Many thường được sử dụng khi bạn muốn lưu trữ thông tin chi tiết về một thực thể mà không muốn làm phức tạp bảng chính. 
 *   Ví dụ: Thông tin chi tiết về người dùng có thể được lưu trữ trong bảng UserInfo, trong khi bảng User chỉ chứa thông tin cơ bản.
 * 
 * - Khi thiết kế cơ sở dữ liệu, việc sử dụng mối quan hệ One-to-Many giúp bạn tổ chức dữ liệu một cách hiệu quả và dễ dàng truy vấn thông tin liên quan giữa các bảng.
 * 
 * - Trong Prisma, bạn có thể sử dụng các phương thức như findMany, create, update, delete để thao tác với dữ liệu trong mối quan hệ One-to-Many.
 */