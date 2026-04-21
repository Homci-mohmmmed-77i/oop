class Storage {
  static get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// ===== حالة التعديل =====
let editId = null;
let editType = null;

/* ================== ANIMALS ================== */

function addAnimal() {
  let data = Storage.get("animals");

  if (editType === "animal") {
    data = data.map(a =>
      a.id === editId
        ? { ...a,
            type: a_type.value,
            age: a_age.value,
            health: a_health.value,
            code: a_code.value
          }
        : a
    );

    editId = null;
    editType = null;
  } else {
    data.push({
      id: Date.now(),
      type: a_type.value,
      age: a_age.value,
      health: a_health.value,
      code: a_code.value
    });
  }

  Storage.set("animals", data);
  renderAnimals();
}

function renderAnimals() {
  let data = Storage.get("animals");

  let table = `
  <tr>
    <th>النوع</th>
    <th>العمر</th>
    <th>الصحة</th>
    <th>الكود</th>
    <th>إجراءات</th>
  </tr>`;

  data.forEach(a => {
    table += `
      <tr>
        <td>${a.type}</td>
        <td>${a.age}</td>
        <td>${a.health}</td>
        <td>${a.code}</td>
        <td>
          <button onclick="editAnimal(${a.id})">✏️</button>
          <button onclick="deleteAnimal(${a.id})">🗑</button>
        </td>
      </tr>`;
  });

  animalsTable.innerHTML = table;
}

function editAnimal(id) {
  let data = Storage.get("animals");
  let item = data.find(a => a.id === id);

  a_type.value = item.type;
  a_age.value = item.age;
  a_health.value = item.health;
  a_code.value = item.code;

  editId = id;
  editType = "animal";
}

function deleteAnimal(id) {
  let data = Storage.get("animals");
  data = data.filter(a => a.id !== id);
  Storage.set("animals", data);
  renderAnimals();
}

/* ================== WORKERS ================== */

function addWorker() {
  let data = Storage.get("workers");

  if (editType === "worker") {
    data = data.map(w =>
      w.id === editId
        ? { ...w,
            name: w_name.value,
            job: w_job.value,
            phone: w_phone.value
          }
        : w
    );

    editId = null;
    editType = null;
  } else {
    data.push({
      id: Date.now(),
      name: w_name.value,
      job: w_job.value,
      phone: w_phone.value
    });
  }

  Storage.set("workers", data);
  renderWorkers();
}

function renderWorkers() {
  let data = Storage.get("workers");

  let table = `
  <tr>
    <th>الاسم</th>
    <th>الوظيفة</th>
    <th>الهاتف</th>
    <th>إجراءات</th>
  </tr>`;

  data.forEach(w => {
    table += `
      <tr>
        <td>${w.name}</td>
        <td>${w.job}</td>
        <td>${w.phone}</td>
        <td>
          <button onclick="editWorker(${w.id})">✏️</button>
          <button onclick="deleteWorker(${w.id})">🗑</button>
        </td>
      </tr>`;
  });

  workersTable.innerHTML = table;
}

function editWorker(id) {
  let data = Storage.get("workers");
  let item = data.find(w => w.id === id);

  w_name.value = item.name;
  w_job.value = item.job;
  w_phone.value = item.phone;

  editId = id;
  editType = "worker";
}

function deleteWorker(id) {
  let data = Storage.get("workers");
  data = data.filter(w => w.id !== id);
  Storage.set("workers", data);
  renderWorkers();
}

/* ================== FEEDS ================== */

function addFeed() {
  let data = Storage.get("feeds");

  if (editType === "feed") {
    data = data.map(f =>
      f.id === editId
        ? { ...f,
            name: f_name.value,
            qty: f_qty.value
          }
        : f
    );

    editId = null;
    editType = null;
  } else {
    data.push({
      id: Date.now(),
      name: f_name.value,
      qty: f_qty.value
    });
  }

  Storage.set("feeds", data);
  renderFeeds();
}

function renderFeeds() {
  let data = Storage.get("feeds");

  let table = `
  <tr>
    <th>العلف</th>
    <th>الكمية</th>
    <th>إجراءات</th>
  </tr>`;

  data.forEach(f => {
    table += `
      <tr>
        <td>${f.name}</td>
        <td>${f.qty}</td>
        <td>
          <button onclick="editFeed(${f.id})">✏️</button>
          <button onclick="deleteFeed(${f.id})">🗑</button>
        </td>
      </tr>`;
  });

  feedsTable.innerHTML = table;
}

function editFeed(id) {
  let data = Storage.get("feeds");
  let item = data.find(f => f.id === id);

  f_name.value = item.name;
  f_qty.value = item.qty;

  editId = id;
  editType = "feed";
}

function deleteFeed(id) {
  let data = Storage.get("feeds");
  data = data.filter(f => f.id !== id);
  Storage.set("feeds", data);
  renderFeeds();
}

/* ================== VISITS ================== */

function addVisit() {
  let data = Storage.get("visits");

  if (editType === "visit") {
    data = data.map(v =>
      v.id === editId
        ? {
            ...v,
            vet: v_vet.value,
            animal: v_animal.value,
            date: v_date.value,
            diag: v_diag.value
          }
        : v
    );

    editId = null;
    editType = null;
  } else {
    data.push({
      id: Date.now(),
      vet: v_vet.value,
      animal: v_animal.value,
      date: v_date.value,
      diag: v_diag.value
    });
  }

  Storage.set("visits", data);
  renderVisits();
}

function renderVisits() {
  let data = Storage.get("visits");

  let table = `
  <tr>
    <th>الطبيب</th>
    <th>الحيوان</th>
    <th>التاريخ</th>
    <th>التشخيص</th>
    <th>إجراءات</th>
  </tr>`;

  data.forEach(v => {
    table += `
      <tr>
        <td>${v.vet}</td>
        <td>${v.animal}</td>
        <td>${v.date}</td>
        <td>${v.diag}</td>
        <td>
          <button onclick="editVisit(${v.id})">✏️</button>
          <button onclick="deleteVisit(${v.id})">🗑</button>
        </td>
      </tr>`;
  });

  visitsTable.innerHTML = table;
}

function editVisit(id) {
  let data = Storage.get("visits");
  let item = data.find(v => v.id === id);

  v_vet.value = item.vet;
  v_animal.value = item.animal;
  v_date.value = item.date;
  v_diag.value = item.diag;

  editId = id;
  editType = "visit";
}

function deleteVisit(id) {
  let data = Storage.get("visits");
  data = data.filter(v => v.id !== id);
  Storage.set("visits", data);
  renderVisits();
}

/* ================== INIT ================== */

renderAnimals();
renderWorkers();
renderFeeds();
renderVisits();
