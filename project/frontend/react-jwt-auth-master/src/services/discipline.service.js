import http from "../http-common";

class DisciplineDataService {
    getAll() {
        return http.get("/disciplines");
    }

    get(id) {
        return http.get(`/disciplines/${id}`);
    }

    create(data) {
        return http.post("/disciplines", data);
    }

    update(id, data) {
        return http.put(`/disciplines/${id}`, data);
    }

    delete(id) {
        return http.delete(`/disciplines/${id}`);
    }

    deleteAll() {
        return http.delete(`/disciplines`);
    }

    findByName(name) {
        return http.get(`/disciplines?name=${name}`);
    }
}

export default new DisciplineDataService();