/** Many-to-Many Relationship Example */

/**
 * - Many-to-Many relationship là một mối quan hệ giữa hai bảng, 
 *   trong đó một bản ghi của bảng A có thể liên kết với nhiều bản ghi của bảng B, và ngược lại, một bản ghi của bảng B cũng có thể liên kết với nhiều bản ghi của bảng A.
 * - Ví dụ: Một sinh viên (Student) có thể đăng ký nhiều khóa học (Course), và một khóa học cũng có thể có nhiều sinh viên đăng ký.
 * - Trong Prisma, để thiết lập mối quan hệ Many-to-Many, bạn cần tạo một bảng trung gian (join table) để lưu trữ các liên kết giữa hai bảng chính.
 * - Ví dụ: Bạn có thể tạo một bảng StudentCourse để lưu trữ các liên kết giữa bảng Student và bảng Course, với các trường studentId và courseId để liên kết với hai bảng chính.
 * - Khi xóa một bản ghi của bảng A (Student), bạn có thể sử dụng onDelete: Cascade để tự động xóa tất cả các bản ghi liên quan trong bảng trung gian (StudentCourse).
 * 
 * - Trong ví dụ trên, chúng ta đã thiết lập mối quan hệ Many-to-Many giữa Student và Course thông qua bảng trung gian StudentCourse. Mỗi Student có thể đăng ký nhiều Course, và mỗi Course cũng có thể có nhiều Student đăng ký.
 * - Khi xóa một Student, tất cả các liên kết của Student đó trong bảng StudentCourse cũng sẽ bị xóa theo nhờ vào onDelete: Cascade.
 * 
 * - Lưu ý: Mối quan hệ Many-to-Many thường được sử dụng khi bạn muốn lưu trữ thông tin về các thực thể có mối quan hệ phức tạp, như các mối quan hệ giữa người dùng và nhóm, sản phẩm và danh mục, v.v.
 *   Việc sử dụng bảng trung gian giúp bạn tổ chức dữ liệu một cách hiệu quả và dễ dàng truy vấn thông tin liên quan giữa các bảng chính.
 * 
 * - Trong Prisma, bạn có thể sử dụng các phương thức như findMany, create, update, delete để thao tác với dữ liệu trong mối quan hệ Many-to-Many thông qua bảng trung gian.
 * 
 * - Khi thiết kế cơ sở dữ liệu, việc sử dụng mối quan hệ Many-to-Many giúp bạn tổ chức dữ liệu một cách hiệu quả và dễ dàng truy vấn thông tin liên quan giữa các bảng chính thông qua bảng trung gian.
 * 
 * - Trong Prisma, bạn có thể sử dụng các phương thức như findMany, create, update, delete để thao tác với dữ liệu trong mối quan hệ Many-to-Many thông qua bảng trung gian.
 * 
 * - Khi thiết kế cơ sở dữ liệu, việc sử dụng mối quan hệ Many-to-Many giúp bạn tổ chức dữ liệu một cách hiệu quả và dễ dàng truy vấn thông tin liên quan giữa các bảng chính thông qua bảng trung gian.
 * 
 * - Trong Prisma, bạn có thể sử dụng các phương thức như findMany, create, update, delete để thao tác với dữ liệu trong mối quan hệ Many-to-Many thông qua bảng trung gian.
 * 
 * - Khi thiết kế cơ sở dữ liệu, việc sử dụng mối quan hệ Many-to-Many giúp bạn tổ chức dữ liệu một cách hiệu quả và dễ dàng truy vấn thông tin liên quan giữa các bảng chính thông qua bảng trung gian.
 */ 

/**
 * n - n:
 *   - implicit (ẩn): Prisma sẽ tự tạo bảng có tên là _ModelAtoModelB để lưu trữ các liên kết giữa hai bảng chính. 
 *     Bạn không cần phải định nghĩa bảng trung gian này trong schema.prisma của mình.
 *   - explicit (rõ ràng): Bạn sẽ tự định nghĩa bảng trung gian trong schema.prisma của mình, với các trường liên kết (relation fields) để liên kết với hai bảng chính.
 *     Ví dụ: Bạn có thể tạo một bảng StudentCourse để lưu trữ các liên kết giữa bảng Student và bảng Course, với các trường studentId và courseId để liên kết với hai bảng chính.
 */