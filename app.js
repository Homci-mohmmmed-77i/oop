// نظام التخزين
class Storage {
  static get(key) { return JSON.parse(localStorage.getItem(key)) || []; }
  static set(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
}

let editId = null;
let editType = null;

// --- دالة الانتقال بين الأقسام (حل المشكلة) ---
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(s => s.classList.remove('active'));
  
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
}

// دالة تنظيف الخانات
function clearInputs() {
  document.querySelectorAll('input').forEach(i => i.value = '');
  editId = null;
  editType = null;
}

/* ================== ANIMALS ================== */
function addAnimal() {
  const type = document.getElementById('a_type').value;
  const age = document.getElementById('a_age').value;
  const health = document.getElementById('a_health').value;
  const code = document.getElementById('a_code').value;

  if(!type || !code) return alert("يرجى إدخال النوع والكود");

  let data = Storage.get("animals");
  if (editType === "animal") {
    data = data.map(a => a.id === editId ? {id: editId, type, age, health, code} : a);
  } else {
    data.push({ id: Date.now(), type, age, health, code });
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
  Storage.set("animals", Storage.get("animals").filter(a => a.id !== id));
  renderAnimals();
}

/* ================== WORKERS ================== */
function addWorker() {
  const name = document.getElementById('w_name').value;
  const job = document.getElementById('w_job').value;
  const phone = document.getElementById('w_phone').value;

  let data = Storage.get("workers");
  if (editType === "worker") {
    data = data.map(w => w.id === editId ? {id: editId, name, job, phone} : w);
  } else {
    data.push({ id: Date.now(), name, job, phone });
  }
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

/* ================== FEEDS (نفس النمط) ================== */
function addFeed() {
  const name = document.getElementById('f_name').value;
  const qty = document.getElementById('f_qty').value;
  let data = Storage.get("feeds");
  if (editType === "feed") {
    data = data.map(f => f.id === editId ? {id: editId, name, qty} : f);
  } else {
    data.push({id: Date.now(), name, qty});
  }
  Storage.set("feeds", data);
  renderFeeds();
  clearInputs();
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

/* ================== VISITS ================== */
function addVisit() {
  const vet = document.getElementById('v_vet').value;
  const animal = document.getElementById('v_animal').value;
  const date = document.getElementById('v_date').value;
  const diag = document.getElementById('v_diag').value;
  let data = Storage.get("visits");
  if (editType === "visit") {
    data = data.map(v => v.id === editId ? {id: editId, vet, animal, date, diag} : v);
  } else {
    data.push({id: Date.now(), vet, animal, date, diag});
  }
  Storage.set("visits", data);
  renderVisits();
  clearInputs();
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

// البدء
renderAnimals(); renderWorkers(); renderFeeds(); renderVisits();
