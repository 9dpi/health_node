const API_URL = "https://script.google.com/macros/s/AKfycbyLf8ha0hdu1UsOrc4GFtUG2fFg3IL8B4PVs3Ipa35kwPDQzDiTvtTA7f8-9Hk8uMBoWg/exec";

// Load data on start
document.addEventListener('DOMContentLoaded', () => {
    loadElders();
});

async function loadElders() {
    const list = document.getElementById('eldersList');
    list.innerHTML = '<tr><td colspan="5">Đang tải dữ liệu...</td></tr>';

    try {
        const response = await fetch(`${API_URL}?action=getElders`);
        const result = await response.json();

        if (result.status === 'success' && result.data.length > 0) {
            list.innerHTML = '';
            result.data.forEach(elder => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${elder.ID}</td>
                    <td><strong>${elder['Họ Tên']}</strong></td>
                    <td>${elder['Ngày Sinh']}</td>
                    <td><span class="status-chip active">Đang hoạt động</span></td>
                    <td><button onclick="viewDetail('${elder.ID}')">Xem chi tiết</button></td>
                `;
                list.appendChild(tr);
            });
        } else {
            list.innerHTML = '<tr><td colspan="5">Chưa có thành viên nào được đăng ký.</td></tr>';
        }
    } catch (err) {
        list.innerHTML = '<tr><td colspan="5">Lỗi kết nối dữ liệu.</td></tr>';
    }
}

// Modal Toggle
function showRegisterModal() { document.getElementById('registerModal').style.display = 'block'; }
function closeRegisterModal() { document.getElementById('registerModal').style.display = 'none'; }

// Registration Handle
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'registerElder',
                payload: payload
            })
        });
        const result = await response.json();
        if (result.status === 'success') {
            alert('Đăng ký thành công!');
            closeRegisterModal();
            loadElders(); // Refresh
        }
    } catch (err) {
        alert('Có lỗi xảy ra khi lưu hồ sơ.');
    }
});
