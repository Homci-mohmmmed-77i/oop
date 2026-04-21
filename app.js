// 1. نظام التخزين المحلي (LocalStorage)
class Storage {
    static get(key) { return JSON.parse(localStorage.getItem(key)) || []; }
    static set(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
}

let editId = null;
let editType = null;

// 2. دالة الانتقال بين الأقسام
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
}

// 3. دالة تنظيف خانات الإدخال
function clearInputs() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    editId = null;
    editType = null;
}

// ==========================================
// 4. قيود الإدخال اللحظية (Validation)
// ==========================================
window.onload = () => {
    // منع الأرقام في الخانات النصية (بما فيها الحالة الصحية والتشخيص)
    const textInputs = ['a_type', 'a_health', 'w_name', 'w_job', 'v_vet', 'v_diag'];
    textInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.oninput = function() {
                this.value = this.value.replace(/[0-9]/g, ''); // حذف أي رقم فوراً
            };
        }
    });

    // الرقم التعريفي: 10 أرقام فقط ومنع الحروف
    const codeInput = document.getElementById('a_code');
    if (codeInput) {
        codeInput.oninput = function() {
            this.value = this.value.replace(/[^0-9]/g, ''); // أرقام فقط
            if (this.value.length > 10) this.value = this.value.slice(0, 10); // حد أقصى 10
        };
    }

    // خانات الأرقام الأخرى (العمر، الهاتف، الكمية)
    const numInputs = ['a_age', 'w_phone', 'f_qty'];
    numInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.oninput = function() {
                this.value = this.value.replace(/[^0-9]/g, '');
            };
        }
    });

    // تشغيل العرض الأولي للبيانات
    renderAnimals(); renderWorkers(); renderFeeds(); renderVisits();
};

// ==========================================
// 5. ميزات البحث والتصدير
// ==========================================

function searchTable(type) {
    let inputId = type === 'animals' ? 'searchAnimal' : 'searchWorker';
    let filter = document.getElementById(inputId).value.toLowerCase();
    let table = document.getElementById(type + 'Table');
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        tr[i].style.display = tr[i].textContent.toLowerCase().includes(filter) ? "" : "none";
    }
}

function exportToExcel(tableId, fileName) {
    let table = document.getElementById(tableId);
    let rows = Array.from(table.rows);
    let csvContent = rows.map(row => 
        Array.from(row.cells).map(cell => cell.textContent).join(",")
    ).join("\n");

    let blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName + ".csv";
    link.click();
}

// ==========================================
// 6. إدارة الحيوانات (Animals)
// ==========================================
function addAnimal() {
    const type = document.getElementById('a_type').value.trim();
    const age = document.getElementById('a_age').value.trim();
    const health = document.getElementById('a_health').value.trim();
    const code = document.getElementById('a_code').value.trim();

    if (!type || !age || !health || !code) return alert("❌ يرجى ملء جميع البيانات");
    if (code.length !== 10) return alert("❌ الرقم التعريفي يجب أن يكون 10 أرقام بالضبط");

    let data = Storage.get("animals");
    const obj = { id: editType === "animal" ? editId : Date.now(), type, age, health, code };

    if (editType === "animal") {
        data = data.map(a => a.id === editId ? obj : a);
    } else {
        data.push(obj);
    }

    Storage.set("animals", data);
    renderAnimals();
    clearInputs();
}

function renderAnimals() {
    let data = Storage.get("animals");
    let table = `<tr><th>النوع</th><th>العمر</th><th>الصحة</th><th>الكود</th><th>إجراءات</th></tr>`;
    data.forEach(a => {
        table += `<tr><td>${a.type}</td><td>${a.age}</td><td>${a.health}</td><td>${a.code}</td>
        <td><button onclick="editAnimal(${a.id})">✏️</button><button onclick="deleteAnimal(${a.id})">🗑</button></td></tr>`;
    });
    document.getElementById('animalsTable').innerHTML = table;
}

function editAnimal(id) {
    let item = Storage.get("animals").find(a => a.id === id);
    document.getElementById('a_type').value = item.type;
    document.getElementById('a_age').value = item.age;
    document.getElementById('a_health').value = item.health;
    document.getElementById('a_code').value = item.code;
    editId = id; editType = "animal";
}

function deleteAnimal(id) {
    if (confirm("هل تريد حذف هذا السجل؟")) {
        Storage.set("animals", Storage.get("animals").filter(a => a.id !== id));
        renderAnimals();
    }
}

// ==========================================
// 7. إدارة العمال (Workers)
// ==========================================
function addWorker() {
    const name = document.getElementById('w_name').value.trim();
    const job = document.getElementById('w_job').value.trim();
    const phone = document.getElementById('w_phone').value.trim();

    if (!name || !job || !phone) return alert("❌ يرجى إدخال كافة بيانات العامل");

    let data = Storage.get("workers");
    const obj = { id: editType === "worker" ? editId : Date.now(), name, job, phone };
    if (editType === "worker") data = data.map(w => w.id === editId ? obj : w);
    else data.push(obj);

    Storage.set("workers", data);
    renderWorkers();
    clearInputs();
}

function renderWorkers() {
    let data = Storage.get("workers");
    let table = `<tr><th>الاسم</th><th>الوظيفة</th><th>الهاتف</th><th>إجراءات</th></tr>`;
    data.forEach(w => {
        table += `<tr><td>${w.name}</td><td>${w.job}</td><td>${w.phone}</td>
        <td><button onclick="editWorker(${w.id})">✏️</button><button onclick="deleteWorker(${w.id})">🗑</button></td></tr>`;
    });
    document.getElementById('workersTable').innerHTML = table;
}

function editWorker(id) {
    let item = Storage.get("workers").find(w => w.id === id);
    document.getElementById('w_name').value = item.name;
    document.getElementById('w_job').value = item.job;
    document.getElementById('w_phone').value = item.phone;
    editId = id; editType = "worker";
}

function deleteWorker(id) {
    Storage.set("workers", Storage.get("workers").filter(w => w.id !== id));
    renderWorkers();
}

// ==========================================
// 8. إدارة الأعلاف والزيارات (تتبع نفس النمط)
// ==========================================

function addFeed() {
    const name = document.getElementById('f_name').value.trim();
    const qty = document.getElementById('f_qty').value.trim();
    if (!name || !qty) return alert("❌ يرجى تعبئة الحقول");
    let data = Storage.get("feeds");
    const obj = { id: editType === "feed" ? editId : Date.now(), name, qty };
    if (editType === "feed") data = data.map(f => f.id === editId ? obj : f);
    else data.push(obj);
    Storage.set("feeds", data);
    renderFeeds(); clearInputs();
}

function renderFeeds() {
    let data = Storage.get("feeds");
    let table = `<tr><th>العلف</th><th>الكمية</th><th>إجراءات</th></tr>`;
    data.forEach(f => { table += `<tr><td>${f.name}</td><td>${f.qty}</td><td><button onclick="editFeed(${f.id})">✏️</button><button onclick="deleteFeed(${f.id})">🗑</button></td></tr>`; });
    document.getElementById('feedsTable').innerHTML = table;
}

function editFeed(id) {
    let item = Storage.get("feeds").find(f => f.id === id);
    document.getElementById('f_name').value = item.name;
    document.getElementById('f_qty').value = item.qty;
    editId = id; editType = "feed";
}

function deleteFeed(id) {
    Storage.set("feeds", Storage.get("feeds").filter(f => f.id !== id));
    renderFeeds();
}

function addVisit() {
    const vet = document.getElementById('v_vet').value.trim();
    const animal = document.getElementById('v_animal').value.trim();
    const date = document.getElementById('v_date').value;
    const diag = document.getElementById('v_diag').value.trim();
    if (!vet || !animal || !date || !diag) return alert("❌ يرجى ملء بيانات الزيارة");
    let data = Storage.get("visits");
    const obj = { id: editType === "visit" ? editId : Date.now(), vet, animal, date, diag };
    if (editType === "visit") data = data.map(v => v.id === editId ? obj : v);
    else data.push(obj);
    Storage.set("visits", data);
    renderVisits(); clearInputs();
}

function renderVisits() {
    let data = Storage.get("visits");
    let table = `<tr><th>الطبيب</th><th>الحيوان</th><th>التاريخ</th><th>التشخيص</th><th>إجراءات</th></tr>`;
    data.forEach(v => { table += `<tr><td>${v.vet}</td><td>${v.animal}</td><td>${v.date}</td><td>${v.diag}</td><td><button onclick="editVisit(${v.id})">✏️</button><button onclick="deleteVisit(${v.id})">🗑</button></td></tr>`; });
    document.getElementById('visitsTable').innerHTML = table;
}

function editVisit(id) {
    let item = Storage.get("visits").find(v => v.id === id);
    document.getElementById('v_vet').value = item.vet;
    document.getElementById('v_animal').value = item.animal;
    document.getElementById('v_date').value = item.date;
    document.getElementById('v_diag').value = item.diag;
    editId = id; editType = "visit";
}

function deleteVisit(id) {
    Storage.set("visits", Storage.get("visits").filter(v => v.id !== id));
    renderVisits();
}
