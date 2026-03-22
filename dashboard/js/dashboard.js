(function() {
    async function loadElders() {
        try {
            const res = await fetch('https://script.google.com/macros/s/AKfycbyLf8ha0hdu1UsOrc4GFtUG2fFg3IL8B4PVs3Ipa35kwPDQzDiTvtTA7f8-9Hk8uMBoWg/exec?action=getElders');
            const result = await res.json();
            
            if (result.status === 'success') {
                const tbody = document.querySelector('tbody');
                if (tbody) {
                    tbody.innerHTML = result.data.map(elder => `
                        <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                            <td class="px-8 py-6 font-bold text-emerald-600">${elder.ID}</td>
                            <td class="px-8 py-6 font-black uppercase dark:text-white text-slate-800">${elder['Họ Tên'] || elder.fullName}</td>
                            <td class="px-8 py-6"><span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded-lg uppercase">Ổn định</span></td>
                            <td class="px-8 py-6 font-bold dark:text-slate-300 text-slate-500">${elder.CCCD || elder.cccd}</td>
                            <td class="px-8 py-6 text-right">
                                <button onclick="location.href='../app/index.html?role=staff&id=${elder.ID}'" class="text-emerald-600 font-black hover:underline uppercase text-[10px]">Chi tiết</button>
                            </td>
                        </tr>
                    `).join('');
                }

                // Update Stats
                const statsEl = document.querySelector('.text-3xl.font-black.text-slate-800');
                if (statsEl) statsEl.textContent = result.data.length;
            }
        } catch (err) {
            console.error('Failed to load elders:', err);
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', loadElders);
})();
