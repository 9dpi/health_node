import axios from 'axios';

const API_URL = 'https://script.google.com/macros/s/AKfycbyLf8ha0hdu1UsOrc4GFtUG2fFg3IL8B4PVs3Ipa35kwPDQzDiTvtTA7f8-9Hk8uMBoWg/exec';

export const HealthNodeAPI = {
    // Elder Services
    async getElders() {
        const res = await axios.get(`${API_URL}?action=getElders`);
        return res.data;
    },

    async getElderDetail(id) {
        const res = await axios.get(`${API_URL}?action=getElderDetail&id=${id}`);
        return res.data;
    },

    async registerElder(payload) {
        const res = await axios.post(API_URL, {
            action: 'registerElder',
            payload: payload
        });
        return res.data;
    },

    // Vital Services
    async addVitalLog(payload) {
        const res = await axios.post(API_URL, {
            action: 'addVitalLog',
            payload: payload
        });
        return res.data;
    }
};
