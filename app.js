// ===== LocalStorage Helper =====
class Storage {
  static get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// ===== Classes =====
class Animal {
  constructor(type, age, health, code) {
    this.id = Date.now();
    this.type = type;
    this.age = age;
    this.health = health;
    this.code = code;
  }
}

class Worker {
  constructor(name, job, phone) {
    this.id = Date.now();
    this.name = name;
    this.job = job;
    this.phone = phone;
  }
}

class Feed {
  constructor(name, qty) {
    this.id = Date.now();
    this.name = name;
    this.qty = qty;
  }
}

class VetVisit {
  constructor(vet, animal, date, diag) {
    this.id = Date.now();
    this.vet = vet;
    this.animal = animal;
    this.date = date;
    this.diag = diag;
  }
}

// ===== Navigation =====
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ===== Animals =====
function addAnimal() {
  let data = Storage.get("animals");
  data.push(new Animal(
    a_type.value,
    a_age.value,
    a_health.value,
    a_code.value
  ));
  Storage.set("animals", data);
  renderAnimals();
}

function renderAnimals() {
  let data = Storage.get("animals");
  let table = "<tr><th>النوع</th><th>العمر</th><th>الصحة</th><th>الكود</th></tr>";
  data.forEach((a, i) => {
    table += `
      <tr>
        <td>${a.type}</td>
        <td>${a.age}</td>
        <td>${a.health}</td>
        <td>${a.code}</td>
      </tr>`;
  });
  animalsTable.innerHTML = table;
}

// ===== Workers =====
function addWorker() {
  let data = Storage.get("workers");
  data.push(new Worker(w_name.value, w_job.value, w_phone.value));
  Storage.set("workers", data);
  renderWorkers();
}

function renderWorkers() {
  let data = Storage.get("workers");
  let table = "<tr><th>الاسم</th><th>الوظيفة</th><th>الهاتف</th></tr>";
  data.forEach(w => {
    table += `
      <tr>
        <td>${w.name}</td>
        <td>${w.job}</td>
        <td>${w.phone}</td>
      </tr>`;
  });
  workersTable.innerHTML = table;
}

// ===== Feeds =====
function addFeed() {
  let data = Storage.get("feeds");
  data.push(new Feed(f_name.value, f_qty.value));
  Storage.set("feeds", data);
  renderFeeds();
}

function renderFeeds() {
  let data = Storage.get("feeds");
  let table = "<tr><th>العلف</th><th>الكمية</th></tr>";
  data.forEach(f => {
    table += `
      <tr>
        <td>${f.name}</td>
        <td>${f.qty}</td>
      </tr>`;
  });
  feedsTable.innerHTML = table;
}

// ===== Vet Visits =====
function addVisit() {
  let data = Storage.get("visits");
  data.push(new VetVisit(
    v_vet.value,
    v_animal.value,
    v_date.value,
    v_diag.value
  ));
  Storage.set("visits", data);
  renderVisits();
}

function renderVisits() {
  let data = Storage.get("visits");
  let table = "<tr><th>الطبيب</th><th>الحيوان</th><th>التاريخ</th><th>التشخيص</th></tr>";
  data.forEach(v => {
    table += `
      <tr>
        <td>${v.vet}</td>
        <td>${v.animal}</td>
        <td>${v.date}</td>
        <td>${v.diag}</td>
      </tr>`;
  });
  visitsTable.innerHTML = table;
}

// ===== Init =====
renderAnimals();
renderWorkers();
renderFeeds();
renderVisits();
