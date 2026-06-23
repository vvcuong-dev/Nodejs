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
