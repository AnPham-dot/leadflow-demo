const form = document.getElementById("leadForm");
const tableBody = document.getElementById("leadTableBody");
const clearButton = document.getElementById("clearLeads");
const successMessage = document.getElementById("successMessage");

const STORAGE_KEY = "leadflow-demo-leads";

function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLeads(leads) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderLeads() {
  const leads = getLeads();

  if (leads.length === 0) {
    tableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="4">Chưa có lead nào.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = leads
    .slice()
    .reverse()
    .map(
      (lead) => `
        <tr>
          <td>${escapeHtml(lead.createdAt)}</td>
          <td>${escapeHtml(lead.name)}</td>
          <td>${escapeHtml(lead.phone)}</td>
          <td>${escapeHtml(lead.need)}</td>
        </tr>
      `
    )
    .join("");
}

function setError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  setError("nameError", "");
  setError("phoneError", "");
  setError("needError", "");
  successMessage.textContent = "";
}

function validate(name, phone, need) {
  let valid = true;

  if (name.trim().length < 2) {
    setError("nameError", "Vui lòng nhập họ tên hợp lệ.");
    valid = false;
  }

  const normalizedPhone = phone.replace(/\s+/g, "");
  if (!/^(0|\+84)\d{9,10}$/.test(normalizedPhone)) {
    setError("phoneError", "Số điện thoại chưa đúng định dạng.");
    valid = false;
  }

  if (!need) {
    setError("needError", "Vui lòng chọn nhu cầu.");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const need = document.getElementById("need").value;

  if (!validate(name, phone, need)) {
    return;
  }

  const leads = getLeads();
  leads.push({
    name: name.trim(),
    phone: phone.trim(),
    need,
    createdAt: new Date().toLocaleString("vi-VN"),
  });

  saveLeads(leads);
  renderLeads();
  form.reset();

  successMessage.textContent = "Đã lưu lead thành công.";
});

clearButton.addEventListener("click", () => {
  const confirmed = confirm("Xóa toàn bộ dữ liệu demo?");
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  renderLeads();
  successMessage.textContent = "";
});

renderLeads();
