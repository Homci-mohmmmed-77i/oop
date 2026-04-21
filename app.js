// 1. نظام التخزين
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

// 3. دالة تنظيف الخانات
function clearInputs() {
  document.querySelectorAll('input').forEach(i => i.value = '');
  editId = null; editType = null;
}

// ==========================================
// 4. قيود الإدخال اللحظية (التي طلبتها)
// ==========================================

window.onload = () => {
  // قيد: خانة "النوع" و "الاسم" و "الطبيب" لا تقبل أرقام أبداً
  const textInputs = ['a_type', 'w_name', 'w_job', 'v_vet'];
  textInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.oninput = function() {
        this.value = this.value.replace(/[0-9]/g, ''); // يمسح الأرقام فوراً
      };
    }
  });

  // قيد: "الرقم التعريفي" 10 أرقام فقط ولا يقبل حروف
  const codeInput = document.getElementById('a_code');
  if (codeInput) {
    codeInput.oninput = function() {
      this.value = this.value.replace(/[^0-9]/g, ''); // يمسح أي شيء ليس رقماً
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10); // يمنع كتابة أكثر من 10 أرقام
      }
    };
  }

  // قيد: "العمر" و "الهاتف" و "الكمية" أرقام فقط
  const numInputs = ['a_age', 'w_phone', 'f_qty'];
  numInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.oninput = function() {
        this.value = this.value.replace(/[^0-9]/g, ''); 
      };
    }
  });
};

/* ================== إضافة الحيوان ================== */
function addAnimal() {
  const type = document.getElementById('a_type').value.trim();
  const age = document.getElementById('a_age').value.trim();
  const health = document.getElementById('a_health').value.trim();
  const code = document.getElementById('a_code').value.trim();

  // التحقق النهائي قبل الحفظ
  if(!type || !age || !health || !code) return alert("❌ يرجى ملء البيانات");
  if(code.length !== 10) return alert("❌ الرقم التعريفي يجب أن يكون 10 أرقام");

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
  if(confirm("حذف؟")) {
    Storage.set("animals", Storage.get("animals").filter(a => a.id !== id));
    renderAnimals();
  }
}

// تشغيل العرض الأولي
renderAnimals();
