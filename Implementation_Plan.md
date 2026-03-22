# IMPLEMENTATION PLAN: HEALTH NODE DIGITAL ECOSYSTEM

Dựa trên tài liệu `System_Constructions.md`, lộ trình triển khai hệ thống phần mềm Health Node được chia thành 4 giai đoạn chiến lược nhằm đảm bảo tính ổn định và khả năng mở rộng.

---

## PHASE 0: HẠ TẦNG & CORE ARCHITECTURE (Tuần 1 - Tuần 2)
*Mục tiêu: Thiết lập nền tảng kỹ thuật và môi trường phát triển.*

- **Thiết lập Hạ tầng Cloud:**
    - Cấu hình server (VPS/AWS) với Docker/Kubernetes.
    - Thiết lập CI/CD (GitHub Actions) để tự động deploy môi trường Staging/Production.
- **Thiết kế Cơ sở dữ liệu (Database Design):**
    - **PostgreSQL:** Lưu trữ dữ liệu quan hệ (Người dùng, Nhân sự, Cấu trúc điểm).
    - **TimescaleDB/InfluxDB:** Lưu trữ dữ liệu chuỗi thời gian (Log chỉ số sinh tồn: Huyết áp, SpO2...).
- **Xác thực & Bảo mật (Auth Service):**
    - Xây dựng Identity Server hỗ trợ Role-based Access Control (RBAC): Admin, Quản lý điểm, Nhân viên y tế/Cộng tác viên.
    - Mã hóa dữ liệu định danh (AES-256) tuân thủ Nghị định 13/2023/NĐ-CP.

---

## PHASE 1: MVP – SỐ HÓA QUẢN LÝ VẬN HÀNH (Tháng 1 - Tháng 2)
*Mục tiêu: Giải quyết Use Case 1 & 2 - Tạo hồ sơ và theo dõi sức khỏe cơ bản.*

- **Sprint 1: Website Landing Page & Dashboard Admin:**
    - Website giới thiệu mô hình, form đăng ký thành viên mới trực tuyến.
    - Dashboard: Quản lý danh mục Điểm Health Node, danh sách Nhân viên, danh sách Người cao tuổi.
- **Sprint 2: Mobile App PWA & Quản lý EHR:**
    - Xây dựng hồ sơ sức khỏe điện tử (EHR) đơn giản: Tiền sử bệnh, Dị ứng, Thuốc đang dùng.
    - Chức năng nhập chỉ số sinh tồn (Huyết áp, Đường huyết, SpO2, BMI) trên PWA cho nhân viên.
- **Sprint 3: Tích hợp VNeID (Giai đoạn 1):**
    - Quét mã QR CCCD/VNeID để bóc tách thông tin nhân khẩu (OCR/QR Parsing) nhằm khởi tạo hồ sơ nhanh, tránh nhập sai.

---

## PHASE 2: CẢNH BÁO THÔNG MINH & KẾT NỐI GIA ĐÌNH (Tháng 3 - Tháng 4)
*Mục tiêu: Giải quyết Use Case 3 & 4 - Hệ thống cảnh báo khẩn cấp và app người nhà.*

- **Sprint 4: Monitoring & Alert System:**
    - Thuật toán nhận diện ngưỡng nguy hiểm dựa trên dữ liệu sinh tồn.
    - Hệ thống thông báo đẩy (Push Notification) và tích hợp Zalo ZNS (Zalo Notification Service) gửi cảnh báo khẩn cho người nhà.
- **Sprint 5: Mobile App cho Người thân:**
    - Module phân quyền/ủy quyền xem dữ liệu (Người nhà xác thực qua VNeID để liên kết với hồ sơ ông bà).
    - Dashboard dành riêng cho người nhà: Xem biểu đồ sức khỏe, lịch uống thuốc, nhật ký sinh hoạt.
- **Sprint 6: Quản lý Hoạt động & Điểm danh:**
    - Module quản lý lịch sinh hoạt câu lạc bộ, chuyên đề y tế.
    - Điểm danh thành viên tham gia qua QR Code cá nhân trên thẻ hội viên.

---

## PHASE 3: HOÀN THIỆN, LIÊN THÔNG & TỐI ƯU (Tháng 5 - Tháng 6+)
*Mục tiêu: Giải quyết Use Case 6 & Mở rộng thiết bị.*

- **Sprint 7: Báo cáo & Phân tích (Analytics):**
    - Module tự động xuất báo cáo định kỳ (PDF/Excel) gửi UBND và Trạm y tế xã.
    - Dashboard Visualize KPI: Tỷ lệ kiểm soát bệnh mạn tính, mật độ tham gia của cộng đồng.
- **Sprint 8: Liên thông Y tế & VNeID (API chính thức):**
    - Triển khai SSO qua cổng định danh quốc gia VNeID (nếu được cấp phép API chính thức).
    - API kết nối với hệ thống y tế cơ sở để chuyển tuyến bệnh nhân (HL7 FHIR chuẩn hóa).
- **Sprint 9: IoT / Web Bluetooth Integration:**
    - Tích hợp đọc dữ liệu tự động từ các dòng máy đo huyết áp/đường huyết có Bluetooth để giảm tối đa sai lệch khi nhập tay.

---

## DANH MỤC RỦI RO CẦN LƯU Ý
1. **Truy cập VNeID:** API chính thức cần quy trình xin phép phức tạp, cần dùng giải pháp Quét OCR làm phương án dự phòng ở giai đoạn đầu.
2. **Push Notifications:** Sự hạn chế của PWA trên hệ điều hành iOS có thể làm gián đoạn thông báo cho người nhà; nên ưu tiên kênh **Zalo OA/ZNS** làm kênh thông báo chính thức.
3. **Bảo mật dữ liệu y tế:** Cần thiết lập audit log chặt chẽ cho mọi thao tác truy cập bệnh án của nhân viên.

---
*Lưu ý: Kế hoạch này được thiết kế để triển khai song song giữa đội ngũ Backend và Frontend, ưu tiên tính năng nhập liệu y tế trước tiên.*
