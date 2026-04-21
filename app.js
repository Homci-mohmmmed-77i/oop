// نظام التخزين
class Storage {
  static get(key) { return JSON.parse(localStorage.getItem(key)) || []; }
  static set(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
}

let editId = null;
let editType = null;

// --- دالة الانتقال بين الأقسام ---
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

// دالة تنظيف الخانات
function clearInputs() {
  document.querySelectorAll('input').forEach(i => i.value = '');
  editId = null;
  editType = null;
}

// --- دالات التحقق (Validation) ---

// التأكد أن النص يحتوي على حروف فقط
function isText(val) {
    return /^[a-zA-Z\u0600-\u06FF\s]+$/.test(val);
}

// التأكد أن النص يحتوي على أرقام فقط
function isNumber(val) {
    return /^\d+$/.test(val);
}

/* ================== ANIMALS ================== */
function addAnimal() {
  const type = document.getElementById('a_type').value.trim();
  const age = document.getElementById('a_age').value.trim();
  const health = document.getElementById('a_health').value.trim();
  const code = document.getElementById('a_code').value.trim();

  // التحقق من البيانات
  if(!type || !age || !health || !code) return alert("يرجى ملء جميع الخانات");
  if(!isText(type)) return alert("خانة 'النوع' يجب أن تحتوي على حروف فقط");
  if(!isNumber(age)) return alert("خانة 'العمر' يجب أن تكون أرقاماً فقط");
  if(code.length !== 10 || !isNumber(code)) return alert("الرقم التعريفي يجب أن يكون 10 أرقام بالضبط");

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
  Storage.set("animals", Storage.get("animals").filter(a => a.id !== id));
  renderAnimals();
}

/* ================== WORKERS ================== */
function addWorker() {
  const name = document.getElementById('w_name').value.trim();
  const job = document.getElementById('w_job').value.trim();
  const phone = document.getElementById('w_phone').value.trim();

  if(!name || !job || !phone) return alert("يرجى إدخال كافة بيانات العامل");
  if(!isText(name)) return alert("اسم العامل يجب أن يكون حروفاً فقط");
  if(!isNumber(phone)) return alert("رقم الهاتف يجب أن يكون أرقاماً فقط");

  let data = Storage.get("workers");
  const obj = { id: editType === "worker" ? editId : Date.now(), name, job, phone };
  if (editType === "worker") {
    data = data.map(w => w.id === editId ? obj : w);
  } else {
    data.push(obj);
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

/* ================== FEEDS ================== */
function addFeed() {
  const name = document.getElementById('f_name').value.trim();
  const qty = document.getElementById('f_qty').value.trim();

  if(!name || !qty) return alert("يرجى إدخال اسم العلف والكمية");
  if(!isNumber(qty)) return alert("الكمية يجب أن تكون أرقاماً فقط");

  let data = Storage.get("feeds");
  const obj = {id: editType === "feed" ? editId : Date.now(), name, qty};
  if (editType === "feed") {
    data = data.map(f => f.id === editId ? obj : f);
  } else {
    data.push(obj);
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
  const vet = document.getElementById('v_vet').value.trim();
  const animal = document.getElementById('v_animal').value.trim();
  const date = document.getElementById('v_date').value;
  const diag = document.getElementById('v_diag').value.trim();

  if(!vet || !animal || !date || !diag) return alert("يرجى ملء جميع بيانات الزيارة");
  if(!isText(vet)) return alert("اسم الطبيب يجب أن يكون حروفاً فقط");

  let data = Storage.get("visits");
  const obj = {id: editType === "visit" ? editId : Date.now(), vet, animal, date, diag};
  if (editType === "visit") {
    data = data.map(v => v.id === editId ? obj : v);
  } else {
    data.push(obj);
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
