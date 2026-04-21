class Storage {
  static get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
  static set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// حالة التعديل
let editId = null;
let editType = null;

// --- وظائف الواجهة (UI) ---

function showSection(id) {
  // إخفاء الكل
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  // إظهار القسم المختار
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

function clearInputs() {
  document.querySelectorAll('input').forEach(input => input.value = '');
  editId = null;
  editType = null;
}

/* ================== ANIMALS ================== */
function addAnimal() {
  let data = Storage.get("animals");
  const animalObj = {
    id: editType === "animal" ? editId : Date.now(),
    type: document.getElementById('a_type').value,
    age: document.getElementById('a_age').value,
    health: document.getElementById('a_health').value,
    code: document.getElementById('a_code').value
  };

  if (editType === "animal") {
    data = data.map(a => a.id === editId ? animalObj : a);
  } else {
    data.push(animalObj);
  }

  Storage.set("animals", data);
  renderAnimals();
  clearInputs();
}

function renderAnimals() {
  let data = Storage.get("animals");
  let table = `<tr><th>النوع</th><th>العمر</th><th>الصحة</th><th>الكود</th><th>إجراءات</th></tr>`;
  data.forEach(a => {
    table += `<tr>
      <td>${a.type}</td><td>${a.age}</td><td>${a.health}</td><td>${a.code}</td>
      <td>
        <button onclick="editAnimal(${a.id})">✏️</button>
        <button onclick="deleteAnimal(${a.id})">🗑</button>
      </td>
    </tr>`;
  });
  document.getElementById('animalsTable').innerHTML = table;
}

function editAnimal(id) {
  let item = Storage.get("animals").find(a => a.id === id);
  document.getElementById('a_type').value = item.type;
  document.getElementById('a_age').value = item.age;
  document.getElementById('a_health').value = item.health;
  document.getElementById('a_code').value = item.code;
  editId = id;
  editType = "animal";
  window.scrollTo(0,0);
}

function deleteAnimal(id) {
  Storage.set("animals", Storage.get("animals").filter(a => a.id !== id));
  renderAnimals();
}

/* ================== WORKERS ================== */
function addWorker() {
  let data = Storage.get("workers");
  const workerObj = {
    id: editType === "worker" ? editId : Date.now(),
    name: document.getElementById('w_name').value,
    job: document.getElementById('w_job').value,
    phone: document.getElementById('w_phone').value
  };

  if (editType === "worker") {
    data = data.map(w => w.id === editId ? workerObj : w);
  } else {
    data.push(workerObj);
  }

  Storage.set("workers", data);
  renderWorkers();
  clearInputs();
}

function renderWorkers() {
  let data = Storage.get("workers");
  let table = `<tr><th>الاسم</th><th>الوظيفة</th><th>الهاتف</th><th>إجراءات</th></tr>`;
  data.forEach(w => {
    table += `<tr>
      <td>${w.name}</td><td>${w.job}</td><td>${w.phone}</td>
      <td>
        <button onclick="editWorker(${w.id})">✏️</button>
        <button onclick="deleteWorker(${w.id})">🗑</button>
      </td>
    </tr>`;
  });
  document.getElementById('workersTable').innerHTML = table;
}

function editWorker(id) {
  let item = Storage.get("workers").find(w => w.id === id);
  document.getElementById('w_name').value = item.name;
  document.getElementById('w_job').value = item.job;
  document.getElementById('w_phone').value = item.phone;
  editId = id;
  editType = "worker";
}

function deleteWorker(id) {
  Storage.set("workers", Storage.get("workers").filter(w => w.id !== id));
  renderWorkers();
}

/* ================== FEEDS ================== */
function addFeed() {
  let data = Storage.get("feeds");
  const feedObj = {
    id: editType === "feed" ? editId : Date.now(),
    name: document.getElementById('f_name').value,
    qty: document.getElementById('f_qty').value
  };

  if (editType === "feed") {
    data = data.map(f => f.id === editId ? feedObj : f);
  } else {
    data.push(feedObj);
  }

  Storage.set("feeds", data);
  renderFeeds();
  clearInputs();
}

function renderFeeds() {
  let data = Storage.get("feeds");
  let table = `<tr><th>العلف</th><th>الكمية</th><th>إجراءات</th></tr>`;
  data.forEach(f => {
    table += `<tr>
      <td>${f.name}</td><td>${f.qty}</td>
      <td>
        <button onclick="editFeed(${f.id})">✏️</button>
        <button onclick="deleteFeed(${f.id})">🗑</button>
      </td>
    </tr>`;
  });
  document.getElementById('feedsTable').innerHTML = table;
}

function editFeed(id) {
  let item = Storage.get("feeds").find(f => f.id === id);
  document.getElementById('f_name').value = item.name;
  document.getElementById('f_qty').value = item.qty;
  editId = id;
  editType = "feed";
}

function deleteFeed(id) {
  Storage.set("feeds", Storage.get("feeds").filter(f => f.id !== id));
  renderFeeds();
}

/* ================== VISITS ================== */
function addVisit() {
  let data = Storage.get("visits");
  const visitObj = {
    id: editType === "visit" ? editId : Date.now(),
    vet: document.getElementById('v_vet').value,
    animal: document.getElementById('v_animal').value,
    date: document.getElementById('v_date').value,
    diag: document.getElementById('v_diag').value
  };

  if (editType === "visit") {
    data = data.map(v => v.id === editId ? visitObj : v);
  } else {
    data.push(visitObj);
  }

  Storage.set("visits", data);
  renderVisits();
  clearInputs();
}

function renderVisits() {
  let data = Storage.get("visits");
  let table = `<tr><th>الطبيب</th><th>الحيوان</th><th>التاريخ</th><th>التشخيص</th><th>إجراءات</th></tr>`;
  data.forEach(v => {
    table += `<tr>
      <td>${v.vet}</td><td>${v.animal}</td><td>${v.date}</td><td>${v.diag}</td>
      <td>
        <button onclick="editVisit(${v.id})">✏️</button>
        <button onclick="deleteVisit(${v.id})">🗑</button>
      </td>
    </tr>`;
  });
  document.getElementById('visitsTable').innerHTML = table;
}

function editVisit(id) {
  let item = Storage.get("visits").find(v => v.id === id);
  document.getElementById('v_vet').value = item.vet;
  document.getElementById('v_animal').value = item.animal;
  document.getElementById('v_date').value = item.date;
  document.getElementById('v_diag').value = item.diag;
  editId = id;
  editType = "visit";
}

function deleteVisit(id) {
  Storage.set("visits", Storage.get("visits").filter(v => v.id !== id));
  renderVisits();
}

// تشغيل العرض عند البداية
renderAnimals();
renderWorkers();
renderFeeds();
renderVisits();
