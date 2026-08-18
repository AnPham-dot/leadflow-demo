const form =
  document.getElementById("leadForm");

const statusMessage =
  document.getElementById("statusMessage");

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzvyX3lagwVeEBLgBRCyEt3KD0rOwo7b4yrGVX_zxR4agT59QZvmdtEK3_lbn7RdaJz6g/exec";

function setError(id, message) {
  document.getElementById(id).textContent =
    message;
}

function clearFeedback() {
  setError("nameError", "");
  setError("phoneError", "");
  setError("needError", "");

  statusMessage.textContent = "";
  statusMessage.className = "status";
}

function validate(
  name,
  phone,
  need
) {
  let valid = true;

  if (
    name.trim().length < 2
  ) {
    setError(
      "nameError",
      "Vui lòng nhập họ tên hợp lệ."
    );

    valid = false;
  }

  const normalizedPhone =
    phone.replace(
      /\s+/g,
      ""
    );

  if (
    !/^(0|\+84)\d{9,10}$/.test(
      normalizedPhone
    )
  ) {
    setError(
      "phoneError",
      "Số điện thoại chưa đúng định dạng."
    );

    valid = false;
  }

  if (!need) {
    setError(
      "needError",
      "Vui lòng chọn nhu cầu."
    );

    valid = false;
  }

  return valid;
}

async function sendToGoogleSheet(
  name,
  phone,
  need
) {
  const body =
    new URLSearchParams();

  body.append(
    "name",
    name
  );

  body.append(
    "phone",
    phone
  );

  body.append(
    "need",
    need
  );

  const response =
    await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",
        body
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      "Request failed"
    );
  }
}

form.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    clearFeedback();

    const name =
      document
        .getElementById("name")
        .value;

    const phone =
      document
        .getElementById("phone")
        .value;

    const need =
      document
        .getElementById("need")
        .value;

    const submitButton =
      form.querySelector(
        'button[type="submit"]'
      );

    if (
      !validate(
        name,
        phone,
        need
      )
    ) {
      return;
    }

    try {

      submitButton.disabled =
        true;

      submitButton.textContent =
        "Đang gửi...";

      await sendToGoogleSheet(
        name.trim(),
        phone.trim(),
        need
      );

      form.reset();

      statusMessage.textContent =
        "Đã gửi thông tin thành công. Chúng tôi sẽ liên hệ với bạn sớm.";

      statusMessage.className =
        "status success";

    } catch (error) {

      console.error(error);

      statusMessage.textContent =
        "Không thể gửi thông tin. Vui lòng thử lại.";

      statusMessage.className =
        "status error-state";

    } finally {

      submitButton.disabled =
        false;

      submitButton.textContent =
        "Nhận tư vấn miễn phí";
    }
  }
);
